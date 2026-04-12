import { NextRequest, NextResponse } from "next/server";
import { streamChat, MODELS } from "@/lib/deepseek";

export const runtime = "nodejs";
export const maxDuration = 120;

// 议题状态追踪
interface IssueState {
    id: string;
    title: string;
    description?: string;
    controversy?: string;
    selfPosition?: string;
    opponentPosition?: string;
    importance?: number;
    status: 'pending' | 'discussing' | 'agreed' | 'disputed' | 'deadlock';
    selfGain: number;
    opponentGain: number;
    discussionTurns: number;
}

interface NegotiationState {
    issues: IssueState[];
    currentIssueIndex: number;
    turnCount: number;
    selfAttitude: number;
    opponentAttitude: number;
    momentum: 'advancing' | 'stalled' | 'reversing';
    breakthroughChance: number;
}

interface OpponentProfile {
    country: string;
    personality: {
        aggression: number;
        flexibility: number;
        patience: number;
        riskTolerance: number;
        nationalism: number;
    };
    negotiationStyle?: {
        primary: string;
        secondary: string;
        approach: string;
        communication: string;
    };
    historicalBackground?: string;
    typicalStrategies?: string[];
    vulnerabilities?: string[];
    coreInterests?: string[];
    importantInterests?: string[];
    negotiableInterests?: string[];
    leveragePoints?: string[];
}

const negotiationStates: Record<string, NegotiationState> = {};

// 获取或初始化谈判状态
function getOrCreateState(sessionId: string, issues: IssueState[]): NegotiationState {
    if (!negotiationStates[sessionId]) {
        negotiationStates[sessionId] = {
            issues: issues.map((issue) => ({
                id: issue.id,
                title: issue.title,
                description: issue.description,
                controversy: issue.controversy,
                selfPosition: issue.selfPosition,
                opponentPosition: issue.opponentPosition,
                importance: issue.importance,
                status: 'pending' as const,
                selfGain: 0,
                opponentGain: 0,
                discussionTurns: 0,
            })),
            currentIssueIndex: 0,
            turnCount: 0,
            selfAttitude: 50,
            opponentAttitude: 50,
            momentum: 'advancing',
            breakthroughChance: 30,
        };
    }
    return negotiationStates[sessionId];
}

// 构建对手国家的精细化提示词档案（保留原函数，无需修改）
function buildOpponentProfile(opponent: OpponentProfile): string {
    const style = opponent.negotiationStyle || { primary: 'competitive', secondary: 'principled', approach: 'interest-based', communication: 'indirect' };

    const profile = `
【对手国家档案】${opponent.country}

■ 历史文化背景
${opponent.historicalBackground || '该国拥有独特的历史文化传统。'}

■ 五维性格评估
- 攻击性：${opponent.personality.aggression}/10 ${opponent.personality.aggression >= 7 ? '(强硬型)' : opponent.personality.aggression >= 4 ? '(稳健型)' : '(温和型)'}
- 灵活性：${opponent.personality.flexibility}/10 ${opponent.personality.flexibility >= 7 ? '(善于变通)' : opponent.personality.flexibility >= 4 ? '(有底线)' : '(原则性强)'}
- 耐心：${opponent.personality.patience}/10 ${opponent.personality.patience >= 7 ? '(长期博弈型)' : '(速战速决型)'}
- 风险承受：${opponent.personality.riskTolerance}/10 ${opponent.personality.riskTolerance >= 7 ? '(敢于冒险)' : '(谨慎保守)'}
- 民族主义：${opponent.personality.nationalism}/10 ${opponent.personality.nationalism >= 7 ? '(立场强硬)' : '(务实理性)'}

■ 谈判风格
- 主要风格：${style.primary}
- 次要风格：${style.secondary}
- 沟通方式：${style.communication === 'direct' ? '直接坦诚' : style.communication === 'indirect' ? '含蓄委婉' : '适度直接'}

■ 核心利益（绝不会让步）
${opponent.coreInterests?.map(i => `  - ${i}`).join('\n') || '  - 国家主权与核心利益'}

■ 重要利益（可以谈判但困难）
${opponent.importantInterests?.map(i => `  - ${i}`).join('\n') || '  - 经济发展与国际地位'}

■ 可交易利益（可以交换）
${opponent.negotiableInterests?.map(i => `  - ${i}`).join('\n') || '  - 贸易条款、技术合作'}

■ 典型谈判策略
${opponent.typicalStrategies?.map(s => `  - ${s}`).join('\n') || '  - 议题捆绑、时间战术'}

■ 弱点/顾虑（可以利用）
${opponent.vulnerabilities?.map(v => `  - ${v}`).join('\n') || '  - 国内政治压力、经济依赖'}`;

    return profile;
}

