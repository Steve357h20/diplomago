import { NextRequest, NextResponse } from 'next/server';
import { streamChat, MODELS } from '@/lib/deepseek';

interface ResponseOption {
    id: string;
    text: string;
    tone: 'diplomatic' | 'assertive' | 'conciliatory' | 'strategic';
    angle: 'principles' | 'interests' | 'emotions' | 'compromise';
    languageStyle: string;
}

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: NextRequest) {
    try {
        const { context, history } = await request.json();

        const lastMessage = history?.length > 0 ? history[history.length - 1].content : '';

        const prompt = `你是一位资深外交谈判专家。请根据以下谈判场景，生成4个不同的回应选项供用户选择。

谈判主题：${context?.topic?.name || '通用谈判'}
己方：${context?.parties?.self?.country || '中国'}
对方：${context?.parties?.opponent?.country || '美国'}
对方最后发言：${lastMessage || '（开场）'}

请生成4个回应选项，每个选项必须有不同的语气和角度：

1. **外交型（Diplomatic）**：使用中性、平衡的语言，强调共同利益和双赢
2. **强硬型（Assertive）**：明确表达己方立场和底线，态度坚定但不攻击对方
3. **温和型（Conciliatory）**：展现善意和灵活性，试图缓解紧张气氛
4. **策略型（Strategic）**：使用暗示、比喻等高级语言技巧，迂回表达意图

每个选项格式要求：
- text: 具体的回应内容（50-100字的外交语言）
- tone: 对应的语气类型
- angle: 主要切入点（principles-原则/interests-利益/emotions-情感/compromise-妥协）
- languageStyle: 具体的语言风格描述

请直接返回一个JSON数组，不要包含任何其他文字。`;

        const messages = [
            { role: 'system' as const, content: '你是一个帮助生成外交谈判回应选项的AI助手。请直接返回JSON数组，不要有任何额外的文字。' },
            { role: 'user' as const, content: prompt },
        ];

        // 收集流式响应
        let fullContent = '';
        const stream = streamChat(messages, {
            model: MODELS.CHAT,
            temperature: 0.7,
        });

        for await (const chunk of stream) {
            fullContent += chunk;
        }

        // 尝试解析JSON
        let options: ResponseOption[] = [];

        const jsonMatch = fullContent.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            try {
                options = JSON.parse(jsonMatch[0]);
            } catch {
                // 解析失败，使用默认选项
            }
        }

        // 如果解析失败，生成默认选项
        if (options.length === 0) {
            options = [
                {
                    id: 'opt-1',
                    text: `关于${context?.topic?.name || '当前议题'}，我们认为各方应坚持相互尊重、平等协商的原则，在维护核心利益的基础上寻求共同发展。`,
                    tone: 'diplomatic',
                    angle: 'principles',
                    languageStyle: '使用客观陈述，强调原则性和平等姿态',
                },
                {
                    id: 'opt-2',
                    text: '我们必须明确指出，在这一关键问题上，我们的立场是坚定的。任何妥协都必须建立在相互尊重的基础之上。',
                    tone: 'assertive',
                    angle: 'interests',
                    languageStyle: '明确划定底线，展示坚定立场',
                },
                {
                    id: 'opt-3',
                    text: `我们理解贵方立场的合理性，也愿意展现必要的灵活性来推动谈判取得实质性进展。`,
                    tone: 'conciliatory',
                    angle: 'emotions',
                    languageStyle: '表达同理心，展现合作意愿',
                },
                {
                    id: 'opt-4',
                    text: '这让我想起一个古老的外交智慧：授人以鱼不如授人以渔。或许我们可以共同探索一种创新的合作模式？',
                    tone: 'strategic',
                    angle: 'compromise',
                    languageStyle: '使用比喻和暗示，引导新的思考方向',
                },
            ];
        }

        // 确保每个选项有唯一ID
        options = options.map((opt, idx) => ({
            ...opt,
            id: opt.id || `opt-${Date.now()}-${idx}`,
        }));

        return NextResponse.json(options);
    } catch (error) {
        console.error('Generate options error:', error);

        // 返回默认选项
        return NextResponse.json([
            {
                id: 'default-1',
                text: '我们愿意在相互尊重的基础上，通过对话协商解决分歧。',
                tone: 'diplomatic',
                angle: 'principles',
                languageStyle: '中性、平衡的表达方式',
            },
            {
                id: 'default-2',
                text: '在这一核心议题上，我们的立场是明确的，不会改变。',
                tone: 'assertive',
                angle: 'interests',
                languageStyle: '坚定、明确的表态',
            },
            {
                id: 'default-3',
                text: '我们理解贵方的关切，愿意做出适当的让步来达成共识。',
                tone: 'conciliatory',
                angle: 'emotions',
                languageStyle: '温和、友好的表达',
            },
            {
                id: 'default-4',
                text: '也许我们可以换一个角度来看待这个问题...',
                tone: 'strategic',
                angle: 'compromise',
                languageStyle: '引导性、启发式的表达',
            },
        ]);
    }
}