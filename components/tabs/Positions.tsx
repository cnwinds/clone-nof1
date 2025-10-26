'use client';

import { useState } from 'react';
import type { Position } from '@/types';

const mockPositions: Position[] = [
  {
    id: '1',
    symbol: 'BTC',
    amount: 0.5,
    entryPrice: 92500.0,
    currentPrice: 95000.0,
    profit: 1250.0,
    profitPercent: 2.7,
    timestamp: '2025-10-25T14:23:15Z',
  },
  {
    id: '2',
    symbol: 'ETH',
    amount: 5.0,
    entryPrice: 3350.0,
    currentPrice: 3500.0,
    profit: 750.0,
    profitPercent: 4.48,
    timestamp: '2025-10-25T13:45:32Z',
  },
  {
    id: '3',
    symbol: 'SOL',
    amount: 20.0,
    entryPrice: 175.0,
    currentPrice: 180.0,
    profit: 100.0,
    profitPercent: 2.86,
    timestamp: '2025-10-25T12:18:47Z',
  },
];

export default function Positions() {
  const [positions] = useState<Position[]>(mockPositions);

  const totalValue = positions.reduce(
    (sum, pos) => sum + pos.amount * pos.currentPrice,
    0
  );
  const totalProfit = positions.reduce((sum, pos) => sum + pos.profit, 0);

  return (
    <div className="space-y-4">
      <div className="text-terminal-green text-sm">
        &gt; CURRENT POSITIONS
      </div>

      {/* 表格头部 */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-7 gap-2 text-terminal-dark-green text-xs border-b border-terminal-dark-green pb-2 mb-2">
            <div>SYMBOL</div>
            <div className="text-right">AMOUNT</div>
            <div className="text-right">ENTRY PRICE</div>
            <div className="text-right">CURRENT PRICE</div>
            <div className="text-right">VALUE</div>
            <div className="text-right">PROFIT</div>
            <div className="text-right">P/L %</div>
          </div>

          {/* 持仓列表 */}
          {positions.map((position) => (
            <div
              key={position.id}
              className="grid grid-cols-7 gap-2 text-terminal-green text-sm py-3 hover:bg-terminal-gray transition-colors border-b border-terminal-dark-green border-opacity-20"
            >
              <div className="font-bold text-lg">{position.symbol}</div>
              <div className="text-right">{position.amount}</div>
              <div className="text-right">
                ${position.entryPrice.toLocaleString()}
              </div>
              <div className="text-right">
                ${position.currentPrice.toLocaleString()}
              </div>
              <div className="text-right font-bold">
                ${(position.amount * position.currentPrice).toLocaleString()}
              </div>
              <div
                className={`text-right font-bold ${
                  position.profit >= 0 ? 'text-terminal-green' : 'text-red-500'
                }`}
              >
                {position.profit >= 0 ? '+' : ''}$
                {position.profit.toLocaleString()}
              </div>
              <div
                className={`text-right font-bold ${
                  position.profitPercent >= 0 ? 'text-terminal-green' : 'text-red-500'
                }`}
              >
                {position.profitPercent >= 0 ? '+' : ''}
                {position.profitPercent.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 总结 */}
      <div className="mt-4 pt-4 border-t border-terminal-green space-y-2">
        <div className="flex justify-between text-terminal-green">
          <div>Total Positions:</div>
          <div className="font-bold">{positions.length}</div>
        </div>
        <div className="flex justify-between text-terminal-green">
          <div>Total Value:</div>
          <div className="font-bold">${totalValue.toLocaleString()}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-terminal-green">Total P/L:</div>
          <div
            className={`font-bold ${
              totalProfit >= 0 ? 'text-terminal-green' : 'text-red-500'
            }`}
          >
            {totalProfit >= 0 ? '+' : ''}${totalProfit.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}

