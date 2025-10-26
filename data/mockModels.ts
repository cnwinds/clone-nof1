import type { AIModel, Trade, Position, ValuePoint } from '@/types';

// 7 个 AI 模型的配置（根据图片中的实际数据）
export const MODEL_CONFIGS = [
  {
    id: 'qwen3-max',
    name: 'qwen3-max',
    displayName: 'QWEN3 MAX',
    color: '#9370db', // 紫色 - 最高表现
    icon: '✦',
    description: 'Alibaba Qwen3 Max with superior performance',
  },
  {
    id: 'deepseek-chat-v3.1',
    name: 'deepseek-chat-v3.1',
    displayName: 'DEEPSEEK CHAT V3.1',
    color: '#4169e1', // 蓝色 - 中等表现
    icon: 'S',
    description: 'DeepSeek advanced chat model',
  },
  {
    id: 'btc-buyhold',
    name: 'btc-buyhold',
    displayName: 'BTC BUY&HOLD',
    color: '#808080', // 灰色虚线 - 基准线
    icon: '₿',
    description: 'Bitcoin buy and hold baseline strategy',
  },
  {
    id: 'claude-sonnet-4.1',
    name: 'claude-sonnet-4.1',
    displayName: 'CLAUDE SONNET 4.1',
    color: '#ff8c00', // 橙色 - 略负表现
    icon: '★',
    description: 'Anthropic Claude Sonnet with enhanced analysis',
  },
  {
    id: 'grok-4',
    name: 'grok-4',
    displayName: 'GROK 4',
    color: '#000000', // 黑色 - 波动后稳定
    icon: 'Ø',
    description: 'xAI Grok with real-time data access',
  },
  {
    id: 'gemini-2.5-pro',
    name: 'gemini-2.5-pro',
    displayName: 'GEMINI 2.5 PRO',
    color: '#87ceeb', // 浅蓝色 - 显著负表现
    icon: '♦',
    description: 'Google Gemini Pro with multi-modal insights',
  },
  {
    id: 'gpt-6',
    name: 'gpt-6',
    displayName: 'GPT 6',
    color: '#32cd32', // 绿色 - 最显著负表现
    icon: 'S',
    description: 'Advanced reasoning with GPT-6 architecture',
  },
] as const;

