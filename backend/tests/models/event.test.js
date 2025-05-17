const { expect } = require('chai');
const { Event } = require('../../models/Event');

describe('Event Model', () => {
  it('should create an event with valid data', async () => {
    const validEvent = {
      title: 'Test Event',
      description: 'Test Description',
      date: new Date(),
      location: 'Test Location',
      price: 100,
      capacity: 50,
      category: 'Conference',
      organizerId: 1,
      status: 'published'
    };

    const event = await Event.create(validEvent);
    expect(event).to.have.property('id');
    expect(event.title).to.equal(validEvent.title);
    expect(event.description).to.equal(validEvent.description);
  });

  it('should not create an event without required fields', async () => {
    try {
      await Event.create({});
      throw new Error('Should not reach this point');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.name).to.equal('SequelizeValidationError');
    }
  });

  it('should validate price is not negative', async () => {
    try {
      await Event.create({
        title: 'Test Event',
        description: 'Test Description',
        date: new Date(),
        location: 'Test Location',
        price: -100,
        capacity: 50,
        category: 'Conference',
        organizerId: 1
      });
      throw new Error('Should not reach this point');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.name).to.equal('SequelizeValidationError');
    }
  });

  it('should validate capacity is positive', async () => {
    try {
      await Event.create({
        title: 'Test Event',
        description: 'Test Description',
        date: new Date(),
        location: 'Test Location',
        price: 100,
        capacity: 0,
        category: 'Conference',
        organizerId: 1
      });
      throw new Error('Should not reach this point');
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.name).to.equal('SequelizeValidationError');
    }
  });
}); 