'use client';

import { useState } from 'react';
import CompletedTrades from './tabs/CompletedTrades';
import ModelChat from './tabs/ModelChat';
import Positions from './tabs/Positions';
import ReadmeTab from './tabs/ReadmeTab';

type TabType = 'COMPLETED TRADES' | 'MODEL CHAT' | 'POSITIONS' | 'README.TXT';

const tabs: TabType[] = ['COMPLETED TRADES', 'MODEL CHAT', 'POSITIONS', 'README.TXT'];

export default function TabSystem() {
  const [activeTab, setActiveTab] = useState<TabType>('COMPLETED TRADES');

  return (
    <div className="border border-terminal-green bg-black">
      {/* 标签页头部 */}
      <div className="flex border-b border-terminal-green overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm whitespace-nowrap transition-all ${
              activeTab === tab
                ? 'bg-terminal-green text-black font-bold'
                : 'bg-transparent text-terminal-green hover:bg-terminal-gray'
            }`}
          >
            {tab}&gt;
          </button>
        ))}
      </div>

      {/* 标签页内容 */}
      <div className="p-4 min-h-[400px]">
        {activeTab === 'COMPLETED TRADES' && <CompletedTrades />}
        {activeTab === 'MODEL CHAT' && <ModelChat />}
        {activeTab === 'POSITIONS' && <Positions />}
        {activeTab === 'README.TXT' && <ReadmeTab />}
      </div>
    </div>
  );
}

