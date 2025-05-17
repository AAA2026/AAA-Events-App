const express = require('express');
const router = express.Router();
const multer = require('multer');
const { S3Client, PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');
const { auth, isAdmin, isUser } = require('../middleware/auth');
const pool = require('../config/database');

// S3 configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// Multer configuration for image upload
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Please upload an image file'));
    }
    cb(null, true);
  }
});

// Get all events with pagination (public)
router.get('/', async (req, res) => {
  try {
    const [events] = await pool.query(`
      SELECT e.*, u.username as organizerName 
      FROM Events e 
      LEFT JOIN Users u ON e.organizerId = u.id 
      ORDER BY e.date DESC
    `);
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Error fetching events' });
  }
});

// Get single event (public)
router.get('/:id', async (req, res) => {
  try {
    const [events] = await pool.query(`
      SELECT e.*, u.username as organizerName 
      FROM Events e 
      LEFT JOIN Users u ON e.organizerId = u.id 
      WHERE e.id = ?
    `, [req.params.id]);

    if (events.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(events[0]);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: 'Error fetching event' });
  }
});

// Create event (admin only)
router.post('/', auth, isAdmin, upload.single('image'), async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      venue,
      category,
      price,
      capacity,
    } = req.body;

    let image_url = null;
    let image_key = null;

    if (req.file) {
      image_key = `events/${uuidv4()}-${req.file.originalname}`;
      
      await s3Client.send(new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: image_key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
      }));

      image_url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${image_key}`;
    }

    const [result] = await pool.query(`
      INSERT INTO Events (
        title, description, date, venue, category, price, 
        capacity, image_url, image_key, organizerId, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `, [
      title, description, date, venue, category, price,
      capacity, image_url, image_key, req.user.id
    ]);

    const [newEvent] = await pool.query('SELECT * FROM Events WHERE id = ?', [result.insertId]);
    res.status(201).json(newEvent[0]);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Error creating event' });
  }
});

// Update event (admin only)
router.put('/:id', auth, isAdmin, upload.single('image'), async (req, res) => {
  try {
    const [events] = await pool.query('SELECT * FROM Events WHERE id = ?', [req.params.id]);
    
    if (events.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const event = events[0];
    let image_url = event.image_url;
    let image_key = event.image_key;

    if (req.file) {
      // Delete old image if exists
      if (event.image_key) {
        await s3Client.send(new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: event.image_key
        }));
      }

      // Upload new image
      image_key = `events/${uuidv4()}-${req.file.originalname}`;
      await s3Client.send(new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: image_key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
      }));

      image_url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${image_key}`;
    }

    const {
      title,
      description,
      date,
      venue,
      category,
      price,
      capacity,
    } = req.body;

    await pool.query(`
      UPDATE Events 
      SET title = ?, description = ?, date = ?, venue = ?, 
          category = ?, price = ?, capacity = ?, 
          image_url = ?, image_key = ?, updatedAt = NOW()
      WHERE id = ?
    `, [
      title, description, date, venue,
      category, price, capacity,
      image_url, image_key, req.params.id
    ]);

    const [updatedEvent] = await pool.query('SELECT * FROM Events WHERE id = ?', [req.params.id]);
    res.json(updatedEvent[0]);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Error updating event' });
  }
});

// Delete event (admin only)
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const [events] = await pool.query('SELECT * FROM Events WHERE id = ?', [req.params.id]);
    
    if (events.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const event = events[0];

    // Delete image from S3 if exists
    if (event.image_key) {
      await s3Client.send(new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: event.image_key
      }));
    }

    await pool.query('DELETE FROM Events WHERE id = ?', [req.params.id]);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Error deleting event' });
  }
});

// Search events with pagination
router.get('/search', async (req, res) => {
  try {
    const { query, category, minPrice, maxPrice, date, page = 1, limit = 10 } = req.query;
    
    let sqlQuery = `
      SELECT e.*, u.username as organizerName 
      FROM Events e 
      LEFT JOIN Users u ON e.organizerId = u.id 
      WHERE 1=1
    `;
    const values = [];

    if (query) {
      sqlQuery += ` AND (
        title LIKE ? OR 
        description LIKE ? OR 
        venue LIKE ?
      )`;
      const searchTerm = `%${query}%`;
      values.push(searchTerm, searchTerm, searchTerm);
    }

    if (category) {
      sqlQuery += ` AND category = ?`;
      values.push(category);
    }

    if (minPrice) {
      sqlQuery += ` AND price >= ?`;
      values.push(minPrice);
    }

    if (maxPrice) {
      sqlQuery += ` AND price <= ?`;
      values.push(maxPrice);
    }

    if (date) {
      sqlQuery += ` AND DATE(date) = ?`;
      values.push(date);
    }

    // Add pagination
    const offset = (page - 1) * limit;
    sqlQuery += ` LIMIT ? OFFSET ?`;
    values.push(parseInt(limit), offset);

    const [events] = await pool.query(sqlQuery, values);
    res.json(events);
  } catch (error) {
    console.error('Error searching events:', error);
    res.status(500).json({ message: 'Error searching events' });
  }
});

module.exports = router; 