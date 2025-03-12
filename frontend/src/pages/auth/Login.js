import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Paper, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/api';
import { useAuth } from '../../utils/AuthContext';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
          const result = await authService.login(credentials);
          if (result && result.token) {
            await login(result.user, result.token);
            navigate("/dashboard"); // Redirects to the dashboard

          }
        } catch (error) {
          setError(error.message);
          setCredentials(prev => ({ ...prev, password: '' }));
        }
      };
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            CRM Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Email Address *
              </Typography>
              <TextField
                fullWidth
                size="small"
                name="email"
                autoComplete="email"
                autoFocus
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                sx={{ mt: 1 }}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Password *
              </Typography>
              <TextField
                fullWidth
                size="small"
                name="password"
                type="password"
                autoComplete="current-password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                sx={{ mt: 1 }}
              />
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 2, 
                mb: 2,
                textTransform: 'uppercase',
                backgroundColor: '#1976d2'
              }}
            >
              Sign In
            </Button>
            <Box textAlign="center">
              <Typography variant="body2" color="text.secondary">
                Don't have an account? 
                <Link href="/register" sx={{ ml: 1 }}>
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;