import { NextRequest, NextResponse } from 'next/server';
import { invokeChat, MODELS } from '@/lib/deepseek';
import { getCountryById } from '@/lib/countries';
import { historicalCountries } from '@/lib/historical-countries';
import { futureCountries } from '@/lib/future-countries';


export const runtime = 'nodejs';
export const maxDuration = 60;

// 国家 ID 映射（前端短ID -> 数据库完整ID）
const countryIdMap: Record<string, string> = {
    'cn': 'china',
    'jp': 'japan',
    'kr': 'southkorea',
    'us': 'usa',
    'uk': 'uk',
    'fr': 'france',
    'de': 'germany',
    'ru': 'russia',
    'in': 'india',
    'br': 'brazil',
    'vn': 'vietnam',
    'ph': 'philippines',
    'id': 'indonesia',
    'my': 'malaysia',
    'th': 'thailand',
    'sg': 'singapore',
    'eu': 'eu',
    'au': 'australia',
    'ca': 'canada',
    'mx': 'mexico',
    'za': 'southafrica',
    'eg': 'egypt',
    'sa': 'saudiarabia',
    'ir': 'iran',
    'tr': 'turkey',
    'ua': 'ukraine',
};

function getCountryData(countryId: string) {
    const mappedId = countryIdMap[countryId] || countryId;

    // 先查现代国家
    const modern = getCountryById(mappedId);
    if (modern) return modern;

    // 再查历史国家
    const historical = historicalCountries.find(c => c.id === mappedId);
    if (historical) return historical;

    // 未来国家
    const future = futureCountries.find(c => c.id === mappedId);
    if (future) return future;

    return null;
}

export async function POST(request: NextRequest) {
    try {
        const { topic, topicDescription, background, userCountryId, opponentCountryIds } = await request.json();

        const userCountry = getCountryData(userCountryId);
        if (!userCountry) {
            console.error(`用户国家不存在: ${userCountryId} (映射后: ${countryIdMap[userCountryId] || userCountryId})`);
            return NextResponse.json({ error: `用户国家不存在: ${userCountryId}` }, { status: 400 });
        }

        const opponentCountries = (opponentCountryIds || [])
            .map((id: string) => getCountryData(id))
            .filter(Boolean);

        const systemPrompt = `你是一位外交谈判策略专家。请根据以下信息，为谈判方生成三个层次的谈判目标：高案（理想目标）、中间方案（务实选择）、底案（最低底线）。

返回严格的JSON格式：
{
  "highGoal": {
    "title": "高案标题",
    "description": "高案详细描述，50-100字"
  },
  "middleGoal": {
    "title": "中间方案标题",
    "description": "中间方案详细描述，50-100字"
  },
  "bottomLine": {
    "title": "底案标题",
    "description": "底案详细描述，50-100字"
  }
}`;

        const userPrompt = `请为以下谈判方生成三个层次的谈判目标：

【谈判主题】${topic}
【主题描述】${topicDescription || '无'}
【背景】${background || '无'}
【己方国家】${userCountry.name}
【对方国家】${opponentCountries.map(c => c.name).join('、') || '未指定'}
【己方核心利益】${userCountry.coreInterests?.join('、') || '维护国家利益'}
【己方性格】攻击性${userCountry.personality.aggression}/10，灵活性${userCountry.personality.flexibility}/10

请生成高案、中间方案、底案。`;

        const messages = [
            { role: 'system' as const, content: systemPrompt },
            { role: 'user' as const, content: userPrompt },
        ];

        const rawContent = await invokeChat(messages, {
            model: MODELS.CHAT,
            temperature: 0.7,
        });

        let goals;
        try {
            const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
            goals = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
        } catch {
            goals = null;
        }

        if (!goals) {
            goals = {
                highGoal: {
                    title: '最大化利益',
                    description: `在谈判中争取对${userCountry.name}最有利的条件，实现核心利益最大化。`
                },
                middleGoal: {
                    title: '务实合作',
                    description: `在维护核心利益的基础上，与对方寻求互利共赢的务实方案。`
                },
                bottomLine: {
                    title: '守住底线',
                    description: `确保${userCountry.coreInterests?.[0] || '核心利益'}不受损害，避免不利协议。`
                }
            };
        }

        return NextResponse.json({ success: true, goals });

    } catch (error) {
        console.error('生成目标失败:', error);
        return NextResponse.json({ error: '生成失败' }, { status: 500 });
    }
}