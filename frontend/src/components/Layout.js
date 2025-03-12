import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../utils/AuthContext';

const Layout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CRM System
          </Typography>
          {isAuthenticated ? (
            <>
              <Button 
                color="inherit" 
                onClick={() => navigate('/dashboard')}
                sx={{ mx: 1 }}
              >
                DASHBOARD
              </Button>
              <Button 
                color="inherit" 
                onClick={() => navigate('/customers')}
                sx={{ mx: 1 }}
              >
                CUSTOMERS
              </Button>
              <Button 
                color="inherit" 
                onClick={() => navigate('/leads')}
                sx={{ mx: 1 }}
              >
                LEADS
              </Button>
              <Button 
                color="inherit" 
                onClick={() => navigate('/users')}
                sx={{ mx: 1 }}
              >
                USERS
              </Button>
              <Button 
                color="inherit" 
                onClick={handleLogout}
                sx={{ ml: 2 }}
              >
                LOGOUT
              </Button>
            </>
          ) : (
            <>
              <Button 
                color="inherit" 
                onClick={() => navigate('/login')}
                sx={{ mx: 1 }}
              >
                LOGIN
              </Button>
              <Button 
                color="inherit" 
                onClick={() => navigate('/register')}
                sx={{ mx: 1 }}
              >
                REGISTER
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;