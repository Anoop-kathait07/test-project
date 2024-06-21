import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import moment from 'moment';

interface Transaction {
  timestamp: string;
  price: number;
}

interface Props {
  transactions: Transaction[];
}

const TransactionChart: React.FC<Props> = ({ transactions }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const labels = transactions.map(transaction => moment(transaction.timestamp).toDate());
    const data = transactions.map(transaction => transaction.price);

    const chartData: any = transactions.length != 0 ? {
      labels,
      datasets: [{
        label: 'Price',
        data,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        fill: true
      }]
    } : {
      labels: ['No Data'],
      datasets: [{
        label: 'No swap available',
        data: [0],
        borderColor: 'rgb(192, 75, 75)',
        tension: 0.1,
        fill: true
      }]
    };

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'minute',
              tooltipFormat: 'DD-MM-YYYY HH:mm',
              displayFormats: {
                minute: 'DD-MM-YYYY HH:mm',
                hour: 'DD-MM-YYYY HH:mm',
                day: 'DD-MM-YYYY'
              }
            },
            ticks: {
              callback: function(value, index, values) {
                return moment(value).format('DD-MM-YYYY HH:mm');
              }
            }
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [transactions]);

  return <canvas ref={chartRef}></canvas>;
};

export default TransactionChart;
