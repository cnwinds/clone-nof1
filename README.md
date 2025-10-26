# NOF1.AI - 加密货币交易平台克隆

这是一个完整的 nof1.ai 网站克隆，使用 Next.js、React、Tailwind CSS 和 Chart.js 构建。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **UI 库**: React 18
- **样式**: Tailwind CSS v4
- **图表**: Chart.js + react-chartjs-2
- **API**: CoinGecko API（加密货币价格数据）
- **部署**: Vercel

## 功能特性

### ✅ 已实现的功能

1. **实时加密货币价格滚动条**
   - 支持 6 种主流加密货币（BTC, ETH, SOL, BNB, DOGE, XRP）
   - 无限循环滚动动画
   - 实时价格更新（每 30 秒）
   - 24 小时涨跌幅显示

2. **交易图表**
   - 使用 Chart.js 绘制交互式价格图表
   - 支持多时间范围切换（ALL / 72H）
   - 实时价格统计
   - 响应式设计

3. **账户管理**
   - 总账户价值显示
   - 盈亏统计
   - 详细视图展开/收起

4. **多标签页系统**
   - 已完成交易列表
   - AI 模型聊天界面（支持实时对话）
   - 当前持仓管理
   - README 文档

5. **AI 模型排行榜**
   - 显示领先的 AI 交易模型
   - 性能指标（收益率、胜率、交易次数）
   - 可展开/收起

6. **终端黑客风格 UI**
   - 黑绿配色方案
   - 等宽字体
   - 自定义滚动条
   - ASCII 艺术边框
   - 发光文字效果
   - CRT 扫描线效果（可选）

7. **连接状态指示器**
   - 加载动画
   - 进度条显示

## 项目结构

```
clone-nof1/
├── app/
│   ├── api/                    # Next.js API Routes
│   │   ├── prices/            # 加密货币价格 API
│   │   └── historical/        # 历史数据 API
│   ├── globals.css            # 全局样式和终端主题
│   ├── layout.tsx             # 根布局
│   └── page.tsx               # 主页
├── components/
│   ├── tabs/                  # 标签页组件
│   │   ├── CompletedTrades.tsx
│   │   ├── ModelChat.tsx
│   │   ├── Positions.tsx
│   │   └── ReadmeTab.tsx
│   ├── AccountValue.tsx       # 账户价值组件
│   ├── ConnectionStatus.tsx   # 连接状态组件
│   ├── CryptoTicker.tsx      # 价格滚动条
│   ├── Leaderboard.tsx       # 排行榜
│   ├── TabSystem.tsx         # 标签页系统
│   └── TradingChart.tsx      # 交易图表
├── lib/
│   └── api/
│       └── crypto.ts          # API 集成层
├── types/
│   └── index.ts               # TypeScript 类型定义
└── package.json
```

## 安装和运行

### 前置要求

- Node.js 18+ 
- npm 或 yarn

### 安装依赖

\`\`\`bash
npm install
\`\`\`

### 启动开发服务器

\`\`\`bash
npm run dev
\`\`\`

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

\`\`\`bash
npm run build
npm start
\`\`\`

## 部署到 Vercel

### 方法 1: 通过 Vercel CLI

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### 方法 2: 通过 GitHub

1. 将代码推送到 GitHub 仓库
2. 在 [Vercel](https://vercel.com) 导入项目
3. 自动部署完成

### 环境变量（可选）

如果使用需要 API Key 的服务，在 Vercel 中设置环境变量：

\`\`\`
NEXT_PUBLIC_API_KEY=your_api_key_here
\`\`\`

## API 说明

### CoinGecko API

本项目使用免费的 CoinGecko API 获取加密货币价格数据。如果 API 请求失败，会自动使用模拟数据。

- 实时价格: `/api/prices`
- 历史数据: `/api/historical?coinId=bitcoin&days=7`

### API 限流

- 免费版 CoinGecko API 有请求限制
- 实现了 30 秒缓存机制避免频繁请求
- 如需更高频率更新，请考虑 CoinGecko Pro API

## 自定义和扩展

### 修改颜色主题

编辑 `app/globals.css` 文件中的 CSS 变量：

\`\`\`css
:root {
  --terminal-green: #00ff00;  /* 主色调 */
  --background: #000000;       /* 背景色 */
}
\`\`\`

### 添加更多加密货币

编辑 `lib/api/crypto.ts` 文件中的 `CRYPTO_IDS` 对象：

\`\`\`typescript
export const CRYPTO_IDS = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  // 添加更多...
} as const;
\`\`\`

### 更改数据刷新频率

在 `components/CryptoTicker.tsx` 中修改：

\`\`\`typescript
const interval = setInterval(fetchPrices, 30000); // 30 秒
\`\`\`

## 性能优化

- ✅ Next.js 自动代码分割
- ✅ API 响应缓存
- ✅ 图片优化（Next.js Image 组件）
- ✅ 懒加载组件
- ✅ 最小化 API 请求

## 浏览器兼容性

- Chrome/Edge (最新版本)
- Firefox (最新版本)
- Safari (最新版本)

## 开发指南

### 添加新标签页

1. 在 `components/tabs/` 创建新组件
2. 在 `components/TabSystem.tsx` 导入并添加到标签列表

### 集成真实交易 API

修改相关组件以调用真实的交易所 API（如 Binance、Coinbase 等）

## 许可证

MIT License - 仅供学习和个人使用

## 免责声明

⚠️ **重要提示**：

- 本项目仅用于学习和演示目的
- 不提供真实的交易功能
- 加密货币交易具有高风险
- 投资前请咨询专业财务顾问

## 贡献

欢迎提交 Pull Request 或 Issue！

## 联系方式

如有问题，请创建 GitHub Issue。

---

**构建时间**: 2025年10月
**版本**: 1.0.0
