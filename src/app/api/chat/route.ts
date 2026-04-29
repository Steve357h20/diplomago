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

// 新增：构建当前议题状态文本
function buildCurrentIssueContext(issues: any[], currentIndex: number, goals?: any) {
    if (!issues || issues.length === 0) return '';
    const issue = issues[currentIndex];
    if (!issue) return '';

    return `
## 当前议题（第 ${currentIndex + 1}/${issues.length} 个）
【议题名称】${issue.title}
【争议焦点】${issue.controversy || '待明确'}
【己方立场】${issue.selfPosition || '待表达'}
【对方立场】${issue.opponentPosition || '待明确'}
【当前状态】${issue.status || '讨论中'}
【讨论轮数】${issue.discussionTurns || 0}

${goals ? `
【己方谈判目标】
- 高案：${goals.highCase}
- 中间方案：${goals.winWinCase}
- 底案：${goals.bottomLine}
` : ''}
`;
}

export async function POST(request: NextRequest) {
    try {
        const {
            message,
            context,
            sentiment,
            history,
            goals,
            issues,              // 新增
            currentIssueIndex    // 新增
        } = await request.json();

        const backgroundText = context?.background?.fullBackground || '';
        const caseList = availableCases.map(c => `- ${c.id}: ${c.name} (${c.year}) - ${c.topic}`).join('\n');
        const goalsText = goals ? `
## 对方谈判目标（仅供参考）
- 高案：${goals.highCase || '未设定'}
- 中间方案：${goals.winWinCase || '未设定'}
- 底案：${goals.bottomLine || '未设定'}
` : '';

        const currentIssueContext = buildCurrentIssueContext(issues, currentIssueIndex, goals);

        const systemPrompt = `你是外交谈判模拟AI，扮演对方谈判队的核心发言人。

## 核心原则
1. **严格按议程顺序推进**，每个议题必须彻底解决（达成共识或明确搁置）后才能进入下一议题。
2. **当用户明确提出接受方案或达成一致时，必须承认共识并主动结束当前议题**，不可继续纠缠。
3. **当议题讨论超过4轮仍未进展时，主动提议暂时搁置或提出折中方案**。
4. 用专业外交语言表达，避免情绪化反驳。
5. 根据对手档案调整策略，但以促成协议为最终目标。

${context?.parties?.opponent ? buildOpponentProfile(context.parties.opponent) : ''}

## 谈判背景
${backgroundText}

${goalsText}

${currentIssueContext}

## 参考案例
${caseList}

## 回复要求
1. 长度适中（30-100字）
2. 若用户表达接受/同意，明确回应“我方注意到贵方的积极态度，同意就此议题达成一致”并转入下一议题。
3. 若陷入僵局，可提议：“看来双方在此议题上分歧较大，不妨暂时搁置，先讨论下一议题？”
4. 避免为反驳而反驳，以推动议程为首要目标。

现在开始谈判对话。`;

        // 构建消息历史
        const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
            { role: "system", content: systemPrompt },
        ];

        const recentHistory = history?.slice(-8) || [];
        recentHistory.forEach((msg: { role: string; content: string }) => {
            messages.push({
                role: msg.role === 'user' ? 'user' : 'assistant',
                content: msg.content,
            });
        });

        let userMessage = message;
        if (sentiment) {
            userMessage = `${message}\n\n[用户情绪分析：${sentiment.emotion}，置信度${(sentiment.confidence * 100).toFixed(0)}%，强度${sentiment.intensity}]`;
        }
        messages.push({ role: "user", content: userMessage });

        // 用于流式响应后计算议题状态（简单规则示例，可根据实际需求增强）
        let updatedIssues = issues ? [...issues] : [];
        let newCurrentIndex = currentIssueIndex;

        // 简单判断用户消息是否表示接受（关键词）
        const acceptKeywords = ['接受', '同意', '认可', '就这么办', '达成一致', '没问题', '可以接受'];
        const userAccepts = acceptKeywords.some(kw => message.includes(kw));

        if (userAccepts && issues && currentIssueIndex < issues.length) {
            updatedIssues[currentIssueIndex] = {
                ...updatedIssues[currentIssueIndex],
                status: 'agreed',
                selfGain: 50, // 可更精细计算
                opponentGain: 50,
                discussionTurns: (updatedIssues[currentIssueIndex].discussionTurns || 0) + 1
            };
            // 如果还有下一议题，自动推进
            if (currentIssueIndex + 1 < issues.length) {
                newCurrentIndex = currentIssueIndex + 1;
            }
        }

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

                    // 发送议题状态更新
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                        content: '',
                        done: true,
                        state: {
                            currentIssueIndex: newCurrentIndex,
                            allIssues: updatedIssues,
                        }
                    })}\n\n`));
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
        return NextResponse.json({ error: '谈判对话处理失败' }, { status: 500 });
    }
}
