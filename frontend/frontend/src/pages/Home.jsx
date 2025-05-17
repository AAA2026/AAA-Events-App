import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import EventCard from '../components/EventCard';
import { fetchEvents } from '../store/slices/eventsSlice';
import { createBooking } from '../services/api';

const Home = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const userBookings = useSelector((state) => state.bookings.bookings);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isEventBooked = (eventId) => {
    return userBookings.some(booking => booking.eventId === eventId);
  };

  const handleBookNow = async (event) => {
    try {
      await createBooking({
        eventId: event.id,
        // Add any additional booking data needed
      });
      // Optionally refresh the bookings list
      // dispatch(fetchUserBookings());
    } catch (error) {
      console.error('Failed to book event:', error);
      // Handle error (show notification, etc.)
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 6 }}>
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
          Upcoming Events
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search events by title, description, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            mt: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Grid container spacing={4}>
        {filteredEvents.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <EventCard
              event={event}
              isBooked={isEventBooked(event.id)}
              onBookNow={handleBookNow}
            />
          </Grid>
        ))}
      </Grid>

      {filteredEvents.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
          }}
        >
          <Typography variant="h5" color="text.secondary">
            No events found matching your search.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Home; 