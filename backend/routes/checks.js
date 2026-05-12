const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { CleaningRequest, User, Event } = require('../models');

// Создание запроса на проверку (студент)
router.post('/', auth(['student', 'user']), async (req, res) => {
  const { event_id, before_photo, after_photo } = req.body;

  try {
    const request = await CleaningRequest.create({
      user_id: req.user.id,
      event_id,
      before_photo,
      after_photo,
      status: 'pending'
    });

    res.status(201).json({
      requestId: request.id,
      status: request.status
    });
  } catch (error) {
    console.error('Create check error:', error);
    res.status(500).json({ error: 'Failed to create cleaning request' });
  }
});

// Получение списка проверок (учитель/директор)
router.get('/', auth(['teacher', 'director', 'user']), async (req, res) => {
  const { event, status } = req.query;
  
  try {
    const teacher = await User.findByPk(req.user.id);
    let where = {};

    if (event) where.event_id = event;
    if (status) where.status = status;

    const requests = await CleaningRequest.findAll({
      where,
      include: [{
        model: User,
        where: req.user.role === 'teacher' ? { class_id: teacher.class_id } : undefined,
        attributes: ['id', 'name', 'class_id'],
        required: false
      }, {
        model: Event,
        attributes: ['id', 'name']
      }],
      order: [['created_at', 'DESC']]
    });

    res.status(200).json(requests);
  } catch (error) {
    console.error('Fetch checks error:', error);
    res.status(500).json({ error: 'Failed to fetch cleaning requests' });
  }
});

// Получение одной проверки
router.get('/:id', auth(['teacher', 'director', 'student', 'user']), async (req, res) => {
  const { id } = req.params;

  try {
    const request = await CleaningRequest.findByPk(id, {
      include: [{
        model: User,
        attributes: ['id', 'name']
      }, {
        model: Event,
        attributes: ['id', 'name']
      }]
    });

    if (!request) return res.status(404).json({ error: 'Request not found' });

    // Студент может видеть только свои запросы
    if (req.user.role === 'student' && request.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cleaning request' });
  }
});

// Обновление проверки (учитель/директор одобряет/отклоняет)
router.put('/:id', auth(['teacher', 'director', 'user']), async (req, res) => {
  const { id } = req.params;
  const { status, comment, score } = req.body;

  try {
    const request = await CleaningRequest.findByPk(id, {
      include: [{ model: User }]
    });
    
    if (!request) return res.status(404).json({ error: 'Request not found' });

    // Учитель может проверять только своего класса
    if (req.user.role === 'teacher') {
      const teacher = await User.findByPk(req.user.id);
      if (request.User.class_id !== teacher.class_id) {
        return res.status(403).json({ error: 'Can only review your class students' });
      }
    }

    await request.update({
      status,
      comment,
      score,
      reviewed_by: req.user.id,
      reviewed_at: new Date()
    });

    res.status(200).json({ 
      message: 'Request updated successfully', 
      score,
      status 
    });
  } catch (error) {
    console.error('Update check error:', error);
    res.status(500).json({ error: 'Failed to update request' });
  }
});
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Создаём папку uploads если нет
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

// Загрузка фото и создание CleaningRequest
router.post('/upload', auth(['student', 'user']), upload.fields([
  { name: 'before', maxCount: 1 },
  { name: 'after', maxCount: 1 }
]), async (req, res) => {
  console.log('=== UPLOAD DEBUG ===');
  console.log('req.body:', req.body);
  console.log('req.files:', req.files);
  console.log('req.files.before:', req.files?.before);
  console.log('req.files.after:', req.files?.after);
  const { event_id } = req.body;
  const studentId = req.user.id;

  try {
    // Находим ученика
    const student = await User.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Ищем учителя этого класса и школы
    let reviewer = null;

  if (student.school_id && student.class_id) {
    // Школьник — ищем учителя класса
    reviewer = await User.findOne({
      where: {
        role: 'teacher',
        school_id: student.school_id,
        class_id: student.class_id,
        is_active: true
      }
    });
  }

  if (!reviewer) {
    // Обычный пользователь или нет учителя — ищем организатора мероприятия
    const event = await Event.findByPk(event_id);
    if (event && event.organizer_id) {
      reviewer = await User.findByPk(event.organizer_id);
    }
  }

  // Создаём запрос
  const request = await CleaningRequest.create({
    user_id: studentId,
    event_id,
    before_photo: `/uploads/${req.files.before[0].filename}`,
    after_photo: `/uploads/${req.files.after[0].filename}`,
    status: 'pending',
    reviewed_by: reviewer ? reviewer.id : null,
  });

    res.status(201).json({
      requestId: request.id,
      beforePath: request.before_photo,
      afterPath: request.after_photo,
      teacherId: reviewer ? reviewer.id : null,
      message: reviewer 
        ? `Запрос создан. Проверяющий: ${reviewer.name}`
        : 'Запрос создан. Учитель не назначен — требуется ручная проверка директором.'
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload photos' });
  }
});

// Обновление после AI-оценки
router.put('/:id/evaluate', auth(['student', 'user']), async (req, res) => {
  const { id } = req.params;
  const { score, ai_percentage, ai_trash_before, ai_trash_after } = req.body;

  try {
    const request = await CleaningRequest.findByPk(id);
    if (!request) return res.status(404).json({ error: 'Request not found' });
    
    // Проверяем, что это запрос текущего пользователя
    if (request.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await request.update({
      score: score || null,
      comment: `AI: ${ai_percentage}% убрано. Мусора: ${ai_trash_before} → ${ai_trash_after}`
    });

    res.status(200).json({ message: 'AI evaluation saved' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save evaluation' });
  }
});
module.exports = router;