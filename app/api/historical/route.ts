import { NextResponse } from 'next/server';
import { getHistoricalData } from '@/lib/api/crypto';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const coinId = searchParams.get('coinId') || 'bitcoin';
    const days = parseInt(searchParams.get('days') || '7', 10);
    
    const data = await getHistoricalData(coinId, days);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch historical data' },
      { status: 500 }
    );
  }
}

