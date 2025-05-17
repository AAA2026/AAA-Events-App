import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Container, 
  TextField, 
  InputAdornment, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  CircularProgress 
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import EventCard from '../components/EventCard';
import { selectIsAdmin } from '../store/slices/authSlice';
import { fetchEvents } from '../store/slices/eventsSlice';
import { createBooking } from '../store/slices/bookingsSlice';

function Events() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const events = useSelector((state) => state.events.events);
  const userBookings = useSelector((state) => state.bookings.bookings);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector(selectIsAdmin);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    loadEvents();
  }, [dispatch]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      await dispatch(fetchEvents());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories from events
  const categories = ['all', ...new Set(events.map(event => event.category))];

  const handleBookNow = async (event) => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=/events/${event.id}`);
      return;
    }

    try {
      await createBooking({
        eventId: event.id,
        quantity: 1,
      });
      navigate(`/booking-success/${event.id}`);
    } catch (error) {
      console.error('Failed to book event:', error);
      setError('Failed to book event. Please try again.');
    }
  };

  const isEventBooked = (eventId) => {
    return isAuthenticated && userBookings.some(booking => booking.eventId === eventId);
  };

  // Filter and sort events
  const filteredAndSortedEvents = events
    .filter(event => {
      const matchesSearch = (
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const matchesCategory = category === 'all' || event.category === category;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date) - new Date(b.date);
      }
      if (sortBy === 'price') {
        return a.price - b.price;
      }
      return 0;
    });

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4, mt: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="Sort By"
            >
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="price">Price</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ textAlign: 'center', my: 4, color: 'error.main' }}>
          {error}
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {filteredAndSortedEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isBooked={isEventBooked(event.id)}
              onBookNow={handleBookNow}
            />
          ))}
        </Box>
      )}
    </Container>
  );
}

export default Events; 