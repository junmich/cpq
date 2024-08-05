import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { Title,  Legend, Tooltip,LinearScale, LineElement, PointElement, CategoryScale, Chart as ChartJS } from 'chart.js';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AppLineChart = ({ metrics }) => {
  const labels = metrics.map(metric => metric.metric);
  const thisMonthData = metrics.map(metric => metric.this_month);
  const lastMonthData = metrics.map(metric => metric.last_month);

  const data = {
    labels,
    datasets: [
      {
        label: 'This Month',
        data: thisMonthData,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
      {
        label: 'Last Month',
        data: lastMonthData,
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
        fill: true,
      },
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
          label: (context) => `${context.dataset.label}: ${context.raw}`
        }
      }
    }
  };

  return  (
    <Card>
      <CardHeader title="Line Chart for MRR Over Time" subheader="This chart will show the MRR values at the beginning and end of each month." sx={{ mb: 5 }} />
      <Line data={data} options={options} />;
    </Card>
  );
};

AppLineChart.propTypes = {
    metrics: PropTypes.any
}
export default AppLineChart;