// 分析消息中的关键信号（保留原函数）
function analyzeNegotiationSignals(message: string): {
    type: 'proposal' | 'concession' | 'pressure' | 'agreement' | 'rejection' | 'question' | 'stall' | 'normal';
    intensity: number;
    implication: string;
} {
    const msg = message.toLowerCase();

    if (msg.includes('提议') || msg.includes('建议') || msg.includes('方案') || msg.includes('我们可以') || msg.includes('愿意考虑')) {
        const intensity = msg.includes('重大') || msg.includes('核心') ? 8 : msg.includes('具体') || msg.includes('细节') ? 6 : 4;
        return { type: 'proposal', intensity, implication: '对方准备做出调整或提出新方案' };
    }

    if (msg.includes('让步') || msg.includes('妥协') || msg.includes('各退一步') || msg.includes('灵活性') || msg.includes('可以理解')) {
        return { type: 'concession', intensity: 7, implication: '对方态度软化，可能愿意达成协议' };
    }

    if (msg.includes('关切') || msg.includes('抗议') || msg.includes('坚决反对') || msg.includes('不可接受') || msg.includes('红线')) {
        const intensity = msg.includes('坚决') || msg.includes('绝') || msg.includes('绝不') ? 9 : 6;
        return { type: 'pressure', intensity, implication: '对方在核心利益上立场坚定' };
    }

    if (msg.includes('同意') || msg.includes('认可') || msg.includes('接受') || msg.includes('赞赏') || msg.includes('积极')) {
        return { type: 'agreement', intensity: 8, implication: '对方倾向于达成一致' };
    }

    if (msg.includes('反对') || msg.includes('拒绝') || msg.includes('无法接受') || msg.includes('不能同意')) {
        return { type: 'rejection', intensity: 7, implication: '对方明确表示反对当前方案' };
    }

    if (msg.includes('研究') || msg.includes('考虑') || msg.includes('需要时间') || msg.includes('国内程序') || msg.includes('复杂')) {
        return { type: 'stall', intensity: 5, implication: '对方可能在拖延或有内部分歧' };
    }

    if (msg.includes('？') || msg.includes('如何') || msg.includes('请问') || msg.includes('能否')) {
        return { type: 'question', intensity: 4, implication: '对方在寻求信息或澄清立场' };
    }

    return { type: 'normal', intensity: 3, implication: '一般性讨论' };
}

