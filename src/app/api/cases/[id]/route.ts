import { NextRequest, NextResponse } from "next/server";
const diplomaticCases = [
  {
    id: 'camp-david-1978',
    name: '戴维营协议',
    year: 1978,
    parties: {
      self: { name: '贝京', country: '以色列', flag: '🇮🇱' },
      opponent: { name: '萨达特', country: '埃及', flag: '🇪🇬' },
    },
    topic: '中东和平协议框架',
    background: {
      summary: '1978年9月，美国总统卡特邀请埃及总统萨达特和以色列总理贝京在戴维营进行为期13天的秘密会谈。这是中东和平进程中的重要里程碑，埃以双方在美国的调解下达成了历史性的戴维营协议。',
      historicalContext: '第四次中东战争后，埃及和以色列处于敌对状态。萨达特1977年访问耶路撒冷打破僵局，为和平谈判铺平道路。美国积极介入调解，希望在中东建立更稳定的战略格局。',
      keyInterests: {
        self: ['维护以色列安全', '保留部分占领领土', '获得国际承认'],
        opponent: ['收回西奈半岛', '获得以色列承认', '提升地区影响力']
      },
      constraints: {
        self: ['国内右翼势力反对', '领土让步敏感性', '耶路撒冷地位问题'],
        opponent: ['阿拉伯国家联盟反对', '国内民族主义情绪', '军事失败阴影']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '破冰阶段',
          summary: '双方初次在戴维营接触，气氛紧张但保持基本礼节。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '提出历史性和平愿景',
              language: '我愿意做出痛苦的让步，以换取公正的和平。',
              analysis: '萨达特展现了务实主义态度，愿意承担政治风险。'
            },
            {
              speaker: 'self',
              action: '表达安全关切',
              language: '和平必须建立在安全的基础上，而不是单方面的让步。',
              analysis: '贝京坚持安全优先，体现了以色列的核心关切。'
            }
          ]
        },
        {
          name: '僵局与突破',
          summary: '谈判陷入僵局，但在美国的压力下双方最终达成妥协。',
          keyMoments: [
            {
              speaker: 'self',
              action: '接受和平框架',
              language: '我们准备签署这项协议，这是为了我们人民的未来。',
              analysis: '贝京做出了重大让步，同意归还西奈半岛。'
            },
            {
              speaker: 'opponent',
              action: '确认和平承诺',
              language: '今天我们开启了一个新时代。',
              analysis: '萨达特完成了历史性突破，为后续埃以和平条约奠定基础。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'partial',
      score: 45,
      agreement: '戴维营协议建立了埃以和平框架，包括：以色列撤出西奈半岛，埃及承认以色列国，双方建立正常外交关系。',
      keyTerms: ['土地换和平', '和平共处', '美国担保机制'],
      consequences: '埃及成为第一个承认以色列的阿拉伯大国，但因此被阿拉伯国家联盟驱逐，开创了中东和解的先例。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '情感共鸣',
          description: '通过表达对和平的渴望和对战争痛苦的回忆，建立情感联系。',
          example: '我不想让我们的子孙后代再经历战争的苦难。'
        },
        {
          name: '框架重构',
          description: '将领土问题从"损失"框架转变为"投资和平"框架。',
          example: '这不是失去，这是为我们共同的未来投资。'
        }
      ],
      keyPhrases: [
        { phrase: '和平进程', meaning: '通过渐进方式实现持久和平的策略', usage: '强调过程的渐进性和可控性' },
        { phrase: '安全保证', meaning: '确保国家生存和领土完整的承诺', usage: '在谈判中获得对方的关键承诺' }
      ]
    },
    lessons: [
      '高层直接对话是突破僵局的关键',
      '需要一个中立的第三方来调解和缓冲',
      '双方都需要在国内政治压力和和平需求之间找到平衡',
      '渐进式协议比一次性解决更容易实现'
    ],
    sources: [
      'Jimmy Carter, "Camp David: The Peace That Changed the Middle East"',
      'William B. Quandt, "Peace Process: American Diplomacy and the Arab-Israeli Conflict Since 1967"'
    ]
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
    background: {
      summary: '1980年代初期，日本对美汽车出口激增导致美日贸易摩擦加剧。美国要求日本自愿限制汽车出口数量，并开放国内市场。经过多轮谈判，双方达成了一项具有里程碑意义的贸易协议。',
      historicalContext: '冷战背景下，美日同盟关系至关重要，但经济竞争日益激烈。日本汽车产业迅速崛起，在美国市场份额大幅增长，引发美国汽车工人失业担忧。',
      keyInterests: {
        self: ['保持美国市场份额', '避免强制制裁', '维护自由贸易形象'],
        opponent: ['保护本国汽车产业', '减少贸易逆差', '争取蓝领工人支持']
      },
      constraints: {
        self: ['国内汽车产业依赖出口', '不能显得过于软弱', '需要平衡其他贸易议题'],
        opponent: ['需要展示对日强硬态度', '国内汽车工会压力', '里根政府的自由贸易理念']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '施压与对抗',
          summary: '美国威胁实施贸易制裁，要求日本做出让步。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '发出制裁威胁',
              language: '如果日本不采取行动，我们将不得不考虑单方面措施来保护我们的产业。',
              analysis: '里根政府展现强硬态度，回应国内产业压力。'
            },
            {
              speaker: 'self',
              action: '提出自主限制方案',
              language: '日本愿意主动限制出口增长，以避免更激烈的贸易冲突。',
              analysis: '日本通过主动让步避免被动制裁，争取主动权。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'partial',
      score: 30,
      agreement: '日本自愿将汽车出口限制在每年168万辆（后来调整），并承诺增加在美汽车和零部件生产。',
      keyTerms: ['自愿出口限制', '本地化生产', '贸易顺差管理'],
      consequences: '短期内缓解了贸易摩擦，但日本通过在美设厂规避限制，长期看美国汽车产业竞争力问题未能根本解决。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '威胁规避',
          description: '通过主动让步避免更坏的结果，将被迫行动包装为自主选择。',
          example: '这是我们自主的决定，不是因为任何外部压力。'
        }
      ],
      keyPhrases: [
        { phrase: '自愿限制', meaning: '在外部压力下的主动让步措施', usage: '保存双方面子的情况下达成妥协' }
      ]
    },
    lessons: [
      '贸易摩擦需要通过对话而非对抗解决',
      '自愿限制比强制制裁更能维护双边关系',
      '产业转移可以缓解短期摩擦但不能解决根本问题'
    ],
    sources: [
      'I. M. Destler, "American Trade Politics"',
      'Chalmers Johnson, "MITI and the Japanese Miracle"'
    ]
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
    background: {
      summary: '2016年英国公投决定退出欧盟后，英欧双方进行了长达四年多的艰难谈判，就分手费、公民权利、北爱尔兰边界等问题展开激烈博弈，最终在2020年达成历史性的贸易与合作协定。',
      historicalContext: '英国与欧盟的关系历来复杂，疑欧派势力长期存在。2016年卡梅伦以公投豪赌连任失败，特蕾莎·梅艰难推进脱欧进程，最终鲍里斯·约翰逊完成脱欧。',
      keyInterests: {
        self: ['恢复主权和立法自主', '控制移民', '与欧盟保持良好贸易关系'],
        opponent: ['维护欧盟完整性', '防止其他成员国效仿', '保护单一市场利益']
      },
      constraints: {
        self: ['保守党内部分歧', '北爱尔兰边界问题', '时间压力（避免无协议脱欧）'],
        opponent: ['不能显得对英国过于宽容', '27个成员国立场协调', '爱尔兰边境问题敏感性']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '原则确立',
          summary: '明确谈判红线，确立分手协议框架。',
          keyMoments: [
            {
              speaker: 'self',
              action: '发表硬脱欧宣言',
              language: '不达成协议好过坏协议（No deal is better than a bad deal）。',
              analysis: '约翰逊以强硬姿态开始谈判，设定高期望值。'
            },
            {
              speaker: 'opponent',
              action: '坚持公平原则',
              language: '权利与义务不可分割，这是单一市场的基本原则。',
              analysis: '欧盟展现出团结立场，不在原则问题上让步。'
            }
          ]
        },
        {
          name: '最终冲刺',
          summary: '在最后期限临近时，双方做出关键让步。',
          keyMoments: [
            {
              speaker: 'self',
              action: '接受北爱尔兰协议',
              language: '这是保证我们整个王国完整性的最好方案。',
              analysis: '约翰逊在核心关切上做出妥协，达成协议。'
            },
            {
              speaker: 'opponent',
              action: '批准贸易协定',
              language: '这是一个公平、平衡的协议，符合双方利益。',
              analysis: '欧盟在最后时刻展现灵活性，避免硬脱欧。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'partial',
      score: -20,
      agreement: '达成零关税、零配额的贸易协定，但在服务贸易、渔业等领域存在限制。建立了北爱尔兰议定书解决边境问题。',
      keyTerms: ['退出协议', '贸易与合作协定', '北爱尔兰议定书'],
      consequences: '英国正式脱离欧盟单一市场和关税同盟，在贸易和监管上获得更大自主权，但与欧盟关系显著疏远，经济影响复杂。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '重新定义',
          description: '将失利包装为胜利，强调"夺回控制权"的话语。',
          example: '我们终于重新掌握了我们的法律、边界、货币和未来。'
        }
      ],
      keyPhrases: [
        { phrase: '夺回控制权', meaning: '恢复国家主权和自主决策能力', usage: '将复杂妥协包装为民族胜利' }
      ]
    },
    lessons: [
      '公投结果与执行之间存在巨大鸿沟',
      '谈判筹码需要与实际影响力相匹配',
      '内部政治一致性是谈判成功的关键',
      '盟友可能成为最艰难的谈判对手'
    ],
    sources: [
      'Theresa May, "The Abuse of History: The False Promise of Brexit"',
      'Financial Times Coverage 2016-2020'
    ]
  },
  {
    id: 'south-china-sea-doc-2002',
    name: '南海各方行为宣言',
    year: 2002,
    parties: {
      self: { name: '中国', country: '中国', flag: '🇨🇳' },
      opponent: { name: '东盟', country: '东盟', flag: '🇦🇸' },
    },
    topic: '南海行为准则谈判',
    background: {
      summary: '2002年，中国与东盟十国签署《南海各方行为宣言》（DOC），承诺通过友好协商和谈判解决争议，不采取使争议复杂化或影响和平稳定的行动。这是规范南海行为的重要政治文件。',
      historicalContext: '冷战结束后，南海争端升温，岛礁建设、渔业冲突频发。中国与东盟都希望避免冲突升级，但各方在主权主张上存在根本分歧。',
      keyInterests: {
        self: ['维护南海断续线主张', '保持与东盟良好关系', '排除外部势力介入'],
        opponent: ['维护航行自由', '建立具有法律约束力的规则', '平衡中国影响力']
      },
      constraints: {
        self: ['国内民族主义情绪', '核心主权立场不能动摇', '需要维护大国形象'],
        opponent: ['内部立场不统一', '不愿过度刺激中国', '需要维护东盟中心地位']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '艰难磋商',
          summary: '经过多年谈判，各方寻求政治共识。',
          keyMoments: [
            {
              speaker: 'self',
              action: '提出双轨思路',
              language: '有关争议由直接当事方通过友好协商谈判和平解决，南海稳定由中国与东盟共同维护。',
              analysis: '中国坚持通过双边而非多边框架解决争议。'
            },
            {
              speaker: 'opponent',
              action: '推动多边框架',
              language: '我们需要一个所有相关方都参与的、具有法律约束力的准则。',
              analysis: '东盟试图建立多边规则来平衡中国影响力。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'partial',
      score: 20,
      agreement: '《南海各方行为宣言》确立了各方应遵守的基本原则，包括不使用武力、保持克制、通过对话解决分歧等。',
      keyTerms: ['和平解决争议', '不使用武力', '维护航行自由'],
      consequences: 'DOC为管控南海局势提供了政治框架，但缺乏法律约束力。后续的"南海行为准则"（COC）谈判仍在进行中。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '模糊处理',
          description: '使用模糊表述容纳各方不同解读。',
          example: '各方对争议有不同看法，应通过对话协商解决。'
        }
      ],
      keyPhrases: [
        { phrase: '双轨思路', meaning: '双边谈判与多边合作相结合的解决路径', usage: '平衡各方关切的话语策略' }
      ]
    },
    lessons: [
      '政治宣言与法律约束力之间存在重要区别',
      '多边谈判需要平衡各方不同利益',
      '建立信任措施是管控冲突的重要手段'
    ],
    sources: [
      'ASEAN-China Joint Declaration on the Conduct of Parties in the South China Sea, 2002',
      'Department of Foreign Affairs, Philippines'
    ]
  },
  {
    id: 'philippines-china-arbitration-2016',
    name: '中菲南海仲裁案',
    year: 2016,
    parties: {
      self: { name: '阿基诺三世', country: '菲律宾', flag: '🇵🇭' },
      opponent: { name: '中国', country: '中国', flag: '🇨🇳' },
    },
    topic: '南海仲裁裁决',
    background: {
      summary: '菲律宾单方面将南海争议提交国际仲裁，2016年海牙常设仲裁法院做出裁决，全面支持菲律宾主张，否定中国南海断续线和历史性权利。中国拒绝参与仲裁程序，不接受裁决结果。',
      historicalContext: '南海争端长期困扰中菲关系。2013年菲律宾阿基诺三世政府决定将争议提交国际仲裁，中国拒绝参与但表示"不参与不代表不接受"。',
      keyInterests: {
        self: ['获得国际法支持', '否定中国主张', '提升菲律宾国际地位'],
        opponent: ['维护核心利益', '否定仲裁合法性', '避免形成先例']
      },
      constraints: {
        self: ['执行裁决能力有限', '需要考虑美中平衡', '阿基诺三世任期限制'],
        opponent: ['不能显得接受裁决', '需要维护地区影响力', '中菲关系整体考量']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '菲律宾单边行动',
          summary: '菲律宾不顾中方反对，坚持推进仲裁程序。',
          keyMoments: [
            {
              speaker: 'self',
              action: '提交仲裁申请',
              language: '我们相信国际法是解决争端的最佳途径。',
              analysis: '菲律宾选择法律路径，试图获得国际支持。'
            },
            {
              speaker: 'opponent',
              action: '表明不接受立场',
              language: '仲裁庭对此案没有管辖权，中国不会接受这一仲裁。',
              analysis: '中国坚决反对，强调通过双边谈判解决。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'failure',
      score: -30,
      agreement: '仲裁庭裁定中国南海断续线在《联合国海洋法公约》下没有法律基础，南海岛礁建设违反环境保护义务。',
      keyTerms: ['仲裁裁决', '断续线', '历史性权利'],
      consequences: '裁决对菲律宾具有法律意义，但实际执行困难。2016年杜特尔特上台后转而采取亲华政策，仲裁结果被搁置。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '法律话语建构',
          description: '通过法律术语和程序来构建主张的合法性。',
          example: '根据《联合国海洋法公约》，我们的主张具有充分的法律基础。'
        }
      ],
      keyPhrases: [
        { phrase: '历史性权利', meaning: '基于历史实践形成的海洋权益主张', usage: '争议双方使用不同法律框架论证' }
      ]
    },
    lessons: [
      '国际仲裁裁决的执行依赖当事国配合',
      '法律胜利不等于实际收益',
      '外交路径和法理路径需要协调配合'
    ],
    sources: [
      'PCA Case No. 2013-19 Award',
      'UNCLOS (United Nations Convention on the Law of the Sea)'
    ]
  },
  {
    id: 'cold-war-hypothetical-01',
    name: '古巴导弹危机模拟',
    year: 1962,
    parties: {
      self: { name: '赫鲁晓夫', country: '苏联', flag: '☭' },
      opponent: { name: '肯尼迪', country: '美国', flag: '🇺🇸' },
    },
    topic: '核危机外交博弈',
    background: {
      summary: '1962年10月，苏联在古巴部署导弹引发人类历史上最接近核战争的危机。经过13天的紧张对峙，美苏通过秘密外交达成妥协，避免了灾难性战争。',
      historicalContext: '冷战高峰期，美苏在全球各地角力。苏联在古巴部署导弹是对美国在土耳其部署导弹的反应，也是为了保护新生的古巴革命政权。',
      keyInterests: {
        self: ['保护古巴政权', '获取核威慑平衡', '避免直接军事冲突'],
        opponent: ['消除导弹威胁', '维护美国霸权', '避免核战争']
      },
      constraints: {
        self: ['国内强硬派压力', '不能显得软弱', '古巴卡斯特罗立场'],
        opponent: ['军方要求强硬回应', '国会压力', '盟友观望态度']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '危机升级',
          summary: '美国发现苏联导弹，双方进入高度对峙状态。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '宣布海上封锁',
              language: '我们将，任何来自苏联的进攻性武器都将遭到立即拦截。',
              analysis: '肯尼迪选择海上隔离而非直接轰炸，展现克制。'
            },
            {
              speaker: 'self',
              action: '保持强硬姿态',
              language: '这是对古巴主权的侵犯，苏联将坚决回应。',
              analysis: '赫鲁晓夫面临国内压力，必须展现坚定立场。'
            }
          ]
        },
        {
          name: '幕后外交',
          summary: '通过秘密渠道，双方寻求体面退路。',
          keyMoments: [
            {
              speaker: 'self',
              action: '提出妥协方案',
              language: '苏联将撤走导弹，作为交换，美国应保证不入侵古巴，并悄悄移除土耳其导弹。',
              analysis: '赫鲁晓夫找到了给双方台阶下的方案。'
            },
            {
              speaker: 'opponent',
              action: '接受秘密协议',
              language: '美国接受苏联方案，但要求保密。',
              analysis: '肯尼迪同意私下承诺，避免公开承认让步。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'success',
      score: 60,
      agreement: '苏联撤回古巴导弹，美国保证不入侵古巴（秘密），并最终移除土耳其导弹。',
      keyTerms: ['海上隔离', '秘密外交', '核平衡'],
      consequences: '开创了大国危机管理的先例，建立了美苏之间的热线联系，冷战进入相对稳定期。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '秘密交易',
          description: '通过不公开的私下承诺达成双方都能接受的协议。',
          example: '这个问题我们可以私下讨论，不会公开。'
        },
        {
          name: '模糊承诺',
          description: '使用模糊表述让对方有台阶可下。',
          example: '我们会重新评估我们在土耳其的军事存在。'
        }
      ],
      keyPhrases: [
        { phrase: '热线外交', meaning: '危机时期领导人之间的直接沟通渠道', usage: '防止误判和冲突升级' }
      ]
    },
    lessons: [
      '核危机需要双方都保留退路',
      '秘密外交在危机管理中至关重要',
      '军事对峙需要配合外交渠道',
      '危机升级和降级都需要精心设计'
    ],
    sources: [
      'Robert F. Kennedy, "Thirteen Days: A Memoir of the Cuban Missile Crisis"',
      'Graham Allison, "Essence of Decision: Explaining the Cuban Missile Crisis"'
    ]
  },
  {
    id: 'scifi-hypothetical-01',
    name: '火星资源开发协议',
    year: 2050,
    parties: {
      self: { name: '联合国火星事务署', country: '国际组织', flag: '🌍' },
      opponent: { name: '火星 corporation', country: '私营企业', flag: '🚀' },
    },
    topic: '太空资源权益分配',
    background: {
      summary: '2050年，人类首个商业化火星基地开始运营。联合国火星事务署与火星公司就资源开采权、环境责任、利润分配等核心问题展开谈判，探索太空资源治理的新模式。',
      historicalContext: '2040年代，商业航天技术成熟，多个国家和私营企业开始在火星开展活动。现有《外层空间条约》未明确商业开采权归属，引发权益争议。',
      keyInterests: {
        self: ['维护国际法权威', '确保公平分配', '保护火星环境'],
        opponent: ['获得独家开采权', '最大化商业回报', '运营自主权']
      },
      constraints: {
        self: ['现有条约限制', '国际社会压力', '其他成员国利益'],
        opponent: ['巨大投资需要回报', '股东期望', '技术领先地位']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '规则制定',
          summary: '建立太空资源开发的基本框架。',
          keyMoments: [
            {
              speaker: 'self',
              action: '提出共享方案',
              language: '火星资源属于全人类，开发收益应合理分配给地球各国。',
              analysis: '体现国际组织的公平性诉求。'
            },
            {
              speaker: 'opponent',
              action: '主张投资回报',
              language: '我们承担了巨大风险，独家权益是商业开发的前提。',
              analysis: '商业实体的合理诉求需要被尊重。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'partial',
      score: 15,
      agreement: '建立资源开发许可证制度，企业获得一定期限内独家开采权，但需缴纳资源税用于国际太空基金，并接受环境监管。',
      keyTerms: ['资源税', '环境保证金', '国际太空基金'],
      consequences: '开创了太空资源商业开发的治理模式，为未来月球和小行星资源开发提供参考。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '框架创新',
          description: '创造新的概念和词汇来描述前所未有的情况。',
          example: '我们建议建立"太空共同遗产"的概念框架。'
        }
      ],
      keyPhrases: [
        { phrase: '太空共同遗产', meaning: '人类共享的太空资源和环境', usage: '平衡商业利益和公共利益的新概念' }
      ]
    },
    lessons: [
      '新领域的治理需要灵活性和前瞻性',
      '商业利益和公共利益可以通过制度设计调和',
      '早期规则制定者将拥有长期优势'
    ],
    sources: [
      'Outer Space Treaty 1967 (reference framework)',
      'Artemis Accords 2020 (modern precedent)'
    ]
  },
  {
    id: 'vienna-congress-1815',
    name: '维也纳会议',
    year: 1814,
    parties: {
      self: { name: '梅特涅', country: '奥地利', flag: '🇦🇹' },
      opponent: { name: '塔列朗', country: '法国', flag: '🇫🇷' },
    },
    topic: '拿破仑战争后欧洲秩序重建',
    background: {
      summary: '1814-1815年拿破仑战争结束后，欧洲主要国家在维也纳召开会议，重建拿破仑战争后的欧洲秩序。会议延续9个月，通过外交博弈建立了维也纳体系，维持了欧洲近百年的相对和平。',
      historicalContext: '拿破仑帝国崩溃后，欧洲面临权力真空。战胜国与战败国都需要通过外交谈判确定新的欧洲格局。英国、俄国、普鲁士、奥地利都想最大化自身利益。',
      keyInterests: {
        self: ['维护奥地利在德意志的领导地位', '保持欧洲均势', '压制法国复仇主义'],
        opponent: ['恢复法国大国地位', '限制反法同盟过度削弱法国', '获取领土补偿']
      },
      constraints: {
        self: ['俄国势力扩张威胁', '普鲁士野心', '英法可能联手'],
        opponent: ['战败国地位限制', '需要盟友支持', '国内民族主义压力']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '大国博弈',
          summary: '俄、普、英、奥四国在战后安排上展开激烈争论。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '提出"正统主义"原则',
              language: '合法的君主制应当恢复，这是欧洲稳定的基石。',
              analysis: '塔列朗以意识形态话语挑战战胜国瓜分方案，获得道德制高点。'
            },
            {
              speaker: 'self',
              action: '组建四国同盟',
              language: '欧洲均势需要我们共同维护，任何单一大国都不能主导。',
              analysis: '梅特涅通过外交联盟平衡俄国扩张野心。'
            }
          ]
        },
        {
          name: '达成妥协',
          summary: '各方在领土分配和势力范围上达成历史性共识。',
          keyMoments: [
            {
              speaker: 'self',
              action: '同意领土交换',
              language: '为了欧洲的长久和平，我们愿意做出领土调整。',
              analysis: '梅特涅展现务实态度，用小让步换取大局稳定。'
            },
            {
              speaker: 'opponent',
              action: '接受和平安排',
              language: '法国将尊重新的欧洲秩序，这是我们共同的选择。',
              analysis: '塔列朗成功让法国以体面方式重新融入欧洲体系。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'success',
      score: 70,
      agreement: '建立维也纳体系，通过"正统主义"、"补偿原则"和"势力均衡"三大原则重塑欧洲版图，恢复法国到1792年边界，设立莱茵联邦和德意志邦联。',
      keyTerms: ['正统主义', '势力均衡', '集体安全'],
      consequences: '维也纳体系维持了欧洲近百年的和平，直到一战爆发。它开创了大国协调（Concert of Europe）的外交模式。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '意识形态包装',
          description: '用"正统主义"等抽象原则为实际利益服务。',
          example: '合法性是欧洲秩序的基石，而不是实力的简单较量。'
        },
        {
          name: '多边平衡',
          description: '通过组建联盟来平衡最强大的一方。',
          example: '任何一方的过度扩张都会威胁整个体系的稳定。'
        }
      ],
      keyPhrases: [
        { phrase: '势力均衡', meaning: '通过制度设计防止单一大国主导', usage: '维护国际秩序的核心原则' },
        { phrase: '大国协调', meaning: '主要大国通过协商处理国际事务', usage: '多极外交的雏形概念' }
      ]
    },
    lessons: [
      '战后安排需要平衡各方利益才能持久',
      '意识形态原则可以为实际利益服务',
      '大国协调机制是维持国际稳定的重要手段',
      '给予战败国体面退出有利于长期稳定'
    ],
    sources: [
      'Henry Kissinger, "A World Restored: Metternich, Castlereagh and the Problems of Peace 1812-1822"',
      'E. H. Carr, "The Twenty Years\' Crisis"'
    ]
  },
  {
    id: 'versailles-1919',
    name: '巴黎和会与凡尔赛条约',
    year: 1919,
    parties: {
      self: { name: '克列孟梭', country: '法国', flag: '🇫🇷' },
      opponent: { name: '威尔逊', country: '美国', flag: '🇺🇸' },
    },
    topic: '一战后德国问题与欧洲秩序重塑',
    background: {
      summary: '1919年巴黎和会，一战战胜国就德国赔款、领土划分和国际秩序展开激烈博弈。最终签订的凡尔赛条约在严厉惩罚德国与建立持久和平之间摇摆，留下复杂的历史遗产。',
      historicalContext: '一战造成巨大伤亡，法国损失惨重。各国对德国战后安排存在根本分歧：法国要求严厉惩罚，美国倡导温和的"十四点原则"，英国则在大西洋两岸平衡。',
      keyInterests: {
        self: ['获得最大赔偿', '削弱德国', '确保法国安全'],
        opponent: ['传播美国影响力', '建立国际联盟', '贸易机会']
      },
      constraints: {
        self: ['国内经济利益', '战争债务问题', '英美合作需求'],
        opponent: ['国内孤立主义', '道德形象维护', '金融资本利益']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '原则之争',
          summary: '各国就战后安排的基本原则展开辩论。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '提出十四点和平纲领',
              language: '我们的和平应当建立在正义的基础上，而不是单纯的报复。',
              analysis: '威尔逊以道德话语挑战欧洲传统强权政治。'
            },
            {
              speaker: 'self',
              action: '坚持安全优先',
              language: '正义必须首先考虑法国的安全，这是和平的前提。',
              analysis: '克列孟梭强调法国在战争中的牺牲和现实需要。'
            }
          ]
        },
        {
          name: '妥协与折中',
          summary: '各方在德国赔款和边界问题上艰难达成协议。',
          keyMoments: [
            {
              speaker: 'self',
              action: '接受有限让步',
              language: '为了英美的合作，我们愿意在赔款数额上做出调整。',
              analysis: '克列孟梭在现实压力下做出妥协，但仍保持对德国的主要优势。'
            },
            {
              speaker: 'opponent',
              action: '同意组建国联',
              language: '国际联盟将是我们集体安全的保障，法国可以放心。',
              analysis: '威尔逊以国联承诺换取法国在领土问题上的让步。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'partial',
      score: 25,
      agreement: '德国失去13%领土，支付2260亿金马克赔款，军队限制在10万人内。莱茵兰非军事化，阿尔萨斯-洛林归还法国。',
      keyTerms: ['民族自决', '集体安全', '战争赔款'],
      consequences: '凡尔赛条约被德国视为屈辱，为二战埋下伏笔。条约既未能安抚法国安全关切，也未能建立有效的集体安全机制。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '道德话语建构',
          description: '用理想主义语言包装实际利益诉求。',
          example: '我们的原则不是力量的博弈，而是正义的胜利。'
        },
        {
          name: '让步置换',
          description: '在一个议题上让步以换取另一议题的收益。',
          example: '我们可以在赔款数额上讨论，但安全安排不能妥协。'
        }
      ],
      keyPhrases: [
        { phrase: '十四点原则', meaning: '威尔逊提出的战后和平纲领', usage: '理想主义外交的代表话语' }
      ]
    },
    lessons: [
      '过度惩罚战败国可能适得其反',
      '理想主义与现实主义的平衡至关重要',
      '没有有效执行机制的协议难以持久',
      '国内政治对外交政策有深刻影响'
    ],
    sources: [
      'Margaret MacMillan, "Paris 1919: Six Months That Changed the World"',
      'John Maynard Keynes, "The Economic Consequences of the Peace"'
    ]
  },
  {
    id: 'munich-1938',
    name: '慕尼黑协定',
    year: 1938,
    parties: {
      self: { name: '张伯伦', country: '英国', flag: '🇬🇧' },
      opponent: { name: '希特勒', country: '德国', flag: '🇩🇪' },
    },
    topic: '苏台德地区问题与绥靖政策',
    background: {
      summary: '1938年9月，英法德意四国首脑在慕尼黑签署协定，同意德国吞并捷克斯洛伐克的苏台德地区。张伯伦宣称带来了"我们时代的和平"，但绥靖政策最终加速了二战的爆发。',
      historicalContext: '纳粹德国扩张野心日益明显。张伯伦试图通过让步避免战争，同时争取时间重整军备。法国盟友立场动摇，捷克斯洛伐克被排除在谈判之外。',
      keyInterests: {
        self: ['避免战争', '维护英法团结', '争取重整军备时间'],
        opponent: ['消除捷克斯洛伐克威胁', '巩固德国在中欧的地位', '试探西方底线']
      },
      constraints: {
        self: ['国内和平主义', '军备不足', '法国盟友态度'],
        opponent: ['内部清洗刚结束', '经济压力', '西方可能的干预']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '压力升级',
          summary: '德国对捷克斯洛伐克施加军事压力。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '提出民族自决要求',
              language: '苏台德的日耳曼人有权决定自己的命运，这是不可剥夺的权利。',
              analysis: '希特勒以民族主义话语包装扩张野心。'
            },
            {
              speaker: 'self',
              action: '寻求妥协方案',
              language: '我们必须找到一个双方都能接受的方案，以避免灾难。',
              analysis: '张伯伦试图通过外交手段化解危机。'
            }
          ]
        },
        {
          name: '慕尼黑峰会',
          summary: '在慕尼黑举行的英德法意四国会议。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '接受领土让步',
              language: '这是我最后一次领土要求，英国可以放心。',
              analysis: '希特勒暂时满足于获取苏台德地区。'
            },
            {
              speaker: 'self',
              action: '带回"和平协议"',
              language: '我相信我们赢得了和平，我请你们回去睡一个安稳觉。',
              analysis: '张伯伦将绥靖视为外交胜利。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'failure',
      score: -80,
      agreement: '德国获得苏台德地区，英法保证捷克斯洛伐克新边界不受攻击。捷克斯洛伐克代表被排除在谈判之外。',
      keyTerms: ['绥靖政策', '民族自决', '势力均衡'],
      consequences: '慕尼黑协定被普遍视为外交失败。希特勒半年后吞并剩余捷克，二战随后爆发。绥靖政策成为外交史上的反面教材。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '语言欺骗',
          description: '使用含糊承诺为后续违约留有余地。',
          example: '这是我们时代的和平，不需要进一步讨论了。'
        },
        {
          name: '排他性谈判',
          description: '将关键利益相关方排除在谈判之外。',
          language: '这不是一个需要捷克人参加的会议。'
        }
      ],
      keyPhrases: [
        { phrase: '我们时代的和平', meaning: '张伯伦对慕尼黑协定的评价', usage: '成为外交失败的代名词' }
      ]
    },
    lessons: [
      '绥靖政策不能阻止侵略者，只会鼓励其进一步扩张',
      '将关键利益相关方排除在谈判之外是危险的做法',
      '含糊的外交承诺可能比明确拒绝更有害',
      '国内政治压力不应主导外交政策'
    ],
    sources: [
      'Keith Robbins, "Appeasement"',
      'Ian Kershaw, "To Hell and Back: Europe 1914-1949"'
    ]
  },
  {
    id: 'yalta-1945',
    name: '雅尔塔会议',
    year: 1945,
    parties: {
      self: { name: '斯大林', country: '苏联', flag: '☭' },
      opponent: { name: '罗斯福', country: '美国', flag: '🇺🇸' },
    },
    topic: '战后世界秩序与势力范围划分',
    background: {
      summary: '1945年2月，美英苏三国首脑在雅尔塔会晤，讨论战后世界安排。这是二战结束前最后一次三巨头会议，对战后欧洲格局、联合国框架和亚洲局势做出了具有历史意义的决定。',
      historicalContext: '欧洲战场胜利在望，盟国需要协调战后安排。斯大林拥有强大军事优势，罗斯福希望苏联参与对日作战，丘吉尔关注英国战后地位。',
      keyInterests: {
        self: ['确保苏联安全', '扩大势力范围', '获得战后重建资源'],
        opponent: ['战后经济恢复', '联合国框架建立', '苏联对日参战']
      },
      constraints: {
        self: ['军事实力基础', '西方联盟维持', '国内政治考量'],
        opponent: ['国内孤立主义残余', '英国传统势力范围', '中国局势']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '势力范围谈判',
          summary: '就东欧国家未来走向展开讨论。',
          keyMoments: [
            {
              speaker: 'self',
              action: '坚持势力范围',
              language: '苏联在东欧的安全关切是不容谈判的，这是我们的底线。',
              analysis: '斯大林在东欧问题上寸步不让。'
            },
            {
              speaker: 'opponent',
              action: '寻求程序正义',
              language: '东欧国家可以通过自由选举决定自己的命运。',
              analysis: '罗斯福试图为西方影响力保留空间。'
            }
          ]
        },
        {
          name: '亚洲协议',
          summary: '就苏联对日作战条件达成秘密协议。',
          keyMoments: [
            {
              speaker: 'self',
              action: '提出参战条件',
              language: '苏联参战需要明确的条件：千岛群岛、南库页岛、以及对中国东北的控制权。',
              analysis: '斯大林以对日作战换取实际利益。'
            },
            {
              speaker: 'opponent',
              action: '接受苏联条件',
              language: '为了尽快结束战争，这些条件是可以接受的。',
              analysis: '罗斯福为换取苏联参战做出重大让步。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'partial',
      score: 55,
      agreement: '德国被分区占领，苏联在东欧获得事实上的势力范围。联合国安理会五大国拥有否决权。苏联获得对日参战条件。',
      keyTerms: ['势力均衡', '大国一致', '雅尔塔密约'],
      consequences: '雅尔塔协议奠定了战后冷战格局的基础。东欧国家虽名义独立，实际成为苏联势力范围。秘密条款后来成为东西方争议焦点。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '密约外交',
          description: '通过秘密协议避免国内政治和舆论压力。',
          example: '这些条款可以暂时保密，等待合适时机公布。'
        },
        {
          name: '条件捆绑',
          description: '将多个议题打包谈判，互相置换利益。',
          example: '在这个议题上的让步可以换取另一个议题上的主动权。'
        }
      ],
      keyPhrases: [
        { phrase: '大国一致', meaning: '大国在重大国际事务上拥有决定权', usage: '联合国安理会机制的核心理念' }
      ]
    },
    lessons: [
      '大国密约可能损害小国利益',
      '军事实力是谈判桌上最重要的筹码',
      '战后安排需要考虑执行可行性',
      '秘密协议长期来看往往难以保密'
    ],
    sources: [
      'Dimitri Volkogonov, "Truman and Stalin in War and Peace"',
      'Gabriel Kolko, "The Politics of War: The World and United States Foreign Policy, 1943-1945"'
    ]
  },
  {
    id: 'korean-armistice-1953',
    name: '朝鲜停战谈判',
    year: 1953,
    parties: {
      self: { name: '乔埃', country: '联合国军', flag: '🇺🇳' },
      opponent: { name: '南日', country: '朝鲜/中国', flag: '🇰🇵' },
    },
    topic: '朝鲜战争停火与边界划分',
    background: {
      summary: '1953年7月，历时两年的朝鲜停战谈判终于在板门店达成协议。战争双方在三八线附近停火，建立了非军事区。这是冷战时期第一次通过谈判而非武力结束大规模战争。',
      historicalContext: '朝鲜战争陷入僵局，双方都在三八线附近对峙。中朝方面军事优势难以转化为决定性胜利，联合国军也无力北推。新领导人艾森豪威尔上任后寻求体面结束战争。',
      keyInterests: {
        self: ['避免无休止战争', '维护联合国军体面撤退', '保护韩国'],
        opponent: ['巩固现有成果', '避免美军介入扩大', '获得国际承认']
      },
      constraints: {
        self: ['韩国李承晚反对', '国内政治压力', '盟友协调'],
        opponent: ['苏联支持条件', '中国战略考量', '停战条件内部争议']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '战俘问题僵局',
          summary: '停火原则已达成一致，但战俘问题成为主要障碍。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '坚持全部遣返',
              language: '战俘遣返是停火的基本前提，这是不可妥协的原则。',
              analysis: '中朝方面最初坚持全部遣返原则。'
            },
            {
              speaker: 'self',
              action: '提出"自愿遣返"',
              language: '战俘有权选择去向，这是人道主义的基本要求。',
              analysis: '联合国方面通过"自愿遣返"原则分化战俘阵营。'
            }
          ]
        },
        {
          name: '最终突破',
          summary: '双方在战俘问题上找到妥协方案。',
          keyMoments: [
            {
              speaker: 'self',
              action: '接受间接方案',
              language: '对于不愿遣返的战俘，可以暂时移交中立国处理。',
              analysis: '联合国方面展现出灵活性。'
            },
            {
              speaker: 'opponent',
              action: '同意停火协议',
              language: '停火协定将维护我们的基本利益，这是可以接受的结果。',
              analysis: '中朝方面在苏联压力下接受妥协。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'partial',
      score: 35,
      agreement: '沿三八线设立非军事区，双方各自后撤2公里。战俘问题通过"自愿遣返"原则解决。签署永久停火协定，而非和平条约。',
      keyTerms: ['停火协定', '非军事区', '自愿遣返'],
      consequences: '朝鲜半岛分裂延续至今。停战而非终战使该地区始终处于技术上的战争状态。协议为后续外交谈判奠定基础，但核心问题未解决。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '原则包装',
          description: '将实际让步包装为原则性立场。',
          example: '这正是人道主义的体现，让人们有权选择自己的命运。'
        },
        {
          name: '议题分离',
          description: '将复杂问题分解处理，避免全面僵局。',
          example: '停火原则和战俘问题可以分开讨论，不必捆绑。'
        }
      ],
      keyPhrases: [
        { phrase: '自愿遣返', meaning: '战俘有权选择去向而非强制遣返', usage: '解决战俘问题的创造性方案' }
      ]
    },
    lessons: [
      '军事僵局往往催生外交谈判',
      '战俘问题可以用创造性方案解决',
      '停火协定与和平条约有本质区别',
      '盟友内部的协调对外交谈判至关重要'
    ],
    sources: [
      'William Blum, "Korea: The Untold Story"',
      'Allen Whiting, "China Crosses the Yalu"'
    ]
  },
  {
    id: 'nixon-china-1972',
    name: '尼克松访华',
    year: 1972,
    parties: {
      self: { name: '尼克松', country: '美国', flag: '🇺🇸' },
      opponent: { name: '周恩来', country: '中国', flag: '🇨🇳' },
    },
    topic: '中美关系正常化',
    background: {
      summary: '1972年2月，美国总统尼克松访问中国，与毛泽东、周恩来举行历史性会晤。这次访问结束了中美23年的隔绝状态，开启了两国关系正常化进程，对冷战格局产生深远影响。',
      historicalContext: '中美长期处于敌对状态。尼克松出于地缘战略考量，希望联华制苏。中国也需要打破外交孤立，应对苏联威胁。双方通过巴基斯坦渠道秘密接触数月后敲定访问。',
      keyInterests: {
        self: ['联华制苏', '从越战体面撤退', '打开中国市场'],
        opponent: ['打破外交孤立', '应对苏联威胁', '获取国际承认']
      },
      constraints: {
        self: ['国内反共情绪', '台湾盟友关系', '国会态度'],
        opponent: ['国内政治运动影响', '意识形态立场', '苏联反应']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '破冰之旅',
          summary: '尼克松访华全程高调但谈判内容低调。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '机场迎接',
              language: '你的握手越过世界上最广阔的海洋，这是我们25年来第一次交流。',
              analysis: '周恩来以诗意语言为这次历史性访问定调。'
            },
            {
              speaker: 'self',
              action: '展示访问意图',
              language: '我是来听而不是来谈的，我相信我们能够找到共同点。',
              analysis: '尼克松展现谦逊姿态，回应中方关切。'
            }
          ]
        },
        {
          name: '上海公报',
          summary: '双方发表具有历史意义的联合公报。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '坚持台湾立场',
              language: '台湾问题是中国的内政，世界上只有一个中国。',
              analysis: '中方在核心利益上不让步。'
            },
            {
              speaker: 'self',
              action: '接受公报措辞',
              language: '美国认识到，在台湾海峡两边的所有中国人都认为只有一个中国。',
              analysis: '尼克松用模糊措辞在维护台湾关系的同时向中方靠近。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'success',
      score: 75,
      agreement: '发表《上海公报》，美国承认一个中国原则，承诺从台湾撤军。中美建立联络处，为关系正常化奠定基础。',
      keyTerms: ['一个中国', '上海公报', '关系正常化'],
      consequences: '尼克松访华改变了冷战格局，促成中美苏战略三角的形成。7年后中美正式建交，中国改革开放获得国际空间。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '模糊措辞',
          description: '使用双关语让双方都能接受。',
          example: '所有中国人都认为只有一个中国——这个表述在技术上无可挑剔。'
        },
        {
          name: '议题分离',
          description: '将立即可解决与需要时间的问题分开处理。',
          example: '公报不需要解决所有问题，它只需要打开一扇门。'
        }
      ],
      keyPhrases: [
        { phrase: '一个中国', meaning: '承认中华人民共和国为中国唯一合法政府', usage: '中美关系正常化的政治基础' }
      ]
    },
    lessons: [
      '地缘战略利益可以超越意识形态分歧',
      '秘密外交渠道对于敏感突破至关重要',
      '公报措辞的灵活性可以为后续行动留有余地',
      '最高层直接参与可以突破官僚体系阻力'
    ],
    sources: [
      'Richard Nixon, "The Real War"',
      'Margaret MacMillan, "Nixon and Mao: The Week That Changed the World"'
    ]
  },
  {
    id: 'sino-british-hongkong-1984',
    name: '中英香港问题谈判',
    year: 1984,
    parties: {
      self: { name: '邓小平', country: '中国', flag: '🇨🇳' },
      opponent: { name: '撒切尔', country: '英国', flag: '🇬🇧' },
    },
    topic: '香港回归与"一国两制"框架',
    background: {
      summary: '1982年至1984年，中英两国就香港前途问题展开22轮谈判，最终签署《中英联合声明》，确认中国于1997年恢复对香港行使主权，英国同时交还香港治理权。谈判开创了"一国两制"的伟大构想。',
      historicalContext: '1997年租约即将到期，香港前途成为两国共同面临的重大问题。英国希望延续对港管治，中国坚持恢复主权。双方在主权与治权问题上存在根本分歧。',
      keyInterests: {
        self: ['恢复主权', '维护香港繁荣', '收回领土'],
        opponent: ['维护英国声誉', '保持香港经济利益', '体面撤退']
      },
      constraints: {
        self: ['收回台湾的长远考量', '国内民族主义', '香港民意'],
        opponent: ['香港民意', '国际形象', '国内政治']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '撒切尔访华',
          summary: '1982年撒切尔夫人访华，邓小平明确主权立场。',
          keyMoments: [
            {
              speaker: 'self',
              action: '明确主权不容讨论',
              language: '主权问题不是一个可以讨论的问题，1997年必须收回香港。',
              analysis: '邓小平用坚定语言划定谈判底线。'
            },
            {
              speaker: 'opponent',
              action: '提出"三个条约有效论"',
              language: '我们根据条约管治香港，这些条约在法律上仍然有效。',
              analysis: '撒切尔试图以国际法为基础争取延续管治权。'
            }
          ]
        },
        {
          name: '艰难谈判',
          summary: '就治权安排和制度保障展开长期磋商。',
          keyMoments: [
            {
              speaker: 'self',
              action: '提出一国两制',
              language: '香港回归后可以保持资本主义制度和生活方式，五十年不变。',
              analysis: '邓小平创造性提出一国两制解决制度差异问题。'
            },
            {
              speaker: 'opponent',
              action: '接受过渡安排',
              language: '在维护英国道义责任的前提下，我们愿意与中国合作。',
              analysis: '撒切尔接受现实，寻求体面解决方案。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'success',
      score: 80,
      agreement: '《中英联合声明》规定：中国于1997年恢复对香港行使主权，英国同时交还香港。香港保持资本主义制度和生活方式（高度自治）。',
      keyTerms: ['一国两制', '高度自治', '五十年不变'],
      consequences: '香港平稳回归祖国，一国两制从构想变为现实。谈判模式为澳门和未来台湾问题的解决提供了范本。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '议题锚定',
          description: '先确定不可动摇的原则，再讨论具体安排。',
          example: '主权问题不容讨论，这是大前提。'
        },
        {
          name: '创造性概念',
          description: '发明新概念化解根本矛盾。',
          example: '一国两制就是在一个中国框架下，允许两种制度并存。'
        }
      ],
      keyPhrases: [
        { phrase: '一国两制', meaning: '在一个国家内实行两种制度的创新安排', usage: '解决历史遗留问题的创造性方案' }
      ]
    },
    lessons: [
      '主权问题需要明确立场才能开展有效谈判',
      '创造性制度设计可以化解根本性矛盾',
      '照顾对方面子有助于达成协议',
      '长期规划需要短期灵活配合'
    ],
    sources: [
      'Chris Patten, "East and West"',
      "Jonathan Fenby, \"The Last Emperor: A Biography of Nixon's China Journey\""
    ]
  },
  {
    id: 'iran-nuclear-2015',
    name: '伊朗核问题全面协议',
    year: 2015,
    parties: {
      self: { name: '奥巴马', country: '美国', flag: '🇺🇸' },
      opponent: { name: '鲁哈尼', country: '伊朗', flag: '🇮🇷' },
    },
    topic: '核不扩散与制裁解除',
    background: {
      summary: '2015年7月，伊核问题六国（美英法俄中德）与伊朗在维也纳达成历史性协议（JCPOA），伊朗限制核计划以换取解除制裁。这是多边外交解决核扩散问题的里程碑。',
      historicalContext: '伊朗核计划引发国际社会担忧。以色列威胁军事打击，海湾国家要求限制伊朗。美国及其盟友通过制裁施压，同时寻求外交解决渠道。鲁哈尼当选后为谈判打开窗口。',
      keyInterests: {
        self: ['防止伊朗拥核', '维护中东盟友安全', '展示外交成就'],
        opponent: ['解除制裁', '维护核权利', '国际地位提升']
      },
      constraints: {
        self: ['以色列反对', '国会共和党反对', '海湾盟友关切'],
        opponent: ['国内强硬派', '核计划既得利益', '地区影响力竞争']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '日内瓦框架协议',
          summary: '2013年达成临时协议，为全面协议铺路。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '寻求制裁解除',
              language: '我们准备采取信任措施，作为交换，制裁应当部分解除。',
              analysis: '鲁哈尼展现灵活性，愿意做出有限让步。'
            },
            {
              speaker: 'self',
              action: '坚持核查机制',
              language: '任何协议都必须包含有效的国际核查机制。',
              analysis: '奥巴马强调协议的可验证性。'
            }
          ]
        },
        {
          name: '最终冲刺',
          summary: '在最后期限前达成全面协议。',
          keyMoments: [
            {
              speaker: 'self',
              action: '接受渐进解除',
              language: '制裁解除将分阶段进行，与核措施执行挂钩。',
              analysis: '美国接受"逐步解除"方案回应伊朗关切。'
            },
            {
              speaker: 'opponent',
              action: '确认和平用途',
              language: '伊朗核计划仅用于和平目的，这是我们一直坚持的立场。',
              analysis: '伊朗坚持其核权利的合法性。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'success',
      score: 60,
      agreement: '伊朗限制铀浓缩活动至5%，削减离心机数量，接受国际原子能机构核查。作为交换，西方逐步解除金融和石油制裁。',
      keyTerms: ['核不扩散', '制裁解除', '核查机制'],
      consequences: '协议暂时缓解了中东核紧张局势，但2018年美国单方面退出协议，伊核问题再次陷入僵局。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '渐进式让步',
          description: '通过分阶段协议降低谈判难度。',
          example: '让我们先从临时协议开始，逐步建立信任。'
        },
        {
          name: '技术性条款',
          description: '用复杂的核查机制设计增加协议可信度。',
          example: '我们需要确保每一个核设施都在国际监督之下。'
        }
      ],
      keyPhrases: [
        { phrase: '分阶段解除', meaning: '制裁解除与核措施执行进度挂钩', usage: '平衡各方关切的操作性安排' }
      ]
    },
    lessons: [
      '多边谈判需要平衡多方利益',
      '技术性条款可以增加协议可信度',
      '单边退出可能摧毁多边外交成果',
      '临时协议可以为全面协议创造条件'
    ],
    sources: [
      'Rolf K. Helgren, "The Iran Nuclear Negotiations"',
      'Mark Fitzpatrick, "The Iran Nuclear Crisis"'
    ]
  },
  {
    id: 'paris-climate-2015',
    name: '巴黎气候协定',
    year: 2015,
    parties: {
      self: { name: '奥朗德', country: '法国', flag: '🇫🇷' },
      opponent: { name: '习近平', country: '中国', flag: '🇨🇳' },
    },
    topic: '全球气候治理与温室气体减排',
    background: {
      summary: '2015年12月，196个国家在巴黎达成气候变化协定，同意将全球气温升幅控制在2摄氏度以内，并努力限制在1.5摄氏度。这是人类历史上第一个所有国家参与的全球气候协定。',
      historicalContext: '气候变暖威胁全人类。发达国家与发展中国家在减排责任上存在根本分歧。2009年哥本哈根会议失败后，各方通过双边协调重建信任，为巴黎协定铺路。',
      keyInterests: {
        self: ['维护法国气候领袖地位', '推动全球减排', '保护法语非洲'],
        opponent: ['维护发展权', '获取绿色技术转移', '建立气候领袖形象']
      },
      constraints: {
        self: ['国内经济压力', '农业利益集团', '执行能力'],
        opponent: ['经济发展阶段', '能源结构调整难度', '国际责任分担']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '元首外交',
          summary: '主要国家领导人直接参与推动协议。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '宣布碳排放峰值目标',
              language: '中国计划在2030年左右达到碳排放峰值，并力争尽早达峰。',
              analysis: '中国首次宣布排放峰值时间表，展现大国担当。'
            },
            {
              speaker: 'self',
              action: '协调各方立场',
              language: '巴黎必须成功，这是人类共同的命运所系。',
              analysis: '奥朗德以道义力量推动谈判。'
            }
          ]
        },
        {
          name: '最后时刻',
          summary: '在最后24小时解决关键分歧。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '与美国联合声明',
              language: '中美两国在气候问题上携手合作，将为全球减排做出历史性贡献。',
              analysis: '中美元首气候联合声明为协定定调。'
            },
            {
              speaker: 'self',
              action: '协调穷国关切',
              language: '发达国家将向发展中国家提供气候资金支持。',
              analysis: '气候融资机制解决发展中国家参与问题。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'success',
      score: 70,
      agreement: '所有国家提交自主贡献减排目标，建立全球盘点机制。发达国家承诺到2020年每年向发展中国家提供1000亿美元气候资金。',
      keyTerms: ['自主贡献', '2度目标', '气候资金'],
      consequences: '巴黎协定开创了全球气候治理的新模式，为《联合国气候变化框架公约》注入新活力。但执行力度与目标仍有差距。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '共同但有区别责任',
          description: '承认历史责任差异但不推卸共同义务。',
          example: '我们共同但有区别的责任，是这次谈判的核心原则。'
        },
        {
          name: '软性约束',
          description: '通过透明度机制而非强制惩罚实现目标。',
          example: '各国将每五年盘点一次进展，但不会有惩罚机制。'
        }
      ],
      keyPhrases: [
        { phrase: '国家自主贡献', meaning: '各国自行制定减排目标', usage: '灵活但缺乏强制性的承诺机制' }
      ]
    },
    lessons: [
      '全球性问题需要全人类共同参与',
      '大国协调是解决全球问题的关键',
      '软性机制比硬性惩罚更易被接受',
      '南北分歧可以通过"共同但有区别"原则化解'
    ],
    sources: [
      'Laurence Tubiana et al., "The Paris Agreement: A New Compact"',
      'Christophe Guilmoto & Geraldine Dübi, "Paris Climate Agreement"'
    ]
  },
  {
    id: 'us-north-korea-summit-2018',
    name: '美朝新加坡峰会',
    year: 2018,
    parties: {
      self: { name: '特朗普', country: '美国', flag: '🇺🇸' },
      opponent: { name: '金正恩', country: '朝鲜', flag: '🇰🇵' },
    },
    topic: '朝鲜半岛无核化',
    background: {
      summary: '2018年6月，特朗普与金正恩在新加坡举行历史性会晤，这是美国在任总统首次与朝鲜领导人直接会面。双方签署联合声明，但承诺的实质性内容有限，引发外界质疑。',
      historicalContext: '朝鲜核导计划威胁地区安全，国际制裁加码。特朗普"极限施压"政策与金正恩胞妹外交结合，促成了这次峰会。金正恩借此提升国际地位，特朗普寻求外交突破。',
      keyInterests: {
        self: ['获得诺贝尔和平奖', '展示外交能力', '降低核战争风险'],
        opponent: ['获得国际承认', '解除制裁', '政权安全保障']
      },
      constraints: {
        self: ['国内强硬派', '盟友韩国日本关切', '国会态度'],
        opponent: ['核计划既得利益', '军方压力', '国家安全需要']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '破冰互动',
          summary: '通过外交试探建立会面基础。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '释放积极信号',
              language: '我们愿意为地区和平做出努力，这是朝鲜人民的选择。',
              analysis: '金正恩通过冬奥运会平台向外界释放善意。'
            },
            {
              speaker: 'self',
              action: '接受邀请',
              language: '如果条件合适，我将与金正恩会面，那将是历史性的。',
              analysis: '特朗普以出人意料的方式接受会面邀请。'
            }
          ]
        },
        {
          name: '峰会成果',
          summary: '签署历史性联合声明。',
          keyMoments: [
            {
              speaker: 'self',
              action: '签署联合声明',
              language: '美国将提供安全保障，朝鲜承诺实现完全无核化。',
              analysis: '声明措辞模糊，缺乏具体时间表和核查机制。'
            },
            {
              speaker: 'opponent',
              action: '强调对等尊严',
              language: '这次会面是两个平等国家之间的对话。',
              analysis: '金正恩通过峰会获得与美对等的象征意义。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'partial',
      score: 20,
      agreement: '签署联合声明：美方提供安全保证，朝方承诺致力于实现半岛完全无核化。但未达成具体弃核时间表和核查机制。',
      keyTerms: ['完全无核化', '安全保障', '和平条约'],
      consequences: '峰会本身具有历史象征意义，但实质性进展有限。双方后续谈判陷入僵局，无核化进程停滞。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '戏剧性外交',
          description: '通过高调个人互动制造外交突破假象。',
          example: '我们立刻产生了化学反应，这是美好的关系。'
        },
        {
          name: '模糊承诺',
          description: '使用含糊表述避免具体约束。',
          example: '我们将努力实现完全无核化——但没有时间表。'
        }
      ],
      keyPhrases: [
        { phrase: '完全可逆', meaning: '无核化措施可以撤销如果对方违约', usage: '为不信任设置保险机制' }
      ]
    },
    lessons: [
      '峰会外交需要实质性内容支撑',
      '模糊承诺可能导致后续执行困难',
      '个人外交风格可能有助于建立信任',
      '盟友协调对外交成果至关重要'
    ],
    sources: [
      'Bob Woodward, "Fear: Trump in the White House"',
      'Victor Cha, "The Impossible State: North Korea, Past and Future"'
    ]
  },
  {
    id: 'rcep-2020',
    name: 'RCEP区域全面经济伙伴关系协定',
    year: 2020,
    parties: {
      self: { name: '李洛渊', country: '韩国', flag: '🇰🇷' },
      opponent: { name: '茂木敏充', country: '日本', flag: '🇯🇵' },
    },
    topic: '亚太区域贸易整合',
    background: {
      summary: '2020年11月，东盟十国与中国、日本、韩国、澳大利亚、新西兰正式签署区域全面经济伙伴关系协定（RCEP），建成全球最大的自由贸易区，覆盖约30%的全球GDP和人口。',
      historicalContext: '亚太地区贸易安排碎片化，中日韩之间缺乏自贸协定。RCEP在东盟主导下整合既有安排，以渐进方式实现亚太经贸整合。印度退出成为主要遗憾。',
      keyInterests: {
        self: ['拓展出口市场', '供应链整合', '经济一体化'],
        opponent: ['保护敏感产业', '获得规则制定权', '地缘经济竞争']
      },
      constraints: {
        self: ['农业保护', '政治敏感性', '国内产业压力'],
        opponent: ['敏感商品保护', '战略互信缺失', '域外大国反应']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '东盟中心',
          summary: '以东盟为核心整合亚太经贸安排。',
          keyMoments: [
            {
              speaker: 'self',
              action: '提出整合框架',
              language: 'RCEP将在现有ASEAN+1框架基础上进行整合，而不是推倒重来。',
              analysis: '东盟作为整合平台降低谈判难度。'
            },
            {
              speaker: 'opponent',
              action: '参与多边框架',
              language: '通过RCEP参与区域经济整合，符合日本的战略利益。',
              analysis: '日本在CPTPP之外寻求多元参与。'
            }
          ]
        },
        {
          name: '八年谈判',
          summary: '漫长的谈判过程终于修成正果。',
          keyMoments: [
            {
              speaker: 'self',
              action: '协调各方立场',
              language: 'RCEP的成功在于务实和包容，我们不追求最高标准，但追求最大共识。',
              analysis: '以渐进务实方式推动谈判。'
            },
            {
              speaker: 'opponent',
              action: '签署协定',
              language: 'RCEP将为区域供应链稳定和经济发展提供制度保障。',
              analysis: '中国通过RCEP展现区域经济领导力。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'success',
      score: 65,
      agreement: '建立亚太最大自由贸易区，成员国间90%以上货物贸易实现零关税。建立统一的原产地规则，便利区域供应链整合。',
      keyTerms: ['东盟中心', '渐进整合', '区域供应链'],
      consequences: 'RCEP将促进亚太区域经济一体化，提升中国在区域经济中的影响力。但印度退出使协定代表性有所欠缺。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '渐进整合',
          description: '不追求最高标准，而是寻求最大公约数。',
          example: 'RCEP不是终点，而是亚太经济一体化的新起点。'
        },
        {
          name: '议题搁置',
          description: '将敏感议题暂时排除，等待条件成熟。',
          example: '知识产权和劳工标准可以留待下次会议讨论。'
        }
      ],
      keyPhrases: [
        { phrase: '东盟方式', meaning: '以协商一致、渐进务实的方式推进区域合作', usage: '东盟主导的区域合作特色模式' }
      ]
    },
    lessons: [
      '渐进务实比激进方案更容易成功',
      '既有框架整合比新建框架更有效率',
      '域外大国的参与增加区域协定的复杂性',
      '印度因素对亚太贸易安排有重要影响'
    ],
    sources: [
      'Jane M. von Bernstorff & Philipp Gensch, "RCEP: A New Model for Trade in Asia?"',
      'Asian Development Bank Institute, "RCEP and Trade Policy Implications"'
    ]
  },
  {
    id: 'geneva-summit-1955',
    name: '日内瓦峰会',
    year: 1955,
    parties: {
      self: { name: '布尔加宁', country: '苏联', flag: '☭' },
      opponent: { name: '艾森豪威尔', country: '美国', flag: '🇺🇸' },
    },
    topic: '东西方首脑首次会晤',
    background: {
      summary: '1955年7月，苏联、美国、英国、法国四国首脑在日内瓦举行战后首次东西方最高级别会晤，讨论欧洲安全、裁军和促进东西方交流问题。这次峰会开启了冷战时期的"峰会外交"传统。',
      historicalContext: '冷战进入缓和期。斯大林去世后，赫鲁晓夫提出"和平共处"政策。西方希望通过首脑会晤了解苏联新领导层意图，同时展示实力。',
      keyInterests: {
        self: ['缓和国际紧张局势', '展示苏联和平意愿', '突破外交孤立'],
        opponent: ['了解苏联新领导意图', '展示西方团结', '探索裁军可能']
      },
      constraints: {
        self: ['国内保守派压力', '东欧盟友关切', '意识形态对立'],
        opponent: ['国会共和党反对', '北约盟友协调', '麦卡锡主义残余']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '峰会筹备',
          summary: '各方就会议议程和形式展开讨论。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '表达对话意愿',
              language: '我们必须通过对话而非对抗来解决分歧。',
              analysis: '艾森豪威尔展现缓和姿态。'
            },
            {
              speaker: 'self',
              action: '提出和平倡议',
              language: '苏联愿意与西方国家和平共处，这是我们的基本政策。',
              analysis: '赫鲁晓夫通过和平话语改善苏联国际形象。'
            }
          ]
        },
        {
          name: '峰会举行',
          summary: '四国首脑就关键议题交换意见。',
          keyMoments: [
            {
              speaker: 'self',
              action: '提出裁军建议',
              language: '我们建议全面裁军，建立有效的国际监督机制。',
              analysis: '苏联提出道义制高点倡议。'
            },
            {
              speaker: 'opponent',
              action: '提出"开放天空"',
              language: '我们建议东西方相互开放天空，建立信任措施。',
              analysis: '艾森豪威尔提出具体信任建设措施。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'partial',
      score: 30,
      agreement: '会议未达成具体协议，但确立了"和平共处"原则，同意继续通过外交途径解决争端。为后续首脑会晤奠定基础。',
      keyTerms: ['和平共处', '首脑外交', '峰会机制'],
      consequences: '日内瓦峰会开启了冷战时期的峰会外交传统，缓解了东西方紧张关系，为后续戴维营会谈和厨房辩论创造条件。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '道义制高点',
          description: '提出对方难以拒绝的道德倡议。',
          example: '和平是人类共同的愿望，我们应当为此共同努力。'
        }
      ],
      keyPhrases: [
        { phrase: '和平共处', meaning: '不同社会制度国家间和平竞争而非战争', usage: '苏联外交政策的核心概念' }
      ]
    },
    lessons: [
      '峰会外交可以缓解紧张局势但不解决根本分歧',
      '道义倡议可以赢得国际舆论支持',
      '具体信任建设措施比抽象原则更有意义'
    ],
    sources: [
      'John Foster Dulles, "War or Peace"',
      'Cold War International History Project'
    ]
  },
  {
    id: 'suez-crisis-1956',
    name: '苏伊士运河危机谈判',
    year: 1956,
    parties: {
      self: { name: '纳赛尔', country: '埃及', flag: '🇪🇬' },
      opponent: { name: '艾登', country: '英国', flag: '🇬🇧' },
    },
    topic: '苏伊士运河国有化与英法撤军',
    background: {
      summary: '1956年7月，埃及宣布苏伊士运河国有化，英法两国联合以色列发动军事行动。在美国压力下，英法被迫接受停火撤军，纳赛尔取得外交胜利。这次危机标志着英法殖民主义的终结。',
      historicalContext: '埃及长期受西方控制，苏伊士运河由英法控制。纳赛尔上台后寻求完全独立，宣布国有化运河以筹集资金建造阿斯旺水坝。英法不甘利益受损，决定以军事手段解决。',
      keyInterests: {
        self: ['维护国家主权', '获得运河全部收益', '摆脱西方控制'],
        opponent: ['维护运河控制权', '保护在中东的战略利益', '遏制阿拉伯民族主义']
      },
      constraints: {
        self: ['军事实力悬殊', '国内经济困难', '需要阿拉伯世界支持'],
        opponent: ['美国反对', '国内政治压力', '国际舆论谴责']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '运河国有化',
          summary: '埃及单方面行动引发西方强烈反应。',
          keyMoments: [
            {
              speaker: 'self',
              action: '宣布国有化',
              language: '苏伊士运河是埃及的财产，我们将用它为人民谋福利。',
              analysis: '纳赛尔以民族主义话语凝聚国内支持。'
            },
            {
              speaker: 'opponent',
              action: '威胁军事干预',
              language: '埃及的行为是不可接受的，我们保留采取一切必要行动的权利。',
              analysis: '英法试图以武力威胁迫使埃及让步。'
            }
          ]
        },
        {
          name: '军事冲突与外交解决',
          summary: '军事行动遭美国反对，被迫接受停火。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '联合军事行动',
              language: '我们必须保护运河安全和我们的合法权益。',
              analysis: '英法以保护公民为借口发动军事行动。'
            },
            {
              speaker: 'self',
              action: '寻求国际支持',
              language: '我们向联合国安理会控诉西方侵略，要求立即撤军。',
              analysis: '纳赛尔成功将问题国际化，获得道义支持。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'success',
      score: 70,
      agreement: '英法以军在国际压力下撤出埃及，以色列也从西奈半岛撤军。埃及保持对运河的国有化权。',
      keyTerms: ['运河国有化', '殖民主义终结', '联合国维和'],
      consequences: '苏伊士危机是英国衰落的转折点，标志着老牌殖民帝国无力维持海外殖民地。美国取代英法成为西方世界领袖。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '国际化策略',
          description: '将双边争议提交国际组织，争取道义支持。',
          example: '这不是埃及和英法之间的问题，而是侵略者与被侵略者的问题。'
        }
      ],
      keyPhrases: [
        { phrase: '反殖民主义', meaning: '反对外国控制和剥削的运动', usage: '第三世界国家的外交话语武器' }
      ]
    },
    lessons: [
      '军事手段无法解决政治问题',
      '美国态度是西方外交政策的关键变量',
      '将争议国际化可以获得道义优势和外部支持'
    ],
    sources: [
      'Keith Kyle, "Suez"',
      'James Barron, "The Suez Crisis"'
    ]
  },
  {
    id: 'berlin-wall-1961',
    name: '柏林墙建设与美苏博弈',
    year: 1961,
    parties: {
      self: { name: '赫鲁晓夫', country: '苏联', flag: '☭' },
      opponent: { name: '肯尼迪', country: '美国', flag: '🇺🇸' },
    },
    topic: '柏林问题与冷战对峙',
    background: {
      summary: '1961年8月，苏联和东德在东柏林边界开始修建柏林墙，切断东西柏林间的人员流动。肯尼迪政府经过激烈辩论后决定不武力阻止，接受既成事实，但通过增兵和强硬表态维护了美国威望。',
      historicalContext: '战后德国分裂，大批东德人通过柏林逃往西方。赫鲁晓夫试图通过最后通牒迫使西方承认西柏林为独立实体，失败后转而建造柏林墙阻止人口外流。',
      keyInterests: {
        self: ['阻止人才外流', '巩固东德政权', '测试西方决心'],
        opponent: ['维护西柏林通道', '展示美国承诺', '避免直接军事冲突']
      },
      constraints: {
        self: ['东德政权稳定', '苏联国际形象', '西方可能军事反应'],
        opponent: ['军事实力对比', '北约盟友立场', '国内政治压力']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '最后通牒',
          summary: '苏联向西方提出解决柏林问题的最后通牒。',
          keyMoments: [
            {
              speaker: 'self',
              action: '提出最后通牒',
              language: '我们要求西方在六个月内解决柏林问题，否则将单方面采取行动。',
              analysis: '赫鲁晓夫试图以时间压力迫使西方让步。'
            },
            {
              speaker: 'opponent',
              action: '断然拒绝',
              language: '西方不会从西柏林撤退，这是我们的坚定立场。',
              analysis: '肯尼迪在强硬派压力下明确表态。'
            }
          ]
        },
        {
          name: '柏林墙建设',
          summary: '苏联转向建造柏林墙而非武力解决。',
          keyMoments: [
            {
              speaker: 'self',
              action: '开始建墙',
              language: '我们不得不用铁丝网和墙壁来阻止非法越境。',
              analysis: '苏联以控制人口流动替代挑战西方地位。'
            },
            {
              speaker: 'opponent',
              action: '增兵表态',
              language: '我们将增派军队到西柏林，履行对盟国的承诺。',
              analysis: '肯尼迪以增兵而非战争来维护美国信誉。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'partial',
      score: 40,
      agreement: '柏林墙建成，东西柏林分治格局固定。西柏林保持通道畅通，但东德获得人口流动控制。',
      keyTerms: ['柏林墙', '分治格局', '势力范围'],
      consequences: '柏林墙成为冷战象征，有效阻止了东德人口外流。危机虽以妥协结束，但苏联放弃了单方面改变现状的企图。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '替代方案',
          description: '放弃高风险方案转而采取可控措施。',
          example: '与其冒险与西方开战，不如用墙壁解决问题。'
        },
        {
          name: '象征性回应',
          description: '用象征性行动而非实质行动回应国内政治压力。',
          example: '增兵西柏林不是战争准备，而是对盟友的承诺。'
        }
      ],
      keyPhrases: [
        { phrase: '我是柏林人', meaning: '美国对西柏林安全的坚定承诺', usage: '肯尼迪的标志性演讲' }
      ]
    },
    lessons: [
      '强权博弈中的"不"比"战争"更难说出口',
      '替代方案可以避免直接军事冲突',
      '象征性行动可以满足国内政治需求而不升级冲突'
    ],
    sources: [
      'Frederick Kempe, "Berlin 1961"',
      'John Lewis Gaddis, "The Cold War"'
    ]
  },
  {
    id: 'laotian-1962',
    name: '老挝中立协议',
    year: 1962,
    parties: {
      self: { name: '富马亲王', country: '老挝', flag: '🇱🇦' },
      opponent: { name: '苏发努冯', country: '巴特寮', flag: '☭' },
    },
    topic: '老挝和平中立与大国博弈',
    background: {
      summary: '1962年，各派在日内瓦签署协议，承认老挝中立地位，建立联合政府。这是冷战时期小国在大国夹缝中争取生存的典型案例，也是美国首次接受共产党参与多党政府。',
      historicalContext: '老挝内战持续，美国支持右翼政府，苏联和北越支持巴特寮。肯尼迪政府不愿在东南亚陷入更深的地面战，决定推动中立化方案。',
      keyInterests: {
        self: ['维护王室权威', '避免内战全面爆发', '获得国际承认'],
        opponent: ['获得合法地位', '保留武装力量', '扩大政治影响']
      },
      constraints: {
        self: ['美国军事援助依赖', '国内派系斗争', '北越影响'],
        opponent: ['北越战略需要', '内部路线分歧', '国际压力']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '三方谈判',
          summary: '老挝三派在日内瓦展开艰难谈判。',
          keyMoments: [
            {
              speaker: 'self',
              action: '提出中立方案',
              language: '老挝既不加入东方阵营也不加入西方阵营，我们应当成为和平中立国。',
              analysis: '富马亲王寻求在大国间保持平衡。'
            },
            {
              speaker: 'opponent',
              action: '参与联合政府',
              language: '我们可以接受中立，但必须确保我们的政治和安全权利。',
              analysis: '巴特寮接受有限妥协以获得合法地位。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'partial',
      score: 35,
      agreement: '签署老挝中立宣言，建立由三派组成的联合政府。外部国家承诺尊重老挝中立，不在其领土设立军事基地。',
      keyTerms: ['中立化', '联合政府', '大国保证'],
      consequences: '协议很快被打破，老挝内战继续。但这一案例表明，小国可以通过大国担保争取中立地位。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '中立话语',
          description: '以不结盟来避免选边站队。',
          example: '我们既不站在东方也不站在西方，我们站在老挝人民一边。'
        }
      ],
      keyPhrases: [
        { phrase: '中立国地位', meaning: '不参与军事集团的外交地位', usage: '小国在大国博弈中的生存策略' }
      ]
    },
    lessons: [
      '小国可以通过中立化在大国间求生',
      '没有执行机制的协议难以持久',
      '内部冲突往往比外部干预更难解决'
    ],
    sources: [
      'Timothy N. K. Townsend, "The Laos Crisis"',
      'Arthur Dommen, "The Indochinese Experience"'
    ]
  },
  {
    id: 'domino-theory-vietnam-1964',
    name: '北部湾事件与越战升级',
    year: 1964,
    parties: {
      self: { name: '约翰逊', country: '美国', flag: '🇺🇸' },
      opponent: { name: '胡志明', country: '北越', flag: '🇻🇳' },
    },
    topic: '北部湾事件与战争决策',
    background: {
      summary: '1964年8月，美国声称北部湾发生北越攻击美舰事件，借此推动国会通过北部湾决议，授权总统对越南采取军事行动。这是美国全面介入越战的关键转折点。',
      historicalContext: '美国担心东南亚"多米诺骨牌"效应，担心共产党在该地区扩张。约翰逊面临国内强硬派压力，需要借口升级军事介入。',
      keyInterests: {
        self: ['阻止共产党扩张', '维护美国信誉', '避免显得软弱'],
        opponent: ['统一越南', '抵抗美国干预', '获得苏联和中国援助']
      },
      constraints: {
        self: ['国内反战情绪', '盟友支持有限', '军事胜利不可行'],
        opponent: ['军事实力差距', '南方抵抗', '大国支持不确定性']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '北部湾事件',
          summary: '美国以所谓"攻击"事件为由推动战争授权。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '否认攻击',
              language: '北越舰艇从未攻击美国军舰，这是美国的谎言。',
              analysis: '越方否认指责，但无法改变美国国内舆论。'
            },
            {
              speaker: 'self',
              action: '要求国会授权',
              language: '美国船只遭到无端攻击，我们必须准备采取一切必要措施。',
              analysis: '约翰逊利用事件推动国会授权。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'failure',
      score: -70,
      agreement: '国会通过北部湾决议，授权总统"采取一切必要措施"保护东南亚地区。美国随后大规模增兵越南。',
      keyTerms: ['北部湾决议', '战争授权', '多米诺理论'],
      consequences: '美国陷入越战泥潭长达十年，最终在1975年撤出。越战对美国内政外交产生深远影响。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '事件塑造',
          description: '通过操控叙事来获得政治授权。',
          example: '我们的船只遭到攻击，美国必须做出回应。'
        }
      ],
      keyPhrases: [
        { phrase: '多米诺理论', meaning: '一个国家倒向共产党将导致邻国相继倒下的理论', usage: '美国干预政策的理论依据' }
      ]
    },
    lessons: [
      '基于错误信息的外交决策可能导致灾难',
      '国内政治压力可能导致过度反应',
      '军事介入往往比撤出更容易'
    ],
    sources: [
      'Ronald Frankum, "The United States and the Vietnam War"',
      'Graham Allison, "Essence of Decision"'
    ]
  },
  {
    id: 'prague-spring-1968',
    name: '布拉格之春与苏联干预',
    year: 1968,
    parties: {
      self: { name: '杜布切克', country: '捷克斯洛伐克', flag: '🇨🇿' },
      opponent: { name: '勃列日涅夫', country: '苏联', flag: '☭' },
    },
    topic: '布拉格之春改革与苏联"有限主权论"',
    background: {
      summary: '1968年，捷克斯洛伐克共产党推行"带有人性面孔的社会主义"改革，尝试摆脱苏联控制。苏联在拒绝谈判后，联合华约国家军事入侵布拉格，结束了布拉格之春。',
      historicalContext: '斯大林时代结束后，东欧国家出现离心倾向。杜布切克的改革威胁到苏联在东欧的统治地位，苏联担心改革会产生示范效应。',
      keyInterests: {
        self: ['改革苏联模式', '获得更多自主权', '探索"第三条道路"'],
        opponent: ['维护华约团结', '防止东欧失控', '保护苏联核心利益']
      },
      constraints: {
        self: ['苏联军事压力', '国内保守派反对', '盟友态度'],
        opponent: ['国际舆论谴责', '中国批评', '西方反应']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '改革与警告',
          summary: '捷克斯洛伐克推行改革，苏联发出警告。',
          keyMoments: [
            {
              speaker: 'self',
              action: '推行改革',
              language: '我们需要在社会主义框架内进行改革，这是我们的内部事务。',
              analysis: '杜布切克试图在苏联容忍范围内推进改革。'
            },
            {
              speaker: 'opponent',
              action: '发出最后警告',
              language: '你们正在走危险的道路，这将损害社会主义阵营的团结。',
              analysis: '苏联试图通过外交压力阻止改革。'
            }
          ]
        },
        {
          name: '军事干预',
          summary: '苏联决定军事入侵以阻止改革。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '军事入侵',
              language: '我们不得不出兵保护社会主义成果，防止反革命复辟。',
              analysis: '苏联以"保护社会主义成果"为借口进行军事干预。'
            },
            {
              speaker: 'self',
              action: '呼吁和平',
              language: '我们不号召人民抵抗外国占领，我们呼吁保持冷静。',
              analysis: '杜布切克选择政治斗争而非武装抵抗。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'failure',
      score: -85,
      agreement: '布拉格之春改革被镇压，杜布切克被押解到莫斯科"谈判"，被迫接受苏联条件。华约军队留驻捷克斯洛伐克。',
      keyTerms: ['布拉格之春', '有限主权论', '华约干预'],
      consequences: '苏联提出"勃列日涅夫主义"，声称社会主义国家主权有限。华约分裂隐患埋下，1989年东欧剧变时苏联未再干预。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '意识形态包装',
          description: '以意识形态理由为军事行动辩护。',
          example: '这是社会主义大家庭内部的事务，不是外国干涉。'
        },
        {
          name: '非暴力抵抗',
          description: '以柔性方式对抗强硬压力。',
          example: '我们不号召流血牺牲，但我们要让世界知道真相。'
        }
      ],
      keyPhrases: [
        { phrase: '有限主权论', meaning: '社会主义国家主权受限于社会主义阵营整体利益', usage: '苏联控制东欧的理论工具' }
      ]
    },
    lessons: [
      '改革与强权控制之间的矛盾不可调和',
      '意识形态理由可以用来为任何行动辩护',
      '非暴力抵抗可以赢得道义支持'
    ],
    sources: [
      'Karel Kaplan, "The Short Course of the Prague Spring"',
      'Vladimir Kusin, "The布拉格之春 1968"'
    ]
  },
  {
    id: 'salt-i-1972',
    name: '美苏第一阶段限制战略武器谈判',
    year: 1972,
    parties: {
      self: { name: '尼克松', country: '美国', flag: '🇺🇸' },
      opponent: { name: '勃列日涅夫', country: '苏联', flag: '☭' },
    },
    topic: '核军备控制与战略平衡',
    background: {
      summary: '1972年5月，尼克松访苏期间，美苏签署《反弹道导弹条约》（ABM）和《临时协议》，首次对战略核武器进行限制。这标志着冷战从单纯对抗转向"缓和"时期。',
      historicalContext: '核军备竞赛给双方带来巨大经济负担。苏联在洲际导弹数量上已超过美国，但质量仍有差距。双方都有控制军备的动机。',
      keyInterests: {
        self: ['限制苏联导弹增长', '保持美国技术优势', '展示缓和诚意'],
        opponent: ['获得合法核地位', '控制军备开支', '展示大国平等']
      },
      constraints: {
        self: ['国内保守派反对', '核威慑承诺', '盟友关切'],
        opponent: ['军方压力', '意识形态对立', '中国因素']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '峰会谈判',
          summary: '尼克松访苏与勃列日涅夫举行峰会。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '接受限制协议',
              language: '核战争没有赢家，我们必须加以防止。美苏有共同责任。',
              analysis: '勃列日涅夫展现缓和意愿。'
            },
            {
              speaker: 'self',
              action: '签署历史性协议',
              language: '我们达成了防止核战争的历史性协议，这是和平的胜利。',
              analysis: '尼克松将协议包装为外交成就。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'success',
      score: 65,
      agreement: '签署ABM条约限制双方反弹道导弹部署，签署临时协议冻结陆基洲际导弹数量五年。',
      keyTerms: ['SALT I', '反弹道导弹条约', 'MAD威慑'],
      consequences: 'SALT I开启了美苏核军控谈判传统，促进了冷战缓和。但条约中的漏洞为后续军备竞赛埋下隐患。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '共同威胁框架',
          description: '将问题定义为双方共同面对的威胁。',
          example: '核武器是我们共同的威胁，控制它是我们的共同责任。'
        }
      ],
      keyPhrases: [
        { phrase: 'MAD', meaning: '确保相互毁灭，核威慑理论', usage: '冷战核平衡的核心概念' }
      ]
    },
    lessons: [
      '共同威胁可以促进大国合作',
      '军备控制需要技术核查机制',
      '缓和不等于放弃竞争'
    ],
    sources: [
      'Strobe Talbott, "The Great Transition"',
      'Thomas Wolfe, "SALT I"'
    ]
  },
  {
    id: 'us-vietnam-1973',
    name: '巴黎停火协议',
    year: 1973,
    parties: {
      self: { name: '基辛格', country: '美国', flag: '🇺🇸' },
      opponent: { name: '黎德寿', country: '北越', flag: '🇻🇳' },
    },
    topic: '越南战争停火与美军撤军',
    background: {
      summary: '1973年1月，美国与北越在巴黎签署停火协议，结束美国的直接军事介入。协议允许美军撤出但未解决南越政权存续问题，为两年后北越统一越南埋下伏笔。',
      historicalContext: '越战造成巨大伤亡和国内分裂。尼克松为赢得1972年大选，急需达成停火协议。基辛格通过秘密谈判取得突破。',
      keyInterests: {
        self: ['体面撤军', '维护美国信誉', '保护南越政权'],
        opponent: ['获得国际承认', '保留军事能力', '最终统一目标']
      },
      constraints: {
        self: ['国内反战压力', '军事现实', '南越阮文绍政权'],
        opponent: ['苏联和中国援助减少', '南方民族解放阵线', '国际舆论']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '秘密谈判',
          summary: '基辛格与黎德寿进行秘密接触。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '提出条件',
              language: '美国必须从南越撤军，承认南越民族解放阵线的合法地位。',
              analysis: '北越坚持核心诉求不让步。'
            },
            {
              speaker: 'self',
              action: '寻求妥协',
              language: '我们愿意接受停火，但需要时间安排有序撤军。',
              analysis: '美国寻求体面撤退方案。'
            }
          ]
        },
        {
          name: '公开签署',
          summary: '在巴黎正式签署停火协议。',
          keyMoments: [
            {
              speaker: 'self',
              action: '宣布和平',
              language: '和平即将来临，越南人民将决定自己的命运。',
              analysis: '基辛格宣布达成协议。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'partial',
      score: -30,
      agreement: '美国在60天内撤出全部作战部队，北越释放美国战俘。协议未明确南越阮文绍政权地位，允许北越继续在南方保留军队。',
      keyTerms: ['停火协议', '有序撤军', '政治解决方案'],
      consequences: '停火仅维持两年。1975年，北越发动大规模攻势，阮文绍政权崩溃，越南统一。协议只是延缓而非解决问题。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '语言模糊',
          description: '使用模糊措辞容纳各方不同解读。',
          example: '停火将在各方都能接受的条件下实现。'
        }
      ],
      keyPhrases: [
        { phrase: '体面和平', meaning: '不显得失败但实际承认现实的妥协方案', usage: '美国撤军外交的典型话语' }
      ]
    },
    lessons: [
      '没有解决核心问题的协议只是延缓冲突',
      '撤军协议需要考虑盟友的生存能力',
      '国内政治压力可能导致仓促外交'
    ],
    sources: [
      'Henry Kissinger, "Ending the Vietnam War"',
      'Peter B. Evans, "Hanoi\'s War"'
    ]
  },
  {
    id: 'us-soviet-grain-1972',
    name: '美苏粮食贸易协议',
    year: 1972,
    parties: {
      self: { name: '尼克松', country: '美国', flag: '🇺🇸' },
      opponent: { name: '柯西金', country: '苏联', flag: '☭' },
    },
    topic: '冷战中的粮食外交',
    background: {
      summary: '1972年，美苏签署大规模粮食贸易协议，苏联购买美国小麦和玉米。这次交易在美苏缓和背景下进行，成为两国关系的重要纽带，但美国也因苏联大量采购导致国内粮价上涨而受批评。',
      historicalContext: '苏联1972年农业歉收，需要进口大量粮食。美国农业州希望打开苏联市场。双方都将粮食贸易与政治缓和挂钩。',
      keyInterests: {
        self: ['打开苏联市场', '促进美苏缓和', '减少农业补贴'],
        opponent: ['解决粮食短缺', '获取外汇', '技术引进机会']
      },
      constraints: {
        self: ['国内农业游说', '价格波动风险', '冷战竞争'],
        opponent: ['外汇储备有限', '意识形态考量', '东欧盟友反应']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '商业谈判',
          summary: '双方就粮食贸易规模展开谈判。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '提出采购计划',
              language: '苏联计划购买大量美国粮食，这将是一个互利的历史性协议。',
              analysis: '苏联以商业需求为切入点。'
            },
            {
              speaker: 'self',
              action: '达成协议',
              language: '向苏联出售粮食既有利于美国农民，也有利于世界和平。',
              analysis: '美国将商业与政治利益捆绑。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'partial',
      score: 25,
      agreement: '苏联购买约300万吨美国小麦和玉米，合同金额约7.5亿美元。美国给予苏联最惠国待遇。',
      keyTerms: ['粮食外交', '最惠国待遇', '商业缓和'],
      consequences: '苏联大量采购导致国际粮价暴涨，美国国内面包价格飙升。成为美苏经济相互依存的早期案例。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '利益捆绑',
          description: '将商业利益与政治和解挂钩。',
          example: '粮食贸易不仅是商业合作，也是和平的桥梁。'
        }
      ],
      keyPhrases: [
        { phrase: '商业缓和', meaning: '通过经贸往来促进政治关系改善', usage: '冷战缓和的经济维度' }
      ]
    },
    lessons: [
      '经济相互依存可以成为政治关系的稳定器',
      '大规模商业协议需要考虑市场影响',
      '政治与商业利益不一定一致'
    ],
    sources: [
      'Karen L. G. Smith, "The Brink of Peace"',
      'US Department of Agriculture Archives'
    ]
  },
  {
    id: 'portuguese-colonial-1974',
    name: '葡萄牙殖民战争结束',
    year: 1974,
    parties: {
      self: { name: '斯皮诺拉', country: '葡萄牙', flag: '🇵🇹' },
      opponent: { name: '萨文比', country: '安哥拉', flag: '🇦🇴' },
    },
    topic: '非殖民化与葡属非洲独立',
    background: {
      summary: '1974年葡萄牙康乃馨革命后，新政权决定放弃殖民地，承认莫桑比克、安哥拉、几内亚比绍等前葡属殖民地独立。长达十三年的殖民战争宣告结束。',
      historicalContext: '葡萄牙是欧洲最贫穷的国家之一，但坚持维护殖民帝国。长期战争消耗了大量资源和生命，拖垮了葡萄牙经济，最终导致军事政变。',
      keyInterests: {
        self: ['摆脱战争负担', '融入欧洲民主阵营', '减轻经济压力'],
        opponent: ['获得独立', '建立民族国家', '结束外国统治']
      },
      constraints: {
        self: ['军方既得利益', '民族主义传统', '殖民精英集团'],
        opponent: ['内部派系斗争', '前殖民地继承问题', '外国势力干预']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '政权更替',
          summary: '葡萄牙发生军事政变，新政权决定结束殖民战争。',
          keyMoments: [
            {
              speaker: 'self',
              action: '宣布非殖民化',
              language: '葡萄牙将承认殖民地人民的自决权，我们不再进行殖民战争。',
              analysis: '新政权彻底改变葡萄牙外交政策方向。'
            },
            {
              speaker: 'opponent',
              action: '宣布停火',
              language: '我们接受葡萄牙的和平倡议，准备进行独立谈判。',
              analysis: '独立运动接受结束战斗的机会。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'success',
      score: 80,
      agreement: '葡萄牙在1975年放弃所有非洲殖民地，莫桑比克、安哥拉、几内亚比绍、佛得角、圣多美和普林西比相继独立。',
      keyTerms: ['非殖民化', '自决权', '殖民战争结束'],
      consequences: '葡萄牙成功实现体面撤退，成为欧盟创始成员国。但部分前殖民地陷入内战，如安哥拉内战持续到2002年。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '政策逆转',
          description: '彻底改变长期坚持的既定政策。',
          example: '历史将证明，我们今天做出的决定是正确的。'
        }
      ],
      keyPhrases: [
        { phrase: '自决权', meaning: '人民自主选择政治制度的权利', usage: '非殖民化运动的核心原则' }
      ]
    },
    lessons: [
      '军事征服无法阻止民族自决',
      '体面撤退比坚持失败的政策更明智',
      '非殖民化需要考虑后殖民时代稳定'
    ],
    sources: [
      'Douglas R. Porch, "The Portuguese Armed Forces"',
      'Chilcote, "The Portuguese Empire"'
    ]
  },
  {
    id: 'camp-david-ii-2000',
    name: '戴维营首脑会议2000',
    year: 2000,
    parties: {
      self: { name: '巴拉克', country: '以色列', flag: '🇮🇱' },
      opponent: { name: '阿拉法特', country: '巴勒斯坦', flag: '🇵🇸' },
    },
    topic: '巴以和平谈判最终地位',
    background: {
      summary: '2000年7月，克林顿邀请巴以双方领导人在戴维营举行峰会，讨论耶路撒冷地位、难民回归权、边界等最终地位问题。谈判最终破裂，成为巴以和平进程的转折点。',
      historicalContext: '1993年奥斯陆协议后，巴以和平进程陷入僵局。沙龙上台后访问圣殿山引发第二次intifada，谈判窗口关闭。',
      keyInterests: {
        self: ['维护耶路撒冷统一', '确保安全边界', '避免单边撤离'],
        opponent: ['耶路撒冷为首都', '难民回归权', '建立巴勒斯坦国']
      },
      constraints: {
        self: ['定居点利益集团', '国内政治压力', '安全担忧'],
        opponent: ['哈马斯竞争', '国内强硬派', '阿拉伯世界期待']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '戴维营峰会',
          summary: '美方斡旋下双方艰难谈判。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '提出让步方案',
              language: '我们愿意接受耶路撒冷分治方案，但需要国际保障。',
              analysis: '巴方在核心利益上展现灵活性。'
            },
            {
              speaker: 'self',
              action: '拒绝妥协',
              language: '耶路撒冷是不可分割的，这是我们的红线。',
              analysis: '以色列在核心问题上拒绝让步。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'failure',
      score: -50,
      agreement: '双方未达成协议。克林顿提出妥协方案，但未能被双方接受。',
      keyTerms: ['耶路撒冷分治', '难民回归', '最终地位'],
      consequences: '峰会失败后不久爆发第二次intifada，巴以和平进程陷入长期僵局，至今未能恢复。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '红线策略',
          description: '设定不可谈判的核心利益。',
          example: '耶路撒冷问题没有谈判空间。'
        }
      ],
      keyPhrases: [
        { phrase: '最终地位', meaning: '巴以争议的核心问题需要一揽子解决', usage: '和平谈判的复杂性和难度' }
      ]
    },
    lessons: [
      '核心利益冲突难以通过妥协解决',
      '时机对谈判成功至关重要',
      '国内政治可以阻止外交突破'
    ],
    sources: [
      'Dennis Ross, "The Missing Goal"',
      'Gideon Rachman, "Zero-Sum Diplomacy"'
    ]
  },
  {
    id: 'east-timor-independence-1999',
    name: '东帝汶独立公投',
    year: 1999,
    parties: {
      self: { name: '瓦希德', country: '印度尼西亚', flag: '🇮🇩' },
      opponent: { name: '夏纳尔', country: '东帝汶', flag: '🇹🇱' },
    },
    topic: '东帝汶独立与印尼民主化',
    background: {
      summary: '1999年8月，东帝汶在联合国主持下举行独立公投，78.5%的选民选择独立。印尼军支持的亲印尼武装组织随后发动暴力活动，联合国维和部队介入，最终促成东帝汶2002年正式独立。',
      historicalContext: '东帝汶1975年被印尼吞并后进行长达24年的殖民统治。1998年苏哈托下台后，印尼新政府允许东帝汶举行自决公投。',
      keyInterests: {
        self: ['维护领土完整', '避免军事失败', '获得国际认可'],
        opponent: ['获得独立', '结束外国统治', '建立民主国家']
      },
      constraints: {
        self: ['军方反对', '民族主义情绪', '国内政治动荡'],
        opponent: ['亲印尼武装威胁', '资源匮乏', '治理经验不足']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '公投筹备',
          summary: '联合国监督下准备独立公投。',
          keyMoments: [
            {
              speaker: 'self',
              action: '接受公投安排',
              language: '印尼政府尊重东帝汶人民的选择，无论结果如何。',
              analysis: '印尼新政府展现民主转型意愿。'
            },
            {
              speaker: 'opponent',
              action: '组织公投',
              language: '我们准备好了表达我们的选择，这是历史性的时刻。',
              analysis: '东帝汶人民积极响应公投。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'success',
      score: 85,
      agreement: '东帝汶独立公投以压倒性多数通过，印尼接受公投结果，允许东帝汶独立。联合国维和部队接管安全。',
      keyTerms: ['自决公投', '民主转型', '维和行动'],
      consequences: '东帝汶2002年正式独立，成为21世纪第一个新生国家。印尼的民主转型为领土分离提供了和平渠道。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '民主程序',
          description: '通过民主程序解决争议获得合法性。',
          example: '人民的声音必须被尊重。'
        }
      ],
      keyPhrases: [
        { phrase: '民族自决', meaning: '人民有权选择自己的政治命运', usage: '去殖民化运动的核心原则' }
      ]
    },
    lessons: [
      '民主程序可以为分离主义提供合法渠道',
      '军事强权无法阻止民族自决',
      '国际监督可以确保争议解决的公正性'
    ],
    sources: [
      'Peter Carey, "Transition in Timor-Leste"',
      'UN Security Council Documents 1999'
    ]
  },
  {
    id: 'good-friday-1998',
    name: '耶稣受难日协议',
    year: 1998,
    parties: {
      self: { name: '莫恩', country: '英国', flag: '🇬🇧' },
      opponent: { name: '亚当斯', country: '爱尔兰', flag: '🇮🇪' },
    },
    topic: '北爱尔兰和平进程',
    background: {
      summary: '1998年4月，英国、爱尔兰和北爱尔兰各党派签署耶稣受难日协议，结束北爱尔兰长达30年的宗派冲突。协议建立了分享权力的地方政府，释放政治犯，允许爱尔兰统一派和民族主义派共同治理。',
      historicalContext: '北爱尔兰问题源于英国统治下的宗教和民族冲突。1960年代末爆发"麻烦"时期，造成3000多人死亡。1990年代后期，英国和爱尔兰政府开始秘密谈判。',
      keyInterests: {
        self: ['维护英国主权', '结束暴力冲突', '获得各方认可'],
        opponent: ['保护爱尔兰文化认同', '寻求统一路径', '结束英军干预']
      },
      constraints: {
        self: ['北爱统一派反对', '军事行动既得利益', '受害者家属情绪'],
        opponent: ['共和党强硬派', '军事行动支持者', '失踪人员问题']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '秘密谈判',
          summary: '英爱政府与各党派进行幕后谈判。',
          keyMoments: [
            {
              speaker: 'self',
              action: '邀请各方参与',
              language: '我们需要让所有声音都参与到对话中来，包括那些曾经诉诸暴力的人。',
              analysis: '英国政府展现包容性。'
            },
            {
              speaker: 'opponent',
              action: '接受分享权力',
              language: '我们愿意接受与统一派共同治理，只要这能带来和平。',
              analysis: '共和党展现历史性妥协。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'success',
      score: 80,
      agreement: '建立北爱尔兰议会和政府，权力分享给民主统一主义和民族主义两大阵营。爱尔兰共和军实现停火并最终解除武装。',
      keyTerms: ['权力分享', '停火协议', '和解进程'],
      consequences: '协议基本结束了北爱尔兰暴力冲突，但政治机构多次因信任危机暂停运作。北爱和平进程至今仍在继续。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '包容性对话',
          description: '让曾经的对手参与谈判以实现和解。',
          example: '只有那些参与暴力的人才能真正带来和平。'
        }
      ],
      keyPhrases: [
        { phrase: '和解与分享', meaning: '敌对双方共同参与治理', usage: '后冲突社会重建的核心原则' }
      ]
    },
    lessons: [
      '包容曾经的对手是实现和平的关键',
      '权力分享可以化解宗派冲突',
      '和解需要时间和持续努力'
    ],
    sources: [
      'Mitchell Mitchell, "Hope History"',
      'Ed Moloney, "A Secret History of the IRA"'
    ]
  },
  {
    id: 'abzu-peace-1994',
    name: '阿布哈兹战争与和平',
    year: 1994,
    parties: {
      self: { name: '谢瓦尔德纳泽', country: '格鲁吉亚', flag: '🇬🇪' },
      opponent: { name: '阿尔哈茨', country: '阿布哈兹', flag: '🏴' },
    },
    topic: '高加索地区分离主义冲突',
    background: {
      summary: '1992-1993年阿布哈兹战争造成大量伤亡。1994年双方在联合国和俄罗斯斡旋下签署停火协议，但阿布哈兹实际独立状态延续至今。',
      historicalContext: '苏联解体后，阿布哈兹寻求从格鲁吉亚独立。战争导致约2万人死亡，20万人流离失所。俄罗斯作为调停者发挥关键作用。',
      keyInterests: {
        self: ['维护领土完整', '获得国际支持', '控制分离地区'],
        opponent: ['获得国际承认', '维护实际独立', '保护族裔权利']
      },
      constraints: {
        self: ['军事实力不足', '俄罗斯影响', '内部冲突'],
        opponent: ['格鲁吉亚强硬派', '难民问题', '经济依赖']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '停火谈判',
          summary: '国际社会斡旋下达 成停火。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '接受停火条件',
              language: '我们愿意停火，但必须保障阿布哈兹人民的安全和权利。',
              analysis: '战争疲劳促使双方接受停火。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'partial',
      score: 30,
      agreement: '实现停火，建立联合国维和部队监督。阿布哈兹事实上独立，但未获国际承认。难民返回问题悬而未决。',
      keyTerms: ['停火协议', '分离主义', '维和行动'],
      consequences: '阿布哈兹问题至今未解决。2008年俄格战争后，俄罗斯进一步加强对阿布哈兹的实际控制。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '冻结冲突',
          description: '接受现状而非解决根本问题。',
          example: '让我们先停止流血，至于其他问题，以后再谈。'
        }
      ],
      keyPhrases: [
        { phrase: '冻结冲突', meaning: '暂时停火但未解决根本争议', usage: '高加索地区冲突的典型模式' }
      ]
    },
    lessons: [
      '停火协议不等于和平解决方案',
      '大国介入是解决高加索冲突的关键',
      '难民问题是冲突遗留的持久挑战'
    ],
    sources: [
      'Charles King, "The Ghost of Freedom"',
      'Cornell, "Caucasus"'
    ]
  },
  {
    id: 'kosovo-independence-2008',
    name: '科索沃独立宣言',
    year: 2008,
    parties: {
      self: { name: '塔迪奇', country: '塞尔维亚', flag: '🇷🇸' },
      opponent: { name: '贾伊奇', country: '科索沃', flag: '🇽🇰' },
    },
    topic: '科索沃独立与国际承认',
    background: {
      summary: '2008年2月，科索沃单方面宣布独立。塞尔维亚拒绝承认，但科索沃已获得100多个国家承认。这成为国际法中民族自决与领土完整原则冲突的典型案例。',
      historicalContext: '1998-1999年科索沃战争后，联合国托管科索沃。2007年国际法院裁定独立宣言不违反国际法。美国和多数欧盟国家承认科索沃，俄罗斯和中国拒绝承认。',
      keyInterests: {
        self: ['维护领土完整', '保护塞族权利', '拒绝承认分离主义'],
        opponent: ['获得国际承认', '加入联合国', '经济援助']
      },
      constraints: {
        self: ['欧盟入盟压力', '国际法院裁决', '科索沃实际控制'],
        opponent: ['俄罗斯反对', '部分国家未承认', '塞族聚居区问题']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '独立宣言',
          summary: '科索沃单方面宣布独立。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '宣布独立',
              language: '今天科索沃宣布成为一个独立、主权的国家。',
              analysis: '科索沃抓住时机单方面行动。'
            },
            {
              speaker: 'self',
              action: '抗议独立',
              language: '科索沃独立是对国际法和塞尔维亚主权的公然侵犯。',
              analysis: '塞尔维亚拒绝接受但无力阻止。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'partial',
      score: 50,
      agreement: '科索沃单方面宣布独立，获得约100个国家承认，但塞尔维亚、俄罗斯等拒绝承认。科索沃未能加入联合国。',
      keyTerms: ['单边独立', '国际承认', '领土完整vs自决权'],
      consequences: '科索沃案例开创了先例：单边独立可以在特定历史条件下获得国际承认，但也加剧了分离主义争议。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '先发制人',
          description: '在有利时机单方面行动。',
          example: '历史给了我们这个机会，我们必须抓住。'
        }
      ],
      keyPhrases: [
        { phrase: '先决条件满足', meaning: '特定历史条件下单边独立获得合法性', usage: '科索沃独立的法理依据' }
      ]
    },
    lessons: [
      '单边独立在特定条件下可以获得国际承认',
      '领土完整与民族自决之间存在根本张力',
      '大国支持是新生国家获得承认的关键'
    ],
    sources: [
      'International Court of Justice Advisory Opinion 2010',
      'James Ker-Lindsay, "The Foreign Policy of Counter Secession"'
    ]
  },
  {
    id: 'south-sudan-independence-2011',
    name: '南苏丹独立',
    year: 2011,
    parties: {
      self: { name: '基尔', country: '苏丹', flag: '🇸🇩' },
      opponent: { name: '基达尔', country: '南苏丹', flag: '🇸🇸' },
    },
    topic: '苏丹内战结束与国家分裂',
    background: {
      summary: '2011年7月，南苏丹通过独立公投正式从苏丹分离，成为世界上最年轻的国家。长达数十年的苏丹内战造成数百万人死亡，流离失所。',
      historicalContext: '苏丹南北矛盾源于宗教、文化和经济差异。2005年全面和平协议结束第二次苏丹内战，为南苏丹独立公投铺路。',
      keyInterests: {
        self: ['维护统一', '保留石油收入', '阿卜耶伊地区'],
        opponent: ['获得完全独立', '控制石油资源', '建立自己的国家']
      },
      constraints: {
        self: ['国际压力', '军事实力对比', '达尔富尔问题'],
        opponent: ['经济依赖', '治理能力不足', '内部派系']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '独立公投',
          summary: '2011年1月举行历史性公投。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '宣布独立',
              language: '今天南苏丹成为一个自由、独立的国家。',
              analysis: '公投以压倒性多数选择独立。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'success',
      score: 65,
      agreement: '南苏丹独立，苏丹保留部分石油收益分成。但阿卜耶伊地区归属等悬而未决问题继续困扰两国关系。',
      keyTerms: ['和平协议', '独立公投', '国家分裂'],
      consequences: '南苏丹独立后陷入内部冲突，石油收入争端加剧。两国关系时有紧张，但未重新爆发大规模战争。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '协商分离',
          description: '通过和平谈判实现国家分裂。',
          example: '通过对话而非战争来解决问题。'
        }
      ],
      keyPhrases: [
        { phrase: '和平分离', meaning: '通过协商而非战争实现国家分裂', usage: '处理内战分裂的成功模式' }
      ]
    },
    lessons: [
      '协商分离可以避免更大规模暴力',
      '独立公投需要充分的准备工作',
      '新生国家面临治理能力重大挑战'
    ],
    sources: [
      'Alex de Waal, "The Islamization of the Sudan Conflict"',
      'USIP Reports on Sudan'
    ]
  },
  {
    id: 'crimea-2014',
    name: '克里米亚入俄',
    year: 2014,
    parties: {
      self: { name: '普京', country: '俄罗斯', flag: '🇷🇺' },
      opponent: { name: '图尔奇诺夫', country: '乌克兰', flag: '🇺🇦' },
    },
    topic: '乌克兰危机与领土变更',
    background: {
      summary: '2014年3月，在乌克兰"广场革命"推翻亲俄政府后，俄罗斯军事人员控制了克里米亚半岛。随后的公投显示96%支持加入俄罗斯，俄国正式吞并克里米亚。西方国家对俄实施制裁。',
      historicalContext: '乌克兰亲欧示威引发政权更迭。俄罗斯视乌克兰为其势力范围，不接受其倒向西方。克里米亚在历史上属于俄罗斯，1954年才被赫鲁晓夫划归乌克兰。',
      keyInterests: {
        self: ['保护黑海舰队基地', '阻止乌克兰加入北约', '恢复地区影响力'],
        opponent: ['维护领土完整', '融入欧洲', '获得西方支持']
      },
      constraints: {
        self: ['国际制裁', '军事行动风险', '乌克兰抵抗'],
        opponent: ['军事实力差距', '内部分裂', '西方援助有限']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '军事控制',
          summary: '俄军以"保护俄语居民"为由控制克里米亚。',
          keyMoments: [
            {
              speaker: 'self',
              action: '军事介入',
              language: '我们必须保护克里米亚人民的生命和选择。',
              analysis: '俄罗斯以人道主义理由为军事行动辩护。'
            },
            {
              speaker: 'opponent',
              action: '抗议谴责',
              language: '俄罗斯入侵是赤裸裸的武力威胁，违反国际法。',
              analysis: '乌克兰在国际舞台上寻求支持。'
            }
          ]
        },
        {
          name: '公投与吞并',
          summary: '克里米亚举行入俄公投。',
          keyMoments: [
            {
              speaker: 'self',
              action: '接受公投结果',
              language: '克里米亚人民的选择必须被尊重。',
              analysis: '俄罗斯迅速接受并正式吞并克里米亚。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'partial',
      score: 45,
      agreement: '克里米亚被俄罗斯实际控制并吞并，但未获国际承认。西方对俄实施经济制裁，乌克兰危机持续至今。',
      keyTerms: ['领土吞并', '公投', '国际制裁'],
      consequences: '克里米亚事件导致俄乌关系彻底破裂，乌克兰危机成为欧洲安全最大挑战。俄罗斯遭受西方长期制裁。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '人道主义干预话语',
          description: '以保护同胞为由进行军事行动。',
          example: '我们必须保护说俄语的人民的权益。'
        },
        {
          name: '公投合法性',
          description: '通过公投赋予领土变更合法性。',
          example: '公投结果体现了当地人民的真实意愿。'
        }
      ],
      keyPhrases: [
        { phrase: '保护责任', meaning: '国家有权保护海外同胞', usage: '俄罗斯军事干预的借口' }
      ]
    },
    lessons: [
      '军事力量可以改变实际控制但不能改变合法性',
      '公投在国际法上不能为单边行动背书',
      '大国对抗是小国悲剧的根源'
    ],
    sources: [
      'Mikhail Zygar, "The Whole Truth"',
      'Pew Research Center Reports on Crimea'
    ]
  },
  {
    id: 'minsk-protocols-2014',
    name: '明斯克协议',
    year: 2014,
    parties: {
      self: { name: '波罗申科', country: '乌克兰', flag: '🇺🇦' },
      opponent: { name: '泽勒斯基', country: '顿巴斯', flag: '☭' },
    },
    topic: '乌克兰东部停火与顿巴斯地位',
    background: {
      summary: '2014年9月和2015年2月，各方在明斯克签署协议，试图结束乌克兰东部顿巴斯地区的武装冲突。协议确立了停火线和特殊自治地位，但执行屡次拖延。',
      historicalContext: '2014年乌克兰危机后，顿巴斯地区亲俄武装与乌克兰政府军爆发武装冲突。德国、法国作为调解者参与谈判，俄罗斯被指为武装冲突的支持者。',
      keyInterests: {
        self: ['维护领土完整', '恢复东部控制', '加入欧盟和北约'],
        opponent: ['获得自治地位', '俄语权利保护', '与俄罗斯联系'],
        opponent2: ['维护领土完整', '维护主权', '欧洲一体化']
      },
      constraints: {
        self: ['军事能力限制', '东部实际控制', '西方援助'],
        opponent: ['俄罗斯支持程度', '内部派系', '经济依赖']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '首次明斯克',
          summary: '2014年9月签署初步停火协议。',
          keyMoments: [
            {
              speaker: 'self',
              action: '接受停火',
              language: '我们同意停火，但这不意味着接受分裂。',
              analysis: '乌克兰被迫接受现实但保留法理立场。'
            }
          ]
        },
        {
          name: '明斯克II',
          summary: '2015年2月签署更详细的协议。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '推动和平',
              language: '我们需要一个能让各方都接受的方案。',
              analysis: '法德两国努力推动协议达成。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'partial',
      score: 20,
      agreement: '建立停火线和特殊自治地位框架。但核心问题——顿巴斯在乌克兰宪法中的地位——从未解决，停火多次被打破。',
      keyTerms: ['停火协议', '特殊地位', '宪法改革'],
      consequences: '明斯克协议成为乌克兰危机的核心议题。泽连斯基试图修改协议引发争议，2022年俄乌战争全面爆发。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '模糊框架',
          description: '使用模糊表述容纳各方不同解释。',
          example: '特殊地位将由双方协商确定。'
        }
      ],
      keyPhrases: [
        { phrase: '特殊地位', meaning: '在乌克兰统一前提下给予高度自治', usage: '顿巴斯问题争议的核心' }
      ]
    },
    lessons: [
      '模糊协议可以被各方做出对自己有利的解读',
      '没有执行机制的协议难以持久',
      '外部调解者需要保持中立性才能有效'
    ],
    sources: [
      'Andrew Wilson, "Ukraine Crisis"',
      'Le Monde Diplomatique Analysis'
    ]
  },
  {
    id: 'transpacific-partnership-2016',
    name: '跨太平洋伙伴关系协定',
    year: 2016,
    parties: {
      self: { name: '奥巴马', country: '美国', flag: '🇺🇸' },
      opponent: { name: '安倍晋三', country: '日本', flag: '🇯🇵' },
    },
    topic: '亚太贸易整合与规则制定',
    background: {
      summary: 'TPP最初由文莱、智利、新西兰、新加坡于2005年发起，后在美国加入后扩大为12国参与的亚太贸易协定。2017年美国退出后，剩余11国签署CPTPP。',
      historicalContext: '中国崛起改变亚太经济格局。美国希望制定高标准贸易规则。TPP涵盖关税、服务贸易、知识产权、劳工标准等广泛议题。',
      keyInterests: {
        self: ['制衡中国影响力', '制定贸易规则', '促进出口'],
        opponent: ['进入美国市场', '农业开放', '地缘战略']
      },
      constraints: {
        self: ['国会批准', '国内就业担忧', '选举政治'],
        opponent: ['农业保护', '政治敏感性', '国内压力']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '十年谈判',
          summary: 'TPP历经近十年谈判。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '推动完成谈判',
              language: 'TPP将为亚太地区制定21世纪的贸易规则。',
              analysis: '美国将TPP视为亚太战略的组成部分。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'partial',
      score: 55,
      agreement: 'TPP于2016年2月签署。美国退出后，剩余11国于2018年签署CPTPP，冻结部分美国条款。',
      keyTerms: ['高标准协定', '规则制定', '中国溢价'],
      consequences: '美国退出削弱了亚太贸易规则的美国印记。CPTPP成为亚太贸易整合的重要平台，但影响力和标准都有所降低。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '规则制定权',
          description: '通过制定标准来影响竞争格局。',
          example: '谁制定规则，谁就掌握了未来。'
        }
      ],
      keyPhrases: [
        { phrase: '规则制定权', meaning: '在国际协定中设定标准的主导权', usage: '大国博弈的新维度' }
      ]
    },
    lessons: [
      '规则制定是大国博弈的新战场',
      '国内政治可以颠覆外交成果',
      '替代方案可以在领导者退出后存活'
    ],
    sources: [
      'Peter D. Sutherland, "The Future of Trade"',
      'Petri & Plummer, "TPP and Asia\'s Economic Architecture"'
    ]
  },
  {
    id: 'brexit-final-2020',
    name: '英欧贸易与合作协定',
    year: 2020,
    parties: {
      self: { name: '米歇尔', country: '欧盟', flag: '🇪🇺' },
      opponent: { name: '冯德莱恩', country: '欧盟', flag: '🇪🇺' },
    },
    topic: '英国脱欧后的贸易安排',
    background: {
      summary: '2020年12月，英国与欧盟在脱欧过渡期结束前数天达成贸易与合作协定。这份1400多页的协定涵盖了从贸易到核能合作的广泛领域，但金融服务等领域仍存在重大空白。',
      historicalContext: '英国2020年1月31日正式脱离欧盟，过渡期至12月31日结束。双方在渔业权、公平竞争环境等问题上艰难谈判。',
      keyInterests: {
        self: ['维护单一市场完整', '保护欧盟渔民', '确保公平竞争'],
        opponent: ['主权回归', '金融服务进入', '控制水域']
      },
      constraints: {
        self: ['27国立场', '时间压力', '法律约束'],
        opponent: ['国内政治', '经济现实', '北爱尔兰问题']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '最后冲刺',
          summary: '在最后时刻达成协议。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '接受渔业妥协',
              language: '为了达成这份历史性协议，我们在渔业问题上做出了艰难的决定。',
              analysis: '约翰逊在最后关头做出让步。'
            },
            {
              speaker: 'self',
              action: '批准协定',
              language: '这是公平、平衡的协议，符合双方利益。',
              analysis: '欧盟以务实态度接受协议。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'partial',
      score: 45,
      agreement: '建立零关税零配额的商品贸易框架，但在服务贸易尤其是金融服务业存在重大空白。设立争端解决机制和竞争条款。',
      keyTerms: [' TCA协定', '公平竞争环境', '渔业权'],
      consequences: '英欧关系进入新阶段。双方贸易受到海关和监管障碍影响。北爱尔兰议定书执行问题持续困扰双边关系。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '时间压力',
          description: '利用最后期限迫使对方做出让步。',
          example: '没有时间了，我们必须现在做出决定。'
        }
      ],
      keyPhrases: [
        { phrase: '公平竞争环境', meaning: '确保双方企业不会因监管差异获得不公平优势', usage: '贸易协定的核心条款' }
      ]
    },
    lessons: [
      '时间压力可以促成协议达成',
      '零关税不等于零壁垒',
      '贸易协定无法解决所有问题'
    ],
    sources: [
      'Financial Times Analysis 2020',
      'UK Government Brexit Analysis'
    ]
  },
  {
    id: 'oslo-accords-1993',
    name: '奥斯陆协议',
    year: 1993,
    parties: {
      self: { name: '拉宾', country: '以色列', flag: '🇮🇱' },
      opponent: { name: '阿拉法特', country: '巴勒斯坦', flag: '🇵🇸' },
    },
    topic: '巴以和平进程突破',
    background: {
      summary: '1993年9月，以色列和巴解组织在挪威奥斯陆秘密谈判后签署历史性和平协议，互相承认对方存在，为后续的加沙和约旦河西岸自治安排奠定基础。',
      historicalContext: '冷战结束后，中东和平进程加速。美国主导的马德里和会后，巴以双方在挪威进行秘密谈判。拉宾和佩雷斯因推动和平获得1994年诺贝尔和平奖。',
      keyInterests: {
        self: ['实现和平', '获得国际认可', '减少安全威胁'],
        opponent: ['获得民族自决', '建立自治政府', '结束占领']
      },
      constraints: {
        self: ['定居点集团', '国内反对派', '安全担忧'],
        opponent: ['哈马斯反对', '阿拉伯国家立场', '难民问题']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '秘密谈判',
          summary: '巴以双方在挪威秘密接触。',
          keyMoments: [
            {
              speaker: 'self',
              action: '历史性握手',
              language: '够了，流血和眼泪够了。我们决心结束这场悲剧。',
              analysis: '拉宾在白宫前的标志性演讲。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'partial',
      score: 55,
      agreement: '巴解组织承认以色列生存权，以色列承认巴解组织为巴勒斯坦人民代表。启动加沙和约旦河西岸部分地区自治进程。',
      keyTerms: ['互相承认', '自治安排', '土地换和平'],
      consequences: '协议为后续和平进程奠定基础，但执行过程困难重重。2000年第二次intifada爆发，和平进程陷入僵局。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '秘密外交',
          description: '通过秘密渠道绕过公开谈判障碍。',
          example: '有些对话不能在公开场合进行。'
        }
      ],
      keyPhrases: [
        { phrase: '土地换和平', meaning: '以色列撤出占领领土换取和平', usage: '中东和平进程的核心公式' }
      ]
    },
    lessons: [
      '秘密外交可以突破公开谈判僵局',
      '互相承认是和平的前提',
      '协议签署不等于执行'
    ],
    sources: [
      'Ahmed Qurie, "From Oslo to Iraq"',
      'Graham Allison, "The Exception That Became the Rule"'
    ]
  },
  {
    id: 'iran-iraq-war-end-1988',
    name: '伊朗伊拉克停火协议',
    year: 1988,
    parties: {
      self: { name: '霍梅尼', country: '伊朗', flag: '🇮🇷' },
      opponent: { name: '萨达姆', country: '伊拉克', flag: '🇮🇶' },
    },
    topic: '两伊战争结束与海湾和平',
    background: {
      summary: '1988年7月，伊朗和伊拉克接受联合国安理会598号决议，实现停火，结束长达八年的两伊战争。这场战争造成约100万人死亡，经济损失高达数千亿美元。',
      historicalContext: '1980年伊拉克入侵伊朗开启战争。美国和阿拉伯国家支持伊拉克，苏联向伊朗出售武器。双方都未能取得决定性胜利，最终筋疲力尽。',
      keyInterests: {
        self: ['维护伊斯兰革命成果', '获得战争赔偿', '保持地区影响力'],
        opponent: ['保住现有领土', '结束战争消耗', '获得国际支持']
      },
      constraints: {
        self: ['军事实力消耗', '经济困难', '国际孤立'],
        opponent: ['石油收入下降', '人口损失', '外债沉重']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '接受停火',
          summary: '双方都精疲力竭，接受联合国调解。',
          keyMoments: [
            {
              speaker: 'self',
              action: '接受停火',
              language: '我们接受停火，但这不是和平。这是向敌人喝下的毒酒。',
              analysis: '霍梅尼以宗教话语为被迫停火辩护。'
            },
            {
              speaker: 'opponent',
              action: '寻求结束',
              language: '战争已经够了，我们需要和平来重建国家。',
              analysis: '萨达姆抓住机会结束战争。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'partial',
      score: 10,
      agreement: '沿1980年边界线停火，恢复到战前状态。双方均未获得战争赔偿，但伊拉克保留实际控制的争议领土。',
      keyTerms: ['598号决议', '战争赔偿', '边界恢复'],
      consequences: '停火维持至今，但两国关系仍然紧张。1990年伊拉克入侵科威特与两伊战争的后果密切相关。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '话语包装',
          description: '将被迫的妥协包装为战略选择。',
          example: '这是真主的考验，不是失败。'
        }
      ],
      keyPhrases: [
        { phrase: '毒酒', meaning: '被迫接受的苦涩妥协', usage: '霍梅尼接受停火的著名表述' }
      ]
    },
    lessons: [
      '消耗战最终导致双方都接受停火',
      '战争赔偿问题往往是遗留问题',
      '停火协议需要持续的外部压力维持'
    ],
    sources: [
      'Dilip Hiro, "The Longest War"',
      'Patrick Tyler, "The Great War"'
    ]
  },
  {
    id: 'gcc-1981',
    name: '海湾阿拉伯国家合作委员会成立',
    year: 1981,
    parties: {
      self: { name: '哈利法', country: '巴林', flag: '🇧🇭' },
      opponent: { name: '法赫德', country: '沙特阿拉伯', flag: '🇸🇦' },
    },
    topic: '海湾地区安全合作',
    background: {
      summary: '1981年5月，海湾阿拉伯六国宣布成立海湾阿拉伯国家合作委员会（海合会），旨在加强成员国在经济、金融、贸易领域的合作，并协调安全政策应对伊朗伊斯兰革命后的地区威胁。',
      historicalContext: '伊朗1979年伊斯兰革命后，海湾逊尼派君主国感到威胁。两伊战争爆发后，沙特等国支持伊拉克，但更希望建立集体安全机制。',
      keyInterests: {
        self: ['应对伊朗威胁', '加强经济合作', '维护君主制稳定'],
        opponent: ['地区安全', '经济一体化', '对抗伊朗']
      },
      constraints: {
        self: ['内部差异', '卡塔尔外交独立性', '领土争议'],
        opponent: ['成员国利益分歧', '美国影响', '地区平衡']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '成立协商',
          summary: '六国就组织架构和目标达成一致。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '提出倡议',
              language: '我们需要团结起来，共同应对地区挑战。',
              analysis: '沙特牵头推动区域合作。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'success',
      score: 60,
      agreement: '建立海湾合作委员会，成员包括沙特、科威特、阿联酋、卡塔尔、巴林、阿曼。设立统一的海湾关税同盟构想。',
      keyTerms: ['经济一体化', '安全合作', '君主制团结'],
      consequences: '海合会成为海湾地区最重要的区域组织。但内部矛盾——尤其是卡塔尔与沙特等的分歧——在2017年公开爆发，导致断交危机。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '共同威胁',
          description: '以共同外部威胁促进内部团结。',
          example: '面对共同威胁，我们必须团结一致。'
        }
      ],
      keyPhrases: [
        { phrase: '集体安全', meaning: '成员国相互保护的安全机制', usage: '区域组织的核心功能' }
      ]
    },
    lessons: [
      '共同威胁可以促进区域合作',
      '内部矛盾可能在外部压力消失后爆发',
      '经济合作可以弥合政治分歧'
    ],
    sources: [
      'Anoushiravan Ehteshami, "The Gulf States"',
      'GCC Official Documents 1981'
    ]
  },
  {
    id: 'yemen-unification-1990',
    name: '也门统一',
    year: 1990,
    parties: {
      self: { name: '萨利赫', country: '北也门', flag: '🇾🇪' },
      opponent: { name: '比什尔', country: '南也门', flag: '🇾🇹' },
    },
    topic: '也门南北统一',
    background: {
      summary: '1990年5月，北也门和南也门正式合并成立统一的也门共和国。萨利赫任总统，比什尔任副总统。这次统一是在冷战缓和背景下，阿拉伯世界唯一成功实现国家合并的案例。',
      historicalContext: '也门1954年分裂为南北两部分。北也门是阿拉伯世界最贫穷的国家之一，南也门是社会主义国家。冷战结束时，两国寻求通过统一增强实力。',
      keyInterests: {
        self: ['成为统一国家领袖', '获得国际承认', '经济资源整合'],
        opponent: ['保留政治影响力', '维护南方利益', '避免被吞并']
      },
      constraints: {
        self: ['政治体制差异', '经济发展不平衡', '部族竞争'],
        opponent: ['意识形态差异', '共产党影响', '军队整合']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '统一谈判',
          summary: '南北双方就统一条件展开谈判。',
          keyMoments: [
            {
              speaker: 'self',
              action: '宣布统一',
              language: '今天我们结束了分裂，实现了几代也门人的梦想。',
              analysis: '统一在相对友好的氛围中实现。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'partial',
      score: 25,
      agreement: '建立统一也门共和国，总统掌握实权，副总统象征性设置。统一后很快陷入政治危机，1994年爆发内战。',
      keyTerms: ['国家合并', '权力分享', '内战'],
      consequences: '1994年内战导致南方失败，南北统一得以维持但埋下怨恨。2011年阿拉伯之春后，也门再次陷入内战。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '历史叙事',
          description: '以民族统一愿景激励共识。',
          example: '我们的祖先为之奋斗的统一梦想今天实现了。'
        }
      ],
      keyPhrases: [
        { phrase: '阿拉伯之春', meaning: '2010-2012年中东地区的抗议和政权更迭', usage: '21世纪阿拉伯世界的政治变革' }
      ]
    },
    lessons: [
      '没有充分准备的统一可以埋下内战种子',
      '权力分享协议难以持久',
      '内部分裂可能在外力作用下重新爆发'
    ],
    sources: [
      'Paul Dresch, "A History of Modern Yemen"',
      'Helen Lackner, "Why Yemen Matters"'
    ]
  },
  {
    id: 'chad-libya-1994',
    name: '乍得利比亚奥祖边界争端',
    year: 1994,
    parties: {
      self: { name: '代比', country: '乍得', flag: '🇹🇩' },
      opponent: { name: '卡扎菲', country: '利比亚', flag: '🇱🇾' },
    },
    topic: '非洲领土争端解决',
    background: {
      summary: '乍得和利比亚关于奥祖地区的领土争端持续数十年。利比亚曾支持乍得反政府武装，1980年代甚至直接军事干预。1994年，国际法院裁决支持乍德，利比亚接受裁决并撤军。',
      historicalContext: '奥祖地区富含铀矿，归属争议源于殖民时期划界问题。利比亚以此为借口干涉乍得内政，甚至一度占领部分领土。',
      keyInterests: {
        self: ['收回领土', '结束外部干涉', '获得资源'],
        opponent: ['获取铀矿资源', '扩大势力范围', '地区影响力']
      },
      constraints: {
        self: ['军事实力差距', '内战困扰', '国际孤立'],
        opponent: ['国际制裁', '非洲孤立', '军事消耗']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '国际法院裁决',
          summary: '国际法院作出有利于乍得的裁决。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '接受裁决',
              language: '利比亚尊重国际法院的裁决，我们从奥祖撤军。',
              analysis: '卡扎菲罕见地接受不利裁决。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'success',
      score: 75,
      agreement: '利比亚从奥祖地区撤军，接受国际法院裁决。乍得恢复对奥祖地区的完全主权。',
      keyTerms: ['国际法院', '领土争端', '遵守国际法'],
      consequences: '争端和平解决，成为非洲通过国际法解决领土争端的典范。乍得获得铀矿资源，利比亚改善国际形象。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '国际法路径',
          description: '通过国际司法机构解决争端。',
          example: '我们相信国际法将给出公正的裁决。'
        }
      ],
      keyPhrases: [
        { phrase: '司法解决', meaning: '通过国际法院裁决而非武力解决争端', usage: '和平解决国际争端的法律途径' }
      ]
    },
    lessons: [
      '国际法裁决可以被接受即使不利于大国',
      '经济利益可以成为接受国际裁决的动力',
      '非洲可以通过多边机制解决争端'
    ],
    sources: [
      'ICJ Case concerning the Territorial Dispute (Libya/Chad)',
      'University of Central Florida Research on Africa Border Disputes'
    ]
  },
  {
    id: 'germany-reunification-1990',
    name: '德国统一谈判',
    year: 1990,
    parties: {
      self: { name: '科尔', country: '联邦德国', flag: '🇩🇪' },
      opponent: { name: '戈尔巴乔夫', country: '苏联', flag: '☭' },
    },
    topic: '两德统一与欧洲秩序',
    background: {
      summary: '1989-1990年，在苏联允许和西方支持下，东德和西德实现和平统一。科尔和戈尔巴乔夫的关键谈判使统一成为可能，联邦德国承担统一成本，苏联获得经济援助和政治让步。',
      historicalContext: '1989年柏林墙倒塌后，东德政权迅速崩溃。两德统一问题被提上日程，但需要四大战胜国同意。戈尔巴乔夫的"新思维"为统一创造了历史机遇。',
      keyInterests: {
        self: ['实现国家统一', '成为欧洲领袖', '承担统一成本'],
        opponent: ['获得经济援助', '确保苏联安全', '保留德国中立可能']
      },
      constraints: {
        self: ['四大国立场', '东德人民意愿', '欧洲平衡'],
        opponent: ['国内压力', '东欧国家关切', '北约东扩担忧']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '外交谈判',
          summary: '联邦德国与四大国就统一条件谈判。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '同意统一',
              language: '德国人民有权统一，这是他们的选择。',
              analysis: '戈尔巴乔夫做出历史性让步。'
            },
            {
              speaker: 'self',
              action: '承诺让步',
              language: '统一后的德国将留在北约，这是不可谈判的。',
              analysis: '科尔明确德国统一后的西方归属。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'success',
      score: 90,
      agreement: '统一后的德国留在北约和欧共体。联邦德国支付巨额统一费用，向苏联提供经济援助，苏联允许东德加入联邦德国。',
      keyTerms: ['2+4谈判', '北约成员', '欧洲一体化'],
      consequences: '德国统一改变了欧洲权力格局。俄罗斯虽接受统一但对此后北约东扩耿耿于怀，成为俄欧关系隐患。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '历史性让步',
          description: '在核心利益上做出意外让步。',
          example: '我从来没有想过这会发生在我的任期内。'
        }
      ],
      keyPhrases: [
        { phrase: '2+4机制', meaning: '两德加四大国的统一谈判框架', usage: '解决战后遗留问题的创新机制' }
      ]
    },
    lessons: [
      '历史性机遇需要果断行动',
      '经济补偿可以换取政治让步',
      '大国协调是解决重大国际问题的关键'
    ],
    sources: [
      'Mary Elise Sarotte, "The Collapse"',
      'Philip Zelikow & Condoleezza Rice, "German Unity"'
    ]
  },
  {
    id: 'dayton-accords-1995',
    name: '代顿协议',
    year: 1995,
    parties: {
      self: { name: '伊泽特贝戈维奇', country: '波斯尼亚', flag: '🇧🇦' },
      opponent: { name: '卡拉季奇', country: '塞族', flag: '🇷🇸' },
    },
    topic: '波黑战争结束与和平重建',
    background: {
      summary: '1995年11月，波黑塞族、克罗地亚族和波斯尼亚穆斯林三方在美国代顿签署和平协议，结束三年血腥内战。协议建立了复杂的权力分享机制，至今仍在运作。',
      historicalContext: '1992年波黑宣布独立后爆发内战，造成约10万人死亡。北约轰炸和克罗地亚军队反攻改变了军事平衡，促成了谈判。',
      keyInterests: {
        self: ['维护统一国家', '保护穆斯林权利', '获得国际承认'],
        opponent: ['民族自决', '与塞尔维亚联系', '领土控制'],
        opponent2: ['联邦团结', '克罗地亚族权利', '欧洲一体化']
      },
      constraints: {
        self: ['军事劣势', '国际压力', '内部派系'],
        opponent: ['军事失败', '国际制裁', '经济困境']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '代顿谈判',
          summary: '在美国空军基地举行的秘密谈判。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '接受和平方案',
              language: '我们不情愿但被迫接受这个协议，它并不完美。',
              analysis: '卡拉季奇承认谈判桌上的失败。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'partial',
      score: 50,
      agreement: '建立波斯尼亚和黑塞哥维那联邦和塞族共和国两个实体，共享中央政府权力。设立高级代表监督协议执行。',
      keyTerms: ['两个实体', '权力分享', '国际监督'],
      consequences: '协议维持了和平但未能实现真正和解。波黑至今是两个实体的高度分权状态，政治僵局频发。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '模糊结构',
          description: '建立没有人完全满意但都能接受的安排。',
          example: '这是一个让所有人都不满意但都能接受的方案。'
        }
      ],
      keyPhrases: [
        { phrase: '功能性政府', meaning: '为使政府运转而设计的复杂权力安排', usage: '波黑政治制度的特征' }
      ]
    },
    lessons: [
      '没有人满意的方案可能是最持久的',
      '国际监督是后冲突重建的重要支撑',
      '真正的和解需要几十年而非几年'
    ],
    sources: [
      'Richard Holbrooke, "To End a War"',
      'Samantha Power, "A Problem from Hell"'
    ]
  },
  {
    id: 'noriega-1990',
    name: '巴拿马运河移交谈判',
    year: 1990,
    parties: {
      self: { name: '恩达拉', country: '巴拿马', flag: '🇵🇦' },
      opponent: { name: '布什', country: '美国', flag: '🇺🇸' },
    },
    topic: '运河回归与巴拿马主权',
    background: {
      summary: '1999年12月，巴拿马正式收回巴拿马运河全部主权。这一进程始于1977年托里霍斯-卡特条约，规定美国1999年后完全交还运河。',
      historicalContext: '1903年美国获得运河开凿权和永久使用权。巴拿马民族主义者长期要求收回主权。1977年条约开启了回归进程。',
      keyInterests: {
        self: ['收回运河主权', '经济利益最大化', '国际地位提升'],
        opponent: ['保护运河通行权', '地区影响力', '民主化进程']
      },
      constraints: {
        self: ['经济依赖', '管理能力', '美国影响'],
        opponent: ['国内政治', '运河使用国利益', '军事基地存续']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '条约执行',
          summary: '按1977年条约规定完成移交。',
          keyMoments: [
            {
              speaker: 'self',
              action: '庆祝移交',
              language: '今天巴拿马人民收回了属于我们的宝贵财富。',
              analysis: '1999年运河仪式标志历史性时刻。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'success',
      score: 85,
      agreement: '巴拿马完全收回运河主权和管理权。美国保留在运河区的军事基地，但期限有限。',
      keyTerms: ['运河主权', '归还条约', '跨国合作'],
      consequences: '运河移交顺利完成，巴拿马获得重要国家象征。运河至今仍是重要国际航道，为巴拿马带来可观经济收益。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '长期规划',
          description: '通过渐进方式实现最终目标。',
          example: '1977年的条约为1999年的回归奠定了基础。'
        }
      ],
      keyPhrases: [
        { phrase: '民族骄傲', meaning: '收回国家象征性资源的主权要求', usage: '第三世界国家外交的重要动力' }
      ]
    },
    lessons: [
      '长期条约可以为未来奠定基础',
      '经济实力可以转化为政治让步',
      '国际条约的执行需要持续外交努力'
    ],
    sources: [
      'Walter LeFeber, "The Panama Canal"',
      'Michael L. K. Lee, "Panama\'s Canal"'
    ]
  },
  {
    id: 'uganda-rwanda-border-2000',
    name: '大湖地区和平与稳定',
    year: 2000,
    parties: {
      self: { name: '卡加梅', country: '卢旺达', flag: '🇷🇼' },
      opponent: { name: '穆塞韦尼', country: '乌干达', flag: '🇺🇬' },
    },
    topic: '非洲区域安全合作',
    background: {
      summary: '大湖地区经历了1994年卢旺达种族灭绝后的动荡。卢旺达和乌干达曾是盟友，共同支持刚果民主共和国反叛武装，但后来因利益冲突关系紧张。',
      historicalContext: '1994年卢旺达种族灭绝后，卡加梅政权得到乌干达支持。但两国在刚果资源争夺上产生矛盾，1999年爆发直接冲突。',
      keyInterests: {
        self: ['国家安全', '地区影响力', '资源控制'],
        opponent: ['安全合作', '反叛武装管控', '经济利益']
      },
      constraints: {
        self: ['历史恩怨', '内部政治', '国际压力'],
        opponent: ['边境安全', '经济发展', '域外大国']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '和平协议',
          summary: '在各方压力下实现停火。',
          keyMoments: [
            {
              speaker: 'self',
              action: '签署停火',
              language: '我们同意停止敌对行动，但这不意味着我们放弃我们的关切。',
              analysis: '双方在压力下实现初步和解。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'partial',
      score: 35,
      agreement: '实现停火，建立边境缓冲区。但根本性分歧仍然存在，地区冲突以不同形式持续。',
      keyTerms: ['边境停火', '区域合作', '资源争夺'],
      consequences: '大湖地区冲突仍在继续，刚果民主共和国成为地区代理战争的舞台。完全和平仍遥不可及。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '临时停火',
          description: '接受暂时停火而非永久和平。',
          example: '让我们先停止战斗，再讨论其他问题。'
        }
      ],
      keyPhrases: [
        { phrase: '代理人战争', meaning: '通过支持当地武装间接参与冲突', usage: '大湖地区冲突的典型模式' }
      ]
    },
    lessons: [
      '资源共享可以成为冲突根源',
      '盟友关系可能因利益变化而改变',
      '区域冲突需要区域解决方案'
    ],
    sources: [
      'David R. Cameron, "The Great Lakes Region"',
      'ICG Reports on Central Africa'
    ]
  },
  {
    id: 'africa-continental-free-trade-2018',
    name: '非洲大陆自由贸易区',
    year: 2018,
    parties: {
      self: { name: '祖马', country: '南非', flag: '🇿🇦' },
      opponent: { name: '塞西', country: '埃及', flag: '🇪🇬' },
    },
    topic: '非洲经济一体化',
    background: {
      summary: '2018年3月，非洲联盟52个国家签署建立非洲大陆自由贸易区（AfCFTA）协议，旨在打造全球最大自由贸易区，覆盖13亿人口，GDP合计2.2万亿美元。',
      historicalContext: '非洲区域内贸易长期低于其他地区。区域内贸易仅占非洲总贸易的15%，远低于亚洲的50%以上。AfCFTA旨在改变这一状况。',
      keyInterests: {
        self: ['市场扩大', '工业化促进', '发展经验分享'],
        opponent: ['贸易便利化', '投资吸引', '区域物流枢纽']
      },
      constraints: {
        self: ['基础设施不足', '关税收入损失', '政治协调'],
        opponent: ['经济多样性', '贸易逆差', '执行能力']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '协议签署',
          summary: '在非盟峰会期间完成签署。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '推动协议',
              language: '非洲必须开始贸易而不是仅出口原材料，我们需要自己的工业。',
              analysis: '非洲领导人寻求经济转型。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'success',
      score: 70,
      agreement: '建立非洲大陆自由贸易区，逐步取消90%的商品关税，建立争端解决机制，启动非洲单一航空市场。',
      keyTerms: ['大陆自贸区', '工业化', '贸易便利化'],
      consequences: 'AfCFTA将深刻改变非洲经济格局。但执行面临基础设施、海关效率、政策协调等重大挑战。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '愿景描绘',
          description: '用宏大目标激励参与。',
          example: '这将是非洲的世纪，从今天开始。'
        }
      ],
      keyPhrases: [
        { phrase: '非洲制造', meaning: '在非洲大陆建立工业产能', usage: 'AfCFTA的核心目标' }
      ]
    },
    lessons: [
      '区域一体化可以成为发展催化剂',
      '协议签署只是开始，执行才是关键',
      '基础设施投资是区域一体化的前提'
    ],
    sources: [
      'African Union Official Documents',
      'World Bank AfCFTA Reports'
    ]
  },
  {
    id: 'israel-uae-2020',
    name: '亚伯拉罕协议',
    year: 2020,
    parties: {
      self: { name: '内塔尼亚胡', country: '以色列', flag: '🇮🇱' },
      opponent: { name: '本·扎耶德', country: '阿联酋', flag: '🇦🇪' },
    },
    topic: '中东关系正常化',
    background: {
      summary: '2020年8月，以色列与阿联酋在美国斡旋下签署和平协议，实现关系正常化。这是自1994年约旦和平条约以来首批阿拉伯国家与以色列签署的和平协议。',
      historicalContext: '海湾国家传统上以巴勒斯坦事业作为与以色列关系的前提。但面对伊朗威胁，共同安全利益促使部分阿拉伯国家重新评估与以色列的关系。',
      keyInterests: {
        self: ['地区合法性', '安全合作', '经济利益'],
        opponent: ['美国关系', '以色列技术', '伊朗对抗']
      },
      constraints: {
        self: ['巴勒斯坦问题', '阿拉伯舆论', '穆斯林世界'],
        opponent: ['阿盟立场', '巴勒斯坦民族主义', '伊朗关系']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '秘密接触',
          summary: '美方斡旋下的秘密外交。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '宣布突破',
              language: '我们同意与以色列实现关系正常化，这是和平的新时代。',
              analysis: '阿联酋以巴勒斯坦冻结定居点为借口达成协议。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'success',
      score: 60,
      agreement: '实现关系正常化，建立外交关系。开通直接航班、贸易往来。阿联酋成为首批与以色列建交的海湾国家。',
      keyTerms: ['关系正常化', '亚伯拉罕协议', '新中东'],
      consequences: '亚伯拉罕协议开启了阿拉伯国家与以色列关系正常化浪潮。巴林、摩洛哥、苏丹相继跟进，但巴勒斯坦问题仍悬而未决。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '条件包装',
          description: '以对方让步作为自己决定的借口。',
          example: '由于以色列同意暂停吞并，我们才决定实现关系正常化。'
        }
      ],
      keyPhrases: [
        { phrase: '交易外交', meaning: '以具体利益交换为基础的外交方式', usage: '21世纪中东外交的新模式' }
      ]
    },
    lessons: [
      '共同威胁可以改变传统外交立场',
      '条件可以被创造来为政策转变辩护',
      '地区秩序变革往往始于关键国家'
    ],
    sources: [
      'Dennis Ross, "State of Diplomacy"',
      'Brookings Institution Middle East Analysis'
    ]
  },
  {
    id: 'sanctions-iran-2006',
    name: '伊朗核问题制裁外交',
    year: 2006,
    parties: {
      self: { name: '拉里贾尼', country: '伊朗', flag: '🇮🇷' },
      opponent: { name: '赖斯', country: '美国', flag: '🇺🇸' },
    },
    topic: '制裁与谈判的博弈',
    background: {
      summary: '2006年起，联合国安理会通过对伊朗的多轮制裁决议，要求伊朗停止铀浓缩。伊朗拒绝执行，同时寻求谈判解除制裁。美欧与伊朗陷入制裁施压与核谈判的长期博弈。',
      historicalContext: '伊朗核计划引发国际担忧。以色列威胁军事打击。美国试图通过制裁迫使伊朗让步。伊朗则以谈判为策略争取时间。',
      keyInterests: {
        self: ['和平核权利', '避免制裁', '国际地位'],
        opponent: ['阻止伊朗拥核', '中东安全', '盟友保护']
      },
      constraints: {
        self: ['经济困难', '内部强硬派', '技术进展'],
        opponent: ['国际共识', '俄罗斯合作', '以色列压力']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '制裁升级',
          summary: '安理会通过多轮制裁决议。',
          keyMoments: [
            {
              speaker: 'self',
              action: '拒绝执行',
              language: '制裁是非法的，我们不会因为威胁而放弃合法权利。',
              analysis: '伊朗以法律和道义话语对抗制裁。'
            },
            {
              speaker: 'opponent',
              action: '推动制裁',
              language: '伊朗必须选择：是谈判还是孤立。',
              analysis: '美国以制裁换取谈判筹码。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'partial',
      score: 40,
      agreement: '制裁逐步升级，伊朗部分遵守核协议但未完全满足要求。2015年达成JCPOA协议，但2018年美国退出。',
      keyTerms: ['制裁升级', '核权利', '孤立与接触'],
      consequences: '制裁成为伊朗政策的核心变量。伊朗在压力下谈判但保留核能力，最终走向对抗。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '法律话语',
          description: '以国际法为自己立场辩护。',
          example: 'NPT赋予我们和平利用核能的不可剥夺权利。'
        }
      ],
      keyPhrases: [
        { phrase: 'NPT权利', meaning: '不扩散核武器条约赋予的合法权利', usage: '伊朗核谈判的核心话语' }
      ]
    },
    lessons: [
      '制裁可以施压但难以改变根本立场',
      '核谈判需要长期博弈',
      '单边退出协议可以摧毁外交努力'
    ],
    sources: [
      'Kenneth Katzman, "Iran Sanctions"',
      'Ray Takeyh, "The Hidden Hand"'
    ]
  },
  {
    id: 'ukraine-nato-2008',
    name: '乌克兰加入北约问题',
    year: 2008,
    parties: {
      self: { name: '尤先科', country: '乌克兰', flag: '🇺🇦' },
      opponent: { name: '普京', country: '俄罗斯', flag: '🇷🇺' },
    },
    topic: '北约东扩与俄罗斯红线',
    background: {
      summary: '2008年布加勒斯特北约峰会发表声明，乌克兰和格鲁吉亚"将成为北约成员国"。这一声明被普遍认为是导致2008年俄格战争的直接原因之一。',
      historicalContext: '冷战结束后，北约持续东扩，将前苏联势力范围国家纳入西方阵营。俄罗斯视北约东扩为安全威胁，尤其关注乌克兰和格鲁吉亚。',
      keyInterests: {
        self: ['加入北约', '西方保护', '欧洲一体化'],
        opponent: ['阻止北约扩张', '势力范围维护', '地区影响力']
      },
      constraints: {
        self: ['国内分歧', '俄罗斯压力', '北约条件'],
        opponent: ['西方反对', '军事能力', '地区反应']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '北约峰会',
          summary: '北约发表争议性声明。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '发出警告',
              language: '乌克兰和格鲁吉亚加入北约是俄罗斯的红线，这将产生后果。',
              analysis: '普京在峰会期间发出直接警告。'
            },
            {
              speaker: 'self',
              action: '寻求入盟',
              language: '加入北约是乌克兰的主权选择，俄罗斯无权干涉。',
              analysis: '乌克兰坚持主权权利。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'partial',
      score: -40,
      agreement: '北约发表声明表示乌克兰"将成为成员国"，但未给出具体时间表。俄罗斯将此视为挑衅。',
      keyTerms: ['北约东扩', '俄罗斯红线', '势力范围'],
      consequences: '2008年俄格战争爆发。乌克兰危机最终演变为2022年俄乌全面战争。北约东扩成为冷战后欧洲安全最大争议。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '红线设定',
          description: '明确表达不可逾越的底线。',
          example: '这是我们的红线，请不要测试它。'
        }
      ],
      keyPhrases: [
        { phrase: '势力范围', meaning: '大国对其周边国家的控制和影响区域', usage: '国际关系中争议概念' }
      ]
    },
    lessons: [
      '安全关切往往导致安全困境',
      '外交语言可能被对方视为挑衅',
      '模糊承诺可能产生不可预期的后果'
    ],
    sources: [
      'Rolf Tamnes, "NATO Expansion"',
      'Stephen Walt, "The Spread of NATO"'
    ]
  },
  {
    id: 'south-china-sea-arbitration-2016',
    name: '南海仲裁最终裁决',
    year: 2016,
    parties: {
      self: { name: '杜特尔特', country: '菲律宾', flag: '🇵🇭' },
      opponent: { name: '习近平', country: '中国', flag: '🇨🇳' },
    },
    topic: '南海仲裁与中菲关系转变',
    background: {
      summary: '2016年7月，海牙常设仲裁法院就菲律宾提起的南海仲裁案作出最终裁决，全面支持菲律宾主张。但菲律宾新总统杜特尔特选择搁置裁决，转而发展中菲关系。',
      historicalContext: '菲律宾在阿基诺三世任内向仲裁庭提起诉讼。裁决结果被中国拒绝接受。杜特尔特上任后调整对华政策，以经济合作为先。',
      keyInterests: {
        self: ['获得法理支持', '中菲合作', '务实外交'],
        opponent: ['维护断续线', '地区影响力', '双边解决']
      },
      constraints: {
        self: ['国内民族主义', '美国因素', '仲裁执行'],
        opponent: ['法理压力', '地区平衡', '国际形象']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '裁决与回应',
          summary: '仲裁庭作出裁决，中国拒绝接受。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '搁置裁决',
              language: '菲律宾愿意与中国对话，仲裁裁决可以等待。',
              analysis: '杜特尔特选择务实而非法理优先。'
            },
            {
              speaker: 'self',
              action: '不接受裁决',
              language: '仲裁庭对此案没有管辖权，中国不会接受这一裁决。',
              analysis: '中国拒绝裁决，但避免直接对抗。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'partial',
      score: 45,
      agreement: '裁决具有法律效力但未获执行。中菲在南海展开务实合作，包括共同开发油气资源。但仲裁结果仍为悬案。',
      keyTerms: ['仲裁裁决', '搁置争议', '务实合作'],
      consequences: '杜特尔特的政策转变改善了中菲关系，但也引发国内批评。仲裁案成为国际法与务实外交张力的典型案例。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '选择性接受',
          description: '承认裁决存在但暂不执行。',
          example: '裁决就在那里，但我们选择对话。'
        }
      ],
      keyPhrases: [
        { phrase: '战略模糊', meaning: '不明确表态以保留灵活性的策略', usage: '小国在大国间生存的智慧' }
      ]
    },
    lessons: [
      '法律胜利不等于外交胜利',
      '小国可以在法理和利益间做出选择',
      '双边谈判可以绕过多边机制'
    ],
    sources: [
      'PCLJ South China Sea Arbitration Award',
      'Council on Foreign Relations Analysis 2016'
    ]
  },
  {
    id: 'arctic-council-1996',
    name: '北极理事会合作机制',
    year: 1996,
    parties: {
      self: { name: '叶利钦', country: '俄罗斯', flag: '🇷🇺' },
      opponent: { name: '克林顿', country: '美国', flag: '🇺🇸' },
    },
    topic: '北极治理与资源竞争',
    background: {
      summary: '1996年，北极八国成立北极理事会作为高纬度地区环境与可持续发展的多边合作平台。随着气候变化导致北极资源开发可能性增加，理事会成为大国博弈的新场所。',
      historicalContext: '冷战结束后，北极从军事对峙前线转变为合作区域。气候变化使北极航道和资源开发成为可能，引发新的竞争。',
      keyInterests: {
        self: ['资源权益', '航道控制', '科学研究'],
        opponent: ['环境保护', '航行自由', '规则制定']
      },
      constraints: {
        self: ['环境关切', '俄罗斯影响', '原住民权利'],
        opponent: ['军事存在', '经济利益', '气候变化']
      }
    },
    negotiationProcess: {
      phases: [
        {
          name: '理事会成立',
          summary: '八国就环境合作框架达成一致。',
          keyMoments: [
            {
              speaker: 'opponent',
              action: '推动合作',
              language: '北极的未来取决于我们的合作，而不是竞争。',
              analysis: '冷战后的和解氛围促进合作。'
            }
          ]
        }
      ]
    },
    outcome: {
      result: 'success',
      score: 65,
      agreement: '建立北极理事会，涵盖环境保护、可持续发展、原住民事务。俄罗斯担任2013-2015年轮值主席。',
      keyTerms: ['多边合作', '环境治理', '资源竞争'],
      consequences: '北极理事会面临新挑战：气候变化加速，美国拒绝气候变化条约框架。中俄在北极合作加深。'
    },
    languageAnalysis: {
      techniques: [
        {
          name: '议题限制',
          description: '将敏感军事政治议题排除在外。',
          example: '理事会专注于环境保护，不涉及安全问题。'
        }
      ],
      keyPhrases: [
        { phrase: '和平利用', meaning: '对资源开发的合法性话语', usage: '北极话语的核心概念' }
      ]
    },
    lessons: [
      '环境合作可以在大国竞争中建立信任',
      '议题选择决定了合作的可能性',
      '气候变化正在改变地缘政治格局'
    ],
    sources: [
      'Arctic Council Official Documents',
      'International Institute for Strategic Studies Arctic Reports'
    ]
  }
];

