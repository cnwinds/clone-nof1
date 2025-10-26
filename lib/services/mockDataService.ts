import type { AIModel, Trade, Position, ValuePoint, IDataService } from '@/types';
import { mockModels, mockTrades, mockPositions } from '@/data/mockModels';

/**
 * Mock 数据服务实现
 * 用于开发和演示，不依赖后端 API
 */
export class MockDataService implements IDataService {
  /**
   * 获取所有模型
   */
  async getModels(): Promise<AIModel[]> {
    // 模拟网络延迟
    await this.delay(100);
    return [...mockModels];
  }

  /**
   * 根据 ID 获取单个模型
   */
  async getModelById(id: string): Promise<AIModel | null> {
    await this.delay(100);
    const model = mockModels.find(m => m.id === id);
    return model ? { ...model } : null;
  }

  /**
   * 获取交易记录
   * @param modelId 可选，筛选特定模型的交易
   * @param limit 返回记录数量限制
   */
  async getTrades(modelId?: string, limit: number = 100): Promise<Trade[]> {
    await this.delay(150);
    
    let filtered = [...mockTrades];
    
    // 如果指定了模型，则过滤
    if (modelId && modelId !== 'all') {
      filtered = filtered.filter(t => t.modelId === modelId);
    }
    
    // 按时间倒序排列
    filtered.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    // 限制数量
    return filtered.slice(0, limit);
  }

  /**
   * 获取持仓列表
   * @param modelId 可选，筛选特定模型的持仓
   */
  async getPositions(modelId?: string): Promise<Position[]> {
    await this.delay(100);
    
    let filtered = [...mockPositions];
    
    if (modelId && modelId !== 'all') {
      filtered = filtered.filter(p => p.modelId === modelId);
    }
    
    return filtered;
  }

  /**
   * 获取价值历史曲线
   * @param modelId 模型 ID
   * @param days 天数
   */
  async getValueHistory(modelId: string, days: number = 7): Promise<ValuePoint[]> {
    await this.delay(100);
    
    const model = mockModels.find(m => m.id === modelId);
    if (!model) {
      return [];
    }
    
    // 根据天数过滤数据点
    const now = Date.now();
    const cutoff = now - days * 24 * 60 * 60 * 1000;
    
    return model.valueHistory.filter(point => point.timestamp >= cutoff);
  }

  /**
   * 模拟网络延迟
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