// 检查是否需要用户做决策（保留原函数）
function checkDecisionPoint(
    state: NegotiationState,
    lastMessage: string,
    isOpponentSpeaking: boolean,
    opponentProfile: OpponentProfile
): {
    needed: boolean;
    question?: string;
    context?: string;
    options?: Array<{
        id: string;
        text: string;
        explanation: string;
        impact: 'self-positive' | 'self-negative' | 'both-positive' | 'opponent-positive';
        tactic: string;
    }>;
} {
    const currentIssue = state.issues[state.currentIssueIndex];
    if (!currentIssue) return { needed: false };

    const signals = analyzeNegotiationSignals(lastMessage);

    if (isOpponentSpeaking) {
        if (signals.type === 'proposal' && signals.intensity >= 6) {
            const opponentFlexibility = opponentProfile.personality.flexibility;

            return {
                needed: true,
                question: `「${currentIssue.title}」：对方提出了方案`,
                context: `对方在${currentIssue.title}上展现了${signals.implication}。对方灵活性评估为${opponentFlexibility}/10。`,
                options: [
                    { id: 'accept', text: `认可方案，推进达成一致`, explanation: `对方展现诚意，可以接受以巩固成果`, impact: 'both-positive', tactic: '合作策略' },
                    { id: 'counter', text: `提出对案，争取更多`, explanation: `趁对方态度积极，争取更好条件`, impact: 'self-positive', tactic: '进取策略' },
                    { id: 'tie', text: `附加条件，捆绑议题`, explanation: `将其他议题与此方案挂钩，争取综合收益`, impact: 'self-positive', tactic: '议题联动' },
                    { id: 'defer', text: `暂不表态，保留筹码`, explanation: `不急于回应，保持谈判压力`, impact: 'opponent-positive', tactic: '观望策略' }
                ]
            };
        }

        if (signals.type === 'pressure' || signals.type === 'rejection') {
            return {
                needed: true,
                question: `「${currentIssue.title}」：对方态度强硬`,
                context: `${currentIssue.title}面临僵局。对方${signals.implication}。`,
                options: [
                    { id: 'push', text: `继续施压，据理力争`, explanation: `坚持立场，不轻易让步`, impact: 'self-negative', tactic: '对抗策略' },
                    { id: 'concede', text: `适度让步，展示诚意`, explanation: `用小的让步换取对方在核心议题上的松动`, impact: 'both-positive', tactic: '破冰策略' },
                    { id: 'shift', text: `转换议题，迂回推进`, explanation: `暂时搁置争议，从其他议题寻找突破口`, impact: 'both-positive', tactic: '迂回策略' },
                    { id: 'escalate', text: `升级施压，亮出筹码`, explanation: `展示我方筹码和决心`, impact: 'self-negative', tactic: '威慑策略' }
                ]
            };
        }
    }

    if (currentIssue.discussionTurns >= 4 && currentIssue.status !== 'agreed') {
        return {
            needed: true,
            question: `「${currentIssue.title}」已讨论${currentIssue.discussionTurns}轮`,
            context: `该议题陷入僵持。势头评估：${state.momentum}，突破可能性：${state.breakthroughChance}%`,
            options: [
                { id: 'settle', text: `接受现状，达成折中`, explanation: `在双方立场之间寻找平衡点`, impact: 'both-positive', tactic: '折中策略' },
                { id: 'break', text: `打破僵局，提出新方案`, explanation: `用创新方案绕过当前分歧`, impact: 'self-positive', tactic: '创新策略' },
                { id: 'next', text: `搁置争议，进入下一议题`, explanation: `不在此处纠缠，先解决其他问题`, impact: 'both-positive', tactic: '搁置策略' },
                { id: 'persist', text: `继续深挖，不轻言放弃`, explanation: `还有空间，继续争取`, impact: 'self-negative', tactic: '坚持策略' }
            ]
        };
    }

    return { needed: false };
}

