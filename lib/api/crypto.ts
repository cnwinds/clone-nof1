import axios from 'axios';
import type { CryptoPrice, HistoricalData } from '@/types';

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

// 支持的加密货币 ID 映射
export const CRYPTO_IDS = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  SOL: 'solana',
  BNB: 'binancecoin',
  DOGE: 'dogecoin',
  XRP: 'ripple',
} as const;

// 获取多个加密货币的实时价格
export async function getCryptoPrices(): Promise<CryptoPrice[]> {
  try {
    const ids = Object.values(CRYPTO_IDS).join(',');
    const response = await axios.get(`${COINGECKO_API_BASE}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        ids: ids,
        order: 'market_cap_desc',
        per_page: 6,
        page: 1,
        sparkline: false,
        price_change_percentage: '24h',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    // 返回模拟数据作为后备
    return getMockPrices();
  }
}

// 获取单个加密货币的历史数据
export async function getHistoricalData(
  coinId: string,
  days: number = 7
): Promise<HistoricalData> {
  try {
    const response = await axios.get(
      `${COINGECKO_API_BASE}/coins/${coinId}/market_chart`,
      {
        params: {
          vs_currency: 'usd',
          days: days,
          interval: days <= 1 ? 'hourly' : 'daily',
        },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    // 返回模拟数据作为后备
    return getMockHistoricalData(days);
  }
}

// 模拟价格数据（当 API 失败时使用）
function getMockPrices(): CryptoPrice[] {
  return [
    {
      id: 'bitcoin',
      symbol: 'BTC',
      name: 'Bitcoin',
      current_price: 95000.0,
      price_change_percentage_24h: 2.5,
      market_cap: 1800000000000,
      high_24h: 96000,
      low_24h: 93000,
      last_updated: new Date().toISOString(),
    },
    {
      id: 'ethereum',
      symbol: 'ETH',
      name: 'Ethereum',
      current_price: 3500.0,
      price_change_percentage_24h: 3.2,
      market_cap: 420000000000,
      high_24h: 3600,
      low_24h: 3400,
      last_updated: new Date().toISOString(),
    },
    {
      id: 'solana',
      symbol: 'SOL',
      name: 'Solana',
      current_price: 180.0,
      price_change_percentage_24h: 5.8,
      market_cap: 84000000000,
      high_24h: 185,
      low_24h: 170,
      last_updated: new Date().toISOString(),
    },
    {
      id: 'binancecoin',
      symbol: 'BNB',
      name: 'BNB',
      current_price: 600.0,
      price_change_percentage_24h: 1.5,
      market_cap: 87000000000,
      high_24h: 610,
      low_24h: 590,
      last_updated: new Date().toISOString(),
    },
    {
      id: 'dogecoin',
      symbol: 'DOGE',
      name: 'Dogecoin',
      current_price: 0.35,
      price_change_percentage_24h: -1.2,
      market_cap: 51000000000,
      high_24h: 0.36,
      low_24h: 0.34,
      last_updated: new Date().toISOString(),
    },
    {
      id: 'ripple',
      symbol: 'XRP',
      name: 'XRP',
      current_price: 0.5,
      price_change_percentage_24h: 0.8,
      market_cap: 28000000000,
      high_24h: 0.52,
      low_24h: 0.49,
      last_updated: new Date().toISOString(),
    },
  ];
}

// 模拟历史数据
function getMockHistoricalData(days: number): HistoricalData {
  const now = Date.now();
  const interval = (days * 24 * 60 * 60 * 1000) / 100; // 100 个数据点
  
  const prices: [number, number][] = [];
  const market_caps: [number, number][] = [];
  const total_volumes: [number, number][] = [];
  
  let basePrice = 95000;
  
  for (let i = 0; i < 100; i++) {
    const timestamp = now - (100 - i) * interval;
    // 添加一些随机波动
    const volatility = (Math.random() - 0.5) * 2000;
    const price = basePrice + volatility;
    basePrice = price; // 使价格连续变化
    
    prices.push([timestamp, price]);
    market_caps.push([timestamp, price * 19000000]); // 模拟市值
    total_volumes.push([timestamp, Math.random() * 50000000000]);
  }
  
  return { prices, market_caps, total_volumes };
}

