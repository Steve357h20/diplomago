// 多边谈判方案生成API
// 为进阶模式生成多条方案，并标注优缺点

import { NextRequest, NextResponse } from 'next/server';
import { getCountryById } from '@/lib/countries';
import { historicalCountries } from '@/lib/historical-countries';
import { 
  GenerateProposalsRequest, 
  GenerateProposalsResponse, 
  NegotiationProposal 
} from '@/lib/multilateral-types';

// 统一的CountryProfile类型（兼容现代和历史国家）
interface UnifiedCountryProfile {
  id: string;
  name: string;
  flag: string;
  region: string;
  personality: {
    aggression: number;
    flexibility: number;
    patience: number;
    riskTolerance: number;
    nationalism: number;
    multilateralOrientation?: number;
    bilateralOrientation?: number;
  };
  coreInterests: string[];
  importantInterests: string[];
  negotiableInterests: string[];
  leveragePoints: string[];
  historicalBackground?: string;
  capabilities?: string[];
}

// 国家ID映射（前端使用的短ID -> 数据库标准ID）
const countryIdMapping: Record<string, string> = {
  // 亚洲
  'cn': 'china',           // 中华人民共和国 -> 中国
  'jp': 'japan',           // 日本国 -> 日本
  'kr': 'south-korea',     // 大韩民国 -> 韩国
  'in': 'india',           // 印度共和国 -> 印度
  'mn': 'mongolia',        // 蒙古国 -> 蒙古
  'vn': 'vietnam',         // 越南 -> 越南
  'ph': 'philippines',     // 菲律宾 -> 菲律宾
  'my': 'malaysia',        // 马来西亚 -> 马来西亚
  'id': 'indonesia',       // 印度尼西亚 -> 印度尼西亚
  'th': 'thailand',        // 泰国 -> 泰国
  'sg': 'singapore',       // 新加坡 -> 新加坡
  // 欧洲
  'de': 'germany',         // 德国
  'fr': 'france',          // 法国
  'gb': 'uk',              // 英国
  'it': 'italy',           // 意大利
  'es': 'spain',           // 西班牙
  'nl': 'netherlands',     // 荷兰
  'be': 'belgium',         // 比利时
  'pl': 'poland',          // 波兰
  // 北美
  'us': 'usa',             // 美国
  'ca': 'canada',          // 加拿大
  'mx': 'mexico',          // 墨西哥
  // 南美
  'br': 'brazil',          // 巴西
  'ar': 'argentina',       // 阿根廷
  // 非洲
  'za': 'south-africa',    // 南非
  'ng': 'nigeria',         // 尼日利亚
  'eg': 'egypt',           // 埃及
  // 中东
  'ir': 'iran',            // 伊朗
  'sa': 'saudi-arabia',    // 沙特阿拉伯
  'il': 'israel',          // 以色列
  'tr': 'turkey',          // 土耳其
  // 大洋洲
  'au': 'australia',       // 澳大利亚
  'nz': 'new-zealand',     // 新西兰
  // 其他
  'ua': 'ukraine',         // 乌克兰
  'ru': 'russia',          // 俄罗斯
};

// 将前端ID转换为数据库标准ID
function normalizeCountryId(id: string): string {
  return countryIdMapping[id] || id;
}

