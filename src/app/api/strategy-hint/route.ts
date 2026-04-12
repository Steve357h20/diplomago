import { NextRequest, NextResponse } from "next/server";
import { invokeChat, MODELS } from "@/lib/deepseek";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
    try {
        const { context, history, currentPrediction } = await request.json();

        // 构建策略分析提示词
        const systemPrompt = `你是一位资深外交谈判策略专家。基于当前谈判局势，为用户提供专业的策略建议。

分析维度：
1. 当前局势评估
2. 对方可能的意图
3. 推荐策略类型（进攻型/防守型/合作型/妥协型/回避型）
4. 具体行动建议
5. 备选方案

请用JSON格式返回：
{
  "type": "offensive|defensive|collaborative|compromising|avoiding",
  "title": "策略标题",
  "description": "策略详细描述",
  "confidence": 0.0-1.0,
  "alternativeMoves": ["备选方案1", "备选方案2", "备选方案3"],
  "keyConsiderations": ["关键考量1", "关键考量2"]
}

当前谈判主题：${context?.topic?.name || '未指定'}
当前预测获利率：${currentPrediction || 50}%

谈判历史摘要：
${history?.slice(-5)?.map((m: { role: string; content: string }) => `${m.role === 'user' ? '我方' : '对方'}：${m.content.slice(0, 100)}...`).join('\n') || '暂无'}`;

        const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
            { role: "system", content: systemPrompt },
            { role: "user", content: "请给出当前局势下的策略建议" },
        ];

        const responseContent = await invokeChat(messages, {
            model: MODELS.REASONER,
            temperature: 0.6,
        });

        // 尝试解析JSON
        let strategyHint;
        try {
            const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                strategyHint = JSON.parse(jsonMatch[0]);
            } else {
                strategyHint = JSON.parse(responseContent);
            }
        } catch {
            // 兜底策略
            strategyHint = {
                type: "collaborative",
                title: "寻求合作",
                description: responseContent || "建议保持开放态度，寻找双方共同利益点。",
                confidence: 0.7,
                alternativeMoves: ["提出折中方案", "强调共同目标", "寻求第三方调解"],
                keyConsiderations: ["关注对方核心关切", "保持沟通渠道畅通"],
            };
        }

        return NextResponse.json(strategyHint);
    } catch (error) {
        console.error('Strategy Hint Error:', error);
        return NextResponse.json(
            { error: 'Failed to generate strategy hint' },
            { status: 500 }
        );
    }
}