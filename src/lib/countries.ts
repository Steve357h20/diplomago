// 多边外交谈判国家数据库
// 每个国家都有基于历史文化形成的独特谈判风格

export type EraType = 'cold-war' | 'post-cold-war' | 'modern' | 'future' | 'fictional';

export interface CountryProfile {
  id: string;
  name: string;
  flag: string;
  region: string;
  
  // 时期分类
  era: EraType[];  // 该国家存在的时间段，可能多个（如苏联只在冷战）
  isActive: boolean;  // 是否是活跃国家
  
  // 历史文化背景
  historicalBackground: {
    brief: string;           // 简短描述（1-2句）
    detailed: string;        // 详细背景（用于AI理解）
    keyHistoricalEvents: string[];  // 关键历史事件
    culturalTraits: string[];      // 文化特征
    diplomaticTraditions: string[]; // 外交传统
  };
  
  // 谈判性格（由历史文化决定，非用户选择）
  personality: {
    aggression: number;        // 攻击性 1-10
    flexibility: number;      // 灵活性 1-10
    patience: number;          // 耐心 1-10
    riskTolerance: number;     // 风险承受 1-10
    nationalism: number;       // 民族主义 1-10
    multilateralOrientation: number; // 多边主义倾向 1-10
    bilateralOrientation: number;   // 双边主义倾向 1-10
  };
  
  // 谈判风格标签
  negotiationStyle: {
    primary: string;  // 主要风格：cooperative/competitive/creative/assertive
    secondary: string; // 次要风格
    approach: string; // 具体方法：principled/positional/interest-based
    communication: string; // 沟通方式：direct/indirect/formal/informal
  };
  
  // 核心利益（通常不会妥协的）
  coreInterests: string[];
  
  // 重要利益（可以谈判的）
  importantInterests: string[];
  
  // 可交易利益（可以交换的）
  negotiableInterests: string[];
  
  // 典型筹码
  leveragePoints: string[];
  
  // 常见策略
  typicalStrategies: string[];
  
  // 弱点/顾虑
  vulnerabilities: string[];
  
  // 语言特点
  languageStyle: {
    formality: 'formal' | 'semi-formal' | 'casual';
    directness: 'high' | 'medium' | 'low';
    emotionInvolvement: 'high' | 'medium' | 'low';
  };
  
  // 特殊能力/资源
  capabilities: string[];
}

