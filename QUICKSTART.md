# 快速开始指南

5 分钟内启动 NOF1.AI 项目！

## 前置要求

确保你已安装：
- Node.js 18+ ([下载](https://nodejs.org/))
- Git ([下载](https://git-scm.com/))

## 步骤 1: 克隆或下载项目

如果从 GitHub 克隆：
```bash
git clone https://github.com/your-username/clone-nof1.git
cd clone-nof1
```

## 步骤 2: 安装依赖

```bash
npm install
```

## 步骤 3: 启动开发服务器

```bash
npm run dev
```

## 步骤 4: 在浏览器中查看

打开 [http://localhost:3000](http://localhost:3000)

就这么简单！🎉

## 可用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（端口 3000） |
| `npm run build` | 构建生产版本 |
| `npm start` | 运行生产服务器 |
| `npm run lint` | 运行代码检查 |

## 功能一览

### 🚀 主要功能

- ✅ **实时价格滚动** - 6 种主流加密货币实时价格
- ✅ **交易图表** - 交互式 Chart.js 图表，支持多时间范围
- ✅ **AI 模型聊天** - 与 AI 交易模型实时对话
- ✅ **持仓管理** - 查看当前持仓和盈亏
- ✅ **交易历史** - 已完成的交易记录
- ✅ **排行榜** - AI 模型性能排名

### 🎨 UI 特色

- 终端黑客风格（黑绿配色）
- 等宽字体（Courier New）
- 流畅的动画效果
- 完全响应式设计

## 项目结构速览

```
clone-nof1/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页
├── components/            # React 组件
│   ├── tabs/             # 标签页组件
│   ├── CryptoTicker.tsx  # 价格滚动条
│   ├── TradingChart.tsx  # 交易图表
│   └── ...               # 其他组件
├── lib/                  # 工具和 API
└── types/                # TypeScript 类型
```

## 自定义配置

### 修改颜色

编辑 `app/globals.css`:

```css
:root {
  --terminal-green: #00ff00;  /* 改成你喜欢的颜色 */
}
```

### 添加更多加密货币

编辑 `lib/api/crypto.ts`:

```typescript
export const CRYPTO_IDS = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  ADA: 'cardano',  // 添加新币种
  // ...
};
```

### 调整刷新频率

编辑 `components/CryptoTicker.tsx`:

```typescript
// 修改刷新间隔（毫秒）
const interval = setInterval(fetchPrices, 30000); // 30 秒
```

## 常见问题

### Q: 价格数据不更新？

**A**: 检查网络连接，CoinGecko API 可能暂时不可用。项目会自动使用模拟数据。

### Q: 图表不显示？

**A**: 确保已安装所有依赖：
```bash
npm install
```

### Q: 如何部署到生产环境？

**A**: 查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 获取详细部署指南。

## 下一步

1. **探索代码** - 查看各个组件了解实现细节
2. **自定义样式** - 修改颜色、字体等
3. **添加功能** - 扩展项目添加新功能
4. **部署上线** - 部署到 Vercel 与他人分享

## 技术栈

- **Next.js 14** - React 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Chart.js** - 图表库
- **CoinGecko API** - 加密货币数据

## 需要帮助？

- 📖 阅读完整的 [README.md](./README.md)
- 🚀 查看 [DEPLOYMENT.md](./DEPLOYMENT.md)
- 💬 提交 GitHub Issue

---

**祝你编码愉快！** 🚀