// 更新谈判状态（保留原函数）
function updateNegotiationState(
    state: NegotiationState,
    userMessage: string,
    opponentResponse: string,
    opponentProfile: OpponentProfile
): NegotiationState {
    const userSignals = analyzeNegotiationSignals(userMessage);
    const opponentSignals = analyzeNegotiationSignals(opponentResponse);
    const currentIssue = state.issues[state.currentIssueIndex];

    state.turnCount++;

    if (userSignals.type === 'agreement' || userSignals.type === 'concession') {
        state.selfAttitude = Math.min(100, state.selfAttitude + 8);
    } else if (userSignals.type === 'pressure' || userSignals.type === 'rejection') {
        state.selfAttitude = Math.max(0, state.selfAttitude - 3);
    }

    if (opponentSignals.type === 'agreement' || opponentSignals.type === 'concession') {
        state.opponentAttitude = Math.min(100, state.opponentAttitude + 10);
    } else if (opponentSignals.type === 'pressure' || opponentSignals.type === 'rejection') {
        state.opponentAttitude = Math.max(0, state.opponentAttitude - 5);
    }

    const attitudeDiff = Math.abs(state.selfAttitude - state.opponentAttitude);
    if (attitudeDiff < 20 && (userSignals.type === 'proposal' || opponentSignals.type === 'proposal')) {
        state.momentum = 'advancing';
        state.breakthroughChance = Math.min(80, state.breakthroughChance + 15);
    } else if (userSignals.type === 'pressure' || opponentSignals.type === 'pressure') {
        state.momentum = 'reversing';
        state.breakthroughChance = Math.max(10, state.breakthroughChance - 10);
    } else if (opponentSignals.type === 'stall') {
        state.momentum = 'stalled';
    }

    if (currentIssue) {
        currentIssue.discussionTurns++;

        if (userSignals.type === 'agreement' && opponentSignals.type === 'agreement') {
            currentIssue.status = 'agreed';
            currentIssue.selfGain = currentIssue.selfGain || 40;
            currentIssue.opponentGain = currentIssue.opponentGain || 40;
            state.currentIssueIndex = Math.min(state.currentIssueIndex + 1, state.issues.length - 1);
            state.breakthroughChance = Math.min(70, state.breakthroughChance + 10);
        } else if (userSignals.type === 'concession') {
            currentIssue.selfGain = Math.max(-20, currentIssue.selfGain - 10);
            currentIssue.opponentGain = Math.min(80, currentIssue.opponentGain + 10);
        } else if (opponentSignals.type === 'concession') {
            currentIssue.selfGain = Math.min(80, currentIssue.selfGain + 10);
            currentIssue.opponentGain = Math.max(-20, currentIssue.opponentGain - 5);
        } else if (opponentSignals.type === 'rejection' || opponentSignals.type === 'pressure') {
            currentIssue.status = 'disputed';
            state.opponentAttitude = Math.max(0, state.opponentAttitude - 8);
        }
    }

    return state;
}

// 生成议程提示（保留原函数）
function generateAgendaPrompt(state: NegotiationState): string {
    const agendaList = state.issues.map((issue, idx) => {
        const prefix = idx === state.currentIssueIndex ? '▶【当前】' : idx < state.currentIssueIndex ? '✓' : '○';
        const statusText = issue.status === 'agreed' ? '[已达成]' :
            issue.status === 'disputed' ? '[有争议]' :
                issue.status === 'deadlock' ? '[僵局]' :
                    issue.status === 'discussing' ? '[讨论中]' : '';
        const gainText = issue.selfGain !== 0 || issue.opponentGain !== 0
            ? ` 己+${issue.selfGain}%/对+${issue.opponentGain}%` : '';
        return `${prefix} ${idx + 1}. ${issue.title} ${statusText}${gainText}`;
    }).join('\n');

    const currentIssue = state.issues[state.currentIssueIndex];
    const momentumText = state.momentum === 'advancing' ? '进展顺利' : state.momentum === 'stalled' ? '陷入僵持' : '势头逆转';

    return `
## 谈判议程状态（${state.currentIssueIndex + 1}/${state.issues.length}）
${agendaList}

## 当前议题详情
${currentIssue ? `【${currentIssue.title}】
- 重要性：${currentIssue.importance || 5}/10
- 争议焦点：${currentIssue.controversy || '待明确'}
- 己方立场：${currentIssue.selfPosition || '待表达'}
- 对方立场：${currentIssue.opponentPosition || '待明确'}
- 当前收益：己方 ${currentIssue.selfGain}% / 对方 ${currentIssue.opponentGain}%
- 讨论轮数：${currentIssue.discussionTurns}轮` : '所有议题已讨论完毕'}

## 谈判势头评估
- 势头：${momentumText}
- 突破可能性：${state.breakthroughChance}%
- 双方态度：己方 ${state.selfAttitude}% / 对方 ${state.opponentAttitude}%

## 议程推进规则
1. **必须严格按顺序推进**：每次只讨论当前议题，不跳题
2. **议题转换条件**：当前议题达成一致（agreed）或陷入僵局（deadlock）时才能进入下一议题
3. **推动进展**：每轮发言都要推动议题向前，不能原地踏步
4. **避免车轱辘话**：不说重复的话，每次发言要有新信息或新角度`;
}

