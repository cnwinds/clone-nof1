/**
 * 统一的环境变量配置
 * 确保所有地方都使用相同的API配置
 */

// 强制设置环境变量（如果读取失败）
if (!process.env.NEXT_PUBLIC_USE_MOCK) {
  process.env.NEXT_PUBLIC_USE_MOCK = 'true'; // 默认使用Mock数据
}
if (!process.env.NEXT_PUBLIC_API_BASE) {
  process.env.NEXT_PUBLIC_API_BASE = 'http://localhost:3001/api';
}

// 统一的环境变量获取
export const ENV_CONFIG = {
  USE_MOCK_DATA: process.env.NEXT_PUBLIC_USE_MOCK === 'true',
  API_BASE: process.env.NEXT_PUBLIC_API_BASE,
} as const;
