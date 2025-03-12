import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Paper, Link, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await authService.register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      if (response) {
        navigate('/login');
      }
    } catch (error) {
      setError(error.message || 'Registration failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Register
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Username *
              </Typography>
              <TextField
                fullWidth
                size="small"
                name="username"
                autoFocus
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                sx={{ mt: 1 }}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Email Address *
              </Typography>
              <TextField
                fullWidth
                size="small"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                sx={{ mt: 1 }}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Password *
              </Typography>
              <TextField
                fullWidth
                size="small"
                name="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                sx={{ mt: 1 }}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Confirm Password *
              </Typography>
              <TextField
                fullWidth
                size="small"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
              Register
            </Button>
            <Box textAlign="center">
              <Typography variant="body2" color="text.secondary">
                Already have an account?
                <Link href="/login" sx={{ ml: 1 }}>
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;