import { NextRequest, NextResponse } from "next/server";
import { streamChat, MODELS } from "@/lib/deepseek";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
    try {
        const {
            userMessage,
            opponentResponse,
            context,
            issues,
            currentIssueIndex,
            state,
            history
        } = await request.json();

        // 构建教练分析提示
        const systemPrompt = `你是外交谈判教练AI。你的任务是对用户的发言进行深度分析，提供：
1. 有效性评估（0-100分）
2. 亮点分析（做对了什么）
3. 改进建议（可以做得更好的地方）
4. 策略洞察（对手策略分析和应对建议）

## 分析维度
- 语言技巧：措辞是否专业、得体、有力
- 策略运用：是否有效推进议题
- 情绪控制：语气是否恰当
- 信息掌控：是否有效传递关键信息

## 对手分析维度
- 对手当前策略：他在用什么方法
- 对手态度信号：他是强硬、软化还是观望
- 突破机会：是否存在可以利用的机会
- 潜在风险：需要注意什么

## 输出格式（严格JSON）
{
  "effectiveness": 75,
  "strengths": ["亮点1", "亮点2"],
  "weaknesses": ["弱点1", "弱点2"],
  "suggestions": ["建议1", "建议2"],
  "opponentAnalysis": {
    "strategy": "对手使用的策略",
    "mood": "对手当前情绪",
    "opportunity": "是否存在突破机会",
    "risk": "需要注意的风险"
  },
  "strategicInsight": "深度策略洞察，一句话总结",
  "quickTip": "快速可执行的小技巧"
}

请用中文回复，简洁有力。`;

        const userPrompt = `
## 当前谈判背景
- 谈判主题：${context?.topic?.name || '未指定'}
- 用户代表：${context?.parties?.self?.country || '中国'}
- 对手国家：${context?.parties?.opponent?.name || '未知'}

## 当前议题
${issues?.[currentIssueIndex] ? `【${issues[currentIssueIndex].title}】
- 争议焦点：${issues[currentIssueIndex].controversy || '待明确'}
- 己方立场：${issues[currentIssueIndex].selfPosition || '待明确'}
- 对方立场：${issues[currentIssueIndex].opponentPosition || '待明确'}` : '待明确'}

## 当前状态
- 己方态度：${state?.selfAttitude || 50}%
- 对方态度：${state?.opponentAttitude || 50}%
- 势头：${state?.momentum || '不明'}
- 突破可能性：${state?.breakthroughChance || 30}%

## 用户刚才说了
"${userMessage}"

## 对手回应
"${opponentResponse}"

## 对话历史（最近3条）
${history?.slice(-3).map((m: any, i: number) => `${i === 0 ? '更早' : i === 1 ? '之前' : '最近'}：${m.role === 'user' ? '用户' : '对手'} - ${m.content.substring(0, 100)}...`).join('\n') || '无'}

请进行深度分析。`;

        const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
        ];

        // 使用流式响应
        const encoder = new TextEncoder();
        let fullContent = '';

        const readable = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of streamChat(messages, {
                        model: MODELS.REASONER,  // 使用深度推理模型进行策略分析
                        temperature: 0.5,
                    })) {
                        const text = chunk.toString();
                        fullContent += text;
                        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: text, done: false })}\n\n`));
                    }

                    // 尝试解析JSON
                    let parsed = null;
                    try {
                        const jsonMatch = fullContent.match(/\{[\s\S]*\}/);
                        if (jsonMatch) {
                            parsed = JSON.parse(jsonMatch[0]);
                        }
                    } catch {
                        // 解析失败，返回原始内容
                    }

                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                        content: '',
                        done: true,
                        analysis: parsed || {
                            effectiveness: 70,
                            strengths: ['表达了基本立场'],
                            weaknesses: ['可以更具策略性'],
                            suggestions: ['多关注对手的核心利益'],
                            opponentAnalysis: {
                                strategy: '观望中',
                                mood: '谨慎',
                                opportunity: '存在机会',
                                risk: '需注意对方底线'
                            },
                            strategicInsight: '保持沟通，寻找共同利益点。',
                            quickTip: '在下一次发言中尝试提出具体方案。'
                        }
                    })}\n\n`));
                    controller.close();
                } catch (error) {
                    console.error('Coach analysis error:', error);
                    controller.error(error);
                }
            },
        });

        return new Response(readable, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });
    } catch (error) {
        console.error('Coach API Error:', error);
        return NextResponse.json(
            { error: '教练分析处理失败' },
            { status: 500 }
        );
    }
}