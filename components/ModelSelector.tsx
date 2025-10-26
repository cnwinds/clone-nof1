'use client';

import { useModelsStore } from '@/lib/store/useModelsStore';

export default function ModelSelector() {
  const { models, selectedModel, setSelectedModel } = useModelsStore();

  if (models.length === 0) return null;

  return (
    <div className="border-t border-terminal-green bg-black py-1">
      <div className="w-full px-4">
        {/* 横向滚动容器 */}
        <div className="overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-1">
            {/* ALL MODELS 卡片 */}
            <button
              onClick={() => setSelectedModel('all')}
              className={`flex-shrink-0 w-48 p-1 border transition-all ${
                selectedModel === 'all'
                  ? 'border-terminal-green bg-terminal-gray'
                  : 'border-terminal-dark-green hover:border-terminal-green'
              }`}
            >
              <div className="text-center">
                <div className="text-terminal-green text-xs font-bold mb-0.5">
                  ALL MODELS
                </div>
                <div className="text-terminal-green text-xs">
                  {models.length} Active Models
                </div>
              </div>
            </button>

            {/* 各个模型卡片 */}
            {models.map(model => {
              const isPositive = model.performance >= 0;
              const isSelected = selectedModel === model.id;

              return (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model.id)}
                  className={`flex-shrink-0 w-48 p-1 border transition-all ${
                    isSelected
                      ? 'border-terminal-green bg-terminal-gray'
                      : 'border-terminal-dark-green hover:border-terminal-green'
                  }`}
                >
                  <div className="space-y-0.5">
                    {/* 模型名称和图标 */}
                    <div className="flex items-center gap-1">
                      {model.icon && (
                        <span className="text-sm">{model.icon}</span>
                      )}
                      <div
                        className="text-xs font-bold text-left flex-1"
                        style={{ color: model.color }}
                      >
                        {model.displayName}
                      </div>
                    </div>

                    {/* 当前价值和涨跌幅在同一行 */}
                    <div className="flex items-center justify-between">
                      <div className="text-terminal-green text-sm font-bold">
                        ${(model.currentValue || 0).toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                      <div
                        className={`text-xs font-bold ${
                          isPositive ? 'text-terminal-green' : 'text-red-500'
                        }`}
                      >
                        {isPositive ? '▲' : '▼'}
                        {isPositive ? '+' : ''}
                        {(model.performance || 0).toFixed(2)}%
                      </div>
                    </div>

                    {/* 排名（如果有） */}
                    {model.rank && (
                      <div className="text-terminal-dark-green text-xs text-center">
                        Rank #{model.rank}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 滚动提示 */}
        <div className="text-center text-terminal-dark-green text-xs mt-0.5">
          ← Scroll to view all models →
        </div>
      </div>
    </div>
  );
}

