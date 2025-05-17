const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Event = require('../models/event');
const { auth } = require('../middleware/auth');

// Get all bookings for a user
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.findByUserId(req.user.id);
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

// Get single booking
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Check if the booking belongs to the user or if the user is an admin
    if (booking.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this booking' });
    }
    
    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ message: 'Error fetching booking' });
  }
});

// Create booking
router.post('/', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.body.eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if event has enough capacity
    const currentBookings = await Booking.getTotalBookingsForEvent(event.id);
    const remainingCapacity = event.capacity - currentBookings;
    
    if (remainingCapacity < req.body.numberOfTickets) {
      return res.status(400).json({ 
        message: `Not enough tickets available. Only ${remainingCapacity} tickets left.` 
      });
    }

    // Calculate total price
    const totalPrice = event.price * req.body.numberOfTickets;

    const booking = await Booking.create({
      userId: req.user.id,
      eventId: req.body.eventId,
      numberOfTickets: req.body.numberOfTickets,
      totalPrice,
      status: 'confirmed'
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(400).json({ message: 'Error creating booking' });
  }
});

// Update booking status
router.put('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if the booking belongs to the user or if the user is an admin
    if (booking.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this booking' });
    }

    const updatedBooking = await Booking.update(req.params.id, { 
      status: req.body.status 
    });
    res.json(updatedBooking);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(400).json({ message: 'Error updating booking' });
  }
});

// Cancel booking
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if the booking belongs to the user or if the user is an admin
    if (booking.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    await Booking.update(req.params.id, { status: 'cancelled' });
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Error cancelling booking' });
  }
});

module.exports = router; 