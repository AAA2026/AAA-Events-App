import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Card,
  CardContent,
  Divider,
  Button,
} from '@mui/material';
import {
  EventAvailable,
  CalendarToday,
  LocationOn,
  AccessTime,
  Login as LoginIcon,
  PersonAdd as SignUpIcon,
} from '@mui/icons-material';

const Dashboard = () => {
  const userBookings = useSelector((state) => state.bookings.bookings);
  const events = useSelector((state) => state.events.events);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Get booked events details
  const bookedEvents = isAuthenticated ? userBookings.map(booking => {
    const event = events.find(e => e.id === booking.eventId);
    return { ...booking, eventDetails: event };
  }).filter(booking => booking.eventDetails) : [];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (timeString) => {
    const date = new Date(`2000-01-01T${timeString}`);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #6366f1, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 4,
            }}
          >
            Welcome to BookmyEvent
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Sign in to view your dashboard and manage your event bookings
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              component={Link}
              to="/login"
              startIcon={<LoginIcon />}
              sx={{
                background: 'linear-gradient(45deg, #6366f1, #a855f7)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #5457ea, #9744f6)',
                },
              }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              component={Link}
              to="/register"
              startIcon={<SignUpIcon />}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #6366f1, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Welcome back, {user?.username || 'User'}!
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Here's an overview of your upcoming events
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Stats Card */}
        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              borderRadius: 4,
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <EventAvailable
                    sx={{
                      fontSize: 40,
                      color: '#6366f1',
                    }}
                  />
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {bookedEvents.length}
                    </Typography>
                    <Typography color="text.secondary">
                      Booked Events
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Upcoming Events */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            Your Upcoming Events
          </Typography>
          <Grid container spacing={3}>
            {bookedEvents.length > 0 ? (
              bookedEvents.map((booking) => (
                <Grid item xs={12} md={6} key={booking.id}>
                  <Card
                    sx={{
                      height: '100%',
                      background: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(10px)',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {booking.eventDetails.title}
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CalendarToday fontSize="small" color="primary" />
                          <Typography variant="body2">
                            {formatDate(booking.eventDetails.date)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <AccessTime fontSize="small" color="primary" />
                          <Typography variant="body2">
                            {formatTime(booking.eventDetails.time)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationOn fontSize="small" color="primary" />
                          <Typography variant="body2">
                            {booking.eventDetails.location}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Typography color="text.secondary">
                    You haven't booked any events yet.
                  </Typography>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
