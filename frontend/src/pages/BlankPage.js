import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';

const BlankPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8082/api/dashboard', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setDashboardData(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {dashboardData && (
          <>
            <Grid item xs={12} md={6} lg={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Total Customers</Typography>
                <Typography variant="h4">{dashboardData.totalCustomers || 0}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Total Leads</Typography>
                <Typography variant="h4">{dashboardData.totalLeads || 0}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Active Users</Typography>
                <Typography variant="h4">{dashboardData.activeUsers || 0}</Typography>
              </Paper>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default BlankPage;