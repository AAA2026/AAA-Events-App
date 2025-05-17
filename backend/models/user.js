const bcrypt = require('bcryptjs');
const pool = require('../config/database');

class User {
  static async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async create(userData) {
    const { username, email, password, role = 'user' } = userData;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())',
      [username, email, hashedPassword, role]
    );
    
    return { id: result.insertId, username, email, role };
  }

  static async update(id, userData) {
    const updates = [];
    const values = [];
    
    if (userData.username) {
      updates.push('username = ?');
      values.push(userData.username);
    }
    if (userData.email) {
      updates.push('email = ?');
      values.push(userData.email);
    }
    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      updates.push('password = ?');
      values.push(hashedPassword);
    }
    if (userData.role) {
      updates.push('role = ?');
      values.push(userData.role);
    }

    updates.push('updatedAt = NOW()');
    values.push(id);

    const query = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
    await pool.execute(query, values);
    
    return this.findById(id);
  }

  static async comparePassword(hashedPassword, candidatePassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}

module.exports = User;
