import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip
} from '@mui/material';
import { Event } from '../types';
import { useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();
  const eventDate = new Date(event.date).toLocaleDateString();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {event.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {event.description}
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOnIcon color="action" fontSize="small" />
            <Typography variant="body2">{event.location}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarTodayIcon color="action" fontSize="small" />
            <Typography variant="body2">{eventDate}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AttachMoneyIcon color="action" fontSize="small" />
            <Typography variant="body2">${event.price}</Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Chip 
            label={`${event.capacity} spots available`}
            color="primary"
            size="small"
          />
        </Box>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          color="primary"
          onClick={() => navigate(`/events/${event.id}`)}
        >
          View Details
        </Button>
        <Button 
          size="small" 
          color="primary"
          onClick={() => navigate(`/events/${event.id}/book`)}
        >
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventCard; 