# 环境变量配置说明

## 配置前端连接后端API

### 1. 创建环境变量文件

在项目根目录创建 `.env.local` 文件：

```bash
# 设置为 false 使用真实 API，设置为 true 使用 Mock 数据
NEXT_PUBLIC_USE_MOCK=false

# API 基础 URL
NEXT_PUBLIC_API_BASE=http://localhost:3001/api
```

### 2. 配置步骤

1. **创建环境变量文件**：
   ```bash
   # 在项目根目录执行
   echo "NEXT_PUBLIC_USE_MOCK=false" > .env.local
   echo "NEXT_PUBLIC_API_BASE=http://localhost:3001/api" >> .env.local
   ```

2. **重启开发服务器**：
   ```bash
   # 停止当前服务器 (Ctrl+C)
   npm run dev
   ```

### 3. 验证配置

前端会自动检测环境变量并切换到API模式。您可以在浏览器控制台看到：
- 数据来源从 "Mock Data" 切换到 "API"
- API请求会发送到 `http://localhost:3001/api`

### 4. 后端API端点要求

确保您的后端提供以下端点：

- `GET /api/models` - 获取所有模型
- `GET /api/models/:id` - 获取单个模型
- `GET /api/trades?modelId&limit` - 获取交易记录
- `GET /api/positions?modelId` - 获取持仓信息
- `GET /api/value-history/:id?days` - 获取价值历史
- `GET /api/automated-chats?modelId&limit` - 获取自动化聊天
- `GET /api/prices` - 获取加密货币价格

### 5. 切换回Mock数据

如果需要切换回Mock数据：
```bash
# 修改 .env.local 文件
NEXT_PUBLIC_USE_MOCK=true
```

### 6. 生产环境配置

生产环境配置：
```bash
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_API_BASE=https://your-production-api.com/api
```

## 注意事项

- 环境变量文件 `.env.local` 不会被提交到Git
- 修改环境变量后需要重启开发服务器
- 确保后端CORS配置允许前端域名访问
- API响应格式需要符合前端期望的数据结构
