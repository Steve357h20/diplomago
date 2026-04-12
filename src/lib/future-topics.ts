import { NegotiationTopic } from '@/types/negotiation';

// 未来议题分类
export const futureCategories = [
  { id: 'tech', name: '科技前沿', icon: '🔬', color: '#8B5CF6' },
  { id: 'climate', name: '气候变化', icon: '🌍', color: '#10B981' },
  { id: 'resource', name: '资源能源', icon: '⚡', color: '#F59E0B' },
  { id: 'ai', name: 'AI与数字治理', icon: '🤖', color: '#6366F1' },
  { id: 'space', name: '太空开发', icon: '🚀', color: '#3B82F6' },
  { id: 'bio', name: '生物科技', icon: '🧬', color: '#EC4899' },
  { id: 'social', name: '社会治理', icon: '🏛️', color: '#14B8A6' },
  { id: 'security', name: '新型安全', icon: '🛡️', color: '#EF4444' },
];

// 未来议题主题 - 每个主题都包含详细背景故事
export const futureTopics: NegotiationTopic[] = [
  // 科技前沿
  {
    id: 'future-quantum',
    name: '量子技术国际治理',
    category: 'security',
    era: 'modern',
    recommendedDifficulty: 'advanced',
    description: '量子计算、量子通信等前沿技术的国际规则制定与安全治理',
    keyIssues: ['量子霸权竞争', '技术出口管制', '安全标准制定', '人才培养合作', '知识产权共享'],
    background: `【背景概述】
量子技术正在开启新一轮科技革命。量子计算机有望在未来十年内破解现有加密体系，量子通信则可能实现"绝对安全"的信息传输。

量子技术涉及国家安全核心利益。谁掌握了量子优势，谁就可能在军事、金融、国家安全等领域获得不对称优势。

【各方关切】
主要技术强国都在加大对量子技术的投入，同时对量子技术出口实施严格管控。如何在技术竞争与合作之间取得平衡，是各国面临的共同挑战。`,
  },
  {
    id: 'future-semiconductor',
    name: '半导体产业链重构',
    category: 'trade',
    era: 'modern',
    recommendedDifficulty: 'intermediate',
    description: '全球半导体供应链重组与关键技术国际合作机制',
    keyIssues: ['产能分布调整', '技术封锁与合作', '设备出口限制', '人才流动管理', '产业补贴规则'],
    background: `【背景概述】
半导体是现代经济的"数字原油"。全球芯片短缺暴露了供应链的脆弱性，各国都在寻求建立更安全的半导体供应体系。

半导体制造涉及数千道工序，从设计软件到光刻机，任何一个环节都可能成为"卡脖子"的瓶颈。

【各方关切】
技术领先国希望保持优势地位，后发国家则努力实现自主可控。如何在国家安全和经济效率之间取得平衡，是半导体治理的核心难题。`,
  },
  
  // 气候变化
  {
    id: 'future-carbon-tax',
    name: '碳关税与气候贸易',
    category: 'environmental',
    era: 'modern',
    recommendedDifficulty: 'intermediate',
    description: '碳边境调节机制、碳市场国际链接与气候贸易规则谈判',
    keyIssues: ['碳边境税设计', '碳市场互认', '减排标准协调', '气候融资机制', '发展中国家豁免'],
    background: `【背景概述】
碳边境调节机制正在重塑全球贸易格局。欧盟已率先启动CBAM，对进口高碳产品征收碳关税。这一机制可能引发连锁反应，导致全球贸易规则重构。

【各方关切】
发达国家希望借此保护本国企业竞争力，推动全球减排；发展中国家则担心这会成为新型贸易壁垒。碳市场国际链接、减排标准互认等议题成为谈判焦点。`,
  },
  {
    id: 'future-climate-loss',
    name: '气候变化损失赔偿',
    category: 'environmental',
    era: 'modern',
    recommendedDifficulty: 'advanced',
    description: '气候变化损失与损害赔偿机制的建立与实施',
    keyIssues: ['历史排放责任', '赔偿基金设立', '金额计算标准', '支付机制设计', '政治可操作性'],
    background: `【背景概述】
气候变化已经造成并将继续造成巨大的经济损失和人员伤亡。极端天气事件频发，海平面上升威胁低洼国家，小岛屿国家面临生存危机。

【各方关切】
发展中国家要求发达国家为历史排放承担赔偿责任，发达国家则对赔偿义务持谨慎态度。如何建立公平、透明、可操作的资金机制，是谈判的核心难题。`,
  },
  {
    id: 'future-migration',
    name: '气候移民治理',
    category: 'security',
    era: 'modern',
    recommendedDifficulty: 'intermediate',
    description: '因气候变化导致的跨境人口流动治理与权益保障',
    keyIssues: ['难民身份认定', '接收责任分担', '原籍国权益', '适应资金支持', '国际合作机制'],
    background: `【背景概述】
气候变化正在成为人口迁移的新驱动力。预计到2050年，全球可能有数亿人因气候原因被迫迁移。如何应对这一史无前例的挑战，成为国际社会的紧迫议题。

【各方关切】
移民来源国希望获得补偿和发展支持，接收国则面临巨大的社会压力。气候移民的法律地位、权益保障、跨境安置等议题需要国际合作解决。`,
  },
  
  // 资源能源
  {
    id: 'future-critical-minerals',
    name: '关键矿产争夺',
    category: 'trade',
    era: 'modern',
    recommendedDifficulty: 'intermediate',
    description: '锂、钴、稀土等关键矿产资源的开发权与供应链安全',
    keyIssues: ['采矿权分配', '冶炼加工合作', '战略储备机制', '价格波动管控', '环境标准协调'],
    background: `【背景概述】
新能源转型使关键矿产成为新的战略资源。锂、钴、镍、稀土等矿产是电动汽车、太阳能电池、风力发电的关键材料。全球对这些矿产的需求正在爆发式增长。

【各方关切】
资源富国希望利用资源优势获取经济利益，技术强国则寻求供应链安全。如何在资源开发、环境保护、社区权益之间取得平衡，是资源治理的核心挑战。`,
  },
  {
    id: 'future-nuclear-energy',
    name: '核能发展与核裁军',
    category: 'security',
    era: 'modern',
    recommendedDifficulty: 'advanced',
    description: '清洁能源需求下的核能发展与核武器管控平衡',
    keyIssues: ['核能和平利用', '核不扩散机制', '核废料处理', '小型模块化反应堆', '核威慑战略'],
    background: `【背景概述】
气候变化压力下，核能作为低碳能源重新受到重视。但核扩散风险、核安全事故、核废料处理等问题始终困扰着核能发展。

【各方关切】
核国家坚持核威慑战略，非核国家要求核裁军进展，有核野心的国家则在核门槛徘徊。如何在能源需求与防扩散安全之间取得平衡，是核治理的核心难题。`,
  },
  {
    id: 'future-water',
    name: '水资源国际治理',
    category: 'territory',
    era: 'modern',
    recommendedDifficulty: 'intermediate',
    description: '跨境水资源分配、水权交易与水安全合作',
    keyIssues: ['水权分配原则', '上游国家权利', '跨境河流管理', '水贸易规则', '干旱应对合作'],
    background: `【背景概述】
水是生命之源，也是冲突之因。全球气候变化导致水资源分布更加不均，跨境河流的水权争端日益尖锐。上游国家的水坝建设，下游国家的水量和水质都受到严重影响。

【各方关切】
上游国家强调主权权利，下游国家关切水资源安全。如何建立公平合理的水资源分配机制，平衡各方利益，是跨境水治理的核心挑战。`,
  },
  
  // AI与数字治理
  {
    id: 'future-ai-governance',
    name: 'AI国际治理框架',
    category: 'security',
    era: 'modern',
    recommendedDifficulty: 'advanced',
    description: '人工智能发展规范、伦理标准与全球治理机制',
    keyIssues: ['AI伦理标准', '军事应用限制', '数据跨境流动', '算法透明度', '责任归属认定'],
    background: `【背景概述】
人工智能正在深刻改变人类社会。从军事应用到经济生产，从司法裁判到医疗诊断，AI的影响无处不在。AI伦理、安全风险、治理机制成为国际社会关注的焦点。

【各方关切】
AI强国希望在治理规则制定中发挥主导作用，同时防止技术外泄；AI发展中国家则关注技术鸿沟问题。如何在促进AI发展和防范AI风险之间取得平衡，是全球AI治理的核心难题。`,
  },
  {
    id: 'future-digital-sovereignty',
    name: '数字主权与数据治理',
    category: 'security',
    era: 'modern',
    recommendedDifficulty: 'advanced',
    description: '数据本地化、跨境数据流动规则与数字主权边界',
    keyIssues: ['数据本地化要求', '跨境调取规则', '平台监管权', '数字税征收', '网络主权边界'],
    background: `【背景概述】
数字时代，数据已成为新的生产要素和战略资源。数据跨境流动涉及国家安全、经济利益、个人隐私等多重考量。

【各方关切】
数据生产国希望数据自由流动以获取经济利益，数据消费国则强调数据主权和安全。各方在数据本地化要求、跨境数据调取、平台监管等问题上存在深刻分歧。`,
  },
  {
    id: 'future-cyber',
    name: '网络空间安全',
    category: 'security',
    era: 'modern',
    recommendedDifficulty: 'advanced',
    description: '网络攻击归因、国际网络行为规范与网络冲突管控',
    keyIssues: ['攻击归因标准', '关键基础设施保护', '网络军备控制', '信息战规则', '国际应急合作'],
    background: `【背景概述】
网络空间已成为大国博弈的新战场。网络攻击可以瘫痪关键基础设施、窃取敏感信息、影响政治进程。网络攻击的归因困难，使得网络威慑和危机管控面临挑战。

【各方关切】
网络强国在网络空间拥有不对称优势，弱国则面临更大的安全风险。如何建立网络空间行为规范，管控网络冲突风险，是国际社会的紧迫任务。`,
  },
  
  // 太空开发
  {
    id: 'future-moon-treaty',
    name: '月球资源开发公约',
    category: 'territory',
    era: 'modern',
    recommendedDifficulty: 'intermediate',
    description: '月球及其他天体资源开发权归属与利益分享机制',
    keyIssues: ['外层空间条约修订', '资源产权认定', '利益分享机制', '军事利用禁止', '环境保护义务'],
    background: `【背景概述】
太空经济正在蓬勃发展。月球水冰、小行星采矿、太空太阳能等概念正在走向现实。1967年的外层空间条约已无法适应新的发展需求。

【各方关切】
太空强国主张商业友好的开发规则，发展中国家则要求建立类似"人类共同继承财产"原则的制度。如何平衡商业开发与公共利益，是太空治理的核心难题。`,
  },
  {
    id: 'future-space-traffic',
    name: '太空交通管理',
    category: 'security',
    era: 'modern',
    recommendedDifficulty: 'intermediate',
    description: '卫星轨道分配、太空碎片清理与空间交通规则制定',
    keyIssues: ['轨道资源分配', '碎片清理责任', '碰撞预防机制', '军事活动限制', '商业发射管理'],
    background: `【背景概述】
卫星数量呈指数级增长，太空碎片问题日益严峻。低地球轨道日益拥挤，卫星碰撞、碎片失控等风险不断上升。

【各方关切】
商业航天公司需要可预测的轨道资源，政府则关注轨道资源的军事价值。如何建立公平、高效、可持续的太空交通管理机制，是迫在眉睫的挑战。`,
  },
  {
    id: 'future-space-military',
    name: '太空军事化管控',
    category: 'security',
    era: 'modern',
    recommendedDifficulty: 'advanced',
    description: '太空武器部署限制、反卫星能力管控与太空安全机制',
    keyIssues: ['武器禁令谈判', '反卫星试验限制', '太空监视合作', '危机沟通机制', '战略稳定性维护'],
    background: `【背景概述】
太空曾是冷战的禁区，如今却成为军事竞争的新前沿。反卫星武器、天基拦截器、太空监视系统等军事太空能力快速发展。

【各方关切】
太空优势国家希望保持军事太空能力，其他国家则呼吁禁止太空武器。如何在太空军事化与战略稳定之间取得平衡，是太空安全治理的核心挑战。`,
  },
  
  // 生物科技
  {
    id: 'future-bioethics',
    name: '基因编辑伦理治理',
    category: 'cultural',
    era: 'modern',
    recommendedDifficulty: 'advanced',
    description: '人类基因编辑、生殖系修改的伦理规范与国际法规',
    keyIssues: ['红线定义', '临床试验规范', '跨国监管', '社会公平考量', '知情同意标准'],
    background: `【背景概述】
CRISPR等基因编辑技术正在走向成熟。人类基因编辑可能治愈遗传疾病，提高人类能力，但也可能带来严重伦理和社会问题。

【各方关切】
科学家追求技术进步，伦理学家担忧社会后果，各国政府面临监管困境。如何在科技创新与伦理红线之间建立国际共识，是人类面临的根本挑战。`,
  },
  {
    id: 'future-pandemic',
    name: '大流行病防范公约',
    category: 'security',
    era: 'modern',
    recommendedDifficulty: 'intermediate',
    description: '新发传染病防控、信息共享与疫苗公平分配机制',
    keyIssues: ['早期预警机制', '信息共享义务', '疫苗专利豁免', '医疗物资储备', 'WHO改革方向'],
    background: `【背景概述】
新冠疫情暴露了全球公共卫生治理的严重不足。疫苗民族主义、物资囤积、信息不透明等问题导致疫情持续蔓延。

【各方关切】
疫苗生产国希望保护本国供应，发展中国家要求公平获取。信息共享、溯源调查、WHO改革等议题充满政治敏感性。`,
  },
  {
    id: 'future-biodiversity',
    name: '生物多样性保护',
    category: 'environmental',
    era: 'modern',
    recommendedDifficulty: 'intermediate',
    description: '生物遗传资源获取与惠益分享、数字序列信息国际制度',
    keyIssues: ['遗传资源产权', '惠益分享比例', '数字序列信息', '原住民权利', '保护资金机制'],
    background: `【背景概述】
生物多样性正在以惊人速度丧失。物种灭绝、生态系统崩溃不仅威胁自然界，也威胁人类自身的生存和发展。

【各方关切】
生物多样性丰富的发展中国家拥有遗传资源，却缺乏开发利用能力；发达国家拥有技术优势，却面临道德压力。如何建立公平的利益分享机制，是生物多样性治理的核心挑战。`,
  },
  
  // 社会治理
  {
    id: 'future-inequality',
    name: '全球不平等治理',
    category: 'cultural',
    era: 'modern',
    recommendedDifficulty: 'intermediate',
    description: '南北差距、数字化鸿沟与包容性发展的国际合作',
    keyIssues: ['技术转让义务', '发展援助改革', '数字基础设施', '债务可持续性', '贸易规则公平'],
    background: `【背景概述】
全球不平等正在加剧。富国与穷国之间的差距，不仅体现在收入上，更体现在教育、医疗、数字接入等发展机会上。自动化和人工智能可能进一步加剧不平等。

【各方关切】
发展中国家要求公平的发展机会和资源分配，发达国家则担心承担过多责任。如何构建包容性的全球发展体系，是21世纪的核心挑战。`,
  },
  {
    id: 'future-population',
    name: '人口结构变化应对',
    category: 'cultural',
    era: 'modern',
    recommendedDifficulty: 'beginner',
    description: '人口老龄化、劳动力流动与社会保障国际协调',
    keyIssues: ['移民政策协调', '养老金跨境携带', '技能人才竞争', '人口贩卖打击', '老年歧视禁止'],
    background: `【背景概述】
全球人口结构正在经历深刻变化。发达国家面临老龄化压力，新兴经济体人口增长放缓，部分最不发达国家人口仍在快速增长。

【各方关切】
人口老龄化国家需要年轻劳动力，人口增长国家面临就业压力。如何在全球范围内优化劳动力配置，协调社会保障体系，是人口治理的重要议题。`,
  },
  
  // 新型安全
  {
    id: 'future-wmd',
    name: '新型武器管控',
    category: 'security',
    era: 'modern',
    recommendedDifficulty: 'advanced',
    description: '高超音速武器、定向能武器、人工智能武器的管控规则',
    keyIssues: ['武器定义边界', '核查可行性', '军备竞赛预防', '大国与小国关系', '技术扩散管控'],
    background: `【背景概述】
军事技术革命正在催生新型武器。高超音速武器可以突破现有防御系统，定向能武器提供精准打击能力，人工智能武器可能改变战争形态。

【各方关切】
军事强国积极发展新型武器以获取优势，国际社会呼吁建立管控规则。新型武器的核查困难、定义模糊，使得传统军控模式面临挑战。`,
  },
  {
    id: 'future-gray-zone',
    name: '灰色地带冲突',
    category: 'security',
    era: 'modern',
    recommendedDifficulty: 'advanced',
    description: '混合战争、信息战与灰色地带行为的界定与应对',
    keyIssues: ['行为边界定义', '归因与证据标准', '威慑机制设计', '危机管控渠道', '国际法适用性'],
    background: `【背景概述】
大国竞争越来越多地在"灰色地带"展开。混合战争策略结合军事、经济、信息、网络等多种手段，可以在不触发直接冲突的情况下实现战略目标。

【各方关切】
进攻方可以利用灰色地带行动获取优势，防守方则面临归因困难、反应两难的困境。如何建立灰色地带行为规范，管控大国竞争风险，是国际安全的紧迫课题。`,
  },
];

