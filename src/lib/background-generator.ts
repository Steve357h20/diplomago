// 背景故事生成系统
// 基于主题类型、参与国家和时期生成详细的外交谈判背景

import { CountryProfile } from '@/lib/countries';
import { HistoricalCountry } from '@/lib/historical-countries';
import { NegotiationTopic } from '@/types/negotiation';

// 重新导出类型以方便使用
export type Country = CountryProfile;

// 主题类型与历史事件的映射
export const topicHistoricalEvents: Record<string, string[]> = {
  'trade': [
    '关税战', '贸易协定', '供应链重构', '技术出口管制', '货币战争',
    '贸易逆差', '市场准入', '知识产权争议', '产业补贴', '非关税壁垒'
  ],
  'territory': [
    '领土争端', '海域划界', '边界冲突', '历史性权利', '主权声索',
    '资源开发权', '渔业权益', '军事存在', '航行自由', '争议地区'
  ],
  'peace': [
    '停火协议', '和平进程', '冲突后重建', '民族和解', '难民问题',
    '边界安全', '武装解除', '政治改革', '司法问责', '经济重建'
  ],
  'security': [
    '军备竞赛', '核扩散', '军事同盟', '安全承诺', '危机管控',
    '情报共享', '网络安全', '反恐合作', '导弹防御', '区域平衡'
  ],
  'environmental': [
    '气候变化', '减排承诺', '碳市场', '气候融资', '技术转让',
    '森林保护', '海洋治理', '生物多样性', '能源转型', '污染控制'
  ],
  'cultural': [
    '人文交流', '教育合作', '文化产业', '文化遗产', '媒体合作',
    '人员往来', '语言推广', '学术交流', '旅游合作', '体育外交'
  ]
};

// 时期特征
export const eraCharacteristics: Record<string, { period: string; context: string; keyFeatures: string[] }> = {
  'modern': {
    period: '21世纪当代',
    context: '全球化深度发展、大国竞争加剧、新兴经济体崛起、技术革命加速',
    keyFeatures: [
      '多极化趋势明显',
      '经济相互依存加深',
      '技术竞争成为核心',
      '气候变化成为焦点',
      '区域组织作用增强'
    ]
  },
  'cold-war': {
    period: '1945-1991年冷战时期',
    context: '美苏两极对峙、意识形态对抗、代理人战争、核威慑平衡',
    keyFeatures: [
      '两大阵营对立',
      '意识形态高于一切',
      '核战争威胁',
      '第三世界成为战场',
      '不结盟运动兴起'
    ]
  },
  'post-cold-war': {
    period: '1991-2008年后冷战时期',
    context: '单极时刻、美国主导、新兴市场崛起、恐怖主义威胁',
    keyFeatures: [
      '美国单极霸权',
      '全球化加速',
      '区域冲突持续',
      '金融危机频发',
      '新兴大国崛起'
    ]
  },
  'future': {
    period: '2030-2050年未来时期',
    context: 'AI革命、气候变化危机、太空开发、多极化新阶段',
    keyFeatures: [
      'AI全面渗透',
      '气候临界点临近',
      '太空资源竞争',
      '新安全挑战',
      '治理体系重构'
    ]
  }
};

// 国家间关系模板
interface CountryRelation {
  type: 'ally' | 'rival' | 'neutral' | 'complex';
  description: string;
  keyPoints: string[];
}

