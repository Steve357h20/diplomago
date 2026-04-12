import { NextRequest, NextResponse } from "next/server";
import { streamChat, MODELS } from "@/lib/deepseek";
import { getCaseIndex } from "@/lib/case-database";

export const runtime = "nodejs";
export const maxDuration = 120;

// 获取所有可用案例列表
const availableCases = getCaseIndex();

// 精细化对手档案构建
function buildOpponentProfile(opponent: any): string {
    if (!opponent) return '';

    const style = opponent.negotiationStyle || {
        primary: 'competitive',
        secondary: 'principled',
        approach: 'interest-based',
        communication: 'indirect',
    };

    return `
【对手国家档案】${opponent.name}

■ 历史文化背景
${opponent.historicalBackground || opponent.description || '该国拥有独特的历史文化传统。'}

${opponent.keyHistoricalEvents ? `■ 关键历史事件
${opponent.keyHistoricalEvents.slice(0, 3).map((e: string) => `- ${e}`).join('\n')}` : ''}

${opponent.culturalTraits ? `■ 文化特征
${Array.isArray(opponent.culturalTraits) ? opponent.culturalTraits.join('、') : opponent.culturalTraits}` : ''}

${opponent.diplomaticTraditions ? `■ 外交传统
${Array.isArray(opponent.diplomaticTraditions) ? opponent.diplomaticTraditions.join('、') : opponent.diplomaticTraditions}` : ''}

■ 五维性格评估
- 攻击性：${opponent.personality?.aggression || 5}/10
- 灵活性：${opponent.personality?.flexibility || 5}/10
- 耐心：${opponent.personality?.patience || 5}/10
- 风险承受：${opponent.personality?.riskTolerance || 5}/10
- 民族主义：${opponent.personality?.nationalism || 5}/10

■ 谈判风格
- 主要：${style.primary || '竞争型'}
- 次要：${style.secondary || '原则型'}
- 方法：${style.approach || '利益导向'}
- 沟通：${style.communication === 'direct' ? '直接' : style.communication === 'indirect' ? '含蓄' : '适度直接'}

■ 核心利益（不会让步）
${opponent.coreInterests?.map((i: string) => `- ${i}`).join('\n') || '- 国家核心利益'}

■ 重要利益（可以谈判）
${opponent.importantInterests?.map((i: string) => `- ${i}`).join('\n') || '- 重要利益'}

■ 可交易利益
${opponent.negotiableInterests?.map((i: string) => `- ${i}`).join('\n') || '- 可协商事项'}

■ 典型谈判策略
${opponent.typicalStrategies?.map((s: string) => `- ${s}`).join('\n') || '- 利益交换、时间战术'}

■ 弱点/顾虑
${opponent.vulnerabilities?.map((v: string) => `- ${v}`).join('\n') || '- 国内政治压力'}
`;
}

export async function POST(request: NextRequest) {
    try {
        const { message, context, sentiment, history } = await request.json();

        // 格式化案例列表给AI参考
        const caseList = availableCases.map(c =>
            `- ${c.id}: ${c.name} (${c.year}) - ${c.topic}`
        ).join('\n');

        // 构建专业的外交谈判系统提示词
        const systemPrompt = `你是外交谈判模拟AI，扮演对方谈判队的核心发言人。

## 核心原则
1. 严格按照议程顺序推进，不跳题
2. 每次发言推进议题，不能原地踏步
3. 用专业外交语言表达
4. 展现对方的核心利益和关切
5. 不要重复之前说过的话
6. 当出现僵局时，提出具体方案打破僵局

${context?.parties?.opponent ? buildOpponentProfile(context.parties.opponent) : ''}

## 谈判议题
- 主题：${context?.topic?.name || '未指定'}
- 关键议题：${context?.topic?.keyIssues?.join('、') || '未指定'}

## 参考案例
${caseList}

## 你的回复要求
1. 长度适中（80-200字），模拟真实谈判节奏
2. 聚焦当前议题，提出具体观点
3. 展现角色的专业性和人情味
4. 在合适时机提出方案或反建议
5. 根据对手的性格特征调整语气和策略

## 议程推进规则
- 如果当前议题讨论超过3轮仍未达成，需要提出新的推动方案
- 不要总是在中立立场徘徊，要有明确的立场推进
- 当对方做出让步时，适当给予正面回应
- 当对方施压时，坚定维护核心利益但保持对话

现在开始谈判对话。请用符合角色设定的方式进行谈判。`;

        // 构建消息历史
        const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
            { role: "system", content: systemPrompt },
        ];

        // 添加历史消息（最近8条）
        const recentHistory = history?.slice(-8) || [];
        recentHistory.forEach((msg: { role: string; content: string }) => {
            messages.push({
                role: msg.role === 'user' ? 'user' : 'assistant',
                content: msg.content,
            });
        });

        // 添加当前用户消息
        let userMessage = message;
        if (sentiment) {
            userMessage = `${message}\n\n[用户情绪分析：${sentiment.emotion}，置信度${(sentiment.confidence * 100).toFixed(0)}%，强度${sentiment.intensity}]`;
        }
        messages.push({ role: "user", content: userMessage });

        // 使用流式响应
        const encoder = new TextEncoder();
        const readable = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of streamChat(messages, {
                        model: MODELS.CHAT,
                        temperature: 0.65,
                    })) {
                        const text = chunk.toString();
                        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: text, done: false })}\n\n`));
                    }

                    // 发送完成信号
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: '', done: true })}\n\n`));
                    controller.close();
                } catch (error) {
                    console.error('Stream error:', error);
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
        console.error('Chat API Error:', error);
        return NextResponse.json(
            { error: '谈判对话处理失败，请稍后重试' },
            { status: 500 }
        );
    }
}