const mysql = require('mysql2/promise');
require('dotenv').config();

// Validate environment variables
const DB_NAME = process.env.DB_NAME || 'event_booking';
const DB_USER = process.env.DB_USER || 'event_user';
const DB_PASSWORD = process.env.DB_PASSWORD || 'Balo248:';
const DB_HOST = process.env.DB_HOST || 'localhost';

if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST) {
  console.error('Missing database configuration:');
  if (!DB_NAME) console.error('DB_NAME is not set');
  if (!DB_USER) console.error('DB_USER is not set');
  if (!DB_PASSWORD) console.error('DB_PASSWORD is not set');
  if (!DB_HOST) console.error('DB_HOST is not set');
  process.exit(1);
}

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool; 