// 历史国家数据库 - 用于模拟不同历史时期的外交谈判

export interface HistoricalCountry {
  id: string;
  name: string;
  flag: string;
  region: string;
  era: 'cold-war' | 'post-cold-war';
  existedUntil?: string;  // 何时消失（如苏联1991）
  
  historicalBackground: {
    brief: string;
    detailed: string;
    keyHistoricalEvents: string[];
    culturalTraits: string[];
    diplomaticTraditions: string[];
  };
  
  personality: {
    aggression: number;
    flexibility: number;
    patience: number;
    riskTolerance: number;
    nationalism: number;
    multilateralOrientation: number;
    bilateralOrientation: number;
  };
  
  negotiationStyle: {
    primary: string;
    secondary: string;
    approach: string;
    communication: string;
  };
  
  coreInterests: string[];
  importantInterests: string[];
  negotiableInterests: string[];
  leveragePoints: string[];
  typicalStrategies: string[];
  vulnerabilities: string[];
  languageStyle: {
    formality: 'formal' | 'semi-formal' | 'casual';
    directness: 'high' | 'medium' | 'low';
    emotionInvolvement: 'high' | 'medium' | 'low';
  };
  capabilities: string[];
}

export const historicalCountries: HistoricalCountry[] = [
  // ==================== 冷战时期 ====================
  {
    id: 'soviet-union',
    name: '苏联',
    flag: '☭',
    region: 'Europe/Asia',
    era: 'cold-war',
    existedUntil: '1991',
    historicalBackground: {
      brief: '世界上第一个社会主义国家，冷战时期与美国并立的超级大国',
      detailed: '苏联通过十月革命建立，是世界上第一个社会主义国家。在斯大林时期形成了高度集中的计划经济体制和极权政治。赫鲁晓夫时期开始去斯大林化但保持了社会主义制度。苏联在军事上与美国并立为超级大国，但在经济效率和技术创新上始终落后于西方。意识形态输出是苏联外交的核心驱动力之一。',
      keyHistoricalEvents: [
        '1917年十月革命',
        '1922年苏联成立',
        '1924年列宁逝世，斯大林上台',
        '1930年代大清洗',
        '1941年卫国战争爆发',
        '1945年雅尔塔会议',
        '1949年柏林封锁危机',
        '1953年斯大林逝世',
        '1962年古巴导弹危机',
        '1968年布拉格之春',
        '1979年阿富汗战争',
        '1985年戈尔巴乔夫改革',
        '1991年苏联解体'
      ],
      culturalTraits: ['集体主义', '革命理想', '国家安全焦虑', '大国沙文主义', '意识形态优先'],
      diplomaticTraditions: ['意识形态输出', '缓冲地带理论', '社会主义阵营团结', '不结盟运动争取', '核威慑平衡']
    },
    personality: {
      aggression: 8,
      flexibility: 4,
      patience: 7,
      riskTolerance: 8,
      nationalism: 9,
      multilateralOrientation: 6,
      bilateralOrientation: 8
    },
    negotiationStyle: {
      primary: 'competitive',
      secondary: 'positional',
      approach: 'positional',
      communication: 'formal'
    },
    coreInterests: ['社会主义制度安全', '势力范围保障', '军事安全', '意识形态传播'],
    importantInterests: ['东欧盟友关系', '核武器优势', '太空竞赛领先', '第三世界影响力'],
    negotiableInterests: ['裁军细节', '贸易条款', '局部地区影响力分配'],
    leveragePoints: ['军事力量', '核武器库', '能源资源', '安理会否决权', '社会主义阵营'],
    typicalStrategies: ['意识形态分化', '军备竞赛拖垮', '第三世界渗透', '缓冲区建设', '峰会外交'],
    vulnerabilities: ['经济效率低下', '计划经济弊端', '民族矛盾', '军备竞赛负担', '意识形态僵化'],
    languageStyle: {
      formality: 'formal',
      directness: 'high',
      emotionInvolvement: 'high'
    },
    capabilities: ['军事力量', '核武器', '太空技术', '能源资源', '意识形态吸引力']
  },
  
  {
    id: 'east-germany',
    name: '东德（民主德国）',
    flag: '🇩🇪',
    region: 'Europe',
    era: 'cold-war',
    existedUntil: '1990',
    historicalBackground: {
      brief: '社会主义东欧的"优等生"，柏林墙的守卫者',
      detailed: '东德是苏联模式下最成功的社会主义国家之一，经济和生活水平在社会主义阵营中最高。但其合法性始终受到西德的挑战，最终在1989年民主化浪潮中柏林墙倒塌，1990年两德统一。',
      keyHistoricalEvents: [
        '1949年东德成立',
        '1961年柏林墙建立',
        '1970年代经济繁荣期',
        '1987年戈尔巴乔夫改革影响',
        '1989年和平统一',
        '1990年两德统一'
      ],
      culturalTraits: ['纪律性强', '服从传统', '工作效率高', '民族自豪感'],
      diplomaticTraditions: ['紧跟苏联', '维护社会主义制度', '东西德对立']
    },
    personality: {
      aggression: 6,
      flexibility: 3,
      patience: 8,
      riskTolerance: 4,
      nationalism: 7,
      multilateralOrientation: 4,
      bilateralOrientation: 8
    },
    negotiationStyle: {
      primary: 'positional',
      secondary: 'cooperative',
      approach: 'positional',
      communication: 'formal'
    },
    coreInterests: ['制度安全', '国家存续', '经济发展'],
    importantInterests: ['与苏联关系', '西德关系', '欧洲和平'],
    negotiableInterests: ['经济合作', '人员交流'],
    leveragePoints: ['地理位置', '经济实力（社会主义阵营内）', '苏联支持'],
    typicalStrategies: ['制度防御', '意识形态斗争', '经济合作', '人员管控'],
    vulnerabilities: ['合法性不足', '人口外流', '经济竞争力不如西德'],
    languageStyle: {
      formality: 'formal',
      directness: 'medium',
      emotionInvolvement: 'low'
    },
    capabilities: ['工业基础', '教育水平', '组织能力']
  },
  
  {
    id: 'west-germany',
    name: '西德（联邦德国）',
    flag: '🇩🇪',
    region: 'Europe',
    era: 'cold-war',
    existedUntil: '1990',
    historicalBackground: {
      brief: '经济奇迹的创造者，欧洲一体化的推动者',
      detailed: '西德在战后通过马歇尔计划和自身的勤奋重建了经济，创造了"经济奇迹"。在阿登纳时期确立了向西方倾斜的外交政策，勃兰特时期通过东方政策改善与东欧关系。卡尔斯鲁厄秩序和欧洲一体化是西德外交的核心。',
      keyHistoricalEvents: [
        '1949年西德成立',
        '1950年代经济奇迹',
        '1957年罗马条约',
        '1963年戴高乐-阿登纳合作',
        '1969年勃兰特东方政策',
        '1972年东西德基础条约',
        '1989年柏林墙倒塌',
        '1990年两德统一'
      ],
      culturalTraits: ['勤奋务实', '规则意识', '欧洲认同', '历史责任感'],
      diplomaticTraditions: ['西方一体化', '欧洲融合', '东方政策', '和平主义']
    },
    personality: {
      aggression: 3,
      flexibility: 7,
      patience: 7,
      riskTolerance: 4,
      nationalism: 5,
      multilateralOrientation: 10,
      bilateralOrientation: 4
    },
    negotiationStyle: {
      primary: 'cooperative',
      secondary: 'principled',
      approach: 'interest-based',
      communication: 'direct'
    },
    coreInterests: ['欧洲一体化', '与西方盟友关系', '经济竞争力', '和平环境'],
    importantInterests: ['与东方和解', '德国统一', '贸易开放'],
    negotiableInterests: ['农业政策', '预算分摊', '移民政策'],
    leveragePoints: ['经济实力', '欧洲核心地位', '地理中心位置'],
    typicalStrategies: ['欧洲一体化', '经济务实主义', '东方政策', '多边合作'],
    vulnerabilities: ['历史包袱', '军事依赖美国', '分裂国家地位'],
    languageStyle: {
      formality: 'formal',
      directness: 'high',
      emotionInvolvement: 'low'
    },
    capabilities: ['经济实力', '工业基础', '欧洲整合能力']
  },
  
  {
    id: 'yugoslavia',
    name: '南斯拉夫',
    flag: '★',
    region: 'Balkans',
    era: 'cold-war',
    existedUntil: '1992',
    historicalBackground: {
      brief: '不结盟运动领袖，"第三条道路"的探索者',
      detailed: '南斯拉夫在铁托时期走出了一条既不属于西方也不属于苏联的"第三条道路"，成为不结盟运动的领袖国家。其独特的多民族共存模式和工人自治制度曾被视为社会主义的另一种可能，但最终还是在内忧外患中解体。',
      keyHistoricalEvents: [
        '1945年南斯拉夫联邦成立',
        '1948年与苏联分裂',
        '1950年代工人自治',
        '1961年发起不结盟运动',
        '1974年新宪法',
        '1980年铁托逝世',
        '1990年代初内战',
        '1992年正式解体'
      ],
      culturalTraits: ['民族多元', '独立自主', '实用主义', '地中海特质'],
      diplomaticTraditions: ['不结盟原则', '东西方平衡', '第三世界领导', '地区霸权']
    },
    personality: {
      aggression: 6,
      flexibility: 8,
      patience: 5,
      riskTolerance: 7,
      nationalism: 6,
      multilateralOrientation: 8,
      bilateralOrientation: 5
    },
    negotiationStyle: {
      primary: 'creative',
      secondary: 'cooperative',
      approach: 'interest-based',
      communication: 'indirect'
    },
    coreInterests: ['国家统一', '不结盟地位', '巴尔干领导权'],
    importantInterests: ['民族关系平衡', '经济发展', '领土完整'],
    negotiableInterests: ['经济合作', '贸易条款'],
    leveragePoints: ['战略位置', '不结盟身份', '亚得里亚海出口'],
    typicalStrategies: ['不结盟平衡', '民族调解', '贸易多元化', '地区协调'],
    vulnerabilities: ['民族矛盾', '经济困难', '地区不稳定'],
    languageStyle: {
      formality: 'formal',
      directness: 'medium',
      emotionInvolvement: 'medium'
    },
    capabilities: ['地区影响力', '不结盟领导力', '地理优势']
  },
  
  {
    id: 'czechoslovakia',
    name: '捷克斯洛伐克',
    flag: '✯',
    region: 'Central Europe',
    era: 'cold-war',
    existedUntil: '1993',
    historicalBackground: {
      brief: '中欧民主传统与社会主义试验的交织',
      detailed: '捷克斯洛伐克具有深厚的民主传统，1938年慕尼黑协定使其遭受西方背叛。1948年共产党政变后成为苏联阵营成员，1968年布拉格之春的改革运动被苏联镇压。后通过天鹅绒革命和平转型，1993年和平分立为捷克和斯洛伐克两国。',
      keyHistoricalEvents: [
        '1918年一战后独立',
        '1938年慕尼黑协定',
        '1948年共产党政变',
        '1968年布拉格之春',
        '1968年华约入侵',
        '1989年天鹅绒革命',
        '1993年天鹅绒分离'
      ],
      culturalTraits: ['民主传统', '知识分子气质', '改革精神', '欧洲认同'],
      diplomaticTraditions: ['亲西方倾向', '欧洲一体化', '人权关注']
    },
    personality: {
      aggression: 4,
      flexibility: 7,
      patience: 6,
      riskTolerance: 4,
      nationalism: 6,
      multilateralOrientation: 8,
      bilateralOrientation: 5
    },
    negotiationStyle: {
      primary: 'principled',
      secondary: 'cooperative',
      approach: 'principled',
      communication: 'direct'
    },
    coreInterests: ['主权独立', '欧洲归属', '民主制度'],
    importantInterests: ['经济发展', '与苏联关系正常化'],
    negotiableInterests: ['经济合作', '贸易安排'],
    leveragePoints: ['工业基础', '地理位置', '人才储备'],
    typicalStrategies: ['制度改良', '渐进改革', '国际支持', '经济优先'],
    vulnerabilities: ['苏联控制', '经济困难', '民族问题'],
    languageStyle: {
      formality: 'formal',
      directness: 'high',
      emotionInvolvement: 'medium'
    },
    capabilities: ['工业实力', '教育水平', '改革经验']
  },
  
  {
    id: 'cold-war-usa',
    name: '美国（冷战时期）',
    flag: '🇺🇸',
    region: 'North America',
    era: 'cold-war',
    historicalBackground: {
      brief: '自由世界的领袖，反共十字军战士',
      detailed: '冷战时期的美国处于国力巅峰期，通过马歇尔计划重建西欧，通过北约组织联盟体系，通过核威慑遏制苏联。其外交特点是意识形态色彩浓厚，强调自由民主价值观，积极在全球推广美国模式。',
      keyHistoricalEvents: [
        '1947年杜鲁门主义',
        '1948年马歇尔计划',
        '1949年北约成立',
        '1950年代麦卡锡主义',
        '1962年古巴导弹危机',
        '1970年代越战泥潭',
        '1972年尼克松访华',
        '1979年伊朗革命'
      ],
      culturalTraits: ['使命感强', '乐观主义', '实用主义', '个人主义', '例外论'],
      diplomaticTraditions: ['自由主义国际秩序', '联盟体系', '意识形态输出', '实力外交']
    },
    personality: {
      aggression: 8,
      flexibility: 5,
      patience: 5,
      riskTolerance: 7,
      nationalism: 8,
      multilateralOrientation: 6,
      bilateralOrientation: 6
    },
    negotiationStyle: {
      primary: 'competitive',
      secondary: 'assertive',
      approach: 'positional',
      communication: 'direct'
    },
    coreInterests: ['反共事业', '国家安全', '盟友体系', '经济利益'],
    importantInterests: ['核优势', '第三世界影响', '能源安全'],
    negotiableInterests: ['局部地区利益', '贸易条款'],
    leveragePoints: ['核武器优势', '经济实力', '盟友网络', '文化软实力'],
    typicalStrategies: ['意识形态对抗', '联盟遏制', '实力展示', '经济援助'],
    vulnerabilities: ['越战阴影', '国内反战运动', '经济危机'],
    languageStyle: {
      formality: 'semi-formal',
      directness: 'high',
      emotionInvolvement: 'high'
    },
    capabilities: ['军事力量', '经济实力', '核武器', '盟友网络']
  },
  
  {
    id: 'cold-war-china',
    name: '中国（冷战时期）',
    flag: '🇨🇳',
    region: 'East Asia',
    era: 'cold-war',
    historicalBackground: {
      brief: '革命输出与独立自主，社会主义阵营的另类',
      detailed: '新中国成立初期实行"一边倒"外交，倒向苏联阵营。但中苏关系在1950年代末破裂后，中国开始走独立自主路线，既反对美国霸权，也批评苏联修正主义。文革期间外交动荡，1970年代中美关系正常化。',
      keyHistoricalEvents: [
        '1949年新中国成立',
        '1950年朝鲜战争',
        '1958年大跃进',
        '1960年代中苏分裂',
        '1966年文革开始',
        '1971年恢复联合国席位',
        '1972年尼克松访华',
        '1978年改革开放决策'
      ],
      culturalTraits: ['独立自主', '革命理想', '自强不息', '实用主义'],
      diplomaticTraditions: ['和平共处五项原则', '不结盟', '三个世界理论', '独立自主']
    },
    personality: {
      aggression: 7,
      flexibility: 5,
      patience: 8,
      riskTolerance: 6,
      nationalism: 9,
      multilateralOrientation: 5,
      bilateralOrientation: 8
    },
    negotiationStyle: {
      primary: 'competitive',
      secondary: 'principled',
      approach: 'positional',
      communication: 'indirect'
    },
    coreInterests: ['国家安全', '主权独立', '意识形态纯洁'],
    importantInterests: ['经济发展', '领土完整', '第三世界领导'],
    negotiableInterests: ['与美苏关系', '经济合作'],
    leveragePoints: ['人口规模', '战略位置', '核武能力', '第三世界支持'],
    typicalStrategies: ['统一战线', '农村包围城市', '和平共处', '独立自主'],
    vulnerabilities: ['经济落后', '文革动荡', '外交孤立'],
    languageStyle: {
      formality: 'formal',
      directness: 'low',
      emotionInvolvement: 'high'
    },
    capabilities: ['人力资源', '核武能力', '战略纵深', '革命经验']
  },
  
  // ==================== 后冷战时期 ====================
  {
    id: '1990s-russia',
    name: '俄罗斯（后冷战）',
    flag: '🇷🇺',
    region: 'Europe/Asia',
    era: 'post-cold-war',
    historicalBackground: {
      brief: '帝国余晖与屈辱衰退，新强国的艰难崛起',
      detailed: '苏联解体后，俄罗斯继承了大部分遗产但陷入"十年衰退"。叶利钦时代的"休克疗法"导致经济崩溃和社会动荡。北约东扩和西方"背叛"激起了民族主义情绪。普京上台后逐渐恢复大国地位，对西方采取更加强硬的立场。',
      keyHistoricalEvents: [
        '1991年苏联解体',
        '1990年代经济危机',
        '1999年普京上台',
        '2001年美国九一一事件',
        '2008年俄格战争',
        '2014年克里米亚危机',
        '2022年乌克兰战争'
      ],
      culturalTraits: ['大国情怀', '现实主义', '安全焦虑', '战略思维'],
      diplomaticTraditions: ['势力范围', '均势外交', '能源外交', '核威慑']
    },
    personality: {
      aggression: 7,
      flexibility: 4,
      patience: 5,
      riskTolerance: 7,
      nationalism: 9,
      multilateralOrientation: 3,
      bilateralOrientation: 8
    },
    negotiationStyle: {
      primary: 'competitive',
      secondary: 'creative',
      approach: 'positional',
      communication: 'indirect'
    },
    coreInterests: ['大国地位', '势力范围', '国家安全', '经济复苏'],
    importantInterests: ['能源出口', '传统盟友', '北极权益'],
    negotiableInterests: ['制裁减轻', '贸易条款', '非核心利益'],
    leveragePoints: ['能源资源', '军事力量', '核武库', '否决权'],
    typicalStrategies: ['能源杠杆', '军事展示', '联盟分化', '议题挂钩'],
    vulnerabilities: ['经济依赖能源', '人口减少', '技术落后', '国际孤立'],
    languageStyle: {
      formality: 'formal',
      directness: 'medium',
      emotionInvolvement: 'medium'
    },
    capabilities: ['能源资源', '军事力量', '核武库', '否决权']
  },
  
  {
    id: '1990s-usa',
    name: '美国（后冷战时期）',
    flag: '🇺🇸',
    region: 'North America',
    era: 'post-cold-war',
    historicalBackground: {
      brief: '单极时刻与傲慢过头，"历史终结论"的幻灭',
      detailed: '后冷战初期，美国享受着"一超多强"的单极时刻。克林顿政府推动全球化和小布什时期的单边主义。但九一一事件打断了这一进程，伊拉克战争和金融危机严重削弱了美国实力和软实力。',
      keyHistoricalEvents: [
        '1991年海湾战争',
        '1993年世贸中心爆炸',
        '1999年科索沃战争',
        '2001年九一一事件',
        '2003年伊拉克战争',
        '2008年金融危机',
        '2011年阿拉伯之春'
      ],
      culturalTraits: ['乐观主义', '实用主义', '行动导向', '例外论'],
      diplomaticTraditions: ['单极主义', '先发制人', '民主扩展', '联盟管理']
    },
    personality: {
      aggression: 7,
      flexibility: 6,
      patience: 4,
      riskTolerance: 6,
      nationalism: 7,
      multilateralOrientation: 5,
      bilateralOrientation: 7
    },
    negotiationStyle: {
      primary: 'competitive',
      secondary: 'assertive',
      approach: 'positional',
      communication: 'direct'
    },
    coreInterests: ['单极地位', '国土安全', '经济领导', '盟友体系'],
    importantInterests: ['中东秩序', '反恐战争', '核不扩散'],
    negotiableInterests: ['气候协议', '贸易条款', '多边机制改革'],
    leveragePoints: ['军事力量', '美元霸权', '科技优势', '盟友网络'],
    typicalStrategies: ['单边主义', '军事干预', '经济制裁', '联盟建设'],
    vulnerabilities: ['债务危机', '中东泥潭', '盟国离心', '内部极化'],
    languageStyle: {
      formality: 'semi-formal',
      directness: 'high',
      emotionInvolvement: 'medium'
    },
    capabilities: ['军事力量', '金融体系', '科技领先', '软实力']
  },
  
  {
    id: '1990s-eu',
    name: '欧盟（后冷战扩张期）',
    flag: '🇪🇺',
    region: 'Europe',
    era: 'post-cold-war',
    historicalBackground: {
      brief: '一体化深化与东扩，欧元诞生与共同外交的探索',
      detailed: '后冷战初期是欧盟的黄金时代。1992年马斯特里赫特条约奠定了欧元的基础，1999年欧元正式问世。同时欧盟开始向东扩展，吸收前社会主义国家。共同外交与安全政策也在缓慢发展，但成员国间的分歧依然明显。',
      keyHistoricalEvents: [
        '1992年马斯特里赫特条约',
        '1995年申根协定',
        '1997年阿姆斯特丹条约',
        '1999年欧元诞生',
        '2002年欧元纸币流通',
        '2004年东扩10国'
      ],
      culturalTraits: ['规范导向', '制度主义', '共识文化', '超国家主义'],
      diplomaticTraditions: ['多边主义', '规范性力量', '条件性接触', '贸易促进']
    },
    personality: {
      aggression: 2,
      flexibility: 6,
      patience: 8,
      riskTolerance: 3,
      nationalism: 3,
      multilateralOrientation: 10,
      bilateralOrientation: 2
    },
    negotiationStyle: {
      primary: 'cooperative',
      secondary: 'principled',
      approach: 'interest-based',
      communication: 'formal'
    },
    coreInterests: ['一体化深化', '经济繁荣', '和平稳定', '规范传播'],
    importantInterests: ['能源安全', '气候领导', '发展援助'],
    negotiableInterests: ['农业政策', '预算分配', '移民政策'],
    leveragePoints: ['市场规模', '规范软实力', '发展经验', '贸易关系'],
    typicalStrategies: ['多边协调', '条件挂钩', '规范推广', '经济激励'],
    vulnerabilities: ['成员国分歧', '决策效率低', '军事能力不足', '英国脱欧'],
    languageStyle: {
      formality: 'formal',
      directness: 'low',
      emotionInvolvement: 'low'
    },
    capabilities: ['市场规模', '规范软实力', '经济实力', '发展经验']
  },

  // ==================== 冷战时期补充：西方大国 ====================
  {
    id: 'uk-cold-war',
    name: '英国（冷战时期）',
    flag: '🇬🇧',
    region: 'Europe',
    era: 'cold-war',
    historicalBackground: {
      brief: '老牌帝国的余晖，英美特殊关系与帝国遗产',
      detailed: '英国在二战后虽然赢得了战争，却失去了帝国。日不落帝国逐渐瓦解，英镑地位被美元取代。但在丘吉尔、艾登等首相努力下，英国试图维持大国地位，通过英美特殊关系保持影响。苏伊士运河危机暴露了英国实力的局限性，最终促使英国调整外交方向。',
      keyHistoricalEvents: [
        '1945年工党胜选，丘吉尔下台',
        '1947年印度独立',
        '1956年苏伊士运河危机',
        '1960年代非殖民化',
        '1973年加入欧共体'
      ],
      culturalTraits: ['帝国心态', '务实主义', '规则意识', '大西洋主义'],
      diplomaticTraditions: ['均势外交', '帝国联系', '英美特殊关系', '议会外交']
    },
    personality: {
      aggression: 4,
      flexibility: 7,
      patience: 6,
      riskTolerance: 4,
      nationalism: 6,
      multilateralOrientation: 7,
      bilateralOrientation: 6
    },
    negotiationStyle: {
      primary: 'pragmatic',
      secondary: 'principled',
      approach: 'interest-based',
      communication: 'indirect'
    },
    coreInterests: ['英美关系', '大西洋安全', '经济利益', '海外基地'],
    importantInterests: ['帝国遗产', '英联邦联系', '中东石油', '欧洲影响'],
    negotiableInterests: ['殖民地问题', '贸易条款'],
    leveragePoints: ['英联邦网络', '情报能力', '金融中心', '军事基地'],
    typicalStrategies: ['均势外交', '借力美国', '务实妥协', '规范包装'],
    vulnerabilities: ['实力相对衰落', '殖民地负担', '欧洲定位困惑'],
    languageStyle: {
      formality: 'formal',
      directness: 'medium',
      emotionInvolvement: 'low'
    },
    capabilities: ['金融体系', '情报网络', '军事力量', '软实力']
  },

  {
    id: 'france-cold-war',
    name: '法国（冷战时期）',
    flag: '🇫🇷',
    region: 'Europe',
    era: 'cold-war',
    historicalBackground: {
      brief: '戴高乐主义与独立外交，欧洲一体化的发动机',
      detailed: '法国在二战后经历了从沦陷到重生的戏剧性历程。戴高乐将军领导自由法国赢得尊重，战后法国试图恢复大国地位。戴高乐主义强调法国独立，既不完全依附美国，也不完全倒向苏联，在阿尔及利亚战争后完成非殖民化，推动欧洲一体化。',
      keyHistoricalEvents: [
        '1940年法国沦陷',
        '1944年解放',
        '1954年奠边府战役',
        '1958年阿尔及利亚危机',
        '1966年退出北约军事一体化',
        '1963年法德和解'
      ],
      culturalTraits: ['革命传统', '民族自豪', '独立意识', '文化优越'],
      diplomaticTraditions: ['独立外交', '大国地位', '欧洲领导', '地中海视野']
    },
    personality: {
      aggression: 5,
      flexibility: 6,
      patience: 5,
      riskTolerance: 6,
      nationalism: 8,
      multilateralOrientation: 7,
      bilateralOrientation: 6
    },
    negotiationStyle: {
      primary: 'assertive',
      secondary: 'principled',
      approach: 'positional',
      communication: 'direct'
    },
    coreInterests: ['大国地位', '独立核威慑', '欧洲领导', '文化影响'],
    importantInterests: ['非洲法语区', '地中海安全', '经济竞争力'],
    negotiableInterests: ['美法关系', '北约框架', '贸易让步'],
    leveragePoints: ['核能力', '非洲网络', '欧洲一体化引擎', '安理会否决权'],
    typicalStrategies: ['独立自主', '议题挂钩', '欧洲整合', '第三世界外交'],
    vulnerabilities: ['殖民地包袱', '政治不稳定', '经济竞争力'],
    languageStyle: {
      formality: 'formal',
      directness: 'high',
      emotionInvolvement: 'medium'
    },
    capabilities: ['核能力', '军事力量', '文化软实力', '欧洲整合能力']
  },

  // ==================== 冷战时期补充：亚洲国家 ====================
  {
    id: 'vietnam-cold-war',
    name: '越南（冷战时期）',
    flag: '🇻🇳',
    region: 'Southeast Asia',
    era: 'cold-war',
    historicalBackground: {
      brief: '印度支那抗法抗美，越南战争与社会主义统一',
      detailed: '越南在胡志明领导下先是抗法后是抗美，经历了漫长的战争岁月。1954年日内瓦协议暂时分裂南北，1960年代美国介入越战，1973年美军撤退，1975年越南统一。统一后的越南与柬埔寨、中国都发生过冲突，在中苏之间保持平衡。',
      keyHistoricalEvents: [
        '1945年八月革命',
        '1954年日内瓦协议',
        '1960年代越战升级',
        '1973年巴黎协定',
        '1975年统一',
        '1979年中越战争'
      ],
      culturalTraits: ['抗敌传统', '集体主义', '革命意志', '坚韧不拔'],
      diplomaticTraditions: ['人民战争', '统一战线', '中苏平衡', '东南亚领导']
    },
    personality: {
      aggression: 8,
      flexibility: 5,
      patience: 8,
      riskTolerance: 7,
      nationalism: 10,
      multilateralOrientation: 4,
      bilateralOrientation: 7
    },
    negotiationStyle: {
      primary: 'patient',
      secondary: 'strategic',
      approach: 'positional',
      communication: 'indirect'
    },
    coreInterests: ['国家统一', '主权独立', '领土完整', '社会主义制度'],
    importantInterests: ['东南亚领导', '边境安全', '经济发展'],
    negotiableInterests: ['与中苏关系', '区域合作'],
    leveragePoints: ['战争经验', '战略位置', '民族凝聚力', '丛林游击战能力'],
    typicalStrategies: ['持久战', '统一战线', '国际舆论', '边境威慑'],
    vulnerabilities: ['经济落后', '战争创伤', '大国依赖'],
    languageStyle: {
      formality: 'formal',
      directness: 'medium',
      emotionInvolvement: 'high'
    },
    capabilities: ['军事经验', '人民战争', '战略纵深', '组织能力']
  },

  {
    id: 'north-korea',
    name: '朝鲜（冷战时期）',
    flag: '🇰🇵',
    region: 'East Asia',
    era: 'cold-war',
    historicalBackground: {
      brief: '孤立的白头山血统，核威慑下的先军政治',
      detailed: '朝鲜在金日成领导下建立了高度集中和封闭的体制。朝鲜战争后分裂至今，朝鲜坚持自主路线，在中苏之间保持平衡。冷战结束后朝鲜更加孤立，但通过核导计划维持了战略存在感。主体思想是朝鲜官方意识形态，强调自力更生。',
      keyHistoricalEvents: [
        '1948年朝鲜建国',
        '1950-1953年朝鲜战争',
        '1960年代中苏分裂中左右逢源',
        '1990年代大饥荒',
        '2000年代核危机'
      ],
      culturalTraits: ['封闭排外', '军事优先', '主体意识', '苦难辉煌'],
      diplomaticTraditions: ['主体思想', '军事中心', '中苏平衡', '边缘博弈']
    },
    personality: {
      aggression: 9,
      flexibility: 3,
      patience: 9,
      riskTolerance: 9,
      nationalism: 10,
      multilateralOrientation: 1,
      bilateralOrientation: 6
    },
    negotiationStyle: {
      primary: 'coercive',
      secondary: 'strategic',
      approach: 'positional',
      communication: 'indirect'
    },
    coreInterests: ['政权生存', '国家安全', '核威慑', '体制安全'],
    importantInterests: ['经济发展', '粮食安全', '外交承认'],
    negotiableInterests: ['核裁军步骤', '经济援助换取'],
    leveragePoints: ['核导能力', '军事力量', '地缘位置', '动荡风险'],
    typicalStrategies: ['核威慑', '边缘政策', '援助敲诈', '分裂中获利'],
    vulnerabilities: ['经济崩溃', '国际孤立', '粮食短缺', '内部不稳'],
    languageStyle: {
      formality: 'formal',
      directness: 'high',
      emotionInvolvement: 'high'
    },
    capabilities: ['核导能力', '军事力量', '不对称优势', '谈判筹码']
  },

  {
    id: 'south-korea',
    name: '韩国（冷战时期）',
    flag: '🇰🇷',
    region: 'East Asia',
    era: 'cold-war',
    historicalBackground: {
      brief: '汉江奇迹与民主化，美国盟友的崛起',
      detailed: '韩国在朝鲜战争后贫穷落后，但在朴正熙时期创造了"汉江奇迹"，经济快速发展。政治上经历了威权统治到民主化转型。外交上完全倒向美国，在越战中对美提供支持。冷战结束后，随着中苏关系正常化，韩国开始推行北方外交。',
      keyHistoricalEvents: [
        '1948年大韩民国成立',
        '1950-1953年朝鲜战争',
        '1960年代经济起飞',
        '1980年代民主化运动',
        '1988年奥运会'
      ],
      culturalTraits: ['勤奋竞争', '等级意识', '集体荣誉', '经济优先'],
      diplomaticTraditions: ['韩美同盟', '经济发展优先', '务实外交', '北方外交']
    },
    personality: {
      aggression: 4,
      flexibility: 7,
      patience: 6,
      riskTolerance: 5,
      nationalism: 7,
      multilateralOrientation: 6,
      bilateralOrientation: 8
    },
    negotiationStyle: {
      primary: 'pragmatic',
      secondary: 'cooperative',
      approach: 'interest-based',
      communication: 'indirect'
    },
    coreInterests: ['国家安全', '经济发展', '朝鲜统一', '美韩同盟'],
    importantInterests: ['区域合作', '民主价值', '文化输出'],
    negotiableInterests: ['北方政策', '经济合作'],
    leveragePoints: ['经济实力', '美韩同盟', '民主经验', '文化软实力'],
    typicalStrategies: ['经济外交', '北方外交', '多边合作', '软实力推广'],
    vulnerabilities: ['安全依赖美国', '朝鲜威胁', '大国夹缝'],
    languageStyle: {
      formality: 'formal',
      directness: 'medium',
      emotionInvolvement: 'medium'
    },
    capabilities: ['经济实力', '科技能力', '文化软实力', '美国同盟']
  },

  {
    id: 'cuba-cold-war',
    name: '古巴（冷战时期）',
    flag: '🇨🇺',
    region: 'Caribbean',
    era: 'cold-war',
    historicalBackground: {
      brief: '加勒比海的社会主义堡垒，导弹危机的中心',
      detailed: '古巴革命后倒向苏联，1962年导弹危机差点引发核战争。菲德尔·卡斯特罗领导古巴在美国的眼皮底下建设社会主义，古巴成为苏联在西半球唯一的盟友。冷战结束后古巴失去苏联保护，但仍坚持社会主义道路，通过医疗外交等方式维持国际影响力。',
      keyHistoricalEvents: [
        '1959年古巴革命',
        '1961年猪湾事件',
        '1962年导弹危机',
        '1980年马列尔船民事件',
        '1990年代特殊时期'
      ],
      culturalTraits: ['革命精神', '反美传统', '加勒比热情', '医疗外交'],
      diplomaticTraditions: ['反帝斗争', '不结盟', '革命输出', '小国博弈']
    },
    personality: {
      aggression: 8,
      flexibility: 5,
      patience: 9,
      riskTolerance: 8,
      nationalism: 10,
      multilateralOrientation: 6,
      bilateralOrientation: 7
    },
    negotiationStyle: {
      primary: 'ideological',
      secondary: 'strategic',
      approach: 'positional',
      communication: 'direct'
    },
    coreInterests: ['政权生存', '社会主义制度', '主权独立', '国际承认'],
    importantInterests: ['经济发展', '能源安全', '拉丁美洲影响'],
    negotiableInterests: ['与美关系', '经济改革'],
    leveragePoints: ['地缘位置', '反美旗帜', '医疗资源', '革命经验'],
    typicalStrategies: ['反帝斗争', '小国博弈', '同盟苏联', '地区领导'],
    vulnerabilities: ['经济困难', '美国封锁', '盟友减少'],
    languageStyle: {
      formality: 'formal',
      directness: 'high',
      emotionInvolvement: 'high'
    },
    capabilities: ['医疗外交', '反美象征', '战略位置', '革命经验']
  },

  // ==================== 冷战时期补充：中东国家 ====================
  {
    id: 'egypt-cold-war',
    name: '埃及（冷战时期）',
    flag: '🇪🇬',
    region: 'Middle East',
    era: 'cold-war',
    historicalBackground: {
      brief: '纳赛尔的阿拉伯民族主义，不结盟运动创始人之一',
      detailed: '埃及在纳赛尔领导下成为阿拉伯民族主义的中心。苏伊士运河危机中击败英法以三国，展现了阿拉伯世界的力量。埃及在冷战中保持独立，既不倒向美国也不依附苏联，通过不结盟运动在两极之间获取最大利益。萨达特时期转向美国，最终实现与以色列的和平。',
      keyHistoricalEvents: [
        '1952年七月革命',
        '1956年苏伊士运河危机',
        '1967年六日战争',
        '1970年纳赛尔逝世',
        '1973年十月战争',
        '1979年埃以和平条约'
      ],
      culturalTraits: ['阿拉伯民族主义', '法老文明骄傲', '中东领导野心', '务实主义'],
      diplomaticTraditions: ['不结盟', '阿拉伯领导', '苏伊士中心', '和平优先于统一']
    },
    personality: {
      aggression: 6,
      flexibility: 8,
      patience: 5,
      riskTolerance: 7,
      nationalism: 9,
      multilateralOrientation: 8,
      bilateralOrientation: 6
    },
    negotiationStyle: {
      primary: 'strategic',
      secondary: 'pragmatic',
      approach: 'interest-based',
      communication: 'direct'
    },
    coreInterests: ['阿拉伯领导地位', '苏伊士运河控制', '领土完整', '民族尊严'],
    importantInterests: ['经济发展', '地区和平', '巴勒斯坦问题'],
    negotiableInterests: ['与以色列关系', '与美苏关系'],
    leveragePoints: ['苏伊士运河', '阿拉伯世界领袖', '战略位置', '石油资源'],
    typicalStrategies: ['不结盟平衡', '议题挂钩', '石油武器', '地区协调'],
    vulnerabilities: ['以色列威胁', '经济依赖', '国内政治', '美苏压力'],
    languageStyle: {
      formality: 'formal',
      directness: 'high',
      emotionInvolvement: 'high'
    },
    capabilities: ['军事力量', '苏伊士运河', '阿拉伯领导', '不结盟声望']
  },

  {
    id: 'algeria-cold-war',
    name: '阿尔及利亚（独立后）',
    flag: '🇩🇿',
    region: 'North Africa',
    era: 'cold-war',
    historicalBackground: {
      brief: '抗法独立的先驱，社会主义试验与内战创伤',
      detailed: '阿尔及利亚经历了长达八年的抗法战争，于1962年独立，是二战后规模最大的反殖民战争。独立后本·贝拉和布迈丁领导建立了社会主义政权，土地改革和国有化运动曾带来希望，但1990年代的内战造成了巨大创伤。阿尔及利亚在冷战中保持独立外交，与各方都保持关系。',
      keyHistoricalEvents: [
        '1954年民族解放战争开始',
        '1962年独立',
        '1965年布迈丁政变',
        '1988年十月事件',
        '1990年代内战'
      ],
      culturalTraits: ['独立精神', '反帝传统', '阿拉伯-柏柏尔认同', '革命记忆'],
      diplomaticTraditions: ['不结盟', '反帝立场', '非洲支持', '能源外交']
    },
    personality: {
      aggression: 6,
      flexibility: 5,
      patience: 7,
      riskTolerance: 6,
      nationalism: 9,
      multilateralOrientation: 7,
      bilateralOrientation: 5
    },
    negotiationStyle: {
      primary: 'cautious',
      secondary: 'principled',
      approach: 'positional',
      communication: 'indirect'
    },
    coreInterests: ['国家独立', '领土完整', '能源控制', '反帝立场'],
    importantInterests: ['地区影响', '经济发展', '非洲领导'],
    negotiableInterests: ['经济合作', '贸易条款'],
    leveragePoints: ['能源资源', '地理位置', '独立经验', '马格里布领导'],
    typicalStrategies: ['不结盟', '能源杠杆', '非洲协调', '反帝旗帜'],
    vulnerabilities: ['经济单一', '内部分裂', '极端主义', '法国关系'],
    languageStyle: {
      formality: 'formal',
      directness: 'medium',
      emotionInvolvement: 'high'
    },
    capabilities: ['能源资源', '军事力量', '反帝经验', '非洲影响力']
  },

  {
    id: 'israel-cold-war',
    name: '以色列（冷战时期）',
    flag: '🇮🇱',
    region: 'Middle East',
    era: 'cold-war',
    historicalBackground: {
      brief: '犹太复国主义国家，中东的西方桥头堡',
      detailed: '以色列建国于1948年，随即与阿拉伯国家发生战争。在冷战时期，以色列在美苏之间寻求平衡，但逐渐倒向美国。苏联曾短暂支持以色列但后来转向阿拉伯国家。以色列通过多次战争扩张领土，在核问题上保持模糊，在中东始终处于紧张环境。',
      keyHistoricalEvents: [
        '1948年以色列建国',
        '1956年苏伊士危机',
        '1967年六日战争',
        '1973年十月战争',
        '1979年埃以和平',
        '1982年黎巴嫩战争'
      ],
      culturalTraits: ['生存危机感', '军事优先', '移民融合', '创新精神'],
      diplomaticTraditions: ['西方盟友', '军事安全', '定居点扩张', '核模糊']
    },
    personality: {
      aggression: 8,
      flexibility: 4,
      patience: 5,
      riskTolerance: 8,
      nationalism: 10,
      multilateralOrientation: 3,
      bilateralOrientation: 8
    },
    negotiationStyle: {
      primary: 'security-focused',
      secondary: 'assertive',
      approach: 'positional',
      communication: 'direct'
    },
    coreInterests: ['国家安全', '生存权', '领土安全', '犹太特性'],
    importantInterests: ['地区优势', '水源控制', '美国支持', '核威慑'],
    negotiableInterests: ['部分领土', '定居点', '阿拉伯承认'],
    leveragePoints: ['军事力量', '美国支持', '情报能力', '核武器', '科技实力'],
    typicalStrategies: ['军事优势', '美国游说', '分区治理', '核威慑'],
    vulnerabilities: ['阿拉伯敌对', '国际孤立', '资源匮乏', '内部矛盾'],
    languageStyle: {
      formality: 'semi-formal',
      directness: 'high',
      emotionInvolvement: 'medium'
    },
    capabilities: ['军事力量', '美国支持', '核武器', '科技能力', '情报网络']
  },

  {
    id: 'iran-cold-war',
    name: '伊朗（冷战时期）',
    flag: '🇮🇷',
    region: 'Middle East',
    era: 'cold-war',
    historicalBackground: {
      brief: '巴列维国王的西方盟友，1979年伊斯兰革命',
      detailed: '伊朗在巴列维国王时期是美国在中东的重要盟友，享有西方保护和市场。伊朗曾是地区大国，波斯帝国传统深厚。1979年伊斯兰革命推翻了亲美的巴列维王朝，伊朗转向反美立场，建立了伊斯兰共和国。美伊关系从盟友变为死敌，深刻改变了中东格局。',
      keyHistoricalEvents: [
        '1953年摩萨台被推翻',
        '1960年代白色革命',
        '1979年伊斯兰革命',
        '人质危机',
        '1980-1988年两伊战争'
      ],
      culturalTraits: ['波斯帝国骄傲', '伊斯兰认同', '反美情绪', '什叶派传统'],
      diplomaticTraditions: ['文明古国', '反美主义', '伊斯兰革命', '地区大国']
    },
    personality: {
      aggression: 7,
      flexibility: 4,
      patience: 8,
      riskTolerance: 8,
      nationalism: 10,
      multilateralOrientation: 3,
      bilateralOrientation: 7
    },
    negotiationStyle: {
      primary: 'ideological',
      secondary: 'strategic',
      approach: 'positional',
      communication: 'indirect'
    },
    coreInterests: ['伊斯兰革命', '政权生存', '地区影响', '反美立场'],
    importantInterests: ['核能力', '能源控制', '什叶派新月'],
    negotiableInterests: ['核协议', '经济合作'],
    leveragePoints: ['能源资源', '霍尔木兹海峡', '什叶派网络', '导弹能力'],
    typicalStrategies: ['革命外交', '代理人战争', '核博弈', '制裁突围'],
    vulnerabilities: ['经济困难', '国际孤立', '内部矛盾', '美国压力'],
    languageStyle: {
      formality: 'formal',
      directness: 'medium',
      emotionInvolvement: 'high'
    },
    capabilities: ['能源资源', '导弹能力', '什叶派网络', '地缘位置']
  },

  // ==================== 冷战时期补充：东欧国家 ====================
  {
    id: 'poland-cold-war',
    name: '波兰（冷战时期）',
    flag: '🇵🇱',
    region: 'Central Europe',
    era: 'cold-war',
    historicalBackground: {
      brief: '苏联卫星国，团结工会的先声',
      detailed: '波兰在二战后成为苏联卫星国，在社会主义阵营中处境特殊。波兰人有着强烈的民族意识和对苏联的不满，1956年波兹南事件和1970年工人抗议都反映了这种矛盾。波兰与苏联的关系始终紧张，1980年代团结工会的兴起最终导致共产主义垮台。',
      keyHistoricalEvents: [
        '1945年苏联控制',
        '1956年波兹南事件',
        '1970年十二月事件',
        '1980年团结工会成立',
        '1989年圆桌会议'
      ],
      culturalTraits: ['民族意识', '天主教传统', '反俄情绪', '团结传统'],
      diplomaticTraditions: ['苏联卫星', '民族主义暗流', '西方联系', '宗教影响']
    },
    personality: {
      aggression: 5,
      flexibility: 7,
      patience: 6,
      riskTolerance: 6,
      nationalism: 8,
      multilateralOrientation: 6,
      bilateralOrientation: 7
    },
    negotiationStyle: {
      primary: 'patient',
      secondary: 'pragmatic',
      approach: 'interest-based',
      communication: 'indirect'
    },
    coreInterests: ['民族独立', '与苏联关系', '经济发展', '天主教传统'],
    importantInterests: ['西方联系', '工人权益', '历史正义'],
    negotiableInterests: ['苏联改革', '经济合作'],
    leveragePoints: ['战略位置', '民族凝聚力', '天主教传统', '团结工会遗产'],
    typicalStrategies: ['相机行事', '西方联络', '民族主义', '经济谈判'],
    vulnerabilities: ['苏联控制', '经济困难', '德国问题', '历史负担'],
    languageStyle: {
      formality: 'formal',
      directness: 'medium',
      emotionInvolvement: 'medium'
    },
    capabilities: ['战略位置', '民族团结', '西方联系', '天主教网络']
  },

  {
    id: 'hungary-cold-war',
    name: '匈牙利（冷战时期）',
    flag: '🇭🇺',
    region: 'Central Europe',
    era: 'cold-war',
    historicalBackground: {
      brief: '布拉格之春的先声，1956年革命的悲剧',
      detailed: '匈牙利在苏联阵营中最具改革倾向。1956年匈牙利革命被苏联血腥镇压，成为冷战的标志性事件。卡达尔时期实行"土豆烧牛肉"式改革，在社会主义阵营中相对宽松。匈牙利是华约中最倾向于西方和改革的国家，1989年又成为第一个倒下的多米诺骨牌。',
      keyHistoricalEvents: [
        '1956年匈牙利革命',
        '苏联入侵',
        '1960年代卡达尔改革',
        '1980年代开放',
        '1989年苏军撤离'
      ],
      culturalTraits: ['改革传统', '1848年革命精神', '西方认同', '务实主义'],
      diplomaticTraditions: ['苏联控制', '改革尝试', '西方联络', '民族主义']
    },
    personality: {
      aggression: 4,
      flexibility: 8,
      patience: 6,
      riskTolerance: 5,
      nationalism: 7,
      multilateralOrientation: 7,
      bilateralOrientation: 5
    },
    negotiationStyle: {
      primary: 'pragmatic',
      secondary: 'reformist',
      approach: 'interest-based',
      communication: 'indirect'
    },
    coreInterests: ['民族独立', '苏联撤退', '经济改革', '西方联系'],
    importantInterests: ['欧盟一体化', '经济发展', '历史平反'],
    negotiableInterests: ['苏联改革', '经济合作'],
    leveragePoints: ['战略位置', '改革经验', '西方联系', '民族凝聚力'],
    typicalStrategies: ['渐进改革', '西方联络', '苏联周旋', '经济务实'],
    vulnerabilities: ['苏联控制', '经济困难', '1956年创伤'],
    languageStyle: {
      formality: 'formal',
      directness: 'medium',
      emotionInvolvement: 'medium'
    },
    capabilities: ['改革经验', '西方联系', '战略位置', '民族精神']
  },

  {
    id: 'romania-cold-war',
    name: '罗马尼亚（冷战时期）',
    flag: '🇷🇴',
    region: 'Balkans',
    era: 'cold-war',
    historicalBackground: {
      brief: '东欧的离经叛道者，齐奥塞斯库的民族共产主义',
      detailed: '罗马尼亚在齐奥塞斯库时期展现出相对独立的姿态，在中苏分裂中保持平衡，甚至在1968年公开谴责苏联入侵捷克斯洛伐干。但齐奥塞斯库的统治越来越独裁，最终在1989年革命中被处决。罗马尼亚的外交独立性与其对西方的债务问题密切相关。',
      keyHistoricalEvents: [
        '1960年代相对独立',
        '1968年谴责苏联入侵',
        '1970年代债务危机',
        '1980年代紧缩政策',
        '1989年革命'
      ],
      culturalTraits: ['拉丁民族认同', '反俄传统', '民族主义', '独裁倾向'],
      diplomaticTraditions: ['独立外交', '中苏平衡', '西方接触', '民族主义']
    },
    personality: {
      aggression: 6,
      flexibility: 7,
      patience: 5,
      riskTolerance: 7,
      nationalism: 9,
      multilateralOrientation: 5,
      bilateralOrientation: 8
    },
    negotiationStyle: {
      primary: 'nationalist',
      secondary: 'pragmatic',
      approach: 'positional',
      communication: 'indirect'
    },
    coreInterests: ['独立地位', '民族尊严', '经济发展', '债务处理'],
    importantInterests: ['西方关系', '苏联距离', '多瑙河利益'],
    negotiableInterests: ['债务减免', '贸易条款'],
    leveragePoints: ['战略位置', '独立外交姿态', '中苏平衡', '多瑙河出海口'],
    typicalStrategies: ['独立外交', '东西平衡', '债务谈判', '民族主义'],
    vulnerabilities: ['经济困难', '独裁统治', '国际孤立'],
    languageStyle: {
      formality: 'formal',
      directness: 'high',
      emotionInvolvement: 'medium'
    },
    capabilities: ['战略位置', '独立外交', '多瑙河航运', '农业资源']
  },

  {
    id: 'indonesia-cold-war',
    name: '印度尼西亚（冷战时期）',
    flag: '🇮🇩',
    region: 'Southeast Asia',
    era: 'cold-war',
    historicalBackground: {
      brief: '不结盟运动发起国，万隆会议的东道主',
      detailed: '印尼是东南亚最大的国家，独立后苏加诺总统采取了不结盟政策，在美苏之间寻求平衡。1955年万隆会议的召开使印尼在国际舞台上获得重要地位。1965年九三零事件后，苏哈托政权转向亲美反共，但在不结盟运动中仍保持影响力。',
      keyHistoricalEvents: [
        '1945年独立宣言',
        '1955年万隆会议',
        '1965年九三零事件',
        '1967年苏哈托上台',
        '1975年吞并东帝汶'
      ],
      culturalTraits: ['多元统一', '不结盟传统', '伊斯兰认同', '实用主义'],
      diplomaticTraditions: ['不结盟', '万隆精神', '第三世界领导', '地区大国']
    },
    personality: {
      aggression: 5,
      flexibility: 7,
      patience: 7,
      riskTolerance: 5,
      nationalism: 8,
      multilateralOrientation: 9,
      bilateralOrientation: 4
    },
    negotiationStyle: {
      primary: 'non-aligned',
      secondary: 'pragmatic',
      approach: 'interest-based',
      communication: 'indirect'
    },
    coreInterests: ['国家统一', '领土完整', '地区领导', '不结盟地位'],
    importantInterests: ['经济发展', '海洋权益', '第三世界影响'],
    negotiableInterests: ['西方关系', '经济援助'],
    leveragePoints: ['人口规模', '战略位置', '不结盟声望', '海洋资源'],
    typicalStrategies: ['不结盟平衡', '地区协调', '第三世界领导', '海洋权益'],
    vulnerabilities: ['分离主义', '经济落后', '海洋争议', '内部不稳定'],
    languageStyle: {
      formality: 'formal',
      directness: 'medium',
      emotionInvolvement: 'medium'
    },
    capabilities: ['人口规模', '战略位置', '不结盟声望', '海洋资源']
  },

  {
    id: 'india-cold-war',
    name: '印度（冷战时期）',
    flag: '🇮🇳',
    region: 'South Asia',
    era: 'cold-war',
    historicalBackground: {
      brief: '不结盟运动领袖，第三世界的代言人',
      detailed: '印度独立后在尼赫鲁领导下成为不结盟运动的领袖，试图在美苏两极之间走出一条独立的发展道路。印度建立了混合经济体制，在美苏之间保持平衡，同时与巴基斯坦经历了三次战争。印度在核政策上长期保持克制，但1998年进行了核试验。',
      keyHistoricalEvents: [
        '1947年独立',
        '1950年成为共和国',
        '1955年万隆会议',
        '1962年中印战争',
        '1965年印巴战争',
        '1971年印巴战争'
      ],
      culturalTraits: ['战略自主', '大国情结', '不结盟传统', '南亚霸主'],
      diplomaticTraditions: ['不结盟', '第三世界领导', '大国外交', '南亚优先']
    },
    personality: {
      aggression: 6,
      flexibility: 6,
      patience: 7,
      riskTolerance: 6,
      nationalism: 8,
      multilateralOrientation: 8,
      bilateralOrientation: 7
    },
    negotiationStyle: {
      primary: 'strategic',
      secondary: 'principled',
      approach: 'interest-based',
      communication: 'indirect'
    },
    coreInterests: ['南亚优势', '克什米尔', '经济发展', '不结盟地位'],
    importantInterests: ['大国平衡', '第三世界领导', '能源安全'],
    negotiableInterests: ['美苏关系', '贸易条款'],
    leveragePoints: ['人口规模', '战略位置', '不结盟声望', '区域影响力'],
    typicalStrategies: ['不结盟平衡', '大国外交', '第三世界领导', '区域霸权'],
    vulnerabilities: ['巴基斯坦冲突', '经济困难', '内部差异', '中国竞争'],
    languageStyle: {
      formality: 'formal',
      directness: 'medium',
      emotionInvolvement: 'medium'
    },
    capabilities: ['人口规模', '军事力量', '不结盟声望', '区域影响力']
  },

  {
    id: 'afghanistan-cold-war',
    name: '阿富汗（冷战时期）',
    flag: '🇦🇫',
    region: 'Central Asia',
    era: 'cold-war',
    historicalBackground: {
      brief: '帝国坟场，大国博弈的牺牲品',
      detailed: '阿富汗被称为"帝国坟场"，苏联入侵（1979-1989年）是冷战最后的重大事件。阿富汗在苏美之间长期周旋，达乌德亲王和塔拉基等领导人不断更迭。苏联入侵后，美国通过巴基斯坦向抵抗力量提供武器，最终拖垮了苏联。阿富汗的悲剧预示了冷战后美国在该地区的命运。',
      keyHistoricalEvents: [
        '1973年推翻君主制',
        '1978年四月革命',
        '1979年苏联入侵',
        '1980年代抗苏战争',
        '1989年苏军撤退'
      ],
      culturalTraits: ['部落传统', '独立精神', '圣战士传统', '地缘重要'],
      diplomaticTraditions: ['中立传统', '大国周旋', '部落外交', '伊斯兰认同']
    },
    personality: {
      aggression: 7,
      flexibility: 5,
      patience: 8,
      riskTolerance: 9,
      nationalism: 10,
      multilateralOrientation: 3,
      bilateralOrientation: 8
    },
    negotiationStyle: {
      primary: 'defensive',
      secondary: 'strategic',
      approach: 'positional',
      communication: 'indirect'
    },
    coreInterests: ['独立生存', '领土完整', '伊斯兰制度', '外部平衡'],
    importantInterests: ['经济发展', '部落平衡', '地区稳定'],
    negotiableInterests: ['大国关系', '经济援助'],
    leveragePoints: ['地缘位置', '帝国坟场', '伊斯兰旗帜', '部落力量'],
    typicalStrategies: ['大国平衡', '游击战术', '伊斯兰旗帜', '外国占领泥潭'],
    vulnerabilities: ['部落分裂', '经济落后', '大国入侵', '极端主义'],
    languageStyle: {
      formality: 'formal',
      directness: 'medium',
      emotionInvolvement: 'high'
    },
    capabilities: ['地理优势', '游击战能力', '伊斯兰凝聚力', '战略位置']
  },

  {
    id: 'south-africa-cold-war',
    name: '南非（冷战时期）',
    flag: '🇿🇦',
    region: 'Southern Africa',
    era: 'cold-war',
    historicalBackground: {
      brief: '种族隔离制度与西方盟友，第三世界的反对',
      detailed: '南非在白人政权时期实行种族隔离制度，尽管遭到国际社会广泛谴责，但在冷战背景下，西方盟国出于反共考虑给予南非一定程度的支持。南非在非洲南部拥有强大影响力，与安哥拉、纳米比亚的解放运动对抗。纳尔逊·曼德拉领导的非国大被西方盟国视为恐怖组织，直到1990年代种族隔离制度才被废除。',
      keyHistoricalEvents: [
        '1948年国民党上台',
        '1960年沙佩维尔事件',
        '1960年代镇压解放运动',
        '1970年代边境战争',
        '1990年曼德拉释放'
      ],
      culturalTraits: ['种族隔离', '西方盟友', '区域霸权', '孤立与对抗'],
      diplomaticTraditions: ['西方联盟', '区域霸权', '反共意识形态', '文明使命']
    },
    personality: {
      aggression: 8,
      flexibility: 3,
      patience: 6,
      riskTolerance: 6,
      nationalism: 9,
      multilateralOrientation: 2,
      bilateralOrientation: 7
    },
    negotiationStyle: {
      primary: 'defensive',
      secondary: 'coercive',
      approach: 'positional',
      communication: 'direct'
    },
    coreInterests: ['白人统治', '区域优势', '反共立场', '西方支持'],
    importantInterests: ['纳米比亚问题', '边境安全', '经济利益'],
    negotiableInterests: ['国际孤立', '制裁问题'],
    leveragePoints: ['区域军事优势', '反共立场', '矿产资源', '战略位置'],
    typicalStrategies: ['军事镇压', '西方游说', '区域干预', '制裁应对'],
    vulnerabilities: ['国际孤立', '内部反抗', '经济制裁', '道德劣势'],
    languageStyle: {
      formality: 'formal',
      directness: 'high',
      emotionInvolvement: 'medium'
    },
    capabilities: ['军事力量', '矿产资源', '区域影响力', '西方联系']
  }
];

// 获取按时期分组的国家
export function getCountriesByEra(era: HistoricalCountry['era']): HistoricalCountry[] {
  return historicalCountries.filter(c => c.era === era);
}

// 获取所有可用时期
export function getAvailableEras(): HistoricalCountry['era'][] {
  return [...new Set(historicalCountries.map(c => c.era))];
}