// 未来场景预设角色
export const futureParties = [
  // 传统国家
  { id: 'tech-super', name: '科技超级大国', region: 'Future', flag: '🧠', description: '拥有最先进技术的国家，代表人类科技前沿' },
  { id: 'resource-rich', name: '资源富国', region: 'Future', flag: '💎', description: '控制关键资源的新兴力量' },
  { id: 'climate-vulnerable', name: '气候脆弱国', region: 'Future', flag: '🌊', description: '受气候变化影响最严重的国家联盟' },
  { id: 'space-pioneer', name: '太空先驱', region: 'Future', flag: '🌙', description: '在太空开发中领先的国家或联盟' },
  { id: 'digital-empire', name: '数字帝国', region: 'Future', flag: '💻', description: '控制全球数字基础设施的实体' },
  { id: 'bio-leader', name: '生物科技领袖', region: 'Future', flag: '🧬', description: '在生命科学领域取得突破的国家' },
  
  // 新型实体
  { id: 'mega-corp', name: '超级企业', region: 'Future', flag: '🏢', description: '拥有相当于中等国家实力的跨国科技巨头' },
  { id: 'ai-collective', name: 'AI联盟', region: 'Future', flag: '🤖', description: '由先进AI系统协调的国际治理网络' },
  { id: 'space-corp', name: '太空企业', region: 'Future', flag: '🚀', description: '主导太空开发的商业实体' },
  { id: 'cyber-union', name: '网络联盟', region: 'Future', flag: '🌐', description: '在网络空间形成的新型治理实体' },
  { id: 'climate-refugee-council', name: '气候难民理事会', region: 'Future', flag: '🏠', description: '代表气候移民利益的国际组织' },
  { id: 'genetic-council', name: '生命伦理委员会', region: 'Future', flag: '⚕️', description: '监督生物科技伦理的国际机构' },
  
  // 超国家实体
  { id: 'earth-fed', name: '地球联邦', region: 'Future', flag: '🌍', description: '代表全人类利益的全球治理机构' },
  { id: 'luna-rep', name: '月球代表', region: 'Future', flag: '🌙', description: '代表月球基地居民利益的声音' },
  { id: 'ocean-alliance', name: '海洋联盟', region: 'Future', flag: '🌊', description: '保护公海利益的国际联盟' },
  { id: 'un-reformed', name: '改革后的联合国', region: 'Future', flag: '🇺🇳', description: '经过重大改革后的国际组织' },
];

