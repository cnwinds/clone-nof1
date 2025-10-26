'use client';

import { useEffect } from 'react';
import EnhancedTicker from '@/components/EnhancedTicker';
import MultiModelChart from '@/components/MultiModelChart';
import ModelSelector from '@/components/ModelSelector';
import TabSystem from '@/components/TabSystem';
import ConnectionStatus from '@/components/ConnectionStatus';
import { useModelsStore } from '@/lib/store/useModelsStore';

export default function Home() {
  const { loadModels, loadTrades, loadPositions } = useModelsStore();

  useEffect(() => {
    // 初始化加载数据
    loadModels();
    loadTrades();
    loadPositions();
  }, [loadModels, loadTrades, loadPositions]);

  return (
    <>
      <ConnectionStatus />
      
      <div className="min-h-screen bg-black text-terminal-green">
        {/* Header */}
        <header className="border-b border-terminal-green p-4">
          <div className="container mx-auto">
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
        <main className="container mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            {/* Left Column - Multi-Model Chart */}
            <div className="lg:col-span-2">
              <MultiModelChart />
            </div>

            {/* Right Column - Tab System */}
            <div>
              <TabSystem />
            </div>
          </div>
        </main>

        {/* Bottom Model Selector */}
        <ModelSelector />

        {/* Footer */}
        <footer className="border-t border-terminal-green p-4 mt-8">
          <div className="container mx-auto text-center text-terminal-dark-green text-sm">
            <div className="mb-2">
              <pre className="inline-block text-xs">
{`┌─────────────────────────────────────┐
│   ALPHA ARENA - TRADING PLATFORM    │
└─────────────────────────────────────┘`}
              </pre>
            </div>
            <div>© 2025 NOF1.AI | AI-Powered Cryptocurrency Trading</div>
          </div>
        </footer>
      </div>
    </>
  );
}
