import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <EventIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Event Booking
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={RouterLink} to="/">
            Events
          </Button>
          <Button color="inherit" component={RouterLink} to="/bookings">
            My Bookings
          </Button>
          <Button color="inherit" component={RouterLink} to="/create-event">
            Create Event
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 