// 生成两国关系描述
export function generateBilateralRelation(
  country1: Country | HistoricalCountry,
  country2: Country | HistoricalCountry,
  era: string
): CountryRelation {
  const relations: CountryRelation[] = [];

  // 基于地理邻近性
  const isNeighborhood = areNeighboringRegions(country1.region, country2.region);
  
  // 基于历史关系（简化判断）
  const hasHistoricalTension = detectHistoricalTension(country1, country2);
  const hasAlliance = detectAlliance(country1, country2);
  
  if (hasAlliance) {
    relations.push({
      type: 'ally',
      description: `${country1.name}与${country2.name}是传统盟友`,
      keyPoints: ['军事合作密切', '经济往来频繁', '外交协调一致']
    });
  } else if (hasHistoricalTension) {
    relations.push({
      type: 'rival',
      description: `${country1.name}与${country2.name}存在结构性矛盾`,
      keyPoints: ['历史恩怨', '地缘竞争', '战略互疑']
    });
  } else if (isNeighborhood) {
    relations.push({
      type: 'complex',
      description: `${country1.name}与${country2.name}既是邻国又有合作需求`,
      keyPoints: ['经贸往来', '人员交流', '潜在竞争']
    });
  } else {
    relations.push({
      type: 'neutral',
      description: `${country1.name}与${country2.name}关系相对中立`,
      keyPoints: ['利益交汇有限', '合作与竞争并存', '关系可塑性强']
    });
  }
  
  return relations[0];
}

// 判断是否是邻国
function areNeighboringRegions(region1: string, region2: string): boolean {
  const neighborGroups = [
    ['East Asia', 'Southeast Asia', 'South Asia'],
    ['Europe', 'Eurasia'],
    ['North America', 'Central America'],
    ['South America'],
    ['Middle East', 'North Africa'],
    ['Sub-Saharan Africa'],
    ['Oceania']
  ];
  
  return neighborGroups.some(group => 
    group.includes(region1) && group.includes(region2)
  );
}

// 检测历史紧张关系
function detectHistoricalTension(
  country1: Country | HistoricalCountry,
  country2: Country | HistoricalCountry
): boolean {
  // 常见的紧张关系配对
  const tensionPairs = [
    ['usa', 'china'], ['usa', 'russia'], ['usa', 'iran'],
    ['china', 'japan'], ['china', 'india'], ['china', 'vietnam'],
    ['india', 'pakistan'], ['israel', 'iran'], ['turkey', 'greece'],
    ['russia', 'ukraine'], ['japan', 'southkorea']
  ];
  
  return tensionPairs.some(pair => 
    (pair[0] === country1.id && pair[1] === country2.id) ||
    (pair[1] === country1.id && pair[0] === country2.id)
  );
}

// 检测同盟关系
function detectAlliance(
  country1: Country | HistoricalCountry,
  country2: Country | HistoricalCountry
): boolean {
  // 常见的同盟关系
  const alliancePairs = [
    ['usa', 'uk'], ['usa', 'japan'], ['usa', 'southkorea'],
    ['usa', 'australia'], ['usa', 'philippines'],
    ['uk', 'australia'], ['uk', 'canada'],
    ['japan', 'southkorea'], // 虽非正式同盟但关系密切
    ['france', 'germany'],
    ['russia', 'china']
  ];
  
  return alliancePairs.some(pair => 
    (pair[0] === country1.id && pair[1] === country2.id) ||
    (pair[1] === country1.id && pair[0] === country2.id)
  );
}

