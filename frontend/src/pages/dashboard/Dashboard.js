import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, CircularProgress } from '@mui/material';
import { 
  TrendingUp, 
  People, 
  AttachMoney, 
  Timeline 
} from '@mui/icons-material';
import PageHeader from '../../components/common/PageHeader';

const Dashboard = () => {
  const [stats, setStats] = useState({
    leads: {
      total: 0,
      active: 0
    },
    customers: {
      total: 0,
      active: 0
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Fetch customers directly
      const customersResponse = await fetch('http://localhost:8082/customer');
      const customersData = await customersResponse.json();
      
      // Fetch leads
      const leadsResponse = await fetch('http://localhost:8082/lead');
      const leadsData = await leadsResponse.json();

      setStats({
        leads: {
          total: leadsData?.leads?.lead?.length || 0,
          active: leadsData?.leads?.lead?.filter(lead => lead.status !== 'Lost')?.length || 0
        },
        customers: {
          total: customersData?.customers?.length || 0,
          active: customersData?.customers?.filter(customer => customer.status === 'Active')?.length || 0
        }
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };


  const calculateConversionRate = () => {
    if (stats.leads.total === 0) return 0;
    return Math.round((stats.customers.total / stats.leads.total) * 100);
  };

  const StatCard = ({ title, value, icon, color }) => (
    <Paper 
      sx={{ 
        p: 3, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        bgcolor: `${color}.light`,
        '&:hover': {
          bgcolor: `${color}.main`,
          '& .MuiTypography-root': { color: 'white' },
          '& .MuiSvgIcon-root': { color: 'white' }
        }
      }}
    >
      <Box>
        <Typography variant="h6" color={`${color}.main`} gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" color={`${color}.dark`}>
          {loading ? <CircularProgress size={20} /> : value}
        </Typography>
      </Box>
      <Box sx={{ color: `${color}.main` }}>
        {icon}
      </Box>
    </Paper>
  );
 
  return (
    <Box sx={{ p: 3 }}>
      <PageHeader title="Dashboard" />
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Total Leads"
            value={stats.leads.total}
            icon={<TrendingUp sx={{ fontSize: 40 }} />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Active Customers"
            value={stats.customers.active}
            icon={<People sx={{ fontSize: 40 }} />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Total Customers"
            value={stats.customers.total}
            icon={<AttachMoney sx={{ fontSize: 40 }} />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatCard
            title="Conversion Rate"
            value={`${calculateConversionRate()}%`}
            icon={<Timeline sx={{ fontSize: 40 }} />}
            color="info"
          />
        </Grid>
      </Grid>

      {/* Recent Activity Section */}
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : (
              <Typography variant="body1" color="text.secondary">
                No recent activity
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;