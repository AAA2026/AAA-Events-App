const pool = require('../config/database');

class Event {
  static async findById(id) {
    const [rows] = await pool.execute(`
      SELECT e.*, u.username as organizerName 
      FROM events e 
      LEFT JOIN users u ON e.organizerId = u.id 
      WHERE e.id = ?
    `, [id]);
    return rows[0];
  }

  static async findAll(filters = {}) {
    let query = `
      SELECT e.*, u.username as organizerName 
      FROM events e 
      LEFT JOIN users u ON e.organizerId = u.id 
      WHERE 1=1
    `;
    const values = [];

    if (filters.category) {
      query += ' AND e.category = ?';
      values.push(filters.category);
    }
    if (filters.status) {
      query += ' AND e.status = ?';
      values.push(filters.status);
    }
    if (filters.organizerId) {
      query += ' AND e.organizerId = ?';
      values.push(filters.organizerId);
    }

    query += ' ORDER BY e.date DESC';

    const [rows] = await pool.execute(query, values);
    return rows;
  }

  static async create(eventData) {
    const {
      title,
      description,
      date,
      location,
      price,
      image_url,
      image_key,
      category,
      tags,
      capacity,
      organizerId,
      status = 'draft'
    } = eventData;

    const [result] = await pool.execute(
      `INSERT INTO events (
        title, description, date, location, price, 
        image_url, image_key, category, tags, capacity, 
        organizerId, status, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        title, description, date, location, price,
        image_url, image_key, category, JSON.stringify(tags), capacity,
        organizerId, status
      ]
    );

    return this.findById(result.insertId);
  }

  static async update(id, eventData) {
    const updates = [];
    const values = [];

    const updateableFields = [
      'title', 'description', 'date', 'location', 'price',
      'image_url', 'image_key', 'category', 'tags', 'capacity',
      'status'
    ];

    updateableFields.forEach(field => {
      if (field in eventData) {
        updates.push(`${field} = ?`);
        values.push(field === 'tags' ? JSON.stringify(eventData[field]) : eventData[field]);
      }
    });

    if (updates.length === 0) return this.findById(id);

    updates.push('updatedAt = NOW()');
    values.push(id);

    const query = `UPDATE events SET ${updates.join(', ')} WHERE id = ?`;
    await pool.execute(query, values);

    return this.findById(id);
  }

  static async delete(id) {
    await pool.execute('DELETE FROM events WHERE id = ?', [id]);
    return true;
  }
}

module.exports = Event; 