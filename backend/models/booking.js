const pool = require('../config/database');

class Booking {
  static async findById(id) {
    const [rows] = await pool.execute(`
      SELECT b.*, 
             e.title as eventTitle, e.date as eventDate, e.location as eventLocation,
             u.username as userName
      FROM bookings b
      LEFT JOIN events e ON b.eventId = e.id
      LEFT JOIN users u ON b.userId = u.id
      WHERE b.id = ?
    `, [id]);
    return rows[0];
  }

  static async findByUserId(userId) {
    const [rows] = await pool.execute(`
      SELECT b.*, 
             e.title as eventTitle, e.date as eventDate, e.location as eventLocation
      FROM bookings b
      LEFT JOIN events e ON b.eventId = e.id
      WHERE b.userId = ?
      ORDER BY b.createdAt DESC
    `, [userId]);
    return rows;
  }

  static async findByEventId(eventId) {
    const [rows] = await pool.execute(`
      SELECT b.*, u.username as userName
      FROM bookings b
      LEFT JOIN users u ON b.userId = u.id
      WHERE b.eventId = ?
      ORDER BY b.createdAt DESC
    `, [eventId]);
    return rows;
  }

  static async create(bookingData) {
    const {
      userId,
      eventId,
      numberOfTickets,
      totalPrice,
      status = 'confirmed'
    } = bookingData;

    const [result] = await pool.execute(
      `INSERT INTO bookings (
        userId, eventId, numberOfTickets, totalPrice, 
        status, createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
      [userId, eventId, numberOfTickets, totalPrice, status]
    );

    return this.findById(result.insertId);
  }

  static async update(id, bookingData) {
    const updates = [];
    const values = [];

    const updateableFields = [
      'numberOfTickets',
      'totalPrice',
      'status'
    ];

    updateableFields.forEach(field => {
      if (field in bookingData) {
        updates.push(`${field} = ?`);
        values.push(bookingData[field]);
      }
    });

    if (updates.length === 0) return this.findById(id);

    updates.push('updatedAt = NOW()');
    values.push(id);

    const query = `UPDATE bookings SET ${updates.join(', ')} WHERE id = ?`;
    await pool.execute(query, values);

    return this.findById(id);
  }

  static async delete(id) {
    await pool.execute('DELETE FROM bookings WHERE id = ?', [id]);
    return true;
  }

  static async getTotalBookingsForEvent(eventId) {
    const [rows] = await pool.execute(
      'SELECT SUM(numberOfTickets) as total FROM bookings WHERE eventId = ? AND status = ?',
      [eventId, 'confirmed']
    );
    return rows[0].total || 0;
  }

  static async getBookingsByDateRange(startDate, endDate) {
    const [rows] = await pool.execute(`
      SELECT b.*, 
             e.title as eventTitle, e.date as eventDate,
             u.username as userName
      FROM bookings b
      LEFT JOIN events e ON b.eventId = e.id
      LEFT JOIN users u ON b.userId = u.id
      WHERE b.createdAt BETWEEN ? AND ?
      ORDER BY b.createdAt DESC
    `, [startDate, endDate]);
    return rows;
  }
}

module.exports = Booking; 