// 多边谈判策略分析API
// 包含高案/底案系统和结果预测

import { NextRequest, NextResponse } from 'next/server';
import { getCountryById, countries } from '@/lib/countries';

export interface StrategyAnalysis {
  sessionId: string;
  partyId: string;
  
  // 高案（理想结果）
  highDemand: {
    title: string;
    description: string;
    probability: number;
    conditions: string[];
    keyPoints: string[];
  };
  
  // 底案（最低接受）
  bottomLine: {
    title: string;
    description: string;
    nonNegotiable: string[];
    acceptableCompromises: string[];
  };
  
  // 中间地带（可能的协议区间）
  middleGround: {
    bestCase: string;
    realistic: string;
    fallback: string;
  };
  
  // 可能的结局预测
  scenarios: {
    outcome: string;
    probability: number;
    description: string;
    forUser: string;
    winners: string[];
    losers: string[];
  }[];
  
  // 各方利益分析
  partyAnalysis: {
    [partyId: string]: {
      coreInterests: string[];
      flexibility: number;
      likelyMoves: string[];
      vulnerabilities: string[];
    };
  };
  
  // 策略建议
  recommendations: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  
  // 筹码交换矩阵
  leverageMatrix: {
    [partyId: string]: {
      canOffer: string[];
      needsFrom: { [otherPartyId: string]: string[] };
    };
  };
}

// 获取策略分析
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');
  const partyId = searchParams.get('partyId');
  
  if (!sessionId || !partyId) {
    return NextResponse.json({ error: '缺少必要参数' }, { status: 400 });
  }
  
  const analysis = generateStrategyAnalysis(sessionId, partyId);
  return NextResponse.json(analysis);
}

// 生成策略分析
function generateStrategyAnalysis(sessionId: string, partyId: string): StrategyAnalysis {
  // 从会话ID中提取信息（实际应该从数据库获取）
  const countryId = partyId.replace('party_', '');
  const country = getCountryById(countryId);
  
  if (!country) {
    // 返回默认分析
    return generateDefaultAnalysis(partyId);
  }
  
  const { personality, coreInterests, importantInterests, negotiableInterests, leveragePoints, vulnerabilities, typicalStrategies } = country;
  
  // 计算灵活性范围
  const flexibility = personality.flexibility / 10;
  
  // 生成高案（理想结果）
  const highDemand: StrategyAnalysis['highDemand'] = {
    title: `${country.name}的最优方案`,
    description: `基于${country.name}的核心利益和国家性格，其追求的理想结果是最大化自身利益，同时尽可能削弱对手。`,
    probability: Math.round(flexibility * 30), // 灵活性越高，高案概率越低
    conditions: [
      '对方愿意做出重大让步',
      '国际环境有利',
      '有足够的筹码和影响力',
      '国内政治支持'
    ],
    keyPoints: coreInterests.map(interest => 
      `${interest}得到完全保障`
    )
  };
  
  // 生成底案（最低接受）
  const bottomLine: StrategyAnalysis['bottomLine'] = {
    title: `${country.name}的底线`,
    description: `基于国家安全和核心利益，${country.name}可以接受的最低限度。`,
    nonNegotiable: coreInterests.slice(0, 2), // 核心利益不可谈判
    acceptableCompromises: [
      ...importantInterests.slice(0, 2),
      ...negotiableInterests.slice(0, 3)
    ]
  };
  
  // 中间地带
  const middleGround: StrategyAnalysis['middleGround'] = {
    bestCase: `达成对${country.name}有利的协议，在核心利益上有所斩获`,
    realistic: `各方都能接受的折中方案，${country.name}做出适度让步`,
    fallback: `有限协议或暂时搁置争议，等待更好时机`
  };
  
  // 结果预测
  const scenarios: StrategyAnalysis['scenarios'] = [
    {
      outcome: '全面协议',
      probability: Math.round(flexibility * 25 + 10),
      description: '各方在主要议题上达成共识，形成全面协议',
      forUser: '取决于各方谈判表现，需要充分展示诚意和筹码',
      winners: ['flexibility' as any > 0.7 ? country.name : '', 'cooperative parties'].filter(Boolean),
      losers: personality.aggression > 7 ? ['none (mutual gains)'] : []
    },
    {
      outcome: '部分协议',
      probability: Math.round(40 - flexibility * 20),
      description: '在部分议题上达成一致，其他议题暂时搁置',
      forUser: '选择一个或几个核心议题重点突破，其他议题留待后续',
      winners: ['parties with flexible positions'],
      losers: ['parties with maximum demands']
    },
    {
      outcome: '僵局',
      probability: Math.round(20 + (10 - flexibility) * 5),
      description: '各方立场差距过大，谈判陷入僵局',
      forUser: '重新评估筹码，考虑是否需要调整策略或引入第三方调解',
      winners: [],
      losers: ['all parties (time/resources wasted)']
    },
    {
      outcome: '破裂',
      probability: Math.round(10 + (10 - flexibility) * 3),
      description: '谈判破裂，各方关系恶化',
      forUser: '这是最坏情况，需要谨慎处理，避免激化矛盾',
      winners: [],
      losers: ['all parties (potential escalation)']
    }
  ];
  
  // 各方分析
  const partyAnalysis: StrategyAnalysis['partyAnalysis'] = {};
  
  // 分析所有主要国家
  const mainCountries = countries.slice(0, 8); // 取前8个主要国家
  
  for (const c of mainCountries) {
    partyAnalysis[`party_${c.id}`] = {
      coreInterests: c.coreInterests.slice(0, 3),
      flexibility: c.personality.flexibility / 10,
      likelyMoves: generateLikelyMoves(c, country),
      vulnerabilities: c.vulnerabilities.slice(0, 3)
    };
  }
  
  // 策略建议
  const recommendations: StrategyAnalysis['recommendations'] = {
    immediate: [
      '明确自身核心利益和底线',
      '了解各方的核心关切',
      '寻找潜在共同利益领域',
      '准备几个初步方案试探各方反应'
    ],
    shortTerm: [
      '根据各方反应调整策略',
      '运用议题捆绑或分离技巧',
      '适时展示筹码但不滥用',
      '保持沟通渠道畅通'
    ],
    longTerm: [
      '建立信任基础',
      '考虑利益交换的可能性',
      '预留退路和替代方案',
      '为可能的协议准备执行机制'
    ]
  };
  
  // 筹码交换矩阵
  const leverageMatrix: StrategyAnalysis['leverageMatrix'] = {};
  
  for (const c of mainCountries) {
    leverageMatrix[`party_${c.id}`] = {
      canOffer: c.negotiableInterests.slice(0, 3),
      needsFrom: {}
    };
    
    // 为每个国家添加与其他国家的需求关系
    for (const other of mainCountries) {
      if (c.id !== other.id) {
        leverageMatrix[`party_${c.id}`].needsFrom[`party_${other.id}`] = [
          `${other.name}可能提供的支持或让步`
        ];
      }
    }
  }
  
  return {
    sessionId,
    partyId,
    highDemand,
    bottomLine,
    middleGround,
    scenarios,
    partyAnalysis,
    recommendations,
    leverageMatrix
  };
}

