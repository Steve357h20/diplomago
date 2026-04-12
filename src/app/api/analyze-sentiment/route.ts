import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

// 豆包视觉 API 配置
const DOUBAO_VISION_API_KEY = process.env.DOUBAO_VISION_API_KEY; // 你的 UUID
const DOUBAO_VISION_MODEL = process.env.DOUBAO_VISION_MODEL;     // 你的 ep-xxx
const DOUBAO_VISION_BASE_URL = "https://ark.cn-beijing.volces.com/api/v3";

/**
 * 调用豆包视觉 API 分析图片情绪
 */
async function callDoubaoVision(imageBase64: string): Promise<{
    emotion: string;
    confidence: number;
    intensity: number;
    microExpressions: Array<{ type: string; description: string }>;
    toneAnalysis: string;
}> {
    // 构建请求体（兼容 OpenAI 格式）
    const requestBody = {
        model: DOUBAO_VISION_MODEL,
        messages: [
            {
                role: "system",
                content: `你是一位专业的微表情和情绪分析专家。请分析图片中人物的情绪状态。
返回严格的JSON格式，包含以下字段：
- emotion: 情绪类型，必须是以下之一：neutral, positive, negative, suspicious, angry, pleased
- confidence: 置信度，0.0-1.0 之间的小数
- intensity: 情绪强度，0-100 的整数
- microExpressions: 微表情数组，每个元素包含 type（tension/relaxation/frustration/confidence/doubt）和 description（具体描述）
- toneAnalysis: 对语气和态度的文字描述（中文，30字以内）

注意：
1. 如果图片中没有人脸或无法确定情绪，emotion 返回 "neutral"
2. confidence 反映分析的可信度
3. 只返回JSON，不要任何其他文字`
            },
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: "请分析这张图片中人物的情绪状态"
                    },
                    {
                        type: "image_url",
                        image_url: {
                            url: imageBase64,
                            detail: "high"
                        }
                    }
                ]
            }
        ],
        temperature: 0.3,
        max_tokens: 500
    };

    const response = await fetch(`${DOUBAO_VISION_BASE_URL}/chat/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${DOUBAO_VISION_API_KEY}`
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`豆包 API 错误 (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // 尝试解析 JSON
    try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        return JSON.parse(content);
    } catch {
        // 如果解析失败，返回默认值
        return {
            emotion: "neutral",
            confidence: 0.5,
            intensity: 50,
            microExpressions: [],
            toneAnalysis: content.slice(0, 50)
        };
    }
}

/**
 * 兜底逻辑：返回默认中性分析
 */
function getFallbackAnalysis(): {
    emotion: string;
    confidence: number;
    intensity: number;
    microExpressions: Array<{ type: string; description: string }>;
    toneAnalysis: string;
} {
    return {
        emotion: "neutral",
        confidence: 0.5,
        intensity: 50,
        microExpressions: [],
        toneAnalysis: "未能进行实时分析，使用默认中性评估"
    };
}

export async function POST(request: NextRequest) {
    try {
        const { imageData } = await request.json();

        if (!imageData) {
            return NextResponse.json(
                { error: "No image data provided" },
                { status: 400 }
            );
        }

        // 检查环境变量
        if (!DOUBAO_VISION_API_KEY || !DOUBAO_VISION_MODEL) {
            console.warn("豆包视觉 API 未配置，使用兜底分析");
            return NextResponse.json(getFallbackAnalysis());
        }

        let sentimentData;
        try {
            sentimentData = await callDoubaoVision(imageData);
        } catch (apiError) {
            console.error("豆包视觉 API 调用失败:", apiError);
            sentimentData = getFallbackAnalysis();
        }

        return NextResponse.json(sentimentData);
    } catch (error) {
        console.error("Sentiment Analysis Error:", error);
        return NextResponse.json(getFallbackAnalysis());
    }
}