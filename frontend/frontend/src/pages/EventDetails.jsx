import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Paper,
  Chip,
  Divider,
} from '@mui/material';
import {
  CalendarToday,
  LocationOn,
  AccessTime,
  Category as CategoryIcon,
  AttachMoney,
} from '@mui/icons-material';
import { createBooking } from '../services/api';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const event = useSelector((state) =>
    state.events.events.find(e => e.id === id)
  );
  const userBookings = useSelector((state) => state.bookings.bookings);
  const isBooked = userBookings.some(booking => booking.eventId === id);

  if (!event) {
    return (
      <Container>
        <Typography variant="h5" align="center" sx={{ mt: 4 }}>
          Event not found
        </Typography>
      </Container>
    );
  }

  const handleBookNow = async () => {
    try {
      await createBooking({
        eventId: event.id,
        quantity: 1,
      });
      // Navigate to congratulations page
      navigate(`/booking-success/${event.id}`);
    } catch (error) {
      console.error('Failed to book event:', error);
      // Handle error (show notification, etc.)
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          overflow: 'hidden',
          borderRadius: 4,
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={event.image || 'https://source.unsplash.com/random?event'}
              alt={event.title}
              sx={{
                width: '100%',
                height: '100%',
                minHeight: 400,
                objectFit: 'cover',
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 4 }}>
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
                {event.title}
              </Typography>

              <Box sx={{ mb: 4 }}>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {event.description}
                </Typography>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CategoryIcon color="primary" />
                    <Typography variant="body1">
                      Category: {event.category}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarToday color="primary" />
                    <Typography variant="body1">
                      Date: {formatDate(event.date)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTime color="primary" />
                    <Typography variant="body1">
                      Time: {formatTime(event.time)}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOn color="primary" />
                    <Typography variant="body1">
                      Venue: {event.location}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AttachMoney color="primary" />
                    <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
                      ${event.price}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {isBooked ? (
                <Chip
                  label="Already Booked"
                  color="success"
                  sx={{
                    p: 3,
                    background: 'linear-gradient(45deg, #10B981, #34D399)',
                    color: 'white',
                  }}
                />
              ) : (
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleBookNow}
                  sx={{
                    py: 2,
                    background: 'linear-gradient(45deg, #6366f1, #a855f7)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #4f46e5, #9333ea)',
                    },
                  }}
                >
                  Book Now
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default EventDetails; 