// 生成默认分析
function generateDefaultAnalysis(partyId: string): StrategyAnalysis {
  return {
    sessionId: 'unknown',
    partyId,
    highDemand: {
      title: '最优方案',
      description: '最大化自身利益',
      probability: 30,
      conditions: ['需要足够的筹码和影响力'],
      keyPoints: ['核心利益得到保障']
    },
    bottomLine: {
      title: '底线',
      description: '可以接受的最低限度',
      nonNegotiable: ['主权', '安全'],
      acceptableCompromises: ['经济利益', '贸易条款']
    },
    middleGround: {
      bestCase: '达成有利协议',
      realistic: '折中方案',
      fallback: '暂时搁置'
    },
    scenarios: [
      {
        outcome: '全面协议',
        probability: 35,
        description: '各方达成共识',
        forUser: '争取最优结果',
        winners: ['flexible parties'],
        losers: []
      },
      {
        outcome: '部分协议',
        probability: 40,
        description: '部分议题一致',
        forUser: '选择性突破',
        winners: ['pragmatic parties'],
        losers: []
      },
      {
        outcome: '僵局',
        probability: 20,
        description: '立场差距过大',
        forUser: '调整策略',
        winners: [],
        losers: ['all']
      },
      {
        outcome: '破裂',
        probability: 5,
        description: '谈判失败',
        forUser: '避免发生',
        winners: [],
        losers: ['all']
      }
    ],
    partyAnalysis: {},
    recommendations: {
      immediate: ['了解各方立场'],
      shortTerm: ['调整策略'],
      longTerm: ['建立信任']
    },
    leverageMatrix: {}
  };
}

