const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Class, School, User } = require('../models');

// Создание класса
router.post('/', auth(['director', 'teacher']), async (req, res) => {
  const { school_id, name } = req.body;

  try {
    const classItem = await Class.create({
      name,
      school_id
    });

    res.status(201).json({
      id: classItem.id,
      name: classItem.name
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create class' });
  }
});

// Получение списка учеников класса
router.get('/:id/students', auth(['director', 'teacher']), async (req, res) => {
  const { id } = req.params;

  try {
    const students = await User.findAll({
      where: { class_id: id, role: 'student' },
      attributes: ['id', 'name']
    });

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

module.exports = router;