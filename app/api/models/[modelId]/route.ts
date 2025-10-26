import { NextResponse } from 'next/server';
import { ENV_CONFIG } from '@/lib/config/env';

export async function GET(
  request: Request,
  { params }: { params: { modelId: string } }
) {
  try {
    const { modelId } = params;
    
    // 调用后端API获取模型详情
    const response = await fetch(`${ENV_CONFIG.API_BASE}/models/${modelId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: '模型不存在' },
          { status: 404 }
        );
      }
      console.error(`后端模型详情API失败: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: '模型服务暂时不可用，请稍后重试' },
        { status: 503 }
      );
    }
    
    const responseData = await response.json();
    
    // 处理包装的响应格式
    const model = responseData.data || responseData;
    
    return NextResponse.json(model);
  } catch (error) {
    console.error('模型详情API路由错误:', error);
    return NextResponse.json(
      { error: '模型服务暂时不可用，请稍后重试' },
      { status: 503 }
    );
  }
}
