import { NextResponse } from 'next/server';
import { ENV_CONFIG } from '@/lib/config/env';

// 缓存赛季数据，避免频繁请求 API
let cachedSeasons: any = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60000; // 60 秒缓存

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    const now = Date.now();
    
    // 如果缓存有效，返回缓存数据
    if (cachedSeasons && now - lastFetchTime < CACHE_DURATION) {
      return NextResponse.json(cachedSeasons);
    }
    
    // 构建查询参数
    const params = new URLSearchParams();
    if (status) {
      params.append('status', status);
    }
    
    // 调用后端API获取赛季数据
    const response = await fetch(`${ENV_CONFIG.API_BASE}/seasons?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error(`后端赛季API失败: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: '赛季服务暂时不可用，请稍后重试' },
        { status: 503 }
      );
    }
    
    const responseData = await response.json();
    
    // 处理包装的响应格式
    const seasons = responseData.data || responseData;
    
    // 缓存数据
    cachedSeasons = seasons;
    lastFetchTime = now;
    
    return NextResponse.json(seasons);
  } catch (error) {
    console.error('赛季API路由错误:', error);
    return NextResponse.json(
      { error: '赛季服务暂时不可用，请稍后重试' },
      { status: 503 }
    );
  }
}
