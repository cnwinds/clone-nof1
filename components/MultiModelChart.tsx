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
  TimeScale,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import annotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chartjs-adapter-date-fns';
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
  TimeScale,
  annotationPlugin,
  ChartDataLabels
);

export default function MultiModelChart() {
  const {
    models,
    selectedModel,
    timeRange,
    displayMode,
    setTimeRange,
    setDisplayMode,
  } = useModelsStore();

  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    if (models.length === 0) return;

    prepareChartData();
  }, [models, selectedModel, timeRange, displayMode]);

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

      // 根据显示模式转换数据
      const data = filteredHistory.map((point, index) => {
        let y = point.value;
        if (displayMode === '%') {
          // 转换为百分比：((当前值 - 初始值) / 初始值) * 100
          y = ((point.value - model.initialValue) / model.initialValue) * 100;
        }
        return {
          x: point.timestamp,
          y: y,
          isLastPoint: index === filteredHistory.length - 1, // 标记最后一个点
        };
      });

      return {
        label: model.displayName,
        data: data,
        borderColor: model.color,
        backgroundColor: model.color + '10', // 添加透明度
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: model.color,
        pointHoverBorderColor: '#000000',
        pointHoverBorderWidth: 2,
        modelIcon: model.icon, // 添加图标
        modelId: model.id, // 添加模型ID
        // 添加最后一个点的特殊样式
        pointBackgroundColor: model.color,
        pointBorderColor: model.color,
        pointRadius: 0,
        pointHoverRadius: 8,
        // 添加标签点
        pointStyle: 'circle',
        showLine: true,
      };
    });

    setChartData({
      datasets,
    });
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        right: 120, // 为右侧标签留出空间
      }
    },
    plugins: {
      legend: {
        display: false, // 使用底部的模型选择器代替
      },
      datalabels: {
        display: function(context: any) {
          // 只在最后一个点显示标签
          return context.dataIndex === context.dataset.data.length - 1;
        },
        formatter: function(value: any, context: any) {
          const dataset = context.dataset;
          const modelIcon = dataset.modelIcon || '?';
          let displayValue;
          
          if (displayMode === '%') {
            displayValue = value.y.toFixed(2) + '%';
          } else {
            displayValue = '$' + value.y.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
          }
          
          return `${modelIcon} ${displayValue}`;
        },
        color: function(context: any) {
          return context.dataset.borderColor;
        },
        font: {
          size: 12,
          weight: 'bold',
          family: 'monospace'
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: function(context: any) {
          return context.dataset.borderColor;
        },
        borderWidth: 1,
        borderRadius: 4,
        padding: 4,
        anchor: 'end',
        align: 'start',
        offset: -12,
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
            if (displayMode === '%') {
              return `${label}: ${value.toFixed(2)}%`;
            } else {
              return `${label}: $${value.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`;
            }
          },
        },
      },
      annotation: {
        annotations: {
          // 基准线
          baseline: {
            type: 'line',
            yMin: displayMode === '%' ? 0 : 10000,
            yMax: displayMode === '%' ? 0 : 10000,
            borderColor: '#888888',
            borderWidth: 1,
            borderDash: [5, 5],
            label: {
              display: true,
              content: displayMode === '%' ? '0%' : '$10,000',
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
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'MMM dd'
          }
        },
        grid: {
          color: 'rgba(0, 255, 0, 0.05)',
        },
        ticks: {
          color: '#00ff00',
          font: {
            family: "'Courier New', monospace",
            size: 10,
          },
          maxTicksLimit: 8,
          autoSkip: true,
        },
        border: {
          color: '#00ff00',
        },
        min: undefined, // 让Chart.js自动计算最小值
        max: undefined, // 让Chart.js自动计算最大值
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
            if (displayMode === '%') {
              return value.toFixed(0) + '%';
            } else {
              return '$' + value.toLocaleString('en-US');
            }
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

  // 计算百分比变化
  const totalInitialValue = selectedModel === 'all'
    ? models.reduce((sum, m) => sum + m.initialValue, 0)
    : models.find(m => m.id === selectedModel)?.initialValue || 10000;
  
  const totalPercentage = ((totalValue - totalInitialValue) / totalInitialValue) * 100;

  return (
    <div className="border border-terminal-green p-4 bg-black h-full flex flex-col">
      {/* 顶部控制栏 */}
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        {/* 左侧：显示模式切换 */}
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setDisplayMode('$')}
            className={`px-3 py-1 border transition-all text-sm ${
              displayMode === '$'
                ? 'bg-black text-white border-black'
                : 'bg-transparent text-terminal-green border-terminal-green hover:bg-terminal-green hover:text-black'
            }`}
          >
            $
          </button>
          <button
            onClick={() => setDisplayMode('%')}
            className={`px-3 py-1 border transition-all text-sm ${
              displayMode === '%'
                ? 'bg-black text-white border-black'
                : 'bg-transparent text-terminal-green border-terminal-green hover:bg-terminal-green hover:text-black'
            }`}
          >
            %
          </button>
        </div>

        {/* 右侧：时间范围选择器 */}
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setTimeRange('ALL')}
            className={`px-3 py-1 border transition-all text-sm ${
              timeRange === 'ALL'
                ? 'bg-black text-white border-black'
                : 'bg-transparent text-terminal-green border-terminal-green hover:bg-terminal-green hover:text-black'
            }`}
          >
            ALL
          </button>
          <button
            onClick={() => setTimeRange('72H')}
            className={`px-3 py-1 border transition-all text-sm ${
              timeRange === '72H'
                ? 'bg-black text-white border-black'
                : 'bg-transparent text-terminal-green border-terminal-green hover:bg-terminal-green hover:text-black'
            }`}
          >
            72H
          </button>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="flex-1 relative">
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

    </div>
  );
}

