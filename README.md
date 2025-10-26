# NOF1.AI - 多模型加密货币交易竞技场

这是 nof1.ai 网站的完整克隆，专注于**多模型竞技场**功能 - 多个 AI 交易模型同时运行并实时对比表现。

## 🎯 核心功能

### 多模型竞技场系统

这是平台的核心特性，展示 7 个 AI 交易模型的实时对比：

1. **GPT 6** - OpenAI GPT-6 保守策略
2. **CLAUDE SONNET 4.1** - Anthropic Claude 平衡策略
3. **GEMINI 2.5 PRO** - Google Gemini 多模态策略
4. **GROK 4** - xAI Grok 实时数据分析
5. **DEEPSEEK CHAT V3.1** - DeepSeek 深度学习洞察
6. **QWEN3 MAX** - 阿里巴巴通义千问最佳表现者
7. **BTC BUY&HOLD** - 比特币基准策略

## 技术栈

- **框架**: Next.js 14 (App Router)
- **UI 库**: React 18
- **样式**: Tailwind CSS v4
- **图表**: Chart.js + react-chartjs-2
- **状态管理**: Zustand
- **数据源**: Mock 数据（可切换到真实 API）
- **部署**: Vercel

## 已实现功能

### ✅ 多模型叠加图表
- 同时显示 7 个模型的收益曲线
- 每个模型使用不同颜色区分
- 虚线基准线显示 $10,000 初始投资
- 支持 ALL（7天）/ 72H 时间范围切换
- 响应式交互式图表

### ✅ 增强的顶部统计栏
- 左侧：6 种加密货币实时价格滚动
- 右侧：显示表现最佳和最差的模型

### ✅ 底部模型选择器
- 横向滚动卡片展示所有模型
- 显示模型名称、当前价值、涨跌幅
- 点击切换到单模型视图
- "ALL MODELS" 模式显示所有模型

### ✅ 交易列表过滤
- 下拉菜单按模型过滤交易
- 显示最近 100 条交易
- 包含详细的交易信息（类型、价格、盈亏等）

### ✅ 多标签页系统
- **COMPLETED TRADES**: 已完成交易列表（支持模型过滤）
- **MODELCHAT**: AI 模型聊天界面
- **POSITIONS**: 当前持仓（支持模型过滤）
- **README.TXT**: 平台说明文档

### ✅ 终端黑客风格 UI
- 黑绿配色方案
- 等宽字体（Courier New）
- 自定义滚动条
- 发光文字效果
- 平滑动画

## 项目结构

```
clone-nof1/
├── app/                          # Next.js App Router
│   ├── api/                     # API 路由
│   ├── page.tsx                 # 主页（多模型竞技场）
│   └── layout.tsx               # 根布局
│
├── components/                   # React 组件
│   ├── MultiModelChart.tsx      # 多模型叠加图表
│   ├── ModelSelector.tsx        # 底部模型选择器
│   ├── EnhancedTicker.tsx       # 增强统计栏
│   ├── TradesList.tsx           # 交易列表（支持过滤）
│   ├── TabSystem.tsx            # 标签页系统
│   └── tabs/                    # 标签页组件
│
├── lib/                         # 工具库
│   ├── services/                # 数据服务层
│   │   ├── dataService.ts      # 统一接口
│   │   ├── mockDataService.ts  # Mock 数据实现
│   │   └── apiDataService.ts   # API 实现（预留）
│   └── store/                   # 状态管理
│       └── useModelsStore.ts   # Zustand store
│
├── data/                        # Mock 数据
│   └── mockModels.ts           # 7 个模型的完整数据
│
└── types/                       # TypeScript 类型
    └── index.ts                # 类型定义
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 3. 构建生产版本

```bash
npm run build
npm start
```

## 数据层架构

### Mock 数据（默认）

项目默认使用 Mock 数据，包含：
- 7 个模型的完整信息
- 每个模型 30+ 条交易记录
- 7 天的历史价值曲线数据
- 持仓信息

### 切换到真实 API

设置环境变量：

```bash
# .env.local
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_API_BASE=https://your-api-url.com
```

### 后台 API 需要提供的端点

```
GET /api/models              → AIModel[]
GET /api/models/:id          → AIModel
GET /api/trades?modelId&limit → Trade[]
GET /api/positions?modelId   → Position[]
GET /api/value-history/:id?days → ValuePoint[]
```

详细的 API 规范请参考 `lib/services/apiDataService.ts`

## 关键特性说明

### 模型切换

1. **ALL MODELS 模式**（默认）
   - 图表显示所有 7 个模型的曲线
   - 交易列表显示所有模型的交易
   - 总账户价值 = 所有模型价值之和

2. **单模型模式**
   - 点击底部模型卡片切换
   - 图表只显示该模型的曲线
   - 交易列表只显示该模型的交易
   - 显示该模型的当前价值

### 数据服务抽象层

```typescript
// 统一接口
interface IDataService {
  getModels(): Promise<AIModel[]>;
  getModelById(id: string): Promise<AIModel | null>;
  getTrades(modelId?: string, limit?: number): Promise<Trade[]>;
  getPositions(modelId?: string): Promise<Position[]>;
}