// 生成谈判起因
export function generateNegotiationCause(
  topic: NegotiationTopic,
  countries: (Country | HistoricalCountry)[],
  era: string
): string {
  const topicCauses: Record<string, string[]> = {
    'trade': [
      '近期贸易摩擦加剧，双方都承受了经济损失',
      '国际经济形势变化，要求重新调整贸易关系',
      '新技术革命带来的贸易规则空白需要填补',
      '供应链重构压力推动双方寻求新的合作框架',
      '区域经济一体化进程要求双方协调立场'
    ],
    'territory': [
      '争议地区近期发生摩擦，引发国际关注',
      '资源开发利益驱动各方重新审视边界安排',
      '地区安全形势变化使得稳定边界更加紧迫',
      '国际法发展要求更新既有安排',
      '民族主义情绪上升导致立场趋于强硬'
    ],
    'peace': [
      '长期冲突造成的人道主义危机引发国际关注',
      '交战双方都出现疲态，国内压力增大',
      '国际调解方积极斡旋，创造谈判窗口',
      '地区格局变化使得和平成为可能',
      '经济重建需求为和解提供动力'
    ],
    'security': [
      '军备竞赛加剧导致双方都感到不安全',
      '地区安全事件引发对危机管控的需求',
      '新兴安全威胁要求新的合作机制',
      '盟友压力推动双方展开对话',
      '核不扩散形势紧迫需要协调立场'
    ],
    'environmental': [
      '极端天气事件造成重大损失，凸显行动紧迫性',
      '国际气候谈判取得进展，要求各国落实承诺',
      '环保技术发展为合作提供新机遇',
      '经济转型压力推动绿色发展议程',
      '公众环保意识提升形成政治压力'
    ],
    'cultural': [
      '民间交流需求增长推动官方框架更新',
      '人员往来增加带来管理协调需求',
      '文化产业合作潜力有待挖掘',
      '教育交流可促进相互理解',
      '文化遗产保护需要国际合作'
    ]
  };
  
  const causes = topicCauses[topic.category] || topicCauses['trade'];
  return causes[Math.floor(Math.random() * causes.length)];
}

// 生成国际关系分析
export function generateInternationalAnalysis(
  topic: NegotiationTopic,
  countries: (Country | HistoricalCountry)[],
  era: string
): string {
  const eraInfo = eraCharacteristics[era] || eraCharacteristics['modern'];
  
  const analyses = [
    `本次谈判发生在${eraInfo.period}的国际背景下。${eraInfo.context}。这一时期的国际格局对谈判各方都有深远影响。`,
    
    `当前国际形势处于深刻调整期。${eraInfo.keyFeatures.join('、')}等特征使得传统外交模式面临挑战，同时也为创新性解决方案提供了空间。`,
    
    `从国际关系的宏观视角看，本次谈判不仅关乎双边利益，也与更广义的地区和全球秩序密切相关。各方的立场都受到其国际环境的影响。`
  ];
  
  return analyses[Math.floor(Math.random() * analyses.length)];
}

// 生成完整背景故事（用于双边）
export function generateBilateralBackground(
  topic: NegotiationTopic,
  selfCountry: Country | HistoricalCountry,
  opponentCountry: Country | HistoricalCountry,
  era?: string
): string {
  const effectiveEra = era || topic.era || 'modern';
  const eraInfo = eraCharacteristics[effectiveEra] || eraCharacteristics['modern'];
  const relation = generateBilateralRelation(selfCountry, opponentCountry, effectiveEra);
  const cause = generateNegotiationCause(topic, [selfCountry, opponentCountry], effectiveEra);
  const analysis = generateInternationalAnalysis(topic, [selfCountry, opponentCountry], effectiveEra);
  
  const selfBg = 'historicalBackground' in selfCountry 
    ? (selfCountry as any).historicalBackground?.brief || (selfCountry as any).name 
    : (selfCountry as any).name || '两国都有悠久的历史';
  const opponentBg = 'historicalBackground' in opponentCountry 
    ? (opponentCountry as any).historicalBackground?.brief || (opponentCountry as any).name 
    : (opponentCountry as any).name || '各自有着独特的发展道路';
  
  const selfName = (selfCountry as any).name || '一方';
  const opponentName = (opponentCountry as any).name || '另一方';
  
  return `【历史脉络】
${selfName}与${opponentName}的关系源远流长。${selfBg}。${opponentBg}。

两国在${eraInfo.period}的国际背景下发展出复杂的关系。当前，${eraInfo.context}。

【两国关系现状】
${relation.description}。${relation.keyPoints.join('；')}。

【谈判起因】
${cause}。

【前情概述】
双方已就相关议题进行了多轮磋商，在一些领域达成初步共识，但在关键问题上仍存在分歧。本次正式谈判是双方寻求突破的重要尝试。

【各方关切】
${selfName}关注的核心利益在于...（根据具体情况分析）
${opponentName}的核心诉求是...（基于其国家特性分析）

${analysis}

【当前局势】
双方代表团已抵达谈判地点。首轮会谈将聚焦于${topic.keyIssues.slice(0, 3).join('、')}等议题。各方都有自己的谈判策略和隐藏议程。`;
}

