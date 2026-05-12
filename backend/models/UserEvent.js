// models/UserEvent.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const UserEvent = sequelize.define('UserEvent', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  event_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'events',
      key: 'id'
    }
  },
  joined_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'user_event',
  timestamps: false,
  underscored: true
});

module.exports = UserEvent;