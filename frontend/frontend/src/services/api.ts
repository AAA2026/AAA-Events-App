import axios from 'axios';
import { Event, Booking, User } from '../types';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Events
export const getEvents = () => api.get<Event[]>('/events');
export const getEvent = (id: number) => api.get<Event>(`/events/${id}`);
export const createEvent = (event: Partial<Event>) => api.post<Event>('/events', event);
export const updateEvent = (id: number, event: Partial<Event>) => api.put<Event>(`/events/${id}`, event);
export const deleteEvent = (id: number) => api.delete(`/events/${id}`);

// Bookings
export const getBookings = () => api.get<Booking[]>('/bookings');
export const getBooking = (id: number) => api.get<Booking>(`/bookings/${id}`);
export const createBooking = (booking: Partial<Booking>) => api.post<Booking>('/bookings', booking);
export const updateBooking = (id: number, status: string) => api.put<Booking>(`/bookings/${id}`, { status });
export const cancelBooking = (id: number) => api.delete(`/bookings/${id}`);

// Users
export const getUsers = () => api.get<User[]>('/users');
export const getUser = (id: number) => api.get<User>(`/users/${id}`);
export const createUser = (user: Partial<User>) => api.post<User>('/users', user);
export const updateUser = (id: number, user: Partial<User>) => api.put<User>(`/users/${id}`, user);

export default api; 