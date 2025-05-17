const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Booking = require('../models/Booking');
const Event = require('../models/Event');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email']
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Get single user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email'],
      include: [{
        model: Booking,
        include: [Event]
      }]
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// Create user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user' });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.update(req.body);
    res.json({
      id: user.id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    res.status(400).json({ message: 'Error updating user' });
  }
});

module.exports = router; 