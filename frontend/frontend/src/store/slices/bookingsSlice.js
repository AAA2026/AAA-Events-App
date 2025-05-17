import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import db from '../../db/database';

export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async (userId, { rejectWithValue }) => {
    try {
      const bookings = await db.bookings
        .where('userId')
        .equals(userId)
        .toArray();

      // Fetch event details for each booking
      const bookingsWithEvents = await Promise.all(
        bookings.map(async (booking) => {
          const event = await db.events.get(booking.eventId);
          return { ...booking, event };
        })
      );

      return bookingsWithEvents;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async ({ eventId, userId, quantity }, { rejectWithValue }) => {
    try {
      const event = await db.events.get(eventId);
      if (!event) {
        throw new Error('Event not found');
      }

      const totalPrice = event.price * quantity;
      const booking = {
        eventId,
        userId,
        quantity,
        totalPrice,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const id = await db.bookings.add(booking);
      return { id, ...booking, event };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBookingStatus = createAsyncThunk(
  'bookings/updateBookingStatus',
  async ({ bookingId, status }, { rejectWithValue }) => {
    try {
      await db.bookings.update(bookingId, {
        status,
        updatedAt: new Date().toISOString(),
      });

      const booking = await db.bookings.get(bookingId);
      const event = await db.events.get(booking.eventId);
      return { ...booking, event };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  bookings: [],
  status: 'idle',
  error: null,
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    clearBookings: (state) => {
      state.bookings = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
      })
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        const index = state.bookings.findIndex(
          (booking) => booking.id === action.payload.id
        );
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
      });
  },
});

export const { clearBookings } = bookingsSlice.actions;
export default bookingsSlice.reducer; 