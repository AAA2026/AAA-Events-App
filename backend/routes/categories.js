const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { auth, isAdmin } = require('../middleware/auth');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM categories ORDER BY name ASC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories' });
  }
});

// Get single category
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM categories WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Error fetching category' });
  }
});

// Create category (admin only)
router.post('/', auth, isAdmin, async (req, res) => {
  try {
    const { name, description } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO categories (name, description, createdAt, updatedAt) VALUES (?, ?, NOW(), NOW())',
      [name, description]
    );
    
    const [newCategory] = await pool.execute('SELECT * FROM categories WHERE id = ?', [result.insertId]);
    res.status(201).json(newCategory[0]);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(400).json({ message: 'Error creating category' });
  }
});

// Update category (admin only)
router.put('/:id', auth, isAdmin, async (req, res) => {
  try {
    const { name, description } = req.body;
    const [result] = await pool.execute(
      'UPDATE categories SET name = ?, description = ?, updatedAt = NOW() WHERE id = ?',
      [name, description, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    const [updatedCategory] = await pool.execute('SELECT * FROM categories WHERE id = ?', [req.params.id]);
    res.json(updatedCategory[0]);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(400).json({ message: 'Error updating category' });
  }
});

// Delete category (admin only)
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    // Check if category has any events
    const [events] = await pool.execute('SELECT COUNT(*) as count FROM events WHERE categoryId = ?', [req.params.id]);
    if (events[0].count > 0) {
      return res.status(400).json({ message: 'Cannot delete category with associated events' });
    }

    const [result] = await pool.execute('DELETE FROM categories WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Error deleting category' });
  }
});

module.exports = router; 