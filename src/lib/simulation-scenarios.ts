// 预设模拟外交谈判场景
// 基于真实历史背景改编，用于外交培训

import { 
  SimulationScenario, 
  ScenarioOverview, 
  CountryBriefing, 
  ScenarioBackground, 
  PublicIssue,
  SecretBriefing,
  PresetScenario 
} from './simulation-scenario-types';
import { getCountryById } from './countries';

// ==================== 预设场景列表 ====================
export const presetScenarios: PresetScenario[] = [
  // 贸易谈判类
  {
    id: 'energy-crisis-trilateral',
    name: '能源危机三边谈判',
    description: '因环境污染引发的跨境争端，涉及能源转型合作',
    participantIds: ['cang', 'cui', 'ding'],
    type: 'trilateral',
    recommendedDifficulty: 'intermediate',
    learningPoints: [
      '理解能源转型中的多方利益博弈',
      '掌握环境与经济发展的平衡策略',
      '学习在三国谈判中寻找共同利益'
    ],
    estimatedMinutes: 45
  },
  {
    id: 'territory-dispute-multilateral',
    name: '领土争端多边调解',
    description: '历史遗留的领土争议，需要多方协调解决方案',
    participantIds: ['ares', 'geshu', 'xifan'],
    type: 'multilateral',
    recommendedDifficulty: 'advanced',
    learningPoints: [
      '处理敏感领土问题的外交技巧',
      '在大国博弈中维护小国利益',
      '多边谈判中的结盟策略'
    ],
    estimatedMinutes: 60
  },
  {
    id: 'trade-war-negotiation',
    name: '贸易协定重构',
    description: '主要经济体间的贸易规则重新谈判',
    participantIds: ['us', 'china', 'eu'],
    type: 'trilateral',
    recommendedDifficulty: 'intermediate',
    learningPoints: [
      '理解贸易谈判中的利益交换',
      '掌握关税与非关税壁垒的谈判技巧',
      '学习在大国间保持平衡'
    ],
    estimatedMinutes: 40
  },
  {
    id: 'sanctions-negotiation',
    name: '制裁解除谈判',
    description: '被制裁国家与国际社会的外交斡旋',
    participantIds: ['iran', 'us', 'russia'],
    type: 'trilateral',
    recommendedDifficulty: 'advanced',
    learningPoints: [
      '理解制裁机制的外交运用',
      '掌握在制裁框架下的谈判策略',
      '学习多方利益的平衡与交换'
    ],
    estimatedMinutes: 50
  },
  {
    id: 'peace-summit',
    name: '和平峰会',
    description: '冲突各方为实现停火而进行的高层对话',
    participantIds: ['ukraine', 'russia', 'us'],
    type: 'trilateral',
    recommendedDifficulty: 'advanced',
    learningPoints: [
      '处理冲突后和平谈判的敏感话题',
      '掌握停火与人道主义问题的平衡',
      '学习安全保障机制的谈判'
    ],
    estimatedMinutes: 55
  }
];

