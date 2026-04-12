// 多边外交谈判类型定义
import { CountryProfile } from './countries';

// ==================== 难度设置 ====================
// 多边谈判难度级别：新手(beginner) | 中等(intermediate) | 专业(professional)
export type MultilateralDifficulty = 'beginner' | 'intermediate' | 'professional';

export interface MultilateralDifficultySettings {
  level: MultilateralDifficulty;
  languageStyle: 'simple' | 'mixed' | 'formal';
  
  // 新手模式特点
  beginner: {
    showDiplomaticTerms: boolean;       // 显示外交术语解释
    showStrategyHints: boolean;           // 显示策略提示
    showOutcomePredictions: boolean;      // 显示结果预测
    autoTranslateJargon: boolean;        // 自动翻译术语为通俗语言
    majorDecisionsOnly: boolean;         // 仅在重大决策点暂停
    showExpressionOptions: boolean;       // 提供表达方式选项
    autoRespondMinor: boolean;           // 非关键时刻自动回应
  };
  
  // 中等模式特点
  intermediate: {
    showDiplomaticTerms: boolean;
    showStrategyHints: boolean;
    showOutcomePredictions: boolean;
    autoTranslateJargon: boolean;
    majorDecisionsOnly: boolean;
    showExpressionOptions: boolean;       // 提供外交表达选项
    showProposalOptions: boolean;         // 提供方案选项
    autoRespondMinor: boolean;
  };
  
  // 专业模式特点
  professional: {
    enableDirectDiplomacy: boolean;       // 使用专业外交语言
    showHistoricalPrecedents: boolean;   // 显示历史先例
    enableConditionalOffers: boolean;     // 允许条件性要价
    showNegotiationFrameworks: boolean;  // 显示谈判框架分析
    majorDecisionsOnly: boolean;         // 仍显示决策提示
    showExpressionOptions: boolean;
    autoRespondMinor: boolean;            // 仅提供建议，不自动执行
  };
}

// 多边难度级别描述
export const MULTILATERAL_DIFFICULTY_DESCRIPTIONS: Record<MultilateralDifficulty, { title: string; description: string; icon: string }> = {
  beginner: {
    title: '新手模式',
    description: '在重大决策时暂停让你选择，其余时间AI自动博弈。帮助您理解多边谈判的基本流程。',
    icon: '🌱'
  },
  intermediate: {
    title: '进阶模式',
    description: 'AI提供外交表达选项和方案建议。适合有一定多边谈判经验的学员。',
    icon: '⚖️'
  },
  professional: {
    title: '专家模式',
    description: '完全自主进行多边谈判，AI仅提供实时分析。挑战多国外交博弈的极限。',
    icon: '🎓'
  }
};

// ==================== 谈判角色 ====================
export interface Negotiator {
  id: string;
  countryId: string;
  country: CountryProfile;
  role: 'primary' | 'advisor' | 'observer' | 'mediator';
  
  // 当前状态
  currentStance: 'confrontational' | 'neutral' | 'cooperative';
  sentiment: number; // -100 to 100 (负面到正面)
  
  // 谈判位置
  position: {
    opening: Position;      // 开局立场
    current: Position;     // 当前立场
    redLine: Position;     // 红线（不可退让）
  };
  
  // 策略信息（对用户隐藏）
  privateInfo: {
    highDemand: string;      // 高要价（理想结果）
    bottomLine: string;      // 底线（最低接受）
    alternatives: string[];  // 替代方案列表
    leveragePoints: string[]; // 可用筹码
    concessions: Concession[]; // 可让步项目
  };
}

export interface Position {
  summary: string;           // 立场摘要
  keyPoints: string[];       // 关键要点
  reasoning: string;         // 理由依据
  flexibility: number;       // 0-100 灵活度
}

// ==================== 让步机制 ====================
export interface Concession {
  id: string;
  description: string;
  originalImportance: number; // 1-10 原始重要度
  currentWillingness: number; // 1-10 当前让步意愿
  conditions: string[];      // 让步条件
  reciprocalRequired: boolean; // 是否需要对等让步
}

// ==================== 谈判议题 ====================
export interface NegotiationTopic {
  id: string;
  title: string;
  description: string;
  
  // 各方初始立场
  positions: {
    [countryId: string]: {
      stance: string;
      keyDemands: string[];
      acceptableRange: string;
    };
  };
  
  // 议题状态
  status: 'pending' | 'discussing' | 'agreed' | 'deadlocked';
  currentAgreement?: string;
  
  // 历史关联
  historicalContext?: string;
}

