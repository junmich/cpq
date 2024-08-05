import axios from 'axios';
import Cookies from 'js-cookie';
// import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppPieChart from '../AppPieChart';
import AppLineChart from '../AppLineChart';
import MetricsTable from '../metrics-table';
import AppStackedChart from '../AppStackedChart';
// import AppNewsUpdate from '../app-news-update';
// import AppOrderTimeline from '../app-order-timeline';
import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------

export default function AppView() {
  const [metrics, setMetrics] = useState([]);
  useEffect(() => {
    // const axios = require('axios');
    const data = '';

    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:3001/api/analytics/metrics',
      headers: { 
        'Authorization': Cookies.get('token')
      },
      data
    };

    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setMetrics(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  const getMetricsForPie = () => metrics.map(metric => {
        const label = metric.metric;
        const value = Math.ceil(metric.percentage_change);
        return { label, value }
      });

  console.log(getMetricsForPie());

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={4} md={4}>
          <AppWidgetSummary
            title={metrics[0] ? metrics[0].metric : ''}
            total={metrics[0] ? metrics[0].this_month : ''}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={4} md={4}>
          <AppWidgetSummary
            title={metrics[1] ? metrics[1].metric : ''}
            total={metrics[1] ? metrics[1].this_month : ''}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={4} md={4}>
          <AppWidgetSummary
            title={metrics[2] ? metrics[2].metric : ''}
            total={metrics[2] ? metrics[2].this_month : ''}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={4} md={4}>
          <AppWidgetSummary
            title={metrics[3] ? metrics[3].metric : ''}
            total={metrics[3] ? metrics[3].this_month : ''}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} sm={4} md={4}>
          <AppWidgetSummary
            title={metrics[4] ? metrics[4].metric : ''}
            total={metrics[4] ? metrics[4].this_month : ''}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} sm={4} md={4}>
          <AppWidgetSummary
            title={metrics[3] ? metrics[5].metric : ''}
            total={metrics[3] ? `${metrics[5].this_month} %` : ''}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>


        <Grid xs={12} md={6} lg={6}>
          <MetricsTable metrics={metrics} />
        </Grid>
        
        <Grid xs={12} md={6} lg={6}>
          <AppLineChart metrics={metrics} />
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          <AppStackedChart metrics={metrics} />
        </Grid>
        
        <Grid xs={12} md={6} lg={6}>
          <AppPieChart metrics={metrics} />
        </Grid>
      </Grid>
    </Container>
  );
}
