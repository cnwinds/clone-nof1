import { NextResponse } from 'next/server';
import { ENV_CONFIG } from '@/lib/config/env';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const seasonId = searchParams.get('seasonId');
    const modelId = searchParams.get('modelId');
    const limit = searchParams.get('limit') || '100';
    
    // 构建查询参数
    const params = new URLSearchParams();
    if (seasonId) {
      params.append('seasonId', seasonId);
    }
    if (modelId) {
      params.append('modelId', modelId);
    }
    params.append('limit', limit);
    
    // 调用后端API获取交易记录
    const response = await fetch(`${ENV_CONFIG.API_BASE}/trades?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error(`后端交易API失败: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: '交易服务暂时不可用，请稍后重试' },
        { status: 503 }
      );
    }
    
    const responseData = await response.json();
    
    // 处理包装的响应格式
    const trades = responseData.data || responseData;
    
    return NextResponse.json(trades);
  } catch (error) {
    console.error('交易API路由错误:', error);
    return NextResponse.json(
      { error: '交易服务暂时不可用，请稍后重试' },
      { status: 503 }
    );
  }
}
