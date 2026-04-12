// 自定义场景智能解析系统
// 解析用户上传的文件内容，识别关键信息并构建场景

import { NegotiationTopic } from '@/types/negotiation';

// 支持的国家关键词
const countryKeywords: Record<string, string[]> = {
  'china': ['中国', '中华人民共和国', 'PRC', '北京', 'Chinese'],
  'usa': ['美国', '美利坚', '合众国', '华盛顿', '美国', 'American', 'United States'],
  'russia': ['俄罗斯', '俄国', '莫斯科', 'Russian', 'Russia'],
  'japan': ['日本', '东京', 'Japanese'],
  'southkorea': ['韩国', '南韩', '首尔', 'Korean'],
  'uk': ['英国', '大不列颠', '伦敦', 'British', 'UK'],
  'france': ['法国', '法兰西', '巴黎', 'French'],
  'germany': ['德国', '联邦德国', '西德', '柏林', 'German'],
  'india': ['印度', '新德里', 'Indian'],
  'brazil': ['巴西', '巴西利亚', 'Brazilian'],
  'australia': ['澳大利亚', '澳洲', '堪培拉', 'Australian'],
  'canada': ['加拿大', '渥太华', 'Canadian'],
  'eu': ['欧盟', '欧洲联盟', 'European Union'],
  'iran': ['伊朗', '德黑兰', 'Iranian'],
  'northkorea': ['朝鲜', '北韩', '平壤', 'North Korean'],
  'pakistan': ['巴基斯坦', '伊斯兰堡', 'Pakistani'],
  'israel': ['以色列', '特拉维夫', 'Israeli'],
  'ukraine': ['乌克兰', '基辅', 'Ukrainian'],
  'vietnam': ['越南', '河内', 'Vietnamese'],
  'philippines': ['菲律宾', '马尼拉', 'Filipino'],
  'singapore': ['新加坡', 'Singapore'],
  'indonesia': ['印度尼西亚', '印尼', '雅加达', 'Indonesian'],
  'malaysia': ['马来西亚', '吉隆坡', 'Malaysian'],
  'saudiarabia': ['沙特', '沙特阿拉伯', '利雅得', 'Saudi'],
  'turkey': ['土耳其', '安卡拉', 'Turkish'],
  'southafrica': ['南非', '比勒陀利亚', 'South African'],
  'thailand': ['泰国', '曼谷', 'Thai'],
  'netherlands': ['荷兰', '海牙', 'Dutch'],
  'poland': ['波兰', '华沙', 'Polish'],
  'italy': ['意大利', '罗马', 'Italian'],
  'spain': ['西班牙', '马德里', 'Spanish'],
  'argentina': ['阿根廷', '布宜诺斯艾利斯', 'Argentine'],
  'mexico': ['墨西哥', '墨西哥城', 'Mexican'],
  'egypt': ['埃及', '开罗', 'Egyptian'],
  'uae': ['阿联酋', '迪拜', 'UAE'],
};

// 主题类型关键词
const topicCategoryKeywords: Record<string, string[]> = {
  'trade': ['贸易', '关税', '协定', '协定', '市场', '出口', '进口', '投资', '供应链', '经济'],
  'territory': ['领土', '边界', '海域', '岛屿', '主权', '争端', '划界', '专属经济区', '南海', '东海'],
  'peace': ['和平', '停火', '冲突', '战争', '和解', '重建', '难民', '民族', '停战'],
  'security': ['安全', '军事', '武器', '核', '军备', '同盟', '防御', '威慑', '制裁', '恐怖主义'],
  'environmental': ['气候', '环境', '碳', '减排', '能源', '森林', '海洋', '污染', '环保'],
  'cultural': ['文化', '教育', '交流', '人文', '旅游', '签证', '学术', '媒体', '艺术']
};

// 时期关键词
const eraKeywords: Record<string, string[]> = {
  'cold-war': ['冷战', '美苏', '苏联', '铁幕', '北约', '华约', '1960', '1970', '1980', '1950'],
  'post-cold-war': ['后冷战', '苏联解体', '单极', '海湾', '科索沃', '1990', '2000'],
  'modern': ['当代', '21世纪', '近年来', '现在', '目前', '现代'],
  'future': ['未来', '2030', '2040', '2050', 'AI', '人工智能', '太空', '月球']
};

// 关键议题提取
interface ExtractedIssue {
  keyword: string;
  relevance: number; // 0-1
}

interface ParsedCustomScenario {
  title: string;
  description: string;
  detectedCountries: {
    id: string;
    name: string;
    role: 'self' | 'opponent' | 'thirdParty';
  }[];
  detectedCategory: string | null;
  detectedEra: string | null;
  keyIssues: string[];
  context: string;
  background?: string;
  confidence: number; // 解析置信度
  warnings: string[]; // 解析警告
  suggestions: string[]; // 补充建议
}

