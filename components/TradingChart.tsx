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
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// 注册 Chart.js 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type TimeRange = 'ALL' | '72H';

export default function TradingChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>('ALL');
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    currentPrice: 0,
    priceChange: 0,
    percentChange: 0,
  });

  useEffect(() => {
    fetchChartData();
  }, [timeRange]);

  const fetchChartData = async () => {
    setLoading(true);
    try {
      const days = timeRange === '72H' ? 3 : 7;
      const response = await fetch(`/api/historical?coinId=bitcoin&days=${days}`);
      const data = await response.json();

      if (data.prices && data.prices.length > 0) {
        const labels = data.prices.map((point: [number, number]) => {
          const date = new Date(point[0]);
          return timeRange === '72H'
            ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });

        const prices = data.prices.map((point: [number, number]) => point[1]);

        // 计算统计数据
        const currentPrice = prices[prices.length - 1];
        const firstPrice = prices[0];
        const priceChange = currentPrice - firstPrice;
        const percentChange = (priceChange / firstPrice) * 100;

        setStats({
          currentPrice,
          priceChange,
          percentChange,
        });

        setChartData({
          labels,
          datasets: [
            {
              label: 'BTC Price',
              data: prices,
              borderColor: '#00ff00',
              backgroundColor: 'rgba(0, 255, 0, 0.1)',
              borderWidth: 2,
              fill: true,
              tension: 0.4,
              pointRadius: 0,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: '#00ff00',
              pointHoverBorderColor: '#000000',
              pointHoverBorderWidth: 2,
            },
          ],
        });
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching chart data:', error);
      setLoading(false);
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#000000',
        titleColor: '#00ff00',
        bodyColor: '#00ff00',
        borderColor: '#00ff00',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          label: function (context: any) {
            return `$${context.parsed.y.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(0, 255, 0, 0.1)',
          drawBorder: true,
          borderColor: '#00ff00',
        },
        ticks: {
          color: '#00ff00',
          font: {
            family: "'Courier New', monospace",
          },
          maxTicksLimit: 8,
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 255, 0, 0.1)',
          drawBorder: true,
          borderColor: '#00ff00',
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
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  return (
    <div className="border border-terminal-green p-4 bg-black">
      {/* 时间范围选择器 */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setTimeRange('ALL')}
            className={`px-4 py-2 border transition-all ${
              timeRange === 'ALL'
                ? 'bg-terminal-green text-black border-terminal-green'
                : 'bg-transparent text-terminal-green border-terminal-green hover:bg-terminal-green hover:text-black'
            }`}
          >
            ALL
          </button>
          <button
            onClick={() => setTimeRange('72H')}
            className={`px-4 py-2 border transition-all ${
              timeRange === '72H'
                ? 'bg-terminal-green text-black border-terminal-green'
                : 'bg-transparent text-terminal-green border-terminal-green hover:bg-terminal-green hover:text-black'
            }`}
          >
            72H
          </button>
        </div>
        
        {!loading && stats.currentPrice > 0 && (
          <div className="text-right">
            <div className="text-terminal-green text-2xl font-bold">
              ${stats.currentPrice.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div
              className={`text-sm ${
                stats.percentChange >= 0 ? 'text-terminal-green' : 'text-red-500'
              }`}
            >
              {stats.percentChange >= 0 ? '▲' : '▼'} {Math.abs(stats.percentChange).toFixed(2)}%
            </div>
          </div>
        )}
      </div>

      {/* 图表区域 */}
      <div className="h-[400px] relative">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-terminal-green text-center">
              <div className="text-xl mb-2">[ ████████████ ]</div>
              <div className="animate-pulse">Loading Chart Data...</div>
            </div>
          </div>
        ) : chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full text-terminal-green">
            No data available
          </div>
        )}
      </div>
    </div>
  );
}

