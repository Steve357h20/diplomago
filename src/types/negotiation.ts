// 谈判上下文类型定义

// 历史背景结构（支持简化的字符串和详细的对象）
export interface HistoricalBackground {
  brief?: string;
  detailed?: string;
  keyHistoricalEvents?: string[];
  culturalTraits?: string[];
  diplomaticTraditions?: string[];
}

export interface Party {
  name: string;
  country: string;
  role: 'diplomat' | 'advisor' | 'observer';
  
  // 基础属性
  personality?: PersonalityTraits;
  historicalBackground?: string | HistoricalBackground;
  
  // 完整谈判档案（从国家数据库获取）
  negotiationStyle?: {
    primary: string;
    secondary: string;
    approach: string;
    communication: string;
  };
  
  // 利益分类
  coreInterests?: string[];           // 核心利益（不妥协）
  importantInterests?: string[];      // 重要利益（可谈判）
  negotiableInterests?: string[];     // 可交易利益
  
  // 谈判资源
  leveragePoints?: string[];          // 筹码
  typicalStrategies?: string[];       // 典型策略
  vulnerabilities?: string[];         // 弱点/顾虑
  
  // 语言特点
  languageStyle?: {
    formality: 'formal' | 'semi-formal' | 'casual';
    directness: 'high' | 'medium' | 'low';
    emotionInvolvement: 'high' | 'medium' | 'low';
  };
  
  // 特殊能力
  capabilities?: string[];
}

export interface PersonalityTraits {
  aggression: number; // 0-10, 攻击性
  flexibility: number; // 0-10, 灵活性
  patience: number; // 0-10, 耐心
  riskTolerance: number; // 0-10, 风险承受
  nationalism: number; // 0-10, 民族主义
  formality?: number; // 0-10, 正式程度
  trustOrientation?: number; // 0-10, 信任倾向
  multilateralOrientation?: number; // 0-10, 多边主义倾向
  bilateralOrientation?: number; // 0-10, 双边主义倾向
}

export type EraType = 'cold-war' | 'post-cold-war' | 'modern';

// 扩展的历史时期类型（用于更精细的时代选择）
export type HistoricalEra =
    | 'cold-war-early'      // 冷战初期 (1947-1962)
    | 'cold-war-detente'    // 冷战缓和 (1962-1979)
    | 'cold-war-late'       // 冷战后期 (1979-1991)
    | 'post-cold-war'       // 后冷战 (1991-2008)
    | 'post-2008'           // 后金融危机 (2008-2016)
    | 'modern'              // 当代 (2016-现在)
    | 'future';             // 未来（2050后）

// 历史时期配置
export interface EraConfig {
  id: HistoricalEra;
  name: string;
  shortName: string;
  description: string;
  yearRange: string;
  characteristics: string[];
  typicalLanguageStyle: string;
  aggressionModifier: number;   // 对基础攻击性的调整
  formalityModifier: number;    // 对正式程度的调整
  flexibilityModifier: number;  // 对灵活性的调整
}

// 时期特定的外交档案（用于国家在不同时期的变化）
export interface EraSpecificDiplomacy {
  era: HistoricalEra;
  diplomaticStyle: {
    primary: string;
    secondary: string;
    approach: string;
    communication: string;
  };
  personalityModifier: {
    aggression: number;
    flexibility: number;
    patience: number;
    formality: number;
  };
  typicalStrategies: string[];
  vulnerabilities: string[];
  languageStyle: {
    formality: 'formal' | 'semi-formal' | 'casual';
    directness: 'high' | 'medium' | 'low';
    emotionInvolvement: 'high' | 'medium' | 'low';
  };
  keyPhrases: string[];  // 典型外交用语
  negotiationTraits: {
    pressureTactics: string[];
    concessions: string[];
    redLines: string[];
  };
}

// 双边谈判难度级别
export type BilateralDifficulty = 'easy' | 'medium' | 'hard';

// 双边谈判难度设置
export interface BilateralDifficultySettings {
  level: BilateralDifficulty;
  
  // 简单模式特点
  easy: {
    autoRespond: boolean;              // AI自动生成回应
    showDecisionPoints: boolean;       // 在关键决策点暂停
    showExpressionOptions: boolean;    // 提供表达方式选项
    aiAssisted: boolean;               // AI全程辅助
  };
  
  // 中等模式特点
  medium: {
    autoRespond: boolean;
    showDecisionPoints: boolean;
    showExpressionOptions: boolean;    // 提供外交表达选项
    showProposalOptions: boolean;      // 提供方案选项
    aiAssisted: boolean;
  };
  
  // 高难度模式特点
  hard: {
    autoRespond: boolean;              // 完全自主，不自动生成
    showDecisionPoints: boolean;       // 仍显示决策提示
    showExpressionOptions: boolean;
    showProposalOptions: boolean;
    aiAssisted: boolean;               // 仅提供建议，不自动执行
  };
}

// 难度级别描述
export const DIFFICULTY_DESCRIPTIONS: Record<BilateralDifficulty, { title: string; description: string; icon: string }> = {
  easy: {
    title: '入门模式',
    description: 'AI将自动处理对话，在关键决策点暂停让你选择。让您专注于策略思考，无需担心表达方式。',
    icon: '🎯'
  },
  medium: {
    title: '进阶模式',
    description: 'AI提供外交表达选项和方案建议，帮助您提升专业谈判能力。适合有一定基础的学员。',
    icon: '⚖️'
  },
  hard: {
    title: '专家模式',
    description: '完全自主进行谈判，AI仅提供实时分析和建议。挑战您的外交谈判技巧极限。',
    icon: '🏆'
  }
};

