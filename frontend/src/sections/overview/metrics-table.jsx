import React from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CardHeader from '@mui/material/CardHeader';
import TableContainer from '@mui/material/TableContainer';

export default function MetricsTable({ metrics }) {

  return (
    <Card>
    <CardHeader title="Metrics Table for Reference" subheader="" sx={{ mb: 5 }} />
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Metric</TableCell>
              <TableCell align="right">Last Month</TableCell>
              <TableCell align="right">This Month</TableCell>
              <TableCell align="right">% of Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {metrics.map((row) => (
              <TableRow key={row.metric}>
                <TableCell component="th" scope="row">
                  {row.metric}
                </TableCell>
                <TableCell align="right">{row.last_month}</TableCell>
                <TableCell align="right">{row.this_month}</TableCell>
                <TableCell align="right">{row.percentage_change}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
    </Card>
  );
}

MetricsTable.propTypes = {
    metrics: PropTypes.any
  };
  