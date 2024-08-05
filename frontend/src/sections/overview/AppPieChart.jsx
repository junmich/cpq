import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { Legend, Tooltip, ArcElement, Chart as ChartJS} from 'chart.js';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

ChartJS.register(ArcElement, Tooltip, Legend);

const AppPieChart = ({ metrics }) => {

// Ensure metrics data is valid
  if (!metrics || metrics.length === 0) return <div>No data available</div>;

  // Extracting data from metrics
  const labels = metrics.map(metric => metric.metric);
  const data = metrics.map(metric => Math.ceil(metric.percentage_change));

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: [
          'rgba(75,192,192,0.6)',
          'rgba(153,102,255,0.6)',
          'rgba(255,159,64,0.6)',
          'rgba(255,99,132,0.6)',
          'rgba(54,162,235,0.6)',
        ],
        borderColor: 'rgba(255,255,255,1)',
        borderWidth: 1,
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}%`
        }
      }
    }
  };

  return (
    <Card>
      <CardHeader title="Pie Chart for Percentage Change" subheader="This chart will display the percentage change for each metric." sx={{ mb: 5 }} />
      <Pie data={chartData} options={options} />
    </Card>
  );
};

AppPieChart.propTypes = {
    metrics: PropTypes.any
}

export default AppPieChart;
