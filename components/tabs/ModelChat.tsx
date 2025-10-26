'use client';

import { useEffect, useState } from 'react';
import { useModelsStore } from '@/lib/store/useModelsStore';
import type { AutomatedChat, ChatSection, TradingDecision } from '@/types';

export default function ModelChat() {
  const { 
    models, 
    chatFilterModel, 
    setChatFilterModel, 
    automatedChats, 
    loadAutomatedChats 
  } = useModelsStore();

  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    loadAutomatedChats(chatFilterModel === 'all' ? undefined : chatFilterModel);
  }, [chatFilterModel, loadAutomatedChats]);

  // 根据过滤器筛选聊天记录
  const filteredChats = chatFilterModel === 'all'
    ? automatedChats
    : automatedChats.filter(chat => chat.modelId === chatFilterModel);

  const toggleSection = (chatId: string, sectionType: string) => {
    const key = `${chatId}-${sectionType}`;
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${month}/${day} ${hours}:${minutes}:${seconds}`;
  };

  const renderTradingDecisions = (decisions: TradingDecision[]) => {
    return (
      <div className="space-y-1">
        {decisions.map((decision, index) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-terminal-green">{decision.symbol}:</span>
              <span className="text-terminal-green">QTY: {decision.quantity}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`font-bold ${
                decision.action === 'BUY' ? 'text-terminal-green' :
                decision.action === 'SELL' ? 'text-red-500' :
                'text-yellow-500'
              }`}>
                {decision.action}
              </span>
              <span className="text-terminal-green">{decision.confidence}%</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderSection = (chat: AutomatedChat, section: ChatSection) => {
    const key = `${chat.id}-${section.type}`;
    const isExpanded = expandedSections[key] ?? section.expanded;

    return (
      <div key={section.type} className="border-b border-terminal-dark-green border-opacity-30">
        <button
          onClick={() => toggleSection(chat.id, section.type)}
          className="w-full flex items-center justify-between p-2 text-left hover:bg-terminal-gray transition-colors"
        >
          <span className="text-terminal-green font-bold text-xs">{section.type}</span>
          <span className="text-terminal-green text-xs">
            {isExpanded ? '▼' : '▶'}
          </span>
        </button>
        
        {isExpanded && (
          <div className="p-2 bg-terminal-gray bg-opacity-20">
            {section.type === 'TRADING_DECISIONS' ? (
              renderTradingDecisions(section.content as TradingDecision[])
            ) : (
              <div className="text-terminal-green text-xs leading-relaxed">
                {section.content as string}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* 过滤器头部 */}
      <div className="flex items-center gap-4 border-b border-terminal-dark-green pb-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-terminal-green text-xs">FILTER:</span>
          <select
            value={chatFilterModel}
            onChange={(e) => setChatFilterModel(e.target.value)}
            className="bg-black border border-terminal-green text-terminal-green px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-terminal-green"
          >
            <option value="all">ALL MODELS</option>
            {models.map(model => (
              <option key={model.id} value={model.id}>
                {model.displayName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 聊天记录列表 */}
      <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar">
        {filteredChats.length === 0 ? (
          <div className="text-terminal-dark-green text-center py-4">
            No automated chat logs found
          </div>
        ) : (
          filteredChats.map((chat) => {
            const key = `${chat.id}-main`;
            const isExpanded = expandedSections[key] ?? false;
            
            return (
              <div key={chat.id} className="space-y-1">
                {/* 聊天消息头部 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{chat.icon}</span>
                    <span className="text-terminal-green font-bold text-xs">
                      {chat.modelName}
                    </span>
                  </div>
                  <div className="text-terminal-dark-green text-xs">
                    {formatTimestamp(chat.timestamp)}
                  </div>
                </div>

                {/* 聊天内容框 */}
                <div 
                  className={`border p-2 cursor-pointer transition-all ${
                    isExpanded 
                      ? 'border-terminal-green bg-terminal-gray bg-opacity-20' 
                      : 'border-terminal-dark-green hover:border-terminal-green'
                  }`}
                  onClick={() => toggleSection(chat.id, 'main')}
                >
                  <div className="text-terminal-green text-xs leading-relaxed">
                    {chat.content}
                  </div>
                  
                  {/* 点击展开提示 */}
                  {chat.expandable && (
                    <div className="mt-2 text-right">
                      <span className="text-terminal-dark-green text-xs hover:text-terminal-green transition-colors">
                        click to expand
                      </span>
                    </div>
                  )}
                </div>

                {/* 展开的详细内容 */}
                {isExpanded && chat.expandable && chat.sections && (
                  <div className="ml-3 space-y-0">
                    {chat.sections.map((section) => renderSection(chat, section))}
                  </div>
                )}
              </div>
            );
          })
        )}
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

