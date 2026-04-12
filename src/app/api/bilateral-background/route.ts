// 双边谈判背景和议题生成API
import { NextRequest, NextResponse } from 'next/server';
import { invokeChat, MODELS } from '@/lib/deepseek';
import { getEraConfig } from '@/lib/era-config';
import { HistoricalEra } from '@/types/negotiation';

export const runtime = 'nodejs';
export const maxDuration = 90;

// 背景和议题生成接口
interface GenerateRequest {
    topic: {
        name: string;
        category: string;
        description: string;
        keyIssues?: string[];
    };
    selfCountry: {
        id: string;
        name: string;
        flag: string;
        region: string;
        historicalBackground?: {
            brief?: string;
            detailed?: string;
        };
        personality?: Record<string, number>;
        coreInterests?: string[];
    };
    opponentCountry: {
        id: string;
        name: string;
        flag: string;
        region: string;
        historicalBackground?: {
            brief?: string;
            detailed?: string;
        };
        personality?: Record<string, number>;
        coreInterests?: string[];
    };
    era?: HistoricalEra;
    language?: 'zh' | 'en';
}

export async function POST(request: NextRequest) {
    try {
        const body: GenerateRequest = await request.json();
        const { topic, selfCountry, opponentCountry, era, language = 'zh' } = body;

        // 获取时期配置
        const eraConfig = era ? getEraConfig(era) : getEraConfig('modern');

        // 构建提示词 - 加入时期特征
        const systemPrompt = `你是一位专业的外交谈判策划专家，专门为外交模拟训练生成符合${eraConfig.name}时代特征的谈判背景故事和议题设置。

## 重要：时代特征约束
本次谈判设定在${eraConfig.name}（${eraConfig.yearRange}）时期，这一时期的典型特征包括：
- ${eraConfig.characteristics.join('；')}
- 语言风格：${eraConfig.typicalLanguageStyle}

## 你的任务
根据给定的谈判主题、参与国家和历史时期，生成：
1. 符合时代特征的详细背景故事
2. 与时代背景紧密相关的谈判议题

## 背景故事要求
必须包含以下要素：
1. 【时代背景】：描述该时期的国际环境特点
2. 【历史渊源】：两国关系在该时期的历史发展
3. 【近期发展】：近期发生的关键事件
4. 【直接导火索】：导致双方必须坐上谈判桌的具体事件
5. 【双方立场】：在谈判主题上双方各自的公开立场
6. 【当前态势】：谈判开始前的基本态势

## 议题设置要求
生成3-5个具体的谈判议题，每个议题必须：
1. 与时代背景和背景故事紧密相关
2. 有明确的争议焦点
3. 包含双方的不同诉求
4. 按逻辑顺序排列

## 语言风格约束
背景故事和议题必须体现${eraConfig.typicalLanguageStyle}的语言风格。

## 输出格式
请用JSON格式返回：
{
  "background": {
    "historicalContext": "历史渊源（200字）",
    "recentEvents": "近期发展（150字）",
    "triggerEvent": "直接导火索（100字）",
    "currentStance": {
      "self": "甲方公开立场（100字）",
      "opponent": "乙方公开立场（100字）"
    },
    "currentSituation": "当前态势描述（100字）"
  },
  "fullBackground": "完整背景故事（所有内容合并成连贯段落，400-600字）",
  "issues": [
    {
      "id": "issue-1",
      "title": "议题标题",
      "description": "议题详细描述",
      "controversy": "争议焦点",
      "selfPosition": "甲方立场",
      "opponentPosition": "乙方立场",
      "difficulty": "easy/medium/hard",
      "importance": 1-5
    }
  ]
}

## 重要约束
- 所有内容必须基于给定的国家和主题进行创作
- 历史事件必须符合${eraConfig.name}时期的史实背景
- 两国立场必须体现该时期的时代特点
- 议题要符合当时的国际关系逻辑
- 语言为${language === 'zh' ? '中文' : '英文'}`;

        const userPrompt = `请为以下${eraConfig.name}时期的双边谈判场景生成背景故事和议题：

【历史时期】
${eraConfig.name}（${eraConfig.yearRange}）
时代特征：${eraConfig.characteristics.join('；')}
语言风格：${eraConfig.typicalLanguageStyle}

【谈判主题】
名称：${topic.name}
类型：${topic.category}
描述：${topic.description || '无详细描述'}
关键议题方向：${topic.keyIssues?.join('、') || '待确定'}

【甲方】
国家：${selfCountry.name} ${selfCountry.flag}
地区：${selfCountry.region}
背景：${selfCountry.historicalBackground?.brief || selfCountry.historicalBackground?.detailed || '无详细信息'}
核心利益：${selfCountry.coreInterests?.join('、') || '未指定'}

【乙方】
国家：${opponentCountry.name} ${opponentCountry.flag}
地区：${opponentCountry.region}
背景：${opponentCountry.historicalBackground?.brief || opponentCountry.historicalBackground?.detailed || '无详细信息'}
核心利益：${opponentCountry.coreInterests?.join('、') || '未指定'}

请生成符合${eraConfig.name}时代特征的背景故事和议题设置。`;

        const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
        ];

        // 调用 DeepSeek 非流式生成
        const responseContent = await invokeChat(messages, {
            model: MODELS.CHAT,
            temperature: 0.7,
        });

        // 解析响应
        let result;
        if (responseContent) {
            try {
                // 尝试提取JSON
                const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    result = JSON.parse(jsonMatch[0]);
                } else {
                    result = JSON.parse(responseContent);
                }
            } catch {
                // 如果解析失败，返回原始内容
                result = {
                    background: {
                        historicalContext: responseContent.slice(0, 500),
                        recentEvents: '',
                        triggerEvent: '',
                        currentStance: { self: '', opponent: '' },
                        currentSituation: ''
                    },
                    fullBackground: responseContent,
                    issues: []
                };
            }
        }

        return NextResponse.json({
            success: true,
            data: result
        });

    } catch (error) {
        console.error('生成背景和议题失败:', error);
        return NextResponse.json(
            { error: '生成失败，请重试' },
            { status: 500 }
        );
    }
}
