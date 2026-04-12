import { NextRequest } from 'next/server';
import { streamChat } from '@/lib/deepseek';

export const runtime = 'nodejs';

// 系统提示词 - 外交谈判助手
const SYSTEM_PROMPT = `你是外交谈判模拟平台的AI助手，名叫"派蒙"。你的职责是：

1. 帮助用户了解外交谈判的基础知识和策略
2. 回答关于平台功能的问题
3. 提供谈判技巧和方法的建议
4. 解释外交术语和概念
5. 引导用户使用平台的不同功能

你的性格特点：
- 友好、专业、有耐心
- 善于用简洁易懂的语言解释复杂概念
- 适当使用emoji增加亲和力
- 在提供建议时会考虑用户的实际需求

请用中文回答问题，保持简洁专业。`;

export async function POST(request: NextRequest) {
    try {
        const { messages } = await request.json();

        if (!messages || !Array.isArray(messages)) {
            return new Response(JSON.stringify({ error: '无效的请求' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // 构建完整的消息列表
        const fullMessages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.map((m: { role: string; content: string }) => ({
                role: m.role as 'user' | 'assistant',
                content: m.content,
            })),
        ];

        // 创建 SSE 流式响应
        const encoder = new TextEncoder();
        const readable = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of streamChat(fullMessages, {
                        temperature: 0.7,
                    })) {
                        const data = JSON.stringify({ content: chunk, done: false });
                        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
                    }
                    // 发送完成信号
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
                    controller.close();
                } catch (error) {
                    console.error('Stream error:', error);
                    const errorData = JSON.stringify({ error: '流式输出错误' });
                    controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
                    controller.close();
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
        console.error('AI Assistant Error:', error);
        return new Response(
            JSON.stringify({ error: '抱歉，AI助手暂时无法回应。请稍后再试。' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}