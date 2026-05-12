// models/CleaningRequest.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const CleaningRequest = sequelize.define('CleaningRequest', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'events',
      key: 'id'
    }
  },
  before_photo: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  after_photo: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending'
  },
  comment: {
    type: DataTypes.TEXT
  },
  score: {
    type: DataTypes.INTEGER
  },
  reviewed_by: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  reviewed_at: {
    type: DataTypes.DATE
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'cleaning_requests',
  timestamps: false,
  underscored: true
});

module.exports = CleaningRequest;