import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  Container,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const Header = () => {
  const theme = useTheme();
  const logoUrl = "https://cdn-icons-png.flaticon.com/512/2693/2693507.png";

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(203, 213, 225, 0.3)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: { xs: 2, sm: 4 },
            py: { xs: 1, sm: 2 },
          }}
        >
          <Box 
            component={Link} 
            to="/"
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              textDecoration: 'none', 
              color: 'inherit',
              gap: 1,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <Box
              component="img"
              src={logoUrl}
              alt="EventBooking Logo"
              sx={{
                height: { xs: 32, sm: 40 },
                width: 'auto',
                filter: theme.palette.mode === 'dark' ? 'brightness(0) invert(1)' : 'none',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'rotate(10deg)',
                },
              }}
            />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
                background: 'linear-gradient(to right, #6366f1, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              eventbooking
            </Typography>
          </Box>

          <Box 
            sx={{ 
              display: 'flex', 
              gap: { xs: 1, sm: 2 },
              alignItems: 'center',
            }}
          >
            <Button 
              color="inherit" 
              component={Link} 
              to="/"
              sx={{ 
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Dashboard
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/events"
              sx={{ 
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Browse Events
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/create-event"
              startIcon={<AddIcon />}
              sx={{ 
                background: 'linear-gradient(45deg, #6366f1, #a855f7)',
                color: 'white',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px) scale(1.05)',
                  background: 'linear-gradient(45deg, #4f46e5, #9333ea)',
                },
              }}
            >
              Create Event
            </Button>
            <Tooltip title="Settings">
              <IconButton
                component={Link}
                to="/settings"
                sx={{
                  ml: 1,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'rotate(45deg)',
                    color: '#6366f1',
                  },
                }}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 