// 生成对手回应 - 规则兜底（保留原函数，仅在AI失败时使用）
function generateOpponentResponse(
    state: NegotiationState,
    userMessage: string,
    opponentProfile: OpponentProfile,
    _lastOpponentMessage: string | null
): { response: string; signals: ReturnType<typeof analyzeNegotiationSignals> } {
    const currentIssue = state.issues[state.currentIssueIndex];
    if (!currentIssue) {
        return { response: '感谢各位的努力，我们已就所有议题达成一致。', signals: { type: 'agreement', intensity: 8, implication: '谈判完成' } };
    }

    const userSignals = analyzeNegotiationSignals(userMessage);
    const flex = opponentProfile.personality.flexibility;
    const patient = opponentProfile.personality.patience;
    const aggression = opponentProfile.personality.aggression;

    if (userSignals.type === 'agreement' && flex >= 5) {
        return {
            response: `我方注意到贵方展现出的建设性态度。关于${currentIssue.title}，我们愿意在已达成共识的基础上，继续推进细节讨论，尽快形成完整方案。`,
            signals: { type: 'agreement', intensity: 7, implication: '对方愿意合作' }
        };
    }

    if (userSignals.type === 'concession') {
        if (flex >= 6) {
            return {
                response: `我方注意到贵方做出的调整，这体现了对话的诚意。在${currentIssue.title}上，我们愿意给出相应回应，但需要贵方在[具体点]上给予理解。`,
                signals: { type: 'proposal', intensity: 6, implication: '对方愿意回报让步' }
            };
        } else {
            return {
                response: `我们注意到了贵方的表态。关于${currentIssue.title}，我们认为这还需要进一步研究。但我方对推进谈判持开放态度。`,
                signals: { type: 'stall', intensity: 5, implication: '对方态度谨慎' }
            };
        }
    }

    if (userSignals.type === 'pressure') {
        if (aggression >= 7) {
            return {
                response: `我方必须明确回应贵方的关切。在${currentIssue.title}上，我们的立场是基于国家核心利益，不会轻易改变。如果贵方坚持此立场，谈判将面临困难。`,
                signals: { type: 'rejection', intensity: 8, implication: '对方立场坚定' }
            };
        } else {
            return {
                response: `我方理解贵方的关切。关于${currentIssue.title}，我们愿意解释我们的考量，但某些核心关切是无法妥协的。建议双方寻找都能接受的表达方式。`,
                signals: { type: 'pressure', intensity: 6, implication: '对方有底线但愿沟通' }
            };
        }
    }

    if (userSignals.type === 'question') {
        return {
            response: `感谢贵方的提问。关于${currentIssue.title}的核心问题，我们认为关键在于理解彼此的[关切点]。我方的立场是基于对双方共同利益的考量。请问贵方对此有何具体考虑？`,
            signals: { type: 'question', intensity: 4, implication: '对方在澄清立场' }
        };
    }

    if (currentIssue.discussionTurns >= 3 && patient < 6) {
        return {
            response: `我们在${currentIssue.title}上已经讨论了相当长时间。我方建议双方都展现灵活性，尽快形成一致意见拖延对双方都没有好处。`,
            signals: { type: 'pressure', intensity: 6, implication: '对方希望推动进展' }
        };
    }

    const defaultResponses = [
        `关于${currentIssue.title}，我们的立场是明确的。我方认为，要推进这一议题，需要双方都展现出一定的灵活性。请问贵方对当前的分歧有何具体建议？`,
        `我方认真倾听了贵方的观点。在${currentIssue.title}上，我们认为首要的是找到双方的共同利益点。建议双方先就基本原则达成一致，再讨论具体细节。`,
        `关于争议焦点${currentIssue.controversy || currentIssue.title}，我方的考量是[从对方利益角度阐述]。如果贵方能从这个角度理解我们的立场，相信能找到共同点。`,
        `我方认为，当前在${currentIssue.title}上的分歧并非不可调和。关键是要区分哪些是核心关切，哪些是可以灵活处理的问题。我方愿意在此基础上进行讨论。`
    ];

    return {
        response: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
        signals: { type: 'normal', intensity: 4, implication: '一般性讨论' }
    };
}

