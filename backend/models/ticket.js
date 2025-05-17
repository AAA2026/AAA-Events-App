const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Event = require('./event');

const Ticket = sequelize.define('Ticket', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  status: {
    type: DataTypes.ENUM('active', 'cancelled', 'used'),
    defaultValue: 'active'
  }
}, {
  timestamps: true
});

// Define the relationships
Ticket.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Ticket, { foreignKey: 'userId' });

Ticket.belongsTo(Event, { foreignKey: 'eventId' });
Event.hasMany(Ticket, { foreignKey: 'eventId' });

module.exports = Ticket;
