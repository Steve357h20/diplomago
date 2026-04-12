'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AIAssistant from '@/components/ai-assistant/AIAssistant';
import { AssistantMessage, Message, OutcomeAnalysis } from '@/types/negotiation';

export default function AnalysisPage() {
  const router = useRouter();
  const [assistantMessages, setAssistantMessages] = useState<AssistantMessage[]>([]);
  const [isAssistantExpanded, setIsAssistantExpanded] = useState(false);
  const [stats, setStats] = useState({ turnCount: 0, outcomePrediction: 50 });
  const [analysis, setAnalysis] = useState<OutcomeAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'decisions' | 'recommendations'>('overview');

  useEffect(() => {
    const savedMessages = sessionStorage.getItem('negotiation-messages');
    const savedStats = sessionStorage.getItem('negotiation-stats');

    if (savedMessages && savedStats) {
      const parsedMessages = JSON.parse(savedMessages);
      setStats(JSON.parse(savedStats));
      generateAnalysis(parsedMessages, JSON.parse(savedStats));
    } else {
      router.push('/');
    }
  }, [router]);

  const generateAnalysis = async (msgHistory: Message[], negotiationStats: { turnCount: number; outcomePrediction: number }) => {
    setIsLoading(true);
    if (analysis) return; // 已有分析报告，不再重复生成
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: msgHistory,
          userScore: negotiationStats.outcomePrediction,
        }),
      });
      const result = await response.json();
      setAnalysis(result);

      // AI助手总结
      const summaryMessage: AssistantMessage = {
        id: 'analysis-summary',
        role: 'assistant',
        content: `谈判分析已完成！整体评分为 ${result.overallScore} 分。建议您查看下方的详细分析报告，了解本次谈判的亮点和可改进之处。`,
        timestamp: Date.now(),
        emotion: 'encouraging',
      };
      setAssistantMessages([summaryMessage]);
    } catch (error) {
      console.error('Failed to generate analysis:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">正在生成分析报告...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* 顶部导航 */}
      <nav className="relative z-10 border-b border-slate-800/50 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-lg font-medium text-white">谈判结果分析</h1>
                <p className="text-xs text-slate-500">{stats.turnCount} 回合</p>
              </div>
            </div>
            <Link
              href="/configure"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-sm rounded-xl transition-colors"
            >
              再来一次
            </Link>
          </div>
        </div>
      </nav>

      {/* 主内容 */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-8">
        {/* 总体评分 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 mb-8 text-center"
        >
          <h2 className="text-sm text-slate-500 uppercase tracking-wide mb-4">综合评分</h2>
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                strokeWidth="12"
                stroke="currentColor"
                className="text-slate-800"
                fill="none"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                strokeWidth="12"
                stroke="currentColor"
                className={analysis.overallScore > 60 ? 'text-green-400' : analysis.overallScore > 40 ? 'text-amber-400' : 'text-red-400'}
                fill="none"
                strokeDasharray={`${(analysis.overallScore + 100) / 200 * 553} 553`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className={`text-5xl font-bold ${
                  analysis.overallScore > 60 ? 'text-green-400' : analysis.overallScore > 40 ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {analysis.overallScore}
                </span>
                <p className="text-sm text-slate-500">分</p>
              </div>
            </div>
          </div>
          <p className="text-slate-400 max-w-lg mx-auto">{analysis.summary}</p>
        </motion.div>

        {/* 标签页 */}
        <div className="flex gap-2 mb-6">
          {[
            { key: 'overview', label: '概览' },
            { key: 'decisions', label: '关键决策' },
            { key: 'recommendations', label: '改进建议' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`px-4 py-2 rounded-xl text-sm transition-colors ${
                activeTab === tab.key
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'bg-slate-800/50 text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 概览 */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* 优势 */}
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                优势
              </h3>
              <ul className="space-y-3">
                {analysis.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-slate-400">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            {/* 不足 */}
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                不足
              </h3>
              <ul className="space-y-3">
                {analysis.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-slate-400">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2" />
                    {weakness}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {/* 关键决策 */}
        {activeTab === 'decisions' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {analysis.keyDecisions.map((decision, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border ${
                  decision.impact === 'positive' ? 'bg-green-500/10 border-green-500/30' :
                  decision.impact === 'negative' ? 'bg-red-500/10 border-red-500/30' :
                  'bg-slate-800/50 border-slate-700/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm font-medium text-slate-400">
                    {decision.turn}
                  </span>
                  <div className="flex-1">
                    <p className="text-white font-medium mb-1">{decision.decision}</p>
                    <p className="text-sm text-slate-400">{decision.explanation}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    decision.impact === 'positive' ? 'bg-green-500/20 text-green-400' :
                    decision.impact === 'negative' ? 'bg-red-500/20 text-red-400' :
                    'bg-slate-700 text-slate-400'
                  }`}>
                    {decision.impact === 'positive' ? '正面' : decision.impact === 'negative' ? '负面' : '中性'}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* 建议 */}
        {activeTab === 'recommendations' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {analysis.recommendations.map((rec, index) => (
              <div
                key={index}
                className="p-5 bg-slate-900/50 backdrop-blur-xl rounded-xl border border-slate-700/50"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    rec.priority === 'high' ? 'bg-red-500/20' :
                    rec.priority === 'medium' ? 'bg-amber-500/20' :
                    'bg-green-500/20'
                  }`}>
                    <span className={`text-sm font-medium ${
                      rec.priority === 'high' ? 'text-red-400' :
                      rec.priority === 'medium' ? 'text-amber-400' :
                      'text-green-400'
                    }`}>
                      {rec.priority === 'high' ? '高' : rec.priority === 'medium' ? '中' : '低'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-xs rounded">
                        {rec.category === 'tactics' ? '战术' : rec.category === 'strategy' ? '战略' : '准备'}
                      </span>
                      <h4 className="text-white font-medium">{rec.title}</h4>
                    </div>
                    <p className="text-sm text-slate-400">{rec.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* 历史案例 */}
        {analysis.similarCases && analysis.similarCases.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6"
          >
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              相似历史案例
              <span className="text-xs text-slate-500 ml-2">点击查看详情</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {analysis.similarCases.map((caseItem, index) => (
                <Link
                  key={index}
                  href={`/cases/${caseItem.id}`}
                  className="group p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-amber-500/50 transition-all hover:bg-slate-800"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium group-hover:text-amber-400 transition-colors">
                      {caseItem.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${
                        caseItem.outcome > 60 ? 'text-green-400' :
                        caseItem.outcome > 40 ? 'text-amber-400' :
                        'text-red-400'
                      }`}>
                        {caseItem.outcome}分
                      </span>
                      <svg className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 mb-2">{caseItem.keyDifference}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{caseItem.year}年</span>
                    <span>·</span>
                    <span>{caseItem.parties}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-4 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
              <p className="text-sm text-amber-400 flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>通过学习这些真实的历史案例，您可以了解外交谈判的经典策略、语言艺术和博弈智慧。建议在开始新的谈判前先深入研究相关案例。</span>
              </p>
            </div>
          </motion.div>
        )}
      </main>

      {/* AI助手 */}
      <AIAssistant
        messages={assistantMessages}
        currentPhase="analysis"
        isExpanded={isAssistantExpanded}
        onToggle={() => setIsAssistantExpanded(!isAssistantExpanded)}
      />
    </div>
  );
}
