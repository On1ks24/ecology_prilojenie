const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { User, Class, School, CleaningRequest, UserEvent, Event, sequelize } = require('../models');

// ========== ДЛЯ УЧИТЕЛЯ ==========

// Получить учеников класса учителя
router.get('/class-students', auth(['teacher']), async (req, res) => {
  try {
    const teacher = await User.findByPk(req.user.id);
    if (!teacher.class_id) {
      return res.status(400).json({ error: 'Teacher has no class assigned' });
    }
    
    const students = await User.findAll({
      where: { 
        class_id: teacher.class_id,
        role: 'student',
        school_id: teacher.school_id
      },
      attributes: ['id', 'name', 'email', 'is_active'],
      order: [['name', 'ASC']]
    });

    const studentsWithStats = await Promise.all(
      students.map(async (student) => {
        const totalPoints = await CleaningRequest.sum('score', {
          where: { user_id: student.id, status: 'approved' }
        }) || 0;
        
        const eventsCount = await UserEvent.count({
          where: { user_id: student.id }
        });

        return {
          id: student.id,
          name: student.name,
          email: student.email,
          is_active: student.is_active,
          totalPoints,
          eventsCount
        };
      })
    );

    res.status(200).json(studentsWithStats);
  } catch (error) {
    console.error('class-students error:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

router.get('/teacher-stats', auth(['teacher']), async (req, res) => {
  try {
    const teacherId = req.user.id;
    
    // Получаем данные учителя через сырой SQL
    const [teacher] = await sequelize.query(`
      SELECT id, class_id, school_id, role
      FROM users
      WHERE id = ? AND role = 'teacher'
    `, {
      replacements: [teacherId],
      type: sequelize.QueryTypes.SELECT
    });
    
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    
    if (!teacher.class_id) {
      return res.status(400).json({ error: 'Teacher has no class assigned' });
    }
    
    // 1. Количество учеников в классе учителя
    const [studentsCountResult] = await sequelize.query(`
      SELECT COUNT(*) as count
      FROM users
      WHERE class_id = ? AND role = 'student' AND school_id = ?
    `, {
      replacements: [teacher.class_id, teacher.school_id],
      type: sequelize.QueryTypes.SELECT
    });
    const studentsCount = parseInt(studentsCountResult.count);
    
    // 2. Количество мероприятий школы
    const [eventsCountResult] = await sequelize.query(`
      SELECT COUNT(*) as count
      FROM events
      WHERE school_id = ? AND is_school_event = true
    `, {
      replacements: [teacher.school_id],
      type: sequelize.QueryTypes.SELECT
    });
    const eventsCount = parseInt(eventsCountResult.count);
    
    // 3. Баллы класса учителя
    const [classPointsResult] = await sequelize.query(`
      SELECT COALESCE(SUM(cr.score), 0) as total
      FROM cleaning_requests cr
      JOIN users u ON u.id = cr.user_id
      WHERE cr.status = 'approved'
        AND u.role = 'student'
        AND u.class_id = ?
        AND u.school_id = ?
    `, {
      replacements: [teacher.class_id, teacher.school_id],
      type: sequelize.QueryTypes.SELECT
    });
    const classPoints = parseInt(classPointsResult.total) || 0;
    
    // 4. Рейтинг всех классов в школе
    const rankingResult = await sequelize.query(`
      SELECT 
        u.class_id,
        COALESCE(SUM(cr.score), 0) as total_score,
        ROW_NUMBER() OVER (ORDER BY COALESCE(SUM(cr.score), 0) DESC) as rank_position
      FROM users u
      LEFT JOIN cleaning_requests cr ON cr.user_id = u.id AND cr.status = 'approved'
      WHERE u.role = 'student'
        AND u.school_id = ?
      GROUP BY u.class_id
      ORDER BY total_score DESC
    `, {
      replacements: [teacher.school_id],
      type: sequelize.QueryTypes.SELECT
    });
    
    // Находим ранг класса учителя
    let classRank = 1;
    let totalClasses = rankingResult.length;
    
    const teacherClassRank = rankingResult.find(r => r.class_id === teacher.class_id);
    if (teacherClassRank) {
      classRank = parseInt(teacherClassRank.rank_position);
    }
    
    res.status(200).json({
      studentsCount,
      eventsCount,
      classPoints,
      classRank,
      totalClasses
    });
    
  } catch (error) {
    console.error('teacher-stats error:', error);
    res.status(500).json({
      error: 'Failed to fetch teacher stats',
      details: error.message
    });
  }
});

// ========== ДЛЯ ДИРЕКТОРА ==========

// Получить ВСЕХ УЧИТЕЛЕЙ школы (ИСПРАВЛЕНО — точно teacher!)
router.get('/school-teachers', auth(['director']), async (req, res) => {
  console.log('=== school-teachers endpoint called ===');
  console.log('User ID:', req.user.id, 'Role:', req.user.role);
  
  try {
    const director = await User.findByPk(req.user.id);
    console.log('Director school_id:', director.school_id);
    
    const teachers = await User.findAll({
      where: { 
        school_id: director.school_id,
        role: 'teacher'  // ← ТОЧНО TEACHER!
      },
      attributes: ['id', 'name', 'email', 'is_active', 'class_id'],
      include: [{
        model: Class,
        attributes: ['id', 'name']
      }],
      order: [['name', 'ASC']]
    });

    console.log('Found teachers:', teachers.length);

    const teachersWithStats = await Promise.all(
      teachers.map(async (teacher) => {
        const studentsCount = await User.count({
          where: { class_id: teacher.class_id, role: 'student' }
        });
        
        return {
          id: teacher.id,
          name: teacher.name,
          email: teacher.email,
          is_active: teacher.is_active,
          className: teacher.Class?.name || 'Не указан',
          studentsCount
        };
      })
    );

    res.status(200).json(teachersWithStats);
  } catch (error) {
    console.error('school-teachers error:', error);
    res.status(500).json({ error: 'Failed to fetch teachers' });
  }
});

// Получить ВСЕХ УЧЕНИКОВ школы
router.get('/school-students', auth(['director']), async (req, res) => {
  console.log('=== school-students endpoint called ===');
  
  try {
    const director = await User.findByPk(req.user.id);
    
    const students = await User.findAll({
      where: { 
        school_id: director.school_id,
        role: 'student'  // ← ТОЧНО STUDENT!
      },
      attributes: ['id', 'name', 'email', 'is_active', 'class_id'],
      include: [{
        model: Class,
        attributes: ['id', 'name']
      }],
      order: [['name', 'ASC']]
    });

    const studentsWithStats = await Promise.all(
      students.map(async (student) => {
        const totalPoints = await CleaningRequest.sum('score', {
          where: { user_id: student.id, status: 'approved' }
        }) || 0;

        return {
          id: student.id,
          name: student.name,
          email: student.email,
          is_active: student.is_active,
          className: student.Class?.name || 'Не указан',
          totalPoints
        };
      })
    );

    res.status(200).json(studentsWithStats);
  } catch (error) {
    console.error('school-students error:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// Получить количество учителей и учеников школы
router.get('/school-counts', auth(['director']), async (req, res) => {
  try {
    const director = await User.findByPk(req.user.id);
    
    const [teachers, students] = await Promise.all([
      User.count({ where: { school_id: director.school_id, role: 'teacher' } }),
      User.count({ where: { school_id: director.school_id, role: 'student' } })
    ]);

    res.status(200).json({ teachers, students });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch counts' });
  }
});

// ========== ОБЩЕЕ ==========

// Переключить активность пользователя
router.put('/:id/toggle-active', auth(['teacher', 'director']), async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const userRole = req.user.role;

  try {
    const targetUser = await User.findByPk(id);
    if (!targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    const actor = await User.findByPk(userId);

    // Учитель может управлять только учениками своего класса
    if (userRole === 'teacher') {
      if (targetUser.role !== 'student' || targetUser.class_id !== actor.class_id) {
        return res.status(403).json({ error: 'You can only manage students in your class' });
      }
    }

    // Директор может управлять только пользователями своей школы (кроме себя)
    if (userRole === 'director') {
      if (targetUser.school_id !== actor.school_id) {
        return res.status(403).json({ error: 'You can only manage users in your school' });
      }
      if (targetUser.id === actor.id) {
        return res.status(403).json({ error: 'You cannot deactivate yourself' });
      }
    }

    await targetUser.update({ is_active: !targetUser.is_active });

    res.status(200).json({
      id: targetUser.id,
      is_active: !targetUser.is_active,
      message: `User ${!targetUser.is_active ? 'activated' : 'deactivated'} successfully`
    });
  } catch (error) {
    console.error('toggle-active error:', error);
    res.status(500).json({ error: 'Failed to toggle user active status' });
  }
});

module.exports = router;