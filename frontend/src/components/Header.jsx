import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  Tooltip,
} from '@mui/material';
import {
  Event as EventIcon,
  ExitToApp as LogoutIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { logout } from '../store/slices/authSlice';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.user?.role === 'admin');
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 700,
            }}
          >
            Event Booking
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LanguageSelector />
            
            {isAuthenticated ? (
              <>
                <Tooltip title="Create Event">
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/events/create')}
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      },
                    }}
                  >
                    Create Event
                  </Button>
                </Tooltip>

                <Button
                  color="inherit"
                  onClick={() => navigate('/profile')}
                >
                  {user?.username || 'Profile'}
                </Button>

                <Button
                  color="inherit"
                  onClick={() => navigate('/bookings')}
                >
                  My Bookings
                </Button>

                <Tooltip title="Logout">
                  <Button
                    color="inherit"
                    onClick={handleLogout}
                    startIcon={<LogoutIcon />}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(255, 0, 0, 0.1)',
                      },
                    }}
                  >
                    Logout
                  </Button>
                </Tooltip>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 