// 生成价值历史曲线（8天数据，根据图片）
function generateValueHistory(
  initialValue: number,
  finalValue: number,
  volatility: number,
  trendType: 'aggressive' | 'moderate' | 'stable' | 'declining' | 'volatile',
  days: number = 6
): ValuePoint[] {
  const points: ValuePoint[] = [];
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  const pointsPerDay = 8; // 每3小时一个点，减少密度
  const totalPoints = days * pointsPerDay;

  let currentValue = initialValue;
  const valueChange = (finalValue - initialValue) / totalPoints;

  for (let i = 0; i <= totalPoints; i++) {
    // 从6天前开始，到当前时间结束
    const timestamp = now - (totalPoints - i) * (dayMs / pointsPerDay);
    const progress = i / totalPoints;
    
    // 根据趋势类型生成不同的波动模式
    let randomFactor = 0;
    let trendMultiplier = 1;
    
    switch (trendType) {
      case 'aggressive':
        // 高波动，有大幅上涨和下跌
        randomFactor = (Math.random() - 0.5) * 6 * volatility;
        // 添加周期性波动
        const aggressiveWave = Math.sin(progress * Math.PI * 4) * 0.3;
        if (progress < 0.3) trendMultiplier = 1.2 + aggressiveWave; // 早期上涨
        else if (progress > 0.7) trendMultiplier = 0.8 + aggressiveWave; // 后期调整
        else trendMultiplier = 1 + progress * 0.4 + aggressiveWave;
        break;
      case 'moderate':
        // 中等波动，稳定上升但有起伏
        randomFactor = (Math.random() - 0.5) * 3 * volatility;
        const moderateWave = Math.sin(progress * Math.PI * 3) * 0.2;
        trendMultiplier = 1 + progress * 0.3 + moderateWave;
        break;
      case 'stable':
        // 低波动，稳定增长但有小幅波动
        randomFactor = (Math.random() - 0.5) * 1.5 * volatility;
        const stableWave = Math.sin(progress * Math.PI * 2) * 0.1;
        trendMultiplier = 1 + progress * 0.1 + stableWave;
        break;
      case 'declining':
        // 持续下降但有反弹
        randomFactor = (Math.random() - 0.5) * 2.5 * volatility;
        const declineWave = Math.sin(progress * Math.PI * 2.5) * 0.15;
        trendMultiplier = 1 - progress * 0.7 + declineWave;
        break;
      case 'volatile':
        // 高波动，先涨后跌，有剧烈波动
        randomFactor = (Math.random() - 0.5) * 5 * volatility;
        const volatileWave = Math.sin(progress * Math.PI * 6) * 0.4;
        if (progress < 0.5) trendMultiplier = 1 + progress * 0.4 + volatileWave;
        else trendMultiplier = 1.2 - (progress - 0.5) * 0.8 + volatileWave;
        break;
    }
    
    currentValue += valueChange * trendMultiplier + valueChange * randomFactor;
    
    // 添加额外的随机波动，模拟市场情绪
    const marketNoise = (Math.random() - 0.5) * volatility * 0.5;
    currentValue += marketNoise;
    
    // 添加偶尔的大幅波动（模拟突发事件）
    if (Math.random() < 0.05) { // 5%概率
      const suddenMove = (Math.random() - 0.5) * volatility * 2;
      currentValue += suddenMove;
    }
    
    points.push({
      timestamp,
      value: Math.max(0, currentValue),
    });
  }

  // 确保最后一个点是准确的最终值
  points[points.length - 1].value = finalValue;

  return points;
}

// 生成交易记录（根据模型表现调整交易质量）
function generateTrades(modelId: string, modelName: string, count: number = 30): Trade[] {
  const trades: Trade[] = [];
  const symbols = ['BTC', 'ETH', 'SOL', 'BNB', 'DOGE', 'XRP'];
  const now = Date.now();
  
  // 根据模型表现调整交易质量
  const modelPerformance = mockModels.find(m => m.id === modelId)?.performance || 0;
  const winRate = mockModels.find(m => m.id === modelId)?.winRate || 50;
  
  for (let i = 0; i < count; i++) {
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const type: 'long' | 'short' = Math.random() > 0.5 ? 'long' : 'short';
    
    // 根据币种设置基础价格
    const basePrices = {
      'BTC': 42000,
      'ETH': 2600,
      'SOL': 95,
      'BNB': 320,
      'DOGE': 0.08,
      'XRP': 0.52
    };
    
    const basePrice = basePrices[symbol as keyof typeof basePrices];
    const entryPrice = basePrice * (0.95 + Math.random() * 0.1); // ±5% 波动
    
    // 根据模型表现调整价格变化
    let priceChange = (Math.random() - 0.5) * 0.2; // ±20% 基础波动
    
    // 如果模型表现好，增加盈利概率
    if (modelPerformance > 0) {
      priceChange += Math.random() * 0.1; // 增加正向变化
    } else if (modelPerformance < -30) {
      priceChange -= Math.random() * 0.15; // 增加负向变化
    }
    
    const exitPrice = entryPrice * (1 + priceChange);
    
    // 根据模型表现调整交易规模
    const baseQuantity = basePrice > 100 ? Math.random() * 10 + 1 : Math.random() * 10000 + 1000;
    const quantity = baseQuantity * (0.8 + Math.random() * 0.4);
    
    const entryNotional = entryPrice * quantity;
    const exitNotional = exitPrice * quantity;
    
    const pnl = type === 'long' 
      ? exitNotional - entryNotional
      : entryNotional - exitNotional;
    const pnlPercent = (pnl / entryNotional) * 100;
    
    // 根据模型表现调整持仓时间
    const baseHoldingMinutes = modelPerformance > 0 ? 120 : 60; // 表现好的模型持仓时间更长
    const holdingMinutes = Math.floor(Math.random() * baseHoldingMinutes * 2);
    const holdingTime = holdingMinutes < 60 
      ? `${holdingMinutes}M`
      : `${Math.floor(holdingMinutes / 60)}H ${holdingMinutes % 60}M`;
    
    trades.push({
      id: `${modelId}-trade-${i}`,
      modelId,
      modelName,
      symbol,
      type,
      entryPrice: Number(entryPrice.toFixed(5)),
      exitPrice: Number(exitPrice.toFixed(5)),
      quantity: Number(quantity.toFixed(2)),
      entryNotional: Number(entryNotional.toFixed(2)),
      exitNotional: Number(exitNotional.toFixed(2)),
      holdingTime,
      pnl: Number(pnl.toFixed(2)),
      pnlPercent: Number(pnlPercent.toFixed(2)),
      timestamp: new Date(now - (count - i) * 3600000).toISOString(),
    });
  }
  
  return trades;
}

