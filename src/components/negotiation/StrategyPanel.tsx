'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle2, ArrowRightLeft, ChevronDown, ChevronUp } from 'lucide-react';
import CaseBadge from './CaseBadge';

export interface Strategy {
  type: 'hawk' | 'dove' | 'pragmatic';
  title: string;
  coreIdea: string;
  suggestedTalkingPoints: string[];
  consequences: {
    positive: string;
    negative: string;
    chipsChange: number;
  };
  historicalCase: {
    id: string;
    name: string;
    relevance: string;
  };
}

interface StrategyPanelProps {
  strategies: Strategy[];
  isExpanded: boolean;
  onToggle: () => void;
  onSelect: (strategy: Strategy) => void;
  isLoading?: boolean;
}

const typeConfig = {
  hawk: {
    icon: <AlertTriangle className="w-5 h-5" />,
    label: '鹰派 · 强硬路线',
    borderColor: 'border-red-500/30',
    bgColor: 'bg-red-500/5',
    textColor: 'text-red-400',
  },
  dove: {
    icon: <CheckCircle2 className="w-5 h-5" />,
    label: '鸽派 · 妥协路线',
    borderColor: 'border-green-500/30',
    bgColor: 'bg-green-500/5',
    textColor: 'text-green-400',
  },
  pragmatic: {
    icon: <ArrowRightLeft className="w-5 h-5" />,
    label: '务实派 · 交换路线',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-500/5',
    textColor: 'text-blue-400',
  },
};

export default function StrategyPanel({ strategies, isExpanded, onToggle, onSelect, isLoading }: StrategyPanelProps) {
  return (
    <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-amber-500/30 overflow-hidden">
      {/* 头部 */}
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">🧠</span>
          <h3 className="text-white font-medium">智囊团献策</h3>
          {!isExpanded && strategies.length > 0 && (
            <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded-full">
              {strategies.length} 个方案可用
            </span>
          )}
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
      </button>

      {/* 策略列表 */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {isLoading ? (
              <div className="p-6 text-center text-slate-400">
                <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                智囊团正在分析局势...
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {strategies.map((strategy, index) => {
                  const config = typeConfig[strategy.type];
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border ${config.borderColor} ${config.bgColor}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className={config.textColor}>{config.icon}</span>
                        <span className={`text-sm font-medium ${config.textColor}`}>
                          {strategy.title}
                        </span>
                        <span className="text-xs text-slate-500">· {config.label}</span>
                      </div>
                      <p className="text-sm text-slate-300 mb-2">{strategy.coreIdea}</p>

                      {/* 话术建议 */}
                      <div className="mb-3">
                        <p className="text-xs text-slate-500 mb-1">💬 建议这样说：</p>
                        {strategy.suggestedTalkingPoints.map((point, i) => (
                          <p key={i} className="text-sm text-slate-400 pl-3 border-l border-slate-700 mb-1">
                            {point}
                          </p>
                        ))}
                      </div>

                      {/* 后果分析 */}
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="p-2 bg-green-500/10 rounded border border-green-500/20">
                          <p className="text-xs text-green-400">✅ 正面预期</p>
                          <p className="text-xs text-slate-400">{strategy.consequences.positive}</p>
                        </div>
                        <div className="p-2 bg-red-500/10 rounded border border-red-500/20">
                          <p className="text-xs text-red-400">⚠️ 负面风险</p>
                          <p className="text-xs text-slate-400">{strategy.consequences.negative}</p>
                        </div>
                      </div>

                      {/* 筹码变化 */}
                      {strategy.consequences.chipsChange !== 0 && (
                        <p className={`text-xs mb-3 ${strategy.consequences.chipsChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {strategy.consequences.chipsChange > 0 ? '🔼' : '🔽'} 筹码 
                          {strategy.consequences.chipsChange > 0 ? '+' : ''}{strategy.consequences.chipsChange}
                        </p>
                      )}

                      {/* 历史案例 */}
                      <CaseBadge
                        id={strategy.historicalCase.id}
                        name={strategy.historicalCase.name}
                        relevance={strategy.historicalCase.relevance}
                      />

                      {/* 采用按钮 */}
                      <button
                        onClick={() => onSelect(strategy)}
                        className="mt-3 w-full py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-sm rounded-lg transition-colors"
                      >
                        采用此方案
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}