import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HomeBars = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      },
    },
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          stepSize: 100,
        }
      }
    }
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        data: [200, 222, 86, 352, 220, 300, 150],
        backgroundColor: "#FF204E",
        borderRadius: 15,
      }
    ],
  };

  return (
    <Bar
      options={options}
      data={data}
    />
  )
}

export default HomeBars