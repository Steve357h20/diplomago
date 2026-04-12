// 真实外交谈判案例数据库
export interface DiplomaticCase {
  id: string;
  name: string;
  year: number;
  parties: {
    self: {
      name: string;
      country: string;
      flag: string;
    };
    opponent: {
      name: string;
      country: string;
      flag: string;
    };
  };
  topic: string;
  category: 'trade' | 'territory' | 'peace' | 'security' | 'environmental' | 'cultural';
  
  // 详细背景
  background: {
    summary: string;
    historicalContext: string;
    keyInterests: {
      self: string[];
      opponent: string[];
    };
    constraints: {
      self: string[];
      opponent: string[];
    };
  };
  
  // 谈判过程
  negotiationProcess: {
    phases: {
      name: string;
      summary: string;
      keyMoments: {
        speaker: 'self' | 'opponent';
        action: string;
        language: string;
        analysis: string;
      }[];
    }[];
  };
  
  // 结果与影响
  outcome: {
    result: 'success' | 'partial' | 'failure';
    score: number; // -100 to 100
    agreement?: string;
    keyTerms?: string[];
    consequences: string;
  };
  
  // 语言艺术分析
  languageAnalysis: {
    techniques: {
      name: string;
      description: string;
      example: string;
    }[];
    keyPhrases: {
      phrase: string;
      meaning: string;
      usage: string;
    }[];
  };
  
  // 参考价值
  lessons: string[];
  
  sources: string[];
  
  // 虚构标记（用于科幻/假设场景）
  isFictional?: boolean;
}

