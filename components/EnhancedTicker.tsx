'use client';

import { useEffect, useState } from 'react';
import type { CryptoPrice } from '@/types';
import { useModelsStore } from '@/lib/store/useModelsStore';

export default function EnhancedTicker() {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { getHighestModel, getLowestModel } = useModelsStore();
  const highestModel = getHighestModel();
  const lowestModel = getLowestModel();

  useEffect(() => {
    // 获取初始价格
    fetchPrices();
    
    // 每 30 秒更新一次价格
    const interval = setInterval(fetchPrices, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchPrices = async () => {
    try {
      const response = await fetch('/api/prices');
      const data = await response.json();
      setPrices(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  };

  if (loading) {
    return (
      <div className="bg-black border-b border-terminal-green overflow-hidden py-3">
        <div className="text-terminal-green text-center animate-pulse">
          Loading prices...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black border-b border-terminal-green">
      <div className="flex">
        {/* 左侧：加密货币价格静态显示 */}
        <div className="flex-[2_2_0%] py-1 px-4">
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {prices.map((crypto, index) => (
              <div key={crypto.id} className="flex items-center">
                <div className="flex flex-col text-terminal-green">
                  <span className="font-bold text-base">{crypto.symbol.toUpperCase()}</span>
                  <div className="flex items-center text-sm">
                    <span>
                      ${(crypto.currentPrice || 0).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: (crypto.currentPrice || 0) < 1 ? 4 : 2,
                      })}
                    </span>
                    <span
                      className={`ml-2 ${
                        (crypto.priceChangePercentage24h || 0) >= 0
                          ? 'text-terminal-green'
                          : 'text-red-500'
                      }`}
                    >
                      {(crypto.priceChangePercentage24h || 0) >= 0 ? '▲' : '▼'}
                      {Math.abs(crypto.priceChangePercentage24h || 0).toFixed(2)}%
                    </span>
                  </div>
                </div>
                {/* 添加半截分割线 */}
                {index < prices.length - 1 && (
                  <div className="ml-4 h-8 w-px bg-terminal-green opacity-50"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 右侧：模型统计 */}
        <div className="flex-[1_1_0%] py-1 px-4 bg-black flex items-center justify-end gap-6">
          {highestModel && (
            <div className="text-left">
              <div className="text-terminal-dark-green text-xs mb-0.5">
                HIGHEST: 🏆
              </div>
              <div className="flex items-center gap-1 justify-end">
                <span className="text-terminal-green font-bold text-sm">
                  {highestModel.displayName}
                </span>
                <span className="text-terminal-green text-sm">
                  ${(highestModel.currentValue || 0).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span className="text-terminal-green font-bold text-sm">
                  +{(highestModel.performance || 0).toFixed(2)}%
                </span>
              </div>
            </div>
          )}

          {lowestModel && (
            <div className="text-left">
              <div className="text-terminal-dark-green text-xs mb-0.5">
                LOWEST: 📉
              </div>
              <div className="flex items-center gap-1 justify-end">
                <span className="text-red-500 font-bold text-sm">
                  {lowestModel.displayName}
                </span>
                <span className="text-red-500 text-sm">
                  ${(lowestModel.currentValue || 0).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span className="text-red-500 font-bold text-sm">
                  {(lowestModel.performance || 0).toFixed(2)}%
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}

