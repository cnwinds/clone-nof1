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

// 价值历史数据点
export interface ValuePoint {
  timestamp: number;
  value: number;
}

// 交易记录类型（多模型增强版）
export interface Trade {
  id: string;
  modelId: string;        // 所属模型 ID
  modelName: string;      // 模型名称
  symbol: string;
  type: 'long' | 'short'; // 做多/做空
  entryPrice: number;     // 入场价格
  exitPrice: number;      // 出场价格
  quantity: number;       // 数量
  entryNotional: number;  // 入场名义价值
  exitNotional: number;   // 出场名义价值
  holdingTime: string;    // 持仓时间（如 "2H", "14M"）
  pnl: number;           // 盈亏金额
  pnlPercent: number;    // 盈亏百分比
  timestamp: string;
}

// 持仓类型
export interface Position {
  id: string;
  modelId: string;       // 所属模型 ID
  symbol: string;
  amount: number;
  entryPrice: number;
  currentPrice: number;
  profit: number;
  profitPercent: number;
  timestamp: string;
}

// AI 模型类型（增强版）
export interface AIModel {
  id: string;
  name: string;              // 如 "gpt-6"
  displayName: string;       // 如 "GPT 6"
  initialValue: number;      // 初始投资 $10,000
  currentValue: number;      // 当前价值
  performance: number;       // 表现百分比
  color: string;             // 图表颜色
  icon?: string;             // 图标
  status: 'active' | 'inactive';
  description?: string;      // 策略描述
  rank?: number;
  winRate?: number;
  totalTrades?: number;
  valueHistory: ValuePoint[]; // 历史价值曲线
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

// 数据服务接口
export interface IDataService {
  getModels(): Promise<AIModel[]>;
  getModelById(id: string): Promise<AIModel | null>;
  getTrades(modelId?: string, limit?: number): Promise<Trade[]>;
  getPositions(modelId?: string): Promise<Position[]>;
  getValueHistory(modelId: string, days: number): Promise<ValuePoint[]>;
}

