import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { fetchEvents, createBooking } from '../services/api';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EventIcon from '@mui/icons-material/Event';
import { useTheme } from '@mui/material/styles';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useSelector, useDispatch } from 'react-redux';
import EventCard from '../components/EventCard';
import { selectIsAdmin } from '../store/slices/authSlice';
import { logout } from '../store/slices/authSlice';
import { useTheme as useReduxTheme } from '@mui/material/styles';

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
  const theme = useTheme();

  const loadEvents = useCallback(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  // Get unique categories from events
  const categories = ['all', ...new Set(events.map(event => event.category))];

  const handleBookNow = async (event) => {
    try {
      if (!isAuthenticated) {
        // Redirect to login page with return URL
        navigate(`/login?redirect=/events/${event.id}`);
        return;
      }

      await createBooking({
        eventId: event.id,
        quantity: 1,
      });
      navigate(`/booking-success/${event.id}`);
    } catch (error) {
      console.error('Failed to book event:', error);
      // Handle error (show notification, etc.)
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
      switch (sortBy) {
        case 'date':
          return new Date(a.date) - new Date(b.date);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minWidth: '1200px',
      margin: '0 auto',
    }}>
      <AppBar position="static" elevation={0} sx={{ minWidth: '1200px' }}>
        <Toolbar sx={{ minWidth: '1200px', margin: '0 auto' }}>
          <IconButton edge="start" color="inherit" aria-label="event logo" sx={{ mr: 2 }}>
            <EventIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            BookmyEvent
          </Typography>
          <Button 
            color="inherit" 
            component={Link} 
            to="/events"
            sx={{ mx: 1, fontSize: '1rem' }}
          >
            Browse Events
          </Button>
          {isAuthenticated && (
            <Button 
              color="inherit" 
              component={Link} 
              to="/dashboard"
              sx={{ mx: 1, fontSize: '1rem' }}
            >
              Dashboard
            </Button>
          )}
          {isAdmin && (
            <Button 
              color="inherit" 
              component={Link} 
              to="/admin"
              sx={{ mx: 1, fontSize: '1rem' }}
            >
              Admin Panel
            </Button>
          )}
          {isAuthenticated ? (
            <Button 
              color="inherit"
              onClick={handleLogout}
              sx={{ mx: 1, fontSize: '1rem' }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button 
                color="inherit"
                component={Link}
                to="/login"
                sx={{ mx: 1, fontSize: '1rem' }}
              >
                Login
              </Button>
              <Button 
                variant="contained"
                component={Link}
                to="/register"
                sx={{ 
                  mx: 1,
                  fontSize: '1rem',
                  background: 'linear-gradient(45deg, #6366f1, #a855f7)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #5457ea, #9744f6)',
                  }
                }}
              >
                Sign Up
              </Button>
            </>
          )}
          <Button 
            color="inherit" 
            component={Link} 
            to="/create-event"
            startIcon={<AddIcon />}
            sx={{ mx: 1 }}
          >
            Create Event
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth={false} sx={{ 
        py: 4, 
        width: '1200px',
        margin: '0 auto',
      }}>
        <Box sx={{ mb: { xs: 3, sm: 4, md: 6 } }}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            align="center" 
            sx={{ 
              fontWeight: 700,
              mb: 6,
              fontSize: '2.5rem',
              background: 'linear-gradient(to right, #6366f1, #a855f7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Browse Events
          </Typography>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={6}>
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
                sx={{ 
                  '& .MuiOutlinedInput-root': {
                    height: '50px',
                    fontSize: '1rem'
                  }
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                  sx={{
                    height: '50px',
                    fontSize: '1rem',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat} sx={{ fontSize: '1rem' }}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value)}
                  sx={{
                    height: '50px',
                    fontSize: '1rem',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <MenuItem value="date" sx={{ fontSize: '1rem' }}>Date</MenuItem>
                  <MenuItem value="price-low" sx={{ fontSize: '1rem' }}>Price: Low to High</MenuItem>
                  <MenuItem value="price-high" sx={{ fontSize: '1rem' }}>Price: High to Low</MenuItem>
                  <MenuItem value="title" sx={{ fontSize: '1rem' }}>Title</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={loadEvents}
                disabled={loading}
                sx={{ 
                  height: '50px',
                  fontSize: '1rem'
                }}
              >
                Refresh
              </Button>
            </Grid>
          </Grid>

          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
              <CircularProgress size={60} thickness={4} />
            </Box>
          ) : error ? (
            <Card sx={{ textAlign: 'center', py: 4, bgcolor: 'error.light' }}>
              <Typography color="error" gutterBottom sx={{ fontSize: '1.1rem' }}>
                {error}
              </Typography>
              <Button
                variant="contained"
                onClick={loadEvents}
                startIcon={<RefreshIcon />}
                sx={{ mt: 2, fontSize: '1rem' }}
              >
                Try Again
              </Button>
            </Card>
          ) : filteredAndSortedEvents.length === 0 ? (
            <Card sx={{ textAlign: 'center', py: 4 }}>
              <Typography color="text.secondary" gutterBottom sx={{ fontSize: '1.1rem' }}>
                {searchTerm ? 'No events match your search.' : 'No events available at the moment.'}
              </Typography>
              <Button
                variant="contained"
                component={Link}
                to="/create-event"
                startIcon={<AddIcon />}
                sx={{ mt: 2, fontSize: '1rem' }}
              >
                Create Event
              </Button>
            </Card>
          ) : (
            <Grid container spacing={3}>
              {filteredAndSortedEvents.map((event) => (
                <Grid item key={event.id} xs={4}>
                  <EventCard
                    event={event}
                    isBooked={isEventBooked(event.id)}
                    onBookNow={handleBookNow}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default Events;
