import { NextRequest, NextResponse } from 'next/server';
import { streamChat, MODELS } from '@/lib/deepseek';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            type, // 'bilateral' | 'multilateral' | 'custom'
            topic,
            countries,
            era,
            selfCountry,
            opponentCountry,
            customContent,
            language = 'zh'
        } = body;

        // 时期特征映射（传递给AI以生成符合时代风格的背景）
        const eraContext: Record<string, {
            name: string;
            characteristics: string;
            languageStyle: string;
            typicalDiplomacy: string;
        }> = {
            'cold-war-early': {
                name: '冷战初期 (1947-1962)',
                characteristics: '东西方阵营对立最尖锐，意识形态对抗严重，外交语言充满对抗性，联盟体系分明，核威慑影响谈判心理',
                languageStyle: '对抗性、意识形态化、阵营化、强调阶级斗争',
                typicalDiplomacy: '遏制与反遏制、阵营外交、革命输出'
            },
            'cold-war-detente': {
                name: '冷战缓和 (1962-1979)',
                characteristics: '美苏关系缓和，首脑外交频繁，军备控制谈判兴起，第三世界国家活跃，经济相互依存增加',
                languageStyle: '务实、谨慎、寻求共识、规则导向',
                typicalDiplomacy: '缓和战略、军控谈判、多边机制'
            },
            'cold-war-late': {
                name: '冷战后期 (1979-1991)',
                characteristics: '苏联衰退，改革开放兴起，裁军谈判加速，地区冲突频繁，联盟体系松动',
                languageStyle: '转型期、试探性、灵活性增强、反思性',
                typicalDiplomacy: '新思维外交、战略收缩、融入西方'
            },
            'post-cold-war': {
                name: '后冷战时期 (1991-2008)',
                characteristics: '单极世界形成，全球化加速，多边主义兴起，国际制度完善，恐怖主义威胁上升',
                languageStyle: '规则导向、多边协商、利益交换、合作共赢',
                typicalDiplomacy: '制度外交、全球治理、人道主义干预'
            },
            'post-2008': {
                name: '后金融危机 (2008-2016)',
                characteristics: '金融危机重塑格局，新兴大国崛起，G20崛起，保护主义抬头，地缘竞争加剧',
                languageStyle: '谨慎、实用主义、警惕性增强、竞争与合作并存',
                typicalDiplomacy: 'G20协调、亚太再平衡、互联互通'
            },
            'modern': {
                name: '当代 (2016至今)',
                characteristics: '大国竞争加剧，多极化趋势明显，技术变革深刻，全球性挑战突出，联盟重组',
                languageStyle: '竞争与合作并存、话语权争夺激烈、技术化表达',
                typicalDiplomacy: '大国竞争、联盟重组、规则博弈'
            }
        };

        // 获取当前时期的特征
        const currentEraContext = era ? eraContext[era as keyof typeof eraContext] : eraContext['modern'];

        let systemPrompt = '';
        let userPrompt = '';

        if (type === 'bilateral') {
            systemPrompt = `你是一位专业的外交谈判背景策划专家。你的任务是根据提供的谈判主题、参与国家和历史时期，生成符合时代特征的外交谈判背景故事。

【重要】背景故事必须体现${currentEraContext.name}的时代特征：
- 时期特征：${currentEraContext.characteristics}
- 语言风格：${currentEraContext.languageStyle}
- 外交风格：${currentEraContext.typicalDiplomacy}

背景故事应当包含以下部分：
1. 【时代背景】：详细描述${currentEraContext.name}的国际环境，包括主要矛盾、力量对比、时代主题
2. 【历史脉络】：描述两国关系在该时期的历史发展，包括重要的历史事件、条约、冲突与合作
3. 【两国关系现状】：分析该时期两国关系的特点、友好程度、主要分歧
4. 【谈判起因】：说明本次谈判在该时期的直接原因和背景
5. 【各方关切】：分别分析双方在该时期的核心利益诉求和关切
6. 【当前局势】：描述谈判开始时的具体态势

要求：
- 内容应当专业、翔实，符合外交学和国际关系学的基本逻辑
- 历史事件应当真实可信，有具体的时间和背景
- 各国立场分析应当基于该国的国家利益、文化传统和现实处境
- 语言应当符合${currentEraContext.languageStyle}的时代特征
- 内容长度应在800-1200字之间`;

            const country1Info = countries?.[0] || selfCountry;
            const country2Info = countries?.[1] || opponentCountry;

            userPrompt = `请为以下${currentEraContext.name}时期的双边外交谈判场景生成详细的背景故事：

【历史时期】
${currentEraContext.name}
- 时代特征：${currentEraContext.characteristics}
- 语言风格：${currentEraContext.languageStyle}

【谈判主题】
名称：${topic?.name || '未指定'}
类型：${topic?.category || '综合议题'}
描述：${topic?.description || '外交谈判'}
关键议题：${topic?.keyIssues?.join('、') || '待确定'}

【甲方】
国家：${country1Info?.name || selfCountry || '未指定'}
${country1Info?.region ? `地区：${country1Info.region}` : ''}
${country1Info?.historicalBackground?.brief ? `特点：${country1Info.historicalBackground.brief}` : ''}

【乙方】
国家：${country2Info?.name || opponentCountry || '未指定'}
${country2Info?.region ? `地区：${country2Info.region}` : ''}
${country2Info?.historicalBackground?.brief ? `特点：${country2Info.historicalBackground.brief}` : ''}

${customContent ? `【用户提供的额外背景】
${customContent}` : ''}

请生成符合${currentEraContext.name}时代特征的完整背景故事。`;

        } else if (type === 'multilateral') {
            systemPrompt = `你是一位专业的外交谈判背景策划专家。你的任务是根据提供的多边谈判场景和历史时期，生成符合时代特征的背景故事。

【重要】背景故事必须体现${currentEraContext.name}的时代特征：
- 时期特征：${currentEraContext.characteristics}
- 语言风格：${currentEraContext.languageStyle}
- 外交风格：${currentEraContext.typicalDiplomacy}

背景故事应当包含以下部分：
1. 【时代背景】：描述${currentEraContext.name}的国际环境和该议题的时代意义
2. 【历史脉络】：描述相关议题在该时期的历史发展脉络和重要里程碑
3. 【当前国际背景】：分析当前国际形势下该议题的重要性
4. 【各方关系网络】：分析参与各方在该时期的相互关系（盟友、对手、复杂关系等）
5. 【谈判焦点】：明确本次谈判在该时期的核心分歧和争议点
6. 【当前态势】：描述谈判开始前的各方态势

要求：
- 内容应当专业、翔实，符合多边外交的特点
- 关注多方利益博弈的复杂性
- 突出各方立场在该时期的差异和可能的共同点
- 语言应当符合${currentEraContext.languageStyle}的时代特征
- 内容长度应在1000-1500字之间`;

            const countriesList = countries?.map((c: { name?: string; region?: string }, idx: number) =>
                `${idx + 1}. ${c?.name || '未知国家'}${c?.region ? ` (${c.region})` : ''}`
            ).join('\n') || '待确定';

            userPrompt = `请为以下${currentEraContext.name}时期的多边外交谈判场景生成详细的背景故事：

【历史时期】
${currentEraContext.name}
- 时代特征：${currentEraContext.characteristics}
- 语言风格：${currentEraContext.languageStyle}

【谈判主题】
名称：${topic?.name || '未指定'}
类型：${topic?.category || '综合议题'}
描述：${topic?.description || '多边外交谈判'}
关键议题：${topic?.keyIssues?.join('、') || '待确定'}

【参与方】（${countries?.length || 0}个）
${countriesList}

${customContent ? `【用户提供的额外背景】
${customContent}` : ''}

请生成符合${currentEraContext.name}时代特征的完整背景故事。`;

        } else if (type === 'custom') {
            systemPrompt = `你是一位专业的外交谈判背景策划专家。你的任务是理解用户提供的自定义场景内容，并生成完整、专业的背景故事。

你需要：
1. 准确理解用户提供的场景信息
2. 识别缺失的关键信息（如参与方、主题类型等）
3. 基于已有信息，补充生成合理、连贯的背景故事
4. 突出该场景的独特性和关键博弈点

背景故事应当包含：
1. 【场景解读】：理解用户提供的内容，确定场景的核心要素
2. 【历史背景】：补充相关历史脉络（可基于真实历史事件或合理虚构）
3. 【当前局势】：描述谈判/冲突的现状
4. 【关键分析】：分析各方的立场和利益诉求
5. 【可能走向】：简要分析可能的谈判走向

要求：
- 忠实于用户提供的原始信息
- 补充内容应当合理、符合历史和外交逻辑
- 语言应当正式、规范
- 内容长度应根据原始信息的完整度适当调整`;

            userPrompt = `请分析并补充以下自定义外交谈判场景的背景故事：

【用户提供的内容】
${customContent || '无'}

【已识别的要素】
主题类型：${topic?.category || '待识别'}
参与国家：${countries?.map((c: { name?: string }) => c?.name).join('、') || '待识别'}
时期：${era || '待识别'}
${topic?.name ? `主题名称：${topic.name}` : ''}

请：
1. 分析用户提供的内容，提取关键信息
2. 补充缺失但对于理解场景必要的背景信息
3. 生成完整的背景故事`;

        } else {
            return NextResponse.json({ error: 'Invalid background generation type' }, { status: 400 });
        }

        // 构建消息
        const messages = [
            { role: 'system' as const, content: systemPrompt },
            { role: 'user' as const, content: userPrompt }
        ];

        // 使用流式调用 DeepSeek
        const encoder = new TextEncoder();
        const readable = new ReadableStream({
            async start(controller) {
                try {
                    let fullContent = '';
                    for await (const chunk of streamChat(messages, {
                        model: MODELS.CHAT,
                        temperature: 0.7,
                    })) {
                        const text = chunk.toString();
                        fullContent += text;
                        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: text, done: false })}\n\n`));
                    }
                    // 发送完成信号，附带完整内容
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                        content: '',
                        done: true,
                        fullContent,
                        type,
                        language
                    })}\n\n`));
                    controller.close();
                } catch (error) {
                    console.error('Background generation stream error:', error);
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

    } catch (error: any) {
        console.error('Background generation error:', error);
        return NextResponse.json(
            {
                error: 'Failed to generate background',
                details: error.message
            },
            { status: 500 }
        );
    }
}