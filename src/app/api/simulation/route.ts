// 模拟场景API路由
// 支持预设场景和自定义场景的多边外交谈判模拟

import { NextRequest, NextResponse } from 'next/server';
import { getCountryById } from '@/lib/countries';
import { 
  getPresetScenario,
  getAllPresetScenarios
} from '@/lib/simulation-scenarios';
import { 
  ScenarioSession,
  SimulationScenario,
  presetDifficulties
} from '@/lib/simulation-scenario-types';

// 会话存储
const scenarioSessions = new Map<string, ScenarioSession>();

// ==================== 获取场景列表 ====================
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const scenarioId = searchParams.get('scenarioId');
  const sessionId = searchParams.get('sessionId');

  try {
    // 获取场景列表
    if (action === 'list') {
      const scenarios = getAllPresetScenarios();
      return NextResponse.json({
        success: true,
        scenarios
      });
    }

    // 获取特定场景详情
    if (action === 'detail' && scenarioId) {
      const scenario = getPresetScenario(scenarioId);
      if (!scenario) {
        return NextResponse.json({ error: '场景不存在' }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        scenario
      });
    }

    // 获取会话
    if (action === 'session' && sessionId) {
      const session = scenarioSessions.get(sessionId);
      if (!session) {
        return NextResponse.json({ error: '会话不存在' }, { status: 404 });
      }
      return NextResponse.json({
        success: true,
        session
      });
    }

    // 获取用户可见信息（不含secret）
    if (action === 'public' && sessionId) {
      const session = scenarioSessions.get(sessionId);
      if (!session) {
        return NextResponse.json({ error: '会话不存在' }, { status: 404 });
      }
      // 返回公开信息
      return NextResponse.json({
        success: true,
        publicInfo: session.visibleToUser
      });
    }

    return NextResponse.json({ error: '无效的操作' }, { status: 400 });

  } catch (error) {
    console.error('场景查询失败:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

// ==================== 创建模拟场景会话 ====================
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      scenarioId, 
      userCountryId, 
      difficulty,
      userRole = 'primary',
      customScenario 
    } = body;

    // 获取场景
    let scenario: SimulationScenario | null = null;
    if (customScenario) {
      // 使用自定义场景
      scenario = customScenario;
    } else if (scenarioId) {
      scenario = getPresetScenario(scenarioId);
    }

    if (!scenario) {
      return NextResponse.json({ error: '场景不存在' }, { status: 400 });
    }

    // 验证国家
    if (!getCountryById(userCountryId)) {
      return NextResponse.json({ error: '国家不存在' }, { status: 400 });
    }

    // 验证用户在场景参与者中
    const isParticipant = scenario.countryBriefings.some(b => b.countryId === userCountryId);
    if (!isParticipant) {
      return NextResponse.json({ error: '该国家不在场景参与者中' }, { status: 400 });
    }

    // 获取难度配置（用于后续功能扩展）
    const _difficultySettings = presetDifficulties[difficulty as keyof typeof presetDifficulties] || presetDifficulties.intermediate;

    // 创建会话ID
    const sessionId = `scenario_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // 构建用户可见的公开信息
    const publicRelations = scenario.initialRelations.map(r => ({
      from: r.from,
      to: r.to,
      attitude: r.attitude,
      publicReason: r.reason
    }));

    // 创建会话
    const session: ScenarioSession = {
      scenarioId: scenario.overview.id,
      sessionId,
      userCountryId,
      userRole,
      visibleToUser: {
        overview: scenario.overview,
        background: scenario.background,
        countryBriefings: scenario.countryBriefings,
        publicIssues: scenario.publicIssues,
        publicRelations
      },
      userSecret: scenario.secretBriefings[userCountryId],
      aiCountries: Object.entries(scenario.secretBriefings)
        .filter(([id]) => id !== userCountryId)
        .map(([id, briefing]) => ({
          countryId: id,
          briefing
        })),
      negotiationState: {
        currentPhase: 'opening',
        activeIssues: scenario.publicIssues.filter(i => i.status === 'discussing').map(i => i.id),
        agreedIssues: scenario.publicIssues.filter(i => i.status === 'agreed').map(i => i.id),
        deadlockedIssues: [],
        attitudeHistory: [{
          time: new Date().toISOString(),
          attitudes: Object.fromEntries(
            scenario.initialRelations.map(r => [r.from, r.attitude])
          )
        }]
      },
      userStrategy: {
        moves: [],
        goalProgress: []
      }
    };

    // 存储会话
    scenarioSessions.set(sessionId, session);

    return NextResponse.json({
      success: true,
      session,
      hints: {
        briefing: scenario.countryBriefings.find(b => b.countryId === userCountryId),
        secret: session.userSecret,
        participants: scenario.countryBriefings.map(b => ({
          id: b.countryId,
          name: b.country.name,
          stance: b.publicStance
        })),
        issues: scenario.publicIssues.map(i => ({
          id: i.id,
          title: i.title,
          status: i.status
        }))
      }
    });

  } catch (error) {
    console.error('创建模拟场景会话失败:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

// ==================== 模拟场景对话 ====================
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, message, targetCountryId, action } = body;

    if (!sessionId) {
      return NextResponse.json({ error: '缺少sessionId' }, { status: 400 });
    }

    const session = scenarioSessions.get(sessionId);
    if (!session) {
      return NextResponse.json({ error: '会话不存在' }, { status: 404 });
    }

    // 处理不同动作
    if (action === 'analyze') {
      // 分析当前局势
      return NextResponse.json({
        success: true,
        analysis: analyzeSituation(session)
      });
    }

    if (action === 'strategy') {
      // 获取策略建议
      return NextResponse.json({
        success: true,
        strategy: generateStrategy(session)
      });
    }

    // 默认：处理对话
    const userCountry = getCountryById(session.userCountryId);
    if (!userCountry) {
      return NextResponse.json({ error: '国家不存在' }, { status: 400 });
    }

    // 记录用户行动
    session.userStrategy.moves.push({
      time: new Date().toISOString(),
      type: 'statement',
      content: message,
      target: targetCountryId,
      result: 'pending'
    });

    // 生成AI响应
    const responses = await generateAIResponses(session, message, targetCountryId);

    // 更新各方态度
    updateAttitudes(session, message, responses);

    // 更新谈判阶段
    updateNegotiationPhase(session);

    // 生成分析
    const analysis = analyzeSituation(session);

    return NextResponse.json({
      success: true,
      sessionId,
      responses,
      updatedSession: {
        currentPhase: session.negotiationState.currentPhase,
        attitudeHistory: session.negotiationState.attitudeHistory
      },
      analysis
    });

  } catch (error) {
    console.error('模拟场景对话失败:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

// ==================== 辅助函数 ====================

// 生成AI响应
async function generateAIResponses(
  session: ScenarioSession,
  userMessage: string,
  targetCountryId?: string
): Promise<{
  countryId: string;
  countryName: string;
  message: string;
  sentiment: number;
  attitude: number;
}[]> {
  const responses: {
    countryId: string;
    countryName: string;
    message: string;
    sentiment: number;
    attitude: number;
  }[] = [];

  // 获取对话历史用于上下文
  const historyContext = session.userStrategy.moves.map(m => 
    `[${m.type}]: ${m.content}`
  ).join('\n');

  // 为每个AI国家生成响应
  for (const aiCountry of session.aiCountries) {
    // 如果指定了目标国家，只生成该国家的响应
    if (targetCountryId && aiCountry.countryId !== targetCountryId) {
      continue;
    }

    const country = getCountryById(aiCountry.countryId);
    if (!country) continue;

    const briefing = aiCountry.briefing;
    
    // 构建系统提示
    const systemPrompt = `
你是${country.name}的外交谈判代表。

## 你的国家背景
${country.historicalBackground.detailed}

## 你的核心利益
${country.coreInterests.map(i => `- ${i}`).join('\n')}

## 你的重要利益
${country.importantInterests.map(i => `- ${i}`).join('\n')}

## 你的可交易利益
${country.negotiableInterests.map(i => `- ${i}`).join('\n')}

## 你的隐藏议程
${briefing.hiddenAgenda.summary}

## 你的理想方案
${briefing.idealSolution.summary}

## 你的底线
${briefing.bottomLine.summary}

## 当前谈判背景
${session.visibleToUser.background.overview}

## 谈判历史
${historyContext || '暂无'}

## 对手（用户）的消息
${userMessage}

## 回复要求
1. 根据你的国家性格和利益生成回复
2. 保持角色一致性，不要透露隐藏信息
3. 回复应该体现你的谈判策略
4. 用JSON格式回复：
{
  "message": "你的回复内容",
  "sentiment": 情感倾向（-100到100）,
  "attitude": 对用户态度（-100到100）
}
`;

    // 这里应该调用AI服务，但为了简化，使用规则生成响应
    const response = generateRuleBasedResponse(
      country,
      briefing,
      userMessage,
      session
    );

    responses.push({
      countryId: aiCountry.countryId,
      countryName: country.name,
      ...response
    });
  }

  return responses;
}

// 基于规则生成响应（简化版本）
function generateRuleBasedResponse(
  country: NonNullable<ReturnType<typeof getCountryById>>,
  briefing: { hiddenAgenda?: { summary?: string }; idealSolution?: { summary?: string }; bottomLine?: { summary?: string }; vulnerabilities?: Array<{ description: string }> },
  userMessage: string,
  _session: ScenarioSession
): { message: string; sentiment: number; attitude: number } {
  const _userCountry = getCountryById(_session.userCountryId);
  const lowerMessage = userMessage.toLowerCase();
  
  let sentiment = 50;
  let attitude = 50;
  let message = '';

  // 根据用户消息内容调整
  if (lowerMessage.includes('抗议') || lowerMessage.includes('反对') || lowerMessage.includes('指责')) {
    sentiment -= 20;
    attitude -= 15;
  } else if (lowerMessage.includes('合作') || lowerMessage.includes('共赢') || lowerMessage.includes('和平')) {
    sentiment += 15;
    attitude += 10;
  } else if (lowerMessage.includes('让步') || lowerMessage.includes('妥协')) {
    sentiment += 10;
    attitude += 5;
  }

  // 根据国家性格调整
  if (country.personality.aggression > 6) {
    message = `${country.name}代表表示："我们需要认真考虑各方的立场。任何解决方案都必须尊重我们的核心利益。`;
    if (sentiment < 40) {
      message += "我们不会被任何形式的威胁所动摇。";
    }
  } else if (country.personality.flexibility > 6) {
    message = `${country.name}代表表示："我们赞赏各方为解决问题所做的努力。`;
    if (sentiment > 60) {
      message += "我们愿意在相互尊重的基础上探讨更多可能性。";
    }
  } else {
    message = `${country.name}代表表示："我们将基于国家利益和地区稳定来参与这一谈判。`;
  }

  // 限制情绪和态度范围
  sentiment = Math.max(20, Math.min(80, sentiment));
  attitude = Math.max(-100, Math.min(100, attitude));

  return { message, sentiment, attitude };
}

