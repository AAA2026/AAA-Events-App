const sequelize = require('../config/database');
const User = require('../models/User');
const Event = require('../models/Event');
const Booking = require('../models/Booking');

async function initializeDatabase() {
  try {
    // Test the connection
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');

    // Sync all models
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully.');

    // Add some sample data
    const user1 = await User.create({
      name: 'John Doe',
      email: 'john@example.com'
    });

    const event1 = await Event.create({
      title: 'Summer Music Festival',
      description: 'A fantastic summer music festival featuring top artists',
      date: new Date('2024-07-15'),
      location: 'Central Park',
      price: 49.99,
      capacity: 1000
    });

    await Booking.create({
      userId: user1.id,
      eventId: event1.id,
      numberOfTickets: 2,
      totalPrice: 99.98,
      status: 'confirmed'
    });

    console.log('Sample data created successfully.');

  } catch (error) {
    console.error('Unable to initialize database:', error);
  }
}

initializeDatabase(); 