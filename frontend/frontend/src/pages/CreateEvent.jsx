import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import Header from '../components/Header';
import { createEvent } from '../services/api';

function CreateEvent() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    price: '',
    capacity: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.date) newErrors.date = 'Date is required';
    if (!form.location.trim()) newErrors.location = 'Location is required';
    if (!form.price || form.price <= 0) newErrors.price = 'Valid price is required';
    if (!form.capacity || form.capacity < 1) newErrors.capacity = 'Valid capacity is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await createEvent({
        ...form,
        price: parseFloat(form.price),
        capacity: parseInt(form.capacity, 10)
      });
      setSuccess(true);
      setForm({ title: '', description: '', date: '', location: '', price: '', capacity: '' });
      setTimeout(() => navigate('/events'), 1500);
    } catch (err) {
      setError('Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Header />

      <Container 
        maxWidth="md" 
        sx={{ 
          mt: { xs: 2, sm: 4, md: 8 }, 
          mb: { xs: 2, sm: 4, md: 8 },
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'center',
        }}
      >
        <Fade in={true} timeout={500}>
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 2, sm: 3, md: 4 }, 
              borderRadius: { xs: 2, sm: 3, md: 4 },
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(203, 213, 225, 0.3)',
            }}
          >
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom 
              align="center" 
              sx={{ 
                fontWeight: 700,
                mb: { xs: 2, sm: 3, md: 4 },
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
                background: 'linear-gradient(to right, #6366f1, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Create New Event
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: { xs: 2, sm: 3 } }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: { xs: 2, sm: 3 } }}>
                Event created successfully! Redirecting...
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={{ xs: 2, sm: 3 }}>
                <Grid item xs={12}>
                  <TextField
                    label="Event Title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    fullWidth
                    required
                    variant="outlined"
                    error={!!errors.title}
                    helperText={errors.title}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    fullWidth
                    required
                    multiline
                    minRows={3}
                    variant="outlined"
                    error={!!errors.description}
                    helperText={errors.description}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Date"
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    fullWidth
                    required
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    error={!!errors.date}
                    helperText={errors.date}
                    inputProps={{
                      min: new Date().toISOString().split('T')[0]
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Location"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    fullWidth
                    required
                    variant="outlined"
                    error={!!errors.location}
                    helperText={errors.location}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Price"
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    fullWidth
                    required
                    inputProps={{ min: 0, step: 0.01 }}
                    variant="outlined"
                    error={!!errors.price}
                    helperText={errors.price}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Capacity"
                    name="capacity"
                    type="number"
                    value={form.capacity}
                    onChange={handleChange}
                    fullWidth
                    required
                    inputProps={{ min: 1 }}
                    variant="outlined"
                    error={!!errors.capacity}
                    helperText={errors.capacity}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <AddIcon />}
                    sx={{
                      mt: { xs: 2, sm: 3 },
                      py: { xs: 1.5, sm: 2 },
                      fontSize: { xs: '1rem', sm: '1.125rem' },
                    }}
                  >
                    {loading ? 'Creating Event...' : 'Create Event'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}

export default CreateEvent;
