import React from 'react';
import { useNavigate } from 'react-router-dom';
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
} from '@mui/icons-material';

const EventCard = ({ event, isBooked, onBookNow }) => {
  const navigate = useNavigate();

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
      sx={{
        height: '450px',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={event.image || 'https://source.unsplash.com/random?event'}
        alt={event.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 600,
            fontSize: '1.25rem',
            height: '60px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {event.title}
        </Typography>

        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarToday sx={{ color: 'primary.main', fontSize: '1.2rem' }} />
            <Typography variant="body1" sx={{ fontSize: '1rem' }}>
              {formatDate(event.date)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccessTime sx={{ color: 'primary.main', fontSize: '1.2rem' }} />
            <Typography variant="body1" sx={{ fontSize: '1rem' }}>
              {formatTime(event.time)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOn sx={{ color: 'primary.main', fontSize: '1.2rem' }} />
            <Typography
              variant="body1"
              sx={{
                fontSize: '1rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {event.location}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AttachMoney sx={{ color: 'primary.main', fontSize: '1.2rem' }} />
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
              ${event.price}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <Divider />

      <CardActions sx={{ p: 2, justifyContent: 'space-between' }}>
        <Button
          size="large"
          onClick={() => navigate(`/events/${event.id}`)}
          sx={{ fontSize: '1rem' }}
        >
          View Details
        </Button>
        {isBooked ? (
          <Chip
            label="Booked"
            color="primary"
            sx={{
              fontSize: '0.9rem',
              background: 'linear-gradient(45deg, #6366f1, #a855f7)',
            }}
          />
        ) : (
          <Button
            size="large"
            variant="contained"
            onClick={() => onBookNow(event)}
            sx={{
              fontSize: '1rem',
              background: 'linear-gradient(45deg, #6366f1, #a855f7)',
              '&:hover': {
                background: 'linear-gradient(45deg, #5457ea, #9744f6)',
              },
            }}
          >
            Book Now
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default EventCard; 