export const diplomaticCases: DiplomaticCase[] = [
  {
    id: 'camp-david-1978',
    name: '戴维营协议',
    year: 1978,
    parties: {
      self: { name: '贝京', country: '以色列', flag: '🇮🇱' },
      opponent: { name: '萨达特', country: '埃及', flag: '🇪🇬' },
    },
    topic: '中东和平协议框架',
    category: 'peace',
    
    background: {
      summary: '1978年9月，美国总统卡特邀请以色列总理贝京和埃及总统萨达特在戴维营举行秘密首脑会议，讨论中东和平问题。这是埃以之间首次直接高层对话。',
      historicalContext: '1973年第四次中东战争后，中东地区陷入僵局。埃及和以色列在苏伊士运河两侧对峙。美国希望打破僵局，同时维护其中东战略利益。萨达特寻求收回西奈半岛，贝京则面临国内强硬派压力。',
      keyInterests: {
        self: ['维护以色列安全', '获得美国支持', '避免被完全孤立'],
        opponent: ['收回西奈半岛全部主权', '摆脱经济困境', '获得国际承认'],
      },
      constraints: {
        self: ['不能承认巴勒斯坦建国', '不能放弃战略要地', '国内强硬派反对'],
        opponent: ['不能被视为对以色列投降', '维护阿拉伯世界团结', '保持军队士气'],
      },
    },
    
    negotiationProcess: {
      phases: [
        {
          name: '破冰阶段',
          summary: '双方在卡特斡旋下开始直接对话，气氛紧张',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '萨达特主动提出和平倡议',
              language: '我准备到和平能够存在的地方去，甚至到以色列去讨论和平。',
              analysis: '这是一句外交史上的经典破冰语言。通过极端夸张的表述（"甚至到以色列"），萨达特展示了极大的诚意，同时将球踢给了对方，让以色列难以拒绝。',
            },
          ],
        },
        {
          name: '僵局阶段',
          summary: '在西奈半岛主权问题上陷入僵局',
          keyMoments: [
            {
              speaker: 'self',
              action: '贝京坚持不放弃任何领土',
              language: '这块土地是上帝赐予我们的，我们不能分割它。',
              analysis: '贝京使用宗教语言包装政治立场，既表达了强硬态度，又给国内选民一个意识形态上的解释。同时为后续可能的让步预留空间。',
            },
            {
              speaker: 'opponent',
              action: '萨达特提出和平换土地原则',
              language: '和平不是用鲜血换来的领土，而是用智慧和勇气开创的未来。',
              analysis: '萨达特巧妙地将"土地换和平"的概念重新包装，强调和平的价值高于土地，同时没有直接提及具体领土问题。',
            },
          ],
        },
        {
          name: '突破阶段',
          summary: '卡特提出折中方案，双方开始妥协',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '萨达特接受非军事化方案',
              language: '为了和平，埃及愿意接受西奈半岛的非军事化安排，这意味着以色列将获得真正的安全。',
              analysis: '萨达特用"为了和平"开头，展现大局观；"接受"而非"同意"显示了主动姿态；同时强调以色列获得安全，照顾对方核心关切。',
            },
          ],
        },
      ],
    },
    
    outcome: {
      result: 'partial',
      score: 40,
      agreement: '戴维营协议：埃及承认以色列，两国缔结和平条约；以色列分阶段撤出西奈半岛；建立自治安排讨论机制。',
      keyTerms: [
        '和平换土地',
        '非军事化',
        '自治过渡安排',
        '最后地位谈判',
      ],
      consequences: '萨达特遭到阿拉伯世界孤立，1981年被刺杀。贝京获得诺贝尔和平奖以色列国内争议。协议为后续伊德里翁谈判奠定基础，但巴以核心问题仍未解决。',
    },
    
    languageAnalysis: {
      techniques: [
        {
          name: '宗教语言包装',
          description: '用宗教情感包装政治立场，既表明态度又凝聚共识',
          example: '"这块土地是上帝赐予我们的"',
        },
        {
          name: '夸张破冰',
          description: '用极端表述展示诚意，打破僵局',
          example: '"甚至到以色列去讨论和平"',
        },
        {
          name: '框架重塑',
          description: '重新定义概念，将己方诉求包装成共同利益',
          example: '"用智慧和勇气开创的未来"',
        },
        {
          name: '条件让步',
          description: '在让步前设定条件，维护尊严',
          example: '"为了和平，埃及愿意接受..."',
        },
      ],
      keyPhrases: [
        {
          phrase: '为了和平',
          meaning: '表明和平是最高价值，为后续让步铺垫',
          usage: '在任何可能被视为软弱的让步前使用',
        },
        {
          phrase: '这意味着',
          meaning: '解释对方接受提议的实际利益',
          usage: '说服对方接受时使用',
        },
        {
          phrase: '我们不能',
          meaning: '表达硬性约束，为立场辩护',
          usage: '拒绝对方要求时使用',
        },
      ],
    },
    
    lessons: [
      '第三方调停者（如卡特）的坚持和可信度至关重要',
      '宗教和历史情感可以被外交语言巧妙处理',
      '完全密封的谈判有时比公开谈判更有效',
      '和平协议需要为双方都提供"胜利叙事"',
      '短期让步可能导致长期利益',
    ],
    
    sources: [
      'Jimmy Carter, "Keeping Faith: Memoirs of a President"',
      'William B. Quandt, "Camp David: The Making of Peace"',
      'Sadat\'s Speeches and Statements (1978-1981)',
    ],
  },
  
  {
    id: 'us-japan-car-1981',
    name: '日美汽车贸易谈判',
    year: 1981,
    parties: {
      self: { name: '铃木善幸', country: '日本', flag: '🇯🇵' },
      opponent: { name: '里根', country: '美国', flag: '🇺🇸' },
    },
    topic: '汽车及零部件贸易安排',
    category: 'trade',
    
    background: {
      summary: '1981年，美国对日美贸易逆差急剧扩大，特别是汽车行业。里根政府要求日本自动限制汽车出口，否则将采取单边制裁措施。双方进行了紧张的贸易谈判。',
      historicalContext: '1970-80年代，日本经济高速增长，半导体、汽车等行业对美国形成强大竞争。1981年美国失业率上升，汽车业工人面临压力。国会中保护主义情绪高涨。',
      keyInterests: {
        self: ['维护自由贸易原则', '保护日本汽车产业市场份额', '避免国内政治压力'],
        opponent: ['减少贸易逆差', '保护汽车业就业', '兑现竞选承诺'],
      },
      constraints: {
        self: ['不能接受明显损害经济的协议', '需要维护国际形象', '不能让步被视为软弱'],
        opponent: ['不能完全放弃自由贸易原则', '需要国会支持', '避免激化日美关系'],
      },
    },
    
    negotiationProcess: {
      phases: [
        {
          name: '威胁阶段',
          summary: '美方发出制裁威胁，要求日本主动限制出口',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '里根警告将采取单边行动',
              language: '我们希望日本朋友能够理解，如果市场不能公平开放，美国人民不会袖手旁观。',
              analysis: '"希望"和"朋友"保持表面友好，但"不会袖手旁观"发出明确威胁。这是典型的先礼后兵策略。',
            },
          ],
        },
        {
          name: '讨价还价阶段',
          summary: '双方就具体数字展开博弈',
          keyMoments: [
            {
              speaker: 'self',
              action: '日本提出渐进方案',
              language: '日本的汽车出口已经呈现自然下降趋势，我们愿意通过市场力量而非行政手段来实现平衡。',
              analysis: '日本坚持自由贸易原则，拒绝"自动出口限制"这种政府干预形式，同时承认问题存在，展示了灵活性。',
            },
            {
              speaker: 'opponent',
              action: '美方提出具体数字要求',
              language: '你们每年对美汽车出口不能超过160万辆，这是市场的合理预期。',
              analysis: '美方用"市场合理预期"包装政治数字要求，显得客观公正而非霸凌。',
            },
          ],
        },
      ],
    },
    
    outcome: {
      result: 'partial',
      score: 30,
      agreement: '日本实施"自愿出口限制"，将对美汽车出口限制在168万辆（1981年）并逐年减少；美国承诺不就此问题启动301调查。',
      keyTerms: [
        '自愿出口限制(VER)',
        '市场导向安排',
        '美国汽车零部件采购',
      ],
      consequences: '日本汽车厂商开始在美国直接投资建厂，绕过了出口限制。长期看反而加速了日本汽车产业在美国的本土化。',
    },
    
    languageAnalysis: {
      techniques: [
        {
          name: '自愿性包装',
          description: '将被迫的让步包装成主动选择',
          example: '"自愿出口限制"而非"被迫限制"',
        },
        {
          name: '市场语言',
          description: '用经济学术语包装政治诉求',
          example: '"市场合理预期"',
        },
        {
          name: '渐进承诺',
          description: '不给出具体数字，保留灵活性',
          example: '"自然下降趋势"',
        },
      ],
      keyPhrases: [
        {
          phrase: '自愿的',
          meaning: '否认被强迫，维护尊严',
          usage: '被迫做出让步时使用',
        },
        {
          phrase: '市场力量',
          meaning: '坚持自由贸易原则',
          usage: '拒绝政府干预式解决方案',
        },
        {
          phrase: '合理预期',
          meaning: '将政治要求包装成客观分析',
          usage: '提出具体要求时使用',
        },
      ],
    },
    
    lessons: [
      '贸易摩擦往往以"自愿"形式解决，保护各方面子',
      '出口限制可能加速对方本地化投资',
      '行业协会和商界游说在贸易谈判中作用重大',
      '长期来看，贸易协议可能产生意想不到的产业转移效应',
    ],
    
    sources: [
      'Ethan S. Harris, "The 1981 U.S.-Japan Automobile Agreement"',
      'Laura D\'Andrea Tyson, "Who\'s Bashing Whom?"',
    ],
  },
  
  {
    id: 'brexit-negotiation-2016-2020',
    name: '英国脱欧谈判',
    year: 2016,
    parties: {
      self: { name: '约翰逊', country: '英国', flag: '🇬🇧' },
      opponent: { name: '冯德莱恩', country: '欧盟', flag: '🇪🇺' },
    },
    topic: '英国退出欧盟谈判',
    category: 'trade',
    
    background: {
      summary: '2016年英国公投决定脱欧后，英欧双方进行了长达四年的艰难谈判，就分手费、公民权利、北爱尔兰边界等问题展开激烈博弈。',
      historicalContext: '2016年6月英国公投52%选择脱欧。卡梅伦下台后特蕾莎·梅接手谈判，因"契克斯计划"被拒而辞职。约翰逊接任后采取更强硬立场，但最终仍需接受不利条款。',
      keyInterests: {
        self: ['收回主权和法律自主权', '与欧盟保持良好贸易关系', '保持保守党团结'],
        opponent: ['维护欧盟完整性', '阻止其他国家效仿', '获得合理分手费'],
      },
      constraints: {
        self: ['不能举行第二次公投', '必须实现"拿回控制权"的竞选承诺', '不能在北爱尔兰问题上让步'],
        opponent: ['不能让英国"一脱了之"享受特权', '维护27国团结', '爱尔兰边境问题是红线'],
      },
    },
    
    negotiationProcess: {
      phases: [
        {
          name: '立场宣示阶段',
          summary: '双方亮出核心诉求',
          keyMoments: [
            {
              speaker: 'self',
              action: '约翰逊宣称将"不惜一切代价"脱欧',
              language: '我们将在10月31日离开，无论是否有协议。',
              analysis: '这是典型的"强制博弈"策略，通过宣布不可信的威胁（无协议脱欧），迫使对方让步。但最终证明是空话。',
            },
            {
              speaker: 'opponent',
              action: '欧盟坚持完整性原则',
              language: '单一市场意味着四大地中海：无商品、无服务、无资本、无人员流动。北爱尔兰议题没有谈判空间。',
              analysis: '欧盟用"四无"总结单一市场核心要素，清晰明了。同时明确北爱尔兰是"没有谈判空间"的硬红线，拒绝被施压。',
            },
          ],
        },
        {
          name: '技术性谈判阶段',
          summary: '就具体条款展开讨论',
          keyMoments: [
            {
              speaker: 'self',
              action: '提出"最大胆"的边境解决方案',
              language: '我们将找到一个创造性的解决方案，一个女王陛下的政府从未提出过的方案。',
              analysis: '约翰逊用模糊的"创造性方案"回避具体细节，既满足了国内强硬派的期待，又为最终妥协预留空间。典型的语言把戏。',
            },
          ],
        },
      ],
    },
    
    outcome: {
      result: 'partial',
      score: -20,
      agreement: '英国支付约330亿英镑分手费；北爱尔兰留在欧盟单一市场但留在英国关税区；设立过渡期；欧盟公民和英国公民权利得到保障。',
      keyTerms: [
        '分手费',
        '北爱尔兰议定书',
        '过渡期',
        '公平竞争环境',
      ],
      consequences: '约翰逊宣称"拿回控制权"，但批评者指出实际上接受了欧盟大部分条款。北爱尔兰议定书后来成为新的争议焦点，英国单方面试图修改。',
    },
    
    languageAnalysis: {
      techniques: [
        {
          name: '模糊承诺',
          description: '用模糊表述保留灵活性',
          example: '"创造性的解决方案"',
        },
        {
          name: '强硬修辞',
          description: '使用极端语言满足国内受众',
          example: '"不惜一切代价"、"无论是否有协议"',
        },
        {
          name: '最终妥协包装',
          description: '将失败包装成成功',
          example: '约翰逊将接受北爱尔兰议定书描述为"维护英国完整"',
        },
      ],
      keyPhrases: [
        {
          phrase: '拿回控制权',
          meaning: '将技术性协议包装成主权胜利',
          usage: '宣传脱欧成就时使用',
        },
        {
          phrase: '创造性的',
          meaning: '回避具体方案的万能词',
          usage: '无法给出答案时使用',
        },
        {
          phrase: '最好的协议',
          meaning: '无法评价协议质量时使用',
          usage: '为任何协议辩护时使用',
        },
      ],
    },
    
    lessons: [
      '谈判中的强硬表态往往需要后续收回',
      '"红线"在实践中可能被迫调整',
      '国内政治约束可能限制国际谈判灵活性',
      '语言修辞与实际协议内容往往存在差距',
      '分手费在离婚谈判中是合理的现实需求',
    ],
    
    sources: [
      'Michel Barnier, "The Great Reveal: The Art of the Deal in Brexit"',
      'Various EU and UK government position papers (2017-2020)',
    ],
  },
];

