import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import {
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  AttachMoney as MoneyIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalCustomers: 0,
      activeLeads: 0,
      revenue: 0,
      conversionRate: 0
    },
    recentCustomers: [],
    recentLeads: []
  });

  useEffect(() => {
    // Fetch dashboard data
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('http://localhost:5000/api/dashboard');
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Use sample data as fallback
      setDashboardData({
        stats: {
          totalCustomers: 120,
          activeLeads: 45,
          revenue: 125000,
          conversionRate: 32
        },
        recentCustomers: [
          { id: 1, name: 'John Doe', company: 'Tech Corp', value: 50000 },
          { id: 2, name: 'Jane Smith', company: 'Design Co', value: 25000 },
          { id: 3, name: 'Mike Johnson', company: 'Marketing Inc', value: 35000 }
        ],
        recentLeads: [
          { id: 1, name: 'Sarah Wilson', company: 'Innovation Labs', status: 'New' },
          { id: 2, name: 'Tom Brown', company: 'Digital Solutions', status: 'In Progress' },
          { id: 3, name: 'Emily Davis', company: 'Cloud Services', status: 'Contacted' }
        ]
      });
    }
  };

  const stats = [
    { 
      title: 'Total Customers', 
      value: dashboardData.stats.totalCustomers, 
      icon: <PeopleIcon sx={{ fontSize: 40 }} color="primary" /> 
    },
    { 
      title: 'Active Leads', 
      value: dashboardData.stats.activeLeads, 
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} color="success" /> 
    },
    { 
      title: 'Revenue', 
      value: `$${dashboardData.stats.revenue?.toLocaleString()}`, 
      icon: <MoneyIcon sx={{ fontSize: 40 }} color="warning" /> 
    },
    { 
      title: 'Conversion Rate', 
      value: `${dashboardData.stats.conversionRate}%`, 
      icon: <AssessmentIcon sx={{ fontSize: 40 }} color="info" /> 
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* ... existing title ... */}

      <Grid container spacing={3}>
        {/* Stats Cards */}
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            {/* ... existing stat card layout ... */}
          </Grid>
        ))}

        {/* Recent Customers */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Recent Customers" />
            <CardContent>
              <List>
                {dashboardData.recentCustomers.map((customer, index) => (
                  <React.Fragment key={customer.id}>
                    <ListItem>
                      <ListItemText
                        primary={customer.name}
                        secondary={customer.company}
                      />
                      <Typography variant="subtitle2" color="primary">
                        ${customer.value?.toLocaleString()}
                      </Typography>
                    </ListItem>
                    {index < dashboardData.recentCustomers.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Leads */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="Recent Leads" />
            <CardContent>
              <List>
                {dashboardData.recentLeads.map((lead, index) => (
                  <React.Fragment key={lead.id}>
                    {/* ... existing lead item layout ... */}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;