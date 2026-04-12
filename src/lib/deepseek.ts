/**
 * DeepSeek API 客户端封装
 * 使用 OpenAI 兼容格式调用 DeepSeek 模型
 */
import OpenAI from 'openai';

// 初始化 DeepSeek 客户端
const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com/v1',
});

/**
 * 流式对话生成
 * @param messages 消息数组，支持 system / user / assistant
 * @param options 可选配置，包括模型和温度
 * @returns 异步生成器，逐块返回内容
 */
export async function* streamChat(
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  options?: { model?: string; temperature?: number }
) {
  const stream = await deepseek.chat.completions.create({
    model: options?.model || 'deepseek-chat',
    messages,
    temperature: options?.temperature ?? 0.7,
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      yield content;
    }
  }
}

/**
 * 非流式对话生成
 * @param messages 消息数组
 * @param options 可选配置
 * @returns 完整的回复内容字符串
 */
export async function invokeChat(
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  options?: { model?: string; temperature?: number }
): Promise<string> {
  const response = await deepseek.chat.completions.create({
    model: options?.model || 'deepseek-chat',
    messages,
    temperature: options?.temperature ?? 0.3,
  });
  return response.choices[0]?.message?.content || '';
}

/**
 * 获取可用的模型名称
 */
export const MODELS = {
  CHAT: 'deepseek-chat',           // 通用对话模型
  REASONER: 'deepseek-reasoner',   // 深度推理模型（用于复杂分析）
};