// 尝试获取国家数据（优先现代国家，其次历史国家）
function getCountryData(countryId: string): UnifiedCountryProfile | null {
  // 先标准化ID
  const normalizedId = normalizeCountryId(countryId);
  
  // 先尝试现代国家
  const modernCountry = getCountryById(normalizedId);
  if (modernCountry) {
    return {
      id: modernCountry.id,
      name: modernCountry.name,
      flag: modernCountry.flag,
      region: modernCountry.region,
      personality: modernCountry.personality,
      coreInterests: modernCountry.coreInterests,
      importantInterests: modernCountry.importantInterests,
      negotiableInterests: modernCountry.negotiableInterests,
      leveragePoints: modernCountry.leveragePoints,
      historicalBackground: (modernCountry as any).historicalBackground,
      capabilities: (modernCountry as any).capabilities
    };
  }
  
  // 再尝试历史国家
  const historicalCountry = historicalCountries.find(c => c.id === normalizedId);
  if (historicalCountry) {
    return {
      id: historicalCountry.id,
      name: historicalCountry.name,
      flag: historicalCountry.flag,
      region: historicalCountry.region,
      personality: {
        aggression: historicalCountry.personality.aggression,
        flexibility: historicalCountry.personality.flexibility,
        patience: historicalCountry.personality.patience,
        riskTolerance: historicalCountry.personality.riskTolerance,
        nationalism: historicalCountry.personality.nationalism,
        multilateralOrientation: historicalCountry.personality.multilateralOrientation,
        bilateralOrientation: historicalCountry.personality.bilateralOrientation
      },
      coreInterests: historicalCountry.coreInterests,
      importantInterests: historicalCountry.importantInterests,
      negotiableInterests: historicalCountry.negotiableInterests,
      leveragePoints: historicalCountry.leveragePoints,
      historicalBackground: historicalCountry.historicalBackground?.brief || '',
      capabilities: historicalCountry.capabilities
    };
  }
  
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateProposalsRequest = await request.json();
    
    // 验证必填字段
    if (!body.topic || !body.userCountryId) {
      return NextResponse.json({ 
        success: false, 
        error: '缺少必填字段',
        proposals: []
      }, { status: 400 });
    }
    
    const userCountry = getCountryData(body.userCountryId);
    if (!userCountry) {
      return NextResponse.json({ 
        success: false, 
        error: '用户国家不存在',
        proposals: []
      }, { status: 400 });
    }
    
    const opponentCountries = (body.opponentCountryIds || [])
      .map(id => getCountryData(id))
      .filter(d => d !== null) as UnifiedCountryProfile[];
    
    // 生成方案
    const proposals = generateProposals(
      body.topic,
      body.topicDescription || '',
      body.background || '',
      userCountry,
      opponentCountries,
      body.difficulty
    );
    
    const response: GenerateProposalsResponse = {
      success: true,
      proposals,
      explanation: `基于${userCountry.name}的国家利益和谈判风格，AI生成了${proposals.length}个推荐方案：
- <span class="text-green-400">高案</span>：代表您在谈判中的理想目标，是最有利的结果
- <span class="text-blue-400">中间方案</span>：务实可行的方案，平衡各方利益
- <span class="text-yellow-400">底案</span>：您可以接受的最低条件，是谈判的底线

请从AI推荐的方案中选择高案、中间方案和底案，或选择"自定义"来设定自己的方案。`
    };
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('生成方案失败:', error);
    return NextResponse.json({ 
      success: false, 
      error: '服务器错误',
      proposals: []
    }, { status: 500 });
  }
}

// 生成谈判方案（生成5个方案供选择）
function generateProposals(
  topic: string,
  topicDescription: string,
  background: string,
  userCountry: UnifiedCountryProfile,
  opponentCountries: UnifiedCountryProfile[],
  difficulty: string
): NegotiationProposal[] {
  const topicKeywords = extractTopicKeywords(topic);
  const proposals: NegotiationProposal[] = [];
  
  // 方案1: 高案 - 最大化自身利益
  proposals.push(generateHighProposal(userCountry, opponentCountries, topicKeywords));
  
  // 方案2: 次高案 - 较激进但有让步空间
  proposals.push(generateSecondHighProposal(userCountry, opponentCountries, topicKeywords));
  
  // 方案3: 中间方案（务实选择）
  proposals.push(generateMiddleProposal(userCountry, opponentCountries, topicKeywords));
  
  // 方案4: 次底案 - 保守但有保障
  proposals.push(generateSecondBottomProposal(userCountry, opponentCountries, topicKeywords));
  
  // 方案5: 底案 - 守住核心底线
  proposals.push(generateBottomLineProposal(userCountry, opponentCountries, topicKeywords));
  
  return proposals;
}

