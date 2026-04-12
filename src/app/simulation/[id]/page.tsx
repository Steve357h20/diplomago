'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getCountryById } from '@/lib/countries';

// 图标
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
);

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const LightbulbIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
  </svg>
);

const TargetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

// 类型定义
interface Message {
  id: string;
  role: 'user' | 'ai';
  countryId: string;
  countryName: string;
  content: string;
  timestamp: number;
  sentiment?: number;
}

interface StrategyHint {
  shortTerm: string[];
  mediumTerm: string[];
  longTerm: string[];
  keyPoints: string[];
  warnings: string[];
}

interface Analysis {
  overallProgress: number;
  keyFactors: string[];
  riskLevel: 'low' | 'medium' | 'high';
  opportunities: string[];
  threats: string[];
  recommendation: string;
}

interface ScenarioSession {
  scenarioId: string;
  sessionId: string;
  userCountryId: string;
  negotiationState: {
    currentPhase: string;
    attitudeHistory: Array<{
      time: string;
      attitudes: Record<string, number>;
    }>;
    deadlockedIssues: string[];
  };
  visibleToUser?: {
    overview?: {
      id: string;
      name: string;
      description?: string;
    };
    background?: {
      overview?: string;
    };
    publicIssues?: Array<{
      id: string;
      title: string;
      description: string;
      status: string;
    }>;
  };
  userSecret?: {
    hiddenAgenda?: {
      summary?: string;
      details?: string[];
    };
    idealSolution?: {
      summary?: string;
      conditions?: string[];
    };
    bottomLine?: {
      summary?: string;
      conditions?: string[];
    };
    leverage?: Array<{
      description: string;
      strength: string;
    }>;
    vulnerabilities?: Array<{
      description: string;
      riskLevel: string;
    }>;
    strategyHints?: Array<{
      whenToUse: string;
      approach: string;
    }>;
  };
  aiCountries?: Array<{
    countryId: string;
  }>;
}

