'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StrategyHint } from '@/types/negotiation';

interface StrategyHintPanelProps {
  hint: StrategyHint | null;
  isLoading?: boolean;
  onRefresh?: () => void;
}

const strategyColors: Record<string, string> = {
  offensive: '#F56565',
  defensive: '#4299E1',
  collaborative: '#48BB78',
  compromising: '#ECC94B',
  avoiding: '#A0AEC0',
};

const strategyLabels: Record<string, string> = {
  offensive: '进攻型',
  defensive: '防守型',
  collaborative: '合作型',
  compromising: '妥协型',
  avoiding: '回避型',
};

const strategyIcons: Record<string, React.ReactNode> = {
  offensive: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  defensive: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  collaborative: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  compromising: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
  avoiding: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
    </svg>
  ),
};

export default function StrategyHintPanel({ hint, isLoading, onRefresh }: StrategyHintPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [displayedHint, setDisplayedHint] = useState<StrategyHint | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (hint) {
      setIsTyping(true);
      // 打字机效果
      const timer = setTimeout(() => {
        setDisplayedHint(hint);
        setIsTyping(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [hint]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden"
    >
      {/* 头部 */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={(e) => e.key === 'Enter' && setIsExpanded(!isExpanded)}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="text-left">
            <h3 className="text-sm font-medium text-slate-200">策略建议</h3>
            <p className="text-xs text-slate-500">AI实时分析</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {onRefresh && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRefresh();
              }}
              disabled={isLoading}
              className="p-1.5 rounded-lg hover:bg-slate-700/50 transition-colors disabled:opacity-50"
            >
              <svg
                className={`w-4 h-4 text-slate-400 ${isLoading ? 'animate-spin' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          )}
          <svg
            className={`w-5 h-5 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* 内容 */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4">
              {isLoading || isTyping ? (
                <div className="flex items-center justify-center py-8">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs text-slate-500">分析中...</span>
                  </div>
                </div>
              ) : displayedHint ? (
                <>
                  {/* 策略类型标签 */}
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${strategyColors[displayedHint.type]}20`,
                        color: strategyColors[displayedHint.type],
                      }}
                    >
                      {strategyIcons[displayedHint.type]}
                      {strategyLabels[displayedHint.type]}
                    </span>
                    <span className="text-xs text-slate-500">
                      置信度 {(displayedHint.confidence * 100).toFixed(0)}%
                    </span>
                  </div>

                  {/* 标题 */}
                  <h4 className="text-base font-medium text-slate-100">
                    {displayedHint.title}
                  </h4>

                  {/* 描述 */}
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {displayedHint.description}
                  </p>

                  {/* 备选方案 */}
                  {displayedHint.alternativeMoves && displayedHint.alternativeMoves.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs text-slate-500 uppercase tracking-wide">备选方案</span>
                      <div className="space-y-1.5">
                        {displayedHint.alternativeMoves.map((move, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm text-slate-400"
                          >
                            <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-xs">
                              {index + 1}
                            </span>
                            {move}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-slate-500">开始谈判后获取策略建议</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