// 分析当前局势
function analyzeSituation(session: ScenarioSession): {
  overallProgress: number;
  keyFactors: string[];
  riskLevel: 'low' | 'medium' | 'high';
  opportunities: string[];
  threats: string[];
  recommendation: string;
} {
  const messageCount = session.userStrategy.moves.length;
  
  // 计算进展
  const agreedIssues = session.negotiationState.agreedIssues.length;
  const totalIssues = session.visibleToUser.publicIssues.length;
  const progress = totalIssues > 0 ? Math.round((agreedIssues / totalIssues) * 100) : 0;

  // 获取各方态度
  const currentAttitudes = session.negotiationState.attitudeHistory[
    session.negotiationState.attitudeHistory.length - 1
  ]?.attitudes || {};

  // 识别关键因素
  const keyFactors = [
    `谈判已进行 ${messageCount} 轮`,
    `已达成 ${agreedIssues} 项共识`,
    `当前阶段：${session.negotiationState.currentPhase}`
  ];

  // 判断风险等级
  let riskLevel: 'low' | 'medium' | 'high' = 'medium';
  const negativeCount = Object.values(currentAttitudes).filter((v) => (v as number) < 0).length;
  if (negativeCount > 2) riskLevel = 'high';
  else if (negativeCount === 0 && progress > 50) riskLevel = 'low';

  // 识别机会
  const opportunities = [
    progress > 30 ? '已建立初步信任' : '需要更多对话建立信任',
    Object.keys(currentAttitudes).length >= 3 ? '多方参与增加解决方案可能性' : '参与方较少，可控性较强'
  ];

  // 识别威胁
  const threats = [
    negativeCount > 1 ? '部分国家态度消极' : '各方态度相对积极',
    session.negotiationState.deadlockedIssues.length > 0 ? '部分议题陷入僵局' : '议题进展顺利'
  ];

  // 建议
  let recommendation = '';
  if (session.negotiationState.currentPhase === 'opening') {
    recommendation = '建议先了解各方核心诉求，寻找共同利益点作为突破口。';
  } else if (session.negotiationState.currentPhase === 'discussion') {
    recommendation = '建议开始提出具体方案，测试各方底线，寻找可接受的折中点。';
  } else if (session.negotiationState.currentPhase === 'negotiation') {
    recommendation = '关键阶段，建议运用筹码交换，争取最大利益。';
  } else {
    recommendation = '谈判接近尾声，建议把握最后机会推动共识达成。';
  }

  return {
    overallProgress: Math.min(100, progress + messageCount * 2),
    keyFactors,
    riskLevel,
    opportunities,
    threats,
    recommendation
  };
}

