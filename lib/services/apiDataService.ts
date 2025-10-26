import type { AIModel, Trade, Position, ValuePoint, AutomatedChat, Season, IDataService } from '@/types';
import { ENV_CONFIG } from '@/lib/config/env';

/**
 * 真实 API 数据服务实现
 * 未来连接后台 API 使用
 */
export class APIDataService implements IDataService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = ENV_CONFIG.API_BASE;
  }

  /**
   * 获取所有模型
   */
  async getModels(): Promise<AIModel[]> {
    try {
      const response = await fetch(`${this.baseUrl}/models`);
      
      if (!response.ok) {
        console.error(`Models API failed with status ${response.status}`);
        throw new Error(`Models API failed with status ${response.status}`);
      }
      const responseData = await response.json();
      
      // 处理包装的响应格式
      const rawModels = responseData.data || responseData;
      
      if (!Array.isArray(rawModels)) {
        console.warn('Models API returned non-array data:', rawModels);
        return [];
      }
      
      // 转换后端格式到前端格式（按照API文档规范）
      const models: AIModel[] = rawModels.map((model: any) => ({
        id: model.id,
        name: model.name,
        displayName: model.displayName,
        initialValue: model.initialValue || 10000,
        currentValue: model.currentValue || 10000,
        performance: model.performance || 0,
        color: model.color,
        icon: model.icon,
        status: model.status === 'active' ? 'active' : 'inactive',
        description: model.description,
        rank: model.rank,
        winRate: model.winRate,
        totalTrades: model.totalTrades,
        valueHistory: model.valueHistory || [],
      }));
      
      return models;
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
        console.warn(`Model API failed with status ${response.status}`);
        return null;
      }
      const responseData = await response.json();
      
      // 处理包装的响应格式
      const data = responseData.data || responseData;
      
      if (!data) {
        return null;
      }
      
      // 转换后端格式到前端格式
      return {
        id: data.id,
        name: data.name,
        displayName: data.display_name || data.displayName,
        initialValue: data.initialValue || 10000,
        currentValue: data.currentValue || 10000,
        performance: data.performance || 0,
        color: data.color,
        icon: data.icon,
        status: data.status === 'active' ? 'active' : 'inactive',
        description: data.description,
        rank: data.rank,
        winRate: data.winRate,
        totalTrades: data.totalTrades,
        valueHistory: data.valueHistory || [],
      };
    } catch (error) {
      console.error(`Failed to fetch model ${id}:`, error);
      return null;
    }
  }

  /**
   * 获取交易记录
   */
  async getTrades(seasonId?: string, modelId?: string, limit: number = 100): Promise<Trade[]> {
    try {
      const params = new URLSearchParams();
      if (seasonId) {
        params.append('seasonId', seasonId);
      }
      if (modelId && modelId !== 'all') {
        params.append('modelId', modelId);
      }
      params.append('limit', limit.toString());

      const response = await fetch(`${this.baseUrl}/trades?${params}`);
      if (!response.ok) {
        console.error(`Trades API failed with status ${response.status}`);
        throw new Error(`Trades API failed with status ${response.status}`);
      }
      const responseData = await response.json();
      
      // 处理包装的响应格式
      const data = responseData.data || responseData;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Failed to fetch trades:', error);
      throw error;
    }
  }

  /**
   * 获取持仓列表
   */
  async getPositions(seasonId?: string, modelId?: string): Promise<Position[]> {
    try {
      const params = new URLSearchParams();
      if (seasonId) {
        params.append('seasonId', seasonId);
      }
      if (modelId && modelId !== 'all') {
        params.append('modelId', modelId);
      }

      const response = await fetch(`${this.baseUrl}/positions?${params}`);
      if (!response.ok) {
        console.error(`Positions API failed with status ${response.status}`);
        throw new Error(`Positions API failed with status ${response.status}`);
      }
      const responseData = await response.json();
      
      // 处理包装的响应格式
      const data = responseData.data || responseData;
      return Array.isArray(data) ? data : [];
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
        console.error(`Value history API failed with status ${response.status}`);
        throw new Error(`Value history API failed with status ${response.status}`);
      }
      const responseData = await response.json();
      
      // 处理包装的响应格式
      const data = responseData.data || responseData;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error(`Failed to fetch value history for ${modelId}:`, error);
      throw error;
    }
  }

  /**
   * 获取自动化聊天记录
   */
  async getAutomatedChats(seasonId?: string, modelId?: string, limit: number = 50): Promise<AutomatedChat[]> {
    try {
      const params = new URLSearchParams();
      if (seasonId) {
        params.append('seasonId', seasonId);
      }
      if (modelId && modelId !== 'all') {
        params.append('modelId', modelId);
      }
      params.append('limit', limit.toString());

      const response = await fetch(`${this.baseUrl}/automated-chats?${params}`);
      if (!response.ok) {
        console.error(`Automated chats API failed with status ${response.status}`);
        throw new Error(`Automated chats API failed with status ${response.status}`);
      }
      const responseData = await response.json();
      
      // 处理包装的响应格式（按照API文档规范）
      const data = responseData.data || responseData;
      
      // 调试信息
      console.log('AutomatedChats API Response:', {
        rawResponse: responseData,
        extractedData: data,
        isArray: Array.isArray(data),
        length: Array.isArray(data) ? data.length : 0,
        firstItem: Array.isArray(data) && data.length > 0 ? data[0] : null
      });
      
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Failed to fetch automated chats:', error);
      throw error;
    }
  }

  /**
   * 获取所有赛季
   */
  async getSeasons(status?: string): Promise<Season[]> {
    try {
      const params = new URLSearchParams();
      if (status) {
        params.append('status', status);
      }

      const response = await fetch(`${this.baseUrl}/seasons?${params}`);
      if (!response.ok) {
        console.error(`Seasons API failed with status ${response.status}`);
        throw new Error(`Seasons API failed with status ${response.status}`);
      }
      const responseData = await response.json();
      
      // 处理包装的响应格式
      const data = responseData.data || responseData;
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Failed to fetch seasons:', error);
      throw error;
    }
  }

  /**
   * 获取当前活跃赛季
   */
  async getActiveSeason(): Promise<Season | null> {
    try {
      const response = await fetch(`${this.baseUrl}/seasons/active`);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        console.error(`Active season API failed with status ${response.status}`);
        throw new Error(`Active season API failed with status ${response.status}`);
      }
      const responseData = await response.json();
      
      // 处理包装的响应格式
      const data = responseData.data || responseData;
      return data || null;
    } catch (error) {
      console.error('Failed to fetch active season:', error);
      throw error;
    }
  }

  /**
   * 根据ID获取赛季详情
   */
  async getSeasonById(seasonId: string): Promise<Season | null> {
    try {
      const response = await fetch(`${this.baseUrl}/seasons/${seasonId}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        console.error(`Season API failed with status ${response.status}`);
        throw new Error(`Season API failed with status ${response.status}`);
      }
      const responseData = await response.json();
      
      // 处理包装的响应格式
      const data = responseData.data || responseData;
      return data || null;
    } catch (error) {
      console.error(`Failed to fetch season ${seasonId}:`, error);
      throw error;
    }
  }
}

