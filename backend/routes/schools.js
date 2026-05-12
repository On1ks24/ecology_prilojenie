const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const { School, User, Invitation } = require('../models');

// Запрос от директора на регистрацию школы
router.post('/request', async (req, res) => {
  const { name, email, application_scan } = req.body;

  try {
    // Здесь должна быть логика отправки заявки на модерацию
    // Пока просто создаем школу и директора
    const hashedPassword = await bcrypt.hash('temp_password', 10);
    const director = await User.create({
      name: 'Director',
      email,
      password: hashedPassword,
      role: 'director'
    });

    const school = await School.create({
      name,
      director_id: director.id
    });

    res.status(201).json({
      requestId: school.id,
      status: 'pending'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create school request' });
  }
});

// Получение данных школы
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const school = await School.findByPk(id, {
      include: [{
        model: User,
        attributes: ['id', 'name']
      }]
    });

    if (!school) {
      return res.status(404).json({ error: 'School not found' });
    }

    // Директор школы
    const director = await User.findByPk(school.director_id, {
      attributes: ['id', 'name']
    });

    res.status(200).json({
      id: school.id,
      name: school.name,
      address: school.address,
      director: director?.name || 'Не указан',
      logo: '🏫'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch school data' });
  }
});

module.exports = router;