// 生成策略建议
function generateStrategy(session: ScenarioSession): {
  shortTerm: string[];
  mediumTerm: string[];
  longTerm: string[];
  keyPoints: string[];
  warnings: string[];
} {
  const userSecret = session.userSecret;
  
  // 短期策略
  const shortTerm = [
    '建立与各方的沟通渠道',
    '了解对手的真实意图（通过对话试探）',
    '避免过早暴露底牌'
  ];

  // 中期策略
  const mediumTerm = [
    '提出符合己方利益的方案',
    '寻找与各国的利益交汇点',
    '准备筹码用于交换'
  ];

  // 长期策略
  const longTerm = [
    '推动达成符合底线的协议',
    '维护与各国的长期关系',
    '争取在国际舞台上的影响力'
  ];

  // 关键要点
  const keyPoints = [
    `隐藏议程：${userSecret.hiddenAgenda?.summary?.substring(0, 50) || '待定义'}...`,
    `理想结果：${userSecret.idealSolution?.summary?.substring(0, 50) || '待确定'}...`,
    `底线：${userSecret.bottomLine?.summary?.substring(0, 50) || '待确定'}...`
  ];

  // 警示
  const warnings = userSecret.vulnerabilities?.map(v => 
    `注意：${v.description}`
  ) || [];

  return {
    shortTerm,
    mediumTerm,
    longTerm,
    keyPoints,
    warnings
  };
}

