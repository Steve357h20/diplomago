// 多边谈判 API 路由
// 支持三方及以上的复杂外交谈判模拟

import { NextRequest, NextResponse } from 'next/server';
import { getCountryById, countries } from '@/lib/countries';
import { 
  CreateSessionRequest,
  MultilateralChatRequest,
  MultilateralChatResponse,
  MultilateralNegotiationSession,
  PartyInfo,
  NegotiationEvent,
  ProposedDeal,
  RiskScenario,
  createDefaultDifficulty,
  NegotiationTopic,
  UserNegotiationGoals,
  SessionGoals
} from '@/lib/multilateral-types';

// 会话存储（生产环境应使用数据库）
const sessions = new Map<string, MultilateralNegotiationSession>();

// 用户目标存储
const userGoalsStore = new Map<string, UserNegotiationGoals>();

// 扩展会话类型以包含用户目标
interface ExtendedSession extends MultilateralNegotiationSession {
  userGoals?: UserNegotiationGoals;
  opponentGoals?: Record<string, OpponentCountryGoals>; // 存储每个对手国家的谈判目标
}

// 对手国家的谈判目标
interface OpponentCountryGoals {
  highGoal: {
    title: string;
    description: string;
    keyTerms: string[];
  };
  middleGoal: {
    title: string;
    description: string;
    keyTerms: string[];
  };
  bottomLine: {
    title: string;
    description: string;
    keyTerms: string[];
  };
}

