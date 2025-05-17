import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
} from '@mui/material';
import { loginSuccess, registerSuccess } from '../store/slices/authSlice';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!formData.email || !formData.password || (!isLogin && !formData.username)) {
      setError('Please fill in all fields');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: Math.random().toString(),
        ...formData,
      };
      
      if (isLogin) {
        dispatch(loginSuccess(userData));
      } else {
        dispatch(registerSuccess(userData));
      }
      
      navigate('/');
    }, 500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          {isLogin ? 'Login' : 'Register'}
        </Typography>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
            />
          )}
          
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
          />
          
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
          />
          
          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              background: 'linear-gradient(45deg, #6366f1, #a855f7)',
              '&:hover': {
                background: 'linear-gradient(45deg, #4f46e5, #9333ea)',
              },
            }}
          >
            {isLogin ? 'Login' : 'Register'}
          </Button>
        </form>
        
        <Box textAlign="center">
          <Link
            component="button"
            variant="body2"
            onClick={() => setIsLogin(!isLogin)}
            sx={{ textDecoration: 'none' }}
          >
            {isLogin
              ? "Don't have an account? Register"
              : 'Already have an account? Login'}
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default AuthPage; 