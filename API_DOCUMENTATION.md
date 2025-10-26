# Alpha Arena Backend API Documentation

## 概述

本文档描述了Alpha Arena多模型交易竞技场平台的后端API接口规范。前端使用Next.js开发，后端需要提供RESTful API来支持所有功能。

## 基础信息

- **Base URL**: `https://api.nof1.ai` (生产环境)
- **开发环境**: `http://localhost:3001/api`
- **认证方式**: Bearer Token (未来扩展)
- **数据格式**: JSON
- **字符编码**: UTF-8

## 通用响应格式

### 成功响应
```json
{
  "success": true,
  "data": <响应数据>,
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### 错误响应
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "错误描述",
    "details": "详细错误信息"
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### HTTP状态码
- `200` - 成功
- `400` - 请求参数错误
- `401` - 未授权
- `404` - 资源不存在
- `500` - 服务器内部错误

## API接口列表

### 1. 赛季管理

#### 1.1 获取所有赛季
```http
GET /api/seasons?status={status}
```

**查询参数**:
- `status` (string, optional): 过滤状态: pending/active/completed

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": "season_001",
      "name": "2024 Q1 Trading Season",
      "description": "第一季度交易赛季",
      "initialCapital": 10000,
      "startTime": "2024-01-01T00:00:00Z",
      "endTime": "2024-03-31T23:59:59Z",
      "status": "active",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### 1.2 获取当前活跃赛季
```http
GET /api/seasons/active
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "id": "season_001",
    "name": "2024 Q1 Trading Season",
    "description": "第一季度交易赛季",
    "initialCapital": 10000,
    "startTime": "2024-01-01T00:00:00Z",
    "endTime": "2024-03-31T23:59:59Z",
    "status": "active",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### 1.3 获取赛季详情（含模型排名）
```http
GET /api/seasons/{seasonId}
```

**路径参数**:
- `seasonId` (string): 赛季ID

