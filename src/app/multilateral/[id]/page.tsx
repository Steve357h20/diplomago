'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { countries, getCountryById, CountryProfile } from '@/lib/countries';
import { 
  MultilateralNegotiationSession, 
  NegotiationEvent,
  PartyInfo,
  createDefaultDifficulty,
  getSentimentLabel
} from '@/lib/multilateral-types';

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

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);

const LightbulbIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
  </svg>
);

const MapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
    <line x1="8" y1="2" x2="8" y2="18"/>
    <line x1="16" y1="6" x2="16" y2="22"/>
  </svg>
);

const HistoryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const TrendingUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 16v-4"/>
    <path d="M12 8h.01"/>
  </svg>
);

export default function MultilateralNegotiatePage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.id as string;
  
  const [session, setSession] = useState<MultilateralNegotiationSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showStrategy, setShowStrategy] = useState(false);
  const [strategyHint, setStrategyHint] = useState<string | null>(null);
  const [showCountryInfo, setShowCountryInfo] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // 加载会话
  useEffect(() => {
    const loadSession = async () => {
      try {
        const response = await fetch(`/api/multilateral?sessionId=${sessionId}`);
        const data = await response.json();
        
        if (data.session) {
          setSession(data.session);
        } else {
          // 创建模拟会话（如果没有找到）
          setSession(createMockSession(sessionId));
        }
      } catch (error) {
        console.error('加载会话失败:', error);
        setSession(createMockSession(sessionId));
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSession();
  }, [sessionId]);
  
  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [session?.timeline]);
  
  // 发送消息
  const sendMessage = async () => {
    if (!message.trim() || !session || isSending) return;
    
    setIsSending(true);
    const userMessage = message;
    setMessage('');
    
    try {
      const response = await fetch('/api/multilateral', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: userMessage,
        }),
      });
      
      const data = await response.json();
      
      if (data.responses) {
        // 更新会话
        setSession(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            ...data.updatedSession,
          };
        });
        
        // 如果是新手模式，显示策略提示
        if (session.difficulty.level === 'beginner' && data.analysis) {
          setStrategyHint(data.analysis.recommendedStrategy);
        }
      }
    } catch (error) {
      console.error('发送消息失败:', error);
      // 模拟回复
      simulateResponses(userMessage);
    } finally {
      setIsSending(false);
    }
  };
  
  // 模拟AI回复（后备方案）
  const simulateResponses = (userMessage: string) => {
    if (!session) return;
    
    const newEvents: NegotiationEvent[] = [];
    
    // 为每个对手生成回复
    session.parties.opponents.forEach((opponent, index) => {
      const responseText = generateMockResponse(userMessage, opponent);
      
      newEvents.push({
        id: `event_${Date.now()}_${opponent.countryId}`,
        timestamp: new Date().toISOString(),
        type: 'message',
        speaker: opponent.countryId,
        target: [session.parties.user.countryId],
        content: {
          text: responseText,
          simpleVersion: session.difficulty.level === 'beginner' 
            ? `通俗版：${responseText.replace(/我国/g, opponent.country.name)}` 
            : undefined,
        },
        sentiment: 50 + Math.random() * 30,
        tone: 'neutral'
      });
    });
    
    setSession(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        timeline: [...prev.timeline, ...newEvents],
      };
    });
  };
  
  // 生成模拟回复 - 每个国家有独特风格
  const generateMockResponse = (userMessage: string, opponent: PartyInfo): string => {
    const { country } = opponent;
    const { personality } = country;
    const isAggressive = userMessage.includes('抗议') || userMessage.includes('反对') || userMessage.includes('威胁');
    const isCooperative = userMessage.includes('合作') || userMessage.includes('共赢') || userMessage.includes('和平');
    const isProposing = userMessage.includes('提议') || userMessage.includes('方案') || userMessage.includes('建议');
    
    // 根据国家性格调整语气
    const prefix = personality.aggression > 6 ? '我们郑重声明' : personality.flexibility > 6 ? '我们认为' : '我们表示';
    
    if (isAggressive) {
      // 对立场景
      if (country.id === 'china') {
        return '我们强烈抗议贵方的这种说法。中国的主权和领土完整不容侵犯。我们敦促各方保持克制，回到对话轨道上来。';
      } else if (country.id === 'usa') {
        return '我们对贵方的威胁性言论表示严重关切。美国将坚决捍卫我们的利益和盟友的安全。任何冒险行为都将付出代价。';
      } else if (country.id === 'russia') {
        return '俄罗斯的立场是明确的。任何对俄罗斯核心利益的挑战都将遭到坚决回击。我们不怕任何压力。';
      } else if (country.id === 'japan') {
        return '我们对当前局势深感忧虑。日本一贯主张通过对话协商解决分歧。我们呼吁各方保持冷静，避免采取可能导致局势升级的行动。';
      } else if (country.id === 'uk') {
        return '我们对事态发展深表关切。作为负责任的大国，我们主张通过外交途径解决争端，而非使用威胁或武力。';
      } else if (country.id === 'france') {
        return '法方对贵方的表态感到遗憾。我们呼吁各方回到谈判桌前，通过对话寻求各方都能接受的解决方案。';
      } else if (country.id === 'germany') {
        return '德方对当前紧张局势深表担忧。德国主张通过和平方式解决分歧，任何单方面行动都是不可接受的。';
      } else if (country.id === 'india') {
        return '印度对当前局势表示严重关切。我们呼吁各方保持克制，通过对话而非对抗解决分歧。印度愿为缓和局势发挥建设性作用。';
      } else if (country.id === 'brazil') {
        return '我们对事态升级深感忧虑。作为发展中大国，巴西呼吁各方以大局为重，通过对话协商解决分歧。';
      } else if (country.id === 'eu') {
        return '欧盟对当前局势深表关切。我们呼吁各方回到对话轨道，任何单边行动都将损害各方利益。欧盟愿为调解发挥积极作用。';
      } else {
        return `${country.name}对贵方的表态表示关切。我们希望各方保持克制，通过对话解决分歧。`;
      }
    } else if (isCooperative) {
      // 合作场景
      if (country.id === 'china') {
        return '中国赞赏贵方展现的合作诚意。我们始终倡导互利共赢，愿与各方一道推动问题解决。中国方案致力于构建人类命运共同体。';
      } else if (country.id === 'usa') {
        return '美国注意到贵方的积极表态。我们愿意在相互尊重基础上进行建设性对话。美国支持通过谈判达成可行的协议。';
      } else if (country.id === 'russia') {
        return '俄罗斯对对话持开放态度。我们愿意讨论各方合理关切，寻求彼此都能接受的解决方案。';
      } else if (country.id === 'japan') {
        return '我们对贵方的合作意愿表示欢迎。日本一贯重视对话协商，愿意与各方加强沟通，为地区和平稳定作出贡献。';
      } else if (country.id === 'uk') {
        return '英国欢迎各方的建设性表态。我们主张通过务实对话寻求共识，这将有助于维护国际和平与繁荣。';
      } else if (country.id === 'france') {
        return '法国对各方的合作意愿表示赞赏。法国一贯主张通过多边主义解决国际问题，我们愿为推动对话发挥桥梁作用。';
      } else if (country.id === 'germany') {
        return '德国欢迎各方的积极表态。我们主张通过制度化合作解决分歧，欧洲经验表明对话是最佳选择。';
      } else if (country.id === 'india') {
        return '印度对各方的合作意愿表示欢迎。印度一贯主张战略自主，我们愿意参与建设性对话，为地区和平发挥应有作用。';
      } else if (country.id === 'brazil') {
        return '巴西欢迎各方的积极态度。我们主张南南合作与南北对话并重，愿为推动国际合作贡献力量。';
      } else if (country.id === 'eu') {
        return '欧盟欢迎各方的建设性表态。我们主张多边主义，愿与各方加强协调，共同应对全球性挑战。';
      } else {
        return `${country.name}赞赏贵方的合作意愿。我们愿意在相互尊重基础上寻求共同发展。`;
      }
    } else if (isProposing) {
      // 提议场景
      if (country.id === 'china') {
        return '我们认真研究了贵方提出的方案。中国认为可以在以下方面进行探讨：互谅互让、求同存异。我们建议设立工作组具体磋商。';
      } else if (country.id === 'usa') {
        return '美国研究了贵方的提议。我们认为有些内容值得考虑，但需要进一步明确细节。建议各方举行专门会议深入讨论。';
      } else if (country.id === 'russia') {
        return '俄罗斯研究了贵方的方案。我们注意到其中的一些积极要素。我们愿意讨论，但核心关切必须得到尊重和回应。';
      } else if (country.id === 'japan') {
        return '我们对贵方的建设性提案表示感谢。日本将认真研究，并就具体细节与各方进一步协商。我们认为对话是解决问题的唯一正确途径。';
      } else if (country.id === 'uk') {
        return '英国欢迎各方的务实提议。我们建议设立一个专门机制来推进具体讨论，这符合各方的共同利益。';
      } else if (country.id === 'france') {
        return '法国研究了贵方的提案，认为其中体现了务实精神。我们建议在保持原则的同时，展现必要的灵活性。';
      } else if (country.id === 'germany') {
        return '德国对各方的提议表示赞赏。我们建议以欧盟的成功经验为基础，通过制度化安排推进合作。';
      } else if (country.id === 'india') {
        return '印度认真研究了各方的提案。我们认为应充分考虑发展中国家的关切。建议在共识基础上逐步推进。';
      } else if (country.id === 'brazil') {
        return '巴西欢迎各方的建设性提案。我们认为应充分考虑不同发展阶段国家的需求，寻求包容性解决方案。';
      } else if (country.id === 'eu') {
        return '欧盟研究了各方的提案，认为这为深入讨论奠定了基础。我们建议召开专门会议，推动具体议题取得进展。';
      } else {
        return `感谢贵方提出的方案。${country.name}将认真研究，并就具体细节与各方进一步讨论。`;
      }
    } else {
      // 一般场景
      if (country.id === 'china') {
        return '中国的立场是一贯的。我们主张通过平等对话解决分歧，共同维护地区和平稳定。历史和现实都证明，合作是唯一正确选择。';
      } else if (country.id === 'usa') {
        return '美国继续关注事态发展。我们重申，通过外交途径解决分歧是我们的首选。我们将继续与各方保持沟通。';
      } else if (country.id === 'russia') {
        return '俄罗斯的立场是明确的。我们将根据事态发展采取必要措施维护国家利益，同时保持对话渠道畅通。';
      } else if (country.id === 'japan') {
        return '日本将继续密切关注局势发展。我们呼吁各方保持克制，通过对话协商解决分歧。日本愿为地区和平发挥建设性作用。';
      } else if (country.id === 'uk') {
        return '英国将继续关注事态发展。我们支持通过对话解决争端，这将有助于维护国际法治和地区稳定。';
      } else if (country.id === 'france') {
        return '法国将继续关注局势发展。我们主张通过多边对话寻求解决方案，这符合国际社会的共同利益。';
      } else if (country.id === 'germany') {
        return '德国将继续关注事态演变。我们支持通过制度化合作解决分歧，这将有助于建立可持续的和平框架。';
      } else if (country.id === 'india') {
        return '印度将继续关注局势发展。我们主张通过和平对话解决分歧，这符合各国的根本利益。';
      } else if (country.id === 'brazil') {
        return '巴西将继续关注事态发展。作为新兴市场国家代表，我们呼吁各方以发展大局为重，通过对话协商解决问题。';
      } else if (country.id === 'eu') {
        return '欧盟将继续关注局势发展。我们主张多边主义解决方案，这将有助于维护国际秩序和各国共同利益。';
      } else {
        return `${country.name}将继续关注事态发展，为推动问题解决贡献力量。我们相信对话是解决分歧的最佳途径。`;
      }
    }
  };
  
  // 处理键盘事件
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  // 获取阶段名称
  const getPhaseName = (phase: string) => {
    const names: { [key: string]: string } = {
      opening: '开场陈述',
      discussion: '议题讨论',
      negotiation: '深入谈判',
      summit: '峰会阶段',
      conclusion: '总结阶段',
    };
    return names[phase] || phase;
  };
  
  // 获取情绪颜色
  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 60) return '#48BB78';
    if (sentiment >= 40) return '#ECC94B';
    if (sentiment >= 20) return '#ED8936';
    return '#F56565';
  };
  
  // 创建模拟会话 - 使用4个国家作为默认
  const createMockSession = (id: string): MultilateralNegotiationSession => {
    const userCountry = countries.find(c => c.id === 'china') || countries[0];
    const opponentCountries = [
      countries.find(c => c.id === 'usa') || countries[1],
      countries.find(c => c.id === 'japan') || countries[2],
      countries.find(c => c.id === 'russia') || countries[3],
      countries.find(c => c.id === 'india') || countries[4],
    ].filter(Boolean);
    
    return {
      id,
      topic: '区域合作协定谈判',
      topicDescription: '讨论区域贸易、投资、基础设施等合作议题',
      background: '在当前国际形势下，各方需要加强合作应对共同挑战',
      parties: {
        user: {
          id: `party_${userCountry.id}`,
          countryId: userCountry.id,
          country: userCountry,
          isUser: true,
          objectives: { primary: '维护国家利益', secondary: [] },
          publicPosition: '愿意在相互尊重基础上开展合作',
          ai: { sentiment: 50, proposedDeals: [] }
        },
        opponents: opponentCountries.map(c => ({
          id: `party_${c.id}`,
          countryId: c.id,
          country: c,
          isUser: false,
          objectives: { primary: '推进本国利益', secondary: [] },
          publicPosition: '期待建设性对话',
          ai: { sentiment: 50, proposedDeals: [] }
        }))
      },
      difficulty: createDefaultDifficulty('beginner'),
      topics: [{
        id: 'topic_1',
        title: '核心议题',
        description: '区域合作协定',
        positions: {},
        status: 'pending'
      }],
      timeline: [],
      currentPhase: 'opening',
      currentSpeaker: null,
      predictions: {
        probableOutcome: '谈判进行中',
        confidenceLevel: 30,
        keyFactors: [],
        riskScenarios: []
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  };
  
  // 难度相关辅助
  const difficultyLevel = session?.difficulty.level || 'intermediate';
  const showSimpleVersion = difficultyLevel === 'beginner';
  const showStrategyHints = difficultyLevel === 'beginner' || difficultyLevel === 'intermediate';
  const showAdvancedAnalysis = difficultyLevel === 'professional';
  
  // 获取难度显示文本
  const getDifficultyLabel = () => {
    switch (difficultyLevel) {
      case 'beginner': return '新手模式';
      case 'intermediate': return '进阶模式';
      case 'professional': return '专家模式';
      default: return '未知';
    }
  };
  
  // 获取难度颜色
  const getDifficultyColor = () => {
    switch (difficultyLevel) {
      case 'beginner': return 'text-green-400';
      case 'intermediate': return 'text-amber-400';
      case 'professional': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F1419] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#C9A962] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#A0AEC0]">加载谈判会话...</p>
        </div>
      </div>
    );
  }
  
  if (!session) {
    return (
      <div className="min-h-screen bg-[#0F1419] flex items-center justify-center">
        <Card className="bg-[#1A2332] border-[#243042] max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-[#A0AEC0]">会话不存在</p>
            <Button onClick={() => router.push('/multilateral/config')} className="mt-4">
              创建新会话
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const allParties = [session.parties.user, ...session.parties.opponents, ...(session.parties.thirdParties || [])];
  
  return (
    <div className="min-h-screen bg-[#0F1419] flex flex-col">
      {/* 顶部导航 */}
      <header className="bg-[#1A2332] border-b border-[#243042] px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push('/multilateral/config')}>
              <ArrowLeftIcon />
            </Button>
            <div>
              <h1 className="font-serif text-lg font-semibold text-[#C9A962]">
                {session.topic}
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge variant="secondary" className="text-xs">
                  {getPhaseName(session.currentPhase)}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {allParties.length}方参与
                </Badge>
                {/* 难度指示器 */}
                <Badge className={`text-xs ${difficultyLevel === 'beginner' ? 'bg-green-500/20 text-green-400 border-green-500/30' : difficultyLevel === 'intermediate' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'}`}>
                  {getDifficultyLabel()}
                </Badge>
                {/* 背景故事按钮 */}
                {session.background && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-xs text-[#C9A962] hover:text-[#B89852] underline underline-offset-2">
                        查看背景
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#1A2332] border-[#243042] max-w-2xl max-h-[70vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-[#C9A962]">
                          <HistoryIcon /> 背景故事与前情概述
                        </DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <div className="bg-[#0F1419] rounded-lg p-4 text-sm text-[#A0AEC0] whitespace-pre-line">
                          {session.background}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setShowStrategy(!showStrategy)}
                    className={showStrategy ? 'text-[#C9A962]' : ''}
                  >
                    <LightbulbIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>策略提示</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MapIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#1A2332] border-[#243042] max-w-4xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle className="text-[#C9A962]">谈判态势图</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {allParties.map(party => (
                    <div 
                      key={party.id}
                      className={`p-4 rounded-lg border ${
                        party.isUser 
                          ? 'border-[#C9A962] bg-[#C9A962]/10' 
                          : 'border-[#243042] bg-[#0F1419]/50'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">{party.country.flag}</span>
                        <div>
                          <div className="font-medium">{party.country.name}</div>
                          <div className="text-xs text-[#A0AEC0]">
                            {party.isUser ? '你代表' : 'AI控制'}
                          </div>
                        </div>
                      </div>
                      
                      {/* 情绪指示 */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#A0AEC0]">态度</span>
                          <span style={{ color: getSentimentColor(party.ai?.sentiment || 50) }}>
                            {getSentimentLabel(party.ai?.sentiment || 50)}
                          </span>
                        </div>
                        <Progress 
                          value={party.ai?.sentiment || 50} 
                          className="h-1"
                          style={{
                            backgroundColor: '#243042',
                            ['--progress-foreground' as string]: getSentimentColor(party.ai?.sentiment || 50)
                          }}
                        />
                      </div>
                      
                      {/* 立场 */}
                      <div className="mt-3">
                        <div className="text-xs text-[#A0AEC0] mb-1">立场</div>
                        <p className="text-sm line-clamp-2">{party.publicPosition}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
            
            <Tabs>
              <TabsList className="bg-[#243042]">
                <TabsTrigger value="history" className="data-[state=active]:bg-[#C9A962] data-[state=active]:text-black">
                  <HistoryIcon />
                </TabsTrigger>
                <TabsTrigger value="analysis" className="data-[state=active]:bg-[#C9A962] data-[state=active]:text-black">
                  <TrendingUpIcon />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </header>
      
      {/* 主内容 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧：参与者列表 */}
        <aside className="w-64 bg-[#1A2332] border-r border-[#243042] p-4 overflow-y-auto">
          <h3 className="text-sm font-medium text-[#A0AEC0] mb-3">参与方</h3>
          <div className="space-y-3">
            {allParties.map(party => (
              <div 
                key={party.id}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  party.isUser 
                    ? 'bg-[#C9A962]/10 border border-[#C9A962]/30' 
                    : 'bg-[#0F1419]/50 border border-[#243042] hover:border-[#4A5568]'
                }`}
                onClick={() => setShowCountryInfo(party.countryId)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{party.country.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{party.country.name}</div>
                    {party.isUser && (
                      <Badge className="text-xs bg-[#C9A962] text-black">你</Badge>
                    )}
                  </div>
                </div>
                
                {/* 情绪条 */}
                <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: '#243042' }}>
                  <div 
                    className="h-full rounded-full transition-all"
                    style={{ 
                      width: `${party.ai?.sentiment || 50}%`,
                      backgroundColor: getSentimentColor(party.ai?.sentiment || 50)
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <Separator className="my-4 bg-[#243042]" />
          
          {/* 议题 */}
          <h3 className="text-sm font-medium text-[#A0AEC0] mb-3">议题</h3>
          <div className="space-y-2">
            {session.topics.map(topic => (
              <div 
                key={topic.id}
                className={`p-2 rounded-lg text-xs ${
                  topic.status === 'discussing' 
                    ? 'bg-[#C9A962]/10 text-[#C9A962]' 
                    : topic.status === 'agreed'
                      ? 'bg-[#48BB78]/10 text-[#48BB78]'
                      : 'bg-[#0F1419]/50 text-[#A0AEC0]'
                }`}
              >
                {topic.title}
              </div>
            ))}
          </div>
        </aside>
        
        {/* 中央：对话区域 */}
        <main className="flex-1 flex flex-col">
          {/* 消息列表 */}
          <ScrollArea className="flex-1 p-4">
            <div className="max-w-3xl mx-auto space-y-4">
              {/* 开场提示 */}
              {session.timeline.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#C9A962]/10 flex items-center justify-center">
                    <MapIcon />
                  </div>
                  <h3 className="font-medium mb-2">多边谈判开始</h3>
                  <p className="text-sm text-[#A0AEC0] max-w-md mx-auto">
                    这是一场关于「{session.topic}」的多边外交谈判。
                    你代表{session.parties.user.country.name}，与{allParties.filter(p => !p.isUser).map(p => p.country.name).join('、')}进行谈判。
                  </p>
                  
                  {/* 难度模式提示 */}
                  {difficultyLevel === 'beginner' && (
                    <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg max-w-md mx-auto">
                      <p className="text-green-400 text-sm font-medium mb-1">新手引导</p>
                      <p className="text-slate-400 text-xs">AI将为您提供通俗易懂的语言翻译和策略建议。您可以学习如何用专业的外交语言表达自己的观点。</p>
                    </div>
                  )}
                  {difficultyLevel === 'intermediate' && (
                    <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg max-w-md mx-auto">
                      <p className="text-amber-400 text-sm font-medium mb-1">进阶模式</p>
                      <p className="text-slate-400 text-xs">您将体验更真实的外交谈判场景。AI会提供适度的策略分析，帮助您提升谈判技巧。</p>
                    </div>
                  )}
                  {difficultyLevel === 'professional' && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg max-w-md mx-auto">
                      <p className="text-red-400 text-sm font-medium mb-1">专家模式</p>
                      <p className="text-slate-400 text-xs">这是最接近真实外交环境的模拟。您需要完全依靠自己的判断，使用专业的外交术语进行谈判。</p>
                    </div>
                  )}
                  
                  {/* 显示各方开场陈述 */}
                  <div className="mt-6 space-y-4 text-left">
                    {allParties.map(party => (
                      <div 
                        key={party.id}
                        className={`p-4 rounded-lg ${
                          party.isUser 
                            ? 'bg-[#C9A962]/10 border border-[#C9A962]/30' 
                            : 'bg-[#243042]/50'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{party.country.flag}</span>
                          <span className="font-medium text-sm">
                            {party.country.name}
                          </span>
                          {party.isUser && (
                            <Badge className="text-xs bg-[#C9A962] text-black">你</Badge>
                          )}
                        </div>
                        <p className="text-sm text-[#A0AEC0]">
                          {party.publicPosition}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* 消息列表 */}
              {session.timeline.map(event => {
                const speaker = allParties.find(p => p.countryId === event.speaker);
                const isUser = speaker?.isUser || false;
                
                return (
                  <div 
                    key={event.id}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[70%] ${
                        isUser 
                          ? 'bg-[#C9A962]/20 border border-[#C9A962]/30' 
                          : 'bg-[#243042]/50 border border-[#243042]'
                      } rounded-lg p-4`}
                    >
                      {speaker && (
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg">{speaker.country.flag}</span>
                          <span className="font-medium text-sm">{speaker.country.name}</span>
                          <Badge 
                            variant="secondary" 
                            className="text-xs"
                            style={{ 
                              backgroundColor: `${getSentimentColor(event.sentiment || 50)}20`,
                              color: getSentimentColor(event.sentiment || 50)
                            }}
                          >
                            {getSentimentLabel(event.sentiment || 50)}
                          </Badge>
                        </div>
                      )}
                      
                      <p className="text-sm whitespace-pre-wrap">{event.content.text}</p>
                      
                      {/* 根据难度级别决定是否显示通俗版本 */}
                      {showSimpleVersion && event.content.simpleVersion && (
                        <p className="mt-2 text-xs text-[#A0AEC0] italic border-t border-[#243042] pt-2">
                          {event.content.simpleVersion}
                        </p>
                      )}
                      
                      {/* 专家模式下显示原文分析 */}
                      {showAdvancedAnalysis && !event.content.simpleVersion && (
                        <p className="mt-2 text-xs text-[#666]">
                          发言者情绪: {getSentimentLabel(event.sentiment || 50)}
                        </p>
                      )}
                      
                      <div className="mt-2 text-xs text-[#666]">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                );
              })}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          {/* 策略提示 - 仅beginner和intermediate显示 */}
          {showStrategyHints && strategyHint && (
            <div className="mx-4 mb-2 p-3 rounded-lg bg-[#C9A962]/10 border border-[#C9A962]/30">
              <div className="flex items-start gap-2">
                <LightbulbIcon />
                <div>
                  <div className="text-xs font-medium text-[#C9A962] mb-1">策略建议</div>
                  <p className="text-sm">{strategyHint}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-auto h-auto p-1"
                  onClick={() => setStrategyHint(null)}
                >
                  ×
                </Button>
              </div>
            </div>
          )}
          
          {/* 输入区域 */}
          <div className="border-t border-[#243042] bg-[#1A2332] p-4">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <Textarea
                  ref={inputRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="输入你的发言... (Ctrl+Enter 发送)"
                  rows={3}
                  className="pr-16 resize-none bg-[#0F1419] border-[#243042] focus:border-[#C9A962]"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!message.trim() || isSending}
                  size="icon"
                  className="absolute right-2 bottom-2 bg-[#C9A962] hover:bg-[#B89852] text-black"
                >
                  {isSending ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <SendIcon />
                  )}
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-[#666]">
                <span>支持 Ctrl+Enter 发送</span>
                <span className={getDifficultyColor()}>
                  {difficultyLevel === 'beginner' && '新手模式 - AI将为您提供通俗语言翻译'}
                  {difficultyLevel === 'intermediate' && '进阶模式 - 适度辅助已开启'}
                  {difficultyLevel === 'professional' && '专家模式 - 完全自主谈判'}
                </span>
              </div>
            </div>
          </div>
        </main>
        
        {/* 右侧：分析面板 */}
        {showStrategy && (
          <aside className="w-80 bg-[#1A2332] border-l border-[#243042] p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-[#C9A962]">策略分析</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowStrategy(false)}>
                ×
              </Button>
            </div>
            
            {/* 局势评估 */}
            <Card className="bg-[#0F1419] border-[#243042] mb-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">局势评估</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-xs text-[#A0AEC0] mb-1">各方平均态度</div>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={allParties.reduce((s, p) => s + (p.ai?.sentiment || 50), 0) / allParties.length} 
                      className="flex-1 h-2"
                    />
                    <span className="text-sm">
                      {Math.round(allParties.reduce((s, p) => s + (p.ai?.sentiment || 50), 0) / allParties.length)}%
                    </span>
                  </div>
                </div>
                
                <div>
                  <div className="text-xs text-[#A0AEC0] mb-1">谈判阶段</div>
                  <Badge variant="secondary">{getPhaseName(session.currentPhase)}</Badge>
                </div>
                
                <div>
                  <div className="text-xs text-[#A0AEC0] mb-1">消息数量</div>
                  <span className="text-sm">{session.timeline.length} 条</span>
                </div>
              </CardContent>
            </Card>
            
            {/* 建议策略 */}
            <Card className="bg-[#0F1419] border-[#243042] mb-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">建议策略</CardTitle>
              </CardHeader>
              <CardContent>
                {session.difficulty.level === 'beginner' ? (
                  <div className="space-y-2 text-sm">
                    <p className="text-[#A0AEC0]">
                      1. 先了解各方的核心诉求
                    </p>
                    <p className="text-[#A0AEC0]">
                      2. 寻找共同利益点
                    </p>
                    <p className="text-[#A0AEC0]">
                      3. 在核心利益上坚持立场
                    </p>
                    <p className="text-[#A0AEC0]">
                      4. 在次要问题上可以适度让步
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 text-sm">
                    <p className="text-[#A0AEC0]">
                      • 运用议题捆绑策略
                    </p>
                    <p className="text-[#A0AEC0]">
                      • 展示筹码但不滥用
                    </p>
                    <p className="text-[#A0AEC0]">
                      • 保持沟通渠道畅通
                    </p>
                    <p className="text-[#A0AEC0]">
                      • 准备多个替代方案
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* 各国分析 */}
            <Card className="bg-[#0F1419] border-[#243042]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">各国特点</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {allParties.filter(p => !p.isUser).slice(0, 3).map(party => (
                  <div key={party.id} className="p-2 rounded bg-[#1A2332]">
                    <div className="flex items-center gap-2 mb-2">
                      <span>{party.country.flag}</span>
                      <span className="text-sm font-medium">{party.country.name}</span>
                    </div>
                    <div className="text-xs text-[#A0AEC0] space-y-1">
                      <div>风格: {party.country.negotiationStyle.primary}</div>
                      <div>灵活性: {party.country.personality.flexibility}/10</div>
                      <div>耐心: {party.country.personality.patience}/10</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        )}
      </div>
      
      {/* 国家详情弹窗 */}
      <Dialog open={!!showCountryInfo} onOpenChange={() => setShowCountryInfo(null)}>
        <DialogContent className="bg-[#1A2332] border-[#243042] max-w-lg">
          {showCountryInfo && (() => {
            const country = getCountryById(showCountryInfo);
            if (!country) return null;
            
            return (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <span className="text-3xl">{country.flag}</span>
                    <div>
                      <div>{country.name}</div>
                      <div className="text-sm text-[#A0AEC0] font-normal">{country.region}</div>
                    </div>
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4 mt-4 max-h-[60vh] overflow-y-auto">
                  <div>
                    <h4 className="text-sm font-medium text-[#C9A962] mb-2">历史文化</h4>
                    <p className="text-sm text-[#A0AEC0]">{country.historicalBackground.brief}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-[#C9A962] mb-2">谈判性格</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>攻击性：<span className="text-white">{country.personality.aggression}/10</span></div>
                      <div>灵活性：<span className="text-white">{country.personality.flexibility}/10</span></div>
                      <div>耐心：<span className="text-white">{country.personality.patience}/10</span></div>
                      <div>风险承受：<span className="text-white">{country.personality.riskTolerance}/10</span></div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-[#C9A962] mb-2">核心利益</h4>
                    <ul className="text-sm text-[#A0AEC0] space-y-1">
                      {country.coreInterests.slice(0, 4).map((interest, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-red-400">•</span>
                          {interest}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-[#C9A962] mb-2">可谈判利益</h4>
                    <div className="flex flex-wrap gap-1">
                      {country.negotiableInterests.slice(0, 4).map((interest, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-[#C9A962] mb-2">典型策略</h4>
                    <div className="flex flex-wrap gap-1">
                      {country.typicalStrategies.slice(0, 3).map((strategy, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {strategy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