// 南海相关案例
export const southeastAsiaCases: DiplomaticCase[] = [
  {
    id: 'south-china-sea-doc-2002',
    name: '南海各方行为宣言(DOC)',
    year: 2002,
    parties: {
      self: { name: '中国', country: '中国', flag: '🇨🇳' },
      opponent: { name: '东盟', country: '东盟', flag: '🌏' },
    },
    topic: '南海地区行为准则',
    category: 'security',
    
    background: {
      summary: '2002年，中国与东盟签署《南海各方行为宣言》，承诺通过友好协商和谈判解决争议。',
      historicalContext: '1990年代南海争端升温。1995年美济礁事件、1999年菲律宾搁浅军舰等都加剧了紧张局势。',
      keyInterests: {
        self: ['维护南海断续线权益', '反对域外大国干预'],
        opponent: ['建立有约束力的行为准则', '限制单边开发行动', '维护航行自由'],
      },
      constraints: {
        self: ['不能承认仲裁庭管辖权', '不能放弃历史性权利主张'],
        opponent: ['不能在成员国共识基础上行动', '不能激怒中国影响经贸关系'],
      },
    },
    
    negotiationProcess: {
      phases: [
        {
          name: '艰难起步',
          summary: '东盟提出准则草案，遭中国反对',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '东盟提出包含争端解决机制的准则草案',
              language: '我们希望建立一个具有法律约束力的机制来处理海上争议。',
              analysis: '东盟用"法律约束力"和"机制"等专业术语包装诉求。',
            },
            {
              speaker: 'self',
              action: '中国拒绝有约束力的准则',
              language: '南海问题应该由直接当事国通过友好协商解决，这符合国际法精神。',
              analysis: '中国引用国际法，强调"直接当事国"排除多边介入。',
            },
          ],
        },
      ],
    },
    
    outcome: {
      result: 'partial',
      score: 20,
      agreement: '《南海各方行为宣言》：承诺通过友好协商解决争议；各方保持克制。',
      keyTerms: ['和平解决争议', '保持克制', '不采取复杂化行动'],
      consequences: 'DOC缺乏法律约束力，执行效果有限。',
    },
    
    languageAnalysis: {
      techniques: [
        { name: '引用国际法', description: '用国际法支持己方立场', example: '"符合国际法精神"' },
        { name: '强调直接当事国', description: '排除第三方介入', example: '"由直接当事国友好协商"' },
      ],
      keyPhrases: [
        { phrase: '直接当事国', meaning: '排除多边机制', usage: '拒绝多边方案时' },
        { phrase: '和平稳定', meaning: '各方最大公约数', usage: '需要妥协时' },
      ],
    },
    
    lessons: [
      '无约束力文件可作为过渡方案',
      '坚持核心诉求同时可策略性表达灵活性',
      '多边谈判中联盟内部协调往往更难',
    ],
    
    sources: ['ASEAN-China Declaration (2002)'],
  },
  {
    id: 'philippines-china-arbitration-2016',
    name: '中菲南海仲裁案',
    year: 2016,
    parties: {
      self: { name: '菲律宾', country: '菲律宾', flag: '🇵🇭' },
      opponent: { name: '中国', country: '中国', flag: '🇨🇳' },
    },
    topic: '南海仲裁裁决',
    category: 'territory',
    
    background: {
      summary: '2013年菲律宾将南海争议提交国际仲裁。2016年仲裁庭裁决中国断续线缺乏法律依据。中国拒绝参与仲裁。',
      historicalContext: '2012年黄岩岛对峙后中菲关系恶化。杜特尔特执政后中菲关系改善。',
      keyInterests: {
        self: ['获得国际法支持', '否定中国断续线主张'],
        opponent: ['维护主权和断续线主张', '阻止仲裁庭获得管辖权'],
      },
      constraints: {
        self: ['不能与中国完全撕破脸', '需要维护与华经贸关系'],
        opponent: ['不能承认仲裁庭管辖权', '不能让裁决影响实际控制'],
      },
    },
    
    negotiationProcess: {
      phases: [
        {
          name: '提起仲裁',
          summary: '菲律宾选择法律路径',
          keyMoments: [
            {
              speaker: 'self',
              action: '菲律宾宣布提起仲裁',
              language: '菲律宾作为《联合国海洋法公约》缔约国，有权寻求和平解决争端的途径。',
              analysis: '用公约权利作为合法性来源。',
            },
            {
              speaker: 'opponent',
              action: '中国拒绝参与仲裁',
              language: '仲裁庭对此案明显没有管辖权。中国不会接受任何强加的解决方案。',
              analysis: '用"强加"暗示这是单方面行动。',
            },
          ],
        },
        {
          name: '裁决后',
          summary: '杜特尔特政府搁置裁决',
          keyMoments: [
            {
              speaker: 'self',
              action: '菲律宾选择务实对话',
              language: '我们不寻求挑衅，也不寻求对抗。我们希望与中国直接对话。',
              analysis: '将搁置裁决包装成主动选择。',
            },
          ],
        },
      ],
    },
    
    outcome: {
      result: 'partial',
      score: 30,
      agreement: '裁决否定中国断续线；中国拒绝承认。中菲达成"南海共同开发"共识。',
      keyTerms: ['仲裁裁决', '历史性权利', '共同开发'],
      consequences: '裁决成为国际法判例，但执行有限。中菲形成"冷和平"。',
    },
    
    languageAnalysis: {
      techniques: [
        { name: '法律语言', description: '用国际法术语构建合法性', example: '"依据《联合国海洋法公约》"' },
        { name: '务实搁置', description: '不否认但也不执行', example: '"不挑衅、不对抗"' },
      ],
      keyPhrases: [
        { phrase: '直接对话', meaning: '绕过国际机制', usage: '需要缓和关系时' },
      ],
    },
    
    lessons: [
      '国际仲裁提供法律话语权，但缺乏执行机制',
      '国内政治变化可改变外交立场',
      '争端可以"冷处理"而非必须解决',
    ],
    
    sources: ['South China Sea Arbitration Award (2016)'],
  },
];

