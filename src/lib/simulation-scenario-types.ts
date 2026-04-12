// 模拟外交谈判场景类型定义
// 支持导入外部场景文档，解析后用于模拟

import { CountryProfile } from './countries';

// ==================== 场景类型 ====================
export type ScenarioType = 'bilateral' | 'trilateral' | 'multilateral';
export type ScenarioEra = 'historical' | 'modern' | 'future' | 'fictional';

// ==================== 场景基础信息 ====================
export interface ScenarioOverview {
  id: string;
  name: string;
  type: ScenarioType;
  era: ScenarioEra;
  description: string;
  // 推荐难度
  recommendedDifficulty: 'beginner' | 'intermediate' | 'advanced';
  
  // 难度说明
  difficultyNote?: string;
  
  // 适用场景
  useCases: string[];
  
  // 学习目标
  learningObjectives: string[];
  
  // 预计时长
  estimatedMinutes: number;
  
  // 创建信息
  source?: string;
  createdAt?: string;
}

// ==================== 国家概况 ====================
export interface CountryBriefing {
  countryId: string;
  country: CountryProfile;
  
  // 公开信息
  publicInfo: {
    overview: string;          // 总体介绍
    recentDevelopments: string; // 最新动态
  };
  
  // 历史文化背景
  historicalBackground?: string;
  
  // 公开立场
  publicStance: string;
  
  // 公开利益
  publicInterests: string[];
}

// ==================== 背景故事 ====================
export interface ScenarioBackground {
  // 总体背景
  overview: string;
  
  // 时间线事件
  timeline: {
    time: string;
    event: string;
    significance: 'major' | 'minor';
  }[];
  
  // 涉及国家
  involvedCountries: string[];
  
  // 地图/地理信息
  mapDescription?: string;
  mapImageUrl?: string;
  
  // 关键数据
  keyData?: {
    label: string;
    value: string;
    source?: string;
  }[];
}

// ==================== 公开议题 ====================
export interface PublicIssue {
  id: string;
  title: string;
  description: string;
  
  // 议题状态
  status: 'discussing' | 'agreed' | 'deadlocked' | 'pending';
  
  // 关联信息
  relatedParties: string[];
  relatedEvents?: string[];
}

// ==================== 秘密信息（各参与方独立） ====================
export interface SecretBriefing {
  // 所属国家
  countryId: string;
  
  // 真实目的（隐藏议程）
  hiddenAgenda: {
    summary: string;
    details: string[];
  };
  
  // 理想方案（高案）
  idealSolution: {
    summary: string;
    conditions: string[];  // 实现条件
    acceptableVariations?: string[];  // 可接受的变体
  };
  
  // 底线方案（最低接受）
  bottomLine: {
    summary: string;
    conditions: string[];  // 必须满足的条件
    unacceptableOutcomes?: string[];  // 绝对不可接受的结局
  };
  
  // 可交易项目
  negotiableItems: {
    item: string;
    value: string;        // 对己方价值
    flexibility: 'high' | 'medium' | 'low';
    exchangeFor?: string; // 希望换取什么
  }[];
  
  // 筹码
  leverage: {
    description: string;
    strength: 'strong' | 'medium' | 'weak';
    useConditions?: string;
  }[];
  
  // 需要隐瞒的信息
  hiddenTruth: {
    description: string;
    riskIfRevealed: string;
    howToConceal: string;
  }[];
  
  // 弱点
  vulnerabilities: {
    description: string;
    riskLevel: 'high' | 'medium' | 'low';
    mitigation?: string;
  }[];

  // 谈判策略建议
  strategyHints: {
    whenToUse: string;
    approach: string;
    expectedReaction: string;
  }[];
}

// 筹码项类型
export type LeverageItem = {
  description: string;
  strength: 'strong' | 'medium' | 'weak';
  useConditions?: string;
};

// 弱点项类型
export type VulnerabilityItem = {
  description: string;
  riskLevel: 'high' | 'medium' | 'low';
  mitigation?: string;
};

// 策略提示项类型
export type StrategyHintItem = {
  whenToUse: string;
  approach: string;
  expectedReaction: string;
};

// ==================== 完整场景文档 ====================
export interface SimulationScenario {
  // 基本信息
  overview: ScenarioOverview;
  
  // 参与国家公开信息
  countryBriefings: CountryBriefing[];
  
  // 背景故事
  background: ScenarioBackground;
  
  // 公开议题
  publicIssues: PublicIssue[];
  
  // 秘密信息（按国家ID索引）
  secretBriefings: Record<string, SecretBriefing>;
  
  // 预设立场矩阵（谁对谁什么态度）
  initialRelations: {
    from: string;
    to: string;
    attitude: number;  // -100 ~ 100
    reason: string;
  }[];
  
  // 场景元数据
  metadata: {
    version: string;
    lastUpdated: string;
    author?: string;
    tags: string[];
  };
}

// ==================== 会话中使用的场景信息 ====================
export interface ScenarioSession {
  // 场景ID
  scenarioId: string;
  
  // 会话ID
  sessionId: string;
  
  // 用户扮演的国家
  userCountryId: string;
  
  // 分配的角色
  userRole: 'primary' | 'advisor' | 'observer';
  
