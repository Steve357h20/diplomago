// 多边谈判评估API
// 基于用户设定的高低案评估谈判结果

import { NextRequest, NextResponse } from 'next/server';
import { 
  EvaluateNegotiationRequest, 
  EvaluationResult,
  UserNegotiationGoals
} from '@/lib/multilateral-types';

// 会话目标存储（实际应该从数据库获取）
const sessionGoals = new Map<string, UserNegotiationGoals>();

export async function POST(request: NextRequest) {
  try {
    const body: EvaluateNegotiationRequest = await request.json();
    
    // 验证必填字段
    if (!body.sessionId || !body.negotiationOutcome) {
      return NextResponse.json({ 
        error: '缺少必填字段' 
      }, { status: 400 });
    }
    
    // 获取会话目标（实际应该从数据库获取）
    const userGoals = sessionGoals.get(body.sessionId);
    
    if (!userGoals) {
      // 如果没有预设目标，使用默认评估
      return NextResponse.json(performDefaultEvaluation(
        body.negotiationOutcome,
        body.concessionsMade,
        body.concessionsGained
      ));
    }
    
    // 基于预设目标进行评估
    const evaluation = performGoalBasedEvaluation(
      userGoals,
      body.negotiationOutcome,
      body.concessionsMade,
      body.concessionsGained,
      body.finalAgreement
    );
    
    return NextResponse.json(evaluation);
    
  } catch (error) {
    console.error('评估失败:', error);
    return NextResponse.json({ 
      error: '服务器错误' 
    }, { status: 500 });
  }
}

// 保存会话目标
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, goals } = body;
    
    if (!sessionId || !goals) {
      return NextResponse.json({ error: '缺少必填字段' }, { status: 400 });
    }
    
    sessionGoals.set(sessionId, goals);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('保存目标失败:', error);
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}

// 基于预设目标进行评估
function performGoalBasedEvaluation(
  userGoals: UserNegotiationGoals,
  negotiationOutcome: string,
  concessionsMade: string[],
  concessionsGained: string[],
  finalAgreement?: string
): EvaluationResult {
  // 分析结果文本，计算与高低案的匹配度
  const outcomeAnalysis = analyzeOutcomeText(negotiationOutcome, finalAgreement);
  
  // 计算各维度得分
  const resultScore = calculateResultScore(userGoals, outcomeAnalysis);
  const processScore = calculateProcessScore(concessionsMade, concessionsGained);
  const strategyScore = calculateStrategyScore(userGoals, concessionsMade, concessionsGained);
  
  // 综合评估
  const overallScore = Math.round(resultScore * 0.5 + processScore * 0.3 + strategyScore * 0.2);
  
  // 确定评级
  let outcomeLevel: EvaluationResult['outcomeLevel'];
  if (overallScore >= 85) {
    outcomeLevel = 'excellent';
  } else if (overallScore >= 70) {
    outcomeLevel = 'good';
  } else if (overallScore >= 50) {
    outcomeLevel = 'acceptable';
  } else {
    outcomeLevel = 'poor';
  }
  
  // 计算与高案的对比
  const vsHighGoal = calculateVsHighGoal(userGoals, outcomeAnalysis);
  const vsBottomLine = calculateVsBottomLine(userGoals, outcomeAnalysis);
  
  return {
    outcomeScore: overallScore,
    outcomeLevel,
    outcomeDescription: generateOutcomeDescription(outcomeLevel, vsHighGoal, vsBottomLine),
    comparison: {
      vsHighGoal,
      vsBottomLine
    },
    breakdown: {
      resultQuality: resultScore,
      processQuality: processScore,
      strategyQuality: strategyScore
    },
    strengths: identifyStrengths(userGoals, outcomeAnalysis, concessionsGained),
    weaknesses: identifyWeaknesses(userGoals, outcomeAnalysis, concessionsMade, concessionsGained),
    improvementSuggestions: generateSuggestions(outcomeLevel, userGoals, concessionsMade)
  };
}

