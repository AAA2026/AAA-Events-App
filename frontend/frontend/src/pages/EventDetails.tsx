import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  TextField,
  CircularProgress,
  Alert,
  Grid,
  Divider
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { getEvent, createBooking } from '../services/api';
import { Event } from '../types';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupIcon from '@mui/icons-material/Group';

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tickets, setTickets] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEvent(Number(id));
        setEvent(response.data);
      } catch (err) {
        setError('Failed to fetch event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleBooking = async () => {
    if (!event) return;

    setBookingLoading(true);
    try {
      await createBooking({
        eventId: event.id,
        numberOfTickets: tickets,
        totalPrice: event.price * tickets
      });
      navigate('/bookings');
    } catch (err) {
      setError('Failed to create booking');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !event) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Alert severity="error">{error || 'Event not found'}</Alert>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {event.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {event.description}
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOnIcon color="action" />
              <Typography>{event.location}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarTodayIcon color="action" />
              <Typography>{new Date(event.date).toLocaleString()}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AttachMoneyIcon color="action" />
              <Typography>${event.price}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <GroupIcon color="action" />
              <Typography>{event.capacity} spots available</Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Book Tickets
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <TextField
              type="number"
              label="Number of Tickets"
              value={tickets}
              onChange={(e) => setTickets(Math.max(1, Math.min(event.capacity, parseInt(e.target.value))))}
              inputProps={{ min: 1, max: event.capacity }}
              sx={{ width: 150 }}
            />
            <Typography>
              Total: ${(event.price * tickets).toFixed(2)}
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={handleBooking}
            disabled={bookingLoading}
            fullWidth
          >
            {bookingLoading ? 'Booking...' : 'Book Now'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EventDetails; 