// 解析文本内容
export function parseCustomScenarioContent(
  content: string,
  existingInfo?: {
    selfCountry?: string;
    opponentCountry?: string;
    topicCategory?: string;
  }
): ParsedCustomScenario {
  const warnings: string[] = [];
  const suggestions: string[] = [];
  
  // 提取国家
  const detectedCountries: ParsedCustomScenario['detectedCountries'] = [];
  for (const [countryId, keywords] of Object.entries(countryKeywords)) {
    const found = keywords.some(kw => content.includes(kw));
    if (found) {
      // 判断角色（如果已有信息，按已有信息分配）
      let role: 'self' | 'opponent' | 'thirdParty' = 'thirdParty';
      if (existingInfo?.selfCountry && keywords.some(kw => content.includes(kw))) {
        role = 'self';
      } else if (existingInfo?.opponentCountry && keywords.some(kw => content.includes(kw))) {
        role = 'opponent';
      }
      
      if (!detectedCountries.find(c => c.id === countryId)) {
        detectedCountries.push({
          id: countryId,
          name: getCountryName(countryId),
          role
        });
      }
    }
  }
  
  // 提取主题类型
  let detectedCategory: string | null = null;
  let maxCategoryScore = 0;
  for (const [category, keywords] of Object.entries(topicCategoryKeywords)) {
    const score = keywords.filter(kw => content.includes(kw)).length;
    if (score > maxCategoryScore) {
      maxCategoryScore = score;
      detectedCategory = category;
    }
  }
  
  // 如果已有主题类别，覆盖检测结果
  if (existingInfo?.topicCategory) {
    detectedCategory = existingInfo.topicCategory;
  }
  
  // 提取时期
  let detectedEra: string | null = null;
  let maxEraScore = 0;
  for (const [era, keywords] of Object.entries(eraKeywords)) {
    const score = keywords.filter(kw => content.includes(kw)).length;
    if (score > maxEraScore) {
      maxEraScore = score;
      detectedEra = era;
    }
  }
  
  // 提取关键议题
  const allIssueKeywords = Object.values(topicCategoryKeywords).flat();
  const keyIssues = allIssueKeywords
    .filter(kw => content.includes(kw))
    .filter((kw, idx, arr) => arr.indexOf(kw) === idx) // 去重
    .slice(0, 5);
  
  // 提取上下文摘要（取前500字）
  const context = content.slice(0, 500).trim() + (content.length > 500 ? '...' : '');
  
  // 生成标题
  const title = generateTitle(content, detectedCategory, detectedCountries);
  
  // 生成描述
  const description = generateDescription(content, detectedCategory, detectedCountries);
  
  // 计算置信度
  const confidence = calculateConfidence(
    detectedCountries.length,
    detectedCategory,
    detectedEra,
    keyIssues.length
  );
  
  // 生成警告和建议
  if (detectedCountries.length < 2) {
    warnings.push('未检测到足够的参与方信息，请补充说明谈判双方');
    suggestions.push('明确说明参与谈判的主要国家或组织');
  }
  
  if (!detectedCategory) {
    warnings.push('未能明确识别谈判主题类型');
    suggestions.push('说明谈判的核心议题（如贸易、安全、环境等）');
  }
  
  if (!detectedEra) {
    suggestions.push('建议说明谈判发生的历史时期（现代、冷战、未来等）');
  }
  
  if (content.length < 200) {
    warnings.push('提供的内容较少，可能影响场景构建的准确性');
    suggestions.push('提供更详细的历史背景和当前局势描述');
  }
  
  return {
    title,
    description,
    detectedCountries,
    detectedCategory,
    detectedEra,
    keyIssues,
    context,
    confidence,
    warnings,
    suggestions
  };
}

// 获取国家名称
function getCountryName(countryId: string): string {
  const names: Record<string, string> = {
    'china': '中国',
    'usa': '美国',
    'russia': '俄罗斯',
    'japan': '日本',
    'southkorea': '韩国',
    'uk': '英国',
    'france': '法国',
    'germany': '德国',
    'india': '印度',
    'brazil': '巴西',
    'australia': '澳大利亚',
    'canada': '加拿大',
    'eu': '欧盟',
    'iran': '伊朗',
    'northkorea': '朝鲜',
    'pakistan': '巴基斯坦',
    'israel': '以色列',
    'ukraine': '乌克兰',
    'vietnam': '越南',
    'philippines': '菲律宾',
    'singapore': '新加坡',
    'indonesia': '印度尼西亚',
    'malaysia': '马来西亚',
    'saudiarabia': '沙特阿拉伯',
    'turkey': '土耳其',
    'southafrica': '南非',
    'thailand': '泰国',
    'netherlands': '荷兰',
    'poland': '波兰',
    'italy': '意大利',
    'spain': '西班牙',
    'argentina': '阿根廷',
    'mexico': '墨西哥',
    'egypt': '埃及',
    'uae': '阿联酋'
  };
  return names[countryId] || countryId;
}

