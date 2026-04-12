'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SentimentData } from '@/types/negotiation';

interface CameraPanelProps {
  onSentimentDetected?: (sentiment: SentimentData) => void;
  isActive?: boolean;
  onToggle?: () => void;
}

export default function CameraPanel({ 
  onSentimentDetected, 
  isActive = false, 
  onToggle 
}: CameraPanelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentSentiment, setCurrentSentiment] = useState<SentimentData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);
  const analyzeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user',
        },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setIsStreaming(true);
          setHasPermission(true);
        };
      }
    } catch (error) {
      console.error('Camera permission denied:', error);
      setHasPermission(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsStreaming(false);
    if (analyzeIntervalRef.current) {
      clearInterval(analyzeIntervalRef.current);
    }
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current || !isStreaming) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx || video.videoWidth === 0) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/analyze-sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData }),
      });

      const sentiment: SentimentData = await response.json();
      setCurrentSentiment(sentiment);
      onSentimentDetected?.(sentiment);
    } catch (error) {
      console.error('Sentiment analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    if (isActive && isStreaming) {
      // 每3秒分析一次
      analyzeIntervalRef.current = setInterval(captureAndAnalyze, 3000);
    }

    return () => {
      if (analyzeIntervalRef.current) {
        clearInterval(analyzeIntervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, isStreaming]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const emotionLabels: Record<string, { label: string; color: string }> = {
    neutral: { label: '中性', color: '#A0AEC0' },
    positive: { label: '积极', color: '#48BB78' },
    negative: { label: '消极', color: '#F56565' },
    suspicious: { label: '怀疑', color: '#ECC94B' },
    angry: { label: '愤怒', color: '#E53E3E' },
    pleased: { label: '满意', color: '#38B2AC' },
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden"
    >
      {/* 头部 */}
      <div className="px-4 py-3 border-b border-slate-700/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isStreaming ? 'bg-green-400 animate-pulse' : 'bg-slate-500'}`} />
          <span className="text-sm text-slate-300">表情分析</span>
        </div>
        <button
          onClick={onToggle}
          className="text-xs text-amber-400 hover:text-amber-300"
        >
          {isActive ? '收起' : '展开'}
        </button>
      </div>

      {isActive && (
        <div className="p-4 space-y-4">
          {/* 视频预览 */}
          <div className="relative aspect-video bg-slate-800 rounded-xl overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${!isStreaming ? 'hidden' : ''}`}
            />
            
            {!isStreaming && hasPermission === null && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <button
                  onClick={startCamera}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-sm rounded-xl transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  开启摄像头
                </button>
                <span className="text-xs text-slate-500">用于分析您的表情和语气</span>
              </div>
            )}

            {!isStreaming && hasPermission === false && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
                <span className="text-sm text-slate-400">摄像头权限被拒绝</span>
                <span className="text-xs text-slate-500">请在浏览器设置中允许摄像头访问</span>
              </div>
            )}

            {/* 分析指示器 */}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs text-white">分析中...</span>
                </div>
              </div>
            )}

            {/* 隐藏的 canvas */}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          {/* 情绪显示 */}
          {currentSentiment && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: `${emotionLabels[currentSentiment.emotion]?.color}20`,
                      color: emotionLabels[currentSentiment.emotion]?.color,
                    }}
                  >
                    {emotionLabels[currentSentiment.emotion]?.label}
                  </span>
                </div>
                <span className="text-xs text-slate-500">
                  置信度 {(currentSentiment.confidence * 100).toFixed(0)}%
                </span>
              </div>

              {/* 强度条 */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">情绪强度</span>
                  <span className="text-slate-400">{currentSentiment.intensity}%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${currentSentiment.intensity}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${emotionLabels[currentSentiment.emotion]?.color}, ${emotionLabels[currentSentiment.emotion]?.color}80)`,
                    }}
                  />
                </div>
              </div>

              {/* 微表情 */}
              {currentSentiment.microExpressions && currentSentiment.microExpressions.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {currentSentiment.microExpressions.map((expr, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-slate-800 text-slate-400 text-xs rounded"
                    >
                      {expr.type}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 提示信息 */}
          <div className="text-xs text-slate-500 space-y-1">
            <p>* 表情分析仅供参考</p>
            <p>* 您的画面不会被保存或上传</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
