import { NextResponse } from 'next/server';
import { ENV_CONFIG } from '@/lib/config/env';

// 缓存模型数据，避免频繁请求 API
let cachedModels: any = null;
let lastFetchTime = 0;
const CACHE_DURATION = 30000; // 30 秒缓存

export async function GET() {
  try {
    const now = Date.now();
    
    // 如果缓存有效，返回缓存数据
    if (cachedModels && now - lastFetchTime < CACHE_DURATION) {
      return NextResponse.json(cachedModels);
    }
    
    // 调用后端API获取模型数据
    const response = await fetch(`${ENV_CONFIG.API_BASE}/models`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error(`后端模型API失败: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: '模型服务暂时不可用，请稍后重试' },
        { status: 503 }
      );
    }
    
    const responseData = await response.json();
    
    // 处理包装的响应格式
    const models = responseData.data || responseData;
    
    // 缓存数据
    cachedModels = models;
    lastFetchTime = now;
    
    return NextResponse.json(models);
  } catch (error) {
    console.error('模型API路由错误:', error);
    return NextResponse.json(
      { error: '模型服务暂时不可用，请稍后重试' },
      { status: 503 }
    );
  }
}