  // 用户可见的公开信息
  visibleToUser: {
    overview: ScenarioOverview;
    background: ScenarioBackground;
    countryBriefings: CountryBriefing[];
    publicIssues: PublicIssue[];
    
    // 公开立场矩阵
    publicRelations: {
      from: string;
      to: string;
      attitude: number;
      publicReason: string;
    }[];
  };
  
  // 用户的秘密信息
  userSecret: SecretBriefing;
  
  // AI控制的国家及其秘密
  aiCountries: {
    countryId: string;
    briefing: SecretBriefing;
  }[];
  
  // 当前谈判状态
  negotiationState: {
    currentPhase: 'opening' | 'discussion' | 'negotiation' | 'summit' | 'conclusion';
    activeIssues: string[];
    agreedIssues: string[];
    deadlockedIssues: string[];
    
    // 各方态度变化
    attitudeHistory: {
      time: string;
      attitudes: Record<string, number>;
    }[];
  };
  
  // 用户的策略记录
  userStrategy: {
    moves: {
      time: string;
      type: 'proposal' | 'concession' | 'threat' | 'compromise' | 'statement';
      content: string;
      target?: string;
      result?: 'accepted' | 'rejected' | 'countered' | 'pending';
    }[];
    
    // 用户的目标完成度
    goalProgress: {
      goal: string;
      progress: number;  // 0-100
      obstacles: string[];
    }[];
  };
}

// ==================== 预设场景 ====================
export interface PresetScenario {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  
  // 参与国家
  participantIds: string[];
  
  // 场景类型
  type: ScenarioType;
  
  // 推荐难度
  recommendedDifficulty: 'beginner' | 'intermediate' | 'advanced';
  
  // 学习点
  learningPoints: string[];
  
  // 预估时长
  estimatedMinutes: number;
}

// ==================== 场景选择配置 ====================
export interface ScenarioConfig {
  // 选择的国家
  selectedCountries: {
    id: string;
    role: 'user' | 'ai' | 'mediator';
  }[];
  
  // 难度设置
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  
  // 用户扮演角色
  userRole: 'primary' | 'advisor' | 'observer';
  
  // 是否启用特殊规则
  specialRules?: {
    enableTimeLimit: boolean;     // 时间限制
    enableSecretVotes: boolean;    // 秘密投票
    enableMediation: boolean;     // 调解机制
    enableConsequences: boolean;   // 后果系统
  };
}

// ==================== 难度级别 ====================
export interface DifficultyLevel {
  level: 'beginner' | 'intermediate' | 'advanced';
  
  // 语言风格
  languageStyle: 'simple' | 'mixed' | 'formal';
  
  // 辅助功能
  aids: {
    showTerminology: boolean;      // 显示术语解释
    showStrategyHints: boolean;     // 显示策略提示
    showPredictions: boolean;       // 显示结果预测
    showTutorial: boolean;          // 显示教程提示
    autoSummarize: boolean;         // 自动总结
  };
  
  // AI行为调整
  aiBehavior: {
    aggression: number;             // AI攻击性 0-1
    helpfulness: number;            // AI帮助程度 0-1
    revelationSpeed: number;        // 信息揭示速度 0-1
    concessionSpeed: number;        // 让步速度 0-1
  };
  
  // 界面显示
  display: {
    showRelationsMap: boolean;      // 显示关系图
    showInterestAnalysis: boolean;   // 显示利益分析
    showNegotiationHistory: boolean; // 显示谈判历史
  };
}

// ==================== 预设难度配置 ====================
export const presetDifficulties: Record<'beginner' | 'intermediate' | 'advanced', DifficultyLevel> = {
  beginner: {
    level: 'beginner',
    languageStyle: 'simple',
    aids: {
      showTerminology: true,
      showStrategyHints: true,
      showPredictions: true,
      showTutorial: true,
      autoSummarize: true
    },
    aiBehavior: {
      aggression: 0.3,
      helpfulness: 0.8,
      revelationSpeed: 0.8,
      concessionSpeed: 0.7
    },
    display: {
      showRelationsMap: true,
      showInterestAnalysis: true,
      showNegotiationHistory: true
    }
  },
  intermediate: {
    level: 'intermediate',
    languageStyle: 'mixed',
    aids: {
      showTerminology: false,
      showStrategyHints: true,
      showPredictions: true,
      showTutorial: false,
      autoSummarize: false
    },
    aiBehavior: {
      aggression: 0.5,
      helpfulness: 0.5,
      revelationSpeed: 0.5,
      concessionSpeed: 0.5
    },
    display: {
      showRelationsMap: true,
      showInterestAnalysis: false,
      showNegotiationHistory: true
    }
  },
  advanced: {
    level: 'advanced',
    languageStyle: 'formal',
    aids: {
      showTerminology: false,
      showStrategyHints: false,
      showPredictions: false,
      showTutorial: false,
      autoSummarize: false
    },
    aiBehavior: {
      aggression: 0.7,
      helpfulness: 0.3,
      revelationSpeed: 0.3,
      concessionSpeed: 0.3
    },
    display: {
      showRelationsMap: false,
      showInterestAnalysis: false,
      showNegotiationHistory: false
    }
  }
};