// ==================== 沧-萃-碇三国谈判场景 ====================
// 基于文档分析重建的场景
export const energyCrisisScenario: SimulationScenario = {
  overview: {
    id: 'energy-crisis-trilateral',
    name: '能源危机三边谈判',
    type: 'trilateral',
    era: 'fictional',
    description: '因环境污染引发的跨境争端，涉及能源转型合作。三国代表齐聚一堂，寻求解决方案。',
    recommendedDifficulty: 'intermediate',
    useCases: ['环境外交培训', '能源政策模拟', '三角外交演练'],
    learningObjectives: [
      '理解能源转型中的多方利益博弈',
      '掌握环境与经济发展的平衡策略',
      '学习在三国谈判中寻找共同利益',
      '练习跨国环境问题的外交处理'
    ],
    estimatedMinutes: 45,
    source: '外交培训案例库',
    createdAt: '2024-01-15'
  },

  countryBriefings: [
    {
      countryId: 'cang',
      country: getCountryById('china')!,
      publicInfo: {
        overview: '沧国位于S大陆东侧沿海，潮汐能和风能资源丰富，是世界上首先推动传统能源改革的一批国家。当前沧国的能源结构已经完成了优化，国内环境改善明显。',
        recentDevelopments: '沧国《能源学院学报》2024年指出，碇国传统能源出口量近年来不降反升，但国内资源储备出现预警，萃国作为大陆上第一大传统能源进口国对此表示担忧。'
      },
      historicalBackground: '沧国于20年前颁布了《国家科技发展计划》，政府拨款支持科学研究院和科技公司发展。当前已取得突破性成就，尤其是在能源技术领域。',
      publicStance: '愿意推动清洁能源合作，但需确保技术安全和合理回报',
      publicInterests: ['清洁能源技术出口', '地区影响力', '环境改善', '经济合作']
    },
    {
      countryId: 'cui',
      country: getCountryById('usa')!,
      publicInfo: {
        overview: '萃国是S大陆领土范围最广的大国，国内传统能源储备随着近年来国家人口的增多逐渐呈现出匮乏的趋势。国内绿党势力因其推行的环保政策理念而日益兴旺。',
        recentDevelopments: 'H党面对当前形势做出了能源改革的承诺；K党作为执政党支持率下降较为明显。绿党在议会中仅占有7%的席位，但在新一轮大选的民意调查中支持率略低于两大党。'
      },
      historicalBackground: '萃国在沧国推行科技研发计划后也试图效仿进行能源改革，但在议会中占据主导地位的两大政党K党和H党背后的企业利益集团均多数以传统工业为主，两党对能源改革态度模糊。',
      publicStance: '强烈要求解决环境污染问题，同时寻求能源安全保障',
      publicInterests: ['减少环境污染', '能源供应安全', '绿党支持率', '经济发展']
    },
    {
      countryId: 'ding',
      country: getCountryById('russia')!,
      publicInfo: {
        overview: '碇国北部毗邻萃国，西部多矿山，国内煤炭等传统能源的储量丰富，是S大陆的重要传统能源出口国。',
        recentDevelopments: '受到风向影响，每到夏季，碇国工业加工排放的废气和污染会飘散至萃国境内。碇、萃两国已就产业搬迁计划进行过交涉，但收效甚微。'
      },
      historicalBackground: '碇国的矿产原料加工和运输工业园区多集中在国家北部。虽然已同意产业搬迁计划，但设备老化问题导致污染问题仍然存在。',
      publicStance: '愿意改善环境问题，但需确保经济利益不受过大冲击',
      publicInterests: ['传统能源出口', '经济稳定', '就业保障', '国际形象']
    }
  ],

  background: {
    overview: '在上个月，碇国的污染废气由于设备老化而大量排放到萃国境内，南部省的绿党支持者义愤填膺，在两国边境进行了大规模的游行示威。冲突中一名示威者投掷自制燃烧弹，造成人员伤亡。碇国外交部对此表示严正抗议，但萃国绿党党魁在社交媒体上公然指责碇国排放毒气、意图入侵萃国，并扬言要在国际法院指控碇国。\n\n最终，三国经过商议，于沧国首都T市展开谈判，三国均以外交部部长和两名国内环境部官员组成了谈判代表团，以解决当前面临的问题。',
    timeline: [
      { time: '20年前', event: '沧国颁布《国家科技发展计划》', significance: 'major' },
      { time: '近年', event: '萃国两大政党因传统能源利益集团影响，能源改革受阻', significance: 'major' },
      { time: '近期', event: '萃国南部各省出现环保游行示威', significance: 'minor' },
      { time: '一个月前', event: '碇国污染废气大量排放，引发边境冲突', significance: 'major' },
      { time: '两周前', event: '萃国绿党党魁发表激烈言论', significance: 'minor' },
      { time: '上周', event: '三国同意在T市举行谈判', significance: 'major' }
    ],
    involvedCountries: ['cang', 'cui', 'ding'],
    keyData: [
      { label: '萃国绿党议会席位', value: '7%' },
      { label: '民意调查中绿党支持率', value: '略低于K/H党' },
      { label: '沧国能源技术', value: '最先进的清洁能源转化技术' },
      { label: '碇国能源出口', value: '近年不降反升，但储备预警' }
    ]
  },

  publicIssues: [
    {
      id: 'border-incident',
      title: '边境骚乱解决',
      description: '如何处理边境冲突中的人员伤亡和后续安抚',
      status: 'discussing',
      relatedParties: ['cui', 'ding']
    },
    {
      id: 'clean-energy-cooperation',
      title: '清洁能源合作',
      description: '三国在清洁能源技术研发和应用方面的合作可能',
      status: 'pending',
      relatedParties: ['cang', 'cui', 'ding']
    },
    {
      id: 'environmental-compensation',
      title: '环境污染赔偿',
      description: '碇国对萃国环境污染的赔偿问题',
      status: 'pending',
      relatedParties: ['cui', 'ding']
    }
  ],

  secretBriefings: {
    'cang': {
      countryId: 'cang',
      hiddenAgenda: {
        summary: '除解决环境和能源问题外，沧国还有地缘政治考量，这与萃国首屈一指的军事实力密不可分',
        details: [
          '沧国当前已开启与碇国签署《能源技术共同研发计划》的相关谈判',
          '沧国希望通过此次谈判扩大在地区事务中的影响力',
          '沧国警惕萃国与碇国的能源合作可能带来的地缘政治变化'
        ]
      },
      idealSolution: {
        summary: '三国签署全面能源合作协议，沧国提供技术换取经济和政治利益',
        conditions: [
          '技术转让获得合理经济回报',
          '在地区事务中获得更大话语权',
          '能源合作不损害与其他国家的关系'
        ],
        acceptableVariations: [
          '可以先签署双边合作，第三方观望',
          '可以提供部分技术支持换取其他利益'
        ]
      },
      bottomLine: {
        summary: '必须确保能源技术合作获得实质利益',
        conditions: [
          '不能无偿提供核心技术',
          '不能在谈判中被边缘化',
          '不能让萃国获得技术后单方面与碇国合作'
        ],
        unacceptableOutcomes: [
          '纯赔偿性质的协议',
          '被排斥在解决方案之外',
          '技术合作无实质回报'
        ]
      },
      negotiableItems: [
        { item: '清洁能源技术', value: '核心资产', flexibility: 'low', exchangeFor: '经济回报和政治影响力' },
        { item: 'T市谈判平台', value: '外交资本', flexibility: 'medium', exchangeFor: '协议中的主导地位' },
        { item: '中立调解角色', value: '外交形象', flexibility: 'high', exchangeFor: '各方信任' }
      ],
      leverage: [
        { description: '最先进的清洁能源技术', strength: 'strong', useConditions: '用于换取经济利益和政治影响力' },
        { description: 'T市作为中立谈判地点', strength: 'medium', useConditions: '展现调停者角色' },
        { description: '与碇国的初步合作意向', strength: 'medium', useConditions: '对萃国形成竞争压力' }
      ],
      hiddenTruth: [
        {
          description: '沧国已与碇国有私下合作接触',
          riskIfRevealed: '可能被萃国视为偏袒碇国',
          howToConceal: '不在公开场合提及，私下协调时保持模糊'
        }
      ],
      vulnerabilities: [
        { description: '沧国在地区安全问题上仍需考虑萃国立场', riskLevel: 'medium' },
        { description: '能源技术出口可能引发技术泄露风险', riskLevel: 'medium' }
      ],
      strategyHints: [
        {
          whenToUse: '当萃国和碇国陷入僵局时',
          approach: '以调停者身份提出折中方案',
          expectedReaction: '双方可能都会感谢沧国的善意'
        },
        {
          whenToUse: '当技术转让问题被提出时',
          approach: '强调互惠互利，但不做单方面让步',
          expectedReaction: '可能被要求做出更多承诺'
        }
      ]
    },
    'cui': {
      countryId: 'cui',
      hiddenAgenda: {
        summary: '萃国国内政治复杂，总统面临绿党崛起和即将到来的大选压力',
        details: [
          'K党（执政党）支持率下降明显',
          'H党承诺能源改革并拉回部分选票',
          '绿党支持率不断上升，有超越两大党的趋势',
          '南部各省选民对环境污染和能源价格上涨强烈不满'
        ]
      },
      idealSolution: {
        summary: '获得沧国的清洁能源技术合作，同时让碇国承担环境污染责任',
        conditions: [
          '碇国必须承认污染问题并承担责任',
          '获得沧国能源技术的优先合作权',
          '协议能够向选民展示政府解决问题的能力'
        ],
        acceptableVariations: [
          '碇国赔偿可以是分期或附带条件的',
          '能源技术合作可以分阶段实施'
        ]
      },
      bottomLine: {
        summary: '必须解决环境污染问题以稳定国内局势',
        conditions: [
          '碇国必须做出实质性改善承诺',
          '不能被国内舆论视为对碇国软弱',
          '不能因谈判失败导致绿党势力进一步扩大'
        ],
        unacceptableOutcomes: [
          '碇国不承认责任的协议',
          '被沧国技术合作排斥在外',
          '谈判无实质成果'
        ]
      },
      negotiableItems: [
        { item: '环境污染赔偿金额', value: '国内舆论压力', flexibility: 'medium', exchangeFor: '其他方面的让步' },
        { item: '能源改革时间表', value: '经济发展', flexibility: 'medium', exchangeFor: '国际支持和投资' },
        { item: '与沧国合作的具体形式', value: '技术获取', flexibility: 'high', exchangeFor: '经济利益' }
      ],
      leverage: [
        { description: '国内绿党的政治压力', strength: 'strong', useConditions: '作为推动谈判的内部动力' },
        { description: '萃国市场的吸引力', strength: 'medium', useConditions: '吸引沧国和碇国合作' },
        { description: '军事实力带来的地区影响力', strength: 'strong', useConditions: '对碇国形成威慑' }
      ],
      hiddenTruth: [
        {
          description: '边境冲突中示威者投掷燃烧弹的细节可能被利用',
          riskIfRevealed: '可能导致萃国在道义上处于被动',
          howToConceal: '强调碇国污染是根本原因，转移对燃烧弹事件的关注'
        }
      ],
      vulnerabilities: [
        { description: '即将到来的大选使政府不能示弱', riskLevel: 'high' },
        { description: '两大政党背后利益集团的牵制', riskLevel: 'high' },
        { description: '绿党的持续施压', riskLevel: 'medium' }
      ],
      strategyHints: [
        {
          whenToUse: '谈判初期需要展示强硬立场',
          approach: '强调环境污染的严重性和国际责任',
          expectedReaction: '碇国可能感到压力'
        },
        {
          whenToUse: '当碇国态度软化时',
          approach: '适时提出具体合作方案',
          expectedReaction: '可能获得更有利的结果'
        }
      ]
    },
    'ding': {
      countryId: 'ding',
      hiddenAgenda: {
        summary: '碇国传统能源出口面临资源枯竭风险，需要寻找新的发展方向',
        details: [
          '碇国传统能源出口量近年来不降反升，但国内资源储备出现预警',
          '产业搬迁和设备更新需要大量投资',
          '碇国希望通过能源转型维持经济稳定'
        ]
      },
      idealSolution: {
        summary: '获得沧国的能源技术合作，同时将污染责任降至最低',
        conditions: [
          '不承认对萃国污染承担全部责任',
          '获得能源转型技术和资金支持',
          '保持传统能源出口的既有利益'
        ],
        acceptableVariations: [
          '承认污染问题但强调客观原因',
          '赔偿可以与能源合作挂钩',
          '可以接受分期赔偿'
        ]
      },
      bottomLine: {
        summary: '必须避免承担全部责任，同时获得能源转型支持',
        conditions: [
          '不能被描述为"污染制造者"',
          '不能失去传统能源出口市场',
          '必须获得能源转型帮助'
        ],
        unacceptableOutcomes: [
          '被迫承担全部赔偿责任',
          '被完全排斥在能源合作之外',
          '国际形象严重受损'
        ]
      },
      negotiableItems: [
        { item: '污染赔偿', value: '国家财政', flexibility: 'medium', exchangeFor: '能源技术合作' },
        { item: '产业搬迁进度', value: '经济发展', flexibility: 'medium', exchangeFor: '资金支持' },
        { item: '能源出口承诺', value: '经济利益', flexibility: 'low', exchangeFor: '长期合作保障' }
      ],
      leverage: [
        { description: 'S大陆重要传统能源出口国地位', strength: 'strong', useConditions: '对依赖能源进口的国家形成影响' },
        { description: '碇国与沧国的初步合作意向', strength: 'medium', useConditions: '对萃国形成竞争压力' },
        { description: '地理位置的战略意义', strength: 'medium', useConditions: '地区事务中的话语权' }
      ],
      hiddenTruth: [
        {
          description: '设备老化问题本可避免，因管理层决策失误',
          riskIfRevealed: '可能被追究更多责任',
          howToConceal: '强调设备老化是普遍问题，归因于客观因素'
        }
      ],
      vulnerabilities: [
        { description: '能源储备预警暴露转型紧迫性', riskLevel: 'high' },
        { description: '经济结构单一，高度依赖能源出口', riskLevel: 'high' },
        { description: '国际形象受污染事件影响', riskLevel: 'medium' }
      ],
      strategyHints: [
        {
          whenToUse: '面对萃国强硬立场时',
          approach: '承认问题存在但强调客观原因，争取同情',
          expectedReaction: '可能被要求更多让步'
        },
        {
          whenToUse: '当沧国提出能源合作框架时',
          approach: '积极参与，争取最大利益',
          expectedReaction: '可能同时改善与沧国和萃国的关系'
        }
      ]
    }
  },

  initialRelations: [
    { from: 'cang', to: 'cui', attitude: 30, reason: '沧国对萃国军事实力有所忌惮，同时看到合作潜力' },
    { from: 'cang', to: 'ding', attitude: 50, reason: '已有能源技术合作意向，但关系尚浅' },
    { from: 'cui', to: 'ding', attitude: -60, reason: '环境污染引发冲突，边境冲突加剧对立' },
    { from: 'ding', to: 'cang', attitude: 40, reason: '希望获得沧国能源技术支持' },
    { from: 'ding', to: 'cui', attitude: -50, reason: '萃国绿党的指责和边境冲突导致关系紧张' },
    { from: 'cui', to: 'cang', attitude: 40, reason: '希望获得沧国的清洁能源技术' }
  ],

  metadata: {
    version: '1.0',
    lastUpdated: '2024-01-15',
    author: '外交培训部',
    tags: ['能源', '环境', '三国', '培训', '中等难度']
  }
};

