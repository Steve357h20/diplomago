'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ChevronRight, 
  Brain, 
  Camera, 
  TrendingUp, 
  BookOpen,
  Users,
  Shield,
  Lightbulb,
  Award,
  Globe,
  MessageSquare,
  Target
} from 'lucide-react';

export default function AboutPage() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  const features = [
    {
      icon: Brain,
      title: 'AI智能模拟',
      description: '基于DeepSeek R1深度思考模型和豆包Seed模型，模拟真实的外交谈判场景和对方谈判队行为模式。',
      details: [
        '支持多种谈判场景：贸易协定、领土争端、和平协议、环境议题等',
        'AI对手具有真实的决策逻辑和博弈策略',
        '实时生成符合场景的对话内容',
      ],
      color: 'amber',
    },
    {
      icon: MessageSquare,
      title: '选项式外交语言训练',
      description: '提供多种外交语言表达选项，帮助用户学习如何用专业的外交语言表达观点。',
      details: [
        '四种语气类型：外交型、强硬型、温和型、策略型',
        '每次选择后提供语言艺术分析',
        '学习经典外交案例中的措辞技巧',
      ],
      color: 'blue',
    },
    {
      icon: Camera,
      title: '表情语气分析',
      description: '通过摄像头实时分析您的表情和语气，帮助您提升非语言沟通能力。',
      details: [
        '实时微表情识别：紧张、放松、愤怒、怀疑等',
        '语速与音量分析',
        '表现评分与改进建议',
      ],
      color: 'green',
    },
    {
      icon: TrendingUp,
      title: '实时策略分析',
      description: 'AI实时分析谈判走向，提供策略建议和获利率预测。',
      details: [
        '局势评估与走势预测',
        '对方态度变化追踪',
        '关键时刻提醒与建议',
      ],
      color: 'purple',
    },
    {
      icon: BookOpen,
      title: '历史案例数据库',
      description: '基于真实外交事件和案例，提供深入的历史参考和学习资源。',
      details: [
        '戴维营协议、日美汽车谈判、英国脱欧等经典案例',
        '完整的谈判过程、语言艺术和博弈分析',
        '可点击查看每个案例的详细内容和策略解读',
      ],
      color: 'red',
    },
    {
      icon: Target,
      title: '结果分析报告',
      description: '谈判结束后提供详细的复盘分析，帮助您持续提升谈判能力。',
      details: [
        '关键决策点回顾',
        '优势与不足分析',
        '个性化改进建议',
      ],
      color: 'cyan',
    },
  ];

  const milestones = [
    { year: '2024', event: '平台概念设计完成' },
    { year: '2025 Q1', event: 'AI模型集成与测试' },
    { year: '2025 Q2', event: '历史案例数据库构建' },
    { year: '2025 Q3', event: '表情分析功能上线' },
    { year: '2025 Q4', event: '选项式语言训练系统' },
  ];

  const getColorClasses = (color: string, type: 'bg' | 'border' | 'text') => {
    const colors: Record<string, Record<string, string>> = {
      amber: { bg: 'bg-amber-500/20', border: 'border-amber-500/30', text: 'text-amber-400' },
      blue: { bg: 'bg-blue-500/20', border: 'border-blue-500/30', text: 'text-blue-400' },
      green: { bg: 'bg-green-500/20', border: 'border-green-500/30', text: 'text-green-400' },
      purple: { bg: 'bg-purple-500/20', border: 'border-purple-500/30', text: 'text-purple-400' },
      red: { bg: 'bg-red-500/20', border: 'border-red-500/30', text: 'text-red-400' },
      cyan: { bg: 'bg-cyan-500/20', border: 'border-cyan-500/30', text: 'text-cyan-400' },
    };
    return colors[color][type];
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
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                <ChevronRight className="w-5 h-5 rotate-180" />
                <span>返回首页</span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">Diplomatic AI</span>
            </div>
          </div>
        </div>
      </nav>

      {/* 主内容 */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-400">关于平台</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            AI 外交谈判
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent"> 智能模拟平台 </span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            通过人工智能技术模拟真实的外交谈判环境，帮助外交从业者和学习者
            提升谈判技巧，积累实战经验，制定最优谈判策略
          </p>
        </motion.div>

        {/* 核心价值 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-amber-500/20 rounded-2xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">安全学习环境</h3>
            <p className="text-slate-400">在无风险的虚拟环境中练习外交谈判，降低实战失误成本</p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-500/20 rounded-2xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">AI智能驱动</h3>
            <p className="text-slate-400">基于前沿大语言模型，模拟真实的谈判对手和复杂场景</p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-2xl flex items-center justify-center">
              <Award className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">系统化训练</h3>
            <p className="text-slate-400">从案例分析到实战模拟，提供完整的外交谈判能力提升路径</p>
          </div>
        </motion.div>

        {/* 功能介绍 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-8 flex items-center justify-center gap-3">
            <Globe className="w-6 h-6 text-amber-400" />
            核心功能
          </h2>
          
          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`bg-slate-900/50 backdrop-blur-xl rounded-2xl border transition-all cursor-pointer ${
                  activeFeature === index 
                    ? getColorClasses(feature.color, 'border')
                    : 'border-slate-700/50 hover:border-slate-600'
                }`}
                onClick={() => setActiveFeature(activeFeature === index ? null : index)}
              >
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColorClasses(feature.color, 'bg')}`}>
                      <feature.icon className={`w-6 h-6 ${getColorClasses(feature.color, 'text')}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                      <p className="text-slate-400 text-sm">{feature.description}</p>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-slate-500 transition-transform ${
                      activeFeature === index ? 'rotate-90' : ''
                    }`} />
                  </div>
                  
                  <AnimatePresence>
                    {activeFeature === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-slate-700/50">
                          <ul className="space-y-2">
                            {feature.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start gap-2 text-slate-300">
                                <span className={`w-1.5 h-1.5 rounded-full mt-2 ${getColorClasses(feature.color, 'bg').replace('/20', '')}`} />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 技术架构 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Users className="w-6 h-6 text-amber-400" />
            技术架构
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">AI模型</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg">
                  <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">豆包 Seed 2.0</p>
                    <p className="text-xs text-slate-500">主对话生成 · 复杂推理</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">豆包 Seed 1.6 Vision</p>
                    <p className="text-xs text-slate-500">多模态分析 · 表情识别</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">DeepSeek R1</p>
                    <p className="text-xs text-slate-500">深度思考 · 策略分析</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">技术栈</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-slate-300">Next.js 16 (App Router)</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-slate-300">React 19 + TypeScript 5</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-slate-300">Tailwind CSS 4 + shadcn/ui</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-slate-300">WebRTC 实时表情分析</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 发展历程 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-8 flex items-center justify-center gap-3">
            <Globe className="w-6 h-6 text-amber-400" />
            发展历程
          </h2>
          
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-700" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`relative flex items-center gap-4 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center z-10 flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </div>
                  <div className={`flex-1 bg-slate-900/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-4 ${
                    index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                  }`}>
                    <span className="text-amber-400 font-semibold">{milestone.year}</span>
                    <p className="text-white mt-1">{milestone.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 免责声明 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-800/30 rounded-2xl border border-slate-700/50 p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-white mb-4">免责声明</h3>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li>• 本平台仅供教育和培训目的，不构成任何外交政策建议</li>
            <li>• 历史案例分析仅供参考，实际外交情况远比模拟场景复杂</li>
            <li>• AI生成的内容可能存在局限性，请结合实际情况判断</li>
            <li>• 表情分析功能需要摄像头权限，不会保存任何图像数据</li>
          </ul>
        </motion.div>

        {/* 底部CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/configure"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-semibold rounded-2xl transition-all shadow-2xl shadow-amber-500/25"
          >
            <span>开始模拟训练</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </main>

      {/* 底部 */}
      <footer className="relative z-10 border-t border-slate-800/50 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-sm">
          <p>Diplomatic AI · AI外交谈判智能模拟平台</p>
        </div>
      </footer>
    </div>
  );
}
