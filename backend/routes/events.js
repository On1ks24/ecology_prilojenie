const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Event, UserEvent, User, CleaningRequest, sequelize } = require('../models');
const { Op } = require('sequelize');

// Создание мероприятия — авто-присоединение ВСЕХ учеников школы и класса организатора
router.post('/', auth(['director', 'teacher', 'user']), async (req, res) => {
  const { name, date, location, school_id, is_school_event } = req.body;
  const organizer = await User.findByPk(req.user.id);

  const transaction = await sequelize.transaction();

  try {
    const event = await Event.create({
      name,
      date,
      location,
      organizer_id: req.user.id,
      is_school_event: is_school_event || false,
      school_id: school_id || organizer.school_id || null,
      end_date: null
    }, { transaction });

    // Авто-присоединение только для школьных мероприятий
    if (is_school_event && school_id) {
      const students = await User.findAll({
        where: {
          school_id: school_id || organizer.school_id,
          role: 'student',
          is_active: true
        },
        attributes: ['id'],
        transaction
      });

      const userEvents = students.map(student => ({
        user_id: student.id,
        event_id: event.id,
        joined_at: new Date()
      }));

      if (userEvents.length > 0) {
        await UserEvent.bulkCreate(userEvents, { transaction });
      }
    }

    // Организатор тоже участник (для обычных пользователей)
    await UserEvent.create({
      user_id: req.user.id,
      event_id: event.id,
      joined_at: new Date()
    }, { transaction });

    await transaction.commit();

    res.status(201).json({
      id: event.id,
      name: event.name,
      date: event.date,
      location: event.location,
      message: 'Мероприятие создано'
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Create event error:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Завершить мероприятие (учитель/директор) — заполняем end_date
router.post('/:id/finish', auth(['teacher', 'director']), async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByPk(id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    // Проверяем права: учитель может завершить только своё мероприятие
    if (req.user.role === 'teacher' && event.organizer_id !== req.user.id) {
      return res.status(403).json({ error: 'You can only finish your own events' });
    }

    await event.update({ end_date: new Date() });

    res.status(200).json({
      message: 'Мероприятие завершено',
      end_date: event.end_date
    });
  } catch (error) {
    console.error('Finish event error:', error);
    res.status(500).json({ error: 'Failed to finish event' });
  }
});

// Получение списка мероприятий (с фильтрацией по прошедшим/текущим)
router.get('/', auth(['user', 'student', 'teacher', 'director']), async (req, res) => {
  const { school, my_events, past_events, status } = req.query; // ← добавить status
  const userId = req.user.id;

  try {
    let where = {};

    if (school === 'true') {
      const user = await User.findByPk(userId);
      where.school_id = user.school_id;
    }

    if (my_events === 'true') {
      where.organizer_id = userId;
    }

    // ⭐ НОВАЯ ЛОГИКА ДЛЯ STATUS
    if (status === 'active') {
      where.end_date = { [Op.or]: [
        { [Op.gte]: new Date() },  // end_date >= сегодня (ещё не закончились)
        { [Op.is]: null }          // или end_date не указан
      ]};
    } else if (status === 'finished') {
      where.end_date = { [Op.lte]: new Date() }; // end_date <= сегодня (закончились)
    }

    // Старая логика с past_events (можно оставить для совместимости)
    if (past_events === 'true') {
      where.end_date = { [Op.lte]: new Date() };
    } else if (past_events === 'false') {
      where.end_date = { [Op.or]: [{ [Op.gte]: new Date() }, { [Op.is]: null }] };
    }

    const events = await Event.findAll({
      where,
      attributes: ['id', 'name', 'date', 'end_date', 'location', 'is_school_event']
    });

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});
// Получить мероприятия где я участник
router.get('/my-joined', auth(['user', 'student', 'teacher']), async (req, res) => {
  try {
    const userEvents = await UserEvent.findAll({
      where: { user_id: req.user.id },
      include: [{
        model: Event,
        where: { end_date: null }, // только активные
        attributes: ['id', 'name', 'date', 'location']
      }]
    });

    const events = await Promise.all(
      userEvents.map(async (ue) => {
        // Мои баллы за это мероприятие
        const totalScore = await CleaningRequest.sum('score', {
          where: { 
            event_id: ue.event_id, 
            user_id: req.user.id,
            status: 'approved'
          }
        }) || 0;

        return {
          id: ue.Event.id,
          name: ue.Event.name,
          date: ue.Event.date,
          location: ue.Event.location,
          myScore: totalScore
        };
      })
    );

    res.status(200).json(events);
  } catch (error) {
    console.error('my-joined error:', error);
    res.status(500).json({ error: 'Failed to fetch joined events' });
  }
});
// В routes/events.js — замени GET /:id и GET /:id/details:

// Получение информации о мероприятии (БЕЗ alias)
router.get('/:id', auth(['user', 'student', 'teacher', 'director']), async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Получаем участников отдельно через UserEvent
    const participants = await UserEvent.findAll({
      where: { event_id: id },
      include: [{
        model: User,
        attributes: ['id', 'name']
      }]
    });

    res.status(200).json({
      id: event.id,
      name: event.name,
      date: event.date,
      location: event.location,
      is_school_event: event.is_school_event,
      school_id: event.school_id,
      organizer_id: event.organizer_id,
      participants: participants.map(p => ({
        id: p.User.id,
        name: p.User.name
      }))
    });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// Получение деталей мероприятия + рейтинг (БЕЗ alias)
router.get('/:id/details', auth(['user', 'student', 'teacher', 'director']), async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByPk(id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    // Получаем участников через UserEvent
    const userEvents = await UserEvent.findAll({
      where: { event_id: id },
      include: [{
        model: User,
        attributes: ['id', 'name']
      }]
    });

    const participants = userEvents.map(ue => ({
      id: ue.User.id,
      name: ue.User.name
    }));

    // Рейтинг участников по баллам за это мероприятие
    const participantsWithScores = await Promise.all(
      participants.map(async (user) => {
        const requests = await CleaningRequest.findAll({
          where: { 
            event_id: id, 
            user_id: user.id,
            status: 'approved'
          },
          attributes: ['score']
        });
        
        const totalScore = requests.reduce((sum, r) => sum + (r.score || 0), 0);
        
        return {
          id: user.id,
          name: user.name,
          totalScore
        };
      })
    );

    const sortedRating = participantsWithScores
      .sort((a, b) => b.totalScore - a.totalScore)
      .map((p, index) => ({ ...p, rank: index + 1 }));

    const totalParticipants = participants.length;
    const totalEventPoints = sortedRating.reduce((sum, p) => sum + p.totalScore, 0);

    res.status(200).json({
      event: {
        id: event.id,
        name: event.name,
        date: event.date,
        location: event.location,
        end_date: event.end_date,
        isFinished: !!event.end_date
      },
      rating: sortedRating,
      stats: {
        totalParticipants,
        totalEventPoints
      }
    });
  } catch (error) {
    console.error('Event details error:', error);
    res.status(500).json({ error: 'Failed to fetch event details' });
  }
});

// Получить запросы ученика по мероприятию
router.get('/:id/my-requests', auth(['student', 'user']), async (req, res) => {
  const { id } = req.params;

  try {
    const requests = await CleaningRequest.findAll({
      where: {
        event_id: id,
        user_id: req.user.id
      },
      attributes: ['id', 'before_photo', 'after_photo', 'status', 'score', 'comment', 'created_at'],
      order: [['created_at', 'DESC']]
    });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

// Получить необработанные запросы для учителя
router.get('/:id/pending-requests', auth(['teacher', 'director', 'user']), async (req, res) => {
  const { id } = req.params;

  try {
    const currentUser = await User.findByPk(req.user.id);
    
    // Проверяем, является ли пользователь организатором этого мероприятия
    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    // Проверка прав: учитель, директор ИЛИ организатор мероприятия (даже если role='user')
    const isOrganizer = event.organizer_id === req.user.id;
    const isTeacher = req.user.role === 'teacher';
    const isDirector = req.user.role === 'director';
    
    if (!isTeacher && !isDirector && !isOrganizer) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    const where = {
      event_id: id,
      status: 'pending'
    };

    // Учитель видит только учеников своего класса
    if (req.user.role === 'teacher') {
      const requests = await CleaningRequest.findAll({
        where,
        include: [{
          model: User,
          where: { class_id: currentUser.class_id },
          attributes: ['id', 'name', 'class_id']
        }],
        attributes: ['id', 'before_photo', 'after_photo', 'status', 'created_at'],
        order: [['created_at', 'ASC']]
      });
      return res.status(200).json(requests);
    }
    
    // Директор и организатор (user) видят все запросы к мероприятию
    const requests = await CleaningRequest.findAll({
      where,
      include: [{
        model: User,
        attributes: ['id', 'name', 'class_id']
      }],
      attributes: ['id', 'before_photo', 'after_photo', 'status', 'created_at'],
      order: [['created_at', 'ASC']]
    });

    res.status(200).json(requests);
  } catch (error) {
    console.error('Pending requests error:', error);
    res.status(500).json({ error: 'Failed to fetch pending requests' });
  }
});

// Присоединиться к мероприятию (любой пользователь)
router.post('/:id/join', auth(['user', 'student', 'teacher']), async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByPk(id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    if (event.end_date) {
      return res.status(400).json({ error: 'Event is finished' });
    }

    // Проверяем, не участвует ли уже
    const existing = await UserEvent.findOne({
      where: { user_id: req.user.id, event_id: id }
    });
    if (existing) {
      return res.status(400).json({ error: 'Already joined' });
    }

    await UserEvent.create({
      user_id: req.user.id,
      event_id: id,
      joined_at: new Date()
    });

    res.status(201).json({ message: 'Joined successfully' });
  } catch (error) {
    console.error('Join error:', error);
    res.status(500).json({ error: 'Failed to join event' });
  }
});



module.exports = router;