// 生成完整背景故事（用于多边）
export function generateMultilateralBackground(
  topic: NegotiationTopic,
  countries: (Country | HistoricalCountry)[],
  era: string
): string {
  const eraInfo = eraCharacteristics[era] || eraCharacteristics['modern'];
  
  // 生成各方关系网络
  const relations: string[] = [];
  for (let i = 0; i < Math.min(countries.length, 4); i++) {
    for (let j = i + 1; j < Math.min(countries.length, 4); j++) {
      const c1 = countries[i] as any;
      const c2 = countries[j] as any;
      const rel = generateBilateralRelation(countries[i], countries[j], era);
      relations.push(`${c1.name || '一方'}与${c2.name || '另一方'}：${rel.description}`);
    }
  }
  
  const cause = generateNegotiationCause(topic, countries, era);
  const analysis = generateInternationalAnalysis(topic, countries, era);
  
  return `【历史脉络】
${eraInfo.period}的国际格局深刻影响着本次谈判。${eraInfo.context}。

本次多边谈判涉及${countries.length}个国家和地区，各方在历史、文化、利益诉求上存在显著差异。

【各方关系网络】
${relations.join('\n')}

【谈判背景】
${cause}。

【前情概述】
相关议题已经国际社会关注多年，各方立场经过多轮交锋逐渐清晰。本次多边会议是在特定国际形势下召开的重要机会窗口。

【国际环境】
${analysis}

【当前局势】
各方代表齐聚一堂。虽然存在分歧，但对话的大门始终敞开。如何在维护各自核心利益的同时达成共识，考验着各方的政治智慧。`;
}