// ==================== 获取预设场景 ====================
export function getPresetScenario(id: string): SimulationScenario | null {
  if (id === 'energy-crisis-trilateral') {
    return energyCrisisScenario;
  }
  // 可以扩展更多预设场景
  return null;
}

// ==================== 获取所有预设场景概览 ====================
export function getAllPresetScenarios(): ScenarioOverview[] {
  return presetScenarios.map(s => ({
    id: s.id,
    name: s.name,
    type: s.type,
    era: 'fictional' as const,
    description: s.description,
    recommendedDifficulty: s.recommendedDifficulty,
    useCases: [],
    learningObjectives: s.learningPoints,
    estimatedMinutes: s.estimatedMinutes
  }));
}

// ==================== 获取场景参与国家 ====================
export function getScenarioParticipants(scenarioId: string): string[] {
  const scenario = presetScenarios.find(s => s.id === scenarioId);
  return scenario?.participantIds || [];
}

// ==================== 获取用户在场景中的信息 ====================
export function getUserScenarioInfo(scenario: SimulationScenario, userCountryId: string) {
  return {
    briefing: scenario.countryBriefings.find(b => b.countryId === userCountryId),
    secret: scenario.secretBriefings[userCountryId],
    publicRelations: scenario.initialRelations.filter(r => 
      r.from === userCountryId || r.to === userCountryId
    )
  };
}