// 高案 - 最大化自身利益
function generateHighProposal(
  country: UnifiedCountryProfile,
  opponents: UnifiedCountryProfile[],
  topicKeywords: string
): NegotiationProposal {
  const proposalId = `proposal_high_${Date.now()}`;
  const isAggressive = country.personality.aggression > 7;
  
  return {
    id: proposalId,
    title: `${country.name}高案：${topicKeywords}议题的理想目标`,
    description: `采取强势立场，争取${country.name}在${topicKeywords}议题上的最大利益。要求对手做出实质性让步，同时展示谈判实力。`,
    pros: [
      `最大化实现${country.name}核心利益（${country.coreInterests[0]}）`,
      `展示谈判决心，可能获得更多筹码`,
      `符合国内政治期待，获得民意支持`,
      `若成功，将奠定有利的长期格局`
    ],
    cons: [
      `可能激化矛盾，导致谈判僵局`,
      `对手可能采取对等报复措施`,
      `损害双边关系和长期合作`,
      `谈判失败风险较高`
    ],
    keyTerms: [
      `${country.coreInterests[0]}得到完全保障`,
      `对手做出相应让步作为合作前提`,
      `设置对${country.name}有利的争端解决机制`,
      `保留政策空间和灵活解释权`
    ],
    difficulty: 'high',
    alignment: {
      withCoreInterest: 'high',
      withOthers: 'low'
    },
    estimatedAcceptance: 25
  };
}

// 次高案 - 较激进但有让步空间
function generateSecondHighProposal(
  country: UnifiedCountryProfile,
  opponents: UnifiedCountryProfile[],
  topicKeywords: string
): NegotiationProposal {
  const proposalId = `proposal_second_high_${Date.now()}`;
  
  return {
    id: proposalId,
    title: `${country.name}次高案：进取型的${topicKeywords}谈判策略`,
    description: `采取进取立场，争取较大利益但留有谈判空间。在${topicKeywords}议题上争取优于现状的结果，同时愿意在次要问题上进行交换。`,
    pros: [
      `争取优于现状的谈判结果`,
      `展示进取精神，可能获得更多筹码`,
      `保留一定让步空间以达成协议`,
      `符合国家发展需要`
    ],
    cons: [
      `谈判难度较高，可能需要更多时间`,
      `对手可能拒绝，导致僵局`,
      `需要在国内政治和外交压力间平衡`,
      `部分利益可能需要交换`
    ],
    keyTerms: [
      `核心利益（${country.coreInterests[0]}）得到保障`,
      `在重要利益（${country.importantInterests[0]}）上争取突破`,
      `设置可接受的交换筹码`,
      `建立建设性对话氛围`
    ],
    difficulty: 'high',
    alignment: {
      withCoreInterest: 'high',
      withOthers: 'low'
    },
    estimatedAcceptance: 40
  };
}

// 次底案 - 保守但有保障
function generateSecondBottomProposal(
  country: UnifiedCountryProfile,
  opponents: UnifiedCountryProfile[],
  topicKeywords: string
): NegotiationProposal {
  const proposalId = `proposal_second_bottom_${Date.now()}`;
  
  return {
    id: proposalId,
    title: `${country.name}次底案：稳健保守的${topicKeywords}策略`,
    description: `采取稳健立场，在守住核心底线的同时争取适度利益。优先确保${country.coreInterests[0]}安全，在此基础上寻求有限突破。`,
    pros: [
      `${country.coreInterests[0]}得到充分保障`,
      `风险可控，不会出现最坏情况`,
      `更容易与对手达成共识`,
      `有利于维护稳定的外交关系`
    ],
    cons: [
      `获得的额外收益有限`,
      `可能被认为缺乏进取心`,
      `对手可能认为可以进一步施压`,
      `国内强硬派可能不满意`
    ],
    keyTerms: [
      `${country.coreInterests[0]}是必须保障的底线`,
      `重要利益（${country.importantInterests[0]}）争取实现部分`,
      `建立基本合作框架`,
      `设置有限的争端解决机制`
    ],
    difficulty: 'medium',
    alignment: {
      withCoreInterest: 'high',
      withOthers: 'medium'
    },
    estimatedAcceptance: 75
  };
}