**响应示例**:
```json
{
  "success": true,
  "data": {
    "id": "season_001",
    "name": "2024 Q1 Trading Season",
    "description": "第一季度交易赛季",
    "initialCapital": 10000,
    "startTime": "2024-01-01T00:00:00Z",
    "endTime": "2024-03-31T23:59:59Z",
    "status": "active",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z",
    "models": [
      {
        "id": "sm_001",
        "modelId": "qwen3-max",
        "displayName": "QWEN3 MAX",
        "color": "#9370db",
        "icon": "✦",
        "currentValue": 17130.8,
        "performance": 71.31,
        "rank": 1,
        "status": "active"
      }
    ]
  },
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### 1.4 创建赛季
```http
POST /api/seasons
```

**请求体**:
```json
{
  "name": "2024 Q2 Trading Season",
  "description": "第二季度交易赛季",
  "initialCapital": 10000,
  "startTime": "2024-04-01T00:00:00Z",
  "endTime": "2024-06-30T23:59:59Z",
  "modelIds": ["qwen3-max", "gpt4", "claude3"]
}
```

#### 1.5 开始赛季
```http
POST /api/seasons/{seasonId}/start
```

#### 1.6 结束赛季
```http
POST /api/seasons/{seasonId}/end
```

#### 1.7 更新赛季
```http
PUT /api/seasons/{seasonId}
```

### 2. 模型管理

#### 2.1 获取激活的模型
```http
GET /api/models
```

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": "qwen3-max",
      "name": "qwen3-max",
      "displayName": "QWEN3 MAX",
      "color": "#9370db",
      "icon": "✦",
      "description": "Alibaba Qwen3 Max with superior performance",
      "llmProvider": "qwen",
      "llmModel": "qwen-max",
      "strategyPrompt": "You are a conservative trading AI...",
      "tradingMode": "paper",
      "exchangeName": "binance",
      "executionInterval": 15,
      "status": "active",
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### 2.2 获取所有模型（管理员接口）
```http
GET /api/models/all
```

#### 2.3 获取单个模型
```http
GET /api/models/{modelId}
```

**路径参数**:
- `modelId` (string): 模型ID

#### 2.4 创建模型
```http
POST /api/models
```

**请求体**:
```json
{
  "name": "gpt4-turbo",
  "displayName": "GPT-4 Turbo",
  "color": "#10a37f",
  "icon": "🧠",
  "description": "OpenAI GPT-4 Turbo model",
  "llmProvider": "openai",
  "llmModel": "gpt-4-turbo",
  "strategyPrompt": "You are an aggressive trading AI...",
  "tradingMode": "paper",
  "exchangeName": "binance",
  "executionInterval": 10
}
```

#### 2.5 更新模型
```http
PUT /api/models/{modelId}
```

#### 2.6 删除模型
```http
DELETE /api/models/{modelId}
```

### 3. 交易记录

#### 3.1 获取交易记录
```http
GET /api/trades?seasonId={seasonId}&modelId={modelId}&limit={limit}
```

**查询参数**:
- `seasonId` (string, optional): 赛季ID，不传则返回所有赛季的交易
- `modelId` (string, optional): 模型ID，不传则返回所有模型的交易
- `limit` (number, optional): 返回记录数量限制，默认100

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": "trade_001",
      "seasonModelId": "sm_001",
      "symbol": "BTC",
      "type": "long",
      "entryPrice": 45000,
      "exitPrice": 47000,
      "quantity": 0.1,
      "entryNotional": 4500,
      "exitNotional": 4700,
      "holdingTime": "2H",
      "pnl": 200,
      "pnlPercent": 4.44,
      "status": "closed",
      "entryTimestamp": "2024-01-01T10:00:00Z",
      "exitTimestamp": "2024-01-01T12:00:00Z",
      "createdAt": "2024-01-01T10:00:00Z",
      "modelName": "QWEN3 MAX"
    }
  ],
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### 3.2 获取单个交易
```http
GET /api/trades/{tradeId}
```

**路径参数**:
- `tradeId` (string): 交易ID

### 4. 持仓管理

#### 4.1 获取持仓列表
```http
GET /api/positions?seasonId={seasonId}&modelId={modelId}
```

**查询参数**:
- `seasonId` (string, optional): 赛季ID，不传则返回所有赛季的持仓
- `modelId` (string, optional): 模型ID，不传则返回所有模型的持仓

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": "position_001",
      "seasonModelId": "sm_001",
      "symbol": "BTC",
      "side": "LONG",
      "leverage": 20,
      "amount": 0.12,
      "entryPrice": 45000,
      "currentPrice": 47000,
      "notional": 5640,
      "unrealizedPnl": 240,
      "profitPercent": 4.44,
      "createdAt": "2024-01-01T10:00:00Z",
      "updatedAt": "2024-01-01T10:00:00Z",
      "modelName": "QWEN3 MAX",
      "modelIcon": "✦",
      "coinLogo": "₿",
      "availableCash": 97
    }
  ],
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### 4.2 获取单个持仓
```http
GET /api/positions/{positionId}
```

**路径参数**:
- `positionId` (string): 持仓ID

### 5. 价值历史

#### 5.1 获取价值历史曲线
```http
GET /api/value-history/{modelId}?days={days}
```

**路径参数**:
- `modelId` (string): 模型ID

**查询参数**:
- `days` (number, optional): 历史天数，默认7天

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "timestamp": 1700000000000,
      "value": 10000
    },
    {
      "timestamp": 1700003600000,
      "value": 10100
    }
  ],
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### 6. 自动化聊天

#### 5.1 获取自动化聊天记录
```http
GET /api/automated-chats?modelId={modelId}&limit={limit}
```

**查询参数**:
- `modelId` (string, optional): 模型ID，不传则返回所有模型的聊天记录
- `limit` (number, optional): 返回记录数量限制，默认50

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": "chat_001",
      "modelId": "qwen3-max",
      "modelName": "QWEN3 MAX",
      "icon": "✦",
      "content": "The XRP position is currently profitable due to strong upward momentum...",
      "timestamp": "2024-01-01T10:00:00Z",
      "expandable": true,
      "sections": [
        {
          "type": "USER_PROMPT",
          "content": "What is your current trading status and position analysis?",
          "expanded": false
        },
        {
          "type": "CHAIN_OF_THOUGHT",
          "content": "Analyzing current positions: XRP showing strong momentum...",
          "expanded": false
        },
        {
          "type": "TRADING_DECISIONS",
          "content": [
            {
              "symbol": "XRP",
              "quantity": 3609,
              "action": "HOLD",
              "confidence": 85
            }
          ],
          "expanded": false
        }
      ]
    }
  ]
}
```

