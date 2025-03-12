import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CRM System
          </Typography>
          <Button color="inherit" component={Link} to="/dashboard">
            DASHBOARD
          </Button>
          <Button color="inherit" component={Link} to="/customers">
            CUSTOMERS
          </Button>
          <Button color="inherit" component={Link} to="/leads">
            LEADS
          </Button>
          <Button color="inherit" component={Link} to="/users">
            USERS
          </Button>
          <Button color="inherit">
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="main">
        {children}
      </Box>
    </Box>
  );
};

export default Layout;