// ==================== 多边谈判会话 ====================
export interface MultilateralNegotiationSession {
  id: string;
  
  // 基本信息
  topic: string;
  topicDescription: string;
  background: string;
  
  // 参与者
  parties: {
    user: PartyInfo;         // 用户代表方
    opponents: PartyInfo[];  // 对手方（可以是多个AI）
    thirdParties?: PartyInfo[]; // 第三方（如调解者）
  };
  
  // 难度设置
  difficulty: MultilateralDifficultySettings;
  
  // 议题
  topics: NegotiationTopic[];
  
  // 时间线
  timeline: NegotiationEvent[];
  
  // 当前状态
  currentPhase: 'opening' | 'discussion' | 'negotiation' | 'summit' | 'conclusion';
  currentSpeaker: string | null;
  
  // 预测与分析
  predictions: {
    probableOutcome: string;
    confidenceLevel: number;
    keyFactors: string[];
    riskScenarios: RiskScenario[];
  };
  
  // 创建时间
  createdAt: string;
  updatedAt: string;
}

export interface PartyInfo {
  id: string;
  countryId: string;
  country: CountryProfile;
  isUser: boolean;
  
  // 目标
  objectives: {
    primary: string;
    secondary: string[];
    hidden?: string;
  };
  
  // 公开立场
  publicPosition: string;
  
  // AI控制信息（仅对用户或对手）
  ai?: {
    lastMessage?: string;
    sentiment: number;
    proposedDeals: ProposedDeal[];
  };
}

// ==================== 谈判事件 ====================
export interface NegotiationEvent {
  id: string;
  timestamp: string;
  type: 'message' | 'proposal' | 'agreement' | 'deadlock' | 'mediation' | 'concession' | 'summit';
  
  speaker: string;           // 谁说的
  target?: string[];         // 说给谁
  
  content: {
    text: string;
    diplomaticVersion?: string;  // 专业版本
    simpleVersion?: string;      // 通俗版本
    analysis?: string;           // 分析
  };
  
  // 附加信息
  attachments?: {
    type: 'proposal' | 'analysis' | 'history' | 'agreement';
    data: any;
  };
  
  // 情绪/语气
  sentiment?: number;
  tone?: 'positive' | 'neutral' | 'negative' | 'warning' | 'ultimatum';
}

// ==================== 提议与协议 ====================
export interface ProposedDeal {
  id: string;
  proposer: string;
  target: string[];
  
  content: {
    summary: string;
    terms: DealTerm[];
    benefits: { [partyId: string]: string };
    costs: { [partyId: string]: string };
  };
  
  status: 'proposed' | 'negotiating' | 'accepted' | 'rejected' | 'modified';
  
  deadline?: string;
  conditions: string[];
}

export interface DealTerm {
  topicId: string;
  description: string;
  forParty: { [partyId: string]: 'accept' | 'neutral' | 'oppose' };
}

// ==================== 风险情景 ====================
export interface RiskScenario {
  id: string;
  title: string;
  probability: number;     // 0-100
  impact: number;           // 0-100
  description: string;
  triggers: string[];
  mitigation?: string;
}

// ==================== 分析报告 ====================
export interface MultilateralAnalysis {
  sessionId: string;
  
  // 各方分析
  partyAnalyses: {
    [partyId: string]: {
      performance: number;         // 表现评分
      objectiveAchievement: number; // 目标达成度
      concessionsMade: string[];
      concessionsGained: string[];
      strategyAssessment: string;
      strengths: string[];
      weaknesses: string[];
    };
  };
  
  // 整体评估
  overall: {
    fairness: number;       // 协议公平性
    stability: number;      // 协议稳定性
    complianceRisk: number; // 履约风险
    followUpNeeded: string[];
  };
  
  // 历史对比
  historicalComparison?: {
    similarCase: string;
    similarities: string[];
    differences: string[];
    lessonsLearned: string[];
  };
  
  // 改进建议
  recommendations: {
    forUser: string[];
    general: string[];
  };
}

// ==================== 谈判格式类型 ====================
// 多边谈判格式：峰会(3-5国) | 三方 | 四方 | 小多边(紧密合作) | 调停 | 区域合作 | 公共事务
export type NegotiationFormat = 'summit' | 'trilateral' | 'quad' | 'minilateral' | 'mediation' | 'regional' | 'public-goods';

// 格式所属类别
export type FormatCategory = 'diplomatic' | 'economic' | 'security' | 'humanitarian' | 'environmental' | 'trade';