// 币种配置
const COIN_CONFIGS = {
  'BTC': { logo: 'B', basePrice: 42000 },
  'ETH': { logo: 'E', basePrice: 2600 },
  'SOL': { logo: 'S', basePrice: 95 },
  'BNB': { logo: 'B', basePrice: 320 },
  'DOGE': { logo: 'D', basePrice: 0.08 },
  'XRP': { logo: 'X', basePrice: 0.52 },
};

// 模型配置（匹配图片中的图标）
const MODEL_ICONS = {
  'gpt-6': 'S', // GPT 5 在图片中显示为 S
  'grok-4': 'Ø', // GROK 4 在图片中显示为 Ø
  'qwen3-max': '⚡', // QWEN3 MAX 在图片中显示为 ⚡
  'gemini-2.5-pro': '✦', // GEMINI 2.5 PRO 在图片中显示为 ✦
  'claude-sonnet-4.1': 'C',
  'deepseek-chat-v3.1': 'D',
  'btc-buyhold': '₿',
};

// 生成持仓（根据图片中的实际数据）
function generatePositions(modelId: string, modelName: string): Position[] {
  const positions: Position[] = [];
  const modelIcon = MODEL_ICONS[modelId as keyof typeof MODEL_ICONS] || '?';
  
  // 根据图片中的实际数据生成持仓
  const positionConfigs = getPositionConfigsForModel(modelId);
  
  positionConfigs.forEach((config: any, index: number) => {
    const coinConfig = COIN_CONFIGS[config.symbol as keyof typeof COIN_CONFIGS];
    const entryPrice = config.entryPrice;
    const currentPrice = config.currentPrice;
    const amount = config.amount;
    const leverage = config.leverage;
    const notional = amount * currentPrice;
    const unrealizedPnl = config.unrealizedPnl;
    const profitPercent = ((currentPrice - entryPrice) / entryPrice) * 100;
    
    positions.push({
      id: `${modelId}-pos-${index}`,
      modelId,
      modelName,
      modelIcon,
      symbol: config.symbol,
      coinLogo: coinConfig.logo,
      side: config.side,
      leverage,
      amount,
      entryPrice,
      currentPrice,
      notional,
      unrealizedPnl,
      profitPercent,
      availableCash: config.availableCash,
      timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    });
  });
  
  return positions;
}

