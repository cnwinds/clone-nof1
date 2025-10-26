'use client';

import { useState } from 'react';
import type { AIModel } from '@/types';

const mockModels: AIModel[] = [
  {
    id: '1',
    name: 'ALPHA_TRADER_V2',
    rank: 1,
    totalReturn: 145.67,
    winRate: 78.5,
    totalTrades: 1247,
    status: 'active',
  },
  {
    id: '2',
    name: 'QUANTUM_BOT',
    rank: 2,
    totalReturn: 132.45,
    winRate: 75.2,
    totalTrades: 982,
    status: 'active',
  },
  {
    id: '3',
    name: 'DEEP_LEARNING_TRADER',
    rank: 3,
    totalReturn: 118.23,
    winRate: 72.8,
    totalTrades: 1534,
    status: 'active',
  },
  {
    id: '4',
    name: 'NEURAL_NET_PRO',
    rank: 4,
    totalReturn: 95.87,
    winRate: 68.4,
    totalTrades: 876,
    status: 'active',
  },
  {
    id: '5',
    name: 'ML_PREDICTOR_X',
    rank: 5,
    totalReturn: 87.34,
    winRate: 65.9,
    totalTrades: 1123,
    status: 'active',
  },
];

export default function Leaderboard() {
  const [expanded, setExpanded] = useState(true);
  const [models] = useState<AIModel[]>(mockModels);

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

      {expanded && (
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
          {models.map((model) => (
            <div
              key={model.id}
              className="grid grid-cols-5 gap-2 text-terminal-green text-sm hover:bg-terminal-gray transition-colors py-2 border-b border-terminal-dark-green border-opacity-30"
            >
              <div className="font-bold">#{model.rank}</div>
              <div className="font-mono">{model.name}</div>
              <div className="text-right font-bold">
                +{model.totalReturn.toFixed(2)}%
              </div>
              <div className="text-right">{model.winRate.toFixed(1)}%</div>
              <div className="text-right">{model.totalTrades.toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