// 虚构历史场景
export const fictionalCases: DiplomaticCase[] = [
  {
    id: 'cold-war-hypothetical-01',
    name: '虚构场景：1962年古巴导弹危机外交谈判',
    year: 1962,
    parties: {
      self: { name: '赫鲁晓夫', country: '苏联', flag: '🇷🇺' },
      opponent: { name: '肯尼迪', country: '美国', flag: '🇺🇸' },
    },
    topic: '古巴导弹危机外交解决',
    category: 'peace',
    isFictional: true,
    
    background: {
      summary: '虚构场景：假设在古巴导弹危机中，苏美通过外交渠道解决危机。模拟冷战背景下核大国间的危机管控。',
      historicalContext: '虚构培训场景。1962年10月，苏联在古巴部署导弹，美国实施海上封锁，最终以外交方式解决。',
      keyInterests: {
        self: ['保护古巴政权', '避免核战争', '维护苏联形象'],
        opponent: ['消除导弹威胁', '维护威望', '避免核战争'],
      },
      constraints: {
        self: ['不能被视为退缩', '不能失去古巴盟友'],
        opponent: ['不能被视为对共产主义软弱'],
      },
    },
    
    negotiationProcess: {
      phases: [
        {
          name: '危机沟通',
          summary: '双方通过秘密渠道传递信号',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '肯尼迪发表电视讲话',
              language: '我们这样做不是出于轻率，而是因为世界已处于核毁灭的边缘。',
              analysis: '"核毁灭"烘托危机严重性，既警告又不失尊严。',
            },
            {
              speaker: 'self',
              action: '赫鲁晓夫回应',
              language: '苏联不会在任何威胁和压力下屈服。但我们也不希望将世界推向核战争。',
              analysis: '"不屈服"维护强硬，"不希望核战争"为妥协留有余地。',
            },
          ],
        },
      ],
    },
    
    outcome: {
      result: 'success',
      score: 60,
      agreement: '苏联撤回导弹；美国承诺不入侵古巴（私下）；美国撤回土耳其导弹。',
      keyTerms: ['导弹撤回', '不入侵承诺', '私下交易', '危机降级'],
      consequences: '核大国首次通过危机管控避免战争。"热线"电话在危机后建立。',
    },
    
    languageAnalysis: {
      techniques: [
        { name: '面子工程', description: '确保双方都能宣称胜利', example: '公开/秘密两套协议' },
        { name: '危机语言', description: '在极端紧张中寻找降级台阶', example: '"不屈服"但"不希望核战争"' },
      ],
      keyPhrases: [
        { phrase: '不是轻率', meaning: '表明行动经过深思熟虑', usage: '强硬行动前使用' },
        { phrase: '保全面子', meaning: '确保双方有胜利叙事', usage: '设计妥协方案时' },
      ],
    },
    
    lessons: [
      '核危机中沟通渠道至关重要',
      '"保全面子"的妥协往往比单方胜利更持久',
      '秘密协议有时是解决僵局的关键',
    ],
    
    sources: ['虚构场景，仅供外交培训参考', 'Graham Allison, "Essence of Decision"'],
  },
  {
    id: 'scifi-hypothetical-01',
    name: '虚构场景：火星资源开发国际协议',
    year: 2150,
    parties: {
      self: { name: '地球联合政府', country: '地球', flag: '🌍' },
      opponent: { name: '火星独立联盟', country: '火星', flag: '🔴' },
    },
    topic: '火星资源开发权益分配',
    category: 'trade',
    isFictional: true,
    
    background: {
      summary: '虚构场景：2150年，人类已在火星建立永久殖民地。火星联盟宣布对火星资源的主权，要求分享地球技术。',
      historicalContext: '虚构培训场景。2080年人类首次火星殖民，70年后火星人口50万，建立完整工业体系。',
      keyInterests: {
        self: ['获得火星资源开发权', '维护技术优势'],
        opponent: ['宣布火星独立', '获得技术转让'],
      },
      constraints: {
        self: ['不能让火星完全独立'],
        opponent: ['不能被地球经济制裁'],
      },
    },
    
    negotiationProcess: {
      phases: [
        {
          name: '独立宣言',
          summary: '火星宣布独立立场',
          keyMoments: [
            {
              speaker: 'self',
              action: '火星联盟主席发表独立宣言',
              language: '火星人民经过七十年的艰苦创业，已经建立起属于自己的家园。',
              analysis: '"家园"唤起归属感，"不是殖民地"明确政治立场。',
            },
          ],
        },
      ],
    },
    
    outcome: {
      result: 'success',
      score: 70,
      agreement: '火星获得政治自治权；与地球建立"经济共同体"；共同管理火星资源。',
      keyTerms: ['政治自治', '经济共同体', '共同管理'],
      consequences: '开创地球-地外政权关系新模式。',
    },
    
    languageAnalysis: {
      techniques: [
        { name: '身份建构', description: '塑造新的政治身份', example: '"火星人民"' },
        { name: '历史叙事', description: '用共同历史建立情感联结', example: '"七十年的艰苦创业"' },
      ],
      keyPhrases: [
        { phrase: '家园', meaning: '强调归属感', usage: '塑造政治身份时' },
        { phrase: '共同未来', meaning: '构建合作关系', usage: '超越当下时' },
      ],
    },
    
    lessons: [
      '新兴势力通过"独立宣言"建立合法性',
      '经济依存关系可制约完全分离',
      '未来外交挑战需要创造性解决方案',
    ],
    
    sources: ['虚构场景，仅供外交培训参考'],
  },
];