export const runtime = "nodejs";

// 案例ID别名映射
const caseAliases: Record<string, string> = {
  'campdavid': 'camp-david-1978',
  '戴维营': 'camp-david-1978',
  'vienna': 'vienna-congress-1815',
  '维也纳': 'vienna-congress-1815',
  'versailles': 'versailles-1919',
  '凡尔赛': 'versailles-1919',
  'munich': 'munich-1938',
  '慕尼黑': 'munich-1938',
  'yalta': 'yalta-1945',
  '雅尔塔': 'yalta-1945',
  'korean': 'korean-armistice-1953',
  '朝鲜停战': 'korean-armistice-1953',
  'usjapan': 'us-japan-car-1981',
  '日美汽车': 'us-japan-car-1981',
  'nixon': 'nixon-china-1972',
  '尼克松': 'nixon-china-1972',
  'brexit': 'brexit-negotiation-2016-2020',
  '脱欧': 'brexit-negotiation-2016-2020',
  'hongkong': 'sino-british-hongkong-1984',
  '香港': 'sino-british-hongkong-1984',
  'southchinasea': 'south-china-sea-doc-2002',
  '南海': 'south-china-sea-doc-2002',
  'iran': 'iran-nuclear-2015',
  '伊朗核': 'iran-nuclear-2015',
  'philippineschinaarbitration2016': 'philippines-china-arbitration-2016',
  '中菲仲裁': 'philippines-china-arbitration-2016',
  '仲裁': 'philippines-china-arbitration-2016',
  'parisclimate': 'paris-climate-2015',
  '巴黎协定': 'paris-climate-2015',
  '气候': 'paris-climate-2015',
  'coldwar': 'cold-war-hypothetical-01',
  '古巴': 'cold-war-hypothetical-01',
  'scifi': 'scifi-hypothetical-01',
  '科幻': 'scifi-hypothetical-01',
  'northkorea': 'us-north-korea-summit-2018',
  '特金会': 'us-north-korea-summit-2018',
  'rcep': 'rcep-2020',
};