export async function POST(request: NextRequest) {
    try {
        const {
            message,
            context,
            history,
            issues,
            sessionId,
            mode,
            lastOpponentMessage
        } = await request.json();

        // 构建对手档案
        const opponentProfile: OpponentProfile = {
            country: context?.parties?.opponent?.name || '未知国家',
            personality: {
                aggression: context?.parties?.opponent?.personality?.aggression || 5,
                flexibility: context?.parties?.opponent?.personality?.flexibility || 5,
                patience: context?.parties?.opponent?.personality?.patience || 5,
                riskTolerance: context?.parties?.opponent?.personality?.riskTolerance || 5,
                nationalism: context?.parties?.opponent?.personality?.nationalism || 5,
            },
            negotiationStyle: context?.parties?.opponent?.negotiationStyle,
            historicalBackground: context?.parties?.opponent?.historicalBackground,
            typicalStrategies: context?.parties?.opponent?.typicalStrategies,
            vulnerabilities: context?.parties?.opponent?.vulnerabilities,
            coreInterests: context?.parties?.opponent?.coreInterests,
            importantInterests: context?.parties?.opponent?.importantInterests,
            negotiableInterests: context?.parties?.opponent?.negotiableInterests,
            leveragePoints: context?.parties?.opponent?.leveragePoints,
        };

        // 获取或创建谈判状态
        const state = getOrCreateState(sessionId || 'default', issues || []);

        const agendaPrompt = generateAgendaPrompt(state);

        // 根据模式构建系统提示
        let systemPrompt = '';

        if (mode === 'beginner') {
            systemPrompt = `你是外交谈判AI教练。你的任务是：
1. **代替用户起草发言**（userContent）
2. **生成对手的回应**（opponentContent）

## 核心规则
- userContent：代表用户国家，用第一人称，专业但易懂，80-150字
- opponentContent：严格根据对手国家档案生成，体现该国独特的谈判风格

## 用户国家信息
- 代表国家：${context?.parties?.self?.country || '中国'}
- 谈判目标：${context?.topic?.name || '未指定'}
- 己方核心利益：${context?.parties?.self?.coreInterests?.join('、') || '维护国家利益'}

${agendaPrompt}

${buildOpponentProfile(opponentProfile)}

## 对手回应生成规则
根据对手的性格特征生成回应：
- 攻击性高的国家：更直接、更强硬
- 灵活性高的国家：更愿意提出方案、更务实
- 耐心低的压力大的国家：更容易接受快速达成协议
- 关键：对手的回应必须符合其档案中的典型策略

## 回复格式（严格JSON）
{
  "userContent": "用户发言内容（第一句必须点名议题，如'关于XXX议题'）",
  "opponentContent": "对手回应（必须符合该国谈判风格）",
  "analysis": {
    "opponentStrategy": "对手当前使用的策略",
    "opponentMood": "对手当前情绪状态",
    "breakthroughOpportunity": "是否存在突破机会",
    "riskLevel": "当前谈判风险等级"
  },
  "decisionPoint": null
}

## 何时设置decisionPoint
当以下条件满足时，必须暂停让用户决策：
1. 对方提出具体方案（提议、建议、方案）
2. 双方讨论超过4轮且仍有分歧
3. 对方态度明显软化（让步、灵活性表达）
4. 涉及己方核心利益的讨论

## 议程推进要求
- 每次发言必须推进议题，不能原地踏步
- 如果当前议题陷入僵局，可以提出具体建议打破僵局
- 不要重复之前说过的话`;
        } else {
            systemPrompt = `你是外交谈判模拟AI，扮演对方谈判队的核心发言人。

${agendaPrompt}

${buildOpponentProfile(opponentProfile)}

重要原则：
1. 严格按照议程顺序推进，不跳过议题
2. 每次发言推进议题，不能原地踏步
3. 用专业外交语言表达
4. 适当展现情绪和态度变化
5. 不要重复之前说过的话`;
        }

        // 构建消息历史
        const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
            { role: "system", content: systemPrompt },
        ];

        // 添加历史消息
        const recentHistory = history?.slice(-6) || [];
        recentHistory.forEach((msg: { role: string; content: string }) => {
            messages.push({
                role: msg.role === 'user' ? 'user' : 'assistant',
                content: msg.content,
            });
        });

        // 添加当前消息
        const userMessage = lastOpponentMessage
            ? `上一条对手发言："${lastOpponentMessage}"\n\n请继续谈判对话，生成userContent和opponentContent。`
            : message || '请开始谈判';
        messages.push({ role: "user", content: userMessage });

        // 使用流式响应
        const encoder = new TextEncoder();
        let fullContent = '';

        const readable = new ReadableStream({
            async start(controller) {
                try {
                    // 使用 DeepSeek 流式调用
                    const stream = streamChat(messages, {
                        model: MODELS.CHAT,
                        temperature: 0.6,
                    });

                    for await (const chunk of stream) {
                        const text = chunk.toString();
                        fullContent += text;
                        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: text, done: false })}\n\n`));
                    }

                    // 解析AI返回的内容
                    let parsedResponse = null;
                    try {
                        const jsonMatch = fullContent.match(/\{[\s\S]*\}/);
                        if (jsonMatch) {
                            parsedResponse = JSON.parse(jsonMatch[0]);
                        }
                    } catch {
                        // 解析失败，使用默认格式
                    }

                    // 如果新手模式，生成结构化响应
                    if (mode === 'beginner' && !parsedResponse?.opponentContent) {
                        const { response: generatedResponse, signals } = generateOpponentResponse(
                            state,
                            message || '',
                            opponentProfile,
                            lastOpponentMessage
                        );
                        parsedResponse = {
                            userContent: message || '让我们开始讨论。',
                            opponentContent: generatedResponse,
                            analysis: {
                                opponentStrategy: signals.implication,
                                opponentMood: signals.type,
                                breakthroughOpportunity: state.breakthroughChance > 50 ? '存在机会' : '需要更多努力',
                                riskLevel: signals.intensity > 7 ? '高' : signals.intensity > 4 ? '中' : '低'
                            }
                        };
                    }

                    // 更新谈判状态
                    const updatedState = updateNegotiationState(
                        state,
                        message || '',
                        parsedResponse?.opponentContent || '',
                        opponentProfile
                    );

                    // 检查是否需要决策点
                    const decisionPoint = checkDecisionPoint(
                        updatedState,
                        parsedResponse?.opponentContent || message || '',
                        true,
                        opponentProfile
                    );

                    // 返回状态
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                        content: '',
                        done: true,
                        userContent: parsedResponse?.userContent || null,
                        opponentContent: parsedResponse?.opponentContent || fullContent,
                        analysis: parsedResponse?.analysis,
                        decisionPoint: decisionPoint.needed ? decisionPoint : null,
                        state: {
                            currentIssueIndex: updatedState.currentIssueIndex,
                            currentIssue: updatedState.issues[updatedState.currentIssueIndex],
                            allIssues: updatedState.issues,
                            turnCount: updatedState.turnCount,
                            selfAttitude: updatedState.selfAttitude,
                            opponentAttitude: updatedState.opponentAttitude,
                            momentum: updatedState.momentum,
                            breakthroughChance: updatedState.breakthroughChance,
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
        console.error('AI Assistant API Error:', error);
        return NextResponse.json(
            { error: 'AI辅助对话处理失败，请稍后重试' },
            { status: 500 }
        );
    }
}

// 获取当前谈判状态
export async function GET(request: NextRequest) {
    const sessionId = request.nextUrl.searchParams.get('sessionId') || 'default';
    const state = negotiationStates[sessionId];

    if (!state) {
        return NextResponse.json({ state: null });
    }

    return NextResponse.json({ state });
}

// 重置谈判状态
export async function DELETE(request: NextRequest) {
    const sessionId = request.nextUrl.searchParams.get('sessionId') || 'default';
    delete negotiationStates[sessionId];

    return NextResponse.json({ success: true });
}