export function getCaseById(id: string): DiplomaticCase | undefined {
  return diplomaticCases.find(c => c.id === id);
}

export function getCasesByCategory(category: DiplomaticCase['category']): DiplomaticCase[] {
  return diplomaticCases.filter(c => c.category === category);
}

// 案例ID别名映射 - 处理AI可能返回的各种变体
const caseAliases: Record<string, string> = {
  // 戴维营协议
  'camp-david': 'camp-david-1978',
  'campdavid': 'camp-david-1978',
  'campdavid1978': 'camp-david-1978',
  'david': 'camp-david-1978',
  '戴维营': 'camp-david-1978',
  
  // 日美汽车
  'us-japan': 'us-japan-car-1981',
  'usjapan': 'us-japan-car-1981',
  'usjapancar': 'us-japan-car-1981',
  'usjapancar1981': 'us-japan-car-1981',
  '日美汽车': 'us-japan-car-1981',
  '汽车': 'us-japan-car-1981',
  
  // 英国脱欧
  'brexit': 'brexit-negotiation-2016-2020',
  'brexitnegotiation': 'brexit-negotiation-2016-2020',
  'brexitnegotiation2016': 'brexit-negotiation-2016-2020',
  'brexitnegotiation2020': 'brexit-negotiation-2016-2020',
  'uk-eu': 'brexit-negotiation-2016-2020',
  '脱欧': 'brexit-negotiation-2016-2020',
  
  // 南海
  'south-china-sea': 'south-china-sea-doc-2002',
  'southchinasea': 'south-china-sea-doc-2002',
  'southchinasea2002': 'south-china-sea-doc-2002',
  '南海': 'south-china-sea-doc-2002',
  'chinasea': 'south-china-sea-doc-2002',
  
  // 中菲仲裁
  'philippines-china': 'philippines-china-arbitration-2016',
  'philippineschina': 'philippines-china-arbitration-2016',
  'philippineschinaarbitration': 'philippines-china-arbitration-2016',
  'philippineschinaarbitration2016': 'philippines-china-arbitration-2016',
  'china-philippines': 'philippines-china-arbitration-2016',
  'chinaphilippines': 'philippines-china-arbitration-2016',
  '中菲仲裁': 'philippines-china-arbitration-2016',
  '中菲': 'philippines-china-arbitration-2016',
  '仲裁': 'philippines-china-arbitration-2016',
  
  // 冷战
  'cold-war': 'cold-war-hypothetical-01',
  'coldwar': 'cold-war-hypothetical-01',
  'cuba': 'cold-war-hypothetical-01',
  '古巴': 'cold-war-hypothetical-01',
  '导弹': 'cold-war-hypothetical-01',
  
  // 科幻
  'scifi': 'scifi-hypothetical-01',
  'scifihypothetical': 'scifi-hypothetical-01',
  '科幻': 'scifi-hypothetical-01',
};

