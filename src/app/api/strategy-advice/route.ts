import { NextRequest, NextResponse } from 'next/server';
import { invokeChat, MODELS } from '@/lib/deepseek';
import { getCaseIndex } from '@/lib/case-database';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const { context, history, currentState } = await request.json();

    const caseList = getCaseIndex()
      .map(c => `- ${c.id}: ${c.name} (${c.year}) - ${c.topic}`)
      .join('\n');

    const systemPrompt = `你是外交谈判智囊团，由三位资深战略顾问组成：鹰派、鸽派和务实派。请针对当前谈判局势，分别从三个角度提供策略方案。

【要求】
每份方案必须包含：
1. type: "hawk" | "dove" | "pragmatic"
2. title: 策略名称（10字内）
3. coreIdea: 核心理念（30字内）
4. suggestedTalkingPoints: 建议的说话要点（2-3句数组，供用户参考使用）
5. consequences: {
     positive: 正面预期
     negative: 负面风险
     chipsChange: 筹码变化（正数获得，负数消耗）
   }
6. historicalCase: {
     id: 案例ID（从下方案例库中选择，或填"general"）
     name: 案例名称
     relevance: 与当前局势的关联说明（30字内）
   }

【案例库】
${caseList}

【当前谈判状态】
- 当前议题：${currentState?.currentIssue || '未知'}
- 对方耐心值：${currentState?.opponentPatience || 50}/100
- 我方国内支持率：${currentState?.domesticSupport || 50}/100
- 可用筹码：${currentState?.chipsAvailable || 0}个
- 僵局程度：${currentState?.stalemateLevel || 'low'}

请直接返回JSON格式的策略数组，不要任何额外文字。格式：
[{"type":"hawk","title":"...","coreIdea":"...","suggestedTalkingPoints":["...","..."],"consequences":{"positive":"...","negative":"...","chipsChange":0},"historicalCase":{"id":"...","name":"...","relevance":"..."}}, ...]`;

    const messages = [
      { role: 'system' as const, content: systemPrompt },
      { role: 'user' as const, content: `谈判主题：${context?.topic?.name || '未指定'}。对话历史：${JSON.stringify(history?.slice(-6) || [])}` },
    ];

    const rawContent = await invokeChat(messages, {
      model: MODELS.REASONER,
      temperature: 0.7,
    });

    let strategies;
    try {
      const jsonMatch = rawContent.match(/\[[\s\S]*\]/);
      strategies = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    } catch {
      strategies = [];
    }

    if (!strategies.length) {
      // 兜底策略
      strategies = [
        {
          type: 'hawk',
          title: '坚持立场',
          coreIdea: '明确底线，迫使对方让步',
          suggestedTalkingPoints: ['我方在这一议题上的立场是明确的，不会轻易改变。', '希望贵方能展现更多诚意。'],
          consequences: { positive: '可能守住核心利益', negative: '对方耐心下降，关系紧张', chipsChange: 0 },
          historicalCase: { id: 'general', name: '古巴导弹危机', relevance: '通过强硬姿态迫使对方妥协' }
        },
        {
          type: 'dove',
          title: '释放善意',
          coreIdea: '小幅让步换取合作氛围',
          suggestedTalkingPoints: ['为展现我方诚意，我们愿意在部分条款上做出调整。', '期待贵方也能相向而行。'],
          consequences: { positive: '有助于达成协议', negative: '国内支持率可能小幅下降', chipsChange: -1 },
          historicalCase: { id: 'general', name: '戴维营协议', relevance: '通过双方妥协实现和平' }
        },
        {
          type: 'pragmatic',
          title: '议题交换',
          coreIdea: '在此议题让步，换其他议题利益',
          suggestedTalkingPoints: ['我方愿意在此议题上展现灵活性，同时也希望在其他领域获得贵方支持。'],
          consequences: { positive: '平衡整体利益', negative: '当前议题收益减少', chipsChange: 1 },
          historicalCase: { id: 'general', name: '日美汽车谈判', relevance: '通过关联议题达成一揽子协议' }
        }
      ];
    }

    return NextResponse.json({ strategies });
  } catch (error) {
    console.error('Strategy advice error:', error);
    return NextResponse.json({ error: '生成失败' }, { status: 500 });
  }
}