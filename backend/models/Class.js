// models/Class.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Class = sequelize.define('Class', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  school_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'schools',
      key: 'id'
    }
  }
}, {
  tableName: 'classes',
  timestamps: false,
  underscored: true
});

module.exports = Class;