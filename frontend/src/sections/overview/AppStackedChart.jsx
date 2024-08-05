import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import {  Title, Legend, Tooltip, BarElement, LinearScale, CategoryScale, Chart as ChartJS} from 'chart.js';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AppStackedBarChart = ({ metrics }) => {
  // Extracting data from metrics
  const labels = metrics.map(metric => metric.metric);
  const lastMonthData = metrics.map(metric => metric.last_month);
  const thisMonthData = metrics.map(metric => metric.this_month);

  const data = {
    labels,
    datasets: [
      {
        label: 'Last Month',
        data: lastMonthData,
        backgroundColor: 'rgba(153,102,255,0.6)',
      },
      {
        label: 'This Month',
        data: thisMonthData,
        backgroundColor: 'rgba(75,192,192,0.6)',
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
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      }
    }
  };

  

  return (
    <Card>
      <CardHeader title="Stacked Bar Chart for MRR Components" subheader="This chart will illustrate the contribution of each component (New MRR, Expansion MRR, Churn MRR) to the total MRR." sx={{ mb: 5 }} />
      <Bar data={data} options={options} />;
    </Card>
  );
};


AppStackedBarChart.propTypes = {
  metrics: PropTypes.any
}

export default AppStackedBarChart;
