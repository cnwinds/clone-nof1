'use client';

import { useEffect } from 'react';
import { useModelsStore } from '@/lib/store/useModelsStore';

export default function TradesList() {
  const { 
    models, 
    trades, 
    filterModel, 
    setFilterModel, 
    loadTrades 
  } = useModelsStore();

  useEffect(() => {
    loadTrades(filterModel === 'all' ? undefined : filterModel);
  }, [filterModel, loadTrades]);

  return (
    <div className="space-y-4">
      {/* 过滤器头部 */}
      <div className="flex items-center gap-4 border-b border-terminal-dark-green pb-3">
        <div className="flex items-center gap-2">
          <span className="text-terminal-green text-sm">FILTER:</span>
          <select
            value={filterModel}
            onChange={(e) => setFilterModel(e.target.value)}
            className="bg-black border border-terminal-green text-terminal-green px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-terminal-green"
          >
            <option value="all">ALL MODELS</option>
            {models.map(model => (
              <option key={model.id} value={model.id}>
                {model.displayName}
              </option>
            ))}
          </select>
        </div>
        
        <div className="text-terminal-dark-green text-xs">
          Showing Last {trades.length} Trades
        </div>
      </div>

      {/* 交易列表 */}
      <div className="space-y-2 max-h-[600px] overflow-y-auto">
        {trades.length === 0 ? (
          <div className="text-terminal-dark-green text-center py-8">
            No trades found
          </div>
        ) : (
          trades.map(trade => {
            const isProfit = trade.pnl >= 0;
            const tradeTypeColor = trade.type === 'long' ? 'text-terminal-green' : 'text-red-500';
            
            return (
              <div
                key={trade.id}
                className="border border-terminal-dark-green p-3 hover:bg-terminal-gray transition-colors"
              >
                {/* 第一行：模型名称 + 交易类型 + 币种 */}
                <div className="flex items-center gap-2 mb-2 text-sm">
                  <span className="text-terminal-green font-bold">
                    {trade.modelName}
                  </span>
                  <span className="text-terminal-dark-green">completed a</span>
                  <span className={`font-bold ${tradeTypeColor}`}>
                    {trade.type}
                  </span>
                  <span className="text-terminal-dark-green">trade on</span>
                  <span className="text-yellow-500 font-bold">
                    {trade.symbol}
                  </span>
                </div>

                {/* 交易详情 */}
                <div className="grid grid-cols-2 gap-2 text-xs text-terminal-green">
                  <div>
                    Price: ${trade.entryPrice.toFixed(5)} → ${trade.exitPrice.toFixed(5)}
                  </div>
                  <div>
                    Quantity: {trade.quantity.toFixed(2)}
                  </div>
                  <div>
                    Notional: ${trade.entryNotional.toFixed(0)} → ${trade.exitNotional.toFixed(0)}
                  </div>
                  <div>
                    Holding time: {trade.holdingTime}
                  </div>
                </div>

                {/* P&L */}
                <div className="mt-2 pt-2 border-t border-terminal-dark-green">
                  <span
                    className={`text-sm font-bold ${
                      isProfit ? 'text-terminal-green' : 'text-red-500'
                    }`}
                  >
                    NET P&L: {isProfit ? '+' : ''}${trade.pnl.toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 自定义滚动条样式 */}
      <style jsx>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #000;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #00ff00;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}