export interface NegotiationFormatConfig {
  type: NegotiationFormat;
  name: string;
  description: string;
  icon: string;
  minCountries: number;
  maxCountries: number;
  category: FormatCategory;
  features: {
    aiAutoMediation: boolean;  // AI自动调解
    coalitionBuilding: boolean; // 联盟构建
    publicStatements: boolean; // 公开声明
    bilateralSides: boolean;   // 双边场边
    pressConference: boolean;  // 新闻发布会
    jointCommuniqué: boolean;  // 联合公报
    mediatorRole: boolean;     // 调解人角色
    regionalCoordination: boolean; // 区域协调
    sharedResponsibility: boolean; // 共同责任分担
  };
  typicalTopics: string[];
  keyCharacteristics: string[];
  typicalDuration: 'short' | 'medium' | 'extended';
  negotiationStyle: 'formal' | 'semi-formal' | 'informal';
}

// 谈判格式配置
export const NEGOTIATION_FORMATS: Record<NegotiationFormat, NegotiationFormatConfig> = {
  summit: {
    type: 'summit',
    name: '领导人峰会',
    description: '3-5位国家元首或政府首脑参加的高级别会谈，决策权威最高，通常用于达成框架性协议或解决重大分歧',
    icon: '🏛️',
    minCountries: 3,
    maxCountries: 5,
    features: {
      aiAutoMediation: false,
      coalitionBuilding: false,
      publicStatements: true,
      bilateralSides: true,
      pressConference: true,
      jointCommuniqué: true,
      mediatorRole: false,
      regionalCoordination: false,
      sharedResponsibility: false
    },
    typicalDuration: 'short',
    negotiationStyle: 'formal',
    category: 'diplomatic',
    typicalTopics: ['和平协议', '战略框架', '重大分歧解决', '联合声明'],
    keyCharacteristics: ['最高级别参与', '决策权威高', '媒体关注大']
  },
  trilateral: {
    type: 'trilateral',
    name: '三方会谈',
    description: '三个主要利益相关方参与的谈判，常用于寻求平衡或建立初步共识',
    icon: '🔺',
    minCountries: 3,
    maxCountries: 3,
    features: {
      aiAutoMediation: true,
      coalitionBuilding: false,
      publicStatements: false,
      bilateralSides: false,
      pressConference: false,
      jointCommuniqué: true,
      mediatorRole: false,
      regionalCoordination: false,
      sharedResponsibility: false
    },
    typicalDuration: 'medium',
    negotiationStyle: 'semi-formal',
    category: 'economic',
    typicalTopics: ['贸易协定', '投资合作', '技术转让', '资源分配'],
    keyCharacteristics: ['三方博弈', '寻求平衡', '灵活变通']
  },
  quad: {
    type: 'quad',
    name: '四方机制',
    description: '四个国家或实体参与，常用于大国博弈或区域治理，如Quad安全对话',
    icon: '🔶',
    minCountries: 4,
    maxCountries: 4,
    features: {
      aiAutoMediation: true,
      coalitionBuilding: true,
      publicStatements: true,
      bilateralSides: true,
      pressConference: true,
      jointCommuniqué: true,
      mediatorRole: false,
      regionalCoordination: true,
      sharedResponsibility: false
    },
    typicalDuration: 'medium',
    negotiationStyle: 'formal',
    category: 'security',
    typicalTopics: ['安全对话', '海上安全', '基础设施建设', '供应链韧性'],
    keyCharacteristics: ['联盟构建', '价值观协调', '地缘竞争']
  },
  minilateral: {
    type: 'minilateral',
    name: '小多边合作',
    description: '2-3个利益高度相关的国家进行紧密协调，决策效率高，常用于技术标准、区域合作等具体领域',
    icon: '🤝',
    minCountries: 2,
    maxCountries: 3,
    features: {
      aiAutoMediation: false,
      coalitionBuilding: false,
      publicStatements: false,
      bilateralSides: false,
      pressConference: false,
      jointCommuniqué: true,
      mediatorRole: false,
      regionalCoordination: false,
      sharedResponsibility: true
    },
    typicalDuration: 'extended',
    negotiationStyle: 'informal',
    category: 'economic',
    typicalTopics: ['技术标准', '区域经济合作', '基础设施', '数字经济'],
    keyCharacteristics: ['紧密协调', '高效决策', '利益趋同']
  },
  mediation: {
    type: 'mediation',
    name: '冲突调解',
    description: '由第三方主持的争端调解机制，参与方可能包括直接当事方和调解人居间斡旋',
    icon: '⚖️',
    minCountries: 2,
    maxCountries: 6,
    features: {
      aiAutoMediation: true,
      coalitionBuilding: false,
      publicStatements: false,
      bilateralSides: true,
      pressConference: false,
      jointCommuniqué: true,
      mediatorRole: true,
      regionalCoordination: false,
      sharedResponsibility: false
    },
    typicalDuration: 'medium',
    negotiationStyle: 'formal',
    category: 'security',
    typicalTopics: ['领土争端', '边界冲突', '民族矛盾', '资源争夺'],
    keyCharacteristics: ['第三方调解', '保持中立', '寻求妥协']
  },
  regional: {
    type: 'regional',
    name: '区域合作',
    description: '区域内多个国家就共同关心的议题进行协调，议题涵盖政治、经济、安全等多领域',
    icon: '🌏',
    minCountries: 3,
    maxCountries: 10,
    features: {
      aiAutoMediation: true,
      coalitionBuilding: true,
      publicStatements: true,
      bilateralSides: false,
      pressConference: true,
      jointCommuniqué: true,
      mediatorRole: false,
      regionalCoordination: true,
      sharedResponsibility: true
    },
    typicalDuration: 'extended',
    negotiationStyle: 'semi-formal',
    category: 'diplomatic',
    typicalTopics: ['区域安全', '经济一体化', '基础设施互联互通', '人文交流'],
    keyCharacteristics: ['区域认同', '集体行动', '利益协调']
  },
  'public-goods': {
    type: 'public-goods',
    name: '公共事务治理',
    description: '多国共同参与全球或区域性公共事务的协商与治理，如气候变化、公共卫生等',
    icon: '🌍',
    minCountries: 3,
    maxCountries: 20,
    features: {
      aiAutoMediation: true,
      coalitionBuilding: true,
      publicStatements: true,
      bilateralSides: false,
      pressConference: true,
      jointCommuniqué: true,
      mediatorRole: false,
      regionalCoordination: false,
      sharedResponsibility: true
    },
    typicalDuration: 'extended',
    negotiationStyle: 'formal',
    category: 'environmental',
    typicalTopics: ['气候变化', '疫情防控', '跨境犯罪', '难民问题', '网络安全'],
    keyCharacteristics: ['共同但有区别责任', '全球治理', '多边主义']
  }
};

