import { NextResponse } from 'next/server';
import { ENV_CONFIG } from '@/lib/config/env';

// 缓存价格数据，避免频繁请求 API
let cachedPrices: any = null;
let lastFetchTime = 0;
const CACHE_DURATION = 30000; // 30 秒缓存

// Mock 价格数据
const mockPrices = [
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    currentPrice: 111462.50,
    priceChangePercentage24h: 2.5,
    marketCap: 2200000000000,
    high24h: 112000,
    low24h: 108000,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    currentPrice: 3456.78,
    priceChangePercentage24h: -1.2,
    marketCap: 415000000000,
    high24h: 3500,
    low24h: 3400,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    currentPrice: 95.45,
    priceChangePercentage24h: 3.8,
    marketCap: 42000000000,
    high24h: 98,
    low24h: 92,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'binancecoin',
    symbol: 'BNB',
    name: 'BNB',
    currentPrice: 320.15,
    priceChangePercentage24h: 0.8,
    marketCap: 48000000000,
    high24h: 325,
    low24h: 315,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'dogecoin',
    symbol: 'DOGE',
    name: 'Dogecoin',
    currentPrice: 0.08234,
    priceChangePercentage24h: -2.1,
    marketCap: 11800000000,
    high24h: 0.085,
    low24h: 0.080,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'ripple',
    symbol: 'XRP',
    name: 'XRP',
    currentPrice: 0.5234,
    priceChangePercentage24h: 1.5,
    marketCap: 29000000000,
    high24h: 0.53,
    low24h: 0.51,
    lastUpdated: new Date().toISOString()
  }
];

export async function GET() {
  try {
    // 如果使用Mock数据，直接返回mock价格
    if (ENV_CONFIG.USE_MOCK_DATA) {
      return NextResponse.json(mockPrices);
    }

    const now = Date.now();
    
    // 如果缓存有效，返回缓存数据
    if (cachedPrices && now - lastFetchTime < CACHE_DURATION) {
      return NextResponse.json(cachedPrices);
    }
    
    // 调用后端API获取价格数据
    const response = await fetch(`${ENV_CONFIG.API_BASE}/prices`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error(`后端价格API失败: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: '价格服务暂时不可用，请稍后重试' },
        { status: 503 }
      );
    }
    
    const responseData = await response.json();
    
    // 处理包装的响应格式
    const prices = responseData.data || responseData;
    
    // 缓存数据
    cachedPrices = prices;
    lastFetchTime = now;
    
    return NextResponse.json(prices);
  } catch (error) {
    console.error('价格API路由错误:', error);
    return NextResponse.json(
      { error: '价格服务暂时不可用，请稍后重试' },
      { status: 503 }
    );
  }
}

