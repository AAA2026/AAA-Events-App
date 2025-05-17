const request = require('supertest');
const { expect } = require('chai');
const app = require('../../server');
const { Event } = require('../../models/Event');
const { User } = require('../../models/User');
const jwt = require('jsonwebtoken');

describe('Events Routes', () => {
  let token;
  let adminUser;

  before(async () => {
    // Create admin user
    adminUser = await User.create({
      username: 'admin',
      email: 'admin@test.com',
      password: 'password123',
      role: 'admin'
    });

    // Generate token
    token = jwt.sign(
      { userId: adminUser.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  });

  describe('GET /api/events', () => {
    it('should return all events', async () => {
      const response = await request(app)
        .get('/api/events')
        .expect(200);

      expect(response.body).to.have.property('events');
      expect(response.body).to.have.property('totalEvents');
    });

    it('should return filtered events', async () => {
      const response = await request(app)
        .get('/api/events')
        .query({ category: 'Conference' })
        .expect(200);

      expect(response.body.events).to.be.an('array');
    });
  });

  describe('POST /api/events', () => {
    it('should create a new event when authenticated as admin', async () => {
      const newEvent = {
        title: 'Test Event',
        description: 'Test Description',
        date: new Date(),
        location: 'Test Location',
        price: 100,
        capacity: 50,
        category: 'Conference'
      };

      const response = await request(app)
        .post('/api/events')
        .set('Authorization', `Bearer ${token}`)
        .send(newEvent)
        .expect(201);

      expect(response.body).to.have.property('id');
      expect(response.body.title).to.equal(newEvent.title);
    });

    it('should not create event without authentication', async () => {
      const newEvent = {
        title: 'Test Event',
        description: 'Test Description',
        date: new Date(),
        location: 'Test Location',
        price: 100,
        capacity: 50,
        category: 'Conference'
      };

      await request(app)
        .post('/api/events')
        .send(newEvent)
        .expect(401);
    });
  });

  describe('PUT /api/events/:id', () => {
    let eventId;

    before(async () => {
      const event = await Event.create({
        title: 'Test Event',
        description: 'Test Description',
        date: new Date(),
        location: 'Test Location',
        price: 100,
        capacity: 50,
        category: 'Conference',
        organizerId: adminUser.id
      });
      eventId = event.id;
    });

    it('should update event when authenticated as admin', async () => {
      const updates = {
        title: 'Updated Event',
        price: 150
      };

      const response = await request(app)
        .put(`/api/events/${eventId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updates)
        .expect(200);

      expect(response.body.title).to.equal(updates.title);
      expect(response.body.price).to.equal(updates.price);
    });
  });

  after(async () => {
    // Cleanup
    await Event.destroy({ where: {} });
    await User.destroy({ where: {} });
  });
}); 