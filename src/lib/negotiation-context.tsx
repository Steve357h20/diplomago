'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { NegotiationState, NegotiationContext, Message, SentimentData, StrategyHint } from '@/types/negotiation';

// 初始状态
const initialState: NegotiationState = {
  sessionId: null,
  context: null,
  messages: [],
  currentSentiment: null,
  outcomePrediction: 50,
  phase: 'setup',
  turnCount: 0,
  isAiThinking: false,
};

// Action类型
type Action =
  | { type: 'SET_SESSION'; payload: string }
  | { type: 'SET_CONTEXT'; payload: NegotiationContext }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'UPDATE_SENTIMENT'; payload: SentimentData }
  | { type: 'SET_PREDICTION'; payload: number }
  | { type: 'SET_PHASE'; payload: 'setup' | 'negotiating' | 'concluded' }
  | { type: 'INCREMENT_TURN' }
  | { type: 'SET_AI_THINKING'; payload: boolean }
  | { type: 'RESET_SESSION' };

// Reducer
function negotiationReducer(state: NegotiationState, action: Action): NegotiationState {
  switch (action.type) {
    case 'SET_SESSION':
      return { ...state, sessionId: action.payload };
    case 'SET_CONTEXT':
      return { ...state, context: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'UPDATE_SENTIMENT':
      return { ...state, currentSentiment: action.payload };
    case 'SET_PREDICTION':
      return { ...state, outcomePrediction: Math.max(-100, Math.min(100, action.payload)) };
    case 'SET_PHASE':
      return { ...state, phase: action.payload };
    case 'INCREMENT_TURN':
      return { ...state, turnCount: state.turnCount + 1 };
    case 'SET_AI_THINKING':
      return { ...state, isAiThinking: action.payload };
    case 'RESET_SESSION':
      return initialState;
    default:
      return state;
  }
}

// Context类型
interface NegotiationContextType {
  state: NegotiationState;
  dispatch: React.Dispatch<Action>;
  sendMessage: (content: string) => Promise<void>;
  updateSentiment: (sentiment: SentimentData) => void;
  getStrategyHint: () => Promise<StrategyHint | null>;
}

const NegotiationContextInstance = createContext<NegotiationContextType | undefined>(undefined);

// Provider
export function NegotiationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(negotiationReducer, initialState);

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: Date.now(),
      sentiment: state.currentSentiment || undefined,
    };

    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
    dispatch({ type: 'INCREMENT_TURN' });
    dispatch({ type: 'SET_AI_THINKING', payload: true });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          context: state.context,
          sentiment: state.currentSentiment,
          history: state.messages,
        }),
      });

      const data = await response.json();

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.content,
        timestamp: Date.now(),
        strategyTags: data.strategyTags,
      };

      dispatch({ type: 'ADD_MESSAGE', payload: assistantMessage });

      if (data.prediction !== undefined) {
        dispatch({ type: 'SET_PREDICTION', payload: data.prediction });
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      dispatch({ type: 'SET_AI_THINKING', payload: false });
    }
  };

  const updateSentiment = (sentiment: SentimentData) => {
    dispatch({ type: 'UPDATE_SENTIMENT', payload: sentiment });
  };

  const getStrategyHint = async (): Promise<StrategyHint | null> => {
    try {
      const response = await fetch('/api/strategy-hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          context: state.context,
          history: state.messages,
          currentPrediction: state.outcomePrediction,
        }),
      });

      return await response.json();
    } catch (error) {
      console.error('Failed to get strategy hint:', error);
      return null;
    }
  };

  return (
    <NegotiationContextInstance.Provider
      value={{
        state,
        dispatch,
        sendMessage,
        updateSentiment,
        getStrategyHint,
      }}
    >
      {children}
    </NegotiationContextInstance.Provider>
  );
}

// Hook
export function useNegotiation() {
  const context = useContext(NegotiationContextInstance);
  if (!context) {
    throw new Error('useNegotiation must be used within NegotiationProvider');
  }
  return context;
}
