import { NextResponse } from 'next/server';
import { getCryptoPrices } from '@/lib/api/crypto';

// 缓存价格数据，避免频繁请求 API
let cachedPrices: any = null;
let lastFetchTime = 0;
const CACHE_DURATION = 30000; // 30 秒缓存

export async function GET() {
  try {
    const now = Date.now();
    
    // 如果缓存有效，返回缓存数据
    if (cachedPrices && now - lastFetchTime < CACHE_DURATION) {
      return NextResponse.json(cachedPrices);
    }
    
    // 获取新数据
    const prices = await getCryptoPrices();
    cachedPrices = prices;
    lastFetchTime = now;
    
    return NextResponse.json(prices);
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prices' },
      { status: 500 }
    );
  }
}

