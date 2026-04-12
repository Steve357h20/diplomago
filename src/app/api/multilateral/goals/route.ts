// 多边谈判目标生成API
// 为新手模式自动生成高案和底案

import { NextRequest, NextResponse } from 'next/server';
import { getCountryById, countries as modernCountries } from '@/lib/countries';
import { historicalCountries, HistoricalCountry } from '@/lib/historical-countries';
import { GenerateGoalsRequest, GenerateGoalsResponse, UserNegotiationGoals } from '@/lib/multilateral-types';

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
function getCountryData(countryId: string): { country: UnifiedCountryProfile; isHistorical: boolean } | null {
  // 先标准化ID
  const normalizedId = normalizeCountryId(countryId);
  
  // 先尝试现代国家
  const modernCountry = getCountryById(normalizedId);
  if (modernCountry) {
    return {
      country: {
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
      },
      isHistorical: false
    };
  }
  
  // 再尝试历史国家
  const historicalCountry = historicalCountries.find(c => c.id === normalizedId);
  if (historicalCountry) {
    return {
      country: {
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
      },
      isHistorical: true
    };
  }
  
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateGoalsRequest = await request.json();
    
    // 调试日志
    console.log('=== Goals API 调试 ===');
    console.log('接收到的 body:', JSON.stringify(body, null, 2));
    console.log('userCountryId:', body.userCountryId);
    console.log('opponentCountryIds:', body.opponentCountryIds);
    
    // 验证必填字段
    if (!body.topic || !body.userCountryId) {
      return NextResponse.json({ 
        success: false, 
        error: '缺少必填字段' 
      }, { status: 400 });
    }
    
    const userCountryData = getCountryData(body.userCountryId);
    console.log('userCountryData:', userCountryData);
    if (!userCountryData) {
      console.log('未找到用户国家，尝试查找...');
      // 打印所有可用国家ID
      console.log('现代国家IDs:', modernCountries.map(c => c.id));
      console.log('历史国家IDs:', historicalCountries.map(c => c.id));
      return NextResponse.json({ 
        success: false, 
        error: `用户国家不存在: ${body.userCountryId}` 
      }, { status: 400 });
    }
    
    const userCountry = userCountryData.country;
    
    // 处理对手国家
    const opponentCountries = (body.opponentCountryIds || [])
      .map(id => getCountryData(id))
      .filter(d => d !== null)
      .map(d => d!.country);
    
    // 生成目标
    const goals = generateGoalsForCountry(
      body.topic,
      body.topicDescription || '',
      body.background || '',
      userCountry,
      opponentCountries
    );
    
    const response: GenerateGoalsResponse = {
      success: true,
      goals,
      explanation: `基于${userCountry.name}的国家利益和谈判风格，AI自动生成了适合新手模式的谈判目标。高案代表您在此议题上的理想结果，中间方案是务实可行的务实选择，底案则是您可以接受的最低条件。在谈判过程中，系统会根据您与这三个目标的差距来评估您的表现。`
    };
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('生成目标失败:', error);
    return NextResponse.json({ 
      success: false, 
      error: '服务器错误' 
    }, { status: 500 });
  }
}

// 根据国家和议题生成谈判目标
function generateGoalsForCountry(
  topic: string,
  topicDescription: string,
  background: string,
  userCountry: UnifiedCountryProfile,
  opponentCountries: UnifiedCountryProfile[]
): UserNegotiationGoals {
  // 基于国家特征生成目标
  const { personality, coreInterests, importantInterests, negotiableInterests, leveragePoints } = userCountry;
  
  // 生成高案
  const highGoal = generateHighGoal(topic, userCountry, opponentCountries);
  
  // 生成中间方案
  const middleGoal = generateMiddleGoal(topic, userCountry, opponentCountries);
  
  // 生成底案
  const bottomLine = generateBottomLine(topic, userCountry, opponentCountries);
  
  return {
    highGoal,
    middleGoal,
    bottomLine,
    evaluationCriteria: {
      outcomeScore: 0,
      processScore: 0
    }
  };
}

