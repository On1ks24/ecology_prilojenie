// models/Event.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  organizer_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  is_school_event: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  school_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'schools',
      key: 'id'
    }
  },
    end_date: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'events',
  timestamps: false,
  underscored: true
});

module.exports = Event;