// 未来议题模拟预设
export interface FutureScenarioPreset {
  id: string;
  title: string;
  description: string;
  timeHorizon: string; // 10年/30年/50年/100年
  category: string;
  parties: {
    self: string;
    opponent: string;
  };
  keyStakes: string[]; // 核心筹码
  possibleOutcomes: {
    optimistic: string;
    moderate: string;
    pessimistic: string;
  };
  historicalPrecedents: string[]; // 历史先例
  keyUncertainties: string[]; // 主要不确定性
}

export const futureScenarioPresets: FutureScenarioPreset[] = [
  {
    id: 'ai-takeover-2050',
    title: '2050：AI接管全球基础设施',
    description: '人工智能系统已深度融入全球能源、交通、金融网络。一国AI系统的决策开始影响另一国的关键基础设施。如何建立国际AI治理框架？',
    timeHorizon: '30年',
    category: 'ai',
    parties: {
      self: 'tech-super',
      opponent: 'earth-fed',
    },
    keyStakes: ['AI决策权归属', '基础设施控制权', '数据主权', '人类监督机制'],
    possibleOutcomes: {
      optimistic: '建立有效的国际AI治理机制，AI成为人类的共同工具',
      moderate: '形成区域性的AI治理框架，技术竞争持续',
      pessimistic: 'AI引发重大事故，国际合作陷入僵局',
    },
    historicalPrecedents: ['核能国际原子能机构', '互联网治理ICANN模式', '金融危机的全球协调'],
    keyUncertainties: ['AI是否会产生自主意识', '技术奇点的到来时间', '公众对AI的接受度'],
  },
  {
    id: 'moon-colony-2070',
    title: '2070：月球独立运动',
    description: '经过50年发展，月球基地人口已达10万，建立了完整的社会体系。月球居民要求政治代表权，引发与地球各国的激烈博弈。',
    timeHorizon: '50年',
    category: 'space',
    parties: {
      self: 'space-pioneer',
      opponent: 'luna-rep',
    },
    keyStakes: ['月球资源归属权', '政治代表权', '地球联系的控制', '水冰开采权'],
    possibleOutcomes: {
      optimistic: '达成"月球地位宪章"，赋予月球高度自治',
      moderate: '形成地球-月球经济共同体，双边谈判持续',
      pessimistic: '爆发太空军备竞赛，月球宣布独立',
    },
    historicalPrecedents: ['美国独立战争', '殖民地独立运动', '香港一国两制模式'],
    keyUncertainties: ['月球人口增长速度', '地球与月球运输成本', '太空技术的民主化程度'],
  },
  {
    id: 'climate-war-2040',
    title: '2040：气候战争预警',
    description: '气候变化导致主要粮食产区减产，水资源危机加剧。北极航道争夺白热化，沿海城市面临淹没风险。资源战争一触即发。',
    timeHorizon: '20年',
    category: 'climate',
    parties: {
      self: 'climate-vulnerable',
      opponent: 'resource-rich',
    },
    keyStakes: ['气候赔偿金额', '资源分配权', '移民配额', '减排义务分担'],
    possibleOutcomes: {
      optimistic: '达成雄心勃勃的气候协议，转型为绿色经济',
      moderate: '形成气候俱乐部，差异化责任得到认可',
      pessimistic: '气候战争爆发，数十亿人受到影响',
    },
    historicalPrecedents: ['第一次石油危机', '二战后欧洲重建', '冷战时期的危机管控'],
    keyUncertainties: ['气候临界点的准确时间', '新能源技术的突破速度', '公众气候意识的觉醒程度'],
  },
  {
    id: 'bio-revolution-2060',
    title: '2060：基因定制时代',
    description: '基因编辑技术已可以安全地修改人类胚胎特征。富人可以购买更好的基因，而穷人的孩子天生处于劣势。人类社会面临前所未有的不平等。',
    timeHorizon: '40年',
    category: 'bio',
    parties: {
      self: 'bio-leader',
      opponent: 'earth-fed',
    },
    keyStakes: ['基因编辑的红线', '公平准入机制', '监管权归属', '人类定义权'],
    possibleOutcomes: {
      optimistic: '建立全球基因伦理公约，实现公平准入',
      moderate: '形成区域性的基因治理规范',
      pessimistic: '人类分化成基因贵族与普通人',
    },
    historicalPrecedents: ['克隆伦理公约', '核不扩散条约', '器官移植规范'],
    keyUncertainties: ['基因编辑的安全性', '社会对不平等的容忍度', '技术扩散的速度'],
  },
  {
    id: 'cyber-collapse-2035',
    title: '2035：网络冷战',
    description: '一次大规模网络攻击导致全球金融系统瘫痪三天。各 国相互指责，网络空间成为新的战场。如何避免网络战争的螺旋升级？',
    timeHorizon: '15年',
    category: 'ai',
    parties: {
      self: 'digital-empire',
      opponent: 'cyber-union',
    },
    keyStakes: ['攻击归因权', '报复权边界', '关键基础设施保护', '网络军备控制'],
    possibleOutcomes: {
      optimistic: '签署网络空间国际公约，建立有效核查机制',
      moderate: '形成大国间的默契，避免重大攻击',
      pessimistic: '网络战争常态化，关键基础设施持续受损',
    },
    historicalPrecedents: ['核不扩散条约', '化学武器公约', '太空条约'],
    keyUncertainties: ['攻击归因技术的发展', 'AI在网络攻击中的作用', '小国在网络战中的角色'],
  },
  {
    id: 'water-crisis-2050',
    title: '2050：水的战争',
    description: '全球三分之一人口面临严重水资源短缺。跨境河流上游国家控制着下游国家的命脉。水权成为新的地缘政治焦点。',
    timeHorizon: '30年',
    category: 'resource',
    parties: {
      self: 'climate-vulnerable',
      opponent: 'resource-rich',
    },
    keyStakes: ['水权分配比例', '上游筑坝权', '水贸易价格', '环境流量保障'],
    possibleOutcomes: {
      optimistic: '建立公平的水资源共享机制',
      moderate: '形成双边水协议，但争议持续',
      pessimistic: '因水引发军事冲突',
    },
    historicalPrecedents: ['印度河条约', '湄公河委员会', '五大湖协定'],
    keyUncertainties: ['气候变化对水资源的影响', '海水淡化技术成本', '人口迁移方向'],
  },
];
