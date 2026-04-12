'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AssistantMessage } from '@/types/negotiation';
import { 
  HelpCircle, 
  BookOpen, 
  Lightbulb, 
  MessageCircle,
  Sparkles,
  Target,
  Scale,
  X,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Compass,
  Info
} from 'lucide-react';

interface NegotiationContext {
  topic?: string;
  userCountry?: string;
  opponentCountry?: string;
  difficulty?: 'easy' | 'medium' | 'hard' | 'beginner' | 'intermediate' | 'professional';
  roundNumber?: number;
  outcomePrediction?: number;
  userAttitude?: number;
  opponentAttitude?: number;
}

interface AIAssistantProps {
  messages: AssistantMessage[];
  currentPhase: 'welcome' | 'config' | 'negotiating' | 'analysis';
  isExpanded: boolean;
  onToggle: () => void;
  onSendMessage?: (message: string) => void;
  context?: NegotiationContext;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  response: string;
  analysis?: string;
}

// 根据阶段和上下文生成智能建议
function generateSmartSuggestions(context: NegotiationContext, phase: string): QuickAction[] {
  const suggestions: QuickAction[] = [];
  
  // 欢迎/配置阶段
  if (phase === 'welcome' || phase === 'config') {
    suggestions.push({
      id: 'guide',
      label: '使用指南',
      icon: <Compass className="w-4 h-4" />,
      response: '欢迎使用外交模拟谈判系统！我是你的AI助手。我可以帮你：\n\n1. **谈判准备** - 了解谈判主题和策略\n2. **实时指导** - 在谈判中提供建议\n3. **局势分析** - 分析当前谈判态势\n4. **结果复盘** - 总结谈判经验教训\n\n有什么我可以帮你的吗？',
      analysis: '新手用户引导'
    });
    suggestions.push({
      id: 'topic-help',
      label: '主题选择建议',
      icon: <Info className="w-4 h-4" />,
      response: '目前支持以下谈判主题：\n\n📊 **贸易协定** - 关税、市场准入、知识产权\n🛡️ **安全合作** - 军事合作、反恐、边境安全\n🌍 **环境与气候** - 碳排放、能源转型\n🤝 **多边合作** - 国际组织、区域合作\n💰 **发展援助** - 贷款、基础设施建设\n\n选择主题时请考虑你的国家利益和谈判目标。',
      analysis: '主题选择指导'
    });
    suggestions.push({
      id: 'strategy-basics',
      label: '基础策略',
      icon: <BookOpen className="w-4 h-4" />,
      response: '外交谈判基础策略：\n\n1. **充分准备** - 了解对方底线和核心利益\n2. **建立信任** - 从共识点入手\n3. **保持灵活** - 准备多个替代方案\n4. **控制节奏** - 不要急于求成\n5. **记录要点** - 及时总结进展\n\n记住：最好的谈判是双方都有收获。',
      analysis: '谈判基础教学'
    });
  }
  
  // 谈判阶段
  if (phase === 'negotiating') {
    // 基于难度提供不同建议
    const isBeginner = context.difficulty === 'easy' || context.difficulty === 'beginner';
    
    suggestions.push({
      id: 'situation-analysis',
      label: '局势分析',
      icon: <TrendingUp className="w-4 h-4" />,
      response: context.topic ? 
        `当前谈判局势分析：\n\n📌 **主题**: ${context.topic}\n🏛️ **你的立场**: ${context.userCountry || '待定'}\n🤝 **对方立场**: ${context.opponentCountry || '待定'}\n📊 **当前预期**: ${getPredictionLabel(context.outcomePrediction)}\n\n💡 **建议**: ${getContextualAdvice(context)}` :
        '请先完成谈判配置，系统将为你提供详细的局势分析。',
      analysis: '基于当前谈判上下文的情境分析'
    });
    
    suggestions.push({
      id: 'quick-tip',
      label: '快速提示',
      icon: <Lightbulb className="w-4 h-4" />,
      response: isBeginner ?
        `🎯 **新手提示**:\n\n1. 仔细阅读对方的回复\n2. 先回应对方的关切\n3. 提出具体建议而非模糊表态\n4. 保持友好但坚定的态度\n\n这是练习的好机会，不要有压力！` :
        `💡 **专业提示**:\n\n1. 注意对方的暗示和潜台词\n2. 适时提出交换条件\n3. 掌控谈判议程\n4. 为可能的僵局准备B方案`,
      analysis: '针对当前难度的策略提示'
    });
    
    suggestions.push({
      id: 'attitude-check',
      label: '态度评估',
      icon: <Scale className="w-4 h-4" />,
      response: `态度评估:\n\n😊 **你的态度**: ${getAttitudeLabel(context.userAttitude)}\n😐 **对方态度**: ${getAttitudeLabel(context.opponentAttitude)}\n\n${getAttitudeAdvice(context)}`,
      analysis: '双方态度对比分析'
    });
    
    suggestions.push({
      id: 'risk-warning',
      label: '风险提示',
      icon: <AlertTriangle className="w-4 h-4" />,
      response: `⚠️ **风险提示**:\n\n${getRiskWarnings(context)}\n\n请谨慎做出决策，必要时可以暂停谈判重新评估。`,
      analysis: '识别潜在风险'
    });
  }
  
  // 分析阶段
  if (phase === 'analysis') {
    suggestions.push({
      id: 'result-summary',
      label: '结果总结',
      icon: <CheckCircle className="w-4 h-4" />,
      response: '谈判结果分析将帮助你：\n\n📊 评估谈判成效\n💡 识别改进空间\n📚 积累经验教训\n🎯 优化未来策略\n\n请查看上方的详细分析报告。',
      analysis: '结果复盘引导'
    });
    suggestions.push({
      id: 'learning-points',
      label: '学习要点',
      icon: <BookOpen className="w-4 h-4" />,
      response: '📚 **关键学习要点**:\n\n1. 谈判策略的选择与执行\n2. 对方立场的理解与分析\n3. 利益交换的技巧\n4. 维护核心利益的决心\n\n每次谈判都是学习的机会！',
      analysis: '提炼核心学习点'
    });
  }
  
  return suggestions;
}

