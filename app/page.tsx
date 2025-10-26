'use client';

import { useEffect } from 'react';
import EnhancedTicker from '@/components/EnhancedTicker';
import MultiModelChart from '@/components/MultiModelChart';
import ModelSelector from '@/components/ModelSelector';
import TabSystem from '@/components/TabSystem';
import ConnectionStatus from '@/components/ConnectionStatus';
import { useModelsStore } from '@/lib/store/useModelsStore';
import DataSourceDebug from '@/components/DataSourceDebug';

export default function Home() {
  const { loadModels, loadTrades, loadPositions, loadAutomatedChats } = useModelsStore();

  useEffect(() => {
    // 初始化加载数据
    loadModels();
    loadTrades();
    loadPositions();
    loadAutomatedChats();
  }, [loadModels, loadTrades, loadPositions, loadAutomatedChats]);

  return (
    <>
      <ConnectionStatus />
      <DataSourceDebug />
      
      <div className="min-h-screen bg-black text-terminal-green">
        {/* Header */}
        <header className="border-b border-terminal-green p-4">
          <div className="w-full px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-glow">Alpha</h1>
                <h2 className="text-xl text-terminal-dark-green">Arena</h2>
                <span className="text-xs text-terminal-dark-green">by Nof1</span>
              </div>
              <div className="flex gap-4 text-sm">
                <a href="/" className="hover:text-glow transition-all font-bold">LIVE</a>
                <span>|</span>
                <a href="#" className="hover:text-glow transition-all">LEADERBOARD</a>
                <span>|</span>
                <a href="#" className="hover:text-glow transition-all">MODELS</a>
              </div>
              <div className="flex gap-3 text-xs">
                <a href="#" className="hover:text-glow transition-all">JOIN THE PLATFORM WAITLIST ↗</a>
                <a href="#" className="hover:text-glow transition-all">ABOUT NOF1 ↗</a>
              </div>
            </div>
          </div>
        </header>

        {/* Enhanced Ticker with Model Stats */}
        <EnhancedTicker />

        {/* Main Content */}
        <main className="w-full p-4">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 mb-4">
            {/* Left Column - Multi-Model Chart */}
            <div className="xl:col-span-3 h-[600px] xl:h-[700px]">
              <MultiModelChart />
            </div>

            {/* Right Column - Tab System */}
            <div className="xl:col-span-1 h-[600px] xl:h-[700px]">
              <TabSystem />
            </div>
          </div>
        </main>

        {/* Bottom Model Selector */}
        <ModelSelector />

        {/* Footer */}
        <footer className="border-t border-terminal-green p-4 mt-8">
          <div className="w-full px-4 text-center text-terminal-dark-green text-sm">
            <div>© 2025 NOF1.AI | AI-Powered Cryptocurrency Trading</div>
          </div>
        </footer>
      </div>
    </>
  );
}
