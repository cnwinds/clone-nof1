import { NextResponse } from 'next/server';
import { ENV_CONFIG } from '@/lib/config/env';

export async function GET(
  request: Request,
  { params }: { params: { seasonId: string } }
) {
  try {
    const { seasonId } = params;
    
    // 调用后端API获取赛季详情
    const response = await fetch(`${ENV_CONFIG.API_BASE}/seasons/${seasonId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: '赛季不存在' },
          { status: 404 }
        );
      }
      console.error(`后端赛季详情API失败: ${response.status} ${response.statusText}`);
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
    console.error('赛季详情API路由错误:', error);
    return NextResponse.json(
      { error: '赛季服务暂时不可用，请稍后重试' },
      { status: 503 }
    );
  }
}
