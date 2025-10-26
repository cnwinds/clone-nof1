import type { IDataService } from '@/types';
import { MockDataService } from './mockDataService';
import { APIDataService } from './apiDataService';

/**
 * 统一的数据服务接口
 * 
 * 使用环境变量控制数据源：
 * - NEXT_PUBLIC_USE_MOCK=true (默认) → 使用 Mock 数据
 * - NEXT_PUBLIC_USE_MOCK=false → 使用真实 API
 * 
 * 切换方式：
 * 1. 开发环境（Mock）：
 *    NEXT_PUBLIC_USE_MOCK=true
 * 
 * 2. 生产环境（API）：
 *    NEXT_PUBLIC_USE_MOCK=false
 *    NEXT_PUBLIC_API_BASE=https://api.nof1.ai
 */

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK !== 'false';

// 根据环境变量选择数据服务实现
export const dataService: IDataService = USE_MOCK_DATA
  ? new MockDataService()
  : new APIDataService();

// 导出类型，方便外部使用
export type { IDataService };

// 导出提示信息
export const getDataSourceInfo = () => {
  return {
    useMock: USE_MOCK_DATA,
    source: USE_MOCK_DATA ? 'Mock Data' : 'API',
    apiBase: USE_MOCK_DATA ? 'N/A' : process.env.NEXT_PUBLIC_API_BASE,
  };
};

