const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Invitation, School, Class } = require('../models');

// Регистрация независимого пользователя
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'user',
      is_active: true // Автоматически активируем независимых пользователей
    });

    res.status(201).json({
      userId: user.id,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Регистрация директора (без пригласительного кода)
router.post('/register-director', async (req, res) => {
  const { name, email, password, schoolName, schoolAddress } = req.body;

  try {
    // Проверяем, не существует ли уже школа с таким названием
    const existingSchool = await School.findOne({ where: { name: schoolName } });
    if (existingSchool) {
      return res.status(400).json({ error: 'Школа с таким названием уже существует' });
    }

    // Создаем директора (неактивный аккаунт)
    const hashedPassword = await bcrypt.hash(password, 10);
    const director = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'director',
      is_active: false // Директор неактивен до подтверждения
    });

    // Создаем школу и привязываем к директору
    const school = await School.create({
      name: schoolName,
      address: schoolAddress,
      director_id: director.id
    });

    // Обновляем директора, привязывая его к школе
    await director.update({ school_id: school.id });

    res.status(201).json({
      userId: director.id,
      role: director.role,
      schoolId: school.id,
      message: 'Ваша заявка на регистрацию школы отправлена. Мы свяжемся с вами для подтверждения в течение 24 часов.'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Регистрация по пригласительному коду (для учителей и учеников)
router.post('/register-invite', async (req, res) => {
  const { code, name, email, password, class_name } = req.body;

  try {
    const invitation = await Invitation.findOne({ 
      where: { code, is_active: true } 
    });
    
    if (!invitation) {
      return res.status(404).json({ error: 'Invalid invitation code' });
    }

    if (new Date() > new Date(invitation.expires_at)) {
      return res.status(400).json({ error: 'Invitation code expired' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let finalClassId = invitation.class_id; // для учеников — из приглашения

    // Для учителя: ищем или создаём класс по названию
    if (invitation.role === 'teacher' && class_name) {
      const { Class } = require('../models');
      
      // Ищем класс с таким именем в школе
      let classItem = await Class.findOne({
        where: { 
          name: class_name.trim(),
          school_id: invitation.school_id 
        }
      });

      // Если нет — создаём
      if (!classItem) {
        classItem = await Class.create({
          name: class_name.trim(),
          school_id: invitation.school_id
        });
      }

      finalClassId = classItem.id;
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: invitation.role,
      class_id: finalClassId,
      school_id: invitation.school_id,
      is_active: true
    });

    res.status(201).json({
      userId: user.id,
      role: user.role,
      schoolId: user.school_id,
      classId: user.class_id,
      message: 'Регистрация успешна!'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Вход в систему
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Проверяем, активен ли пользователь
    if (!user.is_active) {
      return res.status(403).json({
        error: 'Account not activated',
        message: user.role === 'director'
          ? 'Ваш аккаунт ожидает подтверждения. Мы свяжемся с вами в течение 24 часов.'
          : 'Ваш аккаунт не активирован.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      accessToken,
      refreshToken,
      role: user.role,
      userId: user.id,
      name: user.name,
      schoolId: user.school_id,
      classId: user.class_id,
      isActive: user.is_active
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Обновление токена доступа
router.post('/refresh', async (req, res) => {
  const { refreshToken } = req.body;

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Проверяем, активен ли пользователь
    if (!user.is_active) {
      return res.status(403).json({ error: 'Account not activated' });
    }

    const newAccessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});

// Получение информации о текущем пользователе
router.get('/me', async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'role', 'school_id', 'class_id']
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

module.exports = router;