// 历史时期配置 - 定义不同时期的外交特点
import { EraConfig, EraSpecificDiplomacy, HistoricalEra } from '@/types/negotiation';

export const ERA_CONFIGS: EraConfig[] = [
  {
    id: 'cold-war-early',
    name: '冷战初期',
    shortName: '1947-1962',
    description: '东西方阵营对立最尖锐的时期，外交风格强硬直接',
    yearRange: '1947-1962',
    characteristics: [
      '意识形态对立严重',
      '外交语言充满对抗性',
      '联盟体系分明',
      '核威慑影响谈判心理'
    ],
    typicalLanguageStyle: '对抗性、意识形态化、阵营化',
    aggressionModifier: 15,
    formalityModifier: 10,
    flexibilityModifier: -10
  },
  {
    id: 'cold-war-detente',
    name: '冷战缓和',
    shortName: '1962-1979',
    description: '美苏关系有所缓和，谈判中出现务实主义倾向',
    yearRange: '1962-1979',
    characteristics: [
      '首脑外交频繁',
      '军备控制谈判兴起',
      '第三世界国家活跃',
      '经济相互依存增加'
    ],
    typicalLanguageStyle: '务实、谨慎、寻求共识',
    aggressionModifier: 5,
    formalityModifier: 5,
    flexibilityModifier: 10
  },
  {
    id: 'cold-war-late',
    name: '冷战后期',
    shortName: '1979-1991',
    description: '苏联衰退、改革开放、中美关系突破',
    yearRange: '1979-1991',
    characteristics: [
      '苏联解体前期的动荡',
      '中国改革开放转型',
      '裁军谈判加速',
      '地区冲突频繁'
    ],
    typicalLanguageStyle: '转型期、试探性、灵活性增强',
    aggressionModifier: 0,
    formalityModifier: 0,
    flexibilityModifier: 15
  },
  {
    id: 'post-cold-war',
    name: '后冷战时期',
    shortName: '1991-2008',
    description: '单极世界形成，全球化加速，外交风格更加多元',
    yearRange: '1991-2008',
    characteristics: [
      '美国单极主导',
      '全球化深入发展',
      '多边主义兴起',
      '非传统安全议题增加'
    ],
    typicalLanguageStyle: '规则导向、多边协商、利益交换',
    aggressionModifier: -5,
    formalityModifier: -5,
    flexibilityModifier: 10
  },
  {
    id: 'post-2008',
    name: '后金融危机',
    shortName: '2008-2016',
    description: '金融危机重塑格局，新兴大国崛起，保守主义抬头',
    yearRange: '2008-2016',
    characteristics: [
      '西方经济受挫',
      '金砖国家崛起',
      '保护主义兴起',
      '地缘竞争加剧'
    ],
    typicalLanguageStyle: '谨慎、实用主义、警惕性增强',
    aggressionModifier: 5,
    formalityModifier: 0,
    flexibilityModifier: -5
  },
  {
    id: 'modern',
    name: '当代',
    shortName: '2016至今',
    description: '大国竞争加剧，多极化趋势明显，外交风格复杂多元',
    yearRange: '2016-现在',
    characteristics: [
      '中美战略竞争',
      '区域联盟重组',
      '技术脱钩风险',
      '气候与疫情等全球议题'
    ],
    typicalLanguageStyle: '竞争与合作并存、话语权争夺激烈',
    aggressionModifier: 5,
    formalityModifier: 0,
    flexibilityModifier: 0
  },
  {
    id: 'future',
    name: '未来时代',
    shortName: '2050及以后',
    description: '太空殖民、AI治理、气候变化重塑世界格局',
    yearRange: '2050-2100',
    characteristics: [
      '多行星文明',
      '强人工智能辅助决策',
      '全球气候剧烈变化',
      '资源冲突与太空开发竞速'
    ],
    typicalLanguageStyle: '科技化、多文明、长远主义',
    aggressionModifier: 2,
    formalityModifier: 4,
    flexibilityModifier: 5,
  }
];

// 获取默认时期配置
export function getEraConfig(era: HistoricalEra): EraConfig {
  return ERA_CONFIGS.find(e => e.id === era) || ERA_CONFIGS[ERA_CONFIGS.length - 1];
}

