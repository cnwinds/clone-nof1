'use client';

import { useModelsStore } from '@/lib/store/useModelsStore';

export default function ModelSelector() {
  const { models, selectedModel, setSelectedModel } = useModelsStore();

  if (models.length === 0) return null;

  return (
    <div className="border-t border-terminal-green bg-black py-4">
      <div className="container mx-auto px-4">
        {/* 横向滚动容器 */}
        <div className="overflow-x-auto">
          <div className="flex gap-3 min-w-max pb-2">
            {/* ALL MODELS 卡片 */}
            <button
              onClick={() => setSelectedModel('all')}
              className={`flex-shrink-0 w-48 p-4 border transition-all ${
                selectedModel === 'all'
                  ? 'border-terminal-green bg-terminal-gray'
                  : 'border-terminal-dark-green hover:border-terminal-green'
              }`}
            >
              <div className="text-center">
                <div className="text-terminal-green text-sm font-bold mb-2">
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
                  className={`flex-shrink-0 w-48 p-4 border transition-all ${
                    isSelected
                      ? 'border-terminal-green bg-terminal-gray'
                      : 'border-terminal-dark-green hover:border-terminal-green'
                  }`}
                >
                  <div className="space-y-2">
                    {/* 模型名称 */}
                    <div className="flex items-center gap-2">
                      {model.icon && (
                        <span className="text-lg">{model.icon}</span>
                      )}
                      <div
                        className="text-xs font-bold text-left flex-1"
                        style={{ color: model.color }}
                      >
                        {model.displayName}
                      </div>
                    </div>

                    {/* 当前价值 */}
                    <div className="text-terminal-green text-lg font-bold">
                      ${model.currentValue.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>

                    {/* 涨跌幅 */}
                    <div
                      className={`text-sm font-bold flex items-center gap-1 ${
                        isPositive ? 'text-terminal-green' : 'text-red-500'
                      }`}
                    >
                      <span>{isPositive ? '▲' : '▼'}</span>
                      <span>
                        {isPositive ? '+' : ''}
                        {model.performance.toFixed(2)}%
                      </span>
                    </div>

                    {/* 排名（如果有） */}
                    {model.rank && (
                      <div className="text-terminal-dark-green text-xs">
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
        <div className="text-center text-terminal-dark-green text-xs mt-2">
          ← Scroll to view all models →
        </div>
      </div>
    </div>
  );
}

