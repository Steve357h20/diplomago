'use client';

import React from 'react';
import { NegotiationIssue } from '@/types/negotiation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Circle, 
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  Target,
  Users,
  Scale,
  Zap,
  Swords,
  Handshake
} from 'lucide-react';

interface AgendaIndicatorProps {
  issues: NegotiationIssue[];
  currentIssueIndex: number;
  issueResults: Record<string, IssueResult>;
  attitudeHistory: AttitudeRecord[];
  momentum?: 'advancing' | 'stalled' | 'reversing';
  breakthroughChance?: number;
  opponentAnalysis?: {
    strategy?: string;
    mood?: string;
    opportunity?: string;
    risk?: string;
  };
  onIssueClick?: (issueId: string) => void;
}

interface IssueResult {
  status: 'pending' | 'discussing' | 'agreed' | 'disputed' | 'deadlock';
  selfGain: number;      // -100 to 100, 己方收益
  opponentGain: number;  // -100 to 100, 对方收益
  summary?: string;
}

interface AttitudeRecord {
  turn: number;
  selfAttitude: number;      // -100 to 100
  opponentAttitude: number;  // -100 to 100
  topic?: string;
  timestamp: number;
}

export default function AgendaIndicator({
  issues,
  currentIssueIndex,
  issueResults,
  attitudeHistory,
  momentum = 'advancing',
  breakthroughChance = 30,
  opponentAnalysis,
  onIssueClick
}: AgendaIndicatorProps) {
  const [expandedIssue, setExpandedIssue] = React.useState<string | null>(null);

  const getStatusIcon = (status: IssueResult['status']) => {
    switch (status) {
      case 'agreed':
        return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      case 'disputed':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'deadlock':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'discussing':
        return <Circle className="w-4 h-4 text-blue-400 animate-pulse" />;
      default:
        return <Circle className="w-4 h-4 text-slate-500" />;
    }
  };

  const getStatusColor = (status: IssueResult['status']) => {
    switch (status) {
      case 'agreed':
        return 'bg-green-500/20 border-green-500/30';
      case 'disputed':
        return 'bg-amber-500/20 border-amber-500/30';
      case 'deadlock':
        return 'bg-red-500/20 border-red-500/30';
      case 'discussing':
        return 'bg-blue-500/20 border-blue-500/30';
      default:
        return 'bg-slate-800/50 border-slate-700/50';
    }
  };

  const getGainIndicator = (gain: number) => {
    if (gain > 20) {
      return <TrendingUp className="w-4 h-4 text-green-400" />;
    } else if (gain < -20) {
      return <TrendingDown className="w-4 h-4 text-red-400" />;
    } else {
      return <Minus className="w-4 h-4 text-amber-400" />;
    }
  };

  const currentAttitude = attitudeHistory.length > 0 
    ? attitudeHistory[attitudeHistory.length - 1] 
    : null;

  // 计算当前总体态度
  const getOverallAttitude = () => {
    if (!currentAttitude) return { self: 50, opponent: 50 };
    return {
      self: currentAttitude.selfAttitude,
      opponent: currentAttitude.opponentAttitude
    };
  };

  const attitude = getOverallAttitude();

  // 获取势头显示
  const getMomentumDisplay = () => {
    switch (momentum) {
      case 'advancing':
        return { icon: <TrendingUp className="w-4 h-4 text-green-400" />, text: '进展顺利', color: 'text-green-400', bgColor: 'bg-green-500/20' };
      case 'stalled':
        return { icon: <Minus className="w-4 h-4 text-amber-400" />, text: '陷入僵持', color: 'text-amber-400', bgColor: 'bg-amber-500/20' };
      case 'reversing':
        return { icon: <TrendingDown className="w-4 h-4 text-red-400" />, text: '势头逆转', color: 'text-red-400', bgColor: 'bg-red-500/20' };
    }
  };

  const momentumDisplay = getMomentumDisplay();

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
      {/* 头部 */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center gap-2 mb-3">
          <Scale className="w-5 h-5 text-amber-400" />
          <h3 className="text-white font-medium">议程与进展</h3>
        </div>
        
        {/* 总体态度指示器 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-2 bg-slate-800/50 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-slate-500">己方态度</span>
              {getGainIndicator(attitude.self - 50)}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all bg-green-400"
                  style={{ width: `${attitude.self}%` }}
                />
              </div>
              <span className="text-xs text-white font-medium w-8 text-right">
                {attitude.self}%
              </span>
            </div>
          </div>
          
          <div className="p-2 bg-slate-800/50 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-slate-500">对方态度</span>
              {getGainIndicator(attitude.opponent - 50)}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all"
                  style={{ 
                    width: `${attitude.opponent}%`,
                    backgroundColor: attitude.opponent > 50 ? '#48BB78' : attitude.opponent > 30 ? '#ECC94B' : '#F56565'
                  }}
                />
              </div>
              <span className="text-xs text-white font-medium w-8 text-right">
                {attitude.opponent}%
              </span>
            </div>
          </div>
        </div>

        {/* 势头和突破可能性 */}
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className={`p-2 ${momentumDisplay.bgColor} rounded-lg border border-slate-700/30`}>
            <div className="flex items-center gap-1.5 mb-1">
              {momentumDisplay.icon}
              <span className="text-xs text-slate-400">谈判势头</span>
            </div>
            <p className={`text-sm font-medium ${momentumDisplay.color}`}>
              {momentumDisplay.text}
            </p>
          </div>
          
          <div className="p-2 bg-slate-800/50 rounded-lg border border-slate-700/30">
            <div className="flex items-center gap-1.5 mb-1">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-slate-400">突破可能</span>
            </div>
            <p className={`text-sm font-medium ${
              breakthroughChance > 60 ? 'text-green-400' : 
              breakthroughChance > 30 ? 'text-amber-400' : 'text-red-400'
            }`}>
              {breakthroughChance}%
            </p>
          </div>
        </div>

        {/* 对手分析（如果提供） */}
        {opponentAnalysis && (
          <div className="mt-3 p-2 bg-red-500/10 rounded-lg border border-red-500/20">
            <div className="flex items-center gap-1.5 mb-1">
              <Swords className="w-4 h-4 text-red-400" />
              <span className="text-xs text-slate-400">对手策略</span>
            </div>
            <p className="text-xs text-white">
              {opponentAnalysis.strategy || '观察中'}
              {opponentAnalysis.mood && (
                <span className="text-slate-400 ml-2">
                  ({opponentAnalysis.mood})
                </span>
              )}
            </p>
            {opponentAnalysis.opportunity && (
              <p className="text-xs text-green-400 mt-1">
                机会: {opponentAnalysis.opportunity}
              </p>
            )}
          </div>
        )}
      </div>

      {/* 议程列表 */}
      <div className="max-h-[300px] overflow-y-auto">
        {issues.map((issue, index) => {
          const result = issueResults[issue.id] || { status: 'pending', selfGain: 0, opponentGain: 0 };
          const isCurrent = index === currentIssueIndex;
          const isCompleted = result.status === 'agreed';
          const isExpanded = expandedIssue === issue.id;

          return (
            <div 
              key={issue.id}
              className={`border-b border-slate-700/30 last:border-b-0 ${isCurrent ? 'bg-blue-500/5' : ''}`}
            >
              {/* 议题行 */}
              <div 
                className="p-3 flex items-start gap-3 cursor-pointer hover:bg-slate-800/30 transition-colors"
                onClick={() => {
                  setExpandedIssue(isExpanded ? null : issue.id);
                  onIssueClick?.(issue.id);
                }}
              >
                {/* 状态图标 */}
                <div className="mt-0.5">
                  {getStatusIcon(result.status)}
                </div>

                {/* 议题信息 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">#{index + 1}</span>
                    <span className={`text-sm font-medium truncate ${
                      isCurrent ? 'text-blue-400' : isCompleted ? 'text-green-400' : 'text-white'
                    }`}>
                      {issue.title}
                    </span>
                    {isCurrent && (
                      <span className="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded">
                        当前
                      </span>
                    )}
                    {issue.importance >= 4 && (
                      <Target className="w-3 h-3 text-amber-400" />
                    )}
                  </div>

                  {/* 收益预览 */}
                  {(result.status === 'agreed' || result.status === 'discussing') && (
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-slate-500" />
                        <span className="text-xs text-slate-400">己:</span>
                        <span className={`text-xs font-medium ${
                          result.selfGain > 0 ? 'text-green-400' : result.selfGain < 0 ? 'text-red-400' : 'text-slate-400'
                        }`}>
                          {result.selfGain > 0 ? '+' : ''}{result.selfGain}%
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-slate-500" />
                        <span className="text-xs text-slate-400">对:</span>
                        <span className={`text-xs font-medium ${
                          result.opponentGain > 0 ? 'text-green-400' : result.opponentGain < 0 ? 'text-red-400' : 'text-slate-400'
                        }`}>
                          {result.opponentGain > 0 ? '+' : ''}{result.opponentGain}%
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 展开指示器 */}
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </div>

              {/* 展开详情 */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-3 pb-3 overflow-hidden"
                  >
                    <div className="p-3 bg-slate-800/30 rounded-lg space-y-2">
                      {/* 争议焦点 */}
                      <div>
                        <p className="text-xs text-slate-500 mb-1">争议焦点</p>
                        <p className="text-xs text-slate-300">{issue.controversy}</p>
                      </div>

                      {/* 双方立场 */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-2 bg-green-500/10 rounded border border-green-500/20">
                          <p className="text-xs text-green-400 mb-1">己方立场</p>
                          <p className="text-xs text-slate-300">{issue.selfPosition}</p>
                        </div>
                        <div className="p-2 bg-red-500/10 rounded border border-red-500/20">
                          <p className="text-xs text-red-400 mb-1">对方立场</p>
                          <p className="text-xs text-slate-300">{issue.opponentPosition}</p>
                        </div>
                      </div>

                      {/* 收益详情 */}
                      {result.status === 'agreed' && (
                        <div className="pt-2 border-t border-slate-700/50">
                          <p className="text-xs text-slate-500 mb-1">结果摘要</p>
                          <p className="text-xs text-slate-300">{result.summary || '双方达成一致'}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* 态度历史趋势 */}
      {attitudeHistory.length > 1 && (
        <div className="p-3 border-t border-slate-700/50">
          <p className="text-xs text-slate-500 mb-2">态度变化趋势</p>
          <div className="h-12 flex items-end gap-1">
            {attitudeHistory.slice(-8).map((record, index) => (
              <div 
                key={index}
                className="flex-1 flex flex-col gap-0.5"
              >
                {/* 己方态度柱 */}
                <div 
                  className="bg-green-400/60 rounded-t transition-all"
                  style={{ height: `${record.selfAttitude / 2}%` }}
                />
                {/* 对方态度柱 */}
                <div 
                  className="rounded-b transition-all"
                  style={{ 
                    height: `${record.opponentAttitude / 2}%`,
                    backgroundColor: record.opponentAttitude > 50 ? 'rgba(72, 187, 120, 0.6)' : record.opponentAttitude > 30 ? 'rgba(236, 201, 75, 0.6)' : 'rgba(245, 101, 101, 0.6)'
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-slate-500">早期</span>
            <span className="text-xs text-slate-500">近期</span>
          </div>
        </div>
      )}
    </div>
  );
}

// 辅助函数：获取状态标签
export function getStatusLabel(status: IssueResult['status']): string {
  switch (status) {
    case 'pending': return '待讨论';
    case 'discussing': return '讨论中';
    case 'agreed': return '已达成';
    case 'disputed': return '有争议';
    case 'deadlock': return '僵局';
    default: return '未知';
  }
}
