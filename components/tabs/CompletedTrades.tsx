'use client';

import { useState } from 'react';
import type { Trade } from '@/types';

const mockTrades: Trade[] = [
  {
    id: '1',
    symbol: 'BTC',
    type: 'BUY',
    price: 92500.0,
    amount: 0.5,
    total: 46250.0,
    timestamp: '2025-10-25T14:23:15Z',
    profit: 1250.0,
    profitPercent: 2.7,
  },
  {
    id: '2',
    symbol: 'ETH',
    type: 'SELL',
    price: 3450.0,
    amount: 5.0,
    total: 17250.0,
    timestamp: '2025-10-25T13:45:32Z',
    profit: 750.0,
    profitPercent: 4.5,
  },
  {
    id: '3',
    symbol: 'SOL',
    type: 'BUY',
    price: 175.0,
    amount: 20.0,
    total: 3500.0,
    timestamp: '2025-10-25T12:18:47Z',
    profit: 100.0,
    profitPercent: 2.86,
  },
  {
    id: '4',
    symbol: 'BNB',
    type: 'SELL',
    price: 595.0,
    amount: 10.0,
    total: 5950.0,
    timestamp: '2025-10-25T11:05:23Z',
    profit: -50.0,
    profitPercent: -0.84,
  },
  {
    id: '5',
    symbol: 'XRP',
    type: 'BUY',
    price: 0.49,
    amount: 10000.0,
    total: 4900.0,
    timestamp: '2025-10-25T10:33:08Z',
    profit: 100.0,
    profitPercent: 2.04,
  },
];

export default function CompletedTrades() {
  const [trades] = useState<Trade[]>(mockTrades);

  return (
    <div className="space-y-4">
      <div className="text-terminal-green text-sm">
        &gt; RECENT COMPLETED TRADES
      </div>

      {/* 表格头部 */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 gap-2 text-terminal-dark-green text-xs border-b border-terminal-dark-green pb-2 mb-2">
            <div>TIME</div>
            <div>SYMBOL</div>
            <div>TYPE</div>
            <div className="text-right">PRICE</div>
            <div className="text-right">AMOUNT</div>
            <div className="text-right">TOTAL</div>
            <div className="text-right">PROFIT</div>
            <div className="text-right">P/L %</div>
          </div>

          {/* 交易列表 */}
          {trades.map((trade) => (
            <div
              key={trade.id}
              className="grid grid-cols-8 gap-2 text-terminal-green text-sm py-2 hover:bg-terminal-gray transition-colors border-b border-terminal-dark-green border-opacity-20"
            >
              <div className="text-xs">
                {new Date(trade.timestamp).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
              <div className="font-bold">{trade.symbol}</div>
              <div className={trade.type === 'BUY' ? 'text-terminal-green' : 'text-red-500'}>
                {trade.type}
              </div>
              <div className="text-right">${trade.price.toLocaleString()}</div>
              <div className="text-right">{trade.amount}</div>
              <div className="text-right">${trade.total.toLocaleString()}</div>
              <div
                className={`text-right font-bold ${
                  (trade.profit || 0) >= 0 ? 'text-terminal-green' : 'text-red-500'
                }`}
              >
                {trade.profit && trade.profit >= 0 ? '+' : ''}$
                {trade.profit?.toLocaleString()}
              </div>
              <div
                className={`text-right font-bold ${
                  (trade.profitPercent || 0) >= 0 ? 'text-terminal-green' : 'text-red-500'
                }`}
              >
                {trade.profitPercent && trade.profitPercent >= 0 ? '+' : ''}
                {trade.profitPercent?.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 总结 */}
      <div className="mt-4 pt-4 border-t border-terminal-green flex justify-between text-terminal-green">
        <div>
          Total Trades: <span className="font-bold">{trades.length}</span>
        </div>
        <div>
          Total Profit:{' '}
          <span className="font-bold text-terminal-green">
            +$
            {trades
              .reduce((sum, trade) => sum + (trade.profit || 0), 0)
              .toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