export interface NegotiationTopic {
  id: string;
  name: string;
  category: 'trade' | 'territory' | 'peace' | 'security' | 'environmental' | 'cultural' | 'diplomatic' | 'technology' | 'propaganda';
  description: string;
  keyIssues: string[];
  era?: EraType;
  // 主题推荐难度（可选，用于显示在UI中）
  recommendedDifficulty?: 'beginner' | 'intermediate' | 'advanced';
  background?: string;
  suggestedApproaches?: {
    cooperative?: string;
    competitive?: string;
    balanced?: string;
  };
  suggestedOpponentStrategies?: Record<string, string>;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  sentiment?: SentimentData;
  strategyTags?: string[];
  isPolished?: boolean;      // 是否经过AI润色
  originalMessage?: string;  // 原始消息（如果润色过）
}

export interface SentimentData {
  emotion: 'neutral' | 'positive' | 'negative' | 'suspicious' | 'angry' | 'pleased';
  confidence: number; // 0-1
  intensity: number; // 0-100
  microExpressions?: MicroExpression[];
}

export interface MicroExpression {
  type: 'tension' | 'relaxation' | 'frustration' | 'confidence' | 'doubt';
  duration: number; // ms
  confidence: number;
}

export interface NegotiationContext {
  topic: NegotiationTopic;
  parties: {
    self: Party;
    opponent: Party;
  };
  objectives: string[];
  bottomLines: string[];
 筹码?: string[];
  historicalPrecedents?: string[];
}

export interface NegotiationState {
  sessionId: string | null;
  context: NegotiationContext | null;
  messages: Message[];
  currentSentiment: SentimentData | null;
  outcomePrediction: number; // -100 to 100
  phase: 'setup' | 'negotiating' | 'concluded';
  turnCount: number;
  isAiThinking: boolean;
}

export interface StrategyHint {
  type: 'offensive' | 'defensive' | 'collaborative' | 'compromising' | 'avoiding';
  title: string;
  description: string;
  confidence: number;
  alternativeMoves?: string[];
}

// 背景和议题类型
export interface BilateralBackground {
  historicalContext: string;    // 历史渊源
  recentEvents: string;        // 近期发展
  triggerEvent: string;        // 直接导火索
  currentStance: {
    self: string;              // 己方立场
    opponent: string;          // 对方立场
  };
  currentSituation: string;     // 当前态势
}

export interface NegotiationIssue {
  id: string;
  title: string;               // 议题标题
  description: string;         // 议题描述
  controversy: string;         // 争议焦点
  selfPosition: string;        // 己方立场
  opponentPosition: string;    // 对方立场
  difficulty: 'easy' | 'medium' | 'hard';
  importance: number;          // 1-5
  isSelected?: boolean;
  order?: number;
}

export interface GeneratedScenario {
  background: BilateralBackground;
  fullBackground: string;      // 完整背景故事
  issues: NegotiationIssue[];  // AI生成的议题
}

// 谈判目标类型
export interface NegotiationGoals {
  highCase: string;            // 高案目标
  bottomLine: string;          // 底线目标
  winWinCase?: string;         // 共赢方案
}

// 谈判阶段
export type NegotiationPhase = 'setup' | 'negotiating' | 'concluded';

// 会话状态
export interface SessionState {
  topic: NegotiationTopic | null;
  selfCountry: string | null;
  opponentCountry: string | null;
  opponentPersonality: string | null;
  difficulty: BilateralDifficulty;
  background: GeneratedScenario | null;
  goals: NegotiationGoals | null;
  issues: NegotiationIssue[];
  objectives: string[];
}

// 结果分析类型
export interface OutcomeAnalysis {
  overallScore: number; // -100 to 100
  summary: string; // 谈判总结
  keyDecisions: {
    turn: number;
    decision: string;
    impact: 'positive' | 'neutral' | 'negative';
    explanation: string;
  }[];
  sentimentTrend: {
    timestamp: number;
    value: number;
  }[];
  strengths: string[]; // 优势
  weaknesses: string[]; // 不足
  recommendations: {
    category: 'tactics' | 'strategy' | 'preparation';
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
  }[];
  similarCases?: {
    id: string;
    name: string;
    year: number;
    parties: string;
    outcome: number;
    keyDifference: string;
  }[];
}

// AI助手相关类型
export interface AssistantMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: number;
  isTyping?: boolean;
  emotion?: 'friendly' | 'serious' | 'encouraging' | 'warning';
}

// 训练记录类型
export interface TrainingRecord {
  id: string;
  type: 'bilateral' | 'multilateral';
  topic: string;
  topicCategory: string;
  selfCountry: string;
  opponentCountry?: string;
  opponentCountries?: string[];
  difficulty: string;
  era?: string;
  startTime: number;
  endTime?: number;
  duration?: number; // 秒
  outcome?: number; // -100 to 100
  outcomeLabel?: string;
  rounds?: number;
  status: 'in-progress' | 'completed' | 'abandoned';
  summary?: string;
  keyDecisions?: string[];
  improvements?: string[];
}

// 训练记录摘要（用于列表展示）
export interface TrainingRecordSummary {
  id: string;
  type: 'bilateral' | 'multilateral';
  topic: string;
  selfCountry: string;
  opponentCountry?: string;
  countriesCount?: number;
  startTime: number;
  outcome?: number;
  status: 'in-progress' | 'completed' | 'abandoned';
}
