import type { AIModel, Trade, Position, ValuePoint } from '@/types';

// 7 个 AI 模型的配置
export const MODEL_CONFIGS = [
  {
    id: 'gpt-6',
    name: 'gpt-6',
    displayName: 'GPT 6',
    color: '#000000',
    icon: '🤖',
    description: 'Advanced reasoning with GPT-6 architecture',
  },
  {
    id: 'claude-sonnet-4.1',
    name: 'claude-sonnet-4.1',
    displayName: 'CLAUDE SONNET 4.1',
    color: '#ff8c00',
    icon: '🎭',
    description: 'Anthropic Claude Sonnet with enhanced analysis',
  },
  {
    id: 'gemini-2.5-pro',
    name: 'gemini-2.5-pro',
    displayName: 'GEMINI 2.5 PRO',
    color: '#9370db',
    icon: '💎',
    description: 'Google Gemini Pro with multi-modal insights',
  },
  {
    id: 'grok-4',
    name: 'grok-4',
    displayName: 'GROK 4',
    color: '#4169e1',
    icon: '⚡',
    description: 'xAI Grok with real-time data access',
  },
  {
    id: 'deepseek-chat-v3.1',
    name: 'deepseek-chat-v3.1',
    displayName: 'DEEPSEEK CHAT V3.1',
    color: '#00ced1',
    icon: '🔍',
    description: 'DeepSeek advanced chat model',
  },
  {
    id: 'qwen3-max',
    name: 'qwen3-max',
    displayName: 'QWEN3 MAX',
    color: '#6a5acd',
    icon: '🏆',
    description: 'Alibaba Qwen3 Max with superior performance',
  },
  {
    id: 'btc-buyhold',
    name: 'btc-buyhold',
    displayName: 'BTC BUY&HOLD',
    color: '#87ceeb',
    icon: '₿',
    description: 'Bitcoin buy and hold baseline strategy',
  },
] as const;

// 生成价值历史曲线（7 天数据）
function generateValueHistory(
  initialValue: number,
  finalValue: number,
  days: number = 7
): ValuePoint[] {
  const points: ValuePoint[] = [];
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  const pointsPerDay = 24; // 每小时一个点
  const totalPoints = days * pointsPerDay;

  // 添加随机波动
  const volatility = Math.abs((finalValue - initialValue) / initialValue) * 0.3;

  let currentValue = initialValue;
  const valueChange = (finalValue - initialValue) / totalPoints;

  for (let i = 0; i <= totalPoints; i++) {
    const timestamp = now - (totalPoints - i) * (dayMs / pointsPerDay);
    
    // 添加随机波动，但保持整体趋势
    const randomFactor = (Math.random() - 0.5) * 2 * volatility;
    currentValue += valueChange + valueChange * randomFactor;
    
    points.push({
      timestamp,
      value: Math.max(0, currentValue),
    });
  }

  // 确保最后一个点是准确的最终值
  points[points.length - 1].value = finalValue;

  return points;
}

// 生成交易记录
function generateTrades(modelId: string, modelName: string, count: number = 30): Trade[] {
  const trades: Trade[] = [];
  const symbols = ['BTC', 'ETH', 'SOL', 'BNB', 'DOGE', 'XRP'];
  const now = Date.now();
  
  for (let i = 0; i < count; i++) {
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const type: 'long' | 'short' = Math.random() > 0.5 ? 'long' : 'short';
    
    const entryPrice = Math.random() * 100 + 10;
    const priceChange = (Math.random() - 0.5) * 0.1; // ±10%
    const exitPrice = entryPrice * (1 + priceChange);
    
    const quantity = Math.random() * 1000 + 100;
    const entryNotional = entryPrice * quantity;
    const exitNotional = exitPrice * quantity;
    
    const pnl = type === 'long' 
      ? exitNotional - entryNotional
      : entryNotional - exitNotional;
    const pnlPercent = (pnl / entryNotional) * 100;
    
    const holdingMinutes = Math.floor(Math.random() * 1440); // 0-24小时
    const holdingTime = holdingMinutes < 60 
      ? `${holdingMinutes}M`
      : `${Math.floor(holdingMinutes / 60)}H ${holdingMinutes % 60}M`;
    
    trades.push({
      id: `${modelId}-trade-${i}`,
      modelId,
      modelName,
      symbol,
      type,
      entryPrice,
      exitPrice,
      quantity,
      entryNotional,
      exitNotional,
      holdingTime,
      pnl,
      pnlPercent,
      timestamp: new Date(now - (count - i) * 3600000).toISOString(),
    });
  }
  
  return trades;
}