// 格式相关预设场景
export interface PresetScenario {
  id: string;
  name: string;
  format: NegotiationFormat;
  era: string;
  difficulty: MultilateralDifficulty;
  description: string;
  // 参与国家
  participants: {
    userRole: 'primary' | 'advisor' | 'observer' | 'mediator';
    countries: string[];
  };
  // 核心议题
  coreIssues: {
    id: string;
    title: string;
    description: string;
    sensitivity: 'high' | 'medium' | 'low';
  }[];
  // 背景故事
  background: string;
  // 特殊规则
  specialRules?: {
    timeLimit?: number; // 分钟
    publicDebate?: boolean;
    coalitionRequired?: boolean;
    mediationRequired?: boolean;      // 调解人角色
    coreIssuesFixed?: boolean;        // 核心议题固定
    consensusRequired?: boolean;       // 需要达成共识
    regionalBalance?: boolean;         // 区域平衡
    sharedResponsibility?: boolean;    // 共同责任
    equityFocus?: boolean;            // 公平关注
    technicalComplexity?: boolean;    // 技术复杂性
  };
}

// 预设场景库
export const PRESET_SCENARIOS: PresetScenario[] = [
  // ==================== 峰会场景 ====================
  {
    id: 'sanctions-summit',
    name: '联合国安理会制裁峰会',
    format: 'summit',
    era: 'modern',
    difficulty: 'professional',
    description: '五大常任理事国就新一轮制裁决议进行博弈',
    participants: {
      userRole: 'primary',
      countries: ['usa', 'china', 'russia', 'uk', 'france']
    },
    coreIssues: [
      { id: 'scope', title: '制裁范围', description: '确定制裁的行业和个人名单', sensitivity: 'high' },
      { id: 'enforcement', title: '执行机制', description: '争议执行监督和豁免条款', sensitivity: 'medium' }
    ],
    background: '围绕某地区紧张局势，中美俄在制裁问题上存在严重分歧...',
    specialRules: {
      timeLimit: 30,
      publicDebate: true
    }
  },
  // ==================== 三方场景 ====================
  {
    id: 'trade-trilateral',
    name: '中美欧贸易谈判',
    format: 'trilateral',
    era: 'modern',
    difficulty: 'intermediate',
    description: '全球三大经济体就数字贸易规则展开磋商',
    participants: {
      userRole: 'primary',
      countries: ['usa', 'china', 'eu']
    },
    coreIssues: [
      { id: 'data-flow', title: '数据跨境流动', description: '数据本地化要求与自由流动的平衡', sensitivity: 'high' },
      { id: 'standards', title: '技术标准', description: '网络安全与互操作性的协调', sensitivity: 'medium' }
    ],
    background: '数字经济时代，三大经济体都想主导规则制定...',
    specialRules: {
      coalitionRequired: false
    }
  },
  {
    id: 'maritime-trilateral',
    name: '中日韩海上安全磋商',
    format: 'trilateral',
    era: 'modern',
    difficulty: 'intermediate',
    description: '东亚三大经济体协调海上安全与渔业纠纷',
    participants: {
      userRole: 'primary',
      countries: ['china', 'japan', 'southkorea']
    },
    coreIssues: [
      { id: 'fisheries', title: '渔业资源分配', description: '专属经济区重叠海域的捕捞配额', sensitivity: 'medium' },
      { id: 'maritime-comm', title: '海上通信机制', description: '建立海空相遇安全准则', sensitivity: 'low' }
    ],
    background: '历史恩怨与现实利益的交织...',
    specialRules: {}
  },
  // ==================== 四方场景 ====================
  {
    id: 'indo-pacific-quad',
    name: '印太四方安全对话',
    format: 'quad',
    era: 'modern',
    difficulty: 'professional',
    description: '美日印澳四国协调印太战略',
    participants: {
      userRole: 'primary',
      countries: ['usa', 'japan', 'india', 'australia']
    },
    coreIssues: [
      { id: 'security', title: '海上安全合作', description: '航行自由与地区稳定的协调', sensitivity: 'high' },
      { id: 'infrastructure', title: '基础设施投资', description: '替代一带一路的选项', sensitivity: 'medium' },
      { id: 'vaccines', title: '疫苗外交', description: '疫情应对与医疗合作', sensitivity: 'low' }
    ],
    background: '四方机制从应对海啸的非传统安全合作演变为战略协调...',
    specialRules: {
      coalitionRequired: true
    }
  },
  {
    id: 'ukraine-quad',
    name: '乌克兰问题四方会谈',
    format: 'quad',
    era: 'modern',
    difficulty: 'professional',
    description: '美德法乌协调对俄政策立场',
    participants: {
      userRole: 'advisor',
      countries: ['usa', 'germany', 'france', 'ukraine']
    },
    coreIssues: [
      { id: 'military-aid', title: '军事援助程度', description: '武器供应与外交解决的平衡', sensitivity: 'high' },
      { id: 'negotiation', title: '谈判条件', description: '停火与领土让步的前提', sensitivity: 'high' }
    ],
    background: '欧洲安全格局面临二战后最严峻考验...',
    specialRules: {
      timeLimit: 45
    }
  },
  // ==================== 小多边场景 ====================
  {
    id: 'semiconductor-minilateral',
    name: '芯片联盟技术协调',
    format: 'minilateral',
    era: 'modern',
    difficulty: 'intermediate',
    description: '半导体产业链关键技术国协商出口管制',
    participants: {
      userRole: 'primary',
      countries: ['usa', 'japan', 'netherlands']
    },
    coreIssues: [
      { id: 'export-control', title: '设备出口许可', description: '先进光刻机与材料的管控范围', sensitivity: 'high' },
      { id: 'rnd-coop', title: '研发合作', description: '下一代芯片技术的联合研发', sensitivity: 'medium' }
    ],
    background: '全球半导体产业高度集中，技术封锁与反封锁日益激烈...',
    specialRules: {
      timeLimit: 20
    }
  },
  {
    id: 'climate-minilateral',
    name: '碳边境税协调',
    format: 'minilateral',
    era: 'modern',
    difficulty: 'intermediate',
    description: '欧盟与关键贸易伙伴碳定价机制协调',
    participants: {
      userRole: 'primary',
      countries: ['eu', 'uk', 'canada']
    },
    coreIssues: [
      { id: 'carbon-price', title: '碳价联动', description: '避免碳泄漏与公平竞争', sensitivity: 'medium' },
      { id: 'verification', title: '核查机制', description: '排放数据的相互认可', sensitivity: 'low' }
    ],
    background: '碳边境调节机制引发贸易伙伴强烈反应...',
    specialRules: {}
  },
  // ==================== 冲突调解场景 ====================
  {
    id: 'south-china-sea-mediation',
    name: '南海争端调解',
    format: 'mediation',
    era: 'modern',
    difficulty: 'professional',
    description: '多国参与南海领土争端的调解与管控',
    participants: {
      userRole: 'primary',
      countries: ['china', 'philippines', 'vietnam', 'indonesia', 'malaysia']
    },
    coreIssues: [
      { id: 'territorial', title: '岛礁主权', description: '南沙、西沙群岛的主权归属', sensitivity: 'high' },
      { id: 'maritime', title: '海域划界', description: '专属经济区重叠区域的划分', sensitivity: 'high' },
      { id: 'resources', title: '资源开发', description: '油气与渔业资源的共同开发', sensitivity: 'medium' },
      { id: 'freedom', title: '航行自由', description: '商业与军事航道的保障', sensitivity: 'high' }
    ],
    background: '南海是全球最繁忙的海上贸易通道之一，也是重要的油气储藏区...',
    specialRules: {
      timeLimit: 60,
      mediationRequired: true
    }
  },
  {
    id: 'kashmir-mediation',
    name: '克什米尔问题调解',
    format: 'mediation',
    era: 'modern',
    difficulty: 'professional',
    description: '印巴之间克什米尔争端的国际调解',
    participants: {
      userRole: 'mediator',
      countries: ['india', 'pakistan', 'usa', 'china', 'uk']
    },
    coreIssues: [
      { id: 'status', title: '地位问题', description: '克什米尔的最终地位安排', sensitivity: 'high' },
      { id: 'security', title: '安全关切', description: '跨境恐怖主义与军事对峙', sensitivity: 'high' },
      { id: 'water', title: '水资源共享', description: '印度河流域水资源的分配', sensitivity: 'high' }
    ],
    background: '克什米尔问题是南亚次大陆最持久的争端之一...',
    specialRules: {
      mediationRequired: true,
      coreIssuesFixed: true
    }
  },
  // ==================== 区域合作场景 ====================
  {
    id: 'asean-regional',
    name: '东盟区域整合',
    format: 'regional',
    era: 'modern',
    difficulty: 'intermediate',
    description: '东南亚国家就区域一体化进行协商',
    participants: {
      userRole: 'primary',
      countries: ['indonesia', 'vietnam', 'thailand', 'malaysia', 'philippines', 'singapore', 'myanmar']
    },
    coreIssues: [
      { id: 'economic', title: '经济一体化', description: 'RCEP实施与东盟经济共同体深化', sensitivity: 'medium' },
      { id: 'southchina', title: '南海行为准则', description: '区域海上行为规范的建立', sensitivity: 'high' },
      { id: 'myanmar', title: '缅甸危机', description: '人道主义危机与国际干预的平衡', sensitivity: 'high' },
      { id: 'infra', title: '基础设施', description: '区域互联互通与供应链韧性', sensitivity: 'low' }
    ],
    background: '东盟作为区域组织的凝聚力面临多重考验...',
    specialRules: {
      consensusRequired: true,
      regionalBalance: true
    }
  },
  {
    id: 'gulf-regional',
    name: '海湾合作协调',
    format: 'regional',
    era: 'modern',
    difficulty: 'intermediate',
    description: '海湾国家就地区安全与经济合作进行协商',
    participants: {
      userRole: 'advisor',
      countries: ['saudi-arabia', 'uae', 'qatar', 'kuwait', 'oman', 'bahrain']
    },
    coreIssues: [
      { id: 'security', title: '区域安全', description: '伊朗威胁与也门局势的应对', sensitivity: 'high' },
      { id: 'economic', title: '经济多元化', description: '后石油时代的经济转型合作', sensitivity: 'medium' },
      { id: 'integration', title: '内部整合', description: '海合会内部分歧的弥合', sensitivity: 'medium' }
    ],
    background: '海湾国家在面对共同挑战的同时，也存在内部竞争...',
    specialRules: {
      regionalBalance: true
    }
  },
  // ==================== 公共事务治理场景 ====================
  {
    id: 'climate-public-goods',
    name: '全球气候治理峰会',
    format: 'public-goods',
    era: 'modern',
    difficulty: 'professional',
    description: '主要排放国就碳中和目标与实施路径进行协调',
    participants: {
      userRole: 'primary',
      countries: ['china', 'usa', 'eu', 'india', 'japan', 'russia', 'brazil']
    },
    coreIssues: [
      { id: 'targets', title: '减排目标', description: '2030与2050目标的更新与强化', sensitivity: 'high' },
      { id: 'finance', title: '气候融资', description: '发展中国家适应与减排的资金支持', sensitivity: 'high' },
      { id: 'trade', title: '碳市场', description: '国际碳定价机制与边境调节', sensitivity: 'medium' },
      { id: 'tech', title: '技术转让', description: '清洁能源技术的知识产权与共享', sensitivity: 'medium' },
      { id: 'loss', title: '损失损害', description: '气候损失补偿机制的建立', sensitivity: 'high' }
    ],
    background: '全球气温上升逼近1.5度阈值，气候行动窗口日益收窄...',
    specialRules: {
      consensusRequired: false,
      sharedResponsibility: true,
      timeLimit: 45
    }
  },
  {
    id: 'pandemic-public-goods',
    name: '全球公共卫生治理',
    format: 'public-goods',
    era: 'modern',
    difficulty: 'professional',
    description: '疫情应对与未来大流行病防范的国际合作',
    participants: {
      userRole: 'primary',
      countries: ['usa', 'china', 'eu', 'india', 'japan', 'brazil', 'south-africa']
    },
    coreIssues: [
      { id: 'equity', title: '疫苗公平', description: '疫苗分配与知识产权豁免', sensitivity: 'high' },
      { id: 'surveillance', title: '疫情监测', description: '早期预警与信息共享机制', sensitivity: 'medium' },
      { id: 'preparedness', title: '防范准备', description: '医疗物资储备与生产能力', sensitivity: 'medium' },
      { id: 'financing', title: '资金机制', description: '大流行病防范基金的筹集与管理', sensitivity: 'medium' }
    ],
    background: '新冠疫情暴露了全球公共卫生治理的严重不足...',
    specialRules: {
      sharedResponsibility: true,
      equityFocus: true
    }
  },
  {
    id: 'cyber-public-goods',
    name: '网络空间治理',
    format: 'public-goods',
    era: 'modern',
    difficulty: 'professional',
    description: '网络空间规则与国际安全协调',
    participants: {
      userRole: 'advisor',
      countries: ['usa', 'china', 'russia', 'eu', 'uk', 'japan', 'india']
    },
    coreIssues: [
      { id: 'rules', title: '行为规范', description: '网络空间国家行为的国际规则', sensitivity: 'high' },
      { id: 'critical', title: '关键基础设施', description: '关键基础设施保护的国际合作', sensitivity: 'high' },
      { id: 'crime', title: '网络犯罪', description: '跨境网络犯罪的执法合作', sensitivity: 'medium' },
      { id: 'governance', title: '互联网治理', description: '多利益相关方与政府角色的平衡', sensitivity: 'medium' }
    ],
    background: '网络空间成为大国博弈的新战场...',
    specialRules: {
      technicalComplexity: true
    }
  }
];

