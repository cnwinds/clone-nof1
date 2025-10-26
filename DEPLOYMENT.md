# 部署指南

本文档说明如何将 NOF1.AI 克隆项目部署到 Vercel。

## 快速部署到 Vercel

### 方法 1: 通过 Vercel 网站（推荐）

1. **准备 Git 仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   ```

2. **推送到 GitHub**
   - 在 GitHub 创建新仓库
   - 推送代码：
     ```bash
     git remote add origin https://github.com/your-username/clone-nof1.git
     git push -u origin main
     ```

3. **在 Vercel 部署**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 "Import Project"
   - 选择你的 GitHub 仓库
   - 点击 "Deploy"

### 方法 2: 使用 Vercel CLI

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   vercel
   ```

4. **部署到生产环境**
   ```bash
   vercel --prod
   ```

## 环境变量配置

虽然当前项目使用免费的 CoinGecko API（无需 API Key），但如果你需要配置环境变量：

### 在 Vercel Dashboard 中设置

1. 进入项目设置
2. 点击 "Environment Variables"
3. 添加变量：
   - Name: `NEXT_PUBLIC_COINGECKO_API_KEY`
   - Value: `your_api_key_here`
   - Environment: Production / Preview / Development

### 通过 CLI 设置

```bash
vercel env add NEXT_PUBLIC_COINGECKO_API_KEY
```

## 自定义域名

1. 在 Vercel 项目设置中
2. 进入 "Domains"
3. 添加你的域名
4. 按照指示配置 DNS

## 性能优化建议

### 1. 启用边缘函数

在 `vercel.json` 中：

```json
{
  "functions": {
    "app/api/**/*.ts": {
      "runtime": "edge"
    }
  }
}
```

### 2. 配置缓存策略

API 路由已配置 30 秒缓存：

```typescript
// app/api/prices/route.ts
const CACHE_DURATION = 30000; // 30 秒
```

### 3. 图片优化

使用 Next.js Image 组件（已实现）：

```tsx
import Image from 'next/image';
```

## 监控和分析

### Vercel Analytics

1. 在项目设置中启用 Analytics
2. 查看页面性能指标

### 日志查看

```bash
vercel logs
```

## 常见问题

### 构建失败

**问题**: 构建时出现依赖错误

**解决方案**:
```bash
# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json
# 重新安装
npm install
# 本地测试构建
npm run build
```

### API 限流

**问题**: CoinGecko API 达到限制

**解决方案**:
1. 增加缓存时间（在 `app/api/prices/route.ts` 中）
2. 考虑升级到 CoinGecko Pro
3. 使用备用 API

### 图表不显示

**问题**: Chart.js 组件渲染问题

**解决方案**:
1. 确保 'use client' 指令在组件顶部
2. 检查浏览器控制台错误
3. 验证 Chart.js 依赖版本

## 生产环境检查清单

- [ ] 代码已提交到 Git
- [ ] 本地构建成功（`npm run build`）
- [ ] 所有组件正常工作
- [ ] API 路由测试通过
- [ ] 响应式设计在各设备正常
- [ ] 环境变量已配置（如需要）
- [ ] 自定义域名已设置（如需要）
- [ ] SSL 证书已配置（Vercel 自动）

## 持续部署

Vercel 自动启用持续部署：

- **主分支推送** → 自动部署到生产环境
- **其他分支推送** → 自动创建预览部署
- **Pull Request** → 自动创建预览链接

## 回滚部署

### 通过 Dashboard

1. 进入项目的 Deployments 页面
2. 找到之前的成功部署
3. 点击 "Promote to Production"

### 通过 CLI

```bash
vercel rollback
```

## 成本估算

**Vercel Free Tier 包含**:
- 无限部署
- 100 GB 带宽/月
- 无限请求
- 自动 SSL
- 全球 CDN

对于本项目，Free Tier 足够个人使用和演示。

## 支持和帮助

- [Vercel 文档](https://vercel.com/docs)
- [Next.js 文档](https://nextjs.org/docs)
- [GitHub Issues](https://github.com/your-repo/issues)

---

**最后更新**: 2025年10月

