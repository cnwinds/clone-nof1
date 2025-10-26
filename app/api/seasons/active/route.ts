import { NextResponse } from 'next/server';
import { ENV_CONFIG } from '@/lib/config/env';

export async function GET() {
  try {
    // 调用后端API获取当前活跃赛季
    const response = await fetch(`${ENV_CONFIG.API_BASE}/seasons/active`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(null);
      }
      console.error(`后端活跃赛季API失败: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: '赛季服务暂时不可用，请稍后重试' },
        { status: 503 }
      );
    }
    
    const responseData = await response.json();
    
    // 处理包装的响应格式
    const season = responseData.data || responseData;
    
    return NextResponse.json(season);
  } catch (error) {
    console.error('活跃赛季API路由错误:', error);
    return NextResponse.json(
      { error: '赛季服务暂时不可用，请稍后重试' },
      { status: 503 }
    );
  }
}