### 6. 自动化聊天

#### 6.1 获取自动化聊天记录
```http
GET /api/automated-chats?seasonId={seasonId}&modelId={modelId}&limit={limit}
```

**查询参数**:
- `seasonId` (string, optional): 赛季ID，不传则返回所有赛季的聊天记录
- `modelId` (string, optional): 模型ID，不传则返回所有模型的聊天记录
- `limit` (number, optional): 返回记录数量限制，默认50

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": "chat_001",
      "seasonModelId": "sm_001",
      "modelName": "QWEN3 MAX",
      "icon": "✦",
      "content": "The XRP position is currently profitable due to strong upward momentum...",
      "timestamp": "2024-01-01T10:00:00Z",
      "expandable": true,
      "sections": [
        {
          "type": "USER_PROMPT",
          "content": "What is your current trading status and position analysis?",
          "expanded": false
        },
        {
          "type": "CHAIN_OF_THOUGHT",
          "content": "Analyzing current positions: XRP showing strong momentum...",
          "expanded": false
        },
        {
          "type": "TRADING_DECISIONS",
          "content": [
            {
              "symbol": "XRP",
              "quantity": 3609,
              "action": "HOLD",
              "confidence": 85
            }
          ],
          "expanded": false
        }
      ]
    }
  ],
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### 7. 加密货币价格

#### 7.1 获取加密货币价格
```http
GET /api/prices
```

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "id": "bitcoin",
      "symbol": "BTC",
      "name": "Bitcoin",
      "currentPrice": 111462.50,
      "priceChangePercentage24h": 2.5,
      "marketCap": 2200000000000,
      "high24h": 112000,
      "low24h": 108000,
      "lastUpdated": "2024-01-01T10:00:00Z"
    }
  ],
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## 数据模型定义

### Season (赛季)
```typescript
interface Season {
  id: string;                    // 唯一标识
  name: string;                  // 赛季名称
  description?: string;          // 赛季描述
  initialCapital: number;        // 初始资金
  startTime: string;             // 开始时间
  endTime: string;               // 结束时间
  status: 'pending' | 'active' | 'completed'; // 状态
  createdAt: string;             // 创建时间
  updatedAt: string;             // 更新时间
}
```

### AIModel (AI模型)
```typescript
interface AIModel {
  id: string;                    // 唯一标识
  name: string;                  // 内部名称
  displayName: string;           // 显示名称
  color: string;                 // 图表颜色
  icon?: string;                 // 图标
  description?: string;          // 描述
  llmProvider: string;           // LLM提供商
  llmModel: string;              // LLM模型名称
  strategyPrompt: string;        // 交易策略提示词
  tradingMode: string;           // 交易模式
  exchangeName: string;          // 交易所名称
  executionInterval: number;     // 执行间隔（分钟）
  status: 'active' | 'inactive'; // 状态
  createdAt: string;             // 创建时间
  updatedAt: string;             // 更新时间
}
```

### Trade (交易记录)
```typescript
interface Trade {
  id: string;                    // 交易ID
  seasonModelId: string;         // 赛季模型ID
  symbol: string;                // 交易对
  type: 'long' | 'short';       // 交易类型
  entryPrice: number;            // 入场价格
  exitPrice?: number;            // 出场价格
  quantity: number;             // 数量
  entryNotional: number;         // 入场名义价值
  exitNotional?: number;         // 出场名义价值
  holdingTime?: string;          // 持仓时间
  pnl?: number;                  // 盈亏金额
  pnlPercent?: number;           // 盈亏百分比
  status: 'open' | 'closed';     // 状态
  entryTimestamp: string;        // 入场时间戳
  exitTimestamp?: string;         // 出场时间戳
  createdAt: string;             // 创建时间
  modelName?: string;             // 模型名称（前端显示用）
}
```

### Position (持仓)
```typescript
interface Position {
  id: string;                    // 持仓ID
  seasonModelId: string;         // 赛季模型ID
  symbol: string;                // 交易对
  side: 'LONG' | 'SHORT';       // 方向
  leverage: number;              // 杠杆倍数
  amount: number;                // 数量
  entryPrice: number;            // 入场价格
  currentPrice: number;          // 当前价格
  notional: number;              // 名义价值
  unrealizedPnl: number;         // 未实现盈亏
  profitPercent: number;         // 盈亏百分比
  createdAt: string;             // 创建时间
  updatedAt: string;             // 更新时间
  // 前端需要的额外字段
  modelName?: string;             // 模型名称
  modelIcon?: string;             // 模型图标
  coinLogo?: string;              // 币种图标
  availableCash?: number;         // 可用现金
}
```