// 根据主题类型推荐相关历史案例
export function getSimilarHistoricalCases(topicCategory: string): { 
  name: string; 
  year: string; 
  parties: string[];
  outcome: string;
  lessons: string[];
}[] {
  const cases: Record<string, { name: string; year: string; parties: string[]; outcome: string; lessons: string[] }[]> = {
    'trade': [
      {
        name: '美日广场协议',
        year: '1985',
        parties: ['美国', '日本', '联邦德国', '法国', '英国'],
        outcome: '日元大幅升值，但并未解决贸易失衡问题',
        lessons: ['汇率工具不能根本解决结构性问题', '被要求升值的国家面临巨大经济压力', '协议执行效果取决于各方配合']
      },
      {
        name: '乌拉圭回合',
        year: '1986-1994',
        parties: ['123个成员国'],
        outcome: '建立WTO，大幅降低全球关税',
        lessons: ['多边贸易谈判需要耐心和妥协', '发展中国家利益需要被照顾', '建立争端解决机制很重要']
      },
      {
        name: '中美第一阶段贸易协议',
        year: '2020',
        parties: ['中国', '美国'],
        outcome: '中国增加购买美国商品，美国部分加征关税保持不变',
        lessons: ['贸易协议需要考虑执行机制', '协议往往无法解决根本分歧', '双方都需要保留面子']
      }
    ],
    'territory': [
      {
        name: '中英香港问题谈判',
        year: '1982-1984',
        parties: ['中国', '英国'],
        outcome: '"一国两制"框架下香港回归',
        lessons: ['主权问题需要灵活方案', '充分考虑被殖民者的尊严', '过渡安排需要细致周全']
      },
      {
        name: '埃以和平协议',
        year: '1978-1979',
        parties: ['埃及', '以色列'],
        outcome: '以色列归还西奈半岛，埃及承认以色列',
        lessons: ['和平需要实际的利益交换', '第三方担保可以增加可信度', '需要处理国内政治压力']
      },
      {
        name: '国际法院北海大陆架案',
        year: '1969',
        parties: ['联邦德国', '丹麦', '荷兰'],
        outcome: '法院判决影响后来专属经济区制度',
        lessons: ['法律原则需要平衡各方利益', '国际法可以提供公正的解决方案', '判决执行依赖各方善意']
      }
    ],
    'peace': [
      {
        name: '戴维营协议',
        year: '1978',
        parties: ['美国', '埃及', '以色列'],
        outcome: '为埃以和平条约奠定基础',
        lessons: ['第三方调解的重要性', '分步骤达成协议', '需要保证后续执行机制']
      },
      {
        name: '北爱尔兰和平进程',
        year: '1998-2007',
        parties: ['英国', '爱尔兰', '北爱尔兰各派'],
        outcome: '权力分享协议实现，武装组织解除武装',
        lessons: ['和平需要内部各方参与', '经济和发展可以促进和平', '国际担保增加可信度']
      },
      {
        name: '波黑和平协议（代顿协议）',
        year: '1995',
        parties: ['波斯尼亚各派', '克罗地亚', '塞尔维亚', '美国', '欧盟'],
        outcome: '建立分权联邦，波黑恢复和平',
        lessons: ['军事形势决定谈判地位', '外部力量可以推动但不能替代内部和解', '复杂权力分享安排可以维持稳定']
      }
    ],
    'security': [
      {
        name: '古巴导弹危机',
        year: '1962',
        parties: ['美国', '苏联', '古巴'],
        outcome: '苏联撤回导弹，美国承诺不入侵古巴',
        lessons: ['核时代需要危机管控机制', '私下沟通比公开对抗更有效', '双方都需要台阶下']
      },
      {
        name: '中导条约',
        year: '1987',
        parties: ['美国', '苏联'],
        outcome: '消除全部中程导弹',
        lessons: ['对称削减更容易达成', '核查机制是条约执行的关键', '条约可以改善整体关系']
      },
      {
        name: '伊朗核协议（JCPOA）',
        year: '2015',
        parties: ['伊朗', 'P5+1（美国、英国、法国、德国、俄罗斯、中国）'],
        outcome: '伊朗限制核计划，换取制裁解除',
        lessons: ['技术核查是核心', '解除制裁需要可信执行', '国内政治可能破坏协议']
      }
    ],
    'environmental': [
      {
        name: '蒙特利尔议定书',
        year: '1987',
        parties: ['46个国家'],
        outcome: '成功淘汰臭氧层破坏物质',
        lessons: ['科学共识可以推动行动', '发展中国家的过渡期很重要', '替代技术可以减少阻力']
      },
      {
        name: '巴黎协定',
        year: '2015',
        parties: ['196个缔约方'],
        outcome: '各国自主贡献减排目标，应对气候变化',
        lessons: ['灵活机制可以广泛参与', '定期审查推动进展', '资金机制是发展中国家关切']
      },
      {
        name: '京都议定书',
        year: '1997',
        parties: ['55个工业化国家'],
        outcome: '建立碳排放权交易机制，但美国未批准',
        lessons: ['主要排放国参与至关重要', '市场机制可以降低成本', '强制机制比自愿更有效']
      }
    ],
    'cultural': [
      {
        name: '中美人文交流机制',
        year: '2010',
        parties: ['中国', '美国'],
        outcome: '建立高级别人文交流机制',
        lessons: ['人文交流需要制度化', '民间友好是外交基础', '人员往来可以缓解紧张']
      }
    ]
  };
  
  return cases[topicCategory] || cases['trade'];
}

