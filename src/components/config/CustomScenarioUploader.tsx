'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  X, 
  File, 
  Check, 
  AlertCircle,
  Sparkles,
  Loader2
} from 'lucide-react';

interface CustomScenario {
  title: string;
  description: string;
  timePeriod: string;
  parties: {
    self: string;
    opponent: string;
  };
  context: string;
  keyIssues: string[];
  background?: string;
}

interface CustomScenarioUploaderProps {
  onUpload: (scenario: CustomScenario) => void;
  onCancel: () => void;
}

export default function CustomScenarioUploader({ onUpload, onCancel }: CustomScenarioUploaderProps) {
  const [step, setStep] = useState<'upload' | 'edit' | 'confirm'>('upload');
  const [uploadedContent, setUploadedContent] = useState<string>('');
  const [parsedScenario, setParsedScenario] = useState<CustomScenario | null>(null);
  const [editedScenario, setEditedScenario] = useState<CustomScenario | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    setError('');
    setIsProcessing(true);
    
    try {
      const text = await file.text();
      setUploadedContent(text);
      await processContent(text);
    } catch (err) {
      setError('文件读取失败，请重试');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTextSubmit = async () => {
    if (!uploadedContent.trim()) {
      setError('请输入场景内容');
      return;
    }
    setError('');
    setIsProcessing(true);
    
    try {
      await processContent(uploadedContent);
    } catch (err) {
      setError('内容处理失败，请重试');
    } finally {
      setIsProcessing(false);
    }
  };

  const processContent = async (content: string) => {
    // 简单的文本解析（实际应用中会调用AI进行智能解析）
    const lines = content.split('\n').filter(l => l.trim());
    
    // 尝试提取标题
    let title = '自定义场景';
    let description = '';
    let timePeriod = '现代';
    let selfParty = '中国';
    let opponentParty = '对方国家';
    let context = content;
    let keyIssues: string[] = [];
    let background = '';

    // 简单规则匹配
    if (lines.length > 0) {
      // 第一行通常是标题
      title = lines[0].replace(/^#+\s*/, '').trim() || title;
    }

    // 查找关键词
    if (content.includes('冷战') || content.includes('1960') || content.includes('1970')) {
      timePeriod = '冷战时期';
    } else if (content.includes('二战') || content.includes('1939') || content.includes('1945')) {
      timePeriod = '二战时期';
    } else if (content.includes('火星') || content.includes('太空') || content.includes('星际')) {
      timePeriod = '未来/科幻';
    }

    // 查找当事方
    const partyMatches = content.match(/(?:中国|美国|俄罗斯|英国|法国|德国|日本|韩国|越南|菲律宾|印度|印尼|马来西亚|泰国|新加坡|欧盟|东盟)/g);
    if (partyMatches && partyMatches.length >= 2) {
      selfParty = partyMatches[0];
      opponentParty = partyMatches[1];
    }

    // 提取关键议题（从"议题"、"问题"、"争议"等关键词附近提取）
    const issueMatches = content.match(/[议题问题争议主题][：:]\s*([^\n]+)/gi);
    if (issueMatches) {
      keyIssues = issueMatches.map(m => m.replace(/[议题问题争议主题][：:]\s*/i, '').trim());
    }

    // 提取背景
    const bgMatches = content.match(/背景[：:]([^$]+)/i);
    if (bgMatches) {
      background = bgMatches[1].trim();
    }

    const scenario: CustomScenario = {
      title,
      description: description || `涉及${selfParty}与${opponentParty}的谈判场景`,
      timePeriod,
      parties: {
        self: selfParty,
        opponent: opponentParty,
      },
      context,
      keyIssues: keyIssues.length > 0 ? keyIssues : ['主权争议', '利益平衡', '解决方案'],
      background,
    };

    setParsedScenario(scenario);
    setEditedScenario(scenario);
    setStep('edit');
  };

  const handleConfirm = () => {
    if (editedScenario) {
      onUpload(editedScenario);
    }
  };

  const updateField = (field: string, value: string | string[] | object) => {
    if (editedScenario) {
      if (field.startsWith('parties.')) {
        const partyField = field.replace('parties.', '');
        setEditedScenario({
          ...editedScenario,
          parties: {
            ...editedScenario.parties,
            [partyField]: value,
          },
        });
      } else {
        setEditedScenario({
          ...editedScenario,
          [field]: value,
        });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 max-w-2xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">上传自定义场景</h3>
            <p className="text-xs text-slate-400">创建虚构或历史场景</p>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {step === 'upload' && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* 文件上传区域 */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                dragActive
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-slate-600 hover:border-slate-500'
              }`}
            >
              <Upload className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400 mb-2">拖拽文件到此处，或点击选择</p>
              <p className="text-xs text-slate-500 mb-4">支持 .txt, .md, .doc, .docx 格式</p>
              <input
                type="file"
                accept=".txt,.md,.doc,.docx"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg cursor-pointer hover:bg-purple-500/30 transition-colors"
              >
                <File className="w-4 h-4" />
                选择文件
              </label>
            </div>

            {/* 文本输入 */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-slate-900 text-xs text-slate-500">或直接输入</span>
              </div>
            </div>

            <textarea
              value={uploadedContent}
              onChange={(e) => setUploadedContent(e.target.value)}
              placeholder="粘贴或输入场景描述...

例如：
标题：南海虚构谈判
背景：2150年，火星联盟与地球联合政府就火星资源开发权进行谈判...
当事方：中国 vs 菲律宾
议题：专属经济区划定、历史性权利
时间：冷战时期/现代/未来"
              className="w-full h-48 bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-slate-300 placeholder-slate-500 resize-none focus:outline-none focus:border-purple-500"
            />

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleTextSubmit}
                disabled={!uploadedContent.trim() || isProcessing}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    处理中...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    解析场景
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {step === 'edit' && editedScenario && (
          <motion.div
            key="edit"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 text-green-400 text-sm mb-4">
              <Check className="w-4 h-4" />
              场景已解析，请确认或修改以下信息
            </div>

            <div className="grid gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">场景标题</label>
                <input
                  type="text"
                  value={editedScenario.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">时间背景</label>
                  <select
                    value={editedScenario.timePeriod}
                    onChange={(e) => updateField('timePeriod', e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="现代">现代</option>
                    <option value="冷战时期">冷战时期</option>
                    <option value="二战时期">二战时期</option>
                    <option value="古代/中世纪">古代/中世纪</option>
                    <option value="未来/科幻">未来/科幻</option>
                    <option value="其他历史时期">其他历史时期</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">场景描述</label>
                  <input
                    type="text"
                    value={editedScenario.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">己方代表</label>
                  <input
                    type="text"
                    value={editedScenario.parties.self}
                    onChange={(e) => updateField('parties.self', e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">对方代表</label>
                  <input
                    type="text"
                    value={editedScenario.parties.opponent}
                    onChange={(e) => updateField('parties.opponent', e.target.value)}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">关键议题</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editedScenario.keyIssues.map((issue, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-slate-700 text-slate-300 text-sm rounded"
                    >
                      {issue}
                      <button
                        onClick={() => updateField('keyIssues', editedScenario.keyIssues.filter((_, idx) => idx !== i))}
                        className="text-slate-500 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="输入新议题后按回车添加"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      updateField('keyIssues', [...editedScenario.keyIssues, e.currentTarget.value.trim()]);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">详细背景</label>
                <textarea
                  value={editedScenario.context}
                  onChange={(e) => updateField('context', e.target.value)}
                  className="w-full h-32 bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white resize-none focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setStep('upload')}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                重新上传
              </button>
              <button
                onClick={handleConfirm}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                确认并使用此场景
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
