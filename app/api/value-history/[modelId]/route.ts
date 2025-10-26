import { NextResponse } from 'next/server';
import { ENV_CONFIG } from '@/lib/config/env';

export async function GET(
  request: Request,
  { params }: { params: { modelId: string } }
) {
  try {
    const { modelId } = params;
    const { searchParams } = new URL(request.url);
    const days = searchParams.get('days') || '7';
    
    // 调用后端API获取价值历史
    const response = await fetch(`${ENV_CONFIG.API_BASE}/value-history/${modelId}?days=${days}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error(`后端价值历史API失败: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: '价值历史服务暂时不可用，请稍后重试' },
        { status: 503 }
      );
    }
    
    const responseData = await response.json();
    
    // 处理包装的响应格式
    const valueHistory = responseData.data || responseData;
    
    return NextResponse.json(valueHistory);
  } catch (error) {
    console.error('价值历史API路由错误:', error);
    return NextResponse.json(
      { error: '价值历史服务暂时不可用，请稍后重试' },
      { status: 503 }
    );
  }
}
