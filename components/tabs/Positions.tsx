'use client';

import { useModelsStore } from '@/lib/store/useModelsStore';

export default function Positions() {
  const { positions, filterModel } = useModelsStore();

  // 根据过滤器筛选持仓
  const filteredPositions = filterModel === 'all'
    ? positions
    : positions.filter(p => p.modelId === filterModel);

  const totalValue = filteredPositions.reduce(
    (sum, pos) => sum + pos.amount * pos.currentPrice,
    0
  );
  const totalProfit = filteredPositions.reduce((sum, pos) => sum + pos.profit, 0);

  return (
    <div className="space-y-4">
      <div className="text-terminal-green text-sm">
        &gt; CURRENT POSITIONS
        {filterModel !== 'all' && (
          <span className="ml-2 text-terminal-dark-green">
            (Filtered by {filterModel})
          </span>
        )}
      </div>

      {filteredPositions.length === 0 ? (
        <div className="text-terminal-dark-green text-center py-8">
          No positions found
        </div>
      ) : (
        <>
          {/* 表格头部 */}
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              <div className="grid grid-cols-7 gap-2 text-terminal-dark-green text-xs border-b border-terminal-dark-green pb-2 mb-2">
                <div>SYMBOL</div>
                <div className="text-right">AMOUNT</div>
                <div className="text-right">ENTRY</div>
                <div className="text-right">CURRENT</div>
                <div className="text-right">VALUE</div>
                <div className="text-right">PROFIT</div>
                <div className="text-right">P/L %</div>
              </div>

              {/* 持仓列表 */}
              {filteredPositions.map((position) => (
                <div
                  key={position.id}
                  className="grid grid-cols-7 gap-2 text-terminal-green text-sm py-3 hover:bg-terminal-gray transition-colors border-b border-terminal-dark-green border-opacity-20"
                >
                  <div className="font-bold">{position.symbol}</div>
                  <div className="text-right">{position.amount.toFixed(2)}</div>
                  <div className="text-right">
                    ${position.entryPrice.toFixed(2)}
                  </div>
                  <div className="text-right">
                    ${position.currentPrice.toFixed(2)}
                  </div>
                  <div className="text-right font-bold">
                    ${(position.amount * position.currentPrice).toFixed(2)}
                  </div>
                  <div
                    className={`text-right font-bold ${
                      position.profit >= 0 ? 'text-terminal-green' : 'text-red-500'
                    }`}
                  >
                    {position.profit >= 0 ? '+' : ''}$
                    {position.profit.toFixed(2)}
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
              <div className="font-bold">{filteredPositions.length}</div>
            </div>
            <div className="flex justify-between text-terminal-green">
              <div>Total Value:</div>
              <div className="font-bold">${totalValue.toFixed(2)}</div>
            </div>
            <div className="flex justify-between">
              <div className="text-terminal-green">Total P/L:</div>
              <div
                className={`font-bold ${
                  totalProfit >= 0 ? 'text-terminal-green' : 'text-red-500'
                }`}
              >
                {totalProfit >= 0 ? '+' : ''}${totalProfit.toFixed(2)}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