// 中间方案（供应方案）- 务实可行
function generateMiddleProposal(
  country: UnifiedCountryProfile,
  opponents: UnifiedCountryProfile[],
  topicKeywords: string
): NegotiationProposal {
  const proposalId = `proposal_middle_${Date.now()}`;
  
  return {
    id: proposalId,
    title: `${country.name}中间方案：务实可行的${topicKeywords}协议`,
    description: `寻求各方都能接受的平衡点。在保障${country.name}核心利益的同时，展示灵活性和合作诚意，争取达成务实可行的协议。`,
    pros: [
      `核心利益（${country.coreInterests[0]}）基本得到保障`,
      `展示灵活性和合作意愿，更易达成协议`,
      `有利于维护长期双边关系`,
      `各方都能接受，协议执行阻力小`
    ],
    cons: [
      `可能需要放弃部分重要利益（${country.importantInterests[0]}）`,
      `无法实现最大收益`,
      `对手可能试探进一步让步空间`,
      `可能被国内强硬派批评`
    ],
    keyTerms: [
      `核心利益得到基本保障`,
      `建立互惠互利的合作框架`,
      `设置合理的执行时间表`,
      `包含定期 review 和调整机制`
    ],
    difficulty: 'medium',
    alignment: {
      withCoreInterest: 'high',
      withOthers: 'medium'
    },
    estimatedAcceptance: 65
  };
}

// 底案 - 守住核心底线
function generateBottomLineProposal(
  country: UnifiedCountryProfile,
  opponents: UnifiedCountryProfile[],
  topicKeywords: string
): NegotiationProposal {
  const proposalId = `proposal_bottom_${Date.now()}`;
  const isPatient = country.personality.patience > 6;
  
  return {
    id: proposalId,
    title: `${country.name}底案：${topicKeywords}议题的最低可接受条件`,
    description: `采取防御性立场，守住${country.name}的绝对底线（${country.coreInterests[0]}）。这是谈判的最低可接受条件，任何低于此的结果都应拒绝。`,
    pros: [
      `${country.coreInterests[0]}绝对安全`,
      `风险最低，不会出现最坏情况`,
      `符合国内保守派期望`,
      `保留未来重新谈判的空间`
    ],
    cons: [
      `无法获得额外收益`,
      `可能被视为缺乏进取心`,
      `对手可能获得更大利益`,
      `可能需要更长谈判周期`
    ],
    keyTerms: [
      `${country.coreInterests[0]}是绝对红线，不可谈判`,
      `其他议题可以适度讨论`,
      `协议必须有退出条款或期限`,
      `保留单方面解释权`
    ],
    difficulty: 'low',
    alignment: {
      withCoreInterest: 'high',
      withOthers: 'medium'
    },
    estimatedAcceptance: 80
  };
}

// 保留原有的其他方案作为备选（可选自定义方案）
function generateAggressiveProposal(
  country: UnifiedCountryProfile,
  opponents: UnifiedCountryProfile[],
  topicKeywords: string
): NegotiationProposal {
  const proposalId = `proposal_aggressive_${Date.now()}`;
  
  return {
    id: proposalId,
    title: `${country.name}激进方案`,
    description: `采取更激进的策略，在谈判中施加最大压力。`,
    pros: [`可能获得超出预期的收益`],
    cons: [`风险极高，可能导致谈判破裂`],
    keyTerms: [`最大化自身利益`],
    difficulty: 'high',
    alignment: { withCoreInterest: 'high', withOthers: 'low' },
    estimatedAcceptance: 15
  };
}