function resolveCaseId(inputId: string): string | null {
  const decoded = decodeURIComponent(inputId);
  const normalized = decoded.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\u4e00-\u9fa5-]/g, '');
  
  // 直接匹配
  if (diplomaticCases.some(c => c.id === normalized)) {
    return normalized;
  }
  
  // 别名映射
  const normalizedNoDash = normalized.replace(/-/g, '');
  for (const [alias, actualId] of Object.entries(caseAliases)) {
    const aliasNoDash = alias.replace(/-/g, '');
    if (aliasNoDash.length >= 4) {
      if (normalizedNoDash.includes(aliasNoDash) || aliasNoDash.includes(normalizedNoDash)) {
        return actualId;
      }
    }
  }
  
  // 模糊匹配
  for (const dCase of diplomaticCases) {
    const caseName = dCase.name.toLowerCase();
    const caseNameNoDash = caseName.replace(/[^a-z0-9\u4e00-\u9fa5]/g, '');
    const caseIdNoDash = dCase.id.replace(/-/g, '');
    
    if (normalizedNoDash.includes(caseIdNoDash) || caseIdNoDash.includes(normalizedNoDash) ||
        normalizedNoDash.includes(caseNameNoDash) || caseNameNoDash.includes(normalizedNoDash)) {
      return dCase.id;
    }
  }
  
  return null;
}

// 获取案例详情
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  if (!id) {
    return NextResponse.json(
      { error: 'Missing id parameter' },
      { status: 400 }
    );
  }
  
  const resolvedId = resolveCaseId(id);
  
  if (!resolvedId) {
    return NextResponse.json(
      { error: 'Case not found', searchedId: id },
      { status: 404 }
    );
  }
  
  const dCase = diplomaticCases.find(c => c.id === resolvedId);
  
  if (!dCase) {
    return NextResponse.json(
      { error: 'Case not found', searchedId: id, resolvedId },
      { status: 404 }
    );
  }
  
  return NextResponse.json(dCase);
}
