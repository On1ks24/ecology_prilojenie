// backend/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Создаем реальное подключение к БД
const sequelize = new Sequelize(
  process.env.DB_NAME || 'school_eco',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: console.log,
    dialectOptions: { ssl: false }
  }
);

module.exports = sequelize;