'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Message } from '@/types/negotiation';

interface NegotiationBubbleProps {
  message: Message;
}

const emotionColors: Record<string, string> = {
  neutral: '#A0AEC0',
  positive: '#48BB78',
  negative: '#F56565',
  suspicious: '#ECC94B',
  angry: '#E53E3E',
  pleased: '#38B2AC',
};

const emotionIcons: Record<string, React.ReactNode> = {
  neutral: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  positive: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  negative: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  suspicious: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  angry: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
  pleased: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
};

export default function NegotiationBubble({ message }: NegotiationBubbleProps) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [isTyping, setIsTyping] = useState(message.role === 'assistant');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (message.role === 'assistant' && isTyping) {
      let index = 0;
      const content = message.content;
      const timer = setInterval(() => {
        if (index <= content.length) {
          setDisplayedContent(content.slice(0, index));
          index++;
        } else {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, 20);
      return () => clearInterval(timer);
    } else {
      setDisplayedContent(message.content);
    }
  }, [message.content, message.role, isTyping]);

  const isUser = message.role === 'user';
  const sentiment = message.sentiment;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[75%] ${isUser ? 'order-2' : 'order-1'}`}>
        {/* 角色标签 */}
        <div className="flex items-center gap-2 mb-1">
          {!isUser && (
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-xs text-slate-400">对方谈判代表</span>
            </div>
          )}
          {isUser && (
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-amber-600/20 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="text-xs text-slate-400">你</span>
            </div>
          )}
        </div>

        {/* 消息气泡 */}
        <div
          className={`relative px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-gradient-to-br from-amber-600/90 to-amber-700/90 text-white rounded-tr-sm'
              : 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 text-slate-100 rounded-tl-sm border border-slate-700/50'
          }`}
        >
          {/* 打字机效果光标 */}
          {isTyping && (
            <span className="inline-block w-2 h-5 bg-current animate-pulse ml-1" />
          )}
          
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {displayedContent}
          </p>

          {/* 情绪指示器 */}
          {sentiment && !isTyping && (
            <div className="mt-2 pt-2 border-t border-white/10 flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                style={{
                  backgroundColor: `${emotionColors[sentiment.emotion]}20`,
                  color: emotionColors[sentiment.emotion],
                }}
              >
                {emotionIcons[sentiment.emotion]}
                {sentiment.emotion}
              </span>
              <span className="text-xs text-white/50">
                置信度 {(sentiment.confidence * 100).toFixed(0)}%
              </span>
            </div>
          )}

          {/* 时间戳 */}
          <span className={`absolute text-xs ${isUser ? 'right-3 -bottom-5' : 'left-3 -bottom-5'} text-slate-500`}>
            {new Date(message.timestamp).toLocaleTimeString('zh-CN', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>

        {/* 策略标签 */}
        {message.strategyTags && message.strategyTags.length > 0 && !isTyping && (
          <div className="mt-2 flex flex-wrap gap-1">
            {message.strategyTags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-slate-800/50 text-slate-400 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
