import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Event related API calls
export const fetchEvents = async () => {
  try {
    const response = await api.get('/events');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch events');
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await api.post('/events', eventData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create event');
  }
};

export const updateEvent = async (id, eventData) => {
  try {
    const response = await api.put(`/events/${id}`, eventData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update event');
  }
};

export const deleteEvent = async (id) => {
  return axios.delete(`${API_URL}/events/${id}`);
};

// Booking related API calls
export const createBooking = async (bookingData) => {
  return axios.post(`${API_URL}/bookings`, bookingData);
};

export const getUserBookings = async () => {
  return axios.get(`${API_URL}/bookings/user`);
};

export default API_URL; 