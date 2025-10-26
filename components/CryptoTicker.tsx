'use client';

import { useEffect, useState } from 'react';
import type { CryptoPrice } from '@/types';

export default function CryptoTicker() {
  const [prices, setPrices] = useState<CryptoPrice[]>([]);
  const [loading, setLoading] = useState(true);

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

  // 复制价格数组以实现无缝循环
  const duplicatedPrices = [...prices, ...prices, ...prices];

  return (
    <div className="bg-black border-b border-terminal-green overflow-hidden relative py-3">
      <div className="flex animate-scroll-infinite whitespace-nowrap">
        {duplicatedPrices.map((crypto, index) => (
          <div
            key={`${crypto.id}-${index}`}
            className="inline-flex items-center mx-8 text-terminal-green"
          >
            <span className="font-bold text-lg">{crypto.symbol.toUpperCase()}</span>
            <span className="mx-2 text-terminal-green">|</span>
            <span className="text-lg">
              ${crypto.current_price.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: crypto.current_price < 1 ? 4 : 2,
              })}
            </span>
            <span
              className={`ml-2 text-sm ${
                crypto.price_change_percentage_24h >= 0
                  ? 'text-terminal-green'
                  : 'text-red-500'
              }`}
            >
              {crypto.price_change_percentage_24h >= 0 ? '▲' : '▼'}
              {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        .animate-scroll-infinite {
          animation: scroll-infinite 30s linear infinite;
        }
        
        .animate-scroll-infinite:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