// ==================== API 请求/响应 ====================
export interface MultilateralChatRequest {
  sessionId: string;
  message: string;
  targetParties?: string[];  // 指定回复方，默认为所有相关方
  context?: 'direct' | 'mediation' | ' multilateral';
}

export interface MultilateralChatResponse {
  sessionId: string;
  
  // 多方响应
  responses: {
    partyId: string;
    message: string;
    diplomaticVersion?: string;
    sentiment: number;
    tone: string;
    suggestedDeals?: ProposedDeal[];
  }[];
  
  // 更新后的状态
  updatedSession: Partial<MultilateralNegotiationSession>;
  
  // 提示与分析
  analysis?: {
    situationAssessment: string;
    recommendedStrategy: string;
    riskWarnings?: string[];
  };
}

export interface CreateSessionRequest {
  topic: string;
  topicDescription: string;
  background: string;
  
  userCountryId: string;
  opponentCountryIds: string[];
  thirdPartyCountryIds?: string[];
  
  difficulty: MultilateralDifficulty;
  
  // 新增：谈判格式
  format?: NegotiationFormat;
  
  // 新增：用户设定的目标（新手模式自动生成，进阶模式用户选择）
  userGoals?: UserNegotiationGoals;
  
  // 新增：选定的方案（进阶模式）
  selectedProposals?: {
    highProposalId: string;
    middleProposalId?: string;
    bottomLineProposalId: string;
  };
  
