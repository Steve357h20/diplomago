import { NextRequest, NextResponse } from 'next/server';
import { invokeChat, MODELS } from '@/lib/deepseek';

interface LanguageAnalysis {
    technique: string;
    meaning: string;
    effect: string;
    improvement?: string;
}

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: NextRequest) {
    try {
        const { text, tone, angle, context } = await request.json();

        const prompt = `请分析以下外交谈判中的语言表达，并提供专业的语言艺术分析。

待分析文本：${text}
语气类型：${tone}
切入角度：${angle}
谈判背景：${context?.topic?.name || '通用谈判'}（${context?.parties?.self?.country || '中国'} vs ${context?.parties?.opponent?.country || '美国'}）

请从以下几个方面进行分析：

1. **核心技巧**：这段话使用了什么外交语言技巧？（如：条件句、让步句、暗示、双关、比喻等）
2. **言外之意**：这句话表面上在说什么？实际上在传达什么隐含信息？
3. **预期效果**：这句话可能产生什么效果？（对己方、对对方、对整体局势）
4. **优化建议**（可选）：如果有改进空间，请提供具体的优化建议

请用JSON格式返回，包含以下字段：
- technique: 核心技巧名称
- meaning: 言外之意（30字以内）
- effect: 预期效果（30字以内）
- improvement: 优化建议（可选，50字以内）

只返回JSON，不要包含任何其他文字。`;

        const messages = [
            { role: 'system' as const, content: '你是一个专业的外交语言艺术分析师。请直接返回JSON，不要有任何额外的文字。' },
            { role: 'user' as const, content: prompt },
        ];

        // 调用 DeepSeek 非流式生成
        const fullContent = await invokeChat(messages, {
            model: MODELS.CHAT,
            temperature: 0.3,
        });

        // 尝试解析JSON
        let analysis: LanguageAnalysis | null = null;

        const jsonMatch = fullContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            try {
                analysis = JSON.parse(jsonMatch[0]);
            } catch {
                // 解析失败
            }
        }

        // 如果解析失败，生成默认分析
        if (!analysis) {
            const techniqueMap: Record<string, string> = {
                diplomatic: '原则性表述',
                assertive: '底线声明',
                conciliatory: '善意表达',
                strategic: '策略性暗示',
            };

            analysis = {
                technique: techniqueMap[tone] || '一般表述',
                meaning: '在坚持原则的同时，寻求通过对话解决分歧',
                effect: '展示诚意但不失立场，利于后续谈判',
                improvement: tone === 'assertive'
                    ? '可考虑在强硬表态后加入一句缓和语气，展现灵活性'
                    : undefined,
            };
        }

        return NextResponse.json(analysis);
    } catch (error) {
        console.error('Language analysis error:', error);

        return NextResponse.json({
            technique: '外交表达',
            meaning: '寻求通过对话协商解决分歧',
            effect: '展现合作意愿，利于建立互信',
        });
    }
}