// 根据模型获取持仓配置（基于图片中的实际数据）
function getPositionConfigsForModel(modelId: string) {
  const configs: any = {
    'gpt-6': [
      { symbol: 'XRP', side: 'LONG', leverage: 15, amount: 3609, entryPrice: 0.52, currentPrice: 0.52, unrealizedPnl: 88.18, availableCash: 1376.43 },
      { symbol: 'DOGE', side: 'LONG', leverage: 10, amount: 27858, entryPrice: 0.08, currentPrice: 0.08, unrealizedPnl: 568.44, availableCash: 1376.43 },
      { symbol: 'BTC', side: 'LONG', leverage: 20, amount: 0.12, entryPrice: 42000, currentPrice: 42000, unrealizedPnl: -43.94, availableCash: 1376.43 },
      { symbol: 'ETH', side: 'LONG', leverage: 24, amount: 26.05, entryPrice: 2600, currentPrice: 2600, unrealizedPnl: -86.77, availableCash: 1376.43 },
      { symbol: 'SOL', side: 'LONG', leverage: 15, amount: 81.81, entryPrice: 95, currentPrice: 95, unrealizedPnl: -43.94, availableCash: 1376.43 },
      { symbol: 'BNB', side: 'LONG', leverage: 10, amount: 3.21, entryPrice: 320, currentPrice: 320, unrealizedPnl: -86.77, availableCash: 1376.43 },
    ],
    'grok-4': [
      { symbol: 'XRP', side: 'LONG', leverage: 15, amount: 3609, entryPrice: 0.52, currentPrice: 0.52, unrealizedPnl: 88.18, availableCash: 3262.84 },
      { symbol: 'DOGE', side: 'LONG', leverage: 10, amount: 27858, entryPrice: 0.08, currentPrice: 0.08, unrealizedPnl: 568.44, availableCash: 3262.84 },
      { symbol: 'BTC', side: 'LONG', leverage: 20, amount: 0.12, entryPrice: 42000, currentPrice: 42000, unrealizedPnl: -43.94, availableCash: 3262.84 },
      { symbol: 'ETH', side: 'LONG', leverage: 24, amount: 26.05, entryPrice: 2600, currentPrice: 2600, unrealizedPnl: -86.77, availableCash: 3262.84 },
      { symbol: 'SOL', side: 'LONG', leverage: 15, amount: 81.81, entryPrice: 95, currentPrice: 95, unrealizedPnl: -43.94, availableCash: 3262.84 },
      { symbol: 'BNB', side: 'LONG', leverage: 10, amount: 3.21, entryPrice: 320, currentPrice: 320, unrealizedPnl: -86.77, availableCash: 3262.84 },
    ],
    'qwen3-max': [
      { symbol: 'BTC', side: 'LONG', leverage: 20, amount: 0.12, entryPrice: 42000, currentPrice: 42000, unrealizedPnl: 6484.66, availableCash: 97.80 },
    ],
    'gemini-2.5-pro': [
      { symbol: 'XRP', side: 'LONG', leverage: 15, amount: 3609, entryPrice: 0.52, currentPrice: 0.52, unrealizedPnl: 88.18, availableCash: 1547.50 },
      { symbol: 'DOGE', side: 'SHORT', leverage: 10, amount: 27858, entryPrice: 0.08, currentPrice: 0.08, unrealizedPnl: -568.44, availableCash: 1547.50 },
      { symbol: 'BTC', side: 'LONG', leverage: 20, amount: 0.12, entryPrice: 42000, currentPrice: 42000, unrealizedPnl: -43.94, availableCash: 1547.50 },
      { symbol: 'ETH', side: 'LONG', leverage: 24, amount: 26.05, entryPrice: 2600, currentPrice: 2600, unrealizedPnl: -86.77, availableCash: 1547.50 },
      { symbol: 'SOL', side: 'LONG', leverage: 15, amount: 81.81, entryPrice: 95, currentPrice: 95, unrealizedPnl: -43.94, availableCash: 1547.50 },
      { symbol: 'BNB', side: 'LONG', leverage: 10, amount: 3.21, entryPrice: 320, currentPrice: 320, unrealizedPnl: -86.77, availableCash: 1547.50 },
    ],
  };
  
  return configs[modelId] || [];
}