export default function SimulationNegotiatePage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.id as string;

  // 会话状态
  const [session, setSession] = useState<ScenarioSession | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showStrategy, setShowStrategy] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [strategy, setStrategy] = useState<StrategyHint | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // 加载会话
  useEffect(() => {
    const loadSession = async () => {
      try {
        const res = await fetch(`/api/simulation?action=session&sessionId=${sessionId}`);
        const data = await res.json();
        if (data.success) {
          setSession(data.session);
        }
      } catch (error) {
        console.error('加载会话失败:', error);
      }
    };

    if (sessionId) {
      loadSession();
    }
  }, [sessionId]);

  // 滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 发送消息
  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    // 添加用户消息
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      countryId: session?.userCountryId || '',
      countryName: getCountryById(session?.userCountryId || '')?.name || '你',
      content: userMessage,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);

    try {
      const res = await fetch('/api/simulation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: userMessage
        })
      });

      const data = await res.json();
      if (data.success) {
        // 添加AI响应
        const aiMessages: Message[] = data.responses.map((r: { countryId: string; countryName: string; message: string; sentiment?: number }) => ({
          id: `ai-${Date.now()}-${r.countryId}`,
          role: 'ai' as const,
          countryId: r.countryId,
          countryName: r.countryName,
          content: r.message,
          timestamp: Date.now(),
          sentiment: r.sentiment
        }));
        setMessages(prev => [...prev, ...aiMessages]);

        // 更新分析
        if (data.analysis) {
          setAnalysis(data.analysis);
        }
      }
    } catch (error) {
      console.error('发送消息失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 获取策略建议
  const fetchStrategy = async () => {
    try {
      const res = await fetch('/api/simulation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          action: 'strategy'
        })
      });

      const data: { success: boolean; strategy?: StrategyHint } = await res.json();
      if (data.success && data.strategy) {
        setStrategy(data.strategy);
        setShowStrategy(true);
      }
    } catch (error) {
      console.error('获取策略失败:', error);
    }
  };

  // 获取局势分析
  const fetchAnalysis = async () => {
    try {
      const res = await fetch('/api/simulation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          action: 'analyze'
        })
      });

      const data = await res.json();
      if (data.success) {
        setAnalysis(data.analysis);
      }
    } catch (error) {
      console.error('获取分析失败:', error);
    }
  };

  // 键盘发送
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-[#0F1419] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C9A962] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#A0AEC0]">加载会话中...</p>
        </div>
      </div>
    );
  }

  const userCountry = getCountryById(session.userCountryId);

  return (
    <div className="min-h-screen bg-[#0F1419] text-white flex flex-col">
      {/* 顶部导航 */}
      <header className="border-b border-[#243042] bg-[#1A2332]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => router.push('/multilateral/config')}
              className="text-[#A0AEC0] hover:text-white"
            >
              <ArrowLeftIcon />
            </Button>
            <div>
              <h1 className="font-serif text-lg font-semibold text-[#C9A962]">
                {session.visibleToUser?.overview?.name || '沉浸模拟谈判'}
              </h1>
              <p className="text-xs text-[#A0AEC0]">
                扮演：{userCountry?.name} · {session.negotiationState?.currentPhase === 'opening' ? '开局' : 
                  session.negotiationState?.currentPhase === 'discussion' ? '讨论' :
                  session.negotiationState?.currentPhase === 'negotiation' ? '磋商' :
                  session.negotiationState?.currentPhase === 'summit' ? '峰会' : '总结'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* 策略按钮 */}
            <Button 
              variant="outline" 
              size="sm"
              onClick={fetchStrategy}
              className="border-[#C9A962]/50 text-[#C9A962] hover:bg-[#C9A962]/20"
            >
              <LightbulbIcon />
              <span className="ml-2">策略</span>
            </Button>

            {/* 分析按钮 */}
            <Button 
              variant="outline" 
              size="sm"
              onClick={fetchAnalysis}
              className="border-[#4A90A4]/50 text-[#4A90A4] hover:bg-[#4A90A4]/20"
            >
              <TargetIcon />
              <span className="ml-2">局势</span>
            </Button>

            {/* 秘密信息按钮 */}
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowSecret(!showSecret)}
              className={`border-[#F56565]/50 ${showSecret ? 'bg-[#F56565]/20 text-[#F56565]' : 'text-[#F56565]/70 hover:bg-[#F56565]/10'}`}
            >
              {showSecret ? <EyeIcon /> : <LockIcon />}
              <span className="ml-2">秘密</span>
            </Button>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="flex-1 flex max-w-7xl mx-auto w-full">
        {/* 左侧：对话区 */}
        <div className="flex-1 flex flex-col border-r border-[#243042]">
          {/* 对话消息 */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4 max-w-3xl mx-auto">
              {/* 欢迎消息 */}
              {messages.length === 0 && (
                <Card className="bg-[#1A2332] border-[#243042]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-[#C9A962] flex items-center gap-2">
                      <span>🎭</span> 沉浸模拟开始
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#A0AEC0] mb-3">
                      {session.visibleToUser?.overview?.description || '谈判即将开始'}
                    </p>
                    {session.visibleToUser?.background?.overview && (
                      <div className="bg-[#0F1419] rounded-lg p-3 text-xs text-[#A0AEC0]">
                        <p className="font-medium text-white mb-1">背景</p>
                        <p>{session.visibleToUser.background.overview.substring(0, 300)}...</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* 消息列表 */}
              {messages.map(msg => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    <div className="flex items-center gap-2">
                      {msg.role === 'ai' && (
                        <span className="text-sm text-[#A0AEC0]">{msg.countryName}</span>
                      )}
                      <Badge 
                        variant="outline"
                        className={`text-xs ${
                          msg.role === 'user' 
                            ? 'border-[#C9A962]/50 text-[#C9A962]' 
                            : 'border-[#4A90A4]/50 text-[#4A90A4]'
                        }`}
                      >
                        {msg.role === 'user' ? userCountry?.name : msg.countryName}
                      </Badge>
                    </div>
                    <div className={`rounded-lg p-4 ${
                      msg.role === 'user' 
                        ? 'bg-[#C9A962]/20 border border-[#C9A962]/30' 
                        : 'bg-[#1A2332] border border-[#243042]'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* 加载中 */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#1A2332] border border-[#243042] rounded-lg p-4">
                    <div className="flex items-center gap-2 text-[#A0AEC0]">
                      <div className="w-4 h-4 border-2 border-[#4A90A4] border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm">AI正在思考...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* 输入区 */}
          <div className="border-t border-[#243042] p-4 bg-[#1A2332]">
            <div className="max-w-3xl mx-auto">
              <div className="flex gap-3">
                <Textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="输入你的谈判立场或提议... (Enter 发送, Shift+Enter 换行)"
                  className="bg-[#0F1419] border-[#243042] resize-none min-h-[60px]"
                  rows={2}
                  disabled={isLoading}
                />
                <Button 
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-[#C9A962] hover:bg-[#B89852] text-black"
                >
                  <SendIcon />
                </Button>
              </div>
              <p className="text-xs text-[#A0AEC0] mt-2 text-center">
                记住：你的对手有各自的隐藏议程，需要通过谈判来试探他们的真实目的
              </p>
            </div>
          </div>
        </div>

        {/* 右侧：信息和面板 */}
        <div className="w-80 p-4 space-y-4 overflow-y-auto">
          {/* 谈判阶段 */}
          <Card className="bg-[#1A2332] border-[#243042]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-[#C9A962]">谈判进度</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {['opening', 'discussion', 'negotiation', 'summit', 'conclusion'].map(phase => {
                  const labels: Record<string, string> = {
                    opening: '开局',
                    discussion: '讨论',
                    negotiation: '磋商',
                    summit: '峰会',
                    conclusion: '总结'
                  };
                  const phases = ['opening', 'discussion', 'negotiation', 'summit', 'conclusion'];
                  const currentIndex = phases.indexOf(session.negotiationState?.currentPhase || 'opening');
                  const phaseIndex = phases.indexOf(phase);
                  const isActive = phaseIndex <= currentIndex;

                  return (
                    <div key={phase} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#C9A962]' : 'bg-[#243042]'}`} />
                      <span className={`text-xs ${isActive ? 'text-white' : 'text-[#666]'}`}>
                        {labels[phase]}
                      </span>
                    </div>
                  );
                })}
              </div>
              <Progress 
                value={analysis?.overallProgress || 0} 
                className="mt-3 h-2"
              />
              <p className="text-xs text-[#A0AEC0] mt-1">进度 {analysis?.overallProgress || 0}%</p>
            </CardContent>
          </Card>

          {/* 公开议题 */}
          <Card className="bg-[#1A2332] border-[#243042]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-[#C9A962]">公开议题</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {session.visibleToUser?.publicIssues?.map((issue: { id: string; title: string; status: string; description: string }) => (
                <div 
                  key={issue.id}
                  className="p-2 rounded bg-[#0F1419] border border-[#243042]"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white">{issue.title}</span>
                    <Badge 
                      variant="outline"
                      className={`text-xs ${
                        issue.status === 'agreed' ? 'border-green-500/50 text-green-400' :
                        issue.status === 'deadlocked' ? 'border-red-500/50 text-red-400' :
                        'border-yellow-500/50 text-yellow-400'
                      }`}
                    >
                      {issue.status === 'discussing' ? '讨论中' :
                       issue.status === 'agreed' ? '已达成' :
                       issue.status === 'deadlocked' ? '僵局' : '待定'}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#A0AEC0]">{issue.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 参与者态度 */}
          <Card className="bg-[#1A2332] border-[#243042]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-[#C9A962]">各方态度</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {session.aiCountries?.map((ai: { countryId: string }) => {
                const country = getCountryById(ai.countryId);
                const latestAttitude = session.negotiationState?.attitudeHistory?.[
                  session.negotiationState.attitudeHistory.length - 1
                ]?.attitudes?.[ai.countryId] || 50;

                return (
                  <div key={ai.countryId} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{country?.flag || '🏳️'}</span>
                      <span className="text-sm">{country?.name || ai.countryId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 rounded-full bg-[#243042] overflow-hidden">
                        <div 
                          className={`h-full ${
                            latestAttitude > 0 ? 'bg-green-500' : 
                            latestAttitude < 0 ? 'bg-red-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${Math.abs(latestAttitude)}%` }}
                        />
                      </div>
                      <span className={`text-xs ${
                        latestAttitude > 0 ? 'text-green-400' :
                        latestAttitude < 0 ? 'text-red-400' : 'text-yellow-400'
                      }`}>
                        {latestAttitude > 0 ? '+' : ''}{latestAttitude}
                      </span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* 局势分析 */}
          {analysis && (
            <Card className="bg-[#1A2332] border-[#243042]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-[#4A90A4]">局势分析</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-[#A0AEC0] mb-1">风险等级</p>
                  <Badge className={
                    analysis.riskLevel === 'low' ? 'bg-green-500/20 text-green-400' :
                    analysis.riskLevel === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }>
                    {analysis.riskLevel === 'low' ? '低风险' :
                     analysis.riskLevel === 'medium' ? '中风险' : '高风险'}
                  </Badge>
                </div>

                <div>
                  <p className="text-xs text-[#A0AEC0] mb-1">建议</p>
                  <p className="text-xs text-white">{analysis.recommendation}</p>
                </div>

                {analysis.opportunities.length > 0 && (
                  <div>
                    <p className="text-xs text-[#A0AEC0] mb-1">机会</p>
                    <ul className="text-xs text-[#48BB78] space-y-1">
                      {analysis.opportunities.map((o, i) => (
                        <li key={i}>• {o}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* 秘密信息侧边栏 */}
      {showSecret && session.userSecret && (
        <div className="fixed inset-y-0 right-0 w-96 bg-[#1A2332] border-l border-[#F56565]/30 shadow-2xl z-50 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-serif text-[#F56565] flex items-center gap-2">
                <LockIcon />
                秘密简报
              </h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowSecret(false)}
                className="text-[#A0AEC0]"
              >
                ✕
              </Button>
            </div>

            <div className="space-y-6">
              {/* 真实目的 */}
              <div className="bg-[#F56565]/10 rounded-lg p-4 border border-[#F56565]/30">
                <h3 className="text-[#F56565] font-medium mb-2 flex items-center gap-2">
                  <EyeOffIcon />
                  隐藏议程
                </h3>
                <p className="text-sm text-white mb-2">
                  {session.userSecret.hiddenAgenda?.summary}
                </p>
                <ul className="text-xs text-[#A0AEC0] space-y-1">
                  {session.userSecret.hiddenAgenda?.details?.map((d: string, i: number) => (
                    <li key={i}>• {d}</li>
                  ))}
                </ul>
              </div>

              {/* 理想方案 */}
              <div className="bg-[#48BB78]/10 rounded-lg p-4 border border-[#48BB78]/30">
                <h3 className="text-[#48BB78] font-medium mb-2">理想方案</h3>
                <p className="text-sm text-white mb-2">
                  {session.userSecret.idealSolution?.summary}
                </p>
                <div className="text-xs text-[#A0AEC0]">
                  <p className="font-medium mb-1">实现条件:</p>
                  <ul className="space-y-1">
                    {session.userSecret.idealSolution?.conditions?.map((c: string, i: number) => (
                      <li key={i}>• {c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 底线 */}
              <div className="bg-[#ECC94B]/10 rounded-lg p-4 border border-[#ECC94B]/30">
                <h3 className="text-[#ECC94B] font-medium mb-2">底线</h3>
                <p className="text-sm text-white mb-2">
                  {session.userSecret.bottomLine?.summary}
                </p>
                <div className="text-xs text-[#A0AEC0]">
                  <p className="font-medium mb-1">必须满足:</p>
                  <ul className="space-y-1">
                    {session.userSecret.bottomLine?.conditions?.map((c: string, i: number) => (
                      <li key={i}>• {c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 筹码 */}
              <div className="bg-[#4A90A4]/10 rounded-lg p-4 border border-[#4A90A4]/30">
                <h3 className="text-[#4A90A4] font-medium mb-2">可用筹码</h3>
                <ul className="space-y-2">
                  {session.userSecret.leverage?.map((l: { description: string; strength: string }, i: number) => (
                    <li key={i} className="text-sm">
                      <span className="text-white">{l.description}</span>
                      <span className="text-xs text-[#A0AEC0] ml-2">
                        ({l.strength === 'strong' ? '强' : l.strength === 'medium' ? '中' : '弱'})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 弱点 */}
              <div className="bg-[#F56565]/10 rounded-lg p-4 border border-[#F56565]/30">
                <h3 className="text-[#F56565] font-medium mb-2">注意事项</h3>
                <ul className="space-y-2">
                  {session.userSecret.vulnerabilities?.map((v: { description: string; riskLevel: string }, i: number) => (
                    <li key={i} className="text-sm text-[#A0AEC0]">
                      ⚠️ {v.description}
                      <span className="text-xs ml-2">
                        ({v.riskLevel === 'high' ? '高风险' : v.riskLevel === 'medium' ? '中风险' : '低风险'})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 策略提示 */}
              <div className="bg-[#C9A962]/10 rounded-lg p-4 border border-[#C9A962]/30">
                <h3 className="text-[#C9A962] font-medium mb-2">策略建议</h3>
                <div className="space-y-3">
                  {session.userSecret.strategyHints?.map((h: { whenToUse: string; approach: string }, i: number) => (
                    <div key={i} className="text-sm">
                      <p className="text-[#C9A962] mb-1">{h.whenToUse}</p>
                      <p className="text-white">{h.approach}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 策略建议对话框 */}
      {showStrategy && strategy && (
        <Dialog open={showStrategy} onOpenChange={setShowStrategy}>
          <DialogContent className="bg-[#1A2332] border-[#243042] max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-[#C9A962] flex items-center gap-2">
                <LightbulbIcon />
                策略建议
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6 mt-4">
              <div>
                <h4 className="text-white font-medium mb-2">短期策略</h4>
                <ul className="space-y-1">
                  {strategy.shortTerm.map((s, i) => (
                    <li key={i} className="text-sm text-[#A0AEC0]">• {s}</li>
                  ))}
                </ul>
              </div>
              <Separator className="bg-[#243042]" />
              <div>
                <h4 className="text-white font-medium mb-2">中期策略</h4>
                <ul className="space-y-1">
                  {strategy.mediumTerm.map((s, i) => (
                    <li key={i} className="text-sm text-[#A0AEC0]">• {s}</li>
                  ))}
                </ul>
              </div>
              <Separator className="bg-[#243042]" />
              <div>
                <h4 className="text-white font-medium mb-2">长期策略</h4>
                <ul className="space-y-1">
                  {strategy.longTerm.map((s, i) => (
                    <li key={i} className="text-sm text-[#A0AEC0]">• {s}</li>
                  ))}
                </ul>
              </div>
              <Separator className="bg-[#243042]" />
              <div className="bg-[#F56565]/10 rounded-lg p-4">
                <h4 className="text-[#F56565] font-medium mb-2">⚠️ 警示</h4>
                <ul className="space-y-1">
                  {strategy.warnings.map((w, i) => (
                    <li key={i} className="text-sm text-[#A0AEC0]">• {w}</li>
                  ))}
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
