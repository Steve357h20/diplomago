'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AIAssistant from '@/components/ai-assistant/AIAssistant';
import { AssistantMessage, TrainingRecordSummary } from '@/types/negotiation';
import { 
  getTrainingRecordSummaries, 
  deleteTrainingRecord, 
  getTrainingStats,
  formatRecordTime,
  formatDuration,
  getOutcomeLabel,
  getOutcomeColor
} from '@/lib/training-records';
import { 
  History, 
  Trophy, 
  Clock, 
  Trash2, 
  ChevronRight,
  Users,
  MessageSquare
} from 'lucide-react';

export default function HomePage() {
  const [assistantMessages, setAssistantMessages] = useState<AssistantMessage[]>([]);
  const [isAssistantExpanded, setIsAssistantExpanded] = useState(false);
  const [trainingRecords, setTrainingRecords] = useState<TrainingRecordSummary[]>([]);
  const [trainingStats, setTrainingStats] = useState({
    totalCount: 0,
    completedCount: 0,
    averageOutcome: 0,
    totalTrainingTime: 0,
    recentCount: 0,
  });

  // 加载训练记录
  useEffect(() => {
    setTrainingRecords(getTrainingRecordSummaries());
    setTrainingStats(getTrainingStats());
  }, []);

  // 欢迎消息
  useEffect(() => {
    const welcomeMessage: AssistantMessage = {
      id: 'welcome',
      role: 'assistant',
      content: '欢迎来到外交谈判模拟平台！我是您的AI谈判助手。我将帮助您设置谈判场景，并作为对方谈判队的AI代表与您进行真实的模拟练习。',
      timestamp: Date.now(),
      emotion: 'friendly',
    };
    setAssistantMessages([welcomeMessage]);
  }, []);

  const handleDeleteRecord = (id: string) => {
    deleteTrainingRecord(id);
    setTrainingRecords(getTrainingRecordSummaries());
    setTrainingStats(getTrainingStats());
  };

  const handleAssistantToggle = () => {
    setIsAssistantExpanded(!isAssistantExpanded);
  };

  const handleAssistantSend = async (message: string) => {
    // 添加用户消息
    const userMsg: AssistantMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: Date.now(),
    };
    setAssistantMessages(prev => [...prev, userMsg]);

    // 创建 AI 消息占位符
    const aiMsgId = `ai-${Date.now()}`;
    const aiMsg: AssistantMessage = {
      id: aiMsgId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
      isTyping: true,
    };
    setAssistantMessages(prev => [...prev, aiMsg]);

    // 准备历史消息（用于上下文）
    const historyMessages = assistantMessages.slice(-10).map(m => ({
      role: m.role,
      content: m.content,
    }));

    try {
      // 调用 AI API
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...historyMessages, { role: 'user', content: message }],
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error('API 请求失败');
      }

      // 处理流式响应
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.content) {
                  fullContent += data.content;
                  // 更新消息内容
                  setAssistantMessages(prev =>
                    prev.map(msg =>
                      msg.id === aiMsgId
                        ? { ...msg, content: fullContent, isTyping: false }
                        : msg
                    )
                  );
                }
                if (data.done) {
                  break;
                }
                if (data.error) {
                  throw new Error(data.error);
                }
              } catch {
                // 忽略解析错误
              }
            }
          }
        }
      }

      // 确保消息完成
      setAssistantMessages(prev =>
        prev.map(msg =>
          msg.id === aiMsgId ? { ...msg, content: fullContent, isTyping: false } : msg
        )
      );
    } catch (error) {
      console.error('AI 请求错误:', error);
      // 显示错误消息
      setAssistantMessages(prev =>
        prev.map(msg =>
          msg.id === aiMsgId
            ? { ...msg, content: '抱歉，AI助手暂时无法回应。请稍后再试。', isTyping: false }
            : msg
        )
      );
    }
  };

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'AI智能模拟',
      description: '基于DeepSeek和豆包大模型，模拟真实的外交谈判场景和对方谈判队',
      color: 'from-amber-500/20 to-amber-600/20',
      borderColor: 'border-amber-500/30',
      iconColor: 'text-amber-400',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      title: '表情语气分析',
      description: '通过摄像头实时分析您的表情和语气，帮助提升谈判表现',
      color: 'from-blue-500/20 to-blue-600/20',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-400',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: '策略分析',
      description: '实时分析谈判走向，提供策略建议，帮助您做出更好的决策',
      color: 'from-green-500/20 to-green-600/20',
      borderColor: 'border-green-500/30',
      iconColor: 'text-green-400',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: '历史案例参考',
      description: '基于真实外交数据和国际案例，提供历史参考和经验借鉴',
      color: 'from-purple-500/20 to-purple-600/20',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-400',
    },
  ];

  const dataSources = [
    { name: '联合国数据库', desc: '国际条约与协定' },
    { name: 'FRUS', desc: '美国外交关系文件' },
    { name: 'PA-X', desc: '和平协议数据库' },
    { name: 'CoDipA', desc: '外交语料库' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* 导航栏 */}
      <nav className="relative z-10 border-b border-slate-800/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">Diplomatic AI</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/configure"
                className="px-4 py-2 text-amber-400 hover:text-amber-300 transition-colors border border-amber-400/30 rounded-lg hover:bg-amber-400/10"
              >
                双边谈判
              </Link>
              <Link
                href="/multilateral/config"
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                多边谈判
              </Link>
              <Link
                href="/history"
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <History className="w-4 h-4" />
                历史记录
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                关于
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容 */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Hero区域 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-sm text-amber-400">AI驱动的外交谈判训练平台</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            智能模拟
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent"> 外交谈判 </span>
            场景
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            通过AI技术模拟真实的外交谈判环境，帮助您提升谈判技巧，
            积累经验，制定最优谈判策略
          </p>

          <Link
            href="/configure"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-semibold rounded-2xl transition-all shadow-2xl shadow-amber-500/25 hover:shadow-amber-500/40"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            开始模拟训练
          </Link>
        </motion.div>

        {/* 功能卡片 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-6 rounded-2xl bg-gradient-to-br ${feature.color} border ${feature.borderColor} backdrop-blur-xl`}
            >
              <div className={`w-14 h-14 rounded-xl bg-slate-900/50 flex items-center justify-center mb-4 ${feature.iconColor}`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* 训练记录历史 */}
        {trainingRecords.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-20"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <History className="w-6 h-6 text-amber-400" />
                <h2 className="text-2xl font-bold text-white">训练记录</h2>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-slate-400">
                  <Trophy className="w-4 h-4" />
                  <span>完成 {trainingStats.completedCount} 次</span>
                </div>
                {trainingStats.averageOutcome !== 0 && (
                  <div className="flex items-center gap-2 text-slate-400">
                    <span>平均结果:</span>
                    <span className={getOutcomeColor(trainingStats.averageOutcome)}>
                      {getOutcomeLabel(trainingStats.averageOutcome)}
                    </span>
                  </div>
                )}
                {trainingStats.totalTrainingTime > 0 && (
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span>累计 {formatDuration(trainingStats.totalTrainingTime)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {trainingRecords.slice(0, 5).map((record) => (
                <div
                  key={record.id}
                  className="flex items-center gap-4 p-4 bg-slate-900/50 backdrop-blur-xl rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-colors group"
                >
                  {/* 类型标识 */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    record.type === 'multilateral' 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {record.type === 'multilateral' ? (
                      <Users className="w-6 h-6" />
                    ) : (
                      <MessageSquare className="w-6 h-6" />
                    )}
                  </div>

                  {/* 记录信息 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-medium truncate">{record.topic}</h3>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        record.status === 'completed' 
                          ? 'bg-green-500/20 text-green-400' 
                          : record.status === 'in-progress'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-slate-500/20 text-slate-400'
                      }`}>
                        {record.status === 'completed' ? '已完成' : record.status === 'in-progress' ? '进行中' : '已放弃'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-400">
                      <span>{record.selfCountry}</span>
                      <ChevronRight className="w-4 h-4" />
                      <span>{record.type === 'multilateral' ? `${record.countriesCount}国` : record.opponentCountry}</span>
                      <span className="text-slate-600">•</span>
                      <span>{formatRecordTime(record.startTime)}</span>
                    </div>
                  </div>

                  {/* 结果 */}
                  {record.outcome !== undefined && (
                    <div className={`text-lg font-semibold ${getOutcomeColor(record.outcome)}`}>
                      {record.outcome > 0 ? '+' : ''}{record.outcome}%
                    </div>
                  )}

                  {/* 操作 */}
                  <button
                    onClick={() => handleDeleteRecord(record.id)}
                    className="p-2 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                    title="删除记录"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {trainingRecords.length > 5 && (
              <p className="text-center text-slate-500 text-sm mt-4">
                还有 {trainingRecords.length - 5} 条记录...
              </p>
            )}
          </motion.div>
        )}

        {/* 数据来源 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 mb-20"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-2">专业数据支撑</h2>
          <p className="text-slate-400 text-center mb-8">训练数据来源于权威外交数据库和学术资源</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dataSources.map((source) => (
              <div
                key={source.name}
                className="p-4 bg-slate-800/50 rounded-xl text-center"
              >
                <p className="text-white font-medium mb-1">{source.name}</p>
                <p className="text-xs text-slate-500">{source.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 使用流程 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-8">使用流程</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            {[
              { step: '01', title: '场景配置', desc: '设置谈判背景' },
              { step: '02', title: '模拟谈判', desc: 'AI扮演对方' },
              { step: '03', title: '实时分析', desc: '表情语气分析' },
              { step: '04', title: '结果复盘', desc: '策略优化建议' },
            ].map((item, index) => (
              <React.Fragment key={item.step}>
                <div className="flex md:flex-col items-center md:items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/30 flex items-center justify-center">
                    <span className="text-2xl font-bold text-amber-400">{item.step}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
                {index < 3 && (
                  <div className="hidden md:block w-16 h-px bg-slate-700" />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </main>

      {/* AI助手 */}
      <AIAssistant
        messages={assistantMessages}
        currentPhase="welcome"
        isExpanded={isAssistantExpanded}
        onToggle={handleAssistantToggle}
        onSendMessage={handleAssistantSend}
      />

      {/* 页脚 */}
      <footer className="relative z-10 border-t border-slate-800/50 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-slate-500">
            Diplomatic AI - AI驱动的外交谈判训练平台
          </p>
        </div>
      </footer>
    </div>
  );
}
