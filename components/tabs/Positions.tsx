'use client';

import { useModelsStore } from '@/lib/store/useModelsStore';

export default function Positions() {
  const { positions, positionsFilterModel, setPositionsFilterModel, models } = useModelsStore();

  // 根据过滤器筛选持仓
  const filteredPositions = positionsFilterModel === 'all'
    ? positions
    : positions.filter(p => p.modelId === positionsFilterModel);

  // 按模型分组持仓
  const positionsByModel = filteredPositions.reduce((acc, position) => {
    if (!acc[position.modelId]) {
      acc[position.modelId] = {
        modelName: position.modelName,
        modelIcon: position.modelIcon,
        positions: [],
        totalUnrealizedPnl: 0,
        availableCash: position.availableCash
      };
    }
    acc[position.modelId].positions.push(position);
    acc[position.modelId].totalUnrealizedPnl += position.unrealizedPnl;
    return acc;
  }, {} as Record<string, {
    modelName: string;
    modelIcon: string;
    positions: typeof positions;
    totalUnrealizedPnl: number;
    availableCash: number;
  }>);

  return (
    <div className="h-full flex flex-col">
      {/* 过滤器头部 */}
      <div className="flex items-center gap-3 border-b border-terminal-dark-green pb-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-terminal-green text-xs">FILTER:</span>
          <select
            value={positionsFilterModel}
            onChange={(e) => setPositionsFilterModel(e.target.value)}
            className="bg-black border border-terminal-green text-terminal-green px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-terminal-green"
          >
            <option value="all">ALL MODELS</option>
            {models.map(model => (
              <option key={model.id} value={model.id}>
                {model.displayName}
              </option>
            ))}
          </select>
        </div>
        
        <div className="text-terminal-green text-xs">
          {positionsFilterModel !== 'all' && (
            <span className="ml-2 text-terminal-dark-green">
              (Filtered by {models.find(m => m.id === positionsFilterModel)?.displayName})
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {Object.keys(positionsByModel).length === 0 ? (
          <div className="text-terminal-dark-green text-center py-6 text-xs">
            No positions found
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(positionsByModel).map(([modelId, modelData]) => (
            <div key={modelId} className="border-b border-terminal-dark-green pb-4 last:border-b-0">
              {/* 模型头部 */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-terminal-green">
                    {modelData.modelIcon}
                  </span>
                  <span className="text-terminal-green font-bold text-sm">
                    {modelData.modelName}
                  </span>
                </div>
                <div className="text-terminal-green font-bold text-xs">
                  TOTAL UNREALIZED P&L: ${modelData.totalUnrealizedPnl.toFixed(2)}
                </div>
              </div>

              {/* 持仓表格 */}
              <div className="overflow-x-auto">
                <div className="w-full">
                  {/* 表格头部 */}
                  <div className="grid grid-cols-6 text-white text-xs font-bold border-b border-terminal-dark-green pb-1 mb-1" style={{gridTemplateColumns: '60px 80px 50px 1fr 60px 80px'}}>
                    <div>SIDE</div>
                    <div>COIN</div>
                    <div>LEV</div>
                    <div>NOTIONAL</div>
                    <div>PLAN</div>
                    <div>P&L</div>
                  </div>

                  {/* 持仓行 */}
                  {modelData.positions.map((position) => (
                    <div
                      key={position.id}
                      className="grid text-terminal-green text-xs py-1 hover:bg-terminal-gray transition-colors border-b border-terminal-dark-green border-opacity-20"
                      style={{gridTemplateColumns: '60px 80px 50px 1fr 60px 80px'}}
                    >
                      {/* SIDE */}
                      <div className={`font-bold ${
                        position.side === 'LONG' ? 'text-terminal-green' : 'text-red-500'
                      }`}>
                        {position.side}
                      </div>

                      {/* COIN */}
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold">{position.coinLogo}</span>
                        <span className="font-bold text-xs">{position.symbol}</span>
                      </div>

                      {/* LEVERAGE */}
                      <div className="font-bold text-xs">
                        {position.leverage}X
                      </div>

                      {/* NOTIONAL */}
                      <div className="text-terminal-green font-bold text-xs truncate">
                        ${position.notional.toLocaleString('en-US', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0
                        })}
                      </div>

                      {/* EXIT PLAN */}
                      <div>
                        <button className="bg-terminal-green text-black px-1 py-0.5 text-xs font-bold hover:bg-terminal-dark-green transition-colors">
                          VIEW
                        </button>
                      </div>

                      {/* UNREAL P&L */}
                      <div className={`font-bold text-xs ${
                        position.unrealizedPnl >= 0 ? 'text-terminal-green' : 'text-red-500'
                      }`}>
                        {position.unrealizedPnl >= 0 ? '+' : ''}${position.unrealizedPnl.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 可用现金 */}
              <div className="mt-3 text-terminal-green font-bold text-xs">
                AVAILABLE CASH: ${modelData.availableCash.toFixed(2)}
              </div>
            </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

