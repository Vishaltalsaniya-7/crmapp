import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CRM System
        </Typography>
        {user ? (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" onClick={() => navigate('/dashboard')}>
              Dashboard
            </Button>
            <Button color="inherit" onClick={() => navigate('/customers')}>
              Customers
            </Button>
            <Button color="inherit" onClick={() => navigate('/leads')}>
              Leads
            </Button>
            <Button color="inherit" onClick={() => navigate('/users')}>
              Users
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate('/register')}>
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;




















