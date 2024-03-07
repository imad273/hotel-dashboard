import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HomeLine = () => {
  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      title: {
        display: false
      },
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      },
    },
    scales: {
      y: {
        display: true,
        ticks: {
          beginAtZero: true,
          stepSize: 100,
        },
        grid: {
          display: true,
          color: "#444544"
        }
      },
      x: {
        display: true,
        grid: {
          display: false,
        }
      }
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [200, 222, 86, 352, 220, 300, 150],
        backgroundColor: "#E56A1B",
        borderColor: "#E56A1B",
        yAxisID: 'y',
        tension: 0.5
      }
    ],
  };

  return (
    <Line
      options={options}
      data={data}
    />
  )
}

export default HomeLine