// 生成高案
function generateHighGoal(
  topic: string,
  country: UnifiedCountryProfile,
  opponents: UnifiedCountryProfile[]
): UserNegotiationGoals['highGoal'] {
  const topicKeywords = extractTopicKeywords(topic);
  
  // 根据国家性格调整目标定位
  const isAggressive = country.personality.aggression > 7;
  const isFlexible = country.personality.flexibility > 6;
  
  // 高案标题
  const highTitle = `${country.name}主导的${topicKeywords}解决方案`;
  
  // 高案描述
  const highDescription = `在${topicKeywords}议题上，实现${country.name}利益最大化的理想结果。` +
    `基于国家核心利益（${country.coreInterests.slice(0, 2).join('、')}），` +
    `同时利用国家优势（${country.leveragePoints.slice(0, 2).join('、')}），` +
    `达成对${country.name}最为有利的协议框架。`;
  
  // 核心条款
  const keyTerms = [
    `${country.coreInterests[0]}得到完全保障`,
    `协议条款符合${country.name}的战略利益`,
    `建立有约束力的执行机制`,
    `保留未来政策空间`
  ];
  
  // 如果是积极进攻型，增加更多要求
  if (isAggressive) {
    keyTerms.push(
      `他方做出相应让步作为合作前提`,
      `设置有利争端解决机制`
    );
  }
  
  // 成功指标
  const successIndicators = [
    `核心利益得到书面保障`,
    `协议条款明确且可执行`,
    `获得有利的争端解决机制`,
    `建立了后续磋商机制`
  ];
  
  if (isFlexible) {
    successIndicators.push(`各方均获得适度收益`);
  }
  
  return {
    title: highTitle,
    description: highDescription,
    keyTerms,
    successIndicators
  };
}

// 生成中间方案
function generateMiddleGoal(
  topic: string,
  country: UnifiedCountryProfile,
  opponents: UnifiedCountryProfile[]
): UserNegotiationGoals['middleGoal'] {
  const topicKeywords = extractTopicKeywords(topic);
  
  // 根据国家性格调整定位
  const isBalanced = country.personality.aggression >= 4 && country.personality.aggression <= 6;
  const isFlexible = country.personality.flexibility > 6;
  
  // 中间方案标题
  const middleTitle = `${country.name}务实的${topicKeywords}中间方案`;
  
  // 中间方案描述
  const middleDescription = `在${topicKeywords}议题上，寻求${country.name}与各方的平衡点。` +
    `核心利益（${country.coreInterests[0]}）得到基本保障，` +
    `重要利益（${country.importantInterests[0]}）争取实现，` +
    `展示灵活性和合作诚意，达成务实可行的协议。`;
  
  // 核心条款
  const keyTerms = [
    `${country.coreInterests[0]}得到基本保障`,
    `建立互惠互利的合作框架`,
    `设置合理的执行时间表`,
    `包含定期review机制`
  ];
  
  if (isFlexible) {
    keyTerms.push(`各方都能接受的争端解决方式`);
  }
  
  if (isBalanced) {
    keyTerms.push(`兼顾各方合理关切`);
  }
  
  // 成功指标
  const successIndicators = [
    `核心利益写入协议文本`,
    `获得实质性市场准入或合作机会`,
    `建立了长期合作框架`,
    `各方均获得适度收益`
  ];
  
  if (isFlexible) {
    successIndicators.push(`维护了良好的双边关系`);
  }
  
  return {
    title: middleTitle,
    description: middleDescription,
    keyTerms,
    successIndicators
  };
}

// 生成底案
function generateBottomLine(
  topic: string,
  country: UnifiedCountryProfile,
  opponents: UnifiedCountryProfile[]
): UserNegotiationGoals['bottomLine'] {
  const topicKeywords = extractTopicKeywords(topic);
  
  // 根据国家性格调整底线
  const isPatience = country.personality.patience > 6;
  const isRiskTolerant = country.personality.riskTolerance < 4;
  
  // 底案标题
  const bottomTitle = `${country.name}可接受的${topicKeywords}底线`;
  
  // 底案描述
  const bottomDescription = `${country.name}在${topicKeywords}议题上的最低可接受条件。` +
    `核心利益（${country.coreInterests[0]}）是绝对不可妥协的底线，` +
    `其他非核心利益可以在可接受范围内做出让步。`;
  
  // 核心条款（必须保留的）
  const keyTerms = [
    `${country.coreInterests[0]}不受损害`,
    `保留基本主权或核心决策权`,
    `有基本的争端预防机制`
  ];
  
  // 可接受的最低条件
  const acceptableTerms = [
    `在次要议题上做出适度让步`,
    `接受时间限制或阶段性协议`,
    `同意建立基本合作框架`
  ];
  
  if (isPatience) {
    acceptableTerms.push(`分阶段达成目标，保留后续谈判空间`);
  }
  
  if (isRiskTolerant) {
    // 低风险承受 - 更保守
    acceptableTerms.push(`确保有退出条款`);
  }
  
  return {
    title: bottomTitle,
    description: bottomDescription,
    keyTerms,
    acceptableTerms
  };
}

// 提取议题关键词
function extractTopicKeywords(topic: string): string {
  // 常见议题关键词映射
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
  
  // 默认返回"相关"
  return '相关';
}