// 执行默认评估（无预设目标时）
function performDefaultEvaluation(
  negotiationOutcome: string,
  concessionsMade: string[],
  concessionsGained: string[]
): EvaluationResult {
  // 基于让步比例简单评估
  const gainRatio = concessionsGained.length / Math.max(1, concessionsMade.length);
  
  let score = 50;
  if (gainRatio > 1.5) score += 25;
  else if (gainRatio > 1) score += 15;
  else if (gainRatio < 0.5) score -= 15;
  
  const outcomeLevel: EvaluationResult['outcomeLevel'] = 
    score >= 70 ? 'good' : score >= 50 ? 'acceptable' : 'poor';
  
  return {
    outcomeScore: score,
    outcomeLevel,
    outcomeDescription: outcomeLevel === 'good' 
      ? '谈判结果较为有利，您在让步与收益之间取得了较好平衡。'
      : outcomeLevel === 'acceptable'
        ? '谈判达成了基本协议，结果尚可接受。'
        : '谈判结果不太理想，需要反思策略。',
    comparison: {
      vsHighGoal: score,
      vsBottomLine: score >= 50
    },
    breakdown: {
      resultQuality: score,
      processQuality: 60,
      strategyQuality: 55
    },
    strengths: ['达成了一定共识'],
    weaknesses: gainRatio < 1 ? ['让步多于收益'] : [],
    improvementSuggestions: ['下次谈判前明确自身底线', '多寻找共同利益点']
  };
}

// 分析结果文本
function analyzeOutcomeText(outcome: string, agreement?: string): {
  positiveTerms: string[];
  negativeTerms: string[];
  coreSecured: boolean;
  keyTerms: string[];
} {
  const text = (outcome + ' ' + (agreement || '')).toLowerCase();
  
  const positiveTerms = ['达成', '同意', '共识', '合作', '互利', '共赢', '成功', '满意', '接受'];
  const negativeTerms = ['拒绝', '反对', '僵局', '失败', '破裂', '退出', '威胁', '失败'];
  
  const foundPositive = positiveTerms.filter(t => text.includes(t));
  const foundNegative = negativeTerms.filter(t => text.includes(t));
  
  return {
    positiveTerms: foundPositive,
    negativeTerms: foundNegative,
    coreSecured: !foundNegative.some(t => ['拒绝', '反对', '僵局', '破裂'].includes(t)),
    keyTerms: []
  };
}

// 计算结果得分
function calculateResultScore(
  userGoals: UserNegotiationGoals,
  analysis: ReturnType<typeof analyzeOutcomeText>
): number {
  let score = 50;
  
  // 核心利益保障
  if (analysis.coreSecured) {
    score += 25;
  }
  
  // 正面表述
  score += Math.min(15, analysis.positiveTerms.length * 5);
  
  // 负面表述
  score -= Math.min(20, analysis.negativeTerms.length * 5);
  
  // 高案条款实现程度（简化判断）
  const highGoalTerms = userGoals.highGoal.keyTerms;
  const termsAchieved = highGoalTerms.filter(term => 
    analysis.keyTerms.some(kt => kt.includes(term)) || 
    analysis.positiveTerms.length > 0
  ).length;
  
  score += Math.round((termsAchieved / Math.max(1, highGoalTerms.length)) * 10);
  
  return Math.min(100, Math.max(0, score));
}

// 计算过程得分
function calculateProcessScore(
  concessionsMade: string[],
  concessionsGained: string[]
): number {
  let score = 60;
  
  const netConcessions = concessionsMade.length - concessionsGained.length;
  
  if (netConcessions < 0) {
    // 收益大于让步
    score += 20;
  } else if (netConcessions === 0) {
    // 对等交换
    score += 10;
  } else if (netConcessions <= 2) {
    // 适度让步
    score += 5;
  } else {
    // 过度让步
    score -= 15;
  }
  
  // 让步质量
  if (concessionsGained.length > 0 && concessionsMade.length > 0) {
    score += 5; // 有交换
  }
  
  return Math.min(100, Math.max(0, score));
}

// 计算策略得分
function calculateStrategyScore(
  userGoals: UserNegotiationGoals,
  concessionsMade: string[],
  concessionsGained: string[]
): number {
  let score = 55;
  
  // 核心让步检查
  const coreConcessions = concessionsMade.filter(c => 
    userGoals.bottomLine.keyTerms.some(term => c.includes(term))
  );
  
  if (coreConcessions.length > 0) {
    score -= 30; // 让步触及底线
  }
  
  // 收益检查
  if (concessionsGained.some(c => 
    userGoals.highGoal.keyTerms.some(term => c.includes(term))
  )) {
    score += 20; // 获得了高案条款
  }
  
  // 平衡性
  if (concessionsMade.length <= 3 && concessionsGained.length >= 2) {
    score += 15;
  }
  
  return Math.min(100, Math.max(0, score));
}

