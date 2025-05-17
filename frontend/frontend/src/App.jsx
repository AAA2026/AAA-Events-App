import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { selectIsAdmin, selectIsAuthenticated } from './store/slices/authSlice';

// Providers
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

// Components
import Layout from './components/Layout';
import NotificationSystem from './components/NotificationSystem';
import LoadingOverlay from './components/LoadingOverlay';

// Pages
import Home from './pages/Home';
import Events from './pages/Events';
import CreateEvent from './pages/CreateEvent';
import AuthPage from './pages/AuthPage';
import EventDetails from './pages/EventDetails';
import BookingSuccess from './pages/BookingSuccess';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import Settings from './pages/Settings';

// Redux actions
import { fetchEvents } from './store/slices/eventsSlice';
import { setTheme } from './store/slices/uiSlice';

// Protected Route Component
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.ui);

  useEffect(() => {
    // Fetch events regardless of authentication status since the site is public
    dispatch(fetchEvents());
  }, [dispatch]);

  const muiTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#94A3B8', // Soft slate blue
        light: '#CBD5E1',
        dark: '#64748B',
      },
      secondary: {
        main: '#E2E8F0', // Soft cool gray
        light: '#F1F5F9',
        dark: '#CBD5E1',
      },
      success: {
        main: '#93C5FD', // Soft sky blue
        light: '#BFDBFE',
        dark: '#60A5FA',
      },
      error: {
        main: '#FDA4AF', // Soft rose
        light: '#FECDD3',
        dark: '#FB7185',
      },
      warning: {
        main: '#FCD34D', // Soft amber
        light: '#FDE68A',
        dark: '#FBBF24',
      },
      info: {
        main: '#93C5FD', // Soft blue
        light: '#BFDBFE',
        dark: '#60A5FA',
      },
      background: {
        default: '#FFFFFF',
        paper: 'rgba(255, 255, 255, 0.8)',
      },
      text: {
        primary: '#475569', // Soft slate
        secondary: '#64748B',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 500,
      },
      h6: {
        fontWeight: 500,
      },
    },
    spacing: (factor) => `${0.5 * factor}rem`, // Base spacing unit of 8px (0.5rem)
    shape: {
      borderRadius: 24,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: {
              xs: 20,
              sm: 24,
            },
            padding: {
              xs: '0.75rem 1.5rem',
              sm: '1rem 2rem',
            },
            fontSize: {
              xs: '0.875rem',
              sm: '1rem',
            },
            textTransform: 'none',
            fontWeight: 500,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 'inherit',
              background: 'linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))',
              opacity: 0,
              transition: 'opacity 0.3s ease',
            },
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(93, 93, 93, 0.23)',
              '&::before': {
                opacity: 1,
              },
            },
            '&:active': {
              transform: 'translateY(1px)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: {
              xs: 24,
              sm: 32,
            },
            padding: {
              xs: 2,
              sm: 3,
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(203, 213, 225, 0.3)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            overflow: 'hidden',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(203, 213, 225, 0.5)',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: '120px',
              height: '120px',
              background: 'linear-gradient(135deg, rgba(148, 163, 184, 0.1), rgba(203, 213, 225, 0.1))',
              borderRadius: '0 0 0 100%',
            },
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            borderRadius: {
              xs: 32,
              sm: 40,
            },
            padding: {
              xs: 2,
              sm: 3,
              md: 4,
            },
            margin: {
              xs: 2,
              sm: 3,
              md: 4,
            },
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(203, 213, 225, 0.3)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden',
            '&:hover': {
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(203, 213, 225, 0.5)',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: '200px',
              height: '200px',
              background: 'linear-gradient(135deg, rgba(148, 163, 184, 0.1), rgba(203, 213, 225, 0.1))',
              borderRadius: '0 0 0 100%',
              zIndex: 0,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 20,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                '& fieldset': {
                  borderColor: 'rgba(148, 163, 184, 0.5)',
                  borderRadius: 20,
                },
              },
              '&.Mui-focused': {
                '& fieldset': {
                  borderWidth: '2px',
                  borderRadius: 20,
                  boxShadow: '0 0 0 4px rgba(148, 163, 184, 0.1)',
                },
              },
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 20,
            },
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 20,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            borderRadius: '50%',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: {
              xs: 24,
              sm: 32,
            },
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(203, 213, 225, 0.3)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden',
            '&:hover': {
              boxShadow: '0 12px 30px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(203, 213, 225, 0.5)',
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              width: '150px',
              height: '150px',
              background: 'linear-gradient(135deg, rgba(148, 163, 184, 0.1), rgba(203, 213, 225, 0.1))',
              borderRadius: '0 0 0 100%',
              zIndex: 0,
            },
          },
        },
      },
    },
  });

  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <MuiThemeProvider theme={muiTheme}>
            <CssBaseline />
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                minHeight: '100vh',
                width: '100vw',
                overflow: 'hidden',
                bgcolor: 'background.default',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 50%, #F1F5F9 100%)',
              }}
            >
              <NotificationSystem />
              <LoadingOverlay />
              <Routes>
                {/* Public Routes */}
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventDetails />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/register" element={<AuthPage isRegister />} />
                
                {/* Protected Routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/create-event"
                  element={
                    <ProtectedRoute>
                      <CreateEvent />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/booking-success/:eventId"
                  element={
                    <ProtectedRoute>
                      <BookingSuccess />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                
                {/* Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminPanel />
                    </ProtectedRoute>
                  }
                />

                {/* Default redirect */}
                <Route path="/" element={<Navigate to="/events" replace />} />
              </Routes>
            </Box>
          </MuiThemeProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

