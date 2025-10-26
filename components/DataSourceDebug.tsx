'use client';

import { useEffect, useState } from 'react';
import { getDataSourceInfo } from '@/lib/services/dataService';

export default function DataSourceDebug() {
  const [info, setInfo] = useState<any>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const dataSourceInfo = getDataSourceInfo();
    setInfo(dataSourceInfo);
  }, []);

  if (!info) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* 圆点状态指示器 */}
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 运行中的圆点 */}
        <div className="w-3 h-3 rounded-full bg-terminal-green animate-pulse shadow-lg shadow-terminal-green/50"></div>
        
        {/* 悬停时显示的详细信息 */}
        {isHovered && (
          <div className="absolute top-4 right-0 bg-black border border-terminal-green p-3 text-xs text-terminal-green min-w-[200px] shadow-lg">
            <div className="font-semibold mb-2 text-glow">数据源状态</div>
            <div className="space-y-1">
              <div>数据源: <span className="text-terminal-dark-green">{info.source}</span></div>
              <div>API Base: <span className="text-terminal-dark-green">{info.apiBase}</span></div>
              <div>使用Mock: <span className="text-terminal-dark-green">{info.useMock ? '是' : '否'}</span></div>
            </div>
            {/* 小箭头指向圆点 */}
            <div className="absolute -top-1 right-2 w-2 h-2 bg-terminal-green rotate-45 border-l border-t border-terminal-green"></div>
          </div>
        )}
      </div>
    </div>
  );
}