// 平衡型方案
function generateBalancedProposal(
  country: UnifiedCountryProfile,
  opponents: UnifiedCountryProfile[],
  topicKeywords: string
): NegotiationProposal {
  const proposalId = `proposal_balanced_${Date.now()}`;
  
  return {
    id: proposalId,
    title: `${country.name}平衡方案`,
    description: `寻求各方都能接受的平衡点。`,
    pros: [`核心利益基本保障`, `更容易达成协议`],
    cons: [`可能需要放弃部分利益`],
    keyTerms: [`互惠互利框架`],
    difficulty: 'medium',
    alignment: { withCoreInterest: 'high', withOthers: 'medium' },
    estimatedAcceptance: 60
  };
}

// 保守型方案
function generateConservativeProposal(
  country: UnifiedCountryProfile,
  opponents: UnifiedCountryProfile[],
  topicKeywords: string
): NegotiationProposal {
  const proposalId = `proposal_conservative_${Date.now()}`;
  
  return {
    id: proposalId,
    title: `${country.name}保守方案`,
    description: `采取防御性立场，守住核心底线。`,
    pros: [`核心利益绝对安全`, `风险最低`],
    cons: [`无法获得额外收益`],
    keyTerms: [`底线不可突破`],
    difficulty: 'low',
    alignment: { withCoreInterest: 'high', withOthers: 'medium' },
    estimatedAcceptance: 75
  };
}

// 合作型方案
function generateCooperativeProposal(
  country: UnifiedCountryProfile,
  opponents: UnifiedCountryProfile[],
  topicKeywords: string
): NegotiationProposal {
  const proposalId = `proposal_cooperative_${Date.now()}`;
  
  return {
    id: proposalId,
    title: `${country.name}合作方案`,
    description: `推动建立多边合作框架，实现多方共赢。`,
    pros: [`有利于长期稳定关系`, `展示负责任形象`],
    cons: [`短期内核心利益可能无法最大化`],
    keyTerms: [`多方参与合作机制`],
    difficulty: 'medium',
    alignment: { withCoreInterest: 'medium', withOthers: 'high' },
    estimatedAcceptance: 55
  };
}

// 渐进型方案
function generateIncrementalProposal(
  country: UnifiedCountryProfile,
  opponents: UnifiedCountryProfile[],
  topicKeywords: string
): NegotiationProposal {
  const proposalId = `proposal_incremental_${Date.now()}`;
  
  return {
    id: proposalId,
    title: `${country.name}渐进方案`,
    description: `将复杂议题分解为多个阶段，逐步推进。`,
    pros: [`降低谈判失败风险`, `容易获得早期成果`],
    cons: [`最终结果可能偏离初始目标`, `谈判周期较长`],
    keyTerms: [`设定清晰的阶段目标`],
    difficulty: 'medium',
    alignment: { withCoreInterest: 'medium', withOthers: 'medium' },
    estimatedAcceptance: 70
  };
}

// 提取议题关键词
function extractTopicKeywords(topic: string): string {
  const keywordMap: Record<string, string> = {
    '贸易': '贸易',
    '关税': '关税',
    '气候': '气候',
    '环境': '环境',
    '能源': '能源',
    '安全': '安全',
    '南海': '南海',
    '制裁': '制裁',
    '核': '核',
    '和平': '和平',
    '领土': '领土',
    '海上': '海上',
    '数字': '数字贸易',
    '投资': '投资',
    '技术': '技术',
    '军事': '军事'
  };
  
  for (const [key, value] of Object.entries(keywordMap)) {
    if (topic.includes(key)) {
      return value;
    }
  }
  
  return '相关';
}