export const countries: CountryProfile[] = [
  // ==================== 亚洲 ====================
  {
    id: 'china',
    name: '中国',
    flag: '🇨🇳',
    region: 'East Asia',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '五千年文明古国，强调中华文化圈和天下体系',
      detailed: '中国拥有5000年连续文明，形成了以儒家思想为核心的外交文化。历史上长期是东亚朝贡体系的中心，强调等级秩序、文明教化和王道政治。近代遭受西方列强侵略，形成了强烈的民族复兴意识和主权神圣不可侵犯的观念。',
      keyHistoricalEvents: [
        '秦统一六国，建立中央集权',
        '汉代丝绸之路，开通东西方交流',
        '唐代万国来朝，天下中心',
        '明清海禁政策',
        '鸦片战争后百年屈辱',
        '新中国独立自主外交',
        '改革开放与全球化参与'
      ],
      culturalTraits: ['集体主义', '面子文化', '关系导向', '长期战略思维', '和谐理念'],
      diplomaticTraditions: ['和平共处五项原则', '不干涉内政', '互利共赢', '文明对话']
    },
    personality: {
      aggression: 6,
      flexibility: 5,
      patience: 8,
      riskTolerance: 4,
      nationalism: 8,
      multilateralOrientation: 7,
      bilateralOrientation: 6
    },
    negotiationStyle: {
      primary: 'competitive',
      secondary: 'principled',
      approach: 'interest-based',
      communication: 'indirect'
    },
    coreInterests: ['国家主权和领土完整', '政治制度安全', '核心利益区（台湾/南海等）', '经济发展权'],
    importantInterests: ['技术进步与产业升级', '国际话语权', '地区影响力', '能源资源安全'],
    negotiableInterests: ['贸易条款细节', '投资准入节奏', '非核心议题的表态'],
    leveragePoints: ['巨大市场', '完整产业链', '基础设施建设能力', '外交协调能力'],
    typicalStrategies: ['时间换空间', '议题捆绑与分离', '借力第三方', '渐进式推进', '底线思维'],
    vulnerabilities: ['国际舆论压力', '技术封锁影响', '经济增速放缓', '台海风险'],
    languageStyle: {
      formality: 'formal',
      directness: 'low',
      emotionInvolvement: 'low'
    },
    capabilities: ['经济规模', '制造业基础', '外交网络', '维稳能力']
  },
  
  {
    id: 'usa',
    name: '美国',
    flag: '🇺🇸',
    region: 'North America',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '移民国家，强调自由民主和例外主义',
      detailed: '美国建国仅200余年，但通过移民汇集了多元文化。建国理念基于启蒙运动的自由民主思想，强调天赋人权和社会契约。门罗主义确立了美洲事务主导权，两战后建立的国际秩序中美国占据核心地位。',
      keyHistoricalEvents: [
        '独立战争与建国',
        '西进运动与领土扩张',
        '南北战争与国家统一',
        '美西战争与列强地位',
        '两次世界大战与霸权确立',
        '冷战与单极时刻',
        '9/11与全球反恐'
      ],
      culturalTraits: ['个人主义', '实用主义', '创新精神', '使命感强', '规则意识'],
      diplomaticTraditions: ['霸权护持', '制度霸权', '联盟体系', '价值观外交']
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
    coreInterests: ['国家安全', '经济领导地位', '意识形态影响力', '联盟体系'],
    importantInterests: ['技术领先地位', '能源安全', '太空/网络主导', '贸易规则制定权'],
    negotiableInterests: ['关税税率', '市场开放程度', '气候协议细节'],
    leveragePoints: ['美元霸权', '军事优势', '科技领先', '盟友网络', '文化软实力'],
    typicalStrategies: ['实力压制', '联盟分化', '规则主导', '制裁威慑', '议题挂钩'],
    vulnerabilities: ['党争内耗', '债务危机', '盟友离心', '单边主义批评'],
    languageStyle: {
      formality: 'semi-formal',
      directness: 'high',
      emotionInvolvement: 'medium'
    },
    capabilities: ['军事力量', '金融体系', '科技创新', '好莱坞/文化输出']
  },
  
  {
    id: 'russia',
    name: '俄罗斯',
    flag: '🇷🇺',
    region: 'Europe/Asia',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '双头鹰横跨欧亚，帝国传统与安全焦虑并存',
      detailed: '俄罗斯历史上是蒙古金帐汗国的附庸，后来崛起为帝国。二战后成为超级大国，冷战失败后经历衰退但仍追求大国地位。地理上缺乏天然防御的安全焦虑、对西方的不信任、以及对势力范围的执念是其外交的核心驱动力。',
      keyHistoricalEvents: [
        '基辅罗斯与蒙古统治',
        '彼得大帝西化改革',
        '苏联建立与扩张',
        '冷战与超级大国地位',
        '苏联解体与衰退',
        '普京时代复兴',
        '乌克兰冲突'
      ],
      culturalTraits: ['威权传统', '大国情怀', '防御心理', '现实主义', '战略纵深思维'],
      diplomaticTraditions: ['势力范围', '缓冲地带', '均势外交', '核威慑']
    },
    personality: {
      aggression: 8,
      flexibility: 4,
      patience: 6,
      riskTolerance: 8,
      nationalism: 9,
      multilateralOrientation: 3,
      bilateralOrientation: 7
    },
    negotiationStyle: {
      primary: 'competitive',
      secondary: 'creative',
      approach: 'positional',
      communication: 'indirect'
    },
    coreInterests: ['国家安全缓冲', '势力范围', '核威慑能力', '大国地位'],
    importantInterests: ['能源出口市场', '传统盟友关系', '北极航道', '太空地位'],
    negotiableInterests: ['制裁减轻', '贸易条款', '非核心地区影响力'],
    leveragePoints: ['能源资源', '军事力量', '核武库', '否决权', '地缘位置'],
    typicalStrategies: ['危机边缘政策', '能源武器', '分而治之', '不对称回应', '历史法理'],
    vulnerabilities: ['经济结构单一', '人口减少', '技术落后', '国际孤立'],
    languageStyle: {
      formality: 'formal',
      directness: 'medium',
      emotionInvolvement: 'medium'
    },
    capabilities: ['能源资源', '军事力量', '核武库', '否决权使用']
  },
  
  {
    id: 'uk',
    name: '英国',
    flag: '🇬🇧',
    region: 'Europe',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '日不落帝国遗老，务实平衡外交传统',
      detailed: '英国曾是世界最大帝国，通过工业革命和海军优势建立了全球霸权。二战后虽衰落，但通过巧妙的大国外交保持影响力。英国外交的核心是平衡——在欧洲大陆国家间、美国与欧洲间、传统与新兴大国间保持平衡。',
      keyHistoricalEvents: [
        '光荣革命与宪政确立',
        '工业革命与帝国崛起',
        '两次世界大战',
        '帝国解体与英联邦',
        '欧美桥梁角色',
        '脱欧与全球英国'
      ],
      culturalTraits: ['务实主义', '规则意识', '渐进变革', '幽默讽刺', '绅士风度'],
      diplomaticTraditions: ['势力均衡', '光荣孤立', '法律框架', '软硬兼施']
    },
    personality: {
      aggression: 5,
      flexibility: 7,
      patience: 6,
      riskTolerance: 5,
      nationalism: 6,
      multilateralOrientation: 8,
      bilateralOrientation: 6
    },
    negotiationStyle: {
      primary: 'cooperative',
      secondary: 'principled',
      approach: 'interest-based',
      communication: 'indirect'
    },
    coreInterests: ['英美特殊关系', '金融中心地位', '全球贸易网络', '国家安全'],
    importantInterests: ['欧洲平衡者角色', '英联邦联系', '科技金融中心', '军事投射能力'],
    negotiableInterests: ['监管协调', '人员流动', '渔业权利'],
    leveragePoints: ['英语霸权', '伦敦金融城', '情报网络', '英联邦', '法律体系'],
    typicalStrategies: ['三边外交', '规则塑造', '巧外交', '法律工具', '低调影响力'],
    vulnerabilities: ['脱欧后定位模糊', '军事投射能力下降', '经济依赖服务业'],
    languageStyle: {
      formality: 'formal',
      directness: 'low',
      emotionInvolvement: 'low'
    },
    capabilities: ['金融服务', '法律仲裁', '情报外交', '软实力']
  },
  
  {
    id: 'france',
    name: '法国',
    flag: '🇫🇷',
    region: 'Europe',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '大革命传统与大国雄心，追求战略自主',
      detailed: '法国大革命塑造了现代民族国家概念，其启蒙思想影响全球。历史上多次成为欧洲霸主，虽在二战中受辱但始终保持大国雄心。戴高乐主义强调法国独立自主，不愿过度依赖任何大国或集团。',
      keyHistoricalEvents: [
        '法国大革命与启蒙运动',
        '拿破仑帝国',
        '殖民帝国建立',
        '普法战争失败',
        '一战胜利与大国地位',
        '二战沦陷与解放',
        '戴高乐主义与独立外交',
        '欧盟建设核心'
      ],
      culturalTraits: ['革命理想主义', '文化自豪感', '独立自主', '哲学思维', '浪漫情怀'],
      diplomaticTraditions: ['战略自主', '文明使命感', '文化软实力', '欧洲一体化']
    },
    personality: {
      aggression: 6,
      flexibility: 6,
      patience: 6,
      riskTolerance: 6,
      nationalism: 7,
      multilateralOrientation: 9,
      bilateralOrientation: 5
    },
    negotiationStyle: {
      primary: 'principled',
      secondary: 'creative',
      approach: 'principled',
      communication: 'direct'
    },
    coreInterests: ['战略自主', '欧洲一体化领导', '文化影响力', '核威慑能力'],
    importantInterests: ['非洲传统影响力', '地中海联盟', '农业保护', '航空航天'],
    negotiableInterests: ['贸易开放程度', '防务一体化细节', '农业补贴改革'],
    leveragePoints: ['核武库', '文化软实力', '非洲网络', '欧盟核心地位', '农业规模'],
    typicalStrategies: ['多边主义旗帜', '议题联动', '文化渗透', '规范塑造', '法非特殊关系'],
    vulnerabilities: ['经济增长乏力', '移民问题', '黄背心运动暴露社会撕裂', '非洲影响力下降'],
    languageStyle: {
      formality: 'formal',
      directness: 'high',
      emotionInvolvement: 'high'
    },
    capabilities: ['核力量', '文化影响力', '农业游说', '非洲网络']
  },
  
  {
    id: 'germany',
    name: '德国',
    flag: '🇩🇪',
    region: 'Europe',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '历史负债与经济强国，欧洲一体化的支柱',
      detailed: '德国发动两次世界大战的惨痛历史使其对军事力量和民族主义保持警惕，形成了以经济实力和制度合作实现国家利益的外交模式。德国是欧洲经济的火车头，也是欧盟和欧元区的核心支柱。',
      keyHistoricalEvents: [
        '德意志统一',
        '两次世界大战',
        '战后重建与经济奇迹',
        '两德统一',
        '欧盟核心建设',
        '欧元危机处理'
      ],
      culturalTraits: ['秩序与效率', '规则意识', '历史责任感', '实用主义', '低调务实'],
      diplomaticTraditions: ['和平主义', '欧洲一体化', '规则为基础', '经济外交']
    },
    personality: {
      aggression: 3,
      flexibility: 7,
      patience: 7,
      riskTolerance: 3,
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
    coreInterests: ['欧洲一体化', '经济竞争力', '能源供应安全', '历史清算'],
    importantInterests: ['出口市场', '技术领先地位', '难民/移民政策', '东欧关系'],
    negotiableInterests: ['财政规则灵活性', '能源转型节奏', '移民配额'],
    leveragePoints: ['经济规模', '制造业实力', '欧盟核心地位', '技术实力', '金融稳定'],
    typicalStrategies: ['制度性合作', '低调影响力', '经济诱导', '共识构建', '渐进改革'],
    vulnerabilities: ['历史包袱', '能源依赖俄罗斯', '极右翼崛起', '基础设施老化'],
    languageStyle: {
      formality: 'formal',
      directness: 'high',
      emotionInvolvement: 'low'
    },
    capabilities: ['制造业', '工程技术', '经济实力', '欧盟领导力']
  },
  
  {
    id: 'japan',
    name: '日本',
    flag: '🇯🇵',
    region: 'East Asia',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '经济巨人政治矮子，寻求正常国家化',
      detailed: '日本明治维新后迅速现代化并成为帝国主义列强。二战战败和战后和平宪法限制了军事发展，形成了经济优先的外交模式。冷战后日本寻求从"经济大国"向"政治大国"转型，但面临历史问题和地区关系的制约。',
      keyHistoricalEvents: [
        '明治维新与现代化',
        '甲午/日俄战争胜利',
        '侵华战争与太平洋战争',
        '战后重建与经济奇迹',
        '广场协议与失去二十年',
        '平成低迷与复苏努力'
      ],
      culturalTraits: ['集团主义', '耻感文化', '工匠精神', '等级意识', '危机意识'],
      diplomaticTraditions: ['日美同盟基轴', '经济外交', 'ODA援助', '规则遵循']
    },
    personality: {
      aggression: 4,
      flexibility: 6,
      patience: 8,
      riskTolerance: 3,
      nationalism: 6,
      multilateralOrientation: 6,
      bilateralOrientation: 9
    },
    negotiationStyle: {
      primary: 'cooperative',
      secondary: 'indirect',
      approach: 'interest-based',
      communication: 'indirect'
    },
    coreInterests: ['日美同盟', '经济持续发展', '能源安全', '地区稳定'],
    importantInterests: ['正常国家化', '技术领先地位', '海上通道安全', '朝鲜半岛稳定'],
    negotiableInterests: ['贸易条款', '投资规则', '非核心议题让步'],
    leveragePoints: ['技术优势', 'ODA资金', '美日同盟', '制造业实力', '金融实力'],
    typicalStrategies: ['议题分离', '借力美国', '经济诱导', '低调渐进', '规则遵循'],
    vulnerabilities: ['历史问题', '人口老龄化', '能源依赖', '政治不稳定'],
    languageStyle: {
      formality: 'formal',
      directness: 'low',
      emotionInvolvement: 'low'
    },
    capabilities: ['技术制造', '质量管理', '资金实力', 'ODA援助']
  },
  
  {
    id: 'india',
    name: '印度',
    flag: '🇮🇳',
    region: 'South Asia',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '文明古国不结盟传统，大国雄心与多元挑战',
      detailed: '印度作为文明古国历史上一直是地区大国。独立后尼赫鲁确立了不结盟传统，在美苏之间保持平衡。经济发展和地缘位置使其成为大国博弈的重要力量。印度教民族主义兴起影响着外交取向。',
      keyHistoricalEvents: [
        '英殖民统治与独立',
        '印巴分治与三次战争',
        '不结盟运动创始',
        '冷战中平衡美苏',
        '经济改革开放',
        '古吉拉特模式崛起',
        '大国雄心与印太战略'
      ],
      culturalTraits: ['战略自主', '大国情结', '实用主义', '多元包容', '耐心的外交'],
      diplomaticTraditions: ['不结盟传统', '战略自主', '南南合作', '平衡外交']
    },
    personality: {
      aggression: 5,
      flexibility: 6,
      patience: 8,
      riskTolerance: 5,
      nationalism: 7,
      multilateralOrientation: 7,
      bilateralOrientation: 7
    },
    negotiationStyle: {
      primary: 'principled',
      secondary: 'patient',
      approach: 'interest-based',
      communication: 'indirect'
    },
    coreInterests: ['主权与领土完整（巴基斯坦/中国边境）', '战略自主', '经济发展', '地区领导力'],
    importantInterests: ['技术进步', '能源安全', '印度洋主导', '侨民利益'],
    negotiableInterests: ['贸易开放程度', '气候承诺', '非核心议题立场'],
    leveragePoints: ['庞大市场', '民主制度', 'IT人才', '地缘位置', '不结盟声望'],
    typicalStrategies: ['战略自主', '大国平衡', '议题分批处理', '长期立场坚持', '发展导向'],
    vulnerabilities: ['贫困人口多', '基础设施不足', '巴铁关系', '教派冲突'],
    languageStyle: {
      formality: 'formal',
      directness: 'medium',
      emotionInvolvement: 'medium'
    },
    capabilities: ['IT服务', '制药产业', '民主软实力', '人口红利']
  },
  
  {
    id: 'brazil',
    name: '巴西',
    flag: '🇧🇷',
    region: 'South America',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '拉美最大国家，金砖新兴力量',
      detailed: '巴西是拉美最大国家，历史上是葡萄牙殖民地，1822年独立后长期军政府与民主交替。巴西追求"温和大国"定位，在地区事务中发挥领导作用，同时积极融入全球治理。金砖合作机制的重要成员。',
      keyHistoricalEvents: [
        '葡萄牙殖民统治',
        '独立与帝制时期',
        '军人政变与民主化',
        '经济危机与复苏',
        '卢拉时代崛起',
        '金砖机制参与',
        '环境与气候领导'
      ],
      culturalTraits: ['乐观主义', '多元文化', '灵活性', '地区认同', '足球外交'],
      diplomaticTraditions: ['南南合作', '地区领导', '多边主义', '气候议题']
    },
    personality: {
      aggression: 4,
      flexibility: 7,
      patience: 7,
      riskTolerance: 5,
      nationalism: 6,
      multilateralOrientation: 9,
      bilateralOrientation: 5
    },
    negotiationStyle: {
      primary: 'cooperative',
      secondary: 'creative',
      approach: 'interest-based',
      communication: 'direct'
    },
    coreInterests: ['主权与发展权', '亚马逊环境保护', '地区领导力', '经济转型'],
    importantInterests: ['农业出口市场', '气候资金', '技术转让', '联合国改革'],
    negotiableInterests: ['贸易关税', '环保标准节奏', '贷款条件'],
    leveragePoints: ['农业产能', '生物燃料', '环境资源', '拉美领导地位', '民主制度'],
    typicalStrategies: ['南南合作', '议题捆绑', '发展权话语', '联盟建设', '灵活务实'],
    vulnerabilities: ['经济不稳定', '政治极化', '基础设施', '暴力犯罪'],
    languageStyle: {
      formality: 'semi-formal',
      directness: 'medium',
      emotionInvolvement: 'high'
    },
    capabilities: ['农业产能', '生物能源', '自然资源', '拉美领导力']
  },
  
  {
    id: 'south-africa',
    name: '南非',
    flag: '🇿🇦',
    region: 'Africa',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '彩虹之国，非洲崛起的代表',
      detailed: '南非经历了荷兰/英国殖民、种族隔离的黑暗时期，曼德拉时代实现了和平转型。作为非洲最发达的经济体，南非在非洲事务中发挥领导作用，是金砖机制中唯一的非洲成员。',
      keyHistoricalEvents: [
        '荷兰/英国殖民',
        '种族隔离制度',
        '曼德拉与和平转型',
        '彩虹之国建立',
        '经济发展与挑战',
        '金砖合作',
        '非洲领导角色'
      ],
      culturalTraits: ['彩虹多元', '和解精神', '问题解决能力', '社区传统', '乐观主义'],
      diplomaticTraditions: ['非洲复兴', '南南合作', '人权外交', '调解传统']
    },
    personality: {
      aggression: 4,
      flexibility: 6,
      patience: 7,
      riskTolerance: 4,
      nationalism: 5,
      multilateralOrientation: 8,
      bilateralOrientation: 6
    },
    negotiationStyle: {
      primary: 'cooperative',
      secondary: 'principled',
      approach: 'interest-based',
      communication: 'direct'
    },
    coreInterests: ['非洲领导地位', '经济发展', '社会稳定', '反腐与良政'],
    importantInterests: ['能源安全', '区域一体化', '矿业利益', '旅游发展'],
    negotiableInterests: ['贸易条款', '投资条件', '气候承诺节奏'],
    leveragePoints: ['矿业资源', '金融中心', '地区领导', '调解能力', '民主制度'],
    typicalStrategies: ['非洲代言人', '调解者角色', '南南合作', '发展导向', '共识建设'],
    vulnerabilities: ['贫富差距', '失业率高', '电力短缺', '腐败问题'],
    languageStyle: {
      formality: 'semi-formal',
      directness: 'medium',
      emotionInvolvement: 'high'
    },
    capabilities: ['矿业资源', '金融中心', '地区调解', '民主经验']
  },
  
  {
    id: 'vietnam',
    name: '越南',
    flag: '🇻🇳',
    region: 'Southeast Asia',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '抗美救国英雄，社会主义改革先锋',
      detailed: '越南经历了抗法、抗美战争，1975年统一后实行社会主义制度。革新开放后经济快速发展，在中美竞争中保持平衡。历史上对外部势力有深刻的不信任，同时积极融入国际社会。',
      keyHistoricalEvents: [
        '法属印度支那',
        '抗法独立战争',
        '抗美救国战争',
        '南北统一',
        '革新开放',
        '东盟融入',
        '中美平衡'
      ],
      culturalTraits: ['坚韧不拔', '集体主义', '灵活适应', '民族自豪', '实用主义'],
      diplomaticTraditions: ['独立自主', '和平共处', '多方平衡', '发展优先']
    },
    personality: {
      aggression: 5,
      flexibility: 7,
      patience: 7,
      riskTolerance: 5,
      nationalism: 8,
      multilateralOrientation: 7,
      bilateralOrientation: 8
    },
    negotiationStyle: {
      primary: 'patient',
      secondary: 'creative',
      approach: 'interest-based',
      communication: 'indirect'
    },
    coreInterests: ['政治制度安全', '领土主权（南海）', '经济发展', '独立自主'],
    importantInterests: ['基础设施投资', '制造业承接', '区域供应链', '南海资源'],
    negotiableInterests: ['贸易条款', '投资条件', '非核心议题灵活性'],
    leveragePoints: ['地理位置', '劳动力成本', '政治稳定', '供应链位置', '东盟成员'],
    typicalStrategies: ['大国平衡', '渐进开放', '议题分离', '韬光养晦', '借力发展'],
    vulnerabilities: ['技术水平低', '基础设施不足', '南海争议', '政治集中'],
    languageStyle: {
      formality: 'formal',
      directness: 'low',
      emotionInvolvement: 'medium'
    },
    capabilities: ['制造业', '廉价劳动力', '政治稳定', '地理优势']
  },
  
  {
    id: 'philippines',
    name: '菲律宾',
    flag: '🇵🇭',
    region: 'Southeast Asia',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '美国前殖民地，民主多元与脆弱并存',
      detailed: '菲律宾曾是美国殖民地，独立后形成西式民主制度，但政治家族控制和腐败问题长期存在。杜特尔特时期外交转向中国，现政府寻求平衡。南海仲裁案是其外交的重要遗产。',
      keyHistoricalEvents: [
        '西班牙殖民统治',
        '美西战争与美国殖民',
        '独立与民主试验',
        '马科斯独裁',
        '民主恢复',
        '南海仲裁胜诉',
        '杜特尔特转向',
        '小马科斯回归亲美'
      ],
      culturalTraits: ['乐观开朗', '家庭中心', '多元文化', '西化程度高', '情绪化政治'],
      diplomaticTraditions: ['亲美传统', '民主话语', '仲裁法律途径', '人权议题']
    },
    personality: {
      aggression: 4,
      flexibility: 7,
      patience: 5,
      riskTolerance: 5,
      nationalism: 6,
      multilateralOrientation: 6,
      bilateralOrientation: 7
    },
    negotiationStyle: {
      primary: 'casual',
      secondary: 'relationship-focused',
      approach: 'interest-based',
      communication: 'direct'
    },
    coreInterests: ['领土主权（南海）', '海外劳工权益', '反恐与安全', '经济发展'],
    importantInterests: ['基础设施投资', '贸易优惠', '美国军事支持', '民主人权'],
    negotiableInterests: ['仲裁执行', '经济合作条件', '安全合作细节'],
    leveragePoints: ['地缘位置', '英语能力', '美国同盟', '南海仲裁裁决', '海外汇款'],
    typicalStrategies: ['大国平衡', '法律武器', '民意动员', '经济诱导接受', '联合多方'],
    vulnerabilities: ['政治不稳定', '腐败问题', '极端势力', '经济依赖外援'],
    languageStyle: {
      formality: 'semi-formal',
      directness: 'high',
      emotionInvolvement: 'high'
    },
    capabilities: ['服务业', '海外劳工', '英语优势', '地缘战略位置']
  },
  
  {
    id: 'singapore',
    name: '新加坡',
    flag: '🇸🇬',
    region: 'Southeast Asia',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '小国大外交，城市国家的生存智慧',
      detailed: '新加坡1965年独立，是世界上最小的国家之一，但凭借地理位置、良好治理和实用外交成为区域金融中心和外交重要参与者。新加坡外交的核心是生存智慧：在大国竞争中保持中立，利用规则保护小国利益。',
      keyHistoricalEvents: [
        '英国殖民地',
        '日本占领',
        '马来西亚组成与分离',
        '1965年独立',
        '经济发展奇迹',
        '区域金融中心',
        '大国平衡外交'
      ],
      culturalTraits: ['危机意识', '精英治理', '规则意识', '效率优先', '多元包容'],
      diplomaticTraditions: ['大国平衡', '规则为基础', '小国自强', '经济外交', '法律途径']
    },
    personality: {
      aggression: 4,
      flexibility: 8,
      patience: 6,
      riskTolerance: 4,
      nationalism: 7,
      multilateralOrientation: 8,
      bilateralOrientation: 9
    },
    negotiationStyle: {
      primary: 'principled',
      secondary: 'efficient',
      approach: 'principled',
      communication: 'direct'
    },
    coreInterests: ['主权独立', '经济发展', '地缘安全', '国际规则'],
    importantInterests: ['金融中心地位', '贸易通道', '人才竞争', '军事防御'],
    negotiableInterests: ['经济条款', '非核心议题', '技术标准'],
    leveragePoints: ['金融中心', '港口枢纽', '廉洁治理', '仲裁中心', '大国信任'],
    typicalStrategies: ['大国平衡', '规则利用', '高效专业', '议题选择', '声誉投资'],
    vulnerabilities: ['领土极小', '水资源依赖', '人口少', '经济单一'],
    languageStyle: {
      formality: 'formal',
      directness: 'high',
      emotionInvolvement: 'low'
    },
    capabilities: ['金融服务', '港口物流', '仲裁法律', '廉洁治理']
  },
  
  {
    id: 'south-korea',
    name: '韩国',
    flag: '🇰🇷',
    region: 'East Asia',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '朝鲜战争分裂国家，经济奇迹与民主转型',
      detailed: '朝鲜半岛分裂是20世纪地缘悲剧，韩国通过汉江奇迹实现了经济腾飞，从发展中国家成为发达国家。民主化转型后政治多元化，但面临朝鲜威胁和地缘竞争的双重压力。',
      keyHistoricalEvents: [
        '日本殖民统治',
        '朝鲜战争与分裂',
        '朴正熙经济奇迹',
        '民主化转型',
        '亚洲金融危机',
        '朝鲜核威胁',
        '萨德争议'
      ],
      culturalTraits: ['勤奋努力', '教育重视', '等级秩序', '集体荣誉', '技术追赶'],
      diplomaticTraditions: ['韩美同盟', '经济发展', '朝鲜问题中心', '文化软实力']
    },
    personality: {
      aggression: 5,
      flexibility: 6,
      patience: 6,
      riskTolerance: 4,
      nationalism: 7,
      multilateralOrientation: 6,
      bilateralOrientation: 8
    },
    negotiationStyle: {
      primary: 'cooperative',
      secondary: 'relationship-focused',
      approach: 'interest-based',
      communication: 'indirect'
    },
    coreInterests: ['国家安全（朝鲜威胁）', '韩美同盟', '经济发展', '朝鲜半岛统一'],
    importantInterests: ['技术升级', '贸易地位', '文化影响力', '半岛主导权'],
    negotiableInterests: ['贸易条款', '气候承诺', '非核心议题'],
    leveragePoints: ['技术实力', '经济规模', '美韩同盟', '文化软实力', '民主制度'],
    typicalStrategies: ['同盟协调', '朝鲜问题中心', '经济诱导', '文化渗透', '低调务实'],
    vulnerabilities: ['朝鲜威胁', '能源依赖', '老龄化', '政治极化'],
    languageStyle: {
      formality: 'formal',
      directness: 'low',
      emotionInvolvement: 'medium'
    },
    capabilities: ['科技制造', '文化产业', '制造业基础', '民主制度']
  },
  
  {
    id: 'ukraine',
    name: '乌克兰',
    flag: '🇺🇦',
    region: 'Europe/Eastern Europe',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '欧洲粮仓，夹缝中的地缘悲剧',
      detailed: '乌克兰是欧洲面积最大的国家之一，历史上被俄罗斯、波兰、奥匈帝国等统治。苏联解体后独立，但始终在亲欧与亲俄之间挣扎。2014年危机和2022年战争使其成为大国博弈的焦点。',
      keyHistoricalEvents: [
        '基辅罗斯文明',
        '波兰/俄罗斯/奥匈统治',
        '苏联加盟共和国',
        '独立与橙色革命',
        '2014克里米亚危机',
        '2022全面战争',
        '入欧进程'
      ],
      culturalTraits: ['坚韧不拔', '东西方融合', '民族主义', '欧洲认同', '农耕传统'],
      diplomaticTraditions: ['欧洲一体化', '领土完整', '民主转型', '大国博弈焦点']
    },
    personality: {
      aggression: 6,
      flexibility: 4,
      patience: 7,
      riskTolerance: 8,
      nationalism: 9,
      multilateralOrientation: 8,
      bilateralOrientation: 5
    },
    negotiationStyle: {
      primary: 'principled',
      secondary: 'resilient',
      approach: 'principled',
      communication: 'direct'
    },
    coreInterests: ['领土完整', '主权独立', '欧洲一体化', '战后重建'],
    importantInterests: ['入欧盟/北约', '西方援助', '能源独立', '经济复苏'],
    negotiableInterests: ['谈判细节', '时间表', '非核心议题'],
    leveragePoints: ['战略位置', '粮食资源', '西方支持', '抵抗意志', '反腐改革'],
    typicalStrategies: ['西方靠拢', '法律依据', '道德高地', '国际动员', '抵抗到底'],
    vulnerabilities: ['战争消耗', '经济脆弱', '腐败问题', '基础设施', '东部领土'],
    languageStyle: {
      formality: 'formal',
      directness: 'high',
      emotionInvolvement: 'high'
    },
    capabilities: ['农业资源', '战略位置', '劳动力', '抵抗意志']
  },
  
  {
    id: 'turkey',
    name: '土耳其',
    flag: '🇹🇷',
    region: 'Europe/Asia',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '奥斯曼遗产与凯末尔主义的碰撞',
      detailed: '土耳其继承奥斯曼帝国遗产，1923年凯末尔革命建立了世俗民主制度。近年来埃尔多安时代平衡宗教与传统西方价值，在大国间寻求最大利益。土耳其既是北约成员又与俄罗斯保持合作，是独特的多向外交典范。',
      keyHistoricalEvents: [
        '奥斯曼帝国',
        '一战失败与分裂',
        '凯末尔革命',
        '世俗化改革',
        '北约加入',
        '欧盟谈判',
        '埃尔多安时代',
        '大国平衡外交'
      ],
      culturalTraits: ['帝国野心', '东西桥梁', '伊斯兰传统', '突厥认同', '实用主义'],
      diplomaticTraditions: ['战略自主', '北约成员', '伊斯兰世界对话', '大国平衡']
    },
    personality: {
      aggression: 6,
      flexibility: 8,
      patience: 5,
      riskTolerance: 7,
      nationalism: 8,
      multilateralOrientation: 5,
      bilateralOrientation: 8
    },
    negotiationStyle: {
      primary: 'assertive',
      secondary: 'creative',
      approach: 'interest-based',
      communication: 'direct'
    },
    coreInterests: ['国家安全', '地区影响力', '库尔德问题', '经济稳定'],
    importantInterests: ['欧盟成员', '能源通道', '旅游收入', '军工出口'],
    negotiableInterests: ['贸易条款', '难民协议细节', '非核心议题'],
    leveragePoints: ['能源通道', '北约战略位置', '难民杠杆', '制造业', '旅游收入'],
    typicalStrategies: ['多向外交', '能源杠杆', '难民武器', '议题捆绑', '历史法理'],
    vulnerabilities: ['经济不稳定', '民主倒退', '库尔德问题', '高通胀'],
    languageStyle: {
      formality: 'formal',
      directness: 'high',
      emotionInvolvement: 'high'
    },
    capabilities: ['能源通道', '制造业', '旅游业', '地缘战略']
  },
  
  {
    id: 'iran',
    name: '伊朗',
    flag: '🇮🇷',
    region: 'Middle East',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '波斯文明传承，伊斯兰革命的反美先锋',
      detailed: '伊朗是古波斯帝国传承，拥有悠久文明。1979年伊斯兰革命后建立神权共和国，与美国断交并成为反美旗手。伊朗通过核计划和地区代理人在中东发挥重要影响，是伊核问题的核心当事方。',
      keyHistoricalEvents: [
        '古波斯帝国',
        '巴列维王朝西化',
        '1979伊斯兰革命',
        '人质危机',
        '两伊战争',
        '核问题与制裁',
        '伊核协议与退约',
        '地区影响力扩张'
      ],
      culturalTraits: ['文明自豪', '反美主义', '宗教意识形态', '战略耐心', '韧性传统'],
      diplomaticTraditions: ['反霸权', '伊斯兰价值观', '抵抗阵线', '核权利']
    },
    personality: {
      aggression: 7,
      flexibility: 5,
      patience: 9,
      riskTolerance: 7,
      nationalism: 9,
      multilateralOrientation: 4,
      bilateralOrientation: 6
    },
    negotiationStyle: {
      primary: 'patient',
      secondary: 'principled',
      approach: 'positional',
      communication: 'indirect'
    },
    coreInterests: ['政权生存', '核能力权利', '地区影响力', '制裁解除'],
    importantInterests: ['经济发展', '能源出口', '导弹计划', '地区代理网络'],
    negotiableInterests: ['核计划细节', '地区行为', '谈判节奏'],
    leveragePoints: ['核计划', '石油资源', '地区代理人', '霍尔木兹海峡', '反美旗帜'],
    typicalStrategies: ['分步谈判', '极限施压反击', '地区代理', '耐心等待', '核边缘政策'],
    vulnerabilities: ['经济制裁', '内部改革派压力', '以色列威胁', '地区孤立'],
    languageStyle: {
      formality: 'formal',
      directness: 'medium',
      emotionInvolvement: 'high'
    },
    capabilities: ['石油资源', '导弹技术', '地区代理', '霍尔木兹位置']
  },
  
  {
    id: 'saudi-arabia',
    name: '沙特阿拉伯',
    flag: '🇸🇦',
    region: 'Middle East',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '石油君主国，逊尼派领袖与改革先锋',
      detailed: '沙特阿拉伯1932年建国，依靠石油财富迅速现代化。作为麦加/麦地那守护者，沙特是逊尼派伊斯兰世界的精神领袖。萨勒曼父子改革试图现代化经济和社会，同时维持君主统治。',
      keyHistoricalEvents: [
        '沙特王朝建立',
        '石油发现与财富',
        '六日战争影响',
        '两伊战争支持',
        '911后外交调整',
        '也门战争',
        '2030愿景改革',
        '对以关系正常化'
      ],
      culturalTraits: ['宗教保守', '家族统治', '石油财富', '地区雄心', '快速现代化'],
      diplomaticTraditions: ['伊斯兰旗帜', '石油外交', '地区平衡', '王国安全']
    },
    personality: {
      aggression: 6,
      flexibility: 5,
      patience: 5,
      riskTolerance: 6,
      nationalism: 8,
      multilateralOrientation: 5,
      bilateralOrientation: 8
    },
    negotiationStyle: {
      primary: 'assertive',
      secondary: 'relationship-focused',
      approach: 'interest-based',
      communication: 'indirect'
    },
    coreInterests: ['王室统治稳定', '地区领导', '石油定价权', '安全与以色列平衡'],
    importantInterests: ['经济多元化', '地区联盟', '能源转型', '软实力提升'],
    negotiableInterests: ['增产配额', '投资条款', '非核心立场'],
    leveragePoints: ['石油产能', '投资资金', '伊斯兰世界影响', '地区联盟', '石油美元'],
    typicalStrategies: ['石油杠杆', '联盟构建', '地区代理人', '改革推进', '多元平衡'],
    vulnerabilities: ['石油依赖', '人权批评', '地区竞争', '青年变革压力'],
    languageStyle: {
      formality: 'formal',
      directness: 'low',
      emotionInvolvement: 'medium'
    },
    capabilities: ['石油资源', '投资资金', '伊斯兰地位', '地区联盟']
  },
  
  {
    id: 'australia',
    name: '澳大利亚',
    flag: '🇦🇺',
    region: 'Oceania',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '南半球中等强國，亚太融入与盎撒纽带',
      detailed: '澳大利亚是英国殖民地，独立后始终保持与西方的紧密联系。作为中等强国，澳大利亚在亚太地区发挥平衡作用，同时在中美竞争中面临选择困境。资源出口是其经济支柱。',
      keyHistoricalEvents: [
        '英国殖民地',
        '1901年联邦',
        '一战贡献',
        '亚太融入',
        '美英情报联盟',
        '资源出口繁荣',
        '中国关系波动',
        'AUKUS潜艇协议'
      ],
      culturalTraits: ['西方认同', '务实主义', '多元文化', '独立倾向', '资源依赖'],
      diplomaticTraditions: ['盎撒联盟', '亚太参与', '中等强国', '规则秩序']
    },
    personality: {
      aggression: 4,
      flexibility: 6,
      patience: 6,
      riskTolerance: 4,
      nationalism: 5,
      multilateralOrientation: 7,
      bilateralOrientation: 7
    },
    negotiationStyle: {
      primary: 'cooperative',
      secondary: 'principled',
      approach: 'interest-based',
      communication: 'direct'
    },
    coreInterests: ['国家安全', '经济繁荣', '盟友关系', '地区稳定'],
    importantInterests: ['资源出口', '技术合作', '移民政策', '太平洋岛国影响'],
    negotiableInterests: ['贸易条款', '气候政策', '非核心议题'],
    leveragePoints: ['矿产资源', '美英同盟', '亚太位置', '教育出口', '金融中心'],
    typicalStrategies: ['联盟协调', '规则维护', '资源杠杆', '亚太平衡', '经济多元'],
    vulnerabilities: ['中国经济依赖', '国防能力有限', '太平洋竞争', '气候政策压力'],
    languageStyle: {
      formality: 'semi-formal',
      directness: 'high',
      emotionInvolvement: 'low'
    },
    capabilities: ['矿产资源', '教育服务', '金融服务', '美英同盟']
  },
  
  {
    id: 'eu',
    name: '欧盟',
    flag: '🇪🇺',
    region: 'Europe',
    era: ['post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '战后一体化典范，全球治理的重要极',
      detailed: '欧盟是人类历史上独特的超国家实体，从煤钢共同体发展到经济货币联盟。欧盟通过制度合作实现了欧洲和平与繁荣，但在外交国防一体化上仍面临挑战。欧盟是中国最大的贸易伙伴，也是美国的重要盟友。',
      keyHistoricalEvents: [
        '舒曼计划1950',
        '欧共体建立',
        '单一市场1993',
        '欧元1999/2002',
        '东扩2004',
        '欧债危机',
        '英国脱欧',
        '绿色新政'
      ],
      culturalTraits: ['制度主义', '规范导向', '共识决策', '价值认同', '多极追求'],
      diplomaticTraditions: ['规范力量', '多边主义', '贸易力量', '气候领导']
    },
    personality: {
      aggression: 3,
      flexibility: 6,
      patience: 7,
      riskTolerance: 3,
      nationalism: 3,
      multilateralOrientation: 10,
      bilateralOrientation: 5
    },
    negotiationStyle: {
      primary: 'principled',
      secondary: 'consensus-building',
      approach: 'principled',
      communication: 'direct'
    },
    coreInterests: ['欧洲一体化', '共同市场', '价值观外交', '气候领导'],
    importantInterests: ['贸易协定', '监管标准', '防务合作', '东扩'],
    negotiableInterests: ['农业补贴', '移民政策', '财政规则'],
    leveragePoints: ['庞大市场', '监管标准', '气候规范', '发展援助', '软实力'],
    typicalStrategies: ['规范塑造', '条件性接触', '多边平台', '标准输出', '共识外交'],
    vulnerabilities: ['决策效率低', '英国脱欧', '极右翼崛起', '能源依赖', '防务依赖美国'],
    languageStyle: {
      formality: 'formal',
      directness: 'high',
      emotionInvolvement: 'low'
    },
    capabilities: ['庞大市场', '监管能力', '气候规范', '软实力', '人道援助']
  },
  
  {
    id: 'asean',
    name: '东盟',
    flag: '🇦🇸',
    region: 'Southeast Asia',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '东南亚国家联盟，小国抱团求存',
      detailed: '东盟1967年成立，最初是反共防务组织，逐渐发展为东南亚地区最重要的区域合作机制。东盟坚持不干涉内政和共识决策原则，在大国竞争中保持中心地位。',
      keyHistoricalEvents: [
        '1967年成立',
        '柬埔寨问题处理',
        '1997年金融危机应对',
        '东盟共同体2015',
        'RCEP签署',
        '大国平衡外交',
        '缅甸危机'
      ],
      culturalTraits: ['多样性', '共识文化', '不干涉原则', '灵活务实', '和平协商'],
      diplomaticTraditions: ['不干涉内政', '共识决策', ' ASEAN centrality', '和平解决争端']
    },
    personality: {
      aggression: 2,
      flexibility: 8,
      patience: 8,
      riskTolerance: 2,
      nationalism: 4,
      multilateralOrientation: 10,
      bilateralOrientation: 4
    },
    negotiationStyle: {
      primary: 'consensus',
      secondary: 'patient',
      approach: 'interest-based',
      communication: 'indirect'
    },
    coreInterests: [' ASEAN centrality', '地区稳定', '经济发展', '不干涉原则'],
    importantInterests: ['RCEP利用', '大国平衡', '基础设施', '数字化转型'],
    negotiableInterests: ['成员立场', '时间表', '非核心议题'],
    leveragePoints: ['市场准入', ' ASEAN forum', '地理位置', 'RCEP框架', '发展中国家代表'],
    typicalStrategies: [' ASEAN centrality', '共识外交', '议题分离', '大国平衡', '渐进一体化'],
    vulnerabilities: ['内部差异大', '不干涉限制', '经济依赖', '领土争议'],
    languageStyle: {
      formality: 'formal',
      directness: 'low',
      emotionInvolvement: 'low'
    },
    capabilities: ['区域平台', '共识外交', '发展合作', 'RCEP框架']
  },

  // ==================== 美洲其他国家 ====================
  {
    id: 'canada',
    name: '加拿大',
    flag: '🇨🇦',
    region: 'North America',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '和平主义与资源大国的双重身份',
      detailed: '加拿大是典型西方民主国家，英联邦成员，与美国有特殊关系。加拿大外交以多边主义、人权保护、环境领导力为特色，是联合国维和的重要贡献者。加美关系是其外交核心，但也有独立于美国的时刻。',
      keyHistoricalEvents: [
        '1867年建国',
        '两次世界大战参与',
        '和平主义传统',
        '加入北约/联合国',
        '北美自贸协定',
        '环境领导力',
        '原住民和解进程'
      ],
      culturalTraits: ['多元文化', '和平主义', '资源意识', '英法双语', '社会福利'],
      diplomaticTraditions: ['多边主义', '维和贡献', '环境领导', '人权保护', '和解外交']
    },
    personality: {
      aggression: 2,
      flexibility: 7,
      patience: 8,
      riskTolerance: 3,
      nationalism: 4,
      multilateralOrientation: 9,
      bilateralOrientation: 8
    },
    negotiationStyle: {
      primary: 'cooperative',
      secondary: 'principled',
      approach: 'interest-based',
      communication: 'indirect'
    },
    coreInterests: ['主权独立', '北美关系', '环境政策', '原住民权利'],
    importantInterests: ['贸易多元', '移民政策', '多边机构', '联合国角色'],
    negotiableInterests: ['贸易细节', '非核心立场', '时间表'],
    leveragePoints: ['资源丰富', '美国邻居', '国际声誉', '多边机构', '移民吸引力'],
    typicalStrategies: ['规则秩序', '共识构建', '多边合作', '环境议题', '和解文化'],
    vulnerabilities: ['经济依赖美国', '原住民问题', '气候变化脆弱', '国防依赖'],
    languageStyle: {
      formality: 'semi-formal',
      directness: 'low',
      emotionInvolvement: 'medium'
    },
    capabilities: ['自然资源', '金融服务', '教育出口', '移民政策', '维和经验']
  },

  {
    id: 'mexico',
    name: '墨西哥',
    flag: '🇲🇽',
    region: 'Latin America',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '玛雅-西班牙混血文明，美国后院的双刃剑',
      detailed: '墨西哥是拉美第二大经济体，玛雅和阿兹特克文明故地。历史上深受美国影响，1846-48战争失去半壁江山。墨西哥外交传统上强调不干涉、主权平等、南方共同市场合作。近年移民问题、毒品战争是核心议题。',
      keyHistoricalEvents: [
        '阿兹特克/玛雅文明',
        '西班牙殖民独立',
        '美墨战争1846-48',
        '1910革命',
        '北美自贸协定1994',
        '毒品战争',
        '左翼政府崛起'
      ],
      culturalTraits: ['混血文化', '家庭中心', '节日传统', '足球热情', '移民传统'],
      diplomaticTraditions: ['主权平等', '不干涉', '拉美团结', '发展中国家代言']
    },
    personality: {
      aggression: 4,
      flexibility: 7,
      patience: 7,
      riskTolerance: 5,
      nationalism: 7,
      multilateralOrientation: 6,
      bilateralOrientation: 8
    },
    negotiationStyle: {
      primary: 'pragmatic',
      secondary: 'defensive',
      approach: 'interest-based',
      communication: 'indirect'
    },
    coreInterests: ['主权独立', '移民权益', '反毒政策', '经济发展'],
    importantInterests: ['北美贸易', '拉美领导', '能源政策', '基础设施'],
    negotiableInterests: ['贸易细节', '移民配额', '时间表'],
    leveragePoints: ['战略位置', '拉美影响', '劳动力', '美墨加协定', '毒品需求'],
    typicalStrategies: ['议题挂钩', '移民杠杆', '拉美联盟', '务实妥协', '主权捍卫'],
    vulnerabilities: ['毒品暴力', '经济依赖美国', '腐败问题', '不平等'],
    languageStyle: {
      formality: 'formal',
      directness: 'medium',
      emotionInvolvement: 'high'
    },
    capabilities: ['地理位置', '拉美影响', '劳动力', '能源资源', '侨汇']
  },

  {
    id: 'argentina',
    name: '阿根廷',
    flag: '🇦🇷',
    region: 'Latin America',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '南美粮仓与庇隆主义的周期性摆动',
      detailed: '阿根廷曾是世界最富国家之一，欧洲移民目的地，牛肉和马术文化。马岛战争失败是民族创伤。庇隆主义主导政治，左右翼周期性执政。经济危机、外债问题、麦哲伦海峡是其核心议题。',
      keyHistoricalEvents: [
        '1816独立',
        '欧洲移民潮',
        '1930年代民粹主义',
        '庇隆时代1946-55',
        '军政府1976-83',
        '马岛战争1982',
        '经济危机2001',
        '左翼复兴'
      ],
      culturalTraits: ['欧洲遗风', '民粹传统', '足球激情', '牛仔文化', '悲观主义'],
      diplomaticTraditions: ['拉美主义', '主权捍卫', '不结盟', '发展中国家']
    },
    personality: {
      aggression: 5,
      flexibility: 6,
      patience: 5,
      riskTolerance: 6,
      nationalism: 8,
      multilateralOrientation: 6,
      bilateralOrientation: 7
    },
    negotiationStyle: {
      primary: 'assertive',
      secondary: 'emotional',
      approach: 'positional',
      communication: 'direct'
    },
    coreInterests: ['马岛主权', '经济稳定', '主权债务', '农业出口'],
    importantInterests: ['拉美领导', '能源合作', '贸易多元', '入欧盟'],
    negotiableInterests: ['贸易条款', 'IMF条件', '时间表'],
    leveragePoints: ['农业资源', '拉美影响', '麦哲伦海峡', '侨汇', '足球外交'],
    typicalStrategies: ['民粹动员', '英国施压', '拉美联盟', '债务博弈', '阿根廷例外论'],
    vulnerabilities: ['经济周期危机', '通胀高企', '外债负担', '政治极化'],
    languageStyle: {
      formality: 'formal',
      directness: 'high',
      emotionInvolvement: 'high'
    },
    capabilities: ['农业资源', '拉美地位', '能源潜力', '侨汇', '文化软实力']
  },

  // ==================== 中东/非洲 ====================
  {
    id: 'egypt',
    name: '埃及',
    flag: '🇪🇬',
    region: 'Middle East',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '古文明遗产与地缘枢纽的双重身份',
      detailed: '埃及是人类最古老文明之一，尼罗河礼物。冷战时纳赛尔主义影响整个阿拉伯世界，与以色列的和平条约是地区转折点。埃及控制苏伊士运河，是美国盟友但也保留独立性。',
      keyHistoricalEvents: [
        '法老文明',
        '阿拉伯起义1919',
        '纳赛尔主义1952',
        '萨达特-以色列和约1979',
        '穆巴拉克时代',
        '阿拉伯之春2011',
        '塞西时代'
      ],
      culturalTraits: ['古老文明', '阿拉伯领袖', '伊斯兰正统', '务实变通', '尼罗河依赖'],
      diplomaticTraditions: ['阿拉伯领袖', '不结盟', '以色列关系', '苏伊士维护', '美国平衡']
    },
    personality: {
      aggression: 5,
      flexibility: 6,
      patience: 7,
      riskTolerance: 5,
      nationalism: 8,
      multilateralOrientation: 7,
      bilateralOrientation: 8
    },
    negotiationStyle: {
      primary: 'pragmatic',
      secondary: 'defensive',
      approach: 'interest-based',
      communication: 'indirect'
    },
    coreInterests: ['国家安全', '尼罗河水权', '西奈安全', '运河控制'],
    importantInterests: ['阿拉伯领导', '美国援助', '经济援助', '能源出口'],
    negotiableInterests: ['贸易条款', '非核心议题', '时间表'],
    leveragePoints: ['苏伊士运河', '阿拉伯世界', '以色列关系', '地理位置', '劳动力'],
    typicalStrategies: ['运河杠杆', '阿拉伯联盟', '大国平衡', '务实妥协', '地区稳定'],
    vulnerabilities: ['水资源短缺', '经济依赖', '极端主义', '人口压力', '西奈安全'],
    languageStyle: {
      formality: 'formal',
      directness: 'medium',
      emotionInvolvement: 'high'
    },
    capabilities: ['运河控制', '阿拉伯领导', '地理位置', '劳动力', '能源']
  },

  {
    id: 'israel',
    name: '以色列',
    flag: '🇮🇱',
    region: 'Middle East',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '大屠杀幸存者与创新国家的融合',
      detailed: '以色列1948年建国，吸纳大屠杀幸存者，建立高科技创新国家。与阿拉伯国家的冲突贯穿其历史，与埃及、约旦实现和平，但伊朗、黎巴嫩真主党仍是对手。安全、经济、领土是其核心三角困境。',
      keyHistoricalEvents: [
        '1948建国与大屠杀幸存者',
        '六日战争1967',
        '埃以和平1979',
        '大屠杀后以色列认同',
        '定居点扩张',
        '奥斯陆协议1993',
        '高科技崛起',
        '亚伯拉罕协议2020'
      ],
      culturalTraits: ['创业精神', '安全焦虑', '多元融合', '教育重视', '军事传统'],
      diplomaticTraditions: ['安全至上', '技术外交', '美国联盟', '大屠杀记忆', '单边主义']
    },
    personality: {
      aggression: 7,
      flexibility: 5,
      patience: 4,
      riskTolerance: 7,
      nationalism: 9,
      multilateralOrientation: 4,
      bilateralOrientation: 8
    },
    negotiationStyle: {
      primary: 'assertive',
      secondary: 'principled',
      approach: 'positional',
      communication: 'direct'
    },
    coreInterests: ['国家安全', '耶路撒冷', '定居点', '犹太民族'],
    importantInterests: ['伊朗遏制', '技术合作', '美国关系', '区域联盟'],
    negotiableInterests: ['和平进程形式', '非核心议题', '时间表'],
    leveragePoints: ['军事优势', '美国支持', '科技实力', '情报能力', '犹太 lobby'],
    typicalStrategies: ['军事威慑', '单边行动', '美国外交', '技术优势', '定居点事实'],
    vulnerabilities: ['阿拉伯世界', '国际孤立', '安全困境', '巴勒斯坦问题', '人口结构'],
    languageStyle: {
      formality: 'formal',
      directness: 'high',
      emotionInvolvement: 'medium'
    },
    capabilities: ['军事力量', '科技实力', '情报网络', '美国关系', '创新能力']
  },

  {
    id: 'nigeria',
    name: '尼日利亚',
    flag: '🇳🇬',
    region: 'Africa',
    era: ['post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '非洲人口第一大国与部落多元的挑战',
      detailed: '尼日利亚是非洲人口最多的国家，部落宗教多元，1960年独立后多次政变。石油经济带来财富也带来腐败和资源诅咒。北约重要伙伴，在非洲维和、经济发展上发挥领导作用。',
      keyHistoricalEvents: [
        '1960独立',
        '比夫拉内战1967-70',
        '多次军事政变',
        '民主化1999',
        '石油繁荣与诅咒',
        '博科圣地叛乱',
        '非洲领导角色',
        '经济多元努力'
      ],
      culturalTraits: ['部落多元', '宗教多元', '乐观热情', '创业精神', '腐败挑战'],
      diplomaticTraditions: ['非洲领袖', '不结盟', '英联邦', '能源外交', '维和贡献']
    },
    personality: {
      aggression: 5,
      flexibility: 6,
      patience: 6,
      riskTolerance: 6,
      nationalism: 7,
      multilateralOrientation: 7,
      bilateralOrientation: 6
    },
    negotiationStyle: {
      primary: 'pragmatic',
      secondary: 'coalition',
      approach: 'interest-based',
      communication: 'indirect'
    },
    coreInterests: ['领土完整', '石油收入', '区域安全', '民主稳定'],
    importantInterests: ['经济发展', '反腐改革', '基础设施', '非洲领导'],
    negotiableInterests: ['贸易条款', '投资条件', '非核心议题'],
    leveragePoints: ['人口红利', '石油资源', '非洲领导', '区域安全', '英联邦'],
    typicalStrategies: ['非洲联盟', '大国平衡', '石油杠杆', '区域安全', '民主样板'],
    vulnerabilities: ['腐败问题', '部落冲突', '博科圣地', '经济单一', '基础设施'],
    languageStyle: {
      formality: 'formal',
      directness: 'medium',
      emotionInvolvement: 'high'
    },
    capabilities: ['石油资源', '人口市场', '非洲领导', '区域安全', '英语优势']
  },

  // ==================== 中亚/东欧/其他 ====================
  {
    id: 'kazakhstan',
    name: '哈萨克斯坦',
    flag: '🇰🇿',
    region: 'Central Asia',
    era: ['post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '丝绸之路复兴与大国平衡的典范',
      detailed: '哈萨克斯坦1991年独立，努纳扎尔耶夫开创稳定发展道路。中亚最大国家，石油天然气丰富，地处俄罗斯-中国-欧洲交汇点。平衡俄罗斯、中国、美国影响力，发展过境外交。',
      keyHistoricalEvents: [
        '丝绸之路',
        '俄罗斯帝国/苏联加盟',
        '1991独立',
        '迁都阿斯塔纳',
        '石油开发',
        '大国平衡',
        '后努纳扎尔时代'
      ],
      culturalTraits: ['游牧传统', '多元融合', '现代化进程', '地缘敏感', '语言优势'],
      diplomaticTraditions: ['平衡外交', '丝路复兴', '能源合作', '宗教温和', '欧亚整合']
    },
    personality: {
      aggression: 3,
      flexibility: 8,
      patience: 7,
      riskTolerance: 5,
      nationalism: 6,
      multilateralOrientation: 8,
      bilateralOrientation: 7
    },
    negotiationStyle: {
      primary: 'pragmatic',
      secondary: 'balancing',
      approach: 'interest-based',
      communication: 'indirect'
    },
    coreInterests: ['主权独立', '能源出口', '地区稳定', '大国平衡'],
    importantInterests: ['丝路地位', '经济多元', '水资源', '区域合作'],
    negotiableInterests: ['投资条款', '合作形式', '时间表'],
    leveragePoints: ['能源资源', '地理位置', '丝路枢纽', '俄罗斯关系', '稳定形象'],
    typicalStrategies: ['大国平衡', '丝路外交', '能源杠杆', '稳定形象', '区域整合'],
    vulnerabilities: ['俄罗斯影响', '经济依赖', '水资源', '专制倾向', '民族问题'],
    languageStyle: {
      formality: 'formal',
      directness: 'low',
      emotionInvolvement: 'low'
    },
    capabilities: ['能源资源', '地理位置', '丝路枢纽', '区域影响', '稳定治理']
  },

  {
    id: 'poland',
    name: '波兰',
    flag: '🇵🇱',
    region: 'Europe',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '夹缝求生的欧洲心脏',
      detailed: '波兰地处德俄之间，历史上三次被瓜分，二战后被迫加入苏联阵营。1989团结工会开创东欧剧变，加入欧盟北约后快速西化。与德国和解但对俄警惕，历史记忆深刻影响外交。',
      keyHistoricalEvents: [
        '三次瓜分',
        '第二共和国1918-39',
        '二战毁灭',
        '苏联控制1945-89',
        '团结工会1980',
        '欧盟北约双入2004',
        '右翼政府',
        '乌克兰危机立场'
      ],
      culturalTraits: ['苦难记忆', '天主教传统', '民族自豪', '欧洲认同', '务实变通'],
      diplomaticTraditions: ['欧洲一体化', '历史警示', '民主价值', '对俄警惕', '美德桥梁']
    },
    personality: {
      aggression: 5,
      flexibility: 6,
      patience: 5,
      riskTolerance: 6,
      nationalism: 7,
      multilateralOrientation: 8,
      bilateralOrientation: 5
    },
    negotiationStyle: {
      primary: 'assertive',
      secondary: 'principled',
      approach: 'principled',
      communication: 'direct'
    },
    coreInterests: ['主权独立', '欧盟成员', '历史正义', '安全保证'],
    importantInterests: ['北约强化', '德国和解', '经济发展', '民主价值'],
    negotiableInterests: ['贸易细节', '非核心议题', '程序问题'],
    leveragePoints: ['欧盟投票权', '地理位置', '历史道德高地', '美国关系', '劳动力'],
    typicalStrategies: ['欧盟核心', '历史道德', '民主价值', '美国依赖', '对俄强硬'],
    vulnerabilities: ['对德俄复杂', '右翼争议', '法治问题', '经济差距', '人口流失'],
    languageStyle: {
      formality: 'formal',
      directness: 'high',
      emotionInvolvement: 'medium'
    },
    capabilities: ['欧盟地位', '地理位置', '历史话语权', '美国关系', '劳动力']
  },

  {
    id: 'netherlands',
    name: '荷兰',
    flag: '🇳🇱',
    region: 'Europe',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '海上贸易帝国与欧盟核心的融合',
      detailed: '荷兰17世纪海上帝国，创造了现代金融体系。二战被德国占领后加入北约欧盟。荷兰是典型小国大外交，在欧盟机构、气候变化、国际司法上有独特影响力。务实妥协与价值观外交并存。',
      keyHistoricalEvents: [
        '黄金时代海上帝国',
        '现代金融创立',
        '中立政策失败1940',
        '战后和解',
        '加入欧盟北约',
        '国际司法领导',
        '欧洲核心国家',
        '气候先锋'
      ],
      culturalTraits: ['务实商业', '开放包容', '水管理智慧', '多元社会', '低地国家精神'],
      diplomaticTraditions: ['多边主义', '欧盟核心', '国际法', '贸易自由', '气候领导']
    },
    personality: {
      aggression: 3,
      flexibility: 8,
      patience: 7,
      riskTolerance: 5,
      nationalism: 4,
      multilateralOrientation: 10,
      bilateralOrientation: 5
    },
    negotiationStyle: {
      primary: 'cooperative',
      secondary: 'principled',
      approach: 'interest-based',
      communication: 'indirect'
    },
    coreInterests: ['欧盟整体', '贸易开放', '国际法', '气候政策'],
    importantInterests: ['荷比卢团结', '荷美关系', '发展中国家', '创新科技'],
    negotiableInterests: ['农业政策', '财政规则', '难民配额'],
    leveragePoints: ['鹿特丹港', '欧盟机构', '国际司法', '农业技术', '创新中心'],
    typicalStrategies: ['欧盟桥梁', '规则秩序', '气候道德', '贸易开放', '务实妥协'],
    vulnerabilities: ['农业争议', '住房危机', '氮排放', '小国局限', '欧盟依赖'],
    languageStyle: {
      formality: 'semi-formal',
      directness: 'medium',
      emotionInvolvement: 'low'
    },
    capabilities: ['港口物流', '金融中心', '农业技术', '国际司法', '创新环境']
  },

  {
    id: 'switzerland',
    name: '瑞士',
    flag: '🇨🇭',
    region: 'Europe',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '中立传统与金融帝国的完美结合',
      detailed: '瑞士1815年宣布中立，历经两次世界大战不卷入战争。金融体系和红十字会是其国际名片。瑞士不是欧盟北约成员，但通过双边条约保持紧密关系。直接民主和中立主义是其核心身份。',
      keyHistoricalEvents: [
        '1815中立宣言',
        '两次世界大战中立',
        '金融中心形成',
        '红十字会创立',
        '中立身份认同',
        '欧盟双边条约',
        '银行保密争议',
        '瑞银危机救助'
      ],
      culturalTraits: ['中立主义', '直接民主', '多语言', '精密制造', '隐私意识'],
      diplomaticTraditions: ['永久中立', '国际仲裁', '人道主义', '金融中立', '共识决策']
    },
    personality: {
      aggression: 2,
      flexibility: 7,
      patience: 9,
      riskTolerance: 3,
      nationalism: 8,
      multilateralOrientation: 7,
      bilateralOrientation: 6
    },
    negotiationStyle: {
      primary: 'consensus',
      secondary: 'cautious',
      approach: 'interest-based',
      communication: 'indirect'
    },
    coreInterests: ['中立地位', '金融中心', '主权独立', '直接民主'],
    importantInterests: ['欧盟关系', '国际仲裁', '人道主义', '贸易协定'],
    negotiableInterests: ['制裁配合', '非核心议题', '时间表'],
    leveragePoints: ['中立地位', '金融中心', '达沃斯平台', '红十字会', '安全资产'],
    typicalStrategies: ['中立调停', '金融杠杆', '共识构建', '长期关系', '程序主导'],
    vulnerabilities: ['欧盟压力', '银行保密', '劳动力短缺', '能源依赖', '国际孤立风险'],
    languageStyle: {
      formality: 'formal',
      directness: 'low',
      emotionInvolvement: 'low'
    },
    capabilities: ['金融中心', '中立地位', '达沃斯平台', '人道机构', '精密制造']
  },

  {
    id: 'saudiarabia',
    name: '沙特阿拉伯',
    flag: '🇸🇦',
    region: 'Middle East',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '石油财富与伊斯兰守护者的双重身份',
      detailed: '沙特1932年建国，石油发现改变命运。瓦哈比派伊斯兰与美国石油美元体系构成其权力基础。近年2030愿景推动多元改革，但记者卡舒吉案损害国际形象。与以色列关系正常化是重大议题。',
      keyHistoricalEvents: [
        '1932建国',
        '石油发现1938',
        '石油危机1973',
        '海湾战争1991',
        '9/11牵连',
        '油价下跌',
        '2030愿景',
        '卡舒吉案',
        '以色列关系正常化讨论'
      ],
      culturalTraits: ['伊斯兰传统', '部落忠诚', '王室统治', '石油财富', '保守现代并存'],
      diplomaticTraditions: ['伊斯兰领袖', '石油外交', '美国联盟', '地区影响', '反恐合作']
    },
    personality: {
      aggression: 6,
      flexibility: 5,
      patience: 6,
      riskTolerance: 6,
      nationalism: 9,
      multilateralOrientation: 5,
      bilateralOrientation: 8
    },
    negotiationStyle: {
      primary: 'pragmatic',
      secondary: 'assertive',
      approach: 'positional',
      communication: 'indirect'
    },
    coreInterests: ['王室统治', '石油定价', '伊斯兰领袖', '地区影响'],
    importantInterests: ['经济多元', '美国关系', '以色列关系', '伊朗竞争'],
    negotiableInterests: ['投资条款', '非核心议题', '合作形式'],
    leveragePoints: ['石油产能', '石油美元', '圣地守护', '地区影响', '投资资金'],
    typicalStrategies: ['石油武器', '联盟构建', '伊斯兰话语', '经济渗透', '地区平衡'],
    vulnerabilities: ['经济多元不足', '人权批评', '伊朗竞争', '青年变革压力', '石油依赖'],
    languageStyle: {
      formality: 'formal',
      directness: 'medium',
      emotionInvolvement: 'medium'
    },
    capabilities: ['石油资源', '资金实力', '伊斯兰地位', '地区影响', '投资能力']
  },

  {
    id: 'indonesia',
    name: '印度尼西亚',
    flag: '🇮🇩',
    region: 'Southeast Asia',
    era: ['cold-war', 'post-cold-war', 'modern', 'future'],
    isActive: true,
    historicalBackground: {
      brief: '穆斯林民主大国与海上枢纽',
      detailed: '印尼是世界最大穆斯林国家，1.7万岛屿，1945年独立。苏哈托威权时代后民主转型。东盟创始成员，大国平衡外交。南海问题是核心挑战，伊斯兰温和派形象是其独特资产。',
      keyHistoricalEvents: [
        '1945独立',
        '苏哈托威权32年',
        '民主转型1998',
        '海啸2004',
        '东盟创始',
        '雅加达首都迁移',
        '南海争端',
        'G20主办'
      ],
      culturalTraits: ['多元宗教', '群岛国家', '民主新生', '多元一体', '海洋民族'],
      diplomaticTraditions: ['不结盟', '东盟核心', '大国平衡', '伊斯兰温和', '海洋法权']
    },
    personality: {
      aggression: 4,
      flexibility: 7,
      patience: 8,
      riskTolerance: 4,
      nationalism: 7,
      multilateralOrientation: 8,
      bilateralOrientation: 6
    },
    negotiationStyle: {
      primary: 'consensus',
      secondary: 'cautious',
      approach: 'interest-based',
      communication: 'indirect'
    },
    coreInterests: ['领土完整', '南海主权', '伊斯兰领导', '区域稳定'],
    importantInterests: ['东盟核心', '大国平衡', '经济发展', '海洋权益'],
    negotiableInterests: ['贸易条款', '投资条件', '非核心议题'],
    leveragePoints: ['穆斯林世界', '东盟平台', '海上位置', '民主身份', 'G20地位'],
    typicalStrategies: ['东盟平台', '伊斯兰话语', '大国平衡', '共识外交', '海洋法权'],
    vulnerabilities: ['分离主义', '南海争议', '经济差距', '宗教极端', '基础设施'],
    languageStyle: {
      formality: 'formal',
      directness: 'low',
      emotionInvolvement: 'medium'
    },
    capabilities: ['穆斯林影响', '东盟核心', '海洋位置', '民主经验', 'G20地位']
  }

];

// 根据ID获取国家
export function getCountryById(id: string): CountryProfile | undefined {
  return countries.find(c => c.id === id);
}

// 根据地区获取国家
export function getCountriesByRegion(region: string): CountryProfile[] {
  return countries.filter(c => c.region === region);
}

// 搜索国家
export function searchCountries(query: string): CountryProfile[] {
  const q = query.toLowerCase();
  return countries.filter(c => 
    c.name.toLowerCase().includes(q) ||
    c.id.toLowerCase().includes(q) ||
    c.region.toLowerCase().includes(q)
  );
}

// 获取所有地区
export function getAllRegions(): string[] {
  return [...new Set(countries.map(c => c.region))];
}

// 获取核心国家（常用于多边谈判的）
export function getCoreCountries(): CountryProfile[] {
  return countries.filter(c => 
    ['china', 'usa', 'russia', 'uk', 'france', 'germany', 'japan', 'india', 'eu', 'uk', 'brazil', 'australia', 'canada', 'mexico', 'egypt', 'israel', 'saudiarabia', 'indonesia', 'poland', 'nigeria'].includes(c.id)
  );
}
