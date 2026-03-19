const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Регистрация пользователя
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully!', user });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

module.exports = router;
