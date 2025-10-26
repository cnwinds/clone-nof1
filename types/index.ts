// 加密货币价格数据类型
export interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  high_24h: number;
  low_24h: number;
  last_updated: string;
}

// 图表数据点类型
export interface ChartDataPoint {
  timestamp: number;
  price: number;
}

// 历史价格数据类型
export interface HistoricalData {
  prices: [number, number][]; // [timestamp, price]
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

// 交易记录类型
export interface Trade {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  price: number;
  amount: number;
  total: number;
  timestamp: string;
  profit?: number;
  profitPercent?: number;
}

// 持仓类型
export interface Position {
  id: string;
  symbol: string;
  amount: number;
  entryPrice: number;
  currentPrice: number;
  profit: number;
  profitPercent: number;
  timestamp: string;
}

// AI 模型类型
export interface AIModel {
  id: string;
  name: string;
  rank: number;
  totalReturn: number;
  winRate: number;
  totalTrades: number;
  status: 'active' | 'inactive';
}

// 聊天消息类型
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

// 账户信息类型
export interface AccountInfo {
  totalValue: number;
  availableBalance: number;
  totalProfit: number;
  totalProfitPercent: number;
}

// 连接状态类型
export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