  initialPositions?: {
    user?: string;
    opponents?: { [id: string]: string };
  };
}

// ==================== 状态辅助函数 ====================
export function createDefaultDifficulty(level: MultilateralDifficulty): MultilateralDifficultySettings {
  const base: MultilateralDifficultySettings = {
    level,
    languageStyle: level === 'beginner' ? 'simple' : level === 'intermediate' ? 'mixed' : 'formal',
    beginner: {
      showDiplomaticTerms: level === 'beginner',
      showStrategyHints: true,
      showOutcomePredictions: true,
      autoTranslateJargon: level === 'beginner',
      majorDecisionsOnly: true,
      showExpressionOptions: true,
      autoRespondMinor: true,
    },
    intermediate: {
      showDiplomaticTerms: level === 'intermediate',
      showStrategyHints: true,
      showOutcomePredictions: true,
      autoTranslateJargon: level === 'intermediate',
      majorDecisionsOnly: false,
      showExpressionOptions: true,
      showProposalOptions: true,
      autoRespondMinor: false,
    },
    professional: {
      enableDirectDiplomacy: true,
      showHistoricalPrecedents: true,
      enableConditionalOffers: true,
      showNegotiationFrameworks: true,
      majorDecisionsOnly: false,
      showExpressionOptions: true,
      autoRespondMinor: false,
    }
  };
  return base;
}

