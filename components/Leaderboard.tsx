'use client';

import { useState } from 'react';
import { useModelsStore } from '@/lib/store/useModelsStore';

export default function Leaderboard() {
  const [expanded, setExpanded] = useState(true);
  const { models } = useModelsStore();

  // 按表现排序模型
  const sortedModels = [...models].sort((a, b) => b.performance - a.performance);

  return (
    <div className="border border-terminal-green p-4 bg-black">
      <div
        className="flex justify-between items-center cursor-pointer mb-4"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="text-terminal-green text-xl font-bold text-glow">
          LEADING MODELS
        </div>
        <div className="text-terminal-green text-xl">
          {expanded ? '▼' : '►'}
        </div>
      </div>

      {expanded && sortedModels.length > 0 && (
        <div className="space-y-2">
          {/* 表头 */}
          <div className="grid grid-cols-5 gap-2 text-terminal-dark-green text-xs border-b border-terminal-dark-green pb-2">
            <div>RANK</div>
            <div>MODEL</div>
            <div className="text-right">RETURN %</div>
            <div className="text-right">WIN RATE</div>
            <div className="text-right">TRADES</div>
          </div>

          {/* 模型列表 */}
          {sortedModels.map((model, index) => (
            <div
              key={model.id}
              className="grid grid-cols-5 gap-2 text-terminal-green text-sm hover:bg-terminal-gray transition-colors py-2 border-b border-terminal-dark-green border-opacity-30"
            >
              <div className="font-bold">#{index + 1}</div>
              <div className="font-mono text-xs">{model.displayName}</div>
              <div
                className={`text-right font-bold ${
                  model.performance >= 0 ? 'text-terminal-green' : 'text-red-500'
                }`}
              >
                {model.performance >= 0 ? '+' : ''}
                {model.performance.toFixed(2)}%
              </div>
              <div className="text-right">
                {model.winRate ? model.winRate.toFixed(1) : 'N/A'}%
              </div>
              <div className="text-right">
                {model.totalTrades?.toLocaleString() || 'N/A'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