export function resolveCaseId(inputId: string): string | null {
  // 处理URL编码和特殊字符
  const decoded = decodeURIComponent(inputId);
  const normalized = decoded.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\u4e00-\u9fa5-]/g, ''); // 保留中文
  
  // 直接匹配
  if (diplomaticCases.some(c => c.id === normalized)) {
    return normalized;
  }
  
  // 去掉分隔符的版本
  const normalizedNoDash = normalized.replace(/-/g, '');
  
  // 尝试别名映射（使用去掉分隔符的键）
  for (const [alias, actualId] of Object.entries(caseAliases)) {
    const aliasNoDash = alias.replace(/-/g, '');
    // 只匹配长度大于3的别名（避免匹配到太短的如"2016"）
    if (aliasNoDash.length >= 4) {
      // 检查是否包含或被包含
      if (normalizedNoDash.includes(aliasNoDash) || aliasNoDash.includes(normalizedNoDash)) {
        return actualId;
      }
    }
  }
  
  // 尝试模糊匹配（部分匹配）
  for (const diplomaticCase of diplomaticCases) {
    const caseName = diplomaticCase.name.toLowerCase();
    const caseNameNoDash = caseName.replace(/[^a-z0-9\u4e00-\u9fa5]/g, '');
    const caseIdNoDash = diplomaticCase.id.replace(/-/g, '');
    
    // 检查各种匹配方式
    if (normalizedNoDash.includes(caseIdNoDash) || caseIdNoDash.includes(normalizedNoDash) ||
        normalizedNoDash.includes(caseNameNoDash) || caseNameNoDash.includes(normalizedNoDash)) {
      return diplomaticCase.id;
    }
    
    // 关键词匹配 - 提取案例名称中的关键词
    const nameParts = caseName
      .replace(/[^a-z0-9\u4e00-\u9fa5]/g, ' ')
      .split(' ')
      .filter(p => p.length >= 4);
    
    const matchedParts = nameParts.filter(p => {
      const pNorm = p.toLowerCase();
      return normalizedNoDash.includes(pNorm) || pNorm.includes(normalizedNoDash);
    });
    
    if (matchedParts.length >= 2) {
      return diplomaticCase.id;
    }
    
    // 主要关键词匹配 - 从案例ID中提取关键词
    const idParts = diplomaticCase.id.replace(/\d+/g, ' ').split(/\s+/).filter(p => p.length >= 4);
    const matchedIdParts = idParts.filter(p => normalizedNoDash.includes(p));
    if (matchedIdParts.length >= 2) {
      return diplomaticCase.id;
    }
  }
  
  return null;
}

