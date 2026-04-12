import { NextRequest, NextResponse } from "next/server";
import { invokeChat, MODELS } from "@/lib/deepseek";
import { getCaseIndex, findCase } from "@/lib/case-database";

export const runtime = "nodejs";
export const maxDuration = 90;

// 获取所有可用案例列表
const availableCases = getCaseIndex();

export async function POST(request: NextRequest) {
    try {
        const { context, history, userScore } = await request.json();

        // 格式化案例列表给AI参考
        const caseList = availableCases.map(c =>
            `- ${c.id}: ${c.name} (${c.year}) - ${c.topic}`
        ).join('\n');

        // 构建分析报告提示词
        const systemPrompt = `你是一位专业的外交谈判分析师。请对本次谈判进行全面的回顾分析，并生成详细的分析报告。

重要：你必须严格返回JSON格式，不要包含任何其他文字。格式如下：
{
  "overallScore": -100到100的数字，代表整体谈判结果（正值表示我方获益，负值表示我方损失）,
  "summary": "简要总结本次谈判，用50-80个字描述整体表现和结果",
  "keyDecisions": [
    {
      "turn": 1,
      "decision": "关键决策描述，20-40字",
      "impact": "positive|neutral|negative",
      "explanation": "影响解释，30-60字"
    }
  ],
  "sentimentTrend": [
    { "phase": "开局", "value": 0 },
    { "phase": "中局", "value": 0 },
    { "phase": "结尾", "value": 0 }
  ],
  "strengths": ["优势1", "优势2", "优势3"],
  "weaknesses": ["不足1", "不足2", "不足3"],
  "recommendations": [
    {
      "category": "tactics|strategy|preparation",
      "title": "建议标题",
      "description": "详细建议描述，50-80字",
      "priority": "high|medium|low"
    }
  ],
  "similarCases": [
    {
      "id": "使用下面的案例ID之一，精确匹配",
      "name": "案例名称",
      "year": 案例年份,
      "parties": "参谈方",
      "outcome": 结果评分（-100到100）,
      "keyDifference": "与本次谈判的关键差异，30-50字"
    }
  ]
}

可用案例列表（必须从这些ID中选择）：
${caseList}

注意事项：
1. similarCases 必须从上面的案例列表中选择，使用精确的案例ID
2. 评分要基于谈判过程中的实际表现
3. 建议要具体、可操作
4. 只返回JSON，不要任何其他文字`;

        const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
            { role: "system", content: systemPrompt },
        ];

        // 添加上下文信息
        let contextInfo = '';
        if (context) {
            contextInfo = `
谈判主题：${context.topic?.name || '未指定'}
己方：${context.parties?.self?.name || '未指定'}
对方：${context.parties?.opponent?.name || '未指定'}
关键议题：${context.topic?.keyIssues?.join('、') || '未指定'}
`;
        }

        // 添加谈判历史
        const historyText = history && history.length > 0
            ? history.map((m: { role: string; content: string }) =>
                `${m.role === 'user' ? '【我方】' : '【对方】'}：${m.content}`
            ).join('\n\n')
            : '无谈判记录';

        const userPrompt = `${contextInfo}
用户自评分数：${userScore || '未评分'}

谈判历史（完整）：
${historyText}

请生成分析报告（只返回JSON）：`;

        messages.push({ role: "user", content: userPrompt });

        // 调用 DeepSeek（非流式）
        const rawContent = await invokeChat(messages, {
            model: MODELS.REASONER,  // 使用深度推理模型进行分析
            temperature: 0.3,
        });

        // 解析AI返回的JSON
        let analysisReport: Record<string, unknown>;

        try {
            let jsonStr = '';

            // 方式1：提取 ```json ... ``` 包裹的内容
            const jsonMatch1 = rawContent.match(/```json\s*([\s\S]*?)```/);
            if (jsonMatch1) {
                jsonStr = jsonMatch1[1];
            }

            // 方式2：提取 ``` ... ``` 包裹的内容
            if (!jsonStr) {
                const jsonMatch2 = rawContent.match(/```\s*([\s\S]*?)```/);
                if (jsonMatch2) {
                    jsonStr = jsonMatch2[1];
                }
            }

            // 方式3：提取 {...} 包裹的内容
            if (!jsonStr) {
                const jsonMatch3 = rawContent.match(/\{[\s\S]*\}/);
                if (jsonMatch3) {
                    jsonStr = jsonMatch3[0];
                }
            }

            // 方式4：直接使用原始内容
            if (!jsonStr) {
                jsonStr = rawContent;
            }

            // 清理JSON字符串
            jsonStr = jsonStr.trim()
                .replace(/^[\s\S]*?\{/, '{')
                .replace(/\}[\s\S]*$/, '}')
                .replace(/```[\s\S]*$/gm, '')
                .replace(/^[^{]*/, '')
                .replace(/[^}]*$/, '');

            analysisReport = JSON.parse(jsonStr);
            analysisReport = validateAndFixReport(analysisReport, userScore);

            // 处理similarCases中的ID映射
            if (analysisReport.similarCases && Array.isArray(analysisReport.similarCases)) {
                analysisReport.similarCases = (analysisReport.similarCases as Array<{ id?: string; name?: string; year?: number; parties?: string; outcome?: number; keyDifference?: string }>).map((c) => {
                    const resolvedCase = findCase(c.id || c.name || '');
                    if (resolvedCase) {
                        return {
                            id: resolvedCase.id,
                            name: resolvedCase.name,
                            year: resolvedCase.year,
                            parties: `${resolvedCase.parties.self.country} vs ${resolvedCase.parties.opponent.country}`,
                            outcome: resolvedCase.outcome.score,
                            keyDifference: c.keyDifference || `与${resolvedCase.name}相比的差异`,
                        };
                    }

                    return {
                        id: c.id || 'unknown',
                        name: c.name || '未知案例',
                        year: c.year || 2000,
                        parties: c.parties || '未知',
                        outcome: c.outcome || 0,
                        keyDifference: c.keyDifference || '与本次谈判存在差异',
                    };
                });
            }

        } catch (parseError) {
            console.error('JSON解析失败:', parseError, '\n原始内容:', rawContent);
            analysisReport = getDefaultReport(userScore);
        }

        return NextResponse.json(analysisReport);

    } catch (error) {
        console.error('Analysis API Error:', error);
        return NextResponse.json(getDefaultReport(50), { status: 200 });
    }
}

// 验证并修复报告结构
function validateAndFixReport(report: Record<string, unknown>, userScore?: number): Record<string, unknown> {
    const defaults = {
        overallScore: userScore || 50,
        summary: '本次谈判分析已完成',
        keyDecisions: [],
        sentimentTrend: [
            { phase: '开局', value: 0 },
            { phase: '中局', value: 0 },
            { phase: '结尾', value: 0 },
        ],
        strengths: ['能够参与谈判练习'],
        weaknesses: ['建议进一步学习外交知识'],
        recommendations: [
            {
                category: 'preparation',
                title: '加强背景研究',
                description: '深入了解对方国家和文化背景',
                priority: 'high',
            },
        ],
        similarCases: [],
    };

    return {
        ...defaults,
        ...report,
        overallScore: typeof report.overallScore === 'number' ? report.overallScore : defaults.overallScore,
        keyDecisions: Array.isArray(report.keyDecisions) ? report.keyDecisions : defaults.keyDecisions,
        sentimentTrend: Array.isArray(report.sentimentTrend) ? report.sentimentTrend : defaults.sentimentTrend,
        strengths: Array.isArray(report.strengths) ? report.strengths : defaults.strengths,
        weaknesses: Array.isArray(report.weaknesses) ? report.weaknesses : defaults.weaknesses,
        recommendations: Array.isArray(report.recommendations) ? report.recommendations : defaults.recommendations,
        similarCases: Array.isArray(report.similarCases) ? report.similarCases : defaults.similarCases,
    };
}

// 获取默认报告
function getDefaultReport(userScore?: number): Record<string, unknown> {
    return {
        overallScore: userScore || 50,
        summary: '本次谈判分析已完成，建议查看详细报告了解更多改进建议。',
        keyDecisions: [
            {
                turn: 1,
                decision: '完成了一次谈判练习',
                impact: 'neutral',
                explanation: '通过练习积累经验是提升谈判能力的重要途径',
            },
        ],
        sentimentTrend: [
            { phase: '开局', value: 0 },
            { phase: '中局', value: 0 },
            { phase: '结尾', value: 0 },
        ],
        strengths: [
            '积极参与谈判练习',
            '愿意学习和提升',
        ],
        weaknesses: [
            '建议深入了解外交案例',
            '可加强谈判策略学习',
        ],
        recommendations: [
            {
                category: 'preparation',
                title: '研究历史案例',
                description: '通过学习戴维营协议、南海声明等经典外交案例，了解成功的谈判策略和语言艺术。',
                priority: 'high',
            },
            {
                category: 'strategy',
                title: '掌握谈判节奏',
                description: '在谈判中注意观察对方反应，适时调整策略，不要过早暴露底线。',
                priority: 'medium',
            },
        ],
        similarCases: [
            {
                id: 'camp-david-1978',
                name: '戴维营协议',
                year: 1978,
                parties: '以色列 vs 埃及',
                outcome: 40,
                keyDifference: '戴维营协议展现了通过第三方调停和坚持谈判达成部分协议的可能性',
            },
            {
                id: 'south-china-sea-doc-2002',
                name: '南海各方行为宣言',
                year: 2002,
                parties: '中国 vs 东盟',
                outcome: 10,
                keyDifference: '南海宣言展示了在大国博弈中寻求共同利益的艰难过程',
            },
        ],
    };
}