export function getSentimentLabel(sentiment: number): string {
  if (sentiment >= 60) return '友好';
  if (sentiment >= 20) return '积极';
  if (sentiment >= -20) return '中立';
  if (sentiment >= -60) return '消极';
  return '敌对';
}

export function getStanceLabel(stance: Negotiator['currentStance']): string {
  return {
    confrontational: '对抗',
    neutral: '中立',
    cooperative: '合作'
  }[stance];
}

// ==================== 谈判方案类型（新）====================

// AI生成的谈判方案
export interface NegotiationProposal {
  id: string;
  title: string;                    // 方案名称
  description: string;              // 方案描述
  pros: string[];                   // 优点
  cons: string[];                   // 缺点/风险
  keyTerms: string[];               // 核心条款
  difficulty: 'high' | 'medium' | 'low';  // 达成难度
  alignment: {
    withCoreInterest: 'high' | 'medium' | 'low';  // 与核心利益的契合度
    withOthers: 'high' | 'medium' | 'low';        // 与他国利益的冲突度
  };
  estimatedAcceptance: number;       // 预估他国接受率 0-100
}

// 用户设定的谈判目标
export interface UserNegotiationGoals {
  highGoal: {
    title: string;                  // 高案标题
    description: string;            // 高案详细描述
    keyTerms: string[];             // 核心条款
    successIndicators: string[];    // 成功指标
  };
  middleGoal: {
    title: string;                  // 中间方案标题
    description: string;           // 中间方案详细描述
    keyTerms: string[];            // 核心条款
    successIndicators: string[];    // 成功指标
  };
  bottomLine: {
    title: string;                  // 底案标题
    description: string;           // 底案详细描述
    keyTerms: string[];             // 核心条款
    acceptableTerms: string[];       // 可接受的最低条件
  };
  // 评估基准
  evaluationCriteria: {
    outcomeScore: number;           // 结果分 0-100
    processScore: number;           // 过程分 0-100
  };
}

