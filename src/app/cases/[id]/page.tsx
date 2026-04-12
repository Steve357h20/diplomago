'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Scale, BookOpen, Users, Lightbulb, FileText, ChevronRight, Calendar, User } from 'lucide-react';

interface DiplomaticCase {
  id: string;
  name: string;
  year: number;
  parties: {
    self: { name: string; country: string; flag: string };
    opponent: { name: string; country: string; flag: string };
  };
  topic: string;
  background?: {
    summary: string;
    historicalContext: string;
    keyInterests: { self: string[]; opponent: string[] };
    constraints: { self: string[]; opponent: string[] };
  };
  negotiationProcess?: {
    phases: Array<{
      name: string;
      summary: string;
      keyMoments: Array<{
        speaker: 'self' | 'opponent';
        action: string;
        language: string;
        analysis: string;
      }>;
    }>;
  };
  outcome?: {
    result: 'success' | 'partial' | 'failure';
    score: number;
    agreement?: string;
    keyTerms?: string[];
    consequences: string;
  };
  languageAnalysis?: {
    techniques: Array<{ name: string; description: string; example: string }>;
    keyPhrases: Array<{ phrase: string; meaning: string; usage: string }>;
  };
  lessons?: string[];
  sources?: string[];
}

export default function CaseDetailPage() {
  const params = useParams();
  const caseId = params.id as string;
  const [diplomaticCase, setDiplomaticCase] = useState<DiplomaticCase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCase() {
      try {
        const response = await fetch(`/api/cases/${encodeURIComponent(caseId)}`);
        if (!response.ok) {
          setError('案例未找到');
          setDiplomaticCase(null);
        } else {
          const data = await response.json();
          setDiplomaticCase(data);
          setError(null);
        }
      } catch (err) {
        setError('加载案例失败');
        setDiplomaticCase(null);
      } finally {
        setLoading(false);
      }
    }
    fetchCase();
  }, [caseId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1419] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[#C9A962] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#A0AEC0]">正在加载案例...</p>
        </div>
      </div>
    );
  }

  if (error || !diplomaticCase) {
    return (
      <div className="min-h-screen bg-[#0F1419] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#F7F9FC] mb-4">{error || '案例未找到'}</h1>
          <p className="text-[#A0AEC0] mb-6">尝试使用案例的完整ID或不同的搜索词</p>
          <Link href="/analysis">
            <Button className="bg-[#C9A962] text-[#1A1A1A] hover:bg-[#B8983A]">
              返回分析页面
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const resultColors = {
    success: 'text-green-400',
    partial: 'text-yellow-400',
    failure: 'text-red-400',
  };

  const resultLabels = {
    success: '成功',
    partial: '部分成功',
    failure: '未能达成',
  };

  return (
    <div className="min-h-screen bg-[#0F1419] text-[#F7F9FC]">
      {/* Header */}
      <header className="bg-[#1A2332] border-b border-[#C9A962]/20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/analysis">
              <Button variant="ghost" size="icon" className="text-[#A0AEC0] hover:text-[#F7F9FC]">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{diplomaticCase.parties.self.flag}</span>
                <span className="text-[#A0AEC0]">vs</span>
                <span className="text-3xl">{diplomaticCase.parties.opponent.flag}</span>
              </div>
              <h1 className="text-2xl font-bold font-serif text-[#C9A962]">
                {diplomaticCase.name}
              </h1>
              <p className="text-sm text-[#A0AEC0]">{diplomaticCase.year} · {diplomaticCase.topic}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* 结果概览 */}
        {diplomaticCase.outcome && (
        <section className="bg-[#1A2332] rounded-xl p-6 border border-[#C9A962]/20">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full border-4 flex items-center justify-center"
                style={{
                  borderColor: diplomaticCase.outcome.score > 0 ? '#48BB78' : diplomaticCase.outcome.score < -20 ? '#F56565' : '#ECC94B',
                }}>
                <span className={`text-3xl font-bold ${resultColors[diplomaticCase.outcome.result]}`}>
                  {diplomaticCase.outcome.score > 0 ? '+' : ''}{diplomaticCase.outcome.score}
                </span>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-[#C9A962] mb-2 flex items-center gap-2">
                <Scale className="w-5 h-5" />
                谈判结果
              </h2>
              <p className={`text-lg font-medium ${resultColors[diplomaticCase.outcome.result]} mb-3`}>
                {resultLabels[diplomaticCase.outcome.result]}
              </p>
              {diplomaticCase.outcome.agreement && (
                <p className="text-[#A0AEC0] leading-relaxed">{diplomaticCase.outcome.agreement}</p>
              )}
            </div>
          </div>
        </section>
        )}

        {/* 谈判背景 */}
        {diplomaticCase.background && (
        <section className="bg-[#1A2332] rounded-xl p-6 border border-[#C9A962]/20">
          <h2 className="text-lg font-semibold text-[#C9A962] mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            历史背景
          </h2>
          <p className="text-[#F7F9FC] leading-relaxed mb-6">{diplomaticCase.background.summary}</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#243042] rounded-lg p-4">
              <h3 className="font-medium text-[#C9A962] mb-3">{diplomaticCase.parties.self.name} ({diplomaticCase.parties.self.country})</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-[#A0AEC0] mb-1">核心利益</p>
                  <ul className="space-y-1">
                    {diplomaticCase.background.keyInterests.self.map((interest, i) => (
                      <li key={i} className="text-sm text-[#F7F9FC] flex items-start gap-2">
                        <span className="text-[#C9A962]">•</span>
                        {interest}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-[#A0AEC0] mb-1">约束条件</p>
                  <ul className="space-y-1">
                    {diplomaticCase.background.constraints.self.map((constraint, i) => (
                      <li key={i} className="text-sm text-[#F7F9FC] flex items-start gap-2">
                        <span className="text-[#F56565]">•</span>
                        {constraint}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-[#243042] rounded-lg p-4">
              <h3 className="font-medium text-[#4A90A4] mb-3">{diplomaticCase.parties.opponent.name} ({diplomaticCase.parties.opponent.country})</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-[#A0AEC0] mb-1">核心利益</p>
                  <ul className="space-y-1">
                    {diplomaticCase.background.keyInterests.opponent.map((interest, i) => (
                      <li key={i} className="text-sm text-[#F7F9FC] flex items-start gap-2">
                        <span className="text-[#4A90A4]">•</span>
                        {interest}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm text-[#A0AEC0] mb-1">约束条件</p>
                  <ul className="space-y-1">
                    {diplomaticCase.background.constraints.opponent.map((constraint, i) => (
                      <li key={i} className="text-sm text-[#F7F9FC] flex items-start gap-2">
                        <span className="text-[#F56565]">•</span>
                        {constraint}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* 谈判过程 */}
        {diplomaticCase.negotiationProcess && (
        <section className="bg-[#1A2332] rounded-xl p-6 border border-[#C9A962]/20">
          <h2 className="text-lg font-semibold text-[#C9A962] mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            谈判过程
          </h2>
          <div className="space-y-6">
            {diplomaticCase.negotiationProcess.phases.map((phase, phaseIndex) => (
              <div key={phaseIndex} className="border-l-2 border-[#C9A962]/30 pl-6">
                <h3 className="font-medium text-[#F7F9FC] mb-2">{phase.name}</h3>
                <p className="text-sm text-[#A0AEC0] mb-4">{phase.summary}</p>
                <div className="space-y-4">
                  {phase.keyMoments.map((moment, momentIndex) => (
                    <div key={momentIndex} className="bg-[#243042] rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 text-xs rounded ${
                          moment.speaker === 'self' 
                            ? 'bg-[#C9A962]/20 text-[#C9A962]' 
                            : 'bg-[#4A90A4]/20 text-[#4A90A4]'
                        }`}>
                          {moment.speaker === 'self' ? diplomaticCase.parties.self.name : diplomaticCase.parties.opponent.name}
                        </span>
                        <span className="text-sm text-[#A0AEC0]">{moment.action}</span>
                      </div>
                      <p className="text-[#F7F9FC] italic mb-2">"{moment.language}"</p>
                      <p className="text-sm text-[#A0AEC0]">{moment.analysis}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        )}

        {/* 语言艺术分析 */}
        {diplomaticCase.languageAnalysis && (
        <section className="bg-[#1A2332] rounded-xl p-6 border border-[#C9A962]/20">
          <h2 className="text-lg font-semibold text-[#C9A962] mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            语言艺术分析
          </h2>
          
          <div className="mb-6">
            <h3 className="text-md font-medium text-[#F7F9FC] mb-3">核心技巧</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {diplomaticCase.languageAnalysis.techniques.map((technique, i) => (
                <div key={i} className="bg-[#243042] rounded-lg p-4">
                  <h4 className="font-medium text-[#C9A962] mb-2">{technique.name}</h4>
                  <p className="text-sm text-[#A0AEC0] mb-2">{technique.description}</p>
                  <p className="text-sm text-[#F7F9FC] italic">"{technique.example}"</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-md font-medium text-[#F7F9FC] mb-3">关键词语解读</h3>
            <div className="space-y-3">
              {diplomaticCase.languageAnalysis.keyPhrases.map((phrase, i) => (
                <div key={i} className="bg-[#243042] rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#C9A962] font-medium">"{phrase.phrase}"</span>
                  </div>
                  <p className="text-sm text-[#A0AEC0] mb-1"><span className="text-[#4A90A4]">含义：</span>{phrase.meaning}</p>
                  <p className="text-sm text-[#A0AEC0]"><span className="text-[#4A90A4]">用法：</span>{phrase.usage}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* 参考价值 */}
        {diplomaticCase.lessons && diplomaticCase.lessons.length > 0 && (
        <section className="bg-[#1A2332] rounded-xl p-6 border border-[#C9A962]/20">
          <h2 className="text-lg font-semibold text-[#C9A962] mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            参考价值
          </h2>
          <div className="space-y-3">
            {diplomaticCase.lessons.map((lesson, i) => (
              <div key={i} className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-[#C9A962] flex-shrink-0 mt-0.5" />
                <p className="text-[#F7F9FC]">{lesson}</p>
              </div>
            ))}
          </div>
        </section>
        )}

        {/* 来源 */}
        {diplomaticCase.sources && diplomaticCase.sources.length > 0 && (
        <section className="bg-[#1A2332] rounded-xl p-6 border border-[#C9A962]/20">
          <h2 className="text-lg font-semibold text-[#C9A962] mb-4">参考来源</h2>
          <ul className="space-y-2">
            {diplomaticCase.sources.map((source, i) => (
              <li key={i} className="text-sm text-[#A0AEC0]">{source}</li>
            ))}
          </ul>
        </section>
        )}
      </main>
    </div>
  );
}
