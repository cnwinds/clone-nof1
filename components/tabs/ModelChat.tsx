'use client';

import { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '@/types';

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'system',
    content: 'AI MODEL CHAT INTERFACE INITIALIZED...',
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    role: 'assistant',
    content: 'Hello! I am ALPHA_TRADER_V2. How can I assist you with trading today?',
    timestamp: new Date().toISOString(),
  },
];

export default function ModelChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // 添加用户消息
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // 模拟 AI 回复
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(input),
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('price') || lowerInput.includes('btc') || lowerInput.includes('bitcoin')) {
      return 'Based on current market analysis, BTC is showing bullish momentum. The 24h trend indicates a +2.5% increase. Consider your risk tolerance before making trading decisions.';
    }
    if (lowerInput.includes('trade') || lowerInput.includes('buy') || lowerInput.includes('sell')) {
      return 'I recommend analyzing the following factors:\n1. Market sentiment: Currently positive\n2. Volume trends: Increasing\n3. Technical indicators: RSI at 62\n\nWould you like me to execute a trade?';
    }
    if (lowerInput.includes('strategy') || lowerInput.includes('recommend')) {
      return 'Current recommended strategy: MODERATE BUY on major coins. Focus on BTC and ETH with 60/40 allocation. Set stop-loss at -5%.';
    }
    
    return 'I understand your query. As an AI trading model, I can help with market analysis, trade execution, and strategy recommendations. What specific aspect would you like to explore?';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[500px]">
      <div className="text-terminal-green text-sm mb-4">
        &gt; AI MODEL CHAT INTERFACE
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 pr-2 custom-scrollbar">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${
              message.role === 'user'
                ? 'text-terminal-green'
                : message.role === 'system'
                ? 'text-terminal-dark-green text-xs'
                : 'text-terminal-green'
            }`}
          >
            <div className="text-xs text-terminal-dark-green mb-1">
              [{message.role.toUpperCase()}] {new Date(message.timestamp).toLocaleTimeString()}
            </div>
            <div
              className={`${
                message.role === 'user'
                  ? 'bg-terminal-gray border-l-2 border-terminal-green pl-3 py-2'
                  : 'pl-3 py-1'
              }`}
            >
              {message.role === 'user' && '> '}
              {message.content}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="text-terminal-green pl-3 animate-pulse">
            AI is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 输入框 */}
      <div className="border-t border-terminal-green pt-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 bg-black border border-terminal-green text-terminal-green px-3 py-2 focus:outline-none focus:ring-2 focus:ring-terminal-green placeholder-terminal-dark-green"
            disabled={isTyping}
          />
          <button
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            className="terminal-button px-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            SEND
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #000;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #00ff00;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}