function getPredictionLabel(prediction?: number): string {
  if (prediction === undefined) return '待评估';
  if (prediction >= 70) return '非常有利';
  if (prediction >= 40) return '略有利';
  if (prediction >= 0) return '持平';
  if (prediction >= -40) return '略不利';
  return '不利';
}

function getAttitudeLabel(attitude?: number): string {
  if (attitude === undefined) return '待评估';
  if (attitude >= 60) return '友好积极';
  if (attitude >= 20) return '相对友好';
  if (attitude >= -20) return '中性观望';
  if (attitude >= -60) return '相对冷淡';
  return '态度消极';
}

function getAttitudeAdvice(context: NegotiationContext): string {
  const userAtt = context.userAttitude || 0;
  const oppAtt = context.opponentAttitude || 0;
  const diff = userAtt - oppAtt;
  
  if (diff > 30) {
    return '你处于优势地位，可以适当推进议题，但要注意维护对方面子。';
  }
  if (diff < -30) {
    return '对方态度更积极，可以顺势建立信任，推进合作。';
  }
  return '双方态度相近，建议寻求共同利益点，逐步建立信任。';
}

function getContextualAdvice(context: NegotiationContext): string {
  const prediction = context.outcomePrediction || 0;
  
  if (prediction >= 50) {
    return '局势对你有利，可以稳步推进，注意保持谈判成果。';
  }
  if (prediction >= 20) {
    return '局势相对有利，可以积极寻求突破，但要准备让步筹码。';
  }
  if (prediction >= -20) {
    return '局势胶着，建议从共同利益出发，寻找突破口。';
  }
  if (prediction >= -50) {
    return '局势不利，可以考虑调整策略或重新评估目标。';
  }
  return '局势严峻，建议暂停反思，必要时可考虑退出谈判。';
}

function getRiskWarnings(context: NegotiationContext): string {
  const warnings: string[] = [];
  
  if ((context.outcomePrediction || 0) < -30) {
    warnings.push('• 预期结果不佳，可能需要重新评估谈判策略');
  }
  if ((context.opponentAttitude || 0) < -40) {
    warnings.push('• 对方态度消极，存在谈判破裂风险');
  }
  if ((context.userAttitude || 0) < -40) {
    warnings.push('• 你的立场可能过于强硬，建议调整态度');
  }
  if (context.roundNumber && context.roundNumber > 5) {
    warnings.push('• 谈判持续较长，注意控制时间和节奏');
  }
  
  if (warnings.length === 0) {
    return '当前局势稳定，未检测到明显风险。继续保持良好节奏！';
  }
  
  return warnings.join('\n');
}

