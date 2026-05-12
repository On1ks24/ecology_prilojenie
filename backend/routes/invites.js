const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Invitation, School, Class, User } = require('../models');

// Создание пригласительного кода — УНИФИЦИРОВАННЫЙ
router.post('/', auth(['director', 'teacher']), async (req, res) => {
  const { role, school_id, class_id } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log('=== CREATE INVITE ===');
    console.log('Creator role:', user.role, 'Creator ID:', userId);
    console.log('Body:', req.body);

    let finalRole, finalSchoolId, finalClassId;

    if (user.role === 'director') {
      // Директор создаёт код для УЧИТЕЛЕЙ
      if (role && role !== 'teacher') {
        return res.status(403).json({ error: 'Director can only create invitations for teachers' });
      }
      finalRole = 'teacher';
      finalSchoolId = school_id || user.school_id;
      finalClassId = null; // Учителя выбирают/создают класс при регистрации
    } 
    else if (user.role === 'teacher') {
      // Учитель создаёт код для УЧЕНИКОВ
      if (role && role !== 'student') {
        return res.status(403).json({ error: 'Teacher can only create invitations for students' });
      }
      finalRole = 'student';
      finalSchoolId = school_id || user.school_id;
      finalClassId = class_id || user.class_id;
      
      if (!finalClassId) {
        return res.status(400).json({ error: 'Teacher must have a class assigned to create student invitations' });
      }
    } 
    else {
      return res.status(403).json({ error: 'Only director or teacher can create invitations' });
    }

    if (!finalSchoolId) {
      return res.status(400).json({ error: 'School ID is required' });
    }

    console.log('Final params:', { finalRole, finalSchoolId, finalClassId });

    // Деактивируем старый активный код для этой роли+школа+класс
    const deactivateWhere = {
      role: finalRole,
      school_id: finalSchoolId,
      is_active: true
    };
    
    // Для студентов учитываем class_id, для учителей — null
    if (finalRole === 'student') {
      deactivateWhere.class_id = finalClassId;
    } else {
      deactivateWhere.class_id = null;
    }

    const deactivated = await Invitation.update(
      { is_active: false },
      { where: deactivateWhere }
    );
    console.log('Deactivated old invites:', deactivated[0]);

    // Генерируем новый код
    const code = `INV-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const expires_at = new Date();
    expires_at.setFullYear(expires_at.getFullYear() + 10);

    const invitation = await Invitation.create({
      code,
      role: finalRole,
      school_id: finalSchoolId,
      class_id: finalClassId,
      created_by: userId,
      expires_at,
      is_active: true
    });

    console.log('Created invite:', invitation.code, 'for role:', finalRole);

    res.status(201).json({
      code: invitation.code,
      role: invitation.role,
      school_id: invitation.school_id,
      class_id: invitation.class_id,
      expires_at: invitation.expires_at,
      is_active: true
    });
  } catch (error) {
    console.error('Create invite error:', error);
    res.status(500).json({ error: 'Failed to create invitation' });
  }
});

// Получение активного кода текущего пользователя
router.get('/my-active', auth(['director', 'teacher']), async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);
    console.log('=== MY-ACTIVE === User:', user.role, 'school:', user.school_id, 'class:', user.class_id);

    const where = {
      is_active: true,
      role: user.role === 'director' ? 'teacher' : 'student'
    };

    if (user.role === 'director') {
      where.school_id = user.school_id;
      where.class_id = null;
    } else {
      where.school_id = user.school_id;
      where.class_id = user.class_id;
    }

    console.log('Search where:', where);

    const invitation = await Invitation.findOne({
      where,
      include: [{
        model: School,
        attributes: ['id', 'name']
      }, {
        model: Class,
        attributes: ['id', 'name']
      }],
      order: [['id', 'DESC']]
    });

    if (!invitation) {
      return res.status(404).json({ message: 'No active invitation found' });
    }

    res.status(200).json({
      code: invitation.code,
      role: invitation.role,
      school: invitation.School,
      class: invitation.Class,
      expires_at: invitation.expires_at
    });
  } catch (error) {
    console.error('my-active error:', error);
    res.status(500).json({ error: 'Failed to fetch active invitation' });
  }
});

// Проверка кода (для регистрации)
router.get('/check/:code', async (req, res) => {
  const { code } = req.params;

  try {
    const invitation = await Invitation.findOne({
      where: { code, is_active: true },
      include: [{
        model: School,
        attributes: ['id', 'name']
      }, {
        model: Class,
        attributes: ['id', 'name']
      }]
    });

    if (!invitation) {
      return res.status(404).json({ error: 'Invalid or inactive invitation code' });
    }

    if (new Date() > new Date(invitation.expires_at)) {
      return res.status(400).json({ error: 'Invitation code expired' });
    }

    res.status(200).json({
      code: invitation.code,
      role: invitation.role,
      school_id: invitation.school_id,
      school_name: invitation.School?.name,
      class_id: invitation.class_id,
      class_name: invitation.Class?.name
    });
  } catch (error) {
    console.error('check error:', error);
    res.status(500).json({ error: 'Failed to check invitation' });
  }
});

// Получение списка приглашений (история)
router.get('/', auth(['director', 'teacher']), async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const where = {};
    if (user.role === 'teacher') {
      where.created_by = userId;
    } else {
      where.school_id = user.school_id;
    }

    const invitations = await Invitation.findAll({
      where,
      include: [{
        model: School,
        attributes: ['id', 'name']
      }, {
        model: Class,
        attributes: ['id', 'name']
      }, {
        model: User,
        as: 'creator',
        attributes: ['id', 'name']
      }],
      order: [['id', 'DESC']]
    });

    res.status(200).json(invitations);
  } catch (error) {
    console.error('list error:', error);
    res.status(500).json({ error: 'Failed to fetch invitations' });
  }
});

// Деактивация приглашения
router.delete('/:code', auth(['director', 'teacher']), async (req, res) => {
  const { code } = req.params;
  const userId = req.user.id;

  try {
    const invitation = await Invitation.findOne({ where: { code } });
    if (!invitation) {
      return res.status(404).json({ error: 'Invitation not found' });
    }

    const user = await User.findByPk(userId);
    if (user.role === 'teacher' && invitation.created_by !== userId) {
      return res.status(403).json({ error: 'You can only revoke your own invitations' });
    }
    if (user.role === 'director' && invitation.school_id !== user.school_id) {
      return res.status(403).json({ error: 'You can only revoke invitations for your school' });
    }

    await invitation.update({ is_active: false });

    res.status(200).json({ message: 'Invitation deactivated successfully' });
  } catch (error) {
    console.error('delete error:', error);
    res.status(500).json({ error: 'Failed to deactivate invitation' });
  }
});

module.exports = router;