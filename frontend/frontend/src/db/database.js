import Dexie from 'dexie';

const db = new Dexie('EventBookingDB');

// Define database schema
db.version(1).stores({
  events: '++id, title, date, location, description, capacity, price, category, imageUrl, createdAt, updatedAt',
  users: '++id, email, name, password, role, createdAt, updatedAt',
  bookings: '++id, eventId, userId, status, quantity, totalPrice, createdAt, updatedAt',
  categories: '++id, name, description',
  notifications: '++id, userId, message, type, read, createdAt'
});

// Add some initial data
db.on('populate', async () => {
  await db.categories.bulkAdd([
    { name: 'Music', description: 'Music concerts and performances' },
    { name: 'Sports', description: 'Sports events and tournaments' },
    { name: 'Arts', description: 'Art exhibitions and galleries' },
    { name: 'Food', description: 'Food festivals and culinary events' },
    { name: 'Technology', description: 'Tech conferences and workshops' }
  ]);
});

export default db; 