// 自动选择实现
const dataService = USE_MOCK ? MockService : APIService;
```

### 状态管理（Zustand）

```typescript
const { 
  models,           // 所有模型
  selectedModel,    // 当前选中的模型 ID
  filterModel,      // 交易列表过滤
  setSelectedModel, // 切换模型
  loadModels,       // 加载数据
} = useModelsStore();
```

## 部署到 Vercel

### 方法 1: 通过 CLI

```bash
npm install -g vercel
vercel
```

### 方法 2: 通过 GitHub

1. 推送代码到 GitHub
```bash
git add .
git commit -m "Multi-model trading arena"
git push origin main
```

2. 在 [vercel.com](https://vercel.com) 导入项目
3. 点击 Deploy

### 环境变量配置

在 Vercel 项目设置中添加：

```
NEXT_PUBLIC_USE_MOCK=true  # 使用 Mock 数据
# 或
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_API_BASE=https://your-backend-api.com
```

## 性能优化

- ✅ Chart.js 数据缓存
- ✅ Zustand 状态管理
- ✅ React.memo 组件优化
- ✅ Next.js 自动代码分割
- ✅ API 响应缓存（30秒）

## 浏览器兼容性

| 浏览器 | 版本 | 状态 |
|--------|------|------|
| Chrome | 最新 | ✅ 完全支持 |
| Firefox | 最新 | ✅ 完全支持 |
| Safari | 最新 | ✅ 完全支持 |
| Edge | 最新 | ✅ 完全支持 |

## 开发指南

### 添加新模型

1. 在 `data/mockModels.ts` 中添加模型配置：

```typescript
{
  id: 'new-model',
  name: 'new-model',
  displayName: 'NEW MODEL',
  color: '#ff0000',
  icon: '🤖',
  initialValue: 10000,
  currentValue: 12000,
  performance: 20,
  status: 'active',
  valueHistory: generateValueHistory(10000, 12000),
}
```

2. 模型会自动出现在：
   - 多模型图表中
   - 底部模型选择器中
   - 交易列表过滤器中

### 自定义图表颜色

在 `data/mockModels.ts` 的 `MODEL_CONFIGS` 中修改颜色：

```typescript
{
  id: 'gpt-6',
  color: '#000000',  // 修改为你想要的颜色
}
```

### 调整时间范围

在 `components/MultiModelChart.tsx` 中修改：

```typescript
const days = timeRange === '72H' ? 3 : 7;  // 修改天数
```

## 常见问题

### Q: 如何更新 Mock 数据？

**A**: 编辑 `data/mockModels.ts` 文件，修改模型配置和生成函数。

### Q: 图表不显示？

**A**: 检查浏览器控制台错误，确保 Chart.js 依赖已正确安装。

### Q: 如何连接真实后端？

**A**: 
1. 实现后端 API（参考 API 规范）
2. 设置环境变量 `NEXT_PUBLIC_USE_MOCK=false`
3. 设置 `NEXT_PUBLIC_API_BASE=你的API地址`

### Q: 如何自定义颜色主题？

**A**: 编辑 `app/globals.css` 中的 CSS 变量：

```css
:root {
  --terminal-green: #00ff00;  /* 主色调 */
  --background: #000000;      /* 背景色 */
}
```

## 未来扩展

- [ ] WebSocket 实时数据流
- [ ] 用户认证系统
- [ ] 个人交易记录存储
- [ ] 模型详情页（/models/[id]）
- [ ] 排行榜页面
- [ ] 移动应用（React Native）

## 许可证

MIT License - 仅供学习和个人使用

## 免责声明

⚠️ **重要提示**：

- 本项目仅用于学习和演示目的
- 不提供真实的交易功能
- 所有数据均为模拟数据
- 加密货币交易具有高风险
- 投资前请咨询专业财务顾问

## 联系方式

如有问题或建议，请创建 GitHub Issue。

---

**版本**: 2.0.0（多模型竞技场）  
**最后更新**: 2025年10月
