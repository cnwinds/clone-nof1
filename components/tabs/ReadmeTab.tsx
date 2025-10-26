'use client';

export default function ReadmeTab() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="text-terminal-green space-y-3 font-mono">
          <div className="text-xs">
            <pre className="text-terminal-green">
{`┌───────────────────────────────────────────────────────┐
│                   NOF1.AI - README                    │
└───────────────────────────────────────────────────────┘`}
            </pre>
          </div>

          <div className="space-y-2 text-xs leading-relaxed">
            <div>
              <div className="text-terminal-green font-bold mb-1">## WELCOME TO NOF1.AI</div>
              <div className="pl-3 text-terminal-dark-green">
                Advanced AI-powered cryptocurrency trading platform with real-time
                machine learning optimization for trading strategies.
              </div>
            </div>

            <div>
              <div className="text-terminal-green font-bold mb-1">## FEATURES</div>
              <div className="pl-3 space-y-0.5 text-terminal-dark-green">
                <div>&gt; Real-time crypto price monitoring</div>
                <div>&gt; AI-driven trading models with proven records</div>
                <div>&gt; Advanced charting and technical analysis</div>
                <div>&gt; Automated trade execution</div>
                <div>&gt; Portfolio management and tracking</div>
                <div>&gt; AI model chat interface for insights</div>
              </div>
            </div>

            <div>
              <div className="text-terminal-green font-bold mb-1">## SUPPORTED ASSETS</div>
              <div className="pl-3 grid grid-cols-3 gap-1 text-terminal-dark-green">
                <div>[✓] Bitcoin (BTC)</div>
                <div>[✓] Ethereum (ETH)</div>
                <div>[✓] Solana (SOL)</div>
                <div>[✓] Binance Coin (BNB)</div>
                <div>[✓] Dogecoin (DOGE)</div>
                <div>[✓] Ripple (XRP)</div>
              </div>
            </div>

            <div>
              <div className="text-terminal-green font-bold mb-1">## AI MODELS</div>
              <div className="pl-3 space-y-0.5 text-terminal-dark-green">
                <div>1. GPT 6 - Advanced reasoning & analysis</div>
                <div>2. CLAUDE SONNET 4.1 - Balanced approach</div>
                <div>3. GEMINI 2.5 PRO - Multi-modal insights</div>
                <div>4. GROK 4 - Real-time data access</div>
                <div>5. DEEPSEEK CHAT V3.1 - Deep learning</div>
                <div>6. QWEN3 MAX - Superior performance</div>
                <div>7. BTC BUY&HOLD - Baseline strategy</div>
              </div>
            </div>

            <div>
              <div className="text-terminal-green font-bold mb-1">## GETTING STARTED</div>
              <div className="pl-3 space-y-0.5 text-terminal-dark-green">
                <div>1. Monitor live price feeds in ticker</div>
                <div>2. Review AI model performance</div>
                <div>3. Check positions and completed trades</div>
                <div>4. Chat with AI models for insights</div>
                <div>5. Analyze charts for market trends</div>
              </div>
            </div>

            <div>
              <div className="text-terminal-green font-bold mb-1">## RISK WARNING</div>
              <div className="pl-3 text-red-500 text-xs">
                ⚠ Cryptocurrency trading carries inherent risks. Past performance
                does not guarantee future results. Only invest what you can afford
                to lose. AI models are tools to assist decision-making, not
                financial advice.
              </div>
            </div>

            <div className="border-t border-terminal-dark-green pt-2 mt-3">
              <div className="text-terminal-dark-green text-xs">
                Version 1.0.0 | Last Updated: October 2025
              </div>
              <div className="text-terminal-dark-green text-xs">
                © 2025 NOF1.AI - All Rights Reserved
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

