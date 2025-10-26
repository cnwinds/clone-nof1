import { NextResponse } from 'next/server';
import { ENV_CONFIG } from '@/lib/config/env';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const seasonId = searchParams.get('seasonId');
    const modelId = searchParams.get('modelId');
    
    // 构建查询参数
    const params = new URLSearchParams();
    if (seasonId) {
      params.append('seasonId', seasonId);
    }
    if (modelId) {
      params.append('modelId', modelId);
    }
    
    // 调用后端API获取持仓信息
    const response = await fetch(`${ENV_CONFIG.API_BASE}/positions?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error(`后端持仓API失败: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: '持仓服务暂时不可用，请稍后重试' },
        { status: 503 }
      );
    }
    
    const responseData = await response.json();
    
    // 处理包装的响应格式
    const positions = responseData.data || responseData;
    
    return NextResponse.json(positions);
  } catch (error) {
    console.error('持仓API路由错误:', error);
    return NextResponse.json(
      { error: '持仓服务暂时不可用，请稍后重试' },
      { status: 503 }
    );
  }
}