export default function AIAssistant({
  messages,
  currentPhase,
  isExpanded,
  onToggle,
  onSendMessage,
  context = {},
}: AIAssistantProps) {
  // 客户端渲染状态
  const [isMounted, setIsMounted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [activeQuickAction, setActiveQuickAction] = useState<QuickAction | null>(null);

  // 挂载后设置状态
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const phaseLabels = {
    welcome: '在线',
    config: '配置中',
    negotiating: '谈判中',
    analysis: '已完成',
  };

  const phaseColors = {
    welcome: '#C9A962',
    config: '#4A90A4',
    negotiating: '#48BB78',
    analysis: '#9F7AEA',
  };

  // 根据阶段和上下文动态生成快捷操作
  const quickActions = useMemo(() => generateSmartSuggestions(context, currentPhase), [context, currentPhase]);

  const actions = quickActions;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleQuickAction = (action: QuickAction) => {
    setActiveQuickAction(action);
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSend = () => {
    if (inputValue.trim() && onSendMessage) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  // 服务端渲染或未挂载时返回占位符
  if (!isMounted) {
    return (
      <div 
        className="fixed bottom-6 right-6 z-50"
        style={{ visibility: 'hidden' }}
      />
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* 悬浮灯泡按钮 */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={onToggle}
            className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* 外部发光效果 */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: phaseColors[currentPhase] }}
              animate={{
                boxShadow: [
                  `0 0 20px ${phaseColors[currentPhase]}40`,
                  `0 0 40px ${phaseColors[currentPhase]}60`,
                  `0 0 20px ${phaseColors[currentPhase]}40`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* 灯泡图标带光效 */}
            <div className="relative z-10">
              {/* 内部光晕 */}
              <div 
                className="absolute inset-0 rounded-full blur-md"
                style={{ backgroundColor: phaseColors[currentPhase], opacity: 0.5 }}
              />
              {/* 灯泡 */}
              <Lightbulb 
                className="w-8 h-8 text-white relative" 
                style={{ 
                  filter: `drop-shadow(0 0 8px ${phaseColors[currentPhase]}) drop-shadow(0 0 16px ${phaseColors[currentPhase]}80)`
                }}
              />
            </div>
            
            {/* 消息通知 */}
            {messages.length > 1 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center z-10"
              >
                <span className="text-white text-xs font-bold">{Math.min(messages.length - 1, 9)}</span>
              </motion.div>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* 展开面板 */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[400px] bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden"
          >
            {/* 头部 - 可拖拽区域 */}
            <div
              className="px-5 py-4 flex items-center gap-3 select-none"
              style={{ backgroundColor: `${phaseColors[currentPhase]}20` }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: phaseColors[currentPhase] }}
              >
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg">AI 助手</h3>
                <p className="text-slate-400 text-xs">{phaseLabels[currentPhase]}</p>
              </div>
              <button
                onClick={onToggle}
                className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 快捷操作 */}
            {currentPhase !== 'analysis' && actions.length > 0 && (
              <div className="px-4 pt-4">
                <p className="text-xs text-slate-500 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  快捷操作
                </p>
                <div className="flex flex-wrap gap-2">
                  {actions.map((action) => (
                    <motion.button
                      key={action.id}
                      onClick={() => handleQuickAction(action)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs rounded-lg transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {action.icon}
                      {action.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* 消息列表 */}
            <div className="h-72 overflow-y-auto p-4 space-y-4">
              {/* 欢迎消息 */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: phaseColors.welcome }}
                >
                  <Lightbulb className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 bg-slate-800 rounded-2xl rounded-tl-sm px-4 py-3">
                  <p className="text-sm text-slate-100 leading-relaxed">
                    嗨！我是您的外交谈判AI助手。有什么我可以帮您的吗？
                  </p>
                </div>
              </motion.div>

              {messages.slice(-5).map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.role === 'assistant' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                >
                  {msg.role === 'assistant' && (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-2"
                      style={{ backgroundColor: phaseColors[currentPhase] }}
                    >
                      <Lightbulb className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      msg.role === 'assistant'
                        ? 'bg-slate-800 text-slate-100 rounded-tl-sm'
                        : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-tr-sm'
                    }`}
                  >
                    {msg.isTyping ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-400">思考中</span>
                        <motion.span
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="text-amber-400"
                        >
                          ...
                        </motion.span>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
                        <span className="text-xs opacity-60 mt-1 block">
                          {new Date(msg.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {/* 快捷操作响应 */}
              {activeQuickAction && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: phaseColors[currentPhase] }}
                  >
                    <Lightbulb className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 bg-slate-800 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {activeQuickAction.label}
                      </div>
                    </div>
                    <p className="text-sm text-slate-100 leading-relaxed whitespace-pre-line">{activeQuickAction.response}</p>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* 输入框 */}
            {(currentPhase === 'config' || currentPhase === 'welcome') && (
              <div className="p-4 border-t border-slate-700/50">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="问我任何问题..."
                    className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-600 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
                  />
                  <motion.button
                    onClick={handleSend}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white rounded-xl transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            )}
            
            {/* 谈判阶段提示 */}
            {currentPhase === 'negotiating' && (
              <div className="p-4 border-t border-slate-700/50">
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-800/50 rounded-lg p-3">
                  <MessageCircle className="w-4 h-4 text-amber-400" />
                  <span>谈判中请参考右侧面板获取策略建议</span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
