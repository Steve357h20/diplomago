'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ConfigWizard from '@/components/config/ConfigWizard';
import AIAssistant from '@/components/ai-assistant/AIAssistant';
import { AssistantMessage, NegotiationTopic, Party, BilateralDifficulty } from '@/types/negotiation';

export default function ConfigurePage() {
  const router = useRouter();
  const [assistantMessages, setAssistantMessages] = useState<AssistantMessage[]>([]);
  const [isAssistantExpanded, setIsAssistantExpanded] = useState(false);

  useEffect(() => {
    const welcomeMessage: AssistantMessage = {
      id: 'config-welcome',
      role: 'assistant',
      content: '您好！在开始模拟之前，我需要了解一些关于这次谈判的信息。请根据向导提示逐步完成配置。您提供的背景越详细，模拟效果就越好。',
      timestamp: Date.now(),
      emotion: 'friendly',
    };
    setAssistantMessages([welcomeMessage]);
  }, []);

  const handleConfigComplete = (config: {
    topic: NegotiationTopic;
    selfParty: Party;
    opponentParty: Party;
    objectives: string[];
    difficulty: BilateralDifficulty;
  }) => {
    // 保存配置到 sessionStorage
    sessionStorage.setItem('negotiation-config', JSON.stringify(config));

    // 跳转到谈判页面
    router.push('/negotiate');
  };

  return (
    <div className="min-h-screen">
      <ConfigWizard onComplete={handleConfigComplete} />
      
      <AIAssistant
        messages={assistantMessages}
        currentPhase="config"
        isExpanded={isAssistantExpanded}
        onToggle={() => setIsAssistantExpanded(!isAssistantExpanded)}
      />
    </div>
  );
}