// 生成可能的行动
function generateLikelyMoves(country: any, targetCountry: any): string[] {
  const moves: string[] = [];
  
  // 根据国家性格生成
  if (country.personality.aggression > 7) {
    moves.push('施压和威胁');
    moves.push('设定最后期限');
  }
  
  if (country.personality.flexibility > 6) {
    moves.push('提出折中方案');
    moves.push('表示愿意对话');
  }
  
  if (country.personality.patience > 7) {
    moves.push('等待更好时机');
    moves.push('保持耐心');
  }
  
  // 根据谈判风格
  if (country.negotiationStyle.primary === 'competitive') {
    moves.push('争取最大利益');
    moves.push('利用筹码施压');
  } else if (country.negotiationStyle.primary === 'cooperative') {
    moves.push('寻求合作方案');
    moves.push('表达善意');
  } else if (country.negotiationStyle.primary === 'principled') {
    moves.push('援引规则和先例');
    moves.push('强调公平原则');
  }
  
  return moves.slice(0, 4);
}

// 预测结局
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, topic, parties } = body;
    
    // 生成结局预测
    const predictions = generateOutcomePredictions(topic, parties);
    
    return NextResponse.json({
      sessionId,
      predictions,
      summary: generatePredictionSummary(predictions),
      recommendations: generateRecommendations(predictions)
    });
    
  } catch (error) {
    console.error('预测生成失败:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

// 生成结局预测
function generateOutcomePredictions(topic: string, parties: string[]) {
  const partyObjects = parties
    .map(id => getCountryById(id))
    .filter(Boolean);
  
  // 计算平均灵活性
  const avgFlexibility = partyObjects.reduce(
    (sum, p) => sum + (p!.personality.flexibility / 10), 0
  ) / partyObjects.length;
  
  // 计算平均攻击性
  const avgAggression = partyObjects.reduce(
    (sum, p) => sum + (p!.personality.aggression / 10), 0
  ) / partyObjects.length;
  
  // 基于各方特征生成预测
  return {
    // 最可能的结局
    mostLikely: avgFlexibility > 0.6 ? 'partial_agreement' : 'deadlock',
    
    // 各方可能的收获
    gains: partyObjects.map(p => ({
      countryId: p!.id,
      countryName: p!.name,
      likelyGain: p!.personality.aggression > 6 
        ? '可能获得较大利益' 
        : '可能获得适度利益',
      keyFactors: p!.typicalStrategies.slice(0, 2)
    })),
    
    // 结局概率分布
    probabilities: {
      comprehensiveAgreement: Math.round(avgFlexibility * 40),
      partialAgreement: Math.round((1 - avgAggression) * 35 + 15),
      deadlock: Math.round(avgAggression * 25),
      breakdown: Math.round((1 - avgFlexibility) * 15)
    },
    
    // 关键影响因素
    keyFactors: [
      '各方核心利益的冲突程度',
      '筹码和影响力的对比',
      '国际环境的影响',
      '领导人的个人风格'
    ],
    
    // 时间线预测
    timeline: {
      quickResolution: avgFlexibility > 0.7 && partyObjects.length <= 3,
      moderateDuration: true,
      prolongedNegotiation: avgAggression > 0.7 || partyObjects.length > 4
    }
  };
}

// 生成预测摘要
function generatePredictionSummary(predictions: any): string {
  const { mostLikely, probabilities } = predictions;
  
  if (mostLikely === 'partial_agreement') {
    return `预计谈判将达成部分协议。全面协议概率${probabilities.comprehensiveAgreement}%，部分协议概率${probabilities.partialAgreement}%。`;
  } else {
    return `预计谈判可能陷入僵局。部分协议概率${probabilities.partialAgreement}%，僵局概率${probabilities.deadlock}%。`;
  }
}

// 生成建议
function generateRecommendations(predictions: any): string[] {
  const recommendations: string[] = [];
  
  if (predictions.mostLikely === 'deadlock') {
    recommendations.push('建议准备多个替代方案');
    recommendations.push('考虑引入第三方调解');
    recommendations.push('必要时可以接受逐步解决');
  }
  
  if (predictions.timeline.prolongedNegotiation) {
    recommendations.push('做好长期谈判准备');
    recommendations.push('分阶段推进，避免一次解决所有问题');
  }
  
  if (predictions.timeline.quickResolution) {
    recommendations.push('抓住时机，争取快速突破');
    recommendations.push('准备好核心诉求的优先顺序');
  }
  
  recommendations.push('保持沟通渠道畅通');
  recommendations.push('注意控制情绪，避免激化矛盾');
  
  return recommendations;
}
