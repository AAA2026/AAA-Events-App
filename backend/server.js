require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/database');
const { i18nextMiddleware } = require('./config/i18n');
const morgan = require('morgan');

// Import routes
const eventRoutes = require('./routes/events');
const bookingRoutes = require('./routes/bookings');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const categoriesRouter = require('./routes/categories');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(i18nextMiddleware);
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoriesRouter);

// Test database connection
async function testConnection() {
  try {
    const [result] = await pool.execute('SELECT 1');
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}

testConnection();

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (err.name === 'MulterError') {
        return res.status(400).json({ 
            error: req.t('errors.fileUpload'),
            details: err.message 
        });
    }
    
    if (err.name === 'ValidationError') {
        return res.status(400).json({ 
            error: req.t('errors.validation'),
            details: err.message 
        });
    }
    
    res.status(500).json({ 
        error: req.t('errors.general'),
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; 