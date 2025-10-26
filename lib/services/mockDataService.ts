import type { AIModel, Trade, Position, ValuePoint, AutomatedChat, IDataService } from '@/types';
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
   * 获取自动化聊天记录
   * @param modelId 可选，筛选特定模型的聊天记录
   * @param limit 返回记录数量限制
   */
  async getAutomatedChats(modelId?: string, limit: number = 50): Promise<AutomatedChat[]> {
    await this.delay(150);
    
    // 生成模拟的自动化聊天记录（基于图片中的实际内容）
    const mockChats: AutomatedChat[] = [
      {
        id: '1',
        modelId: 'claude-sonnet-4.5',
        modelName: 'CLAUDE SONNET 4.5',
        icon: '✦',
        content: 'The XRP position is currently profitable due to strong upward momentum, while my BTC, ETH, and SOL trades are holding steady, respecting their technical invalidation conditions. I\'m holding all current positions and waiting for stronger signals before considering any new trades, despite some attractive oversold indicators on BNB.',
        timestamp: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
        expandable: true,
        sections: [
          {
            type: 'USER_PROMPT',
            content: 'What is your current trading status and position analysis?',
            expanded: false
          },
          {
            type: 'CHAIN_OF_THOUGHT',
            content: 'Analyzing current positions: XRP showing strong momentum with technical indicators supporting continued upward movement. BTC, ETH, and SOL positions remain within acceptable risk parameters. BNB showing oversold conditions but waiting for confirmation signals before entry.',
            expanded: false
          },
          {
            type: 'TRADING_DECISIONS',
            content: [
              { symbol: 'XRP', quantity: 3609, action: 'HOLD', confidence: 85 },
              { symbol: 'BTC', quantity: 0.12, action: 'HOLD', confidence: 75 },
              { symbol: 'ETH', quantity: 26.05, action: 'HOLD', confidence: 70 },
              { symbol: 'SOL', quantity: 81.81, action: 'HOLD', confidence: 65 },
              { symbol: 'BNB', quantity: 3.21, action: 'WATCH', confidence: 60 }
            ],
            expanded: false
          }
        ]
      },
      {
        id: '2',
        modelId: 'gpt-5',
        modelName: 'GPT 5',
        icon: '⚙️',
        content: 'Currently, I\'m holding all my positions because the market conditions and MACD indicators haven\'t triggered my exit plan invalidation criteria, though I\'m watching SOL\'s stop loss closely to avoid liquidation. I\'ve managed to turn my BTC and BNB positions profitable, but the overall portfolio is still down significantly.',
        timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
        expandable: true,
        sections: [
          {
            type: 'USER_PROMPT',
            content: 'How are your current positions performing and what are your risk management strategies?',
            expanded: false
          },
          {
            type: 'CHAIN_OF_THOUGHT',
            content: 'Risk assessment: MACD indicators not showing exit signals yet. SOL position requires close monitoring due to proximity to stop-loss. BTC and BNB positions now profitable after recent market movements. Overall portfolio still recovering from earlier losses.',
            expanded: false
          },
          {
            type: 'TRADING_DECISIONS',
            content: [
              { symbol: 'BTC', quantity: 0.12, action: 'HOLD', confidence: 80 },
              { symbol: 'BNB', quantity: 3.21, action: 'HOLD', confidence: 75 },
              { symbol: 'SOL', quantity: 81.81, action: 'MONITOR', confidence: 50 },
              { symbol: 'ETH', quantity: 26.05, action: 'HOLD', confidence: 70 }
            ],
            expanded: false
          }
        ]
      },
      {
        id: '3',
        modelId: 'qwen3-max',
        modelName: 'QWEN3 MAX',
        icon: '⚡',
        content: 'Up 70% with $17k, I\'m holding my 20x BTC long, targeting $112k, but ready to bail if it drops below $105k on a 4hr close. Got $97 cash ready for new plays!',
        timestamp: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
        expandable: true,
        sections: [
          {
            type: 'USER_PROMPT',
            content: 'What is your current performance and BTC position strategy?',
            expanded: false
          },
          {
            type: 'CHAIN_OF_THOUGHT',
            content: 'Performance analysis: 70% gain achieved with $17k portfolio value. BTC 20x leverage position performing well with clear exit strategy at $105k 4hr close. Maintaining $97 cash reserve for new opportunities.',
            expanded: false
          },
          {
            type: 'TRADING_DECISIONS',
            content: [
              { symbol: 'BTC', quantity: 0.12, action: 'HOLD', confidence: 90 },
              { symbol: 'CASH', quantity: 97, action: 'RESERVE', confidence: 100 }
            ],
            expanded: false
          }
        ]
      },
      {
        id: '4',
        modelId: 'deepseek-chat-v3.1',
        modelName: 'DEEPSEEK CHAT V3.1',
        icon: '🐋',
        content: 'My existing positions in ETH, SOL, XRP, BTC, DOGE, and BNB are all holding steady as their invalidation conditions haven\'t been met, keeping my overall return at a healthy 32.38%. I\'m holding onto all my current trades because their prices are far from hitting any stop-loss triggers, and my technical analysis suggests they\'re still on track.',
        timestamp: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
        expandable: true,
        sections: [
          {
            type: 'USER_PROMPT',
            content: 'What is your current portfolio performance and position status?',
            expanded: false
          },
          {
            type: 'CHAIN_OF_THOUGHT',
            content: 'Portfolio analysis: 32.38% overall return with all positions performing well. No invalidation conditions triggered. Technical analysis confirms all positions remain on track with stop-loss levels well below current prices.',
            expanded: false
          },
          {
            type: 'TRADING_DECISIONS',
            content: [
              { symbol: 'ETH', quantity: 26.05, action: 'HOLD', confidence: 85 },
              { symbol: 'SOL', quantity: 81.81, action: 'HOLD', confidence: 80 },
              { symbol: 'XRP', quantity: 3609, action: 'HOLD', confidence: 75 },
              { symbol: 'BTC', quantity: 0.12, action: 'HOLD', confidence: 85 },
              { symbol: 'DOGE', quantity: 27858, action: 'HOLD', confidence: 70 },
              { symbol: 'BNB', quantity: 3.21, action: 'HOLD', confidence: 75 }
            ],
            expanded: false
          }
        ]
      },
      {
        id: '5',
        modelId: 'gemini-2.5-pro',
        modelName: 'GEMINI 2.5 PRO',
        icon: '💎',
        content: 'I\'m holding all my positions (ETH, SOL, XRP, BTC, DOGE, BNB) because their trading signals are still valid, and I can\'t add new trades without risking over-leveraging. The ETH trade is currently a bit underwater but showing signs of recovery, while SOL, XRP, BTC, and BNB are all in the green, and my DOGE short is also performing as expected.',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        expandable: true,
        sections: [
          {
            type: 'USER_PROMPT',
            content: 'What is your current position status and risk management approach?',
            expanded: false
          },
          {
            type: 'CHAIN_OF_THOUGHT',
            content: 'Position analysis: All trading signals remain valid. ETH position slightly underwater but showing recovery signs. SOL, XRP, BTC, BNB all profitable. DOGE short performing as expected. Risk management prevents over-leveraging by avoiding new positions.',
            expanded: false
          },
          {
            type: 'TRADING_DECISIONS',
            content: [
              { symbol: 'ETH', quantity: 26.05, action: 'HOLD', confidence: 65 },
              { symbol: 'SOL', quantity: 81.81, action: 'HOLD', confidence: 80 },
              { symbol: 'XRP', quantity: 3609, action: 'HOLD', confidence: 75 },
              { symbol: 'BTC', quantity: 0.12, action: 'HOLD', confidence: 85 },
              { symbol: 'DOGE', quantity: 27858, action: 'HOLD', confidence: 70 },
              { symbol: 'BNB', quantity: 3.21, action: 'HOLD', confidence: 80 }
            ],
            expanded: false
          }
        ]
      }
    ];
    
    let filtered = [...mockChats];
    
    // 如果指定了模型，则过滤
    if (modelId && modelId !== 'all') {
      filtered = filtered.filter(chat => chat.modelId === modelId);
    }
    
    // 按时间倒序排列
    filtered.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    // 限制数量
    return filtered.slice(0, limit);
  }

  /**
   * 模拟网络延迟
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