// 生成完整的模型数据（根据图片中的实际数据）
export const mockModels: AIModel[] = [
  {
    id: 'qwen3-max',
    name: 'qwen3-max',
    displayName: 'QWEN3 MAX',
    initialValue: 10000,
    currentValue: 17130.8, // 图片中的最高值
    performance: 71.31,
    color: '#9370db',
    icon: '✦',
    status: 'active',
    description: 'Alibaba Qwen3 Max with superior performance',
    rank: 1,
    winRate: 78.5,
    totalTrades: 267,
    valueHistory: generateValueHistory(10000, 17130.8, 0.8, 'aggressive'),
  },
  {
    id: 'deepseek-chat-v3.1',
    name: 'deepseek-chat-v3.1',
    displayName: 'DEEPSEEK CHAT V3.1',
    initialValue: 10000,
    currentValue: 13563.00, // 图片中的第二高值
    performance: 35.63,
    color: '#4169e1',
    icon: 'S',
    status: 'active',
    description: 'DeepSeek advanced chat model',
    rank: 2,
    winRate: 65.2,
    totalTrades: 198,
    valueHistory: generateValueHistory(10000, 13563.00, 0.6, 'moderate'),
  },
  {
    id: 'btc-buyhold',
    name: 'btc-buyhold',
    displayName: 'BTC BUY&HOLD',
    initialValue: 10000,
    currentValue: 10250, // 图片中的基准线
    performance: 2.5,
    color: '#808080',
    icon: '₿',
    status: 'active',
    description: 'Bitcoin baseline strategy',
    rank: 3,
    winRate: 100,
    totalTrades: 1,
    valueHistory: generateValueHistory(10000, 10250, 0.3, 'stable'),
  },
  {
    id: 'claude-sonnet-4.1',
    name: 'claude-sonnet-4.1',
    displayName: 'CLAUDE SONNET 4.1',
    initialValue: 10000,
    currentValue: 9247.2, // 图片中的略负值
    performance: -7.53,
    color: '#ff8c00',
    icon: '★',
    status: 'active',
    description: 'Anthropic Claude Sonnet with enhanced analysis',
    rank: 4,
    winRate: 52.8,
    totalTrades: 156,
    valueHistory: generateValueHistory(10000, 9247.2, 0.7, 'volatile'),
  },
  {
    id: 'grok-4',
    name: 'grok-4',
    displayName: 'GROK 4',
    initialValue: 10000,
    currentValue: 9500, // 图片中的波动后稳定值
    performance: -5.0,
    color: '#000000',
    icon: 'Ø',
    status: 'active',
    description: 'xAI Grok with real-time data access',
    rank: 5,
    winRate: 48.3,
    totalTrades: 189,
    valueHistory: generateValueHistory(10000, 9500, 0.8, 'volatile'),
  },
  {
    id: 'gemini-2.5-pro',
    name: 'gemini-2.5-pro',
    displayName: 'GEMINI 2.5 PRO',
    initialValue: 10000,
    currentValue: 3357.40, // 图片中的显著负值
    performance: -66.43,
    color: '#87ceeb',
    icon: '♦',
    status: 'active',
    description: 'Google Gemini Pro with multi-modal insights',
    rank: 6,
    winRate: 38.7,
    totalTrades: 142,
    valueHistory: generateValueHistory(10000, 3357.40, 0.9, 'declining'),
  },
  {
    id: 'gpt-6',
    name: 'gpt-6',
    displayName: 'GPT 6',
    initialValue: 10000,
    currentValue: 2969.21, // 图片中的最低值
    performance: -70.31,
    color: '#32cd32',
    icon: 'S',
    status: 'active',
    description: 'Advanced reasoning with GPT-6 architecture',
    rank: 7,
    winRate: 35.2,
    totalTrades: 124,
    valueHistory: generateValueHistory(10000, 2969.21, 1.0, 'declining'),
  },
];

// 生成所有模型的交易记录
export const mockTrades: Trade[] = mockModels.flatMap(model =>
  generateTrades(model.id, model.displayName, 30)
);

// 生成所有模型的持仓
export const mockPositions: Position[] = mockModels.flatMap(model =>
  generatePositions(model.id, model.displayName)
);