// 更新各方态度
function updateAttitudes(
  session: ScenarioSession,
  userMessage: string,
  responses: { countryId: string; attitude: number }[]
): void {
  const lowerMessage = userMessage.toLowerCase();
  let userSentimentChange = 0;

  if (lowerMessage.includes('合作') || lowerMessage.includes('共赢')) {
    userSentimentChange = 5;
  } else if (lowerMessage.includes('抗议') || lowerMessage.includes('反对')) {
    userSentimentChange = -5;
  }

  const currentAttitudes = Object.fromEntries(
    Object.entries(
      session.negotiationState.attitudeHistory[
        session.negotiationState.attitudeHistory.length - 1
      ]?.attitudes || {}
    ).map(([id, val]) => {
      const response = responses.find(r => r.countryId === id);
      return [id, Math.round((val as number) + (response?.attitude || 0) / 10 + userSentimentChange)];
    })
  );

  // 确保各方态度在合理范围内
  Object.keys(currentAttitudes).forEach(id => {
    currentAttitudes[id] = Math.max(-100, Math.min(100, currentAttitudes[id]));
  });

  session.negotiationState.attitudeHistory.push({
    time: new Date().toISOString(),
    attitudes: currentAttitudes
  });
}

// 更新谈判阶段
function updateNegotiationPhase(session: ScenarioSession): void {
  const messageCount = session.userStrategy.moves.length;
  const agreedCount = session.negotiationState.agreedIssues.length;

  if (messageCount < 3) {
    session.negotiationState.currentPhase = 'opening';
  } else if (messageCount < 8) {
    session.negotiationState.currentPhase = 'discussion';
  } else if (messageCount < 15) {
    session.negotiationState.currentPhase = 'negotiation';
  } else if (messageCount < 20 || agreedCount < 2) {
    session.negotiationState.currentPhase = 'summit';
  } else {
    session.negotiationState.currentPhase = 'conclusion';
  }
}