// 计算与高案的对比
function calculateVsHighGoal(
  userGoals: UserNegotiationGoals,
  analysis: ReturnType<typeof analyzeOutcomeText>
): number {
  const highGoalTerms = userGoals.highGoal.keyTerms;
  
  // 简化计算：基于正面/负面表述
  const positiveRatio = analysis.positiveTerms.length / Math.max(1, analysis.negativeTerms.length + 1);
  const baseScore = Math.min(100, Math.round(positiveRatio * 60 + 30));
  
  // 核心条款匹配
  const coreMatch = analysis.coreSecured ? 40 : 0;
  
  return Math.min(100, baseScore + coreMatch);
}

// 计算与底线的对比
function calculateVsBottomLine(
  userGoals: UserNegotiationGoals,
  analysis: ReturnType<typeof analyzeOutcomeText>
): boolean {
  // 底线守住 = 没有完全破裂 + 核心利益得到保障
  return analysis.coreSecured && !analysis.negativeTerms.includes('破裂');
}

// 生成结果描述
function generateOutcomeDescription(
  level: EvaluationResult['outcomeLevel'],
  vsHighGoal: number,
  vsBottomLine: boolean
): string {
  const descriptions = {
    excellent: vsHighGoal >= 80 
      ? '恭喜！您的谈判表现非常出色，完美实现了预期目标，甚至超越高案！'
      : '您的谈判表现优秀，基本达成了理想目标，是一次成功的多边外交博弈。',
    good: '您的谈判结果良好，在关键议题上有所斩获，守住了核心利益底线。',
    acceptable: vsBottomLine
      ? '谈判结果中规中矩，虽然未能获得理想结果，但守住了基本底线。'
      : '谈判结果勉强及格，部分底线有所突破，需要反思策略。',
    poor: '这次谈判结果不理想，核心利益受损。建议复盘分析，改进谈判策略。'
  };
  
  return descriptions[level];
}

// 识别优势
function identifyStrengths(
  userGoals: UserNegotiationGoals,
  analysis: ReturnType<typeof analyzeOutcomeText>,
  concessionsGained: string[]
): string[] {
  const strengths: string[] = [];
  
  if (analysis.coreSecured) {
    strengths.push('成功守住了核心利益');
  }
  
  if (concessionsGained.length > 0) {
    strengths.push(`通过谈判获得了${concessionsGained.length}项重要成果`);
  }
  
  if (analysis.positiveTerms.length > 3) {
    strengths.push('推动了积极的谈判氛围');
  }
  
  return strengths.length > 0 ? strengths : ['基本完成了谈判任务'];
}

// 识别不足
function identifyWeaknesses(
  userGoals: UserNegotiationGoals,
  analysis: ReturnType<typeof analyzeOutcomeText>,
  concessionsMade: string[],
  concessionsGained: string[]
): string[] {
  const weaknesses: string[] = [];
  
  if (analysis.negativeTerms.length > 2) {
    weaknesses.push('出现了一些消极信号，谈判氛围有待改善');
  }
  
  if (concessionsMade.length > concessionsGained.length) {
    weaknesses.push('让步略多于收益，交换比例可以优化');
  }
  
  return weaknesses;
}

// 生成改进建议
function generateSuggestions(
  level: EvaluationResult['outcomeLevel'],
  userGoals: UserNegotiationGoals,
  concessionsMade: string[]
): string[] {
  const suggestions: string[] = [];
  
  if (level === 'excellent') {
    suggestions.push('总结成功经验，形成可复制的谈判策略');
    suggestions.push('尝试更具挑战性的谈判场景');
  } else if (level === 'good') {
    suggestions.push('可以在议题捆绑策略上进一步优化');
    suggestions.push('尝试寻找更多共同利益点');
  } else if (level === 'acceptable') {
    suggestions.push('下次谈判前更清晰地定义高案和底线');
    suggestions.push('学习更多外交博弈技巧');
    suggestions.push('注意观察对手的微妙信号');
  } else {
    suggestions.push('重新审视谈判前的准备工作');
    suggestions.push('学习基本的谈判策略框架');
    suggestions.push('下次注意控制让步节奏');
    suggestions.push('多了解对手的核心关切');
  }
  
  return suggestions;
}
