// 训练记录存储工具

import { TrainingRecord, TrainingRecordSummary } from '@/types/negotiation';

// 重新导出类型
export type { TrainingRecord, TrainingRecordSummary } from '@/types/negotiation';

const STORAGE_KEY = 'diplomatic-training-records';
const MAX_RECORDS = 100; // 最多保存100条记录

// 获取所有训练记录
export function getTrainingRecords(): TrainingRecord[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// 获取训练记录摘要列表
export function getTrainingRecordSummaries(): TrainingRecordSummary[] {
  const records = getTrainingRecords();
  return records.map(record => ({
    id: record.id,
    type: record.type,
    topic: record.topic,
    selfCountry: record.selfCountry,
    opponentCountry: record.opponentCountry,
    countriesCount: record.opponentCountries?.length,
    startTime: record.startTime,
    outcome: record.outcome,
    status: record.status,
  })).sort((a, b) => b.startTime - a.startTime); // 按时间倒序
}

// 保存训练记录
export function saveTrainingRecord(record: TrainingRecord): void {
  if (typeof window === 'undefined') return;
  
  const records = getTrainingRecords();
  
  // 检查是否已存在（更新）
  const existingIndex = records.findIndex(r => r.id === record.id);
  if (existingIndex >= 0) {
    records[existingIndex] = record;
  } else {
    // 添加到开头
    records.unshift(record);
  }
  
  // 限制数量
  if (records.length > MAX_RECORDS) {
    records.pop();
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

// 创建新训练记录
export function createTrainingRecord(
  type: 'bilateral' | 'multilateral',
  topic: string,
  topicCategory: string,
  selfCountry: string,
  opponentCountry: string,
  opponentCountries: string[] | undefined,
  difficulty: string,
  era?: string
): TrainingRecord {
  return {
    id: `training-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    topic,
    topicCategory,
    selfCountry,
    opponentCountry,
    opponentCountries,
    difficulty,
    era,
    startTime: Date.now(),
    status: 'in-progress',
  };
}

// 更新训练记录结果
export function completeTrainingRecord(
  id: string,
  outcome: number,
  outcomeLabel: string,
  rounds: number,
  summary?: string,
  keyDecisions?: string[],
  improvements?: string[]
): void {
  const records = getTrainingRecords();
  const record = records.find(r => r.id === id);
  
  if (record) {
    record.endTime = Date.now();
    record.duration = Math.floor((record.endTime - record.startTime) / 1000);
    record.outcome = outcome;
    record.outcomeLabel = outcomeLabel;
    record.rounds = rounds;
    record.status = 'completed';
    record.summary = summary;
    record.keyDecisions = keyDecisions;
    record.improvements = improvements;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }
}

// 废弃训练记录
export function abandonTrainingRecord(id: string): void {
  const records = getTrainingRecords();
  const record = records.find(r => r.id === id);
  
  if (record) {
    record.endTime = Date.now();
    record.duration = Math.floor((record.endTime - record.startTime) / 1000);
    record.status = 'abandoned';
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }
}

// 删除训练记录
export function deleteTrainingRecord(id: string): void {
  const records = getTrainingRecords();
  const filtered = records.filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

// 清空所有训练记录
export function clearAllTrainingRecords(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}

// 获取训练统计数据
export function getTrainingStats(): {
  totalCount: number;
  completedCount: number;
  abandonedCount: number;
  inProgressCount: number;
  averageOutcome: number;
  totalTrainingTime: number; // 秒
  recentCount: number; // 最近7天的训练次数
} {
  const records = getTrainingRecords();
  
  const now = Date.now();
  const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
  
  const completed = records.filter(r => r.status === 'completed');
  const outcomes = completed.map(r => r.outcome || 0).filter(o => o !== undefined);
  
  return {
    totalCount: records.length,
    completedCount: completed.length,
    abandonedCount: records.filter(r => r.status === 'abandoned').length,
    inProgressCount: records.filter(r => r.status === 'in-progress').length,
    averageOutcome: outcomes.length > 0 
      ? Math.round(outcomes.reduce((a, b) => a + b, 0) / outcomes.length) 
      : 0,
    totalTrainingTime: records.reduce((sum, r) => sum + (r.duration || 0), 0),
    recentCount: records.filter(r => r.startTime > sevenDaysAgo).length,
  };
}

// 格式化时长
export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}秒`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}分`;
  return `${Math.floor(seconds / 3600)}小时${Math.floor((seconds % 3600) / 60)}分`;
}

// 格式化时间
export function formatRecordTime(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - timestamp;
  
  if (diff < 60000) return '刚刚';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`;
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}天前`;
  
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// 获取结果标签
export function getOutcomeLabel(outcome: number): string {
  if (outcome >= 70) return '完美达成';
  if (outcome >= 40) return '较好结果';
  if (outcome >= 0) return '基本持平';
  if (outcome >= -40) return '略有损失';
  return '严重失利';
}

// 获取结果颜色
export function getOutcomeColor(outcome: number): string {
  if (outcome >= 60) return 'text-green-400';
  if (outcome >= 20) return 'text-emerald-400';
  if (outcome >= -20) return 'text-yellow-400';
  if (outcome >= -60) return 'text-orange-400';
  return 'text-red-400';
}
