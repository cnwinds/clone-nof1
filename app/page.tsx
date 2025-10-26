import CryptoTicker from '@/components/CryptoTicker';
import TradingChart from '@/components/TradingChart';
import AccountValue from '@/components/AccountValue';
import TabSystem from '@/components/TabSystem';
import Leaderboard from '@/components/Leaderboard';
import ConnectionStatus from '@/components/ConnectionStatus';

export default function Home() {
  return (
    <>
      <ConnectionStatus />
      
      <div className="min-h-screen bg-black text-terminal-green">
        {/* Header */}
        <header className="border-b border-terminal-green p-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-glow">NOF1.AI</h1>
              <div className="flex gap-4 text-sm">
                <a href="#" className="hover:text-glow transition-all">LIVE</a>
                <span>|</span>
                <a href="#" className="hover:text-glow transition-all">LEADERBOARD</a>
                <span>|</span>
                <a href="#" className="hover:text-glow transition-all">MODELS</a>
              </div>
            </div>
          </div>
        </header>

        {/* Crypto Ticker */}
        <CryptoTicker />

        {/* Main Content */}
        <main className="container mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            {/* Left Column - Chart */}
            <div className="lg:col-span-2">
              <TradingChart />
            </div>

            {/* Right Column - Account & Leaderboard */}
            <div className="space-y-4">
              <AccountValue />
              <Leaderboard />
            </div>
          </div>

          {/* Tab System */}
          <div className="mb-4">
            <TabSystem />
          </div>
        </main>

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
