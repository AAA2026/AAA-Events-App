import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  CardActions,
  Divider,
} from '@mui/material';
import {
  LocationOn,
  CalendarToday,
  AccessTime,
  AttachMoney,
  Person,
} from '@mui/icons-material';

const EventCard = ({ event, onAction, actionLabel = "View Details" }) => {
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

  return (
    <Card 
      elevation={2}
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={event.image_url || '/default-event.jpg'}
        alt={event.title}
        sx={{
          objectFit: 'cover',
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          {event.title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            height: '4.5em',
          }}
        >
          {event.description}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOn fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="body2">{event.venue}</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <CalendarToday fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="body2">{formatDate(event.date)}</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AccessTime fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="body2">{formatTime(event.time)}</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <AttachMoney fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="body2">${event.price}</Typography>
        </Box>

        {event.organizer && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Person fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="body2">{event.organizer}</Typography>
          </Box>
        )}
      </CardContent>

      <Divider />
      
      <CardActions sx={{ p: 2 }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Chip 
            label={event.category} 
            size="small" 
            color="primary" 
            variant="outlined"
            sx={{ borderRadius: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={onAction}
            sx={{
              borderRadius: 1,
              textTransform: 'none',
              px: 3,
            }}
          >
            {actionLabel}
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default EventCard; 