// 智能获取案例 - 支持模糊匹配
export function findCase(input: string): DiplomaticCase | undefined {
  const resolvedId = resolveCaseId(input);
  if (resolvedId) {
    return getCaseById(resolvedId);
  }
  
  // 尝试通过名称查找
  const normalized = input.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]/g, '');
  const normalizedWithDash = normalized.replace(/([a-z])([a-z])/g, '$1-$2');
  
  return diplomaticCases.find(c => {
    const nameNorm = c.name.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]/g, '');
    const topicNorm = c.topic.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]/g, '');
    const idNorm = c.id.toLowerCase();
    
    return c.name.toLowerCase().includes(input.toLowerCase()) ||
           c.topic.toLowerCase().includes(input.toLowerCase()) ||
           c.id.toLowerCase().includes(normalized) ||
           nameNorm.includes(normalized) ||
           topicNorm.includes(normalized) ||
           normalized.includes(nameNorm) ||
           // 单词级匹配
           normalized.split('-').some(word => word.length > 3 && (
             nameNorm.includes(word) ||
             topicNorm.includes(word) ||
             idNorm.includes(word)
           ));
  });
}

// 获取所有案例ID和名称列表（用于AI参考）
export function getCaseIndex(): { id: string; name: string; year: number; topic: string }[] {
  return diplomaticCases.map(c => ({
    id: c.id,
    name: c.name,
    year: c.year,
    topic: c.topic,
  }));
}
