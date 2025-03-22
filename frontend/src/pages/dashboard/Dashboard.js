import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import PageHeader from '../../components/common/PageHeader';

const Dashboard = () => {
  return (
    <Box>
      <PageHeader title="Dashboard" />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Leads</Typography>
            <Typography variant="h4">150</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Active Customers</Typography>
            <Typography variant="h4">85</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Sales</Typography>
            <Typography variant="h4">$45,000</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Conversion Rate</Typography>
            <Typography variant="h4">24%</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;