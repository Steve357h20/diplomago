'use client';

import { completeTrainingRecord, createTrainingRecord, getOutcomeLabel } from '@/lib/training-records';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import NegotiationBubble from '@/components/negotiation/NegotiationBubble';
import AgendaIndicator from '@/components/negotiation/AgendaIndicator';
import CameraPanel from '@/components/sentiment/CameraPanel';
import AIAssistant from '@/components/ai-assistant/AIAssistant';
import { 
  Message, 
  NegotiationContext, 
  AssistantMessage, 
  SentimentData, 
  BilateralDifficulty,
  NegotiationIssue,
  NegotiationGoals,
  HistoricalEra
} from '@/types/negotiation';
import { 
  MessageSquare, 
  Zap, 
  Scale, 
  TrendingUp, 
  ChevronRight, 
  Lightbulb,
  Volume2,
  Target,
  RefreshCw,
  Languages,
  CheckCircle2,
  Play,
  Pause,
  SkipForward,
  List,
  Bot,
  User
} from 'lucide-react';

interface ResponseOption {
  id: string;
  text: string;
  tone: 'diplomatic' | 'assertive' | 'conciliatory' | 'strategic';
  angle: 'principles' | 'interests' | 'emotions' | 'compromise';
  languageStyle: string;
  analysis?: string;
}

interface LanguageAnalysis {
  technique: string;
  meaning: string;
  effect: string;
  improvement?: string;
}

interface IssueResult {
  status: 'pending' | 'discussing' | 'agreed' | 'disputed' | 'deadlock';
  selfGain: number;
  opponentGain: number;
  summary?: string;
}

interface AttitudeRecord {
  turn: number;
  selfAttitude: number;
  opponentAttitude: number;
  topic?: string;
  timestamp: number;
}

