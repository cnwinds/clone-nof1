'use client';

export default function ReadmeTab() {
  return (
    <div className="text-terminal-green space-y-4 font-mono">
      <div className="text-sm">
        <pre className="text-terminal-green">
{`┌─────────────────────────────────────────────────────────────────────┐
│                        NOF1.AI - README.TXT                         │
└─────────────────────────────────────────────────────────────────────┘`}
        </pre>
      </div>

      <div className="space-y-3 text-sm leading-relaxed">
        <div>
          <div className="text-terminal-green font-bold mb-2">## WELCOME TO NOF1.AI</div>
          <div className="pl-4 text-terminal-dark-green">
            An advanced AI-powered cryptocurrency trading platform that leverages
            machine learning models to optimize trading strategies in real-time.
          </div>
        </div>

        <div>
          <div className="text-terminal-green font-bold mb-2">## FEATURES</div>
          <div className="pl-4 space-y-1 text-terminal-dark-green">
            <div>&gt; Real-time cryptocurrency price monitoring</div>
            <div>&gt; AI-driven trading models with proven track records</div>
            <div>&gt; Advanced charting and technical analysis</div>
            <div>&gt; Automated trade execution</div>
            <div>&gt; Portfolio management and tracking</div>
            <div>&gt; AI model chat interface for insights</div>
          </div>
        </div>

        <div>
          <div className="text-terminal-green font-bold mb-2">## SUPPORTED ASSETS</div>
          <div className="pl-4 grid grid-cols-2 gap-2 text-terminal-dark-green">
            <div>[✓] Bitcoin (BTC)</div>
            <div>[✓] Ethereum (ETH)</div>
            <div>[✓] Solana (SOL)</div>
            <div>[✓] Binance Coin (BNB)</div>
            <div>[✓] Dogecoin (DOGE)</div>
            <div>[✓] Ripple (XRP)</div>
          </div>
        </div>

        <div>
          <div className="text-terminal-green font-bold mb-2">## AI MODELS</div>
          <div className="pl-4 space-y-1 text-terminal-dark-green">
            <div>1. ALPHA_TRADER_V2 - Advanced momentum trading</div>
            <div>2. QUANTUM_BOT - Quantum-inspired algorithms</div>
            <div>3. DEEP_LEARNING_TRADER - Neural network predictions</div>
            <div>4. NEURAL_NET_PRO - Pattern recognition specialist</div>
            <div>5. ML_PREDICTOR_X - Machine learning forecaster</div>
          </div>
        </div>

        <div>
          <div className="text-terminal-green font-bold mb-2">## GETTING STARTED</div>
          <div className="pl-4 space-y-1 text-terminal-dark-green">
            <div>1. Monitor live price feeds in the ticker above</div>
            <div>2. Review AI model performance in the leaderboard</div>
            <div>3. Check your positions and completed trades</div>
            <div>4. Chat with AI models for trading insights</div>
            <div>5. Analyze charts for market trends</div>
          </div>
        </div>

        <div>
          <div className="text-terminal-green font-bold mb-2">## RISK WARNING</div>
          <div className="pl-4 text-red-500">
            ⚠ Cryptocurrency trading carries inherent risks. Past performance
            does not guarantee future results. Only invest what you can afford
            to lose. AI models are tools to assist decision-making, not
            financial advice.
          </div>
        </div>

        <div className="border-t border-terminal-dark-green pt-3 mt-4">
          <div className="text-terminal-dark-green text-xs">
            Version 1.0.0 | Last Updated: October 2025
          </div>
          <div className="text-terminal-dark-green text-xs">
            © 2025 NOF1.AI - All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
}

