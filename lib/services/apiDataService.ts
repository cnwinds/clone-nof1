import type { AIModel, Trade, Position, ValuePoint, IDataService } from '@/types';

/**
 * 真实 API 数据服务实现
 * 未来连接后台 API 使用
 */
export class APIDataService implements IDataService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001/api';
  }

  /**
   * 获取所有模型
   */
  async getModels(): Promise<AIModel[]> {
    try {
      const response = await fetch(`${this.baseUrl}/models`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch models:', error);
      throw error;
    }
  }

  /**
   * 根据 ID 获取单个模型
   */
  async getModelById(id: string): Promise<AIModel | null> {
    try {
      const response = await fetch(`${this.baseUrl}/models/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch model ${id}:`, error);
      throw error;
    }
  }

  /**
   * 获取交易记录
   */
  async getTrades(modelId?: string, limit: number = 100): Promise<Trade[]> {
    try {
      const params = new URLSearchParams();
      if (modelId && modelId !== 'all') {
        params.append('modelId', modelId);
      }
      params.append('limit', limit.toString());

      const response = await fetch(`${this.baseUrl}/trades?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch trades:', error);
      throw error;
    }
  }

  /**
   * 获取持仓列表
   */
  async getPositions(modelId?: string): Promise<Position[]> {
    try {
      const params = new URLSearchParams();
      if (modelId && modelId !== 'all') {
        params.append('modelId', modelId);
      }

      const response = await fetch(`${this.baseUrl}/positions?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch positions:', error);
      throw error;
    }
  }

  /**
   * 获取价值历史曲线
   */
  async getValueHistory(modelId: string, days: number = 7): Promise<ValuePoint[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/value-history/${modelId}?days=${days}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch value history for ${modelId}:`, error);
      throw error;
    }
  }
}