export default function NegotiatePage() {
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [assistantMessages, setAssistantMessages] = useState<AssistantMessage[]>([]);
  const [isAssistantExpanded, setIsAssistantExpanded] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [currentSentiment, setCurrentSentiment] = useState<SentimentData | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [isGeneratingOptions, setIsGeneratingOptions] = useState(false);
  const [outcomePrediction, _setOutcomePrediction] = useState(50);
  const [turnCount, setTurnCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<ResponseOption | null>(null);
  const [responseOptions, setResponseOptions] = useState<ResponseOption[]>([]);
  const [languageAnalysis, setLanguageAnalysis] = useState<LanguageAnalysis | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showAgenda, setShowAgenda] = useState(true);
  
  // 新手模式状态
  const [isAIMode, setIsAIMode] = useState(false);  // 是否处于AI自动对话模式
  const [aiProgress, setAiProgress] = useState(0);  // AI对话进度
  const [pendingDecision, setPendingDecision] = useState<{
    question: string;
    context: string;
    options: { id: string; text: string; explanation: string; impact: 'self-negative' | 'both-positive' | 'opponent-positive' }[];
  } | null>(null);
  const [isAITurn, setIsAITurn] = useState(false); // 是否是AI正在代替用户发言
  const [decisionJustMade, setDecisionJustMade] = useState(false); // 决策刚完成，用于显示继续按钮
  
  // 议程状态
  const [issues, setIssues] = useState<NegotiationIssue[]>([]);
  const [currentIssueIndex, setCurrentIssueIndex] = useState(0);
  const [issueResults, setIssueResults] = useState<Record<string, IssueResult>>({});
  const [attitudeHistory, setAttitudeHistory] = useState<AttitudeRecord[]>([]);
  const [negotiationMomentum, setNegotiationMomentum] = useState<'advancing' | 'stalled' | 'reversing'>('advancing');
  const [breakthroughChance, setBreakthroughChance] = useState(30);
  const [opponentAnalysis, setOpponentAnalysis] = useState<{
    strategy?: string;
    mood?: string;
    opportunity?: string;
    risk?: string;
  } | null>(null);
  
  // 自由输入
  const [freeInput, setFreeInput] = useState('');
  
  const [config, setConfig] = useState<{
    topic: NegotiationContext['topic'];
    selfParty: NegotiationContext['parties']['self'];
    opponentParty: NegotiationContext['parties']['opponent'];
    objectives: string[];
    difficulty: BilateralDifficulty;
    goals?: NegotiationGoals;
    era?: HistoricalEra;
    background?: {
      issues: NegotiationIssue[];
    };
  } | null>(null);

  // 难度级别
  const difficulty = config?.difficulty || 'medium';
  
  // 是否显示选项面板
  const showOptionsPanel = difficulty !== 'hard';
  
  // 是否是新手模式
  const isBeginnerMode = difficulty === 'easy';

  useEffect(() => {
    const savedConfig = sessionStorage.getItem('negotiation-config');
    if (savedConfig) {
      const parsed = JSON.parse(savedConfig);
      setConfig(parsed);
      
      // 加载议题
      if (parsed.background?.issues) {
        setIssues(parsed.background.issues);
      }
      
      // 初始化议题结果
      if (parsed.background?.issues) {
        const initialResults: Record<string, IssueResult> = {};
        parsed.background.issues.forEach((issue: NegotiationIssue) => {
          initialResults[issue.id] = {
            status: 'pending',
            selfGain: 0,
            opponentGain: 0
          };
        });
        setIssueResults(initialResults);
      }

      const openingMessage: Message = {
        id: 'opening',
        role: 'assistant',
        content: `您好，欢迎来到谈判桌前。我是${parsed.opponentParty.name}代表。\n\n关于${parsed.topic.name}这一议题，我们已经做好了充分准备。请问贵方对哪些具体问题最为关切？`,
        timestamp: Date.now(),
      };
      setMessages([openingMessage]);

      const difficultyLevel = parsed.difficulty || 'medium';
      let aiHintContent = '';
      
      switch (difficultyLevel) {
        case 'easy':
          aiHintContent = `欢迎来到外交谈判练习场！

我将作为您的外交助手，在AI辅助模式下：
• 自动帮您起草外交发言
• 按议题顺序推进谈判
• 在关键时刻让您做决定

您可以选择：
• 【AI辅助模式】：让我帮您说话，您只需在关键时刻做决策
• 【学习模式】：完全由您主导发言，我会提供反馈

请选择您想要的模式开始！`;
          break;
        case 'medium':
          aiHintContent = '谈判开始了！我将为您提供多种回应选项供选择。每个选项都有不同的语气和策略倾向，您可以学习不同外交语言的表达方式。点击"获取建议"开始！';
          break;
        case 'hard':
          aiHintContent = '挑战开始！您将完全依靠自己的判断进行谈判。我不会提供选项，但会在必要时给出战略性提示。祝您好运！';
          break;
        default:
          aiHintContent = '谈判开始了！我将为您提供多种回应选项供选择。';
      }
      
      const aiMessage: AssistantMessage = {
        id: 'ai-hint-1',
        role: 'assistant',
        content: aiHintContent,
        timestamp: Date.now(),
        emotion: 'encouraging',
      };
      setAssistantMessages([aiMessage]);
      
      // 新手模式默认开启AI辅助
      if (difficultyLevel === 'easy') {
        setIsAIMode(true);
      }
      
      // 初始态度记录
      setAttitudeHistory([{
        turn: 0,
        selfAttitude: 50,
        opponentAttitude: 50,
        timestamp: Date.now()
      }]);
      
    } else {
      router.push('/configure');
    }
  }, [router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, responseOptions, assistantMessages]);

  // 生成选项
  const generateOptions = async (context: typeof config) => {
    if (!context || isGeneratingOptions) return;
    
    setIsGeneratingOptions(true);
    try {
      const response = await fetch('/api/generate-options', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          context: {
            topic: context?.topic,
            parties: {
              self: context?.selfParty,
              opponent: context?.opponentParty,
            },
          },
          issues: issues,
          currentIssueIndex,
          history: messages,
        }),
      });
      const options = await response.json();
      setResponseOptions(options);
      
      const aiMsg: AssistantMessage = {
        id: `ai-options-${Date.now()}`,
        role: 'assistant',
        content: '我已经为您生成了多种回应方案。每个方案都有不同的外交策略，请仔细阅读并选择最适合当前局势的方案。',
        timestamp: Date.now(),
        emotion: 'serious',
      };
      setAssistantMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error('Failed to generate options:', error);
    } finally {
      setIsGeneratingOptions(false);
    }
  };

  // 新手模式：启动AI自动对话
  const startAIAutoDialog = async () => {
    if (!config) return;
    
    setIsAIMode(true);
    setAiProgress(0);
    
    // 添加系统消息
    const aiMsg: AssistantMessage = {
      id: `ai-auto-${Date.now()}`,
      role: 'assistant',
      content: `好的，我将开始AI辅助对话。我会代替您（${config.selfParty.country}）进行谈判，自动起草外交发言。当遇到需要您做决定的重大选择时，我会暂停让您选择。`,
      timestamp: Date.now(),
      emotion: 'friendly',
    };
    setAssistantMessages(prev => [...prev, aiMsg]);
    
    // 开始第一轮AI对话
    await runAIDialogTurn();
  };

  // AI自动对话回合 - 直接代替用户发言
  const runAIDialogTurn = async () => {
    if (!config || isAiThinking) return;
    
    setIsAiThinking(true);
    setAiProgress(10);
    setIsAITurn(true);
    
    const currentIssue = issues[currentIssueIndex];
    const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
    
    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: lastMessage?.role === 'assistant' ? '请回应上一条消息' : '请开始谈判',
          context: {
            topic: config.topic,
            parties: {
              self: config.selfParty,
              opponent: config.opponentParty,
            },
          },
          issues: issues,
          currentIssueIndex,
          sessionId: 'negotiation-' + Date.now(),
          mode: 'beginner',
          lastOpponentMessage: lastMessage?.role === 'assistant' ? lastMessage.content : null,
          history: messages,
        }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullUserContent = '';
      let fullOpponentContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                
                // AI代替用户说的话
                if (data.userContent) {
                  fullUserContent += data.userContent;
                  setMessages((prev) => {
                    const lastMsg = prev[prev.length - 1];
                    // 如果最后一条是AI代替用户说的，更新它
                    if (lastMsg?.role === 'user' && lastMsg.id.startsWith('ai-user-')) {
                      return [...prev.slice(0, -1), { 
                        ...lastMsg, 
                        content: fullUserContent,
                        timestamp: Date.now()
                      }];
                    }
                    // 添加新的用户消息
                    return [...prev, { 
                      id: `ai-user-${Date.now()}`, 
                      role: 'user' as const, 
                      content: fullUserContent, 
                      timestamp: Date.now(),
                      isAISpeaking: true
                    }];
                  });
                  setAiProgress(40);
                }
                
                // 对方回应
                if (data.opponentContent) {
                  fullOpponentContent += data.opponentContent;
                  setMessages((prev) => {
                    const lastMsg = prev[prev.length - 1];
                    if (lastMsg?.role === 'assistant' && lastMsg.id.startsWith('ai-opponent-')) {
                      return [...prev.slice(0, -1), { 
                        ...lastMsg, 
                        content: fullOpponentContent,
                        timestamp: Date.now()
                      }];
                    }
                    return [...prev, { 
                      id: `ai-opponent-${Date.now()}`, 
                      role: 'assistant' as const, 
                      content: fullOpponentContent, 
                      timestamp: Date.now()
                    }];
                  });
                  setAiProgress(70);
                }
                
                // 状态更新
                if (data.state) {
                  if (data.state.currentIssueIndex !== undefined) {
                    setCurrentIssueIndex(data.state.currentIssueIndex);
                  }
                  if (data.state.selfAttitude !== undefined) {
                    setAttitudeHistory(prev => [...prev.slice(-9), {
                      turn: data.state.turnCount || prev.length,
                      selfAttitude: data.state.selfAttitude,
                      opponentAttitude: data.state.opponentAttitude,
                      timestamp: Date.now()
                    }]);
                  }
                  if (data.state.momentum) {
                    setNegotiationMomentum(data.state.momentum);
                  }
                  if (data.state.breakthroughChance !== undefined) {
                    setBreakthroughChance(data.state.breakthroughChance);
                  }
                  if (data.state.allIssues) {
                    const newResults: Record<string, IssueResult> = {};
                      data.state.allIssues.forEach((issue: { id: string; status: string; selfGain: number; opponentGain: number }) => {
                      newResults[issue.id] = {
                        status: issue.status,
                        selfGain: issue.selfGain,
                        opponentGain: issue.opponentGain
                      };
                    });
                    setIssueResults(newResults);
                  }
                }
                
                // 对手分析
                if (data.analysis) {
                  setOpponentAnalysis({
                    strategy: data.analysis.opponentStrategy,
                    mood: data.analysis.opponentMood,
                    opportunity: data.analysis.breakthroughOpportunity,
                    risk: data.analysis.riskLevel
                  });
                }
                
                // 遇到决策点，暂停让用户选择
                if (data.decisionPoint) {
                  setAiProgress(100);
                  setIsAITurn(false);
                  setPendingDecision({
                    question: data.decisionPoint.question,
                    context: data.decisionPoint.context,
                      options: data.decisionPoint.options.map((opt: { id: string; text: string; explanation: string; impact: 'self-negative' | 'both-positive' | 'opponent-positive' }) => ({
                      id: opt.id,
                      text: opt.text,
                      explanation: opt.explanation,
                      impact: opt.impact
                    }))
                  });
                  setIsAIMode(false);
                  setIsAiThinking(false);
                  return;
                }
                
                if (data.done) break;
              } catch { }
            }
          }
        }
      }
      
      // 如果没有决策点，自动继续
      if (!pendingDecision && fullUserContent) {
        setAiProgress(100);
        setTurnCount(prev => prev + 1);
        
        // 检查是否所有议题都已完成
        const allDone = issues.every(issue => 
          issueResults[issue.id]?.status === 'agreed' || 
          issueResults[issue.id]?.status === 'deadlock'
        );
        
        if (!allDone && isAIMode) {
          setTimeout(() => runAIDialogTurn(), 800);
        } else if (allDone) {
          // 所有议题完成，添加总结消息
          const summaryMsg: AssistantMessage = {
            id: `ai-summary-${Date.now()}`,
            role: 'assistant',
            content: '所有议题已讨论完毕！谈判即将结束。让我为您总结本次谈判的成果...',
            timestamp: Date.now(),
            emotion: 'encouraging',
          };
          setAssistantMessages(prev => [...prev, summaryMsg]);
        }
      }
      
    } catch (error) {
      console.error('AI dialog error:', error);
    } finally {
      setIsAiThinking(false);
    }
  };

  // 处理决策选择 - 改进版
  const handleDecisionSelect = (optionId: string) => {
    if (!config) return;
    
    setPendingDecision(null);
    setAiProgress(0);
    setDecisionJustMade(true); // 标记决策刚完成
    
    // 决策文本映射 - 增强版
    const decisionTexts: Record<string, string> = {
      // 接受类
      accept: `我们经过慎重考虑，认为贵方方案体现了建设性态度，愿意接受这一提议，这符合双方共同利益。`,
      settle: `经过充分讨论，我方认为当前成果来之不易，愿意接受这一平衡方案，为谈判画上圆满句号。`,
      
      // 对案/反提议类
      counter: `贵方的方案有其合理性，但我们认为在某些细节上还有优化空间。我方提议在此基础上进行适当调整。`,
      compromise: `我方建议在双方立场之间寻求一个平衡点，各让一步，以体现我们的诚意。`,
      break: `让我们换个角度思考这个问题。我方提出一个创新方案，希望能打破当前僵局。`,
      
      // 施压类
      push: `我方必须明确表示，贵方的立场我们难以接受。我们坚持原有原则，要求重新审视相关条款。`,
      reject: `坦率地讲，贵方的方案我们难以接受。我们认为需要重新审视这一议题。`,
      concede: `我方愿意展现灵活性，但这种灵活性应该是双向的。希望贵方也能做出相应调整。`,
      escalate: `我方必须明确立场。如果谈判继续拖延，我方将不得不重新评估双边关系的整体走向。`,
      persist: `我方认为还有讨论空间，不急于做出最终决定。让我们继续深入探讨这一议题。`,
      
      // 迂回/搁置类
      tie: `在讨论这一议题的同时，我方希望将另一议题也纳入考量，以便达成更全面的协议。`,
      shift: `我认为我们可以暂时搁置这一分歧，先讨论其他议题，待条件成熟后再回来处理。`,
      next: `我们在这点上还有分歧，不如先进入下一议题，也许在讨论其他问题后会有新的思路。`,
      defer: `这个问题牵涉面广，我方需要更多时间研究。让我先听听贵方在其他议题上的想法。`,
      
      // 继续类
      continue: `让我们继续深入讨论，相信通过更多沟通能够找到更好的解决方案。`
    };
    
    const userMessage: Message = {
      id: `user-decision-${Date.now()}`,
      role: 'user',
      content: decisionTexts[optionId] || '让我们继续谈判，寻求更好的解决方案。',
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    
    // 决策后添加教练点评
    const coachMsg: AssistantMessage = {
      id: `coach-${Date.now()}`,
      role: 'assistant',
      content: `您选择了【${getDecisionName(optionId)}】策略。这是一个${getDecisionType(optionId)}的选择。让我为您分析一下...`,
      timestamp: Date.now(),
      emotion: 'encouraging',
    };
    setAssistantMessages(prev => [...prev, coachMsg]);
    
    // 自动恢复AI对话 - 所有决策后都继续
    // 如果是接受/达成类决策，显示谈判进展后再继续
    const isSettlementDecision = ['accept', 'settle'].includes(optionId);
    const delay = isSettlementDecision ? 1500 : 800; // 接受决策给更多时间展示结果
    
    setTimeout(() => {
      // 检查是否所有议题都已完成
      const updatedResults = { ...issueResults };
      const currentIssue = issues[currentIssueIndex];
      
      if (currentIssue && ['accept', 'settle'].includes(optionId)) {
        updatedResults[currentIssue.id] = {
          status: 'agreed',
          selfGain: 50,
          opponentGain: 50
        };
        setIssueResults(updatedResults);
      }
      
      const allDone = issues.every(issue => 
        updatedResults[issue.id]?.status === 'agreed' || 
        updatedResults[issue.id]?.status === 'deadlock'
      );
      
      if (!allDone) {
        setDecisionJustMade(false);
        setIsAIMode(true);
        runAIDialogTurn();
      } else {
        // 所有议题完成
        const summaryMsg: AssistantMessage = {
          id: `ai-summary-${Date.now()}`,
          role: 'assistant',
          content: '所有议题已讨论完毕！谈判即将结束。让我为您总结本次谈判的成果...',
          timestamp: Date.now(),
          emotion: 'encouraging',
        };
        setAssistantMessages(prev => [...prev, summaryMsg]);
      }
    }, delay);
  };
  
  // 获取决策名称
  const getDecisionName = (id: string): string => {
    const names: Record<string, string> = {
      accept: '接受方案',
      settle: '达成折中',
      counter: '提出对案',
      compromise: '寻求妥协',
      break: '打破僵局',
      push: '继续施压',
      reject: '表示异议',
      concede: '适度让步',
      escalate: '升级施压',
      persist: '坚持立场',
      tie: '议题捆绑',
      shift: '转换议题',
      next: '进入下题',
      defer: '暂缓决定',
      continue: '继续深入'
    };
    return names[id] || '继续谈判';
  };
  
  // 获取决策类型
  const getDecisionType = (id: string): string => {
    const types: Record<string, string> = {
      accept: '合作型',
      settle: '合作型',
      counter: '进取型',
      compromise: '平衡型',
      break: '创新型',
      push: '强硬型',
      reject: '强硬型',
      concede: '灵活型',
      escalate: '强硬型',
      persist: '坚持型',
      tie: '策略型',
      shift: '策略型',
      next: '务实型',
      defer: '谨慎型',
      continue: '稳健型'
    };
    return types[id] || '稳健型';
  };

  // 分析语言
  const analyzeLanguage = async (option: ResponseOption) => {
    try {
      const response = await fetch('/api/analyze-language', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: option.text,
          tone: option.tone,
          angle: option.angle,
          context: config,
        }),
      });
      const analysis = await response.json();
      setLanguageAnalysis(analysis);
      setShowAnalysis(true);
    } catch (error) {
      console.error('Failed to analyze language:', error);
    }
  };

  // 选择选项
  const handleSelectOption = async (option: ResponseOption) => {
    setSelectedOption(option);
    setShowAnalysis(false);
    setLanguageAnalysis(null);
    await analyzeLanguage(option);
  };

  // 确认发送响应
  const handleConfirmResponse = async () => {
    if (!selectedOption || !config) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: selectedOption.text,
      timestamp: Date.now(),
      sentiment: currentSentiment || undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setTurnCount((prev) => prev + 1);
    setSelectedOption(null);
    setResponseOptions([]);
    setShowAnalysis(false);
    setIsAiThinking(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: selectedOption.text,
          context: {
            topic: config?.topic,
            parties: {
              self: config?.selfParty,
              opponent: config?.opponentParty,
            },
          },
          sentiment: currentSentiment,
          history: messages,
        }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';
      const currentMessageId = `assistant-${Date.now()}`;

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.content) {
                  fullContent += data.content;
                  setMessages((prev) => {
                    const lastMsg = prev[prev.length - 1];
                    if (lastMsg?.role === 'assistant') {
                      return [...prev.slice(0, -1), { ...lastMsg, content: fullContent }];
                    }
                    return [...prev, { id: currentMessageId, role: 'assistant' as const, content: fullContent, timestamp: Date.now() }];
                  });
                }
                if (data.done) break;
              } catch { }
            }
          }
        }
      }
      
      // 更新态度
      setAttitudeHistory(prev => [...prev, {
        turn: turnCount + 1,
        selfAttitude: currentSentiment?.emotion === 'positive' ? 60 : currentSentiment?.emotion === 'negative' ? 40 : 50,
        opponentAttitude: 50,
        timestamp: Date.now()
      }]);
      
      // 根据难度决定是否自动生成选项
      if (difficulty === 'easy') {
        setTimeout(() => generateOptions(config), 500);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsAiThinking(false);
    }
  };

  // 发送自由输入
  const handleSendFreeInput = async () => {
    if (!freeInput.trim() || !config) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: freeInput,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setFreeInput('');
    setTurnCount((prev) => prev + 1);
    setIsAiThinking(true);

    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: freeInput,
          context: {
            topic: config?.topic,
            parties: {
              self: config?.selfParty,
              opponent: config?.opponentParty,
            },
          },
          issues: issues,
          sessionId: 'negotiation-' + Date.now(),
          mode: 'beginner',
          history: messages,
        }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.content) {
                  fullContent += data.content;
                  setMessages((prev) => {
                    const lastMsg = prev[prev.length - 1];
                    if (lastMsg?.role === 'assistant') {
                      return [...prev.slice(0, -1), { ...lastMsg, content: fullContent }];
                    }
                    return [...prev, { id: `assistant-${Date.now()}`, role: 'assistant' as const, content: fullContent, timestamp: Date.now() }];
                  });
                }
                if (data.done) break;
              } catch { }
            }
          }
        }
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsAiThinking(false);
    }
  };

  // 情绪检测
  const handleSentimentDetected = (sentiment: SentimentData) => {
    setCurrentSentiment(sentiment);
  };

  // 结束谈判
    const handleEndNegotiation = async () => {
        if (!config) return;

        // 计算结果评分（基于议题结果和态度）
        const selfGains = Object.values(issueResults).map(r => r.selfGain);
        const avgGain = selfGains.length > 0
            ? selfGains.reduce((a, b) => a + b, 0) / selfGains.length
            : 0;
        const outcomeScore = Math.round(avgGain * 1.5); // 映射到 -100 到 100 范围

        // 获取结果标签
        const outcomeLabel = getOutcomeLabel(outcomeScore);

        // 创建训练记录
        const record = createTrainingRecord(
            'bilateral',
            config.topic.name,
            config.topic.category,
            config.selfParty.country,
            config.opponentParty.country,
            undefined,
            config.difficulty,
            config.era
        );

        // 完成记录
        completeTrainingRecord(
            record.id,
            outcomeScore,
            outcomeLabel,
            turnCount,
            `谈判主题：${config.topic.name}，共 ${turnCount} 轮。`,
            undefined,
            undefined
        );

        // 存储临时数据供分析页使用
        sessionStorage.setItem('negotiation-messages', JSON.stringify(messages));
        sessionStorage.setItem('negotiation-stats', JSON.stringify({
            turnCount,
            outcomePrediction,
            issueResults,
            attitudeHistory
        }));

        router.push('/analysis');
    };

  // 获取语气颜色
  const getToneColor = (tone: string) => {
    switch (tone) {
      case 'diplomatic': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'assertive': return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'conciliatory': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'strategic': return 'text-purple-400 bg-purple-400/10 border-purple-400/30';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/30';
    }
  };

  // 获取语气图标
  const getToneIcon = (tone: string) => {
    switch (tone) {
      case 'diplomatic': return <Scale className="w-4 h-4" />;
      case 'assertive': return <Target className="w-4 h-4" />;
      case 'conciliatory': return <TrendingUp className="w-4 h-4" />;
      case 'strategic': return <Zap className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  // 获取语气名称
  const getToneName = (tone: string) => {
    switch (tone) {
      case 'diplomatic': return '外交型';
      case 'assertive': return '强硬型';
      case 'conciliatory': return '温和型';
      case 'strategic': return '策略型';
      default: return '中立型';
    }
  };

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* 顶部导航 */}
      <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                <ChevronRight className="w-5 h-5 rotate-180" />
              </Link>
              <div>
                <h1 className="text-sm font-medium text-white">{config.topic.name}</h1>
                <p className="text-xs text-slate-500">
                  {config.selfParty.country} vs {config.opponentParty.country}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* 难度指示器 */}
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                difficulty === 'easy' ? 'bg-green-500/20' :
                difficulty === 'medium' ? 'bg-amber-500/20' : 'bg-red-500/20'
              }`}>
                <span className={`text-xs ${
                  difficulty === 'easy' ? 'text-green-400' :
                  difficulty === 'medium' ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {difficulty === 'easy' ? '入门' : difficulty === 'medium' ? '进阶' : '专家'}
                </span>
              </div>

              {/* 议程切换按钮 */}
              {issues.length > 0 && (
                <button
                  onClick={() => setShowAgenda(!showAgenda)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
                    showAgenda ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800/50 text-slate-400 hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                  <span className="text-xs">议程</span>
                </button>
              )}

              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg">
                <span className="text-xs text-slate-500">回合</span>
                <span className="text-sm text-white font-medium">{turnCount}</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg">
                <span className="text-xs text-slate-500">预估</span>
                <span className={`text-sm font-medium ${
                  outcomePrediction > 60 ? 'text-green-400' : outcomePrediction > 40 ? 'text-amber-400' : 'text-red-400'
                }`}>
                  {outcomePrediction}%
                </span>
              </div>

              <button
                onClick={handleEndNegotiation}
                className="px-4 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm rounded-lg transition-colors"
              >
                结束谈判
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容 */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* 左侧 - 对话区 */}
          <div className="lg:col-span-3 space-y-4">
            {/* 新手模式：AI辅助面板 */}
            {isBeginnerMode && (
              <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl border border-green-500/30 p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isAITurn ? 'bg-gradient-to-br from-green-400 to-blue-500 animate-pulse' : 'bg-gradient-to-br from-slate-600 to-slate-700'
                    }`}>
                      {isAITurn ? (
                        <Bot className="w-5 h-5 text-white" />
                      ) : (
                        <User className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">
                        {isAITurn ? 'AI正在代替您发言' : decisionJustMade ? '决策已应用' : '等待您的决策'}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {isAITurn ? '让我帮您起草外交发言...' : decisionJustMade ? '准备继续谈判' : '在关键时刻做决定'}
                      </p>
                    </div>
                  </div>
                  
                  {!isAIMode && !pendingDecision ? (
                    <div className="flex items-center gap-2">
                      {/* 决策刚完成后显示继续按钮 */}
                      {decisionJustMade ? (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-green-400">决策已应用</span>
                          <button
                            onClick={() => {
                              setDecisionJustMade(false);
                              setIsAIMode(true);
                              runAIDialogTurn();
                            }}
                            disabled={isAiThinking}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 disabled:from-slate-600 disabled:to-slate-600 text-white text-sm font-medium rounded-lg transition-all animate-pulse"
                          >
                            <SkipForward className="w-4 h-4" />
                            继续AI对话
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={startAIAutoDialog}
                          disabled={isAiThinking}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 disabled:from-slate-600 disabled:to-slate-600 text-white text-sm font-medium rounded-lg transition-all"
                        >
                          <Play className="w-4 h-4" />
                          开始AI辅助
                        </button>
                      )}
                    </div>
                  ) : isAIMode ? (
                    <button
                      onClick={() => setIsAIMode(false)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-sm rounded-lg transition-colors"
                    >
                      <Pause className="w-4 h-4" />
                      暂停
                    </button>
                  ) : null}
                </div>
                
                {/* 当前议题指示 */}
                {issues.length > 0 && (
                  <div className="flex items-center gap-2 p-2 bg-slate-800/50 rounded-lg">
                    <Target className="w-4 h-4 text-amber-400" />
                    <span className="text-sm text-slate-300">当前议题：</span>
                    <span className="text-sm text-white font-medium">
                      {issues[currentIssueIndex]?.title || '无'}
                    </span>
                    <span className="text-xs text-slate-500 ml-auto">
                      {currentIssueIndex + 1} / {issues.length}
                    </span>
                  </div>
                )}
                
                {/* 决策选项 */}
                {pendingDecision && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-5 h-5 text-amber-400" />
                      <span className="text-amber-400 font-medium">关键决策点</span>
                    </div>
                    <p className="text-white mb-3">{pendingDecision.question}</p>
                    {pendingDecision.context && (
                      <p className="text-xs text-slate-400 mb-4">{pendingDecision.context}</p>
                    )}
                    <div className="space-y-2">
                      {pendingDecision.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleDecisionSelect(option.id)}
                          className={`w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 border rounded-lg text-left transition-all ${
                            option.impact === 'both-positive' ? 'border-green-500/30 hover:border-green-500/50' :
                            option.impact === 'self-negative' ? 'border-amber-500/30 hover:border-amber-500/50' :
                            'border-red-500/30 hover:border-red-500/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-white text-sm font-medium">{option.text}</p>
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              option.impact === 'both-positive' ? 'bg-green-500/20 text-green-400' :
                              option.impact === 'self-negative' ? 'bg-amber-500/20 text-amber-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {option.impact === 'both-positive' ? '共赢' :
                               option.impact === 'self-negative' ? '需权衡' : '对对方有利'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">{option.explanation}</p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                {/* AI模式提示 */}
                {isAIMode && !pendingDecision && (
                  <div className="mt-4 text-center">
                    <p className="text-sm text-slate-400">
                      AI正在为您引导谈判... 在关键时刻您需要做出选择
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 对话历史 */}
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 h-[40vh] overflow-y-auto p-6">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div key={message.id} className="relative">
                    <NegotiationBubble message={message} />
                    {/* AI代替发言标记 */}
                    {(message as any).isAISpeaking && (
                      <div className="absolute -top-3 left-4 px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400">
                        AI代您发言
                      </div>
                    )}
                  </div>
                ))}
                
                {isAiThinking && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-xl">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-xs text-slate-500">
                        {isAITurn ? 'AI正在代替您发言...' : 'AI思考中...'}
                      </span>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* 响应选项区 - 仅easy和medium显示 */}
            {showOptionsPanel && !isBeginnerMode && (
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-4">
              {/* 选项标题 */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Languages className="w-5 h-5 text-amber-400" />
                  <h3 className="text-white font-medium">外交表达选项</h3>
                </div>
                <button
                  onClick={() => generateOptions(config)}
                  disabled={isGeneratingOptions || isAiThinking}
                  className="flex items-center gap-1 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-sm rounded-lg transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isGeneratingOptions ? 'animate-spin' : ''}`} />
                  {isGeneratingOptions ? '生成中...' : '换一批'}
                </button>
              </div>

              {/* 加载状态 */}
              {isGeneratingOptions && (
                <div className="flex items-center justify-center py-8">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-slate-400">正在生成最佳回应方案...</span>
                  </div>
                </div>
              )}

              {/* 选项列表 */}
              {!isGeneratingOptions && responseOptions.length > 0 && (
                <div className="space-y-3">
                  {responseOptions.map((option, index) => (
                    <motion.div
                      key={option.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-xl border transition-all cursor-pointer ${
                        selectedOption?.id === option.id
                          ? 'bg-amber-500/20 border-amber-500'
                          : 'bg-slate-800/50 border-slate-700/50 hover:border-amber-500/50'
                      }`}
                      onClick={() => handleSelectOption(option)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs border ${getToneColor(option.tone)}`}>
                          {getToneIcon(option.tone)}
                          {getToneName(option.tone)}
                        </div>
                        <div className="flex-1">
                          <p className="text-white leading-relaxed">{option.text}</p>
                          <p className="text-xs text-slate-500 mt-2">
                            角度：{option.angle === 'principles' ? '原则' : option.angle === 'interests' ? '利益' : option.angle === 'emotions' ? '情感' : '妥协'} · 
                            风格：{option.languageStyle}
                          </p>
                        </div>
                        {selectedOption?.id === option.id && (
                          <CheckCircle2 className="w-5 h-5 text-amber-400" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* 语言分析面板 */}
              <AnimatePresence>
                {showAnalysis && selectedOption && languageAnalysis && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-slate-700/50"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-5 h-5 text-amber-400" />
                      <h4 className="text-white font-medium">语言艺术分析</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <p className="text-xs text-slate-500 mb-1">核心技巧</p>
                        <p className="text-white font-medium">{languageAnalysis.technique}</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <p className="text-xs text-slate-500 mb-1">言外之意</p>
                        <p className="text-white">{languageAnalysis.meaning}</p>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <p className="text-xs text-slate-500 mb-1">预期效果</p>
                        <p className="text-green-400">{languageAnalysis.effect}</p>
                      </div>
                      {languageAnalysis.improvement && (
                        <div className="bg-amber-500/10 rounded-lg p-3 border border-amber-500/30">
                          <p className="text-xs text-amber-400 mb-1">优化建议</p>
                          <p className="text-white">{languageAnalysis.improvement}</p>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={handleConfirmResponse}
                      disabled={isAiThinking}
                      className="mt-4 w-full px-4 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:from-slate-700 disabled:to-slate-700 text-white font-medium rounded-xl transition-all"
                    >
                      确认发送此回应
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 无选项时的提示 */}
              {!isGeneratingOptions && responseOptions.length === 0 && !isAiThinking && (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-400">点击&ldquo;换一批&ldquo;获取回应方案</p>
                </div>
              )}
            </div>
            )}

            {/* 高难度模式/新手自由输入区 */}
            {difficulty === 'hard' || (isBeginnerMode && !isAIMode) ? (
              <FreeInputPanel
                value={freeInput}
                onChange={setFreeInput}
                onSend={handleSendFreeInput}
                isAiThinking={isAiThinking}
              />
            ) : null}
          </div>

          {/* 右侧 - 辅助面板 */}
          <div className="space-y-4">
            {/* 议程指示器 */}
            {showAgenda && issues.length > 0 && (
              <AgendaIndicator
                issues={issues}
                currentIssueIndex={currentIssueIndex}
                issueResults={issueResults}
                attitudeHistory={attitudeHistory}
                momentum={negotiationMomentum}
                breakthroughChance={breakthroughChance}
                opponentAnalysis={opponentAnalysis || undefined}
                onIssueClick={(id) => {
                  const idx = issues.findIndex(i => i.id === id);
                  if (idx >= 0) setCurrentIssueIndex(idx);
                }}
              />
            )}

            {/* 策略提示 */}
            <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Volume2 className="w-5 h-5 text-amber-400" />
                <h3 className="text-white font-medium">
                  {difficulty === 'hard' ? '战略提示' : '外交语言技巧'}
                </h3>
              </div>
              
              {isBeginnerMode && (
                <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <p className="text-green-400 text-sm font-medium mb-1">新手引导</p>
                  <p className="text-slate-400 text-xs">您正在学习外交谈判技巧。AI将为您提供指导，帮助您理解不同策略的效果。</p>
                </div>
              )}
              
              {difficulty === 'hard' && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm font-medium mb-1">自主模式</p>
                  <p className="text-slate-400 text-xs">完全依靠您自己的判断。选择最能体现您立场的表达方式。</p>
                </div>
              )}

              <div className="space-y-3 text-sm">
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <p className="text-amber-400 mb-1">外交型</p>
                  <p className="text-slate-400">使用中性、平衡的语言，强调共同利益和合作机会。</p>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <p className="text-red-400 mb-1">强硬型</p>
                  <p className="text-slate-400">明确表达底线和立场，但避免人身攻击。</p>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <p className="text-green-400 mb-1">温和型</p>
                  <p className="text-slate-400">展现善意和灵活性，但注意不要显得软弱。</p>
                </div>
                <div className="p-3 bg-slate-800/50 rounded-lg">
                  <p className="text-purple-400 mb-1">策略型</p>
                  <p className="text-slate-400">使用暗示、比喻等高级语言技巧，迂回表达意图。</p>
                </div>
              </div>
            </div>

            {/* 摄像头面板 */}
            <CameraPanel
              onSentimentDetected={handleSentimentDetected}
              isActive={isCameraActive}
              onToggle={() => setIsCameraActive(!isCameraActive)}
            />

            {/* 情绪指示 */}
            {currentSentiment && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-4"
              >
                <h3 className="text-sm font-medium text-slate-300 mb-3">您的表现</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">情绪状态</span>
                    <span className={`text-sm font-medium ${
                      currentSentiment.emotion === 'positive' ? 'text-green-400' :
                      currentSentiment.emotion === 'negative' ? 'text-red-400' :
                      'text-slate-400'
                    }`}>
                      {currentSentiment.emotion === 'positive' ? '积极' : 
                       currentSentiment.emotion === 'negative' ? '消极' : '中性'}
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${currentSentiment.intensity}%`,
                        background: currentSentiment.emotion === 'positive' ? '#48BB78' :
                                   currentSentiment.emotion === 'negative' ? '#F56565' :
                                   '#A0AEC0',
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* AI助手 */}
      <AIAssistant
        messages={assistantMessages}
        currentPhase="negotiating"
        isExpanded={isAssistantExpanded}
        onToggle={() => setIsAssistantExpanded(!isAssistantExpanded)}
      />
    </div>
  );
}

// 自由输入组件
interface FreeInputPanelProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isAiThinking: boolean;
}

function FreeInputPanel({ value, onChange, onSend, isAiThinking }: FreeInputPanelProps) {
  return (
    <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-amber-500/30 p-4">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-amber-400" />
        <h3 className="text-white font-medium">
          自由谈判模式
        </h3>
        <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">
          专家模式
        </span>
      </div>
      
      <p className="text-slate-400 text-sm mb-4">
        使用您认为最合适的外交语言表达您的立场。
      </p>

      <div className="space-y-3">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="在此输入您的外交回应..."
          disabled={isAiThinking}
          className="w-full h-32 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 resize-none focus:outline-none focus:border-amber-500/50 transition-colors disabled:opacity-50"
        />
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {value.length} 字符
          </span>
          
          <button
            onClick={onSend}
            disabled={!value.trim() || isAiThinking}
            className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:from-slate-700 disabled:to-slate-700 text-white font-medium rounded-xl transition-all disabled:cursor-not-allowed"
          >
            发送
          </button>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-700/50">
        <p className="text-xs text-slate-500 mb-2">外交技巧提示：</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 bg-slate-800/50 rounded">
            <p className="text-amber-400">原则性语言</p>
            <p className="text-slate-400">强调国际法和道德规范</p>
          </div>
          <div className="p-2 bg-slate-800/50 rounded">
            <p className="text-green-400">利益导向</p>
            <p className="text-slate-400">阐述双方共同利益</p>
          </div>
          <div className="p-2 bg-slate-800/50 rounded">
            <p className="text-blue-400">条件交换</p>
            <p className="text-slate-400">提出有条件的让步</p>
          </div>
          <div className="p-2 bg-slate-800/50 rounded">
            <p className="text-purple-400">战略模糊</p>
            <p className="text-slate-400">保持一定灵活性</p>
          </div>
        </div>
      </div>
    </div>
  );
}
