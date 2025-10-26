import { NextResponse } from 'next/server';
import { ENV_CONFIG } from '@/lib/config/env';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const seasonId = searchParams.get('seasonId');
    const modelId = searchParams.get('modelId');
    const limit = searchParams.get('limit') || '50';
    
    // 构建查询参数
    const params = new URLSearchParams();
    if (seasonId) {
      params.append('seasonId', seasonId);
    }
    if (modelId) {
      params.append('modelId', modelId);
    }
    params.append('limit', limit);
    
    // 调用后端API获取自动化聊天记录
    const response = await fetch(`${ENV_CONFIG.API_BASE}/automated-chats?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error(`后端自动化聊天API失败: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: '聊天服务暂时不可用，请稍后重试' },
        { status: 503 }
      );
    }
    
    const responseData = await response.json();
    
    // 处理包装的响应格式
    const chats = responseData.data || responseData;
    
    return NextResponse.json(chats);
  } catch (error) {
    console.error('自动化聊天API路由错误:', error);
    return NextResponse.json(
      { error: '聊天服务暂时不可用，请稍后重试' },
      { status: 503 }
    );
  }
}