// 生成持仓
function generatePositions(modelId: string): Position[] {
  const positions: Position[] = [];
  const symbols = ['BTC', 'ETH', 'SOL'];
  
  symbols.forEach((symbol, index) => {
    const entryPrice = Math.random() * 100 + 50;
    const currentPrice = entryPrice * (1 + (Math.random() - 0.5) * 0.2);
    const amount = Math.random() * 10 + 1;
    const profit = (currentPrice - entryPrice) * amount;
    const profitPercent = ((currentPrice - entryPrice) / entryPrice) * 100;
    
    positions.push({
      id: `${modelId}-pos-${index}`,
      modelId,
      symbol,
      amount,
      entryPrice,
      currentPrice,
      profit,
      profitPercent,
      timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    });
  });
  
  return positions;
}

// 生成完整的模型数据（根据截图的实际数据）
export const mockModels: AIModel[] = [
  {
    id: 'gpt-6',
    name: 'gpt-6',
    displayName: 'GPT 6',
    initialValue: 10000,
    currentValue: 2944.52,
    performance: -70.56,
    color: '#000000',
    icon: '🤖',
    status: 'active',
    description: 'GPT-6 model with conservative strategy',
    rank: 7,
    winRate: 42.3,
    totalTrades: 145,
    valueHistory: generateValueHistory(10000, 2944.52),
  },
  {
    id: 'claude-sonnet-4.1',
    name: 'claude-sonnet-4.1',
    displayName: 'CLAUDE SONNET 4.1',
    initialValue: 10000,
    currentValue: 9253.76,
    performance: -7.46,
    color: '#ff8c00',
    icon: '🎭',
    status: 'active',
    description: 'Claude Sonnet with balanced approach',
    rank: 4,
    winRate: 58.2,
    totalTrades: 198,
    valueHistory: generateValueHistory(10000, 9253.76),
  },
  {
    id: 'gemini-2.5-pro',
    name: 'gemini-2.5-pro',
    displayName: 'GEMINI 2.5 PRO',
    initialValue: 10000,
    currentValue: 3360.21,
    performance: -66.40,
    color: '#9370db',
    icon: '💎',
    status: 'active',
    description: 'Gemini 2.5 Pro multi-modal strategy',
    rank: 6,
    winRate: 45.8,
    totalTrades: 167,
    valueHistory: generateValueHistory(10000, 3360.21),
  },
  {
    id: 'grok-4',
    name: 'grok-4',
    displayName: 'GROK 4',
    initialValue: 10000,
    currentValue: 9022.15,
    performance: -9.78,
    color: '#4169e1',
    icon: '⚡',
    status: 'active',
    description: 'Grok 4 with real-time analysis',
    rank: 5,
    winRate: 55.4,
    totalTrades: 176,
    valueHistory: generateValueHistory(10000, 9022.15),
  },
  {
    id: 'deepseek-chat-v3.1',
    name: 'deepseek-chat-v3.1',
    displayName: 'DEEPSEEK CHAT V3.1',
    initialValue: 10000,
    currentValue: 13332.61,
    performance: 33.33,
    color: '#00ced1',
    icon: '🔍',
    status: 'active',
    description: 'DeepSeek with deep learning insights',
    rank: 2,
    winRate: 67.9,
    totalTrades: 223,
    valueHistory: generateValueHistory(10000, 13332.61),
  },
  {
    id: 'qwen3-max',
    name: 'qwen3-max',
    displayName: 'QWEN3 MAX',
    initialValue: 10000,
    currentValue: 17492.78,
    performance: 74.93,
    color: '#6a5acd',
    icon: '🏆',
    status: 'active',
    description: 'Qwen3 Max leading performer',
    rank: 1,
    winRate: 73.5,
    totalTrades: 241,
    valueHistory: generateValueHistory(10000, 17492.78),
  },
  {
    id: 'btc-buyhold',
    name: 'btc-buyhold',
    displayName: 'BTC BUY&HOLD',
    initialValue: 10000,
    currentValue: 10446.61,
    performance: 4.47,
    color: '#87ceeb',
    icon: '₿',
    status: 'active',
    description: 'Bitcoin baseline strategy',
    rank: 3,
    winRate: 100,
    totalTrades: 1,
    valueHistory: generateValueHistory(10000, 10446.61),
  },
];

// 生成所有模型的交易记录
export const mockTrades: Trade[] = mockModels.flatMap(model =>
  generateTrades(model.id, model.displayName, 30)
);

// 生成所有模型的持仓
export const mockPositions: Position[] = mockModels.flatMap(model =>
  generatePositions(model.id)
);