// 会话扩展信息（包含用户目标）
export interface SessionGoals {
  userGoals?: UserNegotiationGoals;
  generatedProposals?: NegotiationProposal[];  // 进阶模式AI生成的方案
  aiSuggestions?: {
    topic: string;
    suggestedApproach: string;
    talkingPoints: string[];
  }[];
}

// 方案生成请求
export interface GenerateProposalsRequest {
  topic: string;
  topicDescription: string;
  background: string;
  userCountryId: string;
  opponentCountryIds: string[];
  difficulty: MultilateralDifficulty;
}

// 方案生成响应
export interface GenerateProposalsResponse {
  success: boolean;
  proposals: NegotiationProposal[];
  explanation: string;
}

// 目标生成请求（新手模式）
export interface GenerateGoalsRequest {
  topic: string;
  topicDescription: string;
  background: string;
  userCountryId: string;
  opponentCountryIds: string[];
}

// 目标生成响应
export interface GenerateGoalsResponse {
  success: boolean;
  goals: UserNegotiationGoals;
  explanation: string;
}

// 评估请求
export interface EvaluateNegotiationRequest {
  sessionId: string;
  negotiationOutcome: string;      // 谈判最终结果描述
  concessionsMade: string[];        // 我方做出的让步
  concessionsGained: string[];      // 我方获得的让步
  finalAgreement?: string;         // 最终协议摘要
}

// 评估响应
export interface EvaluationResult {
  outcomeScore: number;            // 0-100
  outcomeLevel: 'excellent' | 'good' | 'acceptable' | 'poor';  // 结果评级
  outcomeDescription: string;       // 结果描述
  comparison: {
    vsHighGoal: number;             // 相比高案的达成度 0-100
    vsBottomLine: boolean;          // 是否守住底线
  };
  breakdown: {
    resultQuality: number;         // 结果质量分
    processQuality: number;        // 过程质量分
    strategyQuality: number;        // 策略质量分
  };
  strengths: string[];             // 表现亮点
  weaknesses: string[];             // 不足之处
  improvementSuggestions: string[];  // 改进建议
}