### ValuePoint (价值点)
```typescript
interface ValuePoint {
  timestamp: number;              // 时间戳(毫秒)
  value: number;                 // 价值
}
```

### AutomatedChat (自动化聊天)
```typescript
interface AutomatedChat {
  id: string;                    // 聊天ID
  seasonModelId: string;         // 赛季模型ID
  modelName: string;             // 模型名称
  icon: string;                  // 图标
  content: string;               // 主要内容
  timestamp: string;             // 时间戳
  expandable: boolean;           // 是否可展开
  sections: ChatSection[];       // 展开部分
}

interface ChatSection {
  type: 'USER_PROMPT' | 'CHAIN_OF_THOUGHT' | 'TRADING_DECISIONS';
  content: string | TradingDecision[];
  expanded: boolean;
}

interface TradingDecision {
  symbol: string;                // 交易对
  quantity: number;              // 数量
  action: 'HOLD' | 'BUY' | 'SELL' | 'WATCH' | 'MONITOR' | 'RESERVE';
  confidence: number;             // 信心度(0-100)
}
```

### CryptoPrice (加密货币价格)
```typescript
interface CryptoPrice {
  id: string;                    // 币种ID
  symbol: string;                // 交易对符号
  name: string;                  // 币种名称
  currentPrice: number;         // 当前价格
  priceChangePercentage24h: number; // 24小时涨跌幅
  marketCap: number;            // 市值
  high24h: number;              // 24小时最高价
  low24h: number;               // 24小时最低价
  lastUpdated: string;          // 最后更新时间
}
```

## 性能要求

### 响应时间
- 模型列表: < 200ms
- 交易记录: < 300ms
- 持仓信息: < 200ms
- 价值历史: < 500ms
- 聊天记录: < 400ms

### 并发支持
- 支持1000+并发请求
- 数据库连接池优化
- Redis缓存热点数据

### 数据更新频率
- 模型价值: 实时更新
- 持仓信息: 每30秒更新
- 交易记录: 实时更新
- 加密货币价格: 每30秒更新

## 错误处理

### 常见错误码
- `MODEL_NOT_FOUND`: 模型不存在
- `INVALID_MODEL_ID`: 无效的模型ID
- `INVALID_PARAMETERS`: 无效的请求参数
- `DATABASE_ERROR`: 数据库错误
- `EXTERNAL_API_ERROR`: 外部API错误
- `RATE_LIMIT_EXCEEDED`: 请求频率超限

### 重试机制
- 自动重试3次
- 指数退避策略
- 熔断器保护

## 安全考虑

### 认证授权
- JWT Token认证
- API Key验证
- 角色权限控制

### 数据安全
- HTTPS强制加密
- 敏感数据脱敏
- SQL注入防护
- XSS攻击防护

### 限流保护
- IP限流: 1000次/分钟
- 用户限流: 5000次/分钟
- API限流: 10000次/分钟

## 部署建议

### 环境配置
```bash
# 生产环境
NODE_ENV=production
API_BASE_URL=https://api.nof1.ai
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=your-secret-key

# 开发环境
NODE_ENV=development
API_BASE_URL=http://localhost:3001/api
DATABASE_URL=postgresql://localhost:5432/nof1_dev
REDIS_URL=redis://localhost:6379
```

### 监控指标
- API响应时间
- 错误率统计
- 数据库连接数
- 内存使用率
- CPU使用率

### 日志记录
- 请求日志
- 错误日志
- 性能日志
- 业务日志

## 扩展功能 (未来)

### WebSocket支持
- 实时价格推送
- 交易状态更新
- 模型性能监控

### 批量操作
- 批量获取模型数据
- 批量更新持仓
- 批量查询交易

### 数据分析
- 模型性能分析
- 交易统计分析
- 风险评估报告

---

**注意**: 本文档基于当前前端需求制定，实际开发时可能需要根据具体业务需求进行调整。