// 生成标题
function generateTitle(
  content: string,
  category: string | null,
  countries: { name: string }[]
): string {
  const categoryNames: Record<string, string> = {
    'trade': '贸易',
    'territory': '领土',
    'peace': '和平',
    'security': '安全',
    'environmental': '环境',
    'cultural': '文化'
  };
  
  // 尝试从内容中提取标题
  const lines = content.split('\n').filter(l => l.trim());
  if (lines[0] && lines[0].length < 50) {
    return lines[0].trim();
  }
  
  // 生成默认标题
  const countryPart = countries.slice(0, 2).map(c => c.name).join('与') || '多国';
  const categoryPart = category ? categoryNames[category] || category : '综合议题';
  
  return `${countryPart}${categoryPart}谈判`;
}

// 生成描述
function generateDescription(
  content: string,
  category: string | null,
  countries: { name: string }[]
): string {
  const categoryDescriptions: Record<string, string> = {
    'trade': '围绕贸易协定、关税安排等经济议题展开的外交谈判',
    'territory': '涉及领土边界、海域划界等主权问题的外交博弈',
    'peace': '旨在结束冲突、实现和平的多方协商进程',
    'security': '关乎军事合作、武器管控、地区安全的战略对话',
    'environmental': '聚焦气候变化、环保合作、可持续发展的国际磋商',
    'cultural': '促进人文交流、教育合作的文化外交活动'
  };
  
  if (category && categoryDescriptions[category]) {
    return categoryDescriptions[category];
  }
  
  // 从内容中提取描述
  const sentences = content.split(/[。！？\n]/).filter(s => s.trim().length > 20);
  if (sentences[0]) {
    return sentences[0].trim().slice(0, 100);
  }
  
  return '一场多边外交谈判，各方就共同关心的问题展开讨论';
}

// 计算置信度
function calculateConfidence(
  countryCount: number,
  category: string | null,
  era: string | null,
  issueCount: number
): number {
  let score = 0;
  
  // 国家数量
  if (countryCount >= 3) score += 0.3;
  else if (countryCount >= 2) score += 0.2;
  else if (countryCount >= 1) score += 0.1;
  
  // 主题类别
  if (category) score += 0.3;
  
  // 时期
  if (era) score += 0.15;
  
  // 关键议题
  if (issueCount >= 3) score += 0.15;
  else if (issueCount >= 1) score += 0.1;
  
  return Math.min(1, score);
}

// 整合自定义内容与推荐数据
export function integrateCustomWithRecommendations(
  customScenario: ParsedCustomScenario,
  recommendations: {
    background?: string;
    suggestedGoals?: { high: string; bottomLine: string };
    similarCases?: { name: string; year: string; lessons: string[] }[];
  }
): {
  title: string;
  description: string;
  background: string;
  detectedCountries: ParsedCustomScenario['detectedCountries'];
  keyIssues: string[];
  suggestedGoals: { high: string; bottomLine: string };
  similarCases: { name: string; year: string; lessons: string[] }[];
  confidence: number;
} {
  // 整合背景
  let background = customScenario.context;
  
  if (recommendations.background) {
    background = `【用户提供背景】
${customScenario.context}

【补充分析】
${recommendations.background}`;
  }
  
  // 整合目标
  const suggestedGoals = recommendations.suggestedGoals || {
    high: '达成有利的谈判结果',
    bottomLine: '维护核心利益不受损害'
  };
  
  // 整合案例
  const similarCases = recommendations.similarCases || [];
  
  return {
    title: customScenario.title,
    description: customScenario.description,
    background,
    detectedCountries: customScenario.detectedCountries,
    keyIssues: customScenario.keyIssues,
    suggestedGoals,
    similarCases,
    confidence: customScenario.confidence
  };
}

// 验证场景完整性
export function validateScenarioCompleteness(scenario: {
  title?: string;
  description?: string;
  detectedCountries?: { id: string; name: string; role: string }[];
  detectedCategory?: string | null;
  keyIssues?: string[];
}): {
  isComplete: boolean;
  missingFields: string[];
  warnings: string[];
} {
  const missingFields: string[] = [];
  const warnings: string[] = [];
  
  if (!scenario.title || scenario.title.length < 3) {
    missingFields.push('场景标题');
  }
  
  if (!scenario.description || scenario.description.length < 10) {
    missingFields.push('场景描述');
  }
  
  if (!scenario.detectedCountries || scenario.detectedCountries.length < 2) {
    missingFields.push('参与方（至少需要双方）');
    warnings.push('建议至少明确两方参与方');
  }
  
  if (!scenario.detectedCategory) {
    missingFields.push('谈判主题类型');
    warnings.push('建议明确说明谈判的核心议题类型');
  }
  
  if (!scenario.keyIssues || scenario.keyIssues.length === 0) {
    warnings.push('建议列出主要谈判议题');
  }
  
  return {
    isComplete: missingFields.length === 0,
    missingFields,
    warnings
  };
}
