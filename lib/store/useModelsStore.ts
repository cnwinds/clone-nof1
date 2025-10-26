import { create } from 'zustand';
import type { AIModel, Trade, Position, AutomatedChat } from '@/types';
import { dataService } from '@/lib/services/dataService';

interface ModelsState {
  // 数据
  models: AIModel[];
  trades: Trade[];
  positions: Position[];
  automatedChats: AutomatedChat[];
  
  // UI 状态
  selectedModel: string;      // 'all' 或模型 ID
  timeRange: 'ALL' | '72H';   // 时间范围
  displayMode: '$' | '%';     // 显示模式：美元或百分比
  filterModel: string;        // 交易列表过滤
  chatFilterModel: string;    // 聊天过滤
  positionsFilterModel: string; // 持仓过滤
  
  // 加载状态
  loading: boolean;
  error: string | null;
  
  // Actions
  setSelectedModel: (id: string) => void;
  setTimeRange: (range: 'ALL' | '72H') => void;
  setDisplayMode: (mode: '$' | '%') => void;
  setFilterModel: (id: string) => void;
  setChatFilterModel: (id: string) => void;
  setPositionsFilterModel: (id: string) => void;
  
  // 数据加载
  loadModels: () => Promise<void>;
  loadTrades: (modelId?: string) => Promise<void>;
  loadPositions: (modelId?: string) => Promise<void>;
  loadAutomatedChats: (modelId?: string) => Promise<void>;
  
  // 辅助方法
  getHighestModel: () => AIModel | null;
  getLowestModel: () => AIModel | null;
  getSelectedModelData: () => AIModel | null;
}

export const useModelsStore = create<ModelsState>((set, get) => ({
  // 初始状态
  models: [],
  trades: [],
  positions: [],
  automatedChats: [],
  selectedModel: 'all',
  timeRange: 'ALL',
  displayMode: '$',
  filterModel: 'all',
  chatFilterModel: 'all',
  positionsFilterModel: 'all',
  loading: false,
  error: null,

  // 设置选中的模型
  setSelectedModel: (id: string) => {
    set({ selectedModel: id });
  },

  // 设置时间范围
  setTimeRange: (range: 'ALL' | '72H') => {
    set({ timeRange: range });
  },

  // 设置显示模式
  setDisplayMode: (mode: '$' | '%') => {
    set({ displayMode: mode });
  },

  // 设置交易过滤
  setFilterModel: (id: string) => {
    set({ filterModel: id });
    // 重新加载交易数据
    get().loadTrades(id === 'all' ? undefined : id);
  },

  // 设置聊天过滤
  setChatFilterModel: (id: string) => {
    set({ chatFilterModel: id });
  },

  // 设置持仓过滤
  setPositionsFilterModel: (id: string) => {
    set({ positionsFilterModel: id });
  },

  // 加载模型数据
  loadModels: async () => {
    set({ loading: true, error: null });
    try {
      const models = await dataService.getModels();
      set({ models, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load models',
        loading: false 
      });
    }
  },

  // 加载交易记录
  loadTrades: async (modelId?: string) => {
    try {
      const trades = await dataService.getTrades(modelId, 100);
      set({ trades });
    } catch (error) {
      console.error('Failed to load trades:', error);
    }
  },

  // 加载持仓
  loadPositions: async (modelId?: string) => {
    try {
      const positions = await dataService.getPositions(modelId);
      set({ positions });
    } catch (error) {
      console.error('Failed to load positions:', error);
    }
  },

  // 加载自动化聊天记录
  loadAutomatedChats: async (modelId?: string) => {
    try {
      const automatedChats = await dataService.getAutomatedChats(modelId, 50);
      set({ automatedChats });
    } catch (error) {
      console.error('Failed to load automated chats:', error);
    }
  },

  // 获取表现最好的模型
  getHighestModel: () => {
    const { models } = get();
    if (models.length === 0) return null;
    
    return models.reduce((highest, current) => 
      current.performance > highest.performance ? current : highest
    );
  },

  // 获取表现最差的模型
  getLowestModel: () => {
    const { models } = get();
    if (models.length === 0) return null;
    
    return models.reduce((lowest, current) => 
      current.performance < lowest.performance ? current : lowest
    );
  },

  // 获取当前选中的模型数据
  getSelectedModelData: () => {
    const { models, selectedModel } = get();
    if (selectedModel === 'all') return null;
    
    return models.find(m => m.id === selectedModel) || null;
  },
}));

