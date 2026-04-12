'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  History, 
  Trophy, 
  Clock, 
  Trash2, 
  ChevronRight,
  Users,
  MessageSquare,
  Filter,
  Calendar,
  Target,
  Zap,
  X,
  Play,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { 
  TrainingRecord,
  getTrainingRecords, 
  deleteTrainingRecord, 
  clearAllTrainingRecords,
  getTrainingStats,
  formatRecordTime,
  formatDuration,
  getOutcomeLabel,
  getOutcomeColor
} from '@/lib/training-records';

type FilterType = 'all' | 'bilateral' | 'multilateral' | 'completed' | 'in-progress';
type SortType = 'time' | 'outcome';

export default function HistoryPage() {
  const router = useRouter();
  const [records, setRecords] = useState<TrainingRecord[]>([]);
  const [stats, setStats] = useState({
    totalCount: 0,
    completedCount: 0,
    averageOutcome: 0,
    totalTrainingTime: 0,
    recentCount: 0,
  });
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('time');
  const [selectedRecord, setSelectedRecord] = useState<TrainingRecord | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // 加载数据
  const loadData = () => {
    setRecords(getTrainingRecords());
    setStats(getTrainingStats());
  };

  useEffect(() => {
    loadData();
  }, []);

  // 过滤和排序记录
  const filteredRecords = records
    .filter(record => {
      if (filter === 'all') return true;
      if (filter === 'bilateral') return record.type === 'bilateral';
      if (filter === 'multilateral') return record.type === 'multilateral';
      if (filter === 'completed') return record.status === 'completed';
      if (filter === 'in-progress') return record.status === 'in-progress';
      return true;
    })
    .sort((a, b) => {
      if (sort === 'time') return b.startTime - a.startTime;
      if (sort === 'outcome') return (b.outcome || 0) - (a.outcome || 0);
      return 0;
    });

  const handleDelete = (id: string) => {
    deleteTrainingRecord(id);
    loadData();
  };

  const handleClearAll = () => {
    clearAllTrainingRecords();
    loadData();
    setShowClearConfirm(false);
  };

  const handleContinue = (record: TrainingRecord) => {
    // 如果是进行中的记录，可以继续
    if (record.status === 'in-progress') {
      if (record.type === 'bilateral') {
        router.push('/configure');
      } else {
        router.push('/multilateral/config');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* 导航栏 */}
      <nav className="relative z-10 border-b border-slate-800/50 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                返回首页
              </Link>
              <div className="h-6 w-px bg-slate-700" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                  <History className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">训练记录</span>
              </div>
            </div>
            
            {records.length > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                清空全部
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* 主内容 */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        {/* 统计卡片 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50"
          >
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-amber-400" />
              <span className="text-sm text-slate-400">总训练次数</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.totalCount}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-5 bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50"
          >
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-5 h-5 text-green-400" />
              <span className="text-sm text-slate-400">已完成</span>
            </div>
            <p className="text-3xl font-bold text-green-400">{stats.completedCount}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-5 bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50"
          >
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-slate-400">平均结果</span>
            </div>
            <p className={`text-3xl font-bold ${stats.averageOutcome >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.averageOutcome > 0 ? '+' : ''}{stats.averageOutcome}%
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-5 bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50"
          >
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-slate-400">累计时长</span>
            </div>
            <p className="text-3xl font-bold text-white">
              {formatDuration(stats.totalTrainingTime)}
            </p>
          </motion.div>
        </div>

        {/* 筛选和排序 */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-sm text-slate-400">筛选:</span>
            <div className="flex gap-2">
              {[
                { value: 'all', label: '全部' },
                { value: 'bilateral', label: '双边' },
                { value: 'multilateral', label: '多边' },
                { value: 'completed', label: '已完成' },
                { value: 'in-progress', label: '进行中' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setFilter(opt.value as FilterType)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    filter === opt.value
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-slate-600'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">排序:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortType)}
              className="px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white text-sm focus:outline-none focus:border-amber-500/50"
            >
              <option value="time">按时间</option>
              <option value="outcome">按结果</option>
            </select>
          </div>
        </div>

        {/* 记录列表 */}
        {filteredRecords.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-800/50 flex items-center justify-center">
              <History className="w-10 h-10 text-slate-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {filter === 'all' ? '暂无训练记录' : '没有符合条件的记录'}
            </h3>
            <p className="text-slate-400 mb-6">
              {filter === 'all' ? '开始你的第一次外交谈判训练吧！' : '尝试调整筛选条件'}
            </p>
            <Link
              href="/configure"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all"
            >
              <Play className="w-5 h-5" />
              开始训练
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredRecords.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-5 bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-slate-600/50 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  {/* 类型标识 */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    record.type === 'multilateral' 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {record.type === 'multilateral' ? (
                      <Users className="w-7 h-7" />
                    ) : (
                      <MessageSquare className="w-7 h-7" />
                    )}
                  </div>

                  {/* 记录信息 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white truncate">{record.topic}</h3>
                      <span className={`px-2.5 py-0.5 text-xs rounded-full flex-shrink-0 ${
                        record.status === 'completed' 
                          ? 'bg-green-500/20 text-green-400' 
                          : record.status === 'in-progress'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-slate-500/20 text-slate-400'
                      }`}>
                        {record.status === 'completed' ? '已完成' : record.status === 'in-progress' ? '进行中' : '已放弃'}
                      </span>
                      <span className={`px-2 py-0.5 text-xs rounded-full bg-slate-700/50 text-slate-400 flex-shrink-0`}>
                        {record.difficulty}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400 mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {formatRecordTime(record.startTime)}
                      </span>
                      <span>{record.selfCountry}</span>
                      <ChevronRight className="w-4 h-4" />
                      <span>
                        {record.type === 'multilateral' 
                          ? `${record.opponentCountries?.length || 0}国多边`
                          : record.opponentCountry}
                      </span>
                      {record.duration && (
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {formatDuration(record.duration)}
                        </span>
                      )}
                      {record.rounds && (
                        <span>{record.rounds}轮</span>
                      )}
                    </div>

                    {/* 额外信息 */}
                    {record.outcome !== undefined && (
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                        record.outcome >= 0 ? 'bg-green-500/10' : 'bg-red-500/10'
                      }`}>
                        <span className={`text-lg font-bold ${getOutcomeColor(record.outcome)}`}>
                          {record.outcome > 0 ? '+' : ''}{record.outcome}%
                        </span>
                        <span className={`text-sm ${getOutcomeColor(record.outcome)}`}>
                          {getOutcomeLabel(record.outcome)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {record.status === 'in-progress' && (
                      <button
                        onClick={() => handleContinue(record)}
                        className="p-2.5 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors"
                        title="继续训练"
                      >
                        <Play className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedRecord(record)}
                      className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
                      title="查看详情"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(record.id)}
                      className="p-2.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      title="删除记录"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* 记录数量提示 */}
        {filteredRecords.length > 0 && (
          <p className="text-center text-slate-500 text-sm mt-6">
            共 {filteredRecords.length} 条记录（最多保存 100 条）
          </p>
        )}
      </main>

      {/* 详情弹窗 */}
      {selectedRecord && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedRecord(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-2xl bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedRecord.type === 'multilateral' 
                      ? 'bg-blue-500/20 text-blue-400' 
                      : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {selectedRecord.type === 'multilateral' ? (
                      <Users className="w-6 h-6" />
                    ) : (
                      <MessageSquare className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{selectedRecord.topic}</h3>
                    <p className="text-sm text-slate-400">{selectedRecord.topicCategory}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* 基本信息 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-800/50 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">己方</p>
                  <p className="text-white font-medium">{selectedRecord.selfCountry}</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">
                    {selectedRecord.type === 'multilateral' ? '参与国' : '对方'}
                  </p>
                  <p className="text-white font-medium">
                    {selectedRecord.type === 'multilateral' 
                      ? `${selectedRecord.opponentCountries?.join('、') || ''}`
                      : selectedRecord.opponentCountry}
                  </p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">难度</p>
                  <p className="text-white font-medium capitalize">{selectedRecord.difficulty}</p>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">时长</p>
                  <p className="text-white font-medium">
                    {selectedRecord.duration ? formatDuration(selectedRecord.duration) : '未知'}
                  </p>
                </div>
              </div>

              {/* 结果 */}
              {selectedRecord.outcome !== undefined && (
                <div className={`p-4 rounded-xl ${
                  selectedRecord.outcome >= 0 ? 'bg-green-500/10' : 'bg-red-500/10'
                }`}>
                  <p className="text-sm text-slate-400 mb-2">最终结果</p>
                  <div className="flex items-center gap-4">
                    <span className={`text-4xl font-bold ${getOutcomeColor(selectedRecord.outcome)}`}>
                      {selectedRecord.outcome > 0 ? '+' : ''}{selectedRecord.outcome}%
                    </span>
                    <div>
                      <p className={`text-lg font-semibold ${getOutcomeColor(selectedRecord.outcome)}`}>
                        {selectedRecord.outcomeLabel || getOutcomeLabel(selectedRecord.outcome)}
                      </p>
                      {selectedRecord.rounds && (
                        <p className="text-sm text-slate-400">共 {selectedRecord.rounds} 轮谈判</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* 总结 */}
              {selectedRecord.summary && (
                <div>
                  <p className="text-sm text-slate-400 mb-2">训练总结</p>
                  <p className="text-slate-300">{selectedRecord.summary}</p>
                </div>
              )}

              {/* 关键决策 */}
              {selectedRecord.keyDecisions && selectedRecord.keyDecisions.length > 0 && (
                <div>
                  <p className="text-sm text-slate-400 mb-2">关键决策</p>
                  <ul className="space-y-2">
                    {selectedRecord.keyDecisions.map((decision, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300">
                        <span className="w-1.5 h-1.5 mt-2 rounded-full bg-amber-400 flex-shrink-0" />
                        {decision}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 改进建议 */}
              {selectedRecord.improvements && selectedRecord.improvements.length > 0 && (
                <div>
                  <p className="text-sm text-slate-400 mb-2">改进建议</p>
                  <ul className="space-y-2">
                    {selectedRecord.improvements.map((improvement, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-300">
                        <span className="w-1.5 h-1.5 mt-2 rounded-full bg-green-400 flex-shrink-0" />
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-slate-700/50 flex justify-end gap-3">
              {selectedRecord.status === 'in-progress' && (
                <Link
                  href={selectedRecord.type === 'bilateral' ? '/configure' : '/multilateral/config'}
                  className="px-5 py-2.5 bg-blue-500 hover:bg-blue-400 text-white font-medium rounded-xl transition-colors flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  继续训练
                </Link>
              )}
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
              >
                关闭
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* 确认清空弹窗 */}
      {showClearConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowClearConfirm(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-md bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">确认清空</h3>
                <p className="text-sm text-slate-400">此操作不可恢复</p>
              </div>
            </div>
            <p className="text-slate-300 mb-6">
              确定要清空所有 {records.length} 条训练记录吗？清空后将无法恢复。
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleClearAll}
                className="px-5 py-2.5 bg-red-500 hover:bg-red-400 text-white font-medium rounded-xl transition-colors"
              >
                确认清空
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
