'use client';

import { useState, useEffect } from 'react';

export default function AccountValue() {
  const [showDetails, setShowDetails] = useState(false);
  const [accountData, setAccountData] = useState({
    totalValue: 125478.32,
    availableBalance: 45230.18,
    totalProfit: 23478.32,
    totalProfitPercent: 23.15,
  });

  return (
    <div className="border border-terminal-green p-6 bg-black">
      <div className="text-terminal-green mb-2 text-sm">
        ## TOTAL ACCOUNT VALUE
      </div>
      
      <div className="text-terminal-green text-5xl font-bold mb-4 text-glow">
        ${accountData.totalValue.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div
          className={`text-lg ${
            accountData.totalProfitPercent >= 0 ? 'text-terminal-green' : 'text-red-500'
          }`}
        >
          {accountData.totalProfitPercent >= 0 ? '▲' : '▼'}{' '}
          {Math.abs(accountData.totalProfitPercent).toFixed(2)}%
        </div>
        <div className="text-terminal-green text-lg">
          {accountData.totalProfit >= 0 ? '+' : ''}$
          {accountData.totalProfit.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      </div>

      <button
        onClick={() => setShowDetails(!showDetails)}
        className="terminal-button text-sm"
      >
        DETAILED VIEW {showDetails ? '▼' : '►'}
      </button>

      {showDetails && (
        <div className="mt-4 pt-4 border-t border-terminal-green space-y-2">
          <div className="flex justify-between text-terminal-green">
            <span>Available Balance:</span>
            <span className="font-bold">
              ${accountData.availableBalance.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex justify-between text-terminal-green">
            <span>Total Profit:</span>
            <span className="font-bold">
              ${accountData.totalProfit.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex justify-between text-terminal-green">
            <span>ROI:</span>
            <span className="font-bold">{accountData.totalProfitPercent.toFixed(2)}%</span>
          </div>
        </div>
      )}
    </div>
  );
}