// ==================== 创建多边谈判会话 ====================
export async function POST(request: NextRequest) {
  try {
    const body: CreateSessionRequest = await request.json();
    
    // 验证必填字段
    if (!body.topic || !body.userCountryId || !body.opponentCountryIds?.length) {
      return NextResponse.json({ error: '缺少必填字段' }, { status: 400 });
    }
    
    // 验证国家
    const userCountry = getCountryById(body.userCountryId);
    if (!userCountry) {
      return NextResponse.json({ error: '用户国家不存在' }, { status: 400 });
    }
    
    const opponentCountries = body.opponentCountryIds.map(id => getCountryById(id)).filter(Boolean);
    if (opponentCountries.length === 0) {
      return NextResponse.json({ error: '对手国家不存在' }, { status: 400 });
    }
    
    // 确保至少有2个参与者
    if (opponentCountries.length < 1) {
      return NextResponse.json({ error: '至少需要1个对手国家' }, { status: 400 });
    }
    
    // 验证难度
    const validDifficulties = ['beginner', 'intermediate', 'advanced'];
    if (!validDifficulties.includes(body.difficulty)) {
      return NextResponse.json({ error: '无效的难度设置' }, { status: 400 });
    }
    
    // 创建会话ID
    const sessionId = `multilateral_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // 创建参与方信息
    const userParty: PartyInfo = {
      id: `party_${body.userCountryId}`,
      countryId: body.userCountryId,
      country: userCountry,
      isUser: true,
      objectives: {
        primary: generatePrimaryObjective(body.topic, userCountry.id),
        secondary: generateSecondaryObjectives(body.topic, userCountry.id),
      },
      publicPosition: body.initialPositions?.user || generateInitialPosition(body.topic, userCountry),
      ai: {
        sentiment: 50,
        proposedDeals: []
      }
    };
    
    const opponentParties: PartyInfo[] = opponentCountries.map((country, index) => ({
      id: `party_${country!.id}`,
      countryId: country!.id,
      country: country!,
      isUser: false,
      objectives: {
        primary: generatePrimaryObjective(body.topic, country!.id),
        secondary: generateSecondaryObjectives(body.topic, country!.id),
      },
      publicPosition: body.initialPositions?.opponents?.[country!.id] || generateInitialPosition(body.topic, country!),
      ai: {
        sentiment: 50,
        proposedDeals: []
      }
    }));
    
    // 第三方（如调解者）
    let thirdParties: PartyInfo[] = [];
    if (body.thirdPartyCountryIds?.length) {
      thirdParties = body.thirdPartyCountryIds
        .map(id => getCountryById(id))
        .filter(Boolean)
        .map((country, index) => ({
          id: `party_${country!.id}_mediator`,
          countryId: country!.id,
          country: country!,
          isUser: false,
          objectives: {
            primary: '促进谈判达成协议',
            secondary: ['维护地区稳定', '提升自身影响力'],
          },
          publicPosition: '愿意作为调解方协助各方达成共识',
          ai: {
            sentiment: 70,
            proposedDeals: []
          }
        }));
    }
    
    // 生成议题
    const topics = generateTopics(body.topic, userCountry, opponentCountries);
    
    // 生成风险情景
    const riskScenarios = generateRiskScenarios(topics, userCountry, opponentCountries);
    
    // 创建会话
    const session: ExtendedSession = {
      id: sessionId,
      topic: body.topic,
      topicDescription: body.topicDescription || '',
      background: body.background || '',
      parties: {
        user: userParty,
        opponents: opponentParties,
        thirdParties
      },
      difficulty: createDefaultDifficulty(body.difficulty),
      topics,
      timeline: [],
      currentPhase: 'opening',
      currentSpeaker: null,
      predictions: {
        probableOutcome: '谈判仍在进行中',
        confidenceLevel: 30,
        keyFactors: ['各方核心利益', '实力对比', '国际环境'],
        riskScenarios
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // 存储用户目标（如果有的话）
    if (body.userGoals) {
      session.userGoals = body.userGoals;
      userGoalsStore.set(sessionId, body.userGoals);
    }
    
    // 为每个对手国家生成谈判目标
    const opponentGoals: Record<string, OpponentCountryGoals> = {};
    for (const opponent of opponentCountries) {
      if (opponent) {
        opponentGoals[opponent.id] = generateOpponentGoals(body.topic, opponent);
      }
    }
    session.opponentGoals = opponentGoals;
    
    // 存储会话
    sessions.set(sessionId, session);
    
    return NextResponse.json({
      success: true,
      session,
      // 向用户展示的提示
      hints: {
        situation: `这是一场关于「${body.topic}」的多边外交谈判。`,
        userRole: `你代表${userCountry.name}，需要根据国家利益进行谈判。`,
        opponents: `你的对手包括：${opponentCountries.map(c => c!.name).join('、')}。`,
        tip: getDifficultyTip(body.difficulty),
        // 如果有预设目标，添加提示
        ...(body.userGoals ? {
          hasGoals: true,
          goalsSummary: {
            highGoal: body.userGoals.highGoal.title,
            middleGoal: body.userGoals.middleGoal?.title,
            bottomLine: body.userGoals.bottomLine.title
          }
        } : {})
      }
    });
    
  } catch (error) {
    console.error('创建多边谈判会话失败:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

// ==================== 获取会话 ====================
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');
  
  if (!sessionId) {
    return NextResponse.json({ error: '缺少sessionId' }, { status: 400 });
  }
  
  const session = sessions.get(sessionId) as ExtendedSession | undefined;
  if (!session) {
    return NextResponse.json({ error: '会话不存在' }, { status: 404 });
  }
  
  // 获取用户目标
  const userGoals = userGoalsStore.get(sessionId);
  
  return NextResponse.json({ 
    session,
    userGoals: userGoals || null
  });
}

// ==================== 多边对话 ====================
export async function PUT(request: NextRequest) {
  try {
    const body: MultilateralChatRequest = await request.json();
    
    if (!body.sessionId || !body.message) {
      return NextResponse.json({ error: '缺少必填字段' }, { status: 400 });
    }
    
    const session = sessions.get(body.sessionId) as ExtendedSession | undefined;
    if (!session) {
      return NextResponse.json({ error: '会话不存在' }, { status: 404 });
    }
    
    const userParty = session.parties.user;
    const allOpponents = [...session.parties.opponents, ...(session.parties.thirdParties || [])];
    
    // 获取用户目标
    const userGoals = userGoalsStore.get(body.sessionId);
    
    // 添加用户消息到时间线
    const userEvent: NegotiationEvent = {
      id: `event_${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: 'message',
      speaker: userParty.countryId,
      content: {
        text: body.message,
        diplomaticVersion: body.message, // 用户输入不翻译
      },
      sentiment: 50,
      tone: 'neutral'
    };
    session.timeline.push(userEvent);
    
    // 为每个对手生成响应
    const responses: MultilateralChatResponse['responses'] = [];
    
    for (const opponent of allOpponents) {
      // 判断是否需要响应（如果有targetParties限制）
      if (body.targetParties && !body.targetParties.includes(opponent.countryId)) {
        continue;
      }
      
      // 生成AI响应
      const response = await generateAIResponse(session, userParty, opponent, body.message, userGoals);
      
      // 添加到响应列表
      responses.push({
        partyId: opponent.countryId,
        message: response.message,
        diplomaticVersion: response.diplomaticVersion,
        sentiment: response.sentiment,
        tone: (response.tone || 'neutral') as 'positive' | 'negative' | 'neutral' | 'warning' | 'ultimatum' as 'positive' | 'negative' | 'neutral' | 'warning' | 'ultimatum' as 'positive' | 'negative' | 'neutral',
        suggestedDeals: response.suggestedDeals
      });
      
      // 添加到时间线
      const aiEvent: NegotiationEvent = {
        id: `event_${Date.now()}_${opponent.countryId}`,
        timestamp: new Date().toISOString(),
        type: 'message',
        speaker: opponent.countryId,
        target: [userParty.countryId],
        content: {
          text: response.message,
          diplomaticVersion: response.diplomaticVersion,
          simpleVersion: session.difficulty.level === 'beginner' ? response.simpleVersion : undefined,
          analysis: session.difficulty.level !== 'beginner' ? response.analysis : undefined
        },
        sentiment: response.sentiment,
        tone: (response.tone || "neutral") as any
      };
      session.timeline.push(aiEvent);
      
      // 更新AI情绪
      opponent.ai!.sentiment = response.sentiment;
      opponent.ai!.lastMessage = response.message;
    }
    
    // 更新会话状态
    session.currentPhase = updatePhase(session);
    session.updatedAt = new Date().toISOString();
    
    // 生成分析和建议（传入用户目标）
    const analysis = generateAnalysis(session, userParty, body.message, userGoals);
    
    const chatResponse: MultilateralChatResponse = {
      sessionId: session.id,
      responses,
      updatedSession: {
        currentPhase: session.currentPhase,
        timeline: session.timeline,
        predictions: session.predictions
      },
      analysis
    };
    
    return NextResponse.json(chatResponse);
    
  } catch (error) {
    console.error('多边对话处理失败:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

// ==================== 辅助函数 ====================

// 生成主要目标
function generatePrimaryObjective(topic: string, countryId: string): string {
  const objectives: { [key: string]: string } = {
    china: '维护核心利益，同时展现负责任大国形象',
    usa: '推进美国利益，维护基于规则的国际秩序',
    russia: '确保国家安全缓冲，恢复大国地位',
    uk: '维护英美特殊关系和金融中心地位',
    france: '提升欧盟战略自主，扩大法国影响力',
    germany: '促进欧洲一体化，确保能源和经济安全',
    japan: '维护美日同盟，同时发展对华关系',
    india: '战略自主，在大国间保持平衡',
    brazil: '维护发展中国家利益，争取更大话语权',
    southafrica: '代言非洲利益，推动南南合作',
    vietnam: '维护领土主权，同时发展经济',
    philippines: '保护领土权益，发展对华经贸',
    indonesia: '保持 ASEAN centrality，提升地区影响',
    singapore: '维护小国利益，利用规则保护自身',
    southkorea: '推进半岛和平，确保经济发展',
    ukraine: '维护领土完整，争取入欧入北约',
    turkey: '维护国家安全，扩大地区影响',
    iran: '维护政权生存，争取解除制裁',
    saudiarabia: '维护地区领导，平衡对以关系',
    australia: '维护盟友关系，发展对华经贸',
    eu: '推进欧洲一体化，维护多边主义',
    asean: '保持 ASEAN centrality，促进区域合作'
  };
  
  return objectives[countryId] || '维护国家利益';
}

// 生成次要目标
function generateSecondaryObjectives(topic: string, countryId: string): string[] {
  const common = ['提升国际影响力', '争取经济利益', '维护国际形象'];
  
  const specifics: { [key: string]: string[] } = {
    china: ['推进一带一路', '扩大技术合作', '维护周边稳定'],
    usa: ['遏制战略竞争对手', '维护美元霸权', '巩固盟友体系'],
    russia: ['解除制裁', '扩大能源出口', '维护势力范围'],
    germany: ['推动欧盟发展', '确保能源供应', '扩大中国市场'],
    japan: ['推动入常', '扩大防卫能力', '深化经济合作'],
    india: ['成为世界一极', '发展制造业', '确保能源安全'],
  };
  
  return [...common, ...(specifics[countryId] || [])];
}

// 为对手国家生成谈判目标（高案、中间方案、底案）
function generateOpponentGoals(topic: string, country: any): OpponentCountryGoals {
  const topicKeywords = extractTopicKeywords(topic);
  
  // 高案 - 基于核心利益最大化
  const highGoal = {
    title: `${country.name}主导的${topicKeywords}解决方案`,
    description: `在${topicKeywords}议题上，实现${country.name}利益最大化的理想结果。` +
      `基于国家核心利益（${country.coreInterests.slice(0, 2).join('、')}），` +
      `同时利用国家优势（${country.leveragePoints.slice(0, 2).join('、')}），` +
      `达成对${country.name}最为有利的协议框架。`,
    keyTerms: [
      `${country.coreInterests[0]}得到完全保障`,
      `协议条款符合${country.name}的战略利益`,
      `建立有约束力的执行机制`,
      `保留未来政策空间`
    ]
  };
  
  // 中间方案 - 务实可行的选择
  const middleGoal = {
    title: `${country.name}务实的${topicKeywords}中间方案`,
    description: `在${topicKeywords}议题上，寻求${country.name}与各方的平衡点。` +
      `核心利益（${country.coreInterests[0]}）得到基本保障，` +
      `重要利益（${country.importantInterests[0]}）争取实现，` +
      `展示灵活性和合作诚意，达成务实可行的协议。`,
    keyTerms: [
      `${country.coreInterests[0]}得到基本保障`,
      `建立互惠互利的合作框架`,
      `设置合理的执行时间表`,
      `包含定期review机制`
    ]
  };
  
  // 底案 - 最低可接受条件
  const bottomLine = {
    title: `${country.name}可接受的${topicKeywords}底线`,
    description: `${country.name}在${topicKeywords}议题上的最低可接受条件。` +
      `核心利益（${country.coreInterests[0]}）是绝对不可妥协的底线，` +
      `其他非核心利益可以在可接受范围内做出让步。`,
    keyTerms: [
      `${country.coreInterests[0]}不受损害`,
      `保留基本主权或核心决策权`,
      `有基本的争端预防机制`
    ]
  };
  
  return { highGoal, middleGoal, bottomLine };
}

// 提取议题关键词
function extractTopicKeywords(topic: string): string {
  // 常见议题关键词映射
  const keywordMap: Record<string, string> = {
    '贸易': '贸易',
    '关税': '关税',
    '气候': '气候',
    '环境': '环境',
    '能源': '能源',
    '安全': '安全',
    '南海': '南海',
    '制裁': '制裁',
    '核': '核',
    '和平': '和平',
    '领土': '领土',
    '海上': '海上',
    '数字': '数字贸易',
    '投资': '投资',
    '技术': '技术',
    '军事': '军事'
  };
  
  for (const [key, value] of Object.entries(keywordMap)) {
    if (topic.includes(key)) {
      return value;
    }
  }
  
  // 默认返回"相关"
  return '相关';
}

// 生成初始立场
function generateInitialPosition(topic: string, country: any): string {
  // 根据国家性格和话题生成初始立场
  const basePosition = `关于「${topic}」，${country.name}的立场是...`;
  
  // 根据国家性格调整
  if (country.personality?.aggression > 7) {
    return `${basePosition}我们将以坚定立场维护自身核心利益。`;
  } else if (country.personality?.flexibility > 7) {
    return `${basePosition}我们愿意在相互尊重的基础上寻求合作。`;
  } else {
    return `${basePosition}我们将基于国家利益参与讨论。`;
  }
}

// 生成议题
function generateTopics(
  topic: string, 
  userCountry: any, 
  opponents: any[]
): NegotiationTopic[] {
  const allCountries = [userCountry, ...opponents];
  
  return [
    {
      id: 'topic_1',
      title: '核心议题',
      description: topic,
      positions: Object.fromEntries(
        allCountries.map(c => [
          c.countryId,
          {
            stance: generateInitialPosition(topic, c),
            keyDemands: generateKeyDemands(topic, c),
            acceptableRange: generateAcceptableRange(c)
          }
        ])
      ),
      status: 'pending',
      historicalContext: `此类议题在历史上曾出现在XX场合...`
    }
  ];
}

// 生成关键诉求
function generateKeyDemands(topic: string, country: any): string[] {
  // 根据国家性格生成不同诉求
  const base = ['寻求互利共赢'];
  
  if (country.personality?.nationalism > 7) {
    return [...base, '维护国家尊严', '坚持核心原则'];
  } else if (country.personality?.flexibility > 6) {
    return [...base, '寻求灵活方案', '愿意适度妥协'];
  }
  
  return base;
}

// 生成可接受范围
function generateAcceptableRange(country: any): string {
  const flexibility = country.personality?.flexibility || 5;
  
  if (flexibility > 7) {
    return '可以在一定范围内灵活调整';
  } else if (flexibility < 4) {
    return '仅有有限让步空间';
  }
  
  return '视对方诚意而定';
}

// 生成风险情景
function generateRiskScenarios(topics: NegotiationTopic[], userCountry: any, opponents: any[]): RiskScenario[] {
  return [
    {
      id: 'risk_1',
      title: '谈判破裂',
      probability: 20,
      impact: 80,
      description: '各方无法达成共识，谈判陷入僵局',
      triggers: ['核心利益冲突', '信任缺失', '外部压力']
    },
    {
      id: 'risk_2',
      title: '部分国家退出',
      probability: 15,
      impact: 60,
      description: '部分参与方因不满而退出谈判',
      triggers: ['方案不公平', '被边缘化', '国内压力']
    },
    {
      id: 'risk_3',
      title: '外部势力干预',
      probability: 25,
      impact: 70,
      description: '非参与方试图影响谈判进程',
      triggers: ['地缘政治', '经济利益', '意识形态']
    }
  ];
}

// 更新谈判阶段
function updatePhase(session: MultilateralNegotiationSession): MultilateralNegotiationSession['currentPhase'] {
  const messageCount = session.timeline.filter(e => e.type === 'message').length;
  
  if (messageCount < 3) return 'opening';
  if (messageCount < 8) return 'discussion';
  if (messageCount < 15) return 'negotiation';
  if (messageCount < 20) return 'summit';
  return 'conclusion';
}

// 生成AI响应
async function generateAIResponse(
  session: ExtendedSession,
  userParty: PartyInfo,
  opponent: PartyInfo,
  userMessage: string,
  userGoals?: UserNegotiationGoals
): Promise<{
  message: string;
  diplomaticVersion: string;
  simpleVersion: string;
  sentiment: number;
  tone: string;
  suggestedDeals?: ProposedDeal[];
  analysis?: string;
}> {
  const { country, ai } = opponent;
  const difficulty = session.difficulty;
  
  // 构建系统提示词（传入用户目标）
  const systemPrompt = buildSystemPrompt(session, userParty, opponent, userGoals);
  
  // 根据国家性格调整回应
  let baseSentiment = 50 + (country.personality?.aggression || 5) * 2 - 10;
  let tone = 'neutral';
  
  // 根据用户消息内容调整情绪
  if (userMessage.includes('抗议') || userMessage.includes('反对') || userMessage.includes('坚决')) {
    baseSentiment -= 15;
    tone = 'negative';
  } else if (userMessage.includes('合作') || userMessage.includes('共赢') || userMessage.includes('和平')) {
    baseSentiment += 10;
    tone = 'positive';
  }
  
  // 限制在合理范围
  baseSentiment = Math.max(20, Math.min(80, baseSentiment));
  
  // 生成回复内容
  const responseContent = await generateResponseContent(
    session,
    userParty,
    opponent,
    userMessage,
    systemPrompt,
    difficulty
  );
  
  return {
    ...responseContent,
    sentiment: baseSentiment,
    tone,
    suggestedDeals: responseContent.suggestedDeals
  };
}

// 构建系统提示词
function buildSystemPrompt(
  session: ExtendedSession,
  userParty: PartyInfo,
  opponent: PartyInfo,
  userGoals?: UserNegotiationGoals
): string {
  const { country } = opponent;
  const { personality } = country;
  const difficulty = session.difficulty;
  
  // 获取对手信息用于对比
  const userCountry = userParty.country;
  
  // 获取背景故事（如果有的话）
  const backgroundContext = session.background 
    ? `## 本次谈判的背景故事\n${session.background}\n\n请根据以上背景故事调整你的回复方式：\n1. 你是这一历史背景下的当事人，有既定的立场和利益\n2. 你的回复应该反映当前局势中各方的复杂关系\n3. 在涉及历史恩怨的问题上，可能表现出更强的情绪色彩\n4. 对共同利益和合作机会，可以表现出更积极的态度\n` 
    : '';
  
  // 用户目标上下文（如果有的话）
  const goalsContext = userGoals
    ? `## 对手（${userCountry.name}）的谈判目标
**高案（理想目标）**：${userGoals.highGoal.title}
- ${userGoals.highGoal.description}
- 核心条款：${userGoals.highGoal.keyTerms.join('、')}

**中间方案（务实选择）**：${userGoals.middleGoal?.title || '务实可行的方案'}
- ${userGoals.middleGoal?.description || ''}
- 核心条款：${userGoals.middleGoal?.keyTerms?.join('、') || '双方都能接受的务实条款'}

**底案（最低可接受）**：${userGoals.bottomLine.title}
- ${userGoals.bottomLine.description}
- 可接受条款：${userGoals.bottomLine.acceptableTerms.join('、')}

了解对手的目标有助于你制定更有针对性的谈判策略：
1. 如果对手的提案接近他们的底线，可能更难让步
2. 如果涉及对手的核心条款，要准备好应对强硬反应
3. 可以尝试寻找双方目标的交集区域
4. 对手的中间方案是务实的备选，如果高案受阻可能会转向中间方案
`
    : '';
  
  // 虚构国家特定提示
  const fictionalCountryPrompts = getFictionalCountryPrompt(country.id);
  
  // 获取对手国家的谈判目标（用于调整回复策略）
  const myGoals = session.opponentGoals?.[country.id];
  const myGoalsContext = myGoals
    ? `## 你在此议题上的谈判目标
**高案（你希望达成的理想结果）**：
- ${myGoals.highGoal.title}
- ${myGoals.highGoal.description}
- 核心条款：${myGoals.highGoal.keyTerms.join('、')}

**中间方案（务实可行的备选）**：
- ${myGoals.middleGoal.title}
- ${myGoals.middleGoal.description}
- 核心条款：${myGoals.middleGoal.keyTerms.join('、')}

**底案（你能接受的最低条件）**：
- ${myGoals.bottomLine.title}
- ${myGoals.bottomLine.description}
- 核心条款：${myGoals.bottomLine.keyTerms.join('、')}

请根据你的谈判目标来调整回复策略：
1. 如果对手的提案接近你的高案目标，可以适度让步
2. 如果涉及你的核心利益（${country.coreInterests[0]}），必须坚持
3. 如果局势不利，可以逐步向中间方案靠拢
4. 底线（${myGoals.bottomLine.keyTerms[0]}）是绝对不可妥协的
`
    : '';
  
  return `
你是${country.name}的外交谈判代表。

## 你的国家背景
${country.historicalBackground.detailed}

${backgroundContext}

${goalsContext}

${myGoalsContext}

${fictionalCountryPrompts}

## 你的谈判性格（由历史文化决定）
- 攻击性: ${personality.aggression}/10
- 灵活性: ${personality.flexibility}/10
- 耐心: ${personality.patience}/10
- 风险承受: ${personality.riskTolerance}/10
- 民族主义: ${personality.nationalism}/10

## 你的谈判风格
- 主要: ${country.negotiationStyle.primary}
- 沟通方式: ${country.negotiationStyle.communication}

## 你的核心利益（通常不让步）
${country.coreInterests.map(i => `- ${i}`).join('\n')}

## 你的重要利益（可以谈判）
${country.importantInterests.map(i => `- ${i}`).join('\n')}

## 你的可交易利益（可以交换）
${country.negotiableInterests.map(i => `- ${i}`).join('\n')}

## 你的筹码
${country.leveragePoints.map(l => `- ${l}`).join('\n')}

## 你的弱点
${country.vulnerabilities.map(v => `- ${v}`).join('\n')}

## 对手信息
对手是${userCountry.name}，其核心利益包括：
${userCountry.coreInterests.slice(0, 3).map(i => `- ${i}`).join('\n')}

## 谈判话题
${session.topic}

## 当前难度设置
语言风格: ${difficulty.languageStyle}

## 回复要求
1. 根据你的国家性格和利益，生成符合角色的回复
2. 灵活性为${personality.flexibility}/10，请适当调整立场
3. 攻击性为${personality.aggression}/10，请适当表现强硬或温和
4. 沟通方式为${country.negotiationStyle.communication}，请据此调整表达方式
5. 如果对方触及你的核心利益，请明确表示反对
6. 如果对方展现诚意，可以考虑做出适度让步
${session.background ? '7. 基于背景故事，你的回复应该体现历史脉络和前情因素' : ''}
${userGoals ? '7. 注意分析对手的目标，寻找可能的共同利益区域' : ''}

## 输出格式
请生成一个外交谈判回复，包含：
- 回复内容（符合你的角色和性格）
- 分析（简要说明你的策略考虑）

用JSON格式回复：
{
  "message": "回复内容（直接说的话）",
  "diplomaticVersion": "更正式的外交语言版本（可选）",
  "analysis": "你的策略分析"
}
`;
}

// 获取虚构国家的特定提示
function getFictionalCountryPrompt(countryId: string): string {
  const prompts: Record<string, string> = {
    cang: `
## 沧国角色要点
- 你拥有S大陆最先进的清洁能源转化技术
- 你的国家已经完成了能源结构优化
- 你希望通过此次谈判扩大在地区事务中的影响力
- 你警惕萃国与碇国的能源合作可能带来的地缘政治变化
- 你当前已开启与碇国签署《能源技术共同研发计划》的相关谈判，但尚未取得进展
- 你的真实意图包括地缘政治考量，这与萃国首屈一指的军事实力密不可分
`,
    cui: `
## 萃国角色要点
- 你国内政治复杂，K党（执政党）支持率下降明显，H党承诺能源改革
- 绿党支持率不断上升，有超越两大党的趋势
- 南部各省选民对环境污染和能源价格上涨强烈不满
- 边境冲突中示威者投掷燃烧弹事件需要谨慎处理
- 你的外交部长正面临国内大选压力，不能表现软弱
- 你希望获得沧国的清洁能源技术合作，同时让碇国承担责任
`,
    ding: `
## 碇国角色要点
- 你是S大陆的重要传统能源出口国，但资源储备出现预警
- 你的工业加工排放的废气污染飘散至萃国境内是事实
- 设备老化问题本可避免，因管理层决策失误
- 你希望通过能源转型维持经济稳定
- 你已同意产业搬迁计划，但设备老化导致污染问题仍然存在
- 你不愿承认承担全部责任，倾向于强调客观原因
`
  };
  return prompts[countryId] || '';
}

// 生成回复内容
async function generateResponseContent(
  session: MultilateralNegotiationSession,
  userParty: PartyInfo,
  opponent: PartyInfo,
  userMessage: string,
  systemPrompt: string,
  difficulty: any
): Promise<{
  message: string;
  diplomaticVersion: string;
  simpleVersion: string;
  suggestedDeals?: ProposedDeal[];
  analysis?: string;
}> {
  // 实际实现中，这里应该调用AI模型
  // 为了演示，我们生成基于规则的回复
  
  const { country } = opponent;
  const { personality } = country;
  
  // 分析用户消息
  const isAggressive = userMessage.includes('抗议') || userMessage.includes('反对') || userMessage.includes('威胁');
  const isCooperative = userMessage.includes('合作') || userMessage.includes('共赢') || userMessage.includes('建议');
  const isProposing = userMessage.includes('提议') || userMessage.includes('方案') || userMessage.includes('建议');
  
  // 根据国家性格和消息内容生成回复
  let baseMessage = '';
  
  if (isAggressive && personality.aggression > 6) {
    // 对方强硬，我也强硬
    baseMessage = generateFirmResponse(country, userMessage);
  } else if (isCooperative && personality.flexibility > 6) {
    // 对方合作，我也适度友好
    baseMessage = generateCooperativeResponse(country, userMessage);
  } else if (isProposing) {
    // 对方提出方案，评估并回应
    baseMessage = generateProposalResponse(country, userMessage);
  } else {
    // 一般性回应
    baseMessage = generateNeutralResponse(country, userMessage);
  }
  
  // 生成通俗版本（新手模式）
  const simpleVersion = difficulty.level === 'beginner' 
    ? generateSimpleVersion(baseMessage, country)
    : '';
  
  // 生成外交语言版本（高级模式）
  const diplomaticVersion = difficulty.level === 'advanced'
    ? generateDiplomaticVersion(baseMessage, country)
    : baseMessage;
  
  // 分析
  const analysis = `作为${country.name}代表，我考虑：${country.typicalStrategies[0] || '维护国家利益'}。`;
  
  return {
    message: baseMessage,
    diplomaticVersion,
    simpleVersion,
    analysis
  };
}

// 生成强硬回应 - 每个国家独特风格
function generateFirmResponse(country: any, userMessage: string): string {
  const responses: { [key: string]: string[] } = {
    china: [
      '我们强烈抗议贵方的这种说法。中国的主权和领土完整不容侵犯。我们敦促各方保持克制，回到对话轨道上来。',
      '中国的立场是明确的，任何损害中国核心利益的行为都将遭到坚决反击。我们呼吁各方以大局为重。',
      '历史和现实都证明，对抗没有出路。我们希望有关方面悬崖勒马，不要在错误道路上越走越远。'
    ],
    usa: [
      '我们对贵方的威胁性言论表示严重关切。美国将坚决捍卫我们的利益和盟友的安全。',
      '美国的耐心是有限的。任何误判都将带来严重后果。我们呼吁各方保持冷静。',
      '历史证明，霸权主义没有未来。我们希望贵方认清形势，做出正确选择。'
    ],
    russia: [
      '俄罗斯的立场是明确的。任何对俄罗斯核心利益的挑战都将遭到坚决回击。我们不怕任何压力。',
      '俄罗斯有足够的能力维护自身利益。我们警告某些国家不要玩火。',
      '制裁和威胁不会让俄罗斯屈服。我们将以一切必要手段维护国家安全。'
    ],
    japan: [
      '我们对当前局势深感忧虑。日本主张通过对话协商解决分歧，呼吁各方保持克制。',
      '历史问题不容回避。我们希望有关方面正视历史，采取负责任的态度。',
      '日本绝不会在原则问题上妥协。我们呼吁通过和平方式解决争端。'
    ],
    uk: [
      '英国作为负责任大国，对事态发展深表关切。我们主张通过外交途径解决争端。',
      '单方面改变现状是不可接受的。我们呼吁各方回到谈判桌前。',
      '英国支持以规则为基础的国际秩序，反对任何破坏稳定的行为。'
    ],
    france: [
      '法方对贵方的表态感到遗憾。法国主张通过对话寻求解决方案。',
      '法国呼吁各方展现政治意愿，通过谈判化解分歧。这符合所有人的利益。',
      '对抗只会带来双输。我们希望有关方面三思而后行。'
    ],
    germany: [
      '德方对当前紧张局势深表担忧。德国主张通过和平方式解决分歧。',
      '历史教训告诉我们，对话是解决争端的唯一正确途径。我们呼吁各方保持理性。',
      '单边行动只会加剧紧张局势。德国呼吁重启对话进程。'
    ],
    india: [
      '印度对当前局势表示严重关切。我们呼吁各方保持克制，通过对话而非对抗解决分歧。',
      '印度一贯主张战略自主和和平共处。我们愿为缓和局势发挥建设性作用。',
      '殖民主义和霸权主义早已过时。我们希望各方以史为鉴，面向未来。'
    ],
    brazil: [
      '我们对事态升级深感忧虑。作为发展中大国，巴西呼吁各方以大局为重。',
      '发展中国家不需要选边站队。我们主张通过南南合作解决共同挑战。',
      '霸权逻辑不得人心。我们希望各方通过平等对话寻求共识。'
    ],
    eu: [
      '欧盟对当前局势深表关切。我们呼吁各方回到对话轨道。',
      '多边主义是解决全球挑战的唯一出路。我们反对任何单边行动。',
      '欧盟准备好了为调解发挥积极作用。我们呼吁各方展现灵活性和政治意愿。'
    ]
  };
  
  const phrases = responses[country.id] || [
    `${country.name}对贵方的表态表示关切。我们希望各方保持克制，通过对话解决分歧。`,
    `${country.name}的立场是明确的：核心利益不容交易。`,
    `您的表态令人遗憾。我们主张通过对话解决分歧。`
  ];
  
  return phrases[Math.floor(Math.random() * phrases.length)];
}

// 生成合作回应 - 每个国家独特风格
function generateCooperativeResponse(country: any, userMessage: string): string {
  const responses: { [key: string]: string[] } = {
    china: [
      '中国赞赏贵方展现的合作诚意。我们始终倡导互利共赢，愿与各方一道推动问题解决。',
      '中国方案致力于构建人类命运共同体。我们愿意在相互尊重基础上与各方加强合作。',
      '历史和实践都证明，合作是唯一正确选择。我们期待与各方携手共进。'
    ],
    usa: [
      '美国注意到贵方的积极表态。我们愿意在相互尊重基础上进行建设性对话。',
      '美国支持通过谈判达成可行的协议。我们相信对话总比对抗好。',
      '让我们以务实态度推进合作，这符合各国的共同利益。'
    ],
    russia: [
      '俄罗斯对对话持开放态度。我们愿意讨论各方合理关切。',
      '俄罗斯欢迎建设性接触。我们寻求彼此都能接受的解决方案。',
      '让我们超越分歧，共同应对全球性挑战。'
    ],
    japan: [
      '我们对贵方的合作意愿表示欢迎。日本一贯重视对话协商。',
      '日中关系的改善符合两国人民根本利益。我们愿与各方加强沟通。',
      '和平与合作是地区繁荣的基础。我们愿意为此发挥积极作用。'
    ],
    uk: [
      '英国欢迎各方的建设性表态。我们主张通过务实对话寻求共识。',
      '这将有助于维护国际和平与繁荣。我们愿与各方共同努力。',
      '英国支持通过对话解决分歧。让我们为和平而努力。'
    ],
    france: [
      '法国对各方的合作意愿表示赞赏。我们愿为推动对话发挥桥梁作用。',
      '法国一贯主张通过多边主义解决国际问题。让我们共同推进这一进程。',
      '合作带来繁荣，对抗导致衰退。我们呼吁各方选择合作。'
    ],
    germany: [
      '德国欢迎各方的积极表态。我们主张通过制度化合作解决分歧。',
      '欧洲一体化就是从对抗走向合作的典范。我们愿意分享这一经验。',
      '对话与合作是德国外交的基石。让我们共同践行这一理念。'
    ],
    india: [
      '印度对各方的合作意愿表示欢迎。我们愿意参与建设性对话。',
      '印度一贯主张战略自主，我们愿为地区和平发挥应有作用。',
      '让我们超越零和思维，共同构建一个更加美好的世界。'
    ],
    brazil: [
      '巴西欢迎各方的积极态度。我们主张南南合作与南北对话并重。',
      '发展中国家有共同利益。让我们加强协调，共同应对挑战。',
      '合作共赢是新时代的必然选择。我们愿意为此贡献力量。'
    ],
    eu: [
      '欧盟欢迎各方的建设性表态。我们主张多边主义，愿与各方加强协调。',
      '欧盟是和平与合作的产物。我们愿意为国际和平发挥更大作用。',
      '让我们携手构建一个更加公正合理的国际秩序。'
    ]
  };
  
  const phrases = responses[country.id] || [
    `我们注意到对方的积极态度。${country.name}始终愿意在相互尊重基础上寻求合作。`,
    `这是一个积极的信号。${country.name}愿意考虑建设性方案。`,
    `感谢对方的善意。我们可以在这个基础上进一步探讨。`
  ];
  
  return phrases[Math.floor(Math.random() * phrases.length)];
}

// 生成方案回应 - 每个国家独特风格
function generateProposalResponse(country: any, userMessage: string): string {
  const responses: { [key: string]: string[] } = {
    china: [
      '我们认真研究了贵方的方案。中国认为可以在以下方面进行探讨：互谅互让、求同存异。我们建议设立工作组具体磋商。',
      '中方注意到提案中的积极要素。我们愿意在维护核心利益的前提下，探讨务实合作的可能性。',
      '您的提议引起了我们的重视。我们建议各方举行专门会议，就具体议题深入交换意见。'
    ],
    usa: [
      '美国研究了贵方的提议。我们认为有些内容值得考虑，但需要进一步明确细节。',
      '我们赞赏贵方展现的灵活性。建议各方举行专门会议深入讨论具体问题。',
      '您的方案中有一些积极要素。我们愿意认真评估，并在互利基础上推进谈判。'
    ],
    russia: [
      '俄罗斯研究了贵方的方案。我们注意到其中的一些积极要素。我们愿意讨论，但核心关切必须得到尊重。',
      '我们研究了贵方的提议。俄罗斯主张平等对话，我们要求对等对待。',
      '您的提案中有可取之处。但我们必须确保俄罗斯的根本利益得到保障。'
    ],
    japan: [
      '我们对贵方的建设性提案表示感谢。日本将认真研究，并就具体细节与各方进一步协商。',
      '您的提议值得认真考虑。我们认为对话是解决问题的唯一正确途径。',
      '日中关系的改善需要双方共同努力。我们愿意在相互尊重基础上探讨合作。'
    ],
    uk: [
      '英国欢迎各方的务实提议。我们建议设立一个专门机制来推进具体讨论。',
      '您的提案有助于推进谈判。我们愿意为达成共识发挥积极作用。',
      '英国主张通过建设性对话解决分歧。我们支持继续深入讨论。'
    ],
    france: [
      '法国研究了贵方的提案，认为其中体现了务实精神。我们建议在保持原则的同时，展现必要的灵活性。',
      '您的提议引起了法方的重视。我们愿意参与建设性讨论。',
      '法国主张通过多边机制解决分歧。我们支持继续深化对话。'
    ],
    germany: [
      '德国对各方的提议表示赞赏。我们建议以欧盟的成功经验为基础，通过制度化安排推进合作。',
      '您的提案有积极意义。我们愿意在制度框架内探讨具体实施方案。',
      '德国主张务实合作。我们建议设立专门工作组推进具体议题。'
    ],
    india: [
      '印度认真研究了各方的提案。我们认为应充分考虑发展中国家的关切。建议在共识基础上逐步推进。',
      '您的提议值得认真研究。印度愿意在维护发展中国家利益的前提下参与讨论。',
      '我们赞赏各方的建设性态度。建议举行南南合作论坛深入探讨。'
    ],
    brazil: [
      '巴西欢迎各方的建设性提案。我们认为应充分考虑不同发展阶段国家的需求，寻求包容性解决方案。',
      '您的提议体现了务实精神。我们愿意为推进谈判发挥积极作用。',
      '发展中国家有发言权。我们建议在平等基础上深入讨论。'
    ],
    eu: [
      '欧盟研究了各方的提案，认为这为深入讨论奠定了基础。我们建议召开专门会议，推动具体议题取得进展。',
      '您的提案引起了欧盟的重视。我们愿意在多边框架内继续讨论。',
      '欧盟主张通过制度化合作解决分歧。我们支持继续深化对话。'
    ]
  };
  
  const phrases = responses[country.id] || [
    `我们认真研究了您的提议。${country.name}认为有些内容值得讨论，但需要进一步明确细节。`,
    `您的方案体现了思考。我们建议在以下几个方面进行完善...`,
    `这是一个值得考虑的起点。${country.name}愿意参与进一步讨论。`
  ];
  
  return phrases[Math.floor(Math.random() * phrases.length)];
}

// 生成中性回应 - 每个国家独特风格
function generateNeutralResponse(country: any, userMessage: string): string {
  const responses: { [key: string]: string[] } = {
    china: [
      '中国的立场是一贯的。我们主张通过平等对话解决分歧，共同维护地区和平稳定。历史和现实都证明，合作是唯一正确选择。',
      '我们将继续关注事态发展。中国始终认为，通过对话协商解决争端才是正道。',
      '谢谢各方的发言。中国愿意在相互尊重基础上与各方加强沟通合作。'
    ],
    usa: [
      '美国继续关注事态发展。我们重申，通过外交途径解决分歧是我们的首选。我们将继续与各方保持沟通。',
      '我们听到了各方的关切。美国将根据形势发展评估下一步行动。',
      '谢谢发言。我们期待各方展现出建设性态度。'
    ],
    russia: [
      '俄罗斯的立场是明确的。我们将根据事态发展采取必要措施维护国家利益，同时保持对话渠道畅通。',
      '我们注意到了各方的表态。俄罗斯将继续捍卫自身利益。',
      '谢谢各方发言。俄罗斯对建设性对话持开放态度。'
    ],
    japan: [
      '日本将继续密切关注局势发展。我们呼吁各方保持克制，通过对话协商解决分歧。日本愿为地区和平发挥建设性作用。',
      '我们认真听取各方意见。日本一贯主张和平解决争端。',
      '谢谢发言。我们期待各方展现善意，推动问题解决。'
    ],
    uk: [
      '英国将继续关注事态发展。我们支持通过对话解决争端，这将有助于维护国际法治和地区稳定。',
      '我们听到了各方的关切。英国主张通过务实对话寻求共识。',
      '谢谢发言。英国将继续发挥积极作用。'
    ],
    france: [
      '法国将继续关注局势发展。我们主张通过多边对话寻求解决方案，这符合国际社会的共同利益。',
      '我们认真研究了各方的表态。法国愿为推动对话贡献力量。',
      '谢谢发言。法国主张通过协调与合作解决分歧。'
    ],
    germany: [
      '德国将继续关注事态演变。我们支持通过制度化合作解决分歧，这将有助于建立可持续的和平框架。',
      '我们听到了各方的关切。德国主张通过对话而非对抗解决问题。',
      '谢谢发言。我们呼吁各方展现灵活性和政治意愿。'
    ],
    india: [
      '印度将继续关注局势发展。我们主张通过和平对话解决分歧，这符合各国的根本利益。',
      '我们认真倾听了各方意见。印度将继续为推动对话发挥积极作用。',
      '谢谢发言。印度主张战略自主和和平共处。'
    ],
    brazil: [
      '巴西将继续关注事态发展。作为新兴市场国家代表，我们呼吁各方以发展大局为重，通过对话协商解决问题。',
      '我们听到了各方的关切。巴西将继续为推动南南合作发挥积极作用。',
      '谢谢发言。发展中国家需要更多话语权。'
    ],
    eu: [
      '欧盟将继续关注局势发展。我们主张多边主义解决方案，这将有助于维护国际秩序和各国共同利益。',
      '我们认真研究了各方的表态。欧盟将继续为推动对话发挥积极作用。',
      '谢谢发言。欧盟准备好了为促进和平发挥更大作用。'
    ]
  };
  
  const phrases = responses[country.id] || [
    `我们听到了各方的意见。${country.name}将继续关注事态发展。`,
    `谢谢您的发言。我们将认真考虑各方立场。`,
    `${country.name}的立场是一贯的：我们支持通过对话解决问题。`
  ];
  
  return phrases[Math.floor(Math.random() * phrases.length)];
}

// 生成通俗版本
function generateSimpleVersion(message: string, country: any): string {
  // 将外交语言翻译成通俗语言
  const simple = message
    .replace(/关切/gi, '担心')
    .replace(/遗憾/gi, '不好')
    .replace(/善意/gi, '好意')
    .replace(/建设性/gi, '有用的')
    .replace(/一贯/gi, '一直')
    .replace(/维护/gi, '保护')
    .replace(/核心利益/gi, '最重要的事')
    .replace(/分歧/gi, '不同意见');
  
  return `[通俗版] ${simple}`;
}

// 生成外交版本
function generateDiplomaticVersion(message: string, country: any): string {
  // 在已有基础上进一步正式化
  const diplomatic = message
    .replace(/不好/gi, '深表遗憾')
    .replace(/担心/gi, '深切关注')
    .replace(/最重要的事/gi, '核心利益')
    .replace(/不同意见/gi, '分歧');
  
  return `[专业外交语言版] ${diplomatic}`;
}

// 生成分析和建议
function generateAnalysis(
  session: ExtendedSession,
  userParty: PartyInfo,
  userMessage: string,
  userGoals?: UserNegotiationGoals
): {
  situationAssessment: string;
  recommendedStrategy: string;
  riskWarnings?: string[];
  goalProgress?: {
    highGoalProgress: number;
    middleGoalProgress: number;
    bottomLineStatus: 'secured' | 'approaching' | 'breached';
    progressDescription: string;
  };
  suggestedApproach?: {
    highApproach: string[];
    middleApproach: string[];
    bottomLineApproach: string[];
  };
} {
  const opponents = session.parties.opponents;
  
  // 统计各方的情绪
  const sentiments = opponents.map(o => o.ai?.sentiment || 50);
  const avgSentiment = sentiments.reduce((a, b) => a + b, 0) / sentiments.length;
  
  // 评估局势
  let situationAssessment = '';
  if (avgSentiment > 60) {
    situationAssessment = '当前气氛较为友好，各方有合作意愿。';
  } else if (avgSentiment < 40) {
    situationAssessment = '当前气氛紧张，需要谨慎处理。';
  } else {
    situationAssessment = '当前气氛中性，各方立场有待进一步明确。';
  }
  
  // 建议策略（如果有用户目标，针对性更强）
  let recommendedStrategy = '';
  let suggestedApproach: {
    highApproach: string[];
    middleApproach: string[];
    bottomLineApproach: string[];
  } | undefined;
  
  if (userGoals) {
    // 基于用户目标给出针对性建议
    const highGoalKeywords = userGoals.highGoal.keyTerms.join(' ');
    const middleGoalKeywords = userGoals.middleGoal?.keyTerms?.join(' ') || '';
    const bottomLineKeywords = userGoals.bottomLine.keyTerms.join(' ');
    
    // 提取第一个关键词用于判断
    const highFirstKeyword = highGoalKeywords.split('，')[0] || highGoalKeywords.split('、')[0] || '';
    const middleFirstKeyword = middleGoalKeywords ? (middleGoalKeywords.split('，')[0] || middleGoalKeywords.split('、')[0] || '') : '';
    const bottomFirstKeyword = bottomLineKeywords.split('，')[0] || bottomLineKeywords.split('、')[0] || '';
    
    if (userMessage.includes(highFirstKeyword) && highFirstKeyword) {
      recommendedStrategy = `很好！您正在推进高案目标「${userGoals.highGoal.title}」。建议继续争取，若遇到阻力可以调整到中间方案。`;
      suggestedApproach = {
        highApproach: ['继续坚持核心条款', '准备中间方案作为备选', '观察各方反应'],
        middleApproach: ['准备适度让步空间', '寻找各方利益交汇点'],
        bottomLineApproach: ['确保底线条款不动摇']
      };
    } else if (userMessage.includes(middleFirstKeyword) && middleFirstKeyword) {
      recommendedStrategy = `您正在推进中间方案「${userGoals.middleGoal?.title || '务实方案'}」。这是务实的选择，可以作为各方都能接受的备选。`;
      suggestedApproach = {
        highApproach: ['寻找突破口尝试争取更多'],
        middleApproach: ['坚持务实立场', '展示合作诚意', '准备让步清单'],
        bottomLineApproach: ['确保底线条款不动摇']
      };
    } else if (userMessage.includes(bottomFirstKeyword) && bottomFirstKeyword) {
      recommendedStrategy = `您正在触及底案核心「${userGoals.bottomLine.title}」。建议谨慎行事，确保不突破底线。`;
      suggestedApproach = {
        highApproach: ['适当提高要价'],
        middleApproach: ['守住核心诉求'],
        bottomLineApproach: ['确保底线绝对不动', '准备退出或寻求调解']
      };
    } else {
      // 分析当前谈判阶段，给出综合性建议
      const messageCount = session.timeline.filter(e => e.type === 'message').length;
      if (messageCount <= 3) {
        recommendedStrategy = `谈判刚开始，建议先了解各方立场和底线。根据您的目标：\n高案「${userGoals.highGoal.title}」是理想目标，「${userGoals.middleGoal?.title || '中间方案'}」是务实备选，底案「${userGoals.bottomLine.title}」是必须守住的。`;
      } else if (messageCount <= 8) {
        recommendedStrategy = `进入深入讨论阶段。建议根据当前局势，选择推进方向：\n- 高案：${userGoals.highGoal.keyTerms[0] || '最大化利益'}\n- 中间方案：${userGoals.middleGoal?.keyTerms?.[0] || '务实选择'}\n- 底案：${userGoals.bottomLine.keyTerms[0] || '守住底线'}`;
      } else {
        recommendedStrategy = `谈判进入关键阶段。根据您的三个方案：\n高案目标较高但难度大，中间方案较易达成，底案是最低保障。建议根据当前态势做出选择。`;
      }
      suggestedApproach = {
        highApproach: userGoals.highGoal.keyTerms.slice(0, 2),
        middleApproach: userGoals.middleGoal?.keyTerms?.slice(0, 2) || ['寻求务实解决方案'],
        bottomLineApproach: userGoals.bottomLine.keyTerms.slice(0, 2)
      };
    }
  } else {
    // 默认策略建议
    recommendedStrategy = session.difficulty.level === 'beginner'
      ? '建议先表达合作意愿，了解各方底线后再提出具体方案。'
      : session.difficulty.level === 'professional'
      ? '建议运用议题捆绑策略，在核心议题上坚持立场，在次要议题上适度让步。'
      : '建议平衡推进，既展现合作诚意，又维护自身利益。';
  }
  
  // 风险警告
  const riskWarnings: string[] = [];
  if (avgSentiment < 40) {
    riskWarnings.push('注意控制情绪，避免激化矛盾');
  }
  if (userGoals && avgSentiment < 30) {
    riskWarnings.push('底线可能受到威胁，建议调整策略或寻求调解');
  }
  
  // 如果有用户目标，计算目标进度
  let goalProgress = undefined;
  if (userGoals) {
    // 简化计算：基于谈判进展和情绪评估
    const messageCount = session.timeline.filter(e => e.type === 'message').length;
    const progressFactor = Math.min(100, messageCount * 5); // 每条消息增加5%进度
    
    // 情绪因素
    const sentimentFactor = avgSentiment > 50 ? 10 : -10;
    const baseProgress = Math.min(100, progressFactor + sentimentFactor);
    
    // 计算三个目标的进度
    const highProgress = Math.min(100, baseProgress * 0.6); // 高案进度较慢
    const middleProgress = Math.min(100, baseProgress * 0.85); // 中间方案进度较快
    const bottomProgress = Math.min(100, baseProgress * 1.1); // 底线最容易守住
    
    goalProgress = {
      highGoalProgress: highProgress,
      middleGoalProgress: middleProgress,
      bottomLineStatus: (avgSentiment < 30 ? 'breached' : avgSentiment < 45 ? 'approaching' : 'secured') as 'secured' | 'approaching' | 'breached',
      progressDescription: avgSentiment > 55 
        ? '谈判进展顺利，高案和中间方案都有望达成'
        : avgSentiment > 40
          ? '谈判稳步推进，中间方案是现实目标'
          : avgSentiment > 30
            ? '谈判遇到挑战，需要调整策略争取中间方案'
            : '谈判形势严峻，首要任务是守住底线'
    };
  }
  
  return {
    situationAssessment,
    recommendedStrategy,
    riskWarnings,
    goalProgress,
    suggestedApproach
  };
}

// 获取难度提示
function getDifficultyTip(difficulty: string): string {
  switch (difficulty) {
    case 'beginner':
      return '新手提示：您可以随时点击"策略提示"查看当前情况的分析和建议。';
    case 'intermediate':
      return '中等难度：尝试运用不同的谈判策略，观察各方反应。';
    case 'advanced':
      return '高级难度：运用外交技巧和筹码博弈，争取最优结果。';
    default:
      return '';
  }
}
