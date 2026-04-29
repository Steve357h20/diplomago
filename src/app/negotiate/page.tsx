'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import NegotiationBubble from '@/components/negotiation/NegotiationBubble';
import AgendaIndicator from '@/components/negotiation/AgendaIndicator';
import CameraPanel from '@/components/sentiment/CameraPanel';
import AIAssistant from '@/components/ai-assistant/AIAssistant';
import StrategyPanel, { Strategy } from '@/components/negotiation/StrategyPanel';
import {
    Message,
    NegotiationContext,
    AssistantMessage,
    SentimentData,
    NegotiationIssue,
    NegotiationGoals,
    HistoricalEra
} from '@/types/negotiation';
import {
    Zap,
    Scale,
    TrendingUp,
    ChevronRight,
    Volume2,
    Target,
    List,
    Sparkles,
    Loader2
} from 'lucide-react';

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
    const [turnCount, setTurnCount] = useState(0);
    const [showAgenda, setShowAgenda] = useState(true);
    const [strategies, setStrategies] = useState<Strategy[]>([]);
    const [showStrategyPanel, setShowStrategyPanel] = useState(false);
    const [isLoadingStrategies, setIsLoadingStrategies] = useState(false);

    // AI 润色开关
    const [autoPolish, setAutoPolish] = useState(true);

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
        goals?: NegotiationGoals;
        era?: HistoricalEra;
        background?: {
            issues: NegotiationIssue[];
        };
    } | null>(null);

    // 回应选项
    interface ResponseSuggestion {
        text: string;
        tone: 'diplomatic' | 'assertive' | 'conciliatory' | 'strategic';
        pros: string;
        cons: string;
        impact: 'positive' | 'neutral' | 'negative';
    }

    const [suggestions, setSuggestions] = useState<ResponseSuggestion[]>([]);
    const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const generateSuggestions = async () => {
        if (!config || isGeneratingSuggestions) return;

        setIsGeneratingSuggestions(true);
        try {
            const response = await fetch('/api/generate-responses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    context: {
                        topic: config.topic,
                        parties: {
                            self: config.selfParty,
                            opponent: config.opponentParty,
                        },
                    },
                    history: messages,
                    issues: issues,
                    currentIssueIndex,
                    goals: config.goals,
                }),
            });
            const data = await response.json();
            setSuggestions(data.options || []);
            setShowSuggestions(true);
        } catch (error) {
            console.error('Failed to generate suggestions:', error);
        } finally {
            setIsGeneratingSuggestions(false);
        }
    };

    useEffect(() => {
        const savedConfig = sessionStorage.getItem('negotiation-config');
        if (savedConfig) {
            const parsed = JSON.parse(savedConfig);
            setConfig(parsed);

            if (parsed.background?.issues) {
                setIssues(parsed.background.issues);
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

            const aiMessage: AssistantMessage = {
                id: 'ai-hint-1',
                role: 'assistant',
                content: '专家模式已启动。您可以使用下方的输入框自由发言，或开启「AI润色」让AI帮您优化表达。',
                timestamp: Date.now(),
                emotion: 'encouraging',
            };
            setAssistantMessages([aiMessage]);

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
    }, [messages, assistantMessages]);



    // 发送消息（专家模式）
    const handleSendMessage = async () => {
        if (!freeInput.trim() || !config || isAiThinking) return;

        const rawMessage = freeInput;
        setFreeInput('');
        setIsAiThinking(true);

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            role: 'user',
            content: rawMessage,
            timestamp: Date.now(),
            sentiment: currentSentiment || undefined,
            originalMessage: autoPolish ? rawMessage : undefined,
        };

        setMessages((prev) => [...prev, userMessage]);
        setTurnCount((prev) => prev + 1);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: rawMessage,
                    context: {
                        topic: config.topic,
                        parties: {
                            self: config.selfParty,
                            opponent: config.opponentParty,
                        },
                        background: config.background, // 新增：传递背景故事
                    },
                    sentiment: currentSentiment,
                    history: messages,
                    issues: issues,
                    currentIssueIndex,
                    goals: config.goals,
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
                                        return [...prev, { id: currentMessageId, role: 'assistant', content: fullContent, timestamp: Date.now() }];
                                    });
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
                                        data.state.allIssues.forEach((issue: any) => {
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

                                if (data.state) {
                                    if (data.state.currentIssueIndex !== undefined) setCurrentIssueIndex(data.state.currentIssueIndex);
                                    if (data.state.selfAttitude !== undefined) {
                                        setAttitudeHistory(prev => [...prev.slice(-9), {
                                            turn: data.state.turnCount || prev.length,
                                            selfAttitude: data.state.selfAttitude,
                                            opponentAttitude: data.state.opponentAttitude,
                                            timestamp: Date.now()
                                        }]);
                                    }
                                    if (data.state.momentum) setNegotiationMomentum(data.state.momentum);
                                    if (data.state.breakthroughChance !== undefined) setBreakthroughChance(data.state.breakthroughChance);
                                    if (data.state.allIssues) {
                                        const newResults: Record<string, IssueResult> = {};
                                        data.state.allIssues.forEach((issue: any) => {
                                            newResults[issue.id] = {
                                                status: issue.status,
                                                selfGain: issue.selfGain,
                                                opponentGain: issue.opponentGain
                                            };
                                        });
                                        setIssueResults(newResults);
                                        setIssues(data.state.allIssues);
                                    }
                                }
                                if (data.analysis) {
                                    setOpponentAnalysis({
                                        strategy: data.analysis.opponentStrategy,
                                        mood: data.analysis.opponentMood,
                                        opportunity: data.analysis.breakthroughOpportunity,
                                        risk: data.analysis.riskLevel
                                    });
                                }
                                if (data.done) break;
                            } catch { }
                        }
                    }
                }
            }
        } catch (error) {
            console.error('发送消息失败:', error);
        } finally {
            setIsAiThinking(false);
        }
    };

    const handleSummonAdvisors = async () => {
        if (!config || isLoadingStrategies) return;
        setIsLoadingStrategies(true);
        setShowStrategyPanel(true);
        try {
            const response = await fetch('/api/strategy-advice', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    context: {
                        topic: config.topic,
                        parties: { self: config.selfParty, opponent: config.opponentParty },
                    },
                    history: messages,
                    currentState: {
                        opponentPatience: 65, // 可从实际状态中获取
                        domesticSupport: 70,
                        chipsAvailable: 2,
                        currentIssue: issues[currentIssueIndex]?.title,
                        stalemateLevel: 'medium',
                    },
                }),
            });
            const data = await response.json();
            setStrategies(data.strategies || []);
        } catch (error) {
            console.error('智囊团调用失败:', error);
        } finally {
            setIsLoadingStrategies(false);
        }
    };

    const handleSelectStrategy = (strategy: Strategy) => {
        const talkingPoints = strategy.suggestedTalkingPoints.join(' ');
        setFreeInput(talkingPoints);
        setShowStrategyPanel(false);
    };

    const handleSentimentDetected = (sentiment: SentimentData) => {
        setCurrentSentiment(sentiment);
    };

    const handleEndNegotiation = () => {
        sessionStorage.setItem('negotiation-messages', JSON.stringify(messages));
        sessionStorage.setItem('negotiation-stats', JSON.stringify({
            turnCount,
            issueResults,
            attitudeHistory
        }));
        router.push('/analysis');
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
                            {issues.length > 0 && (
                                <button
                                    onClick={() => setShowAgenda(!showAgenda)}
                                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${showAgenda ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800/50 text-slate-400 hover:text-white'
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
                        {/* 对话历史 */}
                        <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 h-[50vh] overflow-y-auto p-6">
                            <div className="space-y-6">
                                {messages.map((message) => (
                                    <div key={message.id} className="relative">
                                        <NegotiationBubble message={message} />
                                    </div>
                                ))}

                                {isAiThinking && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex justify-start"
                                    >
                                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-xl">
                                            <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
                                            <span className="text-xs text-slate-400">
                                                '对方正在思考...'
                                            </span>
                                        </div>
                                    </motion.div>
                                )}

                                <div ref={messagesEndRef} />
                            </div>
                        </div>                        

                        {/* 智囊团策略面板 */}
                        <StrategyPanel
                            strategies={strategies}
                            isExpanded={showStrategyPanel}
                            onToggle={() => setShowStrategyPanel(!showStrategyPanel)}
                            onSelect={handleSelectStrategy}
                            isLoading={isLoadingStrategies}
                        />

                        {/* 输入区域 */}
                        <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-amber-500/30 p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <Zap className="w-5 h-5 text-amber-400" />
                                <h3 className="text-white font-medium">自由谈判模式</h3>
                                <button
                                    onClick={handleSummonAdvisors}
                                    disabled={isLoadingStrategies}
                                    className="ml-auto flex items-center gap-1 px-3 py-1.5 bg-purple-500/20 text-purple-400 text-xs rounded-lg hover:bg-purple-500/30 transition-colors"
                                >
                                    🧠 召集智囊团
                                </button>
                            </div>

                            <div className="space-y-3">
                                <textarea
                                    value={freeInput}
                                    onChange={(e) => setFreeInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && e.ctrlKey) {
                                            e.preventDefault();
                                            handleSendMessage();
                                        }
                                    }}
                                    placeholder="输入您的发言... (Ctrl+Enter 发送)"
                                    disabled={isAiThinking}
                                    className="w-full h-28 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 resize-none focus:outline-none focus:border-amber-500/50 transition-colors disabled:opacity-50"
                                />

                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-500">{freeInput.length} 字符</span>
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!freeInput.trim() || isAiThinking}
                                        className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:from-slate-700 disabled:to-slate-700 text-white font-medium rounded-xl transition-all disabled:cursor-not-allowed"
                                    >
                                        发送
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 右侧 - 辅助面板 */}
                    <div className="space-y-4">
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

                        <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <Volume2 className="w-5 h-5 text-amber-400" />
                                <h3 className="text-white font-medium">外交语言技巧</h3>
                            </div>
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

                        <CameraPanel
                            onSentimentDetected={handleSentimentDetected}
                            isActive={isCameraActive}
                            onToggle={() => setIsCameraActive(!isCameraActive)}
                        />

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
                                        <span className={`text-sm font-medium ${currentSentiment.emotion === 'positive' ? 'text-green-400' :
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

            <AIAssistant
                messages={assistantMessages}
                currentPhase="negotiating"
                isExpanded={isAssistantExpanded}
                onToggle={() => setIsAssistantExpanded(!isAssistantExpanded)}
            />
        </div>
    );
}