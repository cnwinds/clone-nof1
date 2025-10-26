'use client';

import { useState, useEffect } from 'react';
import type { ConnectionStatus as StatusType } from '@/types';

export default function ConnectionStatus() {
  const [status, setStatus] = useState<StatusType>('connecting');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 模拟连接过程
    const timer = setTimeout(() => {
      setStatus('connected');
      setProgress(100);
    }, 2000);

    // 进度条动画
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 1;
      });
    }, 20);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  if (status === 'connected') {
    return null; // 连接成功后隐藏
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50">
      <div className="border border-terminal-green p-8 bg-black max-w-md w-full">
        <div className="text-terminal-green text-center space-y-4">
          <div className="text-2xl font-bold mb-4 text-glow">
            NOF1.AI
          </div>
          
          <div className="text-lg">
            [{Array(12).fill('█').map((char, i) => (
              <span
                key={i}
                className={i < progress / 8.33 ? 'text-terminal-green' : 'text-gray-700'}
              >
                {char}
              </span>
            ))}]
          </div>

          <div className="text-sm animate-pulse">
            STATUS: {status === 'connecting' ? 'CONNECTING TO SERVER' : 'CONNECTED'}
          </div>

          <div className="text-xs text-terminal-dark-green mt-4">
            {progress}% COMPLETE
          </div>
        </div>
      </div>
    </div>
  );
}

