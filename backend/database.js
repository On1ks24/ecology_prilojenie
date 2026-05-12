// backend/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

let sequelize;

// Если есть DATABASE_URL (Neon облако)
if (process.env.DATABASE_URL) {
  console.log('Подключение к облачной БД (Neon)');
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: console.log,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false  // обязательно для Neon
      }
    }
  });
} 

module.exports = sequelize;