// 国家在特定时期的外交档案 - 精简版示例
export const ERA_SPECIFIC_DIPLOMACY: Record<string, EraSpecificDiplomacy[]> = {
  // 中国
  'china': [
    {
      era: 'cold-war-early',
      diplomaticStyle: {
        primary: '革命外交',
        secondary: '阵营对抗',
        approach: '意识形态优先，坚定立场',
        communication: '措辞激烈，强调社会主义阵营团结'
      },
      personalityModifier: { aggression: 7, flexibility: 3, patience: 6, formality: 8 },
      typicalStrategies: ['强调意识形态团结', '批评西方帝国主义', '争取第三世界支持'],
      vulnerabilities: ['对苏联依赖', '经济基础薄弱', '国际承认有限'],
      languageStyle: { formality: 'formal', directness: 'high', emotionInvolvement: 'high' },
      keyPhrases: ['帝国主义', '社会主义', '人民革命', '被压迫民族', '反帝斗争'],
      negotiationTraits: {
        pressureTactics: ['舆论宣传', '意识形态批判', '动员国际支持'],
        concessions: ['经济援助交换', '政治支持换取'],
        redLines: ['主权问题', '意识形态底线', '社会主义制度']
      }
    },
    {
      era: 'cold-war-detente',
      diplomaticStyle: {
        primary: '独立自主',
        secondary: '三个世界理论',
        approach: '不结盟但有倾向',
        communication: '平衡、策略性话语'
      },
      personalityModifier: { aggression: 5, flexibility: 5, patience: 7, formality: 7 },
      typicalStrategies: ['利用大国矛盾', '发展中国家代言', '和平共处五项原则'],
      vulnerabilities: ['苏联威胁', '台海问题', '经济困难'],
      languageStyle: { formality: 'formal', directness: 'medium', emotionInvolvement: 'medium' },
      keyPhrases: ['和平共处', '三个世界', '不结盟', '主权平等', '互利共赢'],
      negotiationTraits: {
        pressureTactics: ['展示不结盟立场', '援外工程', '技术合作'],
        concessions: ['经济让利', '技术转让'],
        redLines: ['台湾问题', '主权独立', '社会主义道路']
      }
    },
    {
      era: 'cold-war-late',
      diplomaticStyle: {
        primary: '改革开放外交',
        secondary: '韬光养晦',
        approach: '务实低调，融入国际体系',
        communication: '温和理性，强调发展'
      },
      personalityModifier: { aggression: 4, flexibility: 7, patience: 8, formality: 6 },
      typicalStrategies: ['经济优先', '不当头', '闷声发大财'],
      vulnerabilities: ['西方制裁压力', '技术落后', '国际经验不足'],
      languageStyle: { formality: 'semi-formal', directness: 'medium', emotionInvolvement: 'low' },
      keyPhrases: ['改革开放', '和平发展', '经济建设', '现代化', '和平统一'],
      negotiationTraits: {
        pressureTactics: ['经济吸引力', '市场诱惑', '耐心等待'],
        concessions: ['经济合作', '技术引进需求'],
        redLines: ['核心利益', '社会稳定', '发展方向']
      }
    },
    {
      era: 'post-cold-war',
      diplomaticStyle: {
        primary: '负责任大国',
        secondary: '和平崛起',
        approach: '积极参与多边机制',
        communication: '合作共赢话语'
      },
      personalityModifier: { aggression: 5, flexibility: 6, patience: 7, formality: 6 },
      typicalStrategies: ['加入WTO', 'APEC主导', '一带一路构想', '和谐世界'],
      vulnerabilities: ['周边领土争议', '意识形态差异', '能源依赖'],
      languageStyle: { formality: 'formal', directness: 'medium', emotionInvolvement: 'medium' },
      keyPhrases: ['和平崛起', '和谐世界', '合作共赢', '负责任大国', '新型大国关系'],
      negotiationTraits: {
        pressureTactics: ['经济实力展示', '基础设施建设', '贸易投资'],
        concessions: ['市场开放', '技术合作', '援助支持'],
        redLines: ['核心利益', '发展道路', '政治制度']
      }
    },
    {
      era: 'post-2008',
      diplomaticStyle: {
        primary: '积极进取',
        secondary: '大国协调',
        approach: '主动塑造国际议程',
        communication: '中国特色大国外交'
      },
      personalityModifier: { aggression: 6, flexibility: 5, patience: 6, formality: 6 },
      typicalStrategies: ['构建人类命运共同体', '新型国际关系', '全球治理参与'],
      vulnerabilities: ['战略互疑', '海上争端', '贸易摩擦'],
      languageStyle: { formality: 'formal', directness: 'medium', emotionInvolvement: 'medium' },
      keyPhrases: ['人类命运共同体', '新型国际关系', '一带一路', '文明互鉴', '合作共赢'],
      negotiationTraits: {
        pressureTactics: ['综合国力支撑', '市场准入', '基础设施合作'],
        concessions: ['扩大进口', '知识产权保护', '市场准入'],
        redLines: ['核心利益', '核心关切', '发展权']
      }
    },
    {
      era: 'modern',
      diplomaticStyle: {
        primary: '民族复兴外交',
        secondary: '竞争性共处',
        approach: '捍卫核心利益，积极参与全球治理',
        communication: '自信、理性、有原则'
      },
      personalityModifier: { aggression: 6, flexibility: 5, patience: 6, formality: 7 },
      typicalStrategies: ['底线思维', '极限思维', '双循环', '科技自立自强'],
      vulnerabilities: ['技术封锁', '供应链安全', '外部环境变化'],
      languageStyle: { formality: 'formal', directness: 'high', emotionInvolvement: 'medium' },
      keyPhrases: ['中华民族伟大复兴', '中国式现代化', '全人类共同价值', '高水平开放', '高质量发展'],
      negotiationTraits: {
        pressureTactics: ['反制措施', '市场优势', '产业链完整'],
        concessions: ['结构性改革', '制度性开放'],
        redLines: ['国家统一', '主权安全', '发展权', '政治制度']
      }
    }
  ],

  // 苏联
  'ussr': [
    {
      era: 'cold-war-early',
      diplomaticStyle: {
        primary: '革命输出',
        secondary: '阵营领袖',
        approach: '意识形态攻势，阵营对抗',
        communication: '意识形态化语言，强调阶级斗争'
      },
      personalityModifier: { aggression: 8, flexibility: 2, patience: 7, formality: 9 },
      typicalStrategies: ['革命输出', '阵营整合', '军事威慑'],
      vulnerabilities: ['内部不稳', '经济困难', '卫星国离心'],
      languageStyle: { formality: 'formal', directness: 'high', emotionInvolvement: 'high' },
      keyPhrases: ['资本主义', '阶级斗争', '被压迫人民', '帝国主义', '社会主义优越性'],
      negotiationTraits: {
        pressureTactics: ['军事威胁', '经济制裁威胁', '意识形态攻势'],
        concessions: ['势力范围承认', '意识形态让步'],
        redLines: ['社会主义制度', '势力范围', '核地位']
      }
    },
    {
      era: 'cold-war-detente',
      diplomaticStyle: {
        primary: '缓和战略',
        secondary: '军控谈判',
        approach: '务实接触，寻求缓和',
        communication: '相对温和，寻求共识'
      },
      personalityModifier: { aggression: 6, flexibility: 6, patience: 7, formality: 8 },
      typicalStrategies: ['军备控制', '首脑外交', '势力范围维护'],
      vulnerabilities: ['经济停滞', '军备竞赛负担', '西方渗透担忧'],
      languageStyle: { formality: 'formal', directness: 'medium', emotionInvolvement: 'medium' },
      keyPhrases: ['和平共处', '缓和', '裁军', '战略平衡', '集体安全'],
      negotiationTraits: {
        pressureTactics: ['军备竞赛威胁', '地区冲突介入', '能源武器'],
        concessions: ['军控协议', '局部缓和'],
        redLines: ['超级大国地位', '势力范围', '核垄断']
      }
    },
    {
      era: 'cold-war-late',
      diplomaticStyle: {
        primary: '新思维外交',
        secondary: '收缩防线',
        approach: '战略收缩，寻求和解',
        communication: '反思性语言，承认共同安全'
      },
      personalityModifier: { aggression: 4, flexibility: 8, patience: 5, formality: 6 },
      typicalStrategies: ['战略收缩', '双边谈判', '单边裁军'],
      vulnerabilities: ['内部动荡', '加盟共和国离心', '经济崩溃'],
      languageStyle: { formality: 'semi-formal', directness: 'medium', emotionInvolvement: 'low' },
      keyPhrases: ['新思维', '共同安全', '欧洲大厦', '全人类利益'],
      negotiationTraits: {
        pressureTactics: ['急剧让步', '寻求共识', '展示灵活性'],
        concessions: ['东欧放弃', '单边裁军', '德国统一让步'],
        redLines: ['核地位', '联盟解体底线']
      }
    }
  ],

  // 俄罗斯
  'russia': [
    {
      era: 'post-cold-war',
      diplomaticStyle: {
        primary: '西化融合',
        secondary: '融入西方',
        approach: '寻求加入西方俱乐部',
        communication: '合作性语言，尊重国际规则'
      },
      personalityModifier: { aggression: 3, flexibility: 7, patience: 6, formality: 5 },
      typicalStrategies: ['融入西方', 'G8参与', '北约伙伴关系'],
      vulnerabilities: ['经济依赖', '西方挤压', '车臣问题'],
      languageStyle: { formality: 'semi-formal', directness: 'medium', emotionInvolvement: 'low' },
      keyPhrases: ['民主价值', '战略伙伴', '融入欧洲', '文明国家'],
      negotiationTraits: {
        pressureTactics: ['能源外交', '传统影响区维护'],
        concessions: ['合作诚意', '民主改革'],
        redLines: ['车臣', '传统势力范围']
      }
    },
    {
      era: 'post-2008',
      diplomaticStyle: {
        primary: '恢复大国地位',
        secondary: '务实强势',
        approach: '维护核心利益，展示实力',
        communication: '自信、直接、维护利益'
      },
      personalityModifier: { aggression: 6, flexibility: 5, patience: 5, formality: 6 },
      typicalStrategies: ['能源外交', '军事现代化', '地区影响力'],
      vulnerabilities: ['经济结构单一', '人口减少', '技术落后'],
      languageStyle: { formality: 'semi-formal', directness: 'high', emotionInvolvement: 'medium' },
      keyPhrases: ['大国地位', '核心利益', '势力范围', '多极世界', '现实主义'],
      negotiationTraits: {
        pressureTactics: ['能源武器', '军事展示', '地区冲突介入'],
        concessions: ['局部合作', '能源交易'],
        redLines: ['国家安全', '领土完整', '大国地位']
      }
    },
    {
      era: 'modern',
      diplomaticStyle: {
        primary: '强势复兴',
        secondary: '对抗西方',
        approach: '维护大国地位，反制西方',
        communication: '强硬、有原则、不妥协'
      },
      personalityModifier: { aggression: 7, flexibility: 4, patience: 6, formality: 7 },
      typicalStrategies: ['能源杠杆', '军事介入', '信息战', '金砖合作'],
      vulnerabilities: ['西方制裁', '经济依赖能源', '人口挑战'],
      languageStyle: { formality: 'formal', directness: 'high', emotionInvolvement: 'medium' },
      keyPhrases: ['主权民主', '周边优先', '去美元化', '文明多样性', '欧亚联盟'],
      negotiationTraits: {
        pressureTactics: ['反制裁', '能源杠杆', '军事行动', '网络能力'],
        concessions: ['有限合作', '技术合作', '能源贸易'],
        redLines: ['国家安全', '领土完整', '地缘政治空间', '制度模式']
      }
    }
  ],

  // 美国
  'usa': [
    {
      era: 'cold-war-early',
      diplomaticStyle: {
        primary: '遏制战略',
        secondary: '自由世界领袖',
        approach: '意识形态对抗，联盟围堵',
        communication: '自由民主话语，道德高地'
      },
      personalityModifier: { aggression: 7, flexibility: 4, patience: 6, formality: 8 },
      typicalStrategies: ['遏制苏联', '马歇尔计划', '北约建立'],
      vulnerabilities: ['欧亚大陆两端作战', '殖民地民族主义'],
      languageStyle: { formality: 'formal', directness: 'high', emotionInvolvement: 'medium' },
      keyPhrases: ['自由世界', '遏制共产主义', '民主人权', '西方联盟'],
      negotiationTraits: {
        pressureTactics: ['经济援助', '军事保护', '意识形态攻势'],
        concessions: ['盟友市场开放', '军事保护承诺'],
        redLines: ['资本主义制度', '西方联盟', '核优势']
      }
    },
    {
      era: 'cold-war-detente',
      diplomaticStyle: {
        primary: '务实缓和',
        secondary: '规则建构',
        approach: '实力地位基础上寻求稳定',
        communication: '务实主义，技术性语言'
      },
      personalityModifier: { aggression: 5, flexibility: 6, patience: 6, formality: 7 },
      typicalStrategies: ['三角战略', '军控谈判', '制度合作'],
      vulnerabilities: ['越战创伤', '国内孤立主义', '经济竞争力下降'],
      languageStyle: { formality: 'formal', directness: 'medium', emotionInvolvement: 'low' },
      keyPhrases: ['缓和', '战略稳定', '规则基础', '力量均衡'],
      negotiationTraits: {
        pressureTactics: ['实力展示', '联盟协调', '技术优势'],
        concessions: ['军控协议', '局部缓和'],
        redLines: ['盟友安全', '核优势', '制度主导']
      }
    },
    {
      era: 'post-cold-war',
      diplomaticStyle: {
        primary: '单极时刻',
        secondary: '新保守主义',
        approach: '塑造而非应对，主动出击',
        communication: '美国例外论，道德使命'
      },
      personalityModifier: { aggression: 7, flexibility: 4, patience: 4, formality: 6 },
      typicalStrategies: ['先发制人', '民主改造', '军事主导'],
      vulnerabilities: ['单边主义批评', '过度扩张', '新兴国家崛起'],
      languageStyle: { formality: 'semi-formal', directness: 'high', emotionInvolvement: 'medium' },
      keyPhrases: ['美国例外', '自由霸权', '先发制人', '民主和平', '邪恶轴心'],
      negotiationTraits: {
        pressureTactics: ['军事力量', '金融制裁', '价值观压力'],
        concessions: ['多边机制参与', '盟友协调'],
        redLines: ['超级大国地位', '以色列安全', '民主人权']
      }
    },
    {
      era: 'post-2008',
      diplomaticStyle: {
        primary: '亚太再平衡',
        secondary: '规则维护',
        approach: '多边参与，规则主导',
        communication: '自由秩序话语，盟友协调'
      },
      personalityModifier: { aggression: 5, flexibility: 6, patience: 5, formality: 6 },
      typicalStrategies: ['亚太再平衡', 'TPP', '重返亚太'],
      vulnerabilities: ['金融危机后果', '政治极化', '中东泥潭'],
      languageStyle: { formality: 'formal', directness: 'medium', emotionInvolvement: 'medium' },
      keyPhrases: ['自由秩序', '亚太再平衡', '规则基础', '盟友关系', '巧实力'],
      negotiationTraits: {
        pressureTactics: ['盟友体系', '贸易规则', '军事存在'],
        concessions: ['多边机制', '气候合作'],
        redLines: ['盟友安全', '核不扩散', '海上自由']
      }
    },
    {
      era: 'modern',
      diplomaticStyle: {
        primary: '大国竞争',
        secondary: '美国优先',
        approach: '对华竞争，联盟重组',
        communication: '直接、有时对抗，强调利益'
      },
      personalityModifier: { aggression: 7, flexibility: 4, patience: 4, formality: 6 },
      typicalStrategies: ['技术竞争', '印太战略', '脱钩', '联盟对抗'],
      vulnerabilities: ['政治极化', '基础设施落后', '盟友离心'],
      languageStyle: { formality: 'semi-formal', directness: 'high', emotionInvolvement: 'high' },
      keyPhrases: ['美国优先', '大国竞争', '印太战略', '脱钩', '民族主义'],
      negotiationTraits: {
        pressureTactics: ['技术限制', '制裁', '军事展示', '价值观联盟'],
        concessions: ['局部合作', '盟友让步'],
        redLines: ['科技领先', '军事优势', '美元霸权', '盟友体系']
      }
    }
  ]
};

// 获取国家在特定时期的外交档案
export function getEraDiplomacy(countryId: string, era: HistoricalEra): EraSpecificDiplomacy | null {
  const countryDiplomacy = ERA_SPECIFIC_DIPLOMACY[countryId];
  if (!countryDiplomacy) return null;
  return countryDiplomacy.find(d => d.era === era) || null;
}

// 获取国家在特定时期的谈判参数
export function getEraAdjustedPersonality(
  basePersonality: { aggression: number; flexibility: number; patience: number },
  era: HistoricalEra
): { aggression: number; flexibility: number; patience: number } {
  const eraConfig = getEraConfig(era);
  
  return {
    aggression: Math.min(10, Math.max(1, basePersonality.aggression + eraConfig.aggressionModifier / 10)),
    flexibility: Math.min(10, Math.max(1, basePersonality.flexibility + eraConfig.flexibilityModifier / 10)),
    patience: Math.min(10, Math.max(1, basePersonality.patience + eraConfig.formalityModifier / 10))
  };
}

// 检查国家是否有特定时期数据
export function hasEraData(countryId: string): boolean {
  return countryId in ERA_SPECIFIC_DIPLOMACY;
}