// 生成策略建议
export function generateStrategyHints(
  topic: NegotiationTopic,
  selfCountry: Country | HistoricalCountry,
  opponentCountry: Country | HistoricalCountry,
  approach: 'cooperative' | 'competitive' | 'balanced'
): {
  title: string;
  description: string;
  tactics: string[];
  pitfalls: string[];
} {
  const hints: Record<string, {
    cooperative: { title: string; description: string; tactics: string[]; pitfalls: string[] };
    competitive: { title: string; description: string; tactics: string[]; pitfalls: string[] };
    balanced: { title: string; description: string; tactics: string[]; pitfalls: string[] };
  }> = {
    'trade': {
      cooperative: {
        title: '合作共赢策略',
        description: '强调共同利益，推动互利共赢的贸易安排',
        tactics: [
          '寻找利益交汇点',
          '提出渐进式开放方案',
          '强调长期合作价值',
          '提供技术转让和发展援助'
        ],
        pitfalls: [
          '过度让步可能损害本国产业',
          '容易被对方视为软弱',
          '需要警惕对方"搭便车"'
        ]
      },
      competitive: {
        title: '竞争博弈策略',
        description: '坚持核心利益，争取有利条款',
        tactics: [
          '明确底线和红线',
          '展示谈判决心',
          '利用筹码进行交换',
          '适时施压但避免破裂'
        ],
        pitfalls: [
          '过于强硬可能导致破裂',
          '可能损害长远关系',
          '需要准备替代方案'
        ]
      },
      balanced: {
        title: '务实平衡策略',
        description: '在核心利益上坚持，在次要问题上灵活',
        tactics: [
          '区分核心和次要利益',
          '提出"一揽子"方案',
          '设置条件和前提',
          '保持谈判渠道畅通'
        ],
        pitfalls: [
          '平衡不当可能两边不讨好',
          '需要准确判断对方底线',
          '执行难度较大'
        ]
      }
    },
    'territory': {
      cooperative: {
        title: '搁置争议、共同开发',
        description: '暂时搁置主权争议，专注于务实合作',
        tactics: [
          '提出功能性合作方案',
          '强调和平共处重要性',
          '建立危机管控机制',
          '寻求第三方调解'
        ],
        pitfalls: [
          '搁置可能变成永久搁置',
          '国内政治可能不支持',
          '需要维护主权声索'
        ]
      },
      competitive: {
        title: '法理立场策略',
        description: '坚持法理立场，争取有利方案',
        tactics: [
          '收集历史证据',
          '援引国际法原则',
          '争取国际社会支持',
          '做好长期斗争准备'
        ],
        pitfalls: [
          '法理优势不等于谈判优势',
          '可能激化民族情绪',
          '影响其他领域关系'
        ]
      },
      balanced: {
        title: '分议题处理策略',
        description: '区分不同议题，逐一解决或暂时搁置',
        tactics: [
          '识别容易达成共识的议题',
          '避免在敏感问题上对抗',
          '建立信任措施作为铺垫',
          '设置定期磋商机制'
        ],
        pitfalls: [
          '分割议题可能限制整体方案',
          '对方可能要求"一揽子"解决',
          '容易陷入技术性细节'
        ]
      }
    },
    'peace': {
      cooperative: {
        title: '和解共处策略',
        description: '强调民族和解与和平共存',
        tactics: [
          '承认历史伤痛',
          '推动民族和解',
          '强调共同未来',
          '寻求国际担保'
        ],
        pitfalls: [
          '国内强硬派可能反对',
          '需要平衡受害者感情',
          '执行机制难以保障'
        ]
      },
      competitive: {
        title: '安全优先策略',
        description: '确保国家安全利益不受损害',
        tactics: [
          '建立有效安全安排',
          '保持军事能力',
          '确保难民回归权',
          '建立监督机制'
        ],
        pitfalls: [
          '过度关注安全可能阻碍和解',
          '对方可能认为缺乏诚意',
          '军备竞赛风险'
        ]
      },
      balanced: {
        title: '分阶段和解策略',
        description: '通过分阶段安排逐步实现全面和平',
        tactics: [
          '先实现停火和稳定',
          '处理人道主义议题',
          '逐步建立互信',
          '最后解决政治问题'
        ],
        pitfalls: [
          '分阶段可能变成无限期',
          '每阶段都可能遇到障碍',
          '需要保持谈判动力'
        ]
      }
    },
    'security': {
      cooperative: {
        title: '建立信任措施策略',
        description: '通过增加透明度减少误判风险',
        tactics: [
          '提议信息共享',
          '邀请观察员',
          '建立沟通热线',
          '开展联合演习'
        ],
        pitfalls: [
          '信任需要时间建立',
          '可能被对方利用',
          '需要国内政治支持'
        ]
      },
      competitive: {
        title: '实力威慑策略',
        description: '通过展示实力维护安全利益',
        tactics: [
          '展示军事能力',
          '加强盟友合作',
          '保持战略威慑',
          '必要时展示决心'
        ],
        pitfalls: [
          '可能引发军备竞赛',
          '增加误判风险',
          '损害合作氛围'
        ]
      },
      balanced: {
        title: '务实安全合作策略',
        description: '在共同安全利益上合作，在分歧上管控',
        tactics: [
          '识别共同安全威胁',
          '选择性开展合作',
          '保持对话渠道',
          '建立危机管控机制'
        ],
        pitfalls: [
          '合作与竞争需要平衡',
          '可能被认为是软弱',
          '需要准确判断对方意图'
        ]
      }
    },
    'environmental': {
      cooperative: {
        title: '绿色伙伴关系策略',
        description: '推动绿色合作，共同应对挑战',
        tactics: [
          '提出联合示范项目',
          '分享绿色技术',
          '建立融资机制',
          '开展能力建设合作'
        ],
        pitfalls: [
          '技术转让涉及利益',
          '需要资金支持',
          '各方发展阶段不同'
        ]
      },
      competitive: {
        title: '责任分担策略',
        description: '坚持公平的责任分担原则',
        tactics: [
          '强调历史责任',
          '要求技术转让',
          '争取气候融资',
          '拒绝不平等安排'
        ],
        pitfalls: [
          '可能被认为推卸责任',
          '影响国际形象',
          '阻碍实际合作'
        ]
      },
      balanced: {
        title: '务实减排策略',
        description: '在发展与环保之间寻求平衡',
        tactics: [
          '提出务实的减排目标',
          '争取适应资金支持',
          '推动技术合作',
          '参与国际机制'
        ],
        pitfalls: [
          '减排承诺执行压力大',
          '国内发展需求强烈',
          '国际期望可能过高'
        ]
      }
    },
    'cultural': {
      cooperative: {
        title: '扩大交流策略',
        description: '大幅扩展人文交流，增进相互理解',
        tactics: [
          '简化签证手续',
          '扩大教育合作',
          '促进文化产业交流',
          '开展青年交流项目'
        ],
        pitfalls: [
          '文化交流可能被政治化',
          '效果难以短期显现',
          '需要持续投入'
        ]
      },
      competitive: {
        title: '价值引领策略',
        description: '强调自身文化价值和影响力',
        tactics: [
          '推广本国文化',
          '支持海外语言教学',
          '开展国际文化活动',
          '维护文化安全'
        ],
        pitfalls: [
          '可能被认为文化输出',
          '引发对方警惕',
          '文化影响力难以强制'
        ]
      },
      balanced: {
        title: '互利合作策略',
        description: '在文化交流中寻求互利共赢',
        tactics: [
          '尊重对方文化',
          '寻求共同兴趣点',
          '建立长期合作机制',
          '保持适度平衡'
        ],
        pitfalls: [
          '平衡双方投入不容易',
          '文化差异带来挑战',
          '需要耐心和包容'
        ]
      }
    }
  };
  
  const categoryHints = hints[topic.category] || hints['trade'];
  return categoryHints[approach];
}
