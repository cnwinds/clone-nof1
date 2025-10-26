'use client';

import { useEffect, useState, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import type { AIModel } from '@/types';
import { useModelsStore } from '@/lib/store/useModelsStore';

// 注册 Chart.js 组件和插件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  annotationPlugin
);

export default function MultiModelChart() {
  const {
    models,
    selectedModel,
    timeRange,
    setTimeRange,
  } = useModelsStore();

  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    if (models.length === 0) return;

    prepareChartData();
  }, [models, selectedModel, timeRange]);

  const prepareChartData = () => {
    // 确定要显示的模型
    const modelsToShow = selectedModel === 'all'
      ? models
      : models.filter(m => m.id === selectedModel);

    if (modelsToShow.length === 0) return;

    // 根据时间范围过滤数据
    const days = timeRange === '72H' ? 3 : 7;
    const now = Date.now();
    const cutoff = now - days * 24 * 60 * 60 * 1000;

    // 准备数据集
    const datasets = modelsToShow.map(model => {
      const filteredHistory = model.valueHistory.filter(
        point => point.timestamp >= cutoff
      );

      return {
        label: model.displayName,
        data: filteredHistory.map(point => ({
          x: point.timestamp,
          y: point.value,
        })),
        borderColor: model.color,
        backgroundColor: model.color + '10', // 添加透明度
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: model.color,
        pointHoverBorderColor: '#000000',
        pointHoverBorderWidth: 2,
      };
    });

    // 生成时间标签
    const allTimestamps = new Set<number>();
    datasets.forEach(ds => {
      ds.data.forEach((point: any) => allTimestamps.add(point.x));
    });
    
    const sortedTimestamps = Array.from(allTimestamps).sort();
    const labels = sortedTimestamps.map(ts => {
      const date = new Date(ts);
      return timeRange === '72H'
        ? date.toLocaleString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit' 
          })
        : date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          });
    });

    setChartData({
      labels,
      datasets,
    });
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // 使用底部的模型选择器代替
      },
      tooltip: {
        backgroundColor: '#000000',
        titleColor: '#00ff00',
        bodyColor: '#00ff00',
        borderColor: '#00ff00',
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: $${value.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`;
          },
        },
      },
      annotation: {
        annotations: {
          // 基准线 $10,000
          baseline: {
            type: 'line',
            yMin: 10000,
            yMax: 10000,
            borderColor: '#888888',
            borderWidth: 1,
            borderDash: [5, 5],
            label: {
              display: true,
              content: '$10,000',
              position: 'start',
              color: '#888888',
              font: {
                size: 10,
                family: "'Courier New', monospace",
              },
            },
          },
        },
      },
    },
    scales: {
      x: {
        type: 'category',
        grid: {
          color: 'rgba(0, 255, 0, 0.05)',
        },
        ticks: {
          color: '#00ff00',
          font: {
            family: "'Courier New', monospace",
            size: 10,
          },
          maxTicksLimit: 10,
          autoSkip: true,
        },
        border: {
          color: '#00ff00',
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 255, 0, 0.05)',
        },
        ticks: {
          color: '#00ff00',
          font: {
            family: "'Courier New', monospace",
          },
          callback: function (value: any) {
            return '$' + value.toLocaleString('en-US');
          },
        },
        beginAtZero: true,
        border: {
          color: '#00ff00',
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  // 计算总账户价值
  const totalValue = selectedModel === 'all'
    ? models.reduce((sum, m) => sum + m.currentValue, 0)
    : models.find(m => m.id === selectedModel)?.currentValue || 0;

  return (
    <div className="border border-terminal-green p-4 bg-black">
      {/* 顶部控制栏 */}
      <div className="flex justify-between items-center mb-4">
        {/* 左侧：时间范围选择器 */}
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setTimeRange('ALL')}
            className={`px-4 py-2 border transition-all text-sm ${
              timeRange === 'ALL'
                ? 'bg-terminal-green text-black border-terminal-green'
                : 'bg-transparent text-terminal-green border-terminal-green hover:bg-terminal-green hover:text-black'
            }`}
          >
            ALL
          </button>
          <button
            onClick={() => setTimeRange('72H')}
            className={`px-4 py-2 border transition-all text-sm ${
              timeRange === '72H'
                ? 'bg-terminal-green text-black border-terminal-green'
                : 'bg-transparent text-terminal-green border-terminal-green hover:bg-terminal-green hover:text-black'
            }`}
          >
            72H
          </button>
        </div>

        {/* 右侧：总价值显示 */}
        <div className="text-right">
          <div className="text-terminal-green text-xs mb-1">
            {selectedModel === 'all' ? 'TOTAL ACCOUNT VALUE' : 'MODEL VALUE'}
          </div>
          <div className="text-terminal-green text-2xl font-bold">
            ${totalValue.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="h-[500px] relative">
        {chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full text-terminal-green">
            <div className="text-center">
              <div className="text-xl mb-2">[ ████████████ ]</div>
              <div className="animate-pulse">Loading Chart Data...</div>
            </div>
          </div>
        )}
      </div>

      {/* 图例说明 */}
      {selectedModel === 'all' && models.length > 0 && (
        <div className="mt-4 pt-4 border-t border-terminal-green">
          <div className="grid grid-cols-4 gap-2 text-xs">
            {models.map(model => (
              <div key={model.id} className="flex items-center gap-2">
                <div
                  className="w-4 h-0.5"
                  style={{ backgroundColor: model.color }}
                />
                <span className="text-terminal-green">{model.displayName}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

