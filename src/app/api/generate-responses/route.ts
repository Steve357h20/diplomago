import { NextRequest, NextResponse } from 'next/server';
import { invokeChat, MODELS } from '@/lib/deepseek';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const { context, history, issues, currentIssueIndex, goals } = await request.json();

    const lastMessage = history?.length > 0 ? history[history.length - 1].content : '';
    const currentIssue = issues?.[currentIssueIndex];

    const systemPrompt = `你是一位资深外交谈判顾问。请根据当前谈判局势，为用户生成3-4个不同的回应选项。

每个选项应包含：
- text: 具体的回应内容（草案，50-120字）
- tone: 语气类型 (diplomatic/assertive/conciliatory/strategic)
- pros: 这个选项的优点（一句话）
- cons: 这个选项的风险或缺点（一句话）
- impact: 可能的影响 (positive/neutral/negative)

返回严格的JSON数组，不要包含其他文字。`;

    const userPrompt = `当前谈判背景：
- 主题：${context?.topic?.name || '未指定'}
- 我方：${context?.parties?.self?.country || '中国'}
- 对方：${context?.parties?.opponent?.country || '美国'}
${currentIssue ? `- 当前议题：${currentIssue.title} (${currentIssue.controversy || '争议中'})` : ''}
- 对方最后发言：${lastMessage || '（开场）'}

请生成3-4个回应选项。`;

    const messages = [
      { role: 'system' as const, content: systemPrompt },
      { role: 'user' as const, content: userPrompt },
    ];

    const rawContent = await invokeChat(messages, {
      model: MODELS.CHAT,
      temperature: 0.7,
    });

    // 解析JSON
    let options = [];
    try {
      const jsonMatch = rawContent.match(/\[[\s\S]*\]/);
      options = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    } catch {
      options = [];
    }

    // 如果解析失败，返回默认选项
    if (options.length === 0) {
      options = [
        {
          text: `关于${currentIssue?.title || '当前议题'}，我方认为应在相互尊重基础上寻求共识。`,
          tone: 'diplomatic',
          pros: '展现合作姿态，利于缓和气氛',
          cons: '可能被对方视为立场不坚定',
          impact: 'neutral'
        },
        {
          text: `我方必须明确指出，在核心利益问题上我们没有让步空间。`,
          tone: 'assertive',
          pros: '明确底线，展示决心',
          cons: '可能激化矛盾，导致僵局',
          impact: 'negative'
        },
        {
          text: `我方理解贵方关切，愿意在次要问题上展现灵活性。`,
          tone: 'conciliatory',
          pros: '释放善意，可能换取对方让步',
          cons: '过早让步可能损失利益',
          impact: 'positive'
        },
        {
          text: `或许我们可以换个角度，将议题与其他问题统筹考虑。`,
          tone: 'strategic',
          pros: '开辟新思路，打破僵局',
          cons: '对方可能不愿偏离议程',
          impact: 'neutral'
        }
      ];
    }

    return NextResponse.json({ options });

  } catch (error) {
    console.error('Generate responses error:', error);
    return NextResponse.json({ error: '生成失败' }, { status: 500 });
  }
}