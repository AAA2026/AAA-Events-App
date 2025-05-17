import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../services/api';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const eventData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      date: formData.get('date') as string,
      location: formData.get('location') as string,
      price: parseFloat(formData.get('price') as string),
      capacity: parseInt(formData.get('capacity') as string, 10)
    };

    try {
      await createEvent(eventData);
      navigate('/');
    } catch (err) {
      setError('Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New Event
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Event Title"
            name="title"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            multiline
            rows={4}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="date"
            label="Event Date"
            name="date"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="location"
            label="Location"
            name="location"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="price"
            label="Price"
            name="price"
            type="number"
            inputProps={{
              min: 0,
              step: 0.01
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="capacity"
            label="Capacity"
            name="capacity"
            type="number"
            inputProps={{
              min: 1
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Event'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateEvent; 