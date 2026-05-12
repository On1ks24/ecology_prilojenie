const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Sequelize } = require('sequelize');
const sequelize = require('../database');
const { CleaningRequest, User, Event, School, Class } = require('../models');
const { Op } = require('sequelize');

// Статистика по школе
router.get('/school/:id', auth(['director']), async (req, res) => {
  const { id } = req.params;

  try {
    // Считаем мероприятия школы
    const eventsCount = await Event.count({ where: { school_id: id } });

    // Находим все event_id школы
    const schoolEvents = await Event.findAll({
      where: { school_id: id },
      attributes: ['id']
    });
    const eventIds = schoolEvents.map(e => e.id);

    let requestsCount = 0;
    let avgScore = 0;
    let totalPoints = 0;

    if (eventIds.length > 0) {
      // Количество запросов
      requestsCount = await CleaningRequest.count({
        where: { event_id: { [Op.in]: eventIds } }
      });

      // Средний балл
      const avgScoreResult = await CleaningRequest.findOne({
        where: { event_id: { [Op.in]: eventIds } },
        attributes: [[sequelize.fn('COALESCE', sequelize.fn('avg', sequelize.col('score')), 0), 'avg_score']]
      });
      avgScore = avgScoreResult?.dataValues?.avg_score || 0;

      // Всего баллов
      totalPoints = await CleaningRequest.sum('score', {
        where: { event_id: { [Op.in]: eventIds } }
      }) || 0;
    }

    res.status(200).json({
      eventsCount,
      requestsCount,
      avgScore: Math.round(avgScore * 100) / 100,
      totalPoints
    });
  } catch (error) {
    console.error('School stats error:', error);
    res.status(500).json({ error: 'Failed to fetch school stats' });
  }
});

// Статистика по пользователю
router.get('/user/:id', auth(['user', 'student', 'teacher', 'director']), async (req, res) => {
  const { id } = req.params;

  try {
    const eventsCount = await CleaningRequest.count({ where: { user_id: id } });
    const totalPointsResult = await CleaningRequest.sum('score', { where: { user_id: id } });
    const totalPoints = totalPointsResult || 0;

    const avgScoreResult = await CleaningRequest.findAll({
      where: { user_id: id },
      attributes: [[sequelize.fn('avg', sequelize.col('score')), 'avg_score']]
    });

    const avgScore = avgScoreResult[0]?.dataValues.avg_score || 0;

    // Получаем рейтинг пользователя
    const usersWithScores = await CleaningRequest.findAll({
      attributes: [
        'user_id',
        [sequelize.fn('sum', sequelize.col('score')), 'total_score']
      ],
      group: ['user_id'],
      order: [[sequelize.literal('total_score'), 'DESC']]
    });

    const userRank = usersWithScores.findIndex(u => u.user_id === parseInt(id)) + 1;

    res.status(200).json({
      eventsCount,
      totalPoints,
      avgScore: Math.round(avgScore * 100) / 100,
      rank: userRank
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user stats' });
  }
});

router.get('/rating', auth(), async (req, res) => {
  const { school, class: classId, limit = 50 } = req.query;
  const userId = req.user.id;

  try {
    // Получаем текущего пользователя для определения фильтров
    const currentUser = await User.findByPk(userId);
    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Определяем фильтр ТОЛЬКО для учеников
    let studentWhere = { role: 'student' };

    // Директор: видит всех учеников школы (без фильтра по классу)
    if (currentUser.role === 'director') {
      if (school) {
        // Если передан school в query — используем его (для просмотра другой школы, если надо)
        studentWhere.school_id = parseInt(school);
      } else if (currentUser.school_id) {
        // Иначе своя школа
        studentWhere.school_id = currentUser.school_id;
      }
    }
    // Учитель: видит только учеников СВОЕГО класса
    else if (currentUser.role === 'teacher') {
      if (school) {
        studentWhere.school_id = parseInt(school);
      } else if (currentUser.school_id) {
        studentWhere.school_id = currentUser.school_id;
      }
      // Учитель всегда фильтрует по своему классу
      if (classId) {
        studentWhere.class_id = parseInt(classId);
      } else if (currentUser.class_id) {
        studentWhere.class_id = currentUser.class_id;
      }
    }
    // Ученик: видит одноклассников или всю школу в зависимости от type
    else if (currentUser.role === 'student') {
      if (school) {
        studentWhere.school_id = parseInt(school);
      } else if (currentUser.school_id) {
        studentWhere.school_id = currentUser.school_id;
      }
      if (classId) {
        studentWhere.class_id = parseInt(classId);
      } else if (currentUser.class_id) {
        studentWhere.class_id = currentUser.class_id;
      }
    }
    // Обычный user: смотрит что передано в query
    else {
      if (school) studentWhere.school_id = parseInt(school);
      if (classId) studentWhere.class_id = parseInt(classId);
    }

    console.log('Rating filter:', studentWhere);

    // Получаем ВСЕХ учеников по фильтру
    const students = await User.findAll({
      where: studentWhere,
      attributes: ['id', 'name', 'class_id', 'school_id'],
      order: [['name', 'ASC']]
    });

    // Для каждого ученика считаем сумму approved баллов
    const rating = await Promise.all(
      students.map(async (student) => {
        const totalScore = await CleaningRequest.sum('score', {
          where: {
            user_id: student.id,
            status: 'approved'
          }
        }) || 0;

        return {
          userId: student.id,
          name: student.name,
          totalScore: totalScore,
          classId: student.class_id,
          schoolId: student.school_id
        };
      })
    );

    // Сортируем по баллам и добавляем ранг
    const sortedRating = rating
      .sort((a, b) => b.totalScore - a.totalScore)
      .map((item, index) => ({
        rank: index + 1,
        ...item
      }))
      .slice(0, parseInt(limit));

    res.status(200).json(sortedRating);
  } catch (error) {
    console.error('Rating error:', error);
    res.status(500).json({ error: 'Failed to fetch rating' });
  }
});

router.get('/schools-rating', auth(['director']), async (req, res) => {
  const { limit = 100 } = req.query;

  try {
    const currentUser = await User.findByPk(req.user.id);

    // Получаем все школы
    const schools = await School.findAll({
      attributes: ['id', 'name', 'address'],
      order: [['name', 'ASC']]
    });

    // Для каждой школы считаем баллы отдельно
    const rating = await Promise.all(
      schools.map(async (school) => {
        // Находим всех учеников школы
        const studentIds = await User.findAll({
          where: {
            school_id: school.id,
            role: 'student'
          },
          attributes: ['id']
        }).then(users => users.map(u => u.id));

        // Считаем сумму approved баллов этих учеников
        let totalScore = 0;
        if (studentIds.length > 0) {
          totalScore = await CleaningRequest.sum('score', {
            where: {
              user_id: { [Op.in]: studentIds },
              status: 'approved'
            }
          }) || 0;
        }

        // Количество учеников
        const studentsCount = studentIds.length;

        // Количество мероприятий школы
        const eventsCount = await Event.count({
          where: { school_id: school.id }
        });

        return {
          schoolId: school.id,
          schoolName: school.name,
          address: school.address,
          totalScore: totalScore,
          studentsCount: studentsCount,
          eventsCount: eventsCount
        };
      })
    );

    // Сортируем по баллам и добавляем ранг
    const sortedRating = rating
      .sort((a, b) => b.totalScore - a.totalScore)
      .map((item, index) => ({
        rank: index + 1,
        ...item,
        isMySchool: currentUser.school_id === item.schoolId
      }))
      .slice(0, parseInt(limit));

    res.status(200).json(sortedRating);
  } catch (error) {
    console.error('Schools rating error:', error);
    res.status(500).json({ error: 'Failed to fetch schools rating' });
  }
});

// Статистика для учителя (по классу)
router.get('/teacher/:id', auth(['teacher']), async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user || user.role !== 'teacher') {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    // Количество учеников в классе учителя
    const studentsCount = await User.count({
      where: {
        class_id: user.class_id,
        role: 'student'
      }
    });

    // Количество субботников, в которых участвовали ученики класса
    const subbotniksCount = await CleaningRequest.count({
      include: [{
        model: User,
        where: {
          class_id: user.class_id,
          role: 'student'
        }
      }]
    });

    // Общее количество баллов учеников класса
    const totalPointsResult = await CleaningRequest.sum('score', {
      include: [{
        model: User,
        where: {
          class_id: user.class_id,
          role: 'student'
        }
      }]
    });

    const totalPoints = totalPointsResult || 0;

    res.status(200).json({
      studentsCount,
      subbotniksCount,
      totalPoints
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch teacher stats' });
  }
});
// Статистика для ученика (рейтинг в классе и школе)
router.get('/user/:id', auth(['student', 'user']), async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Рейтинг в классе
    const classRating = await CleaningRequest.findAll({
      include: [{
        model: User,
        where: {
          class_id: user.class_id,
          role: 'student'
        },
        attributes: ['id', 'name']
      }],
      attributes: [
        'user_id',
        [sequelize.fn('sum', sequelize.col('score')), 'total_score']
      ],
      group: ['user_id', 'User.id'],
      order: [[sequelize.literal('total_score'), 'DESC']]
    });

    const userClassRank = classRating.findIndex(u => u.user_id === parseInt(id)) + 1;

    // Рейтинг в школе
    const schoolRating = await CleaningRequest.findAll({
      include: [{
        model: User,
        where: {
          school_id: user.school_id,
          role: 'student'
        },
        attributes: ['id', 'name']
      }],
      attributes: [
        'user_id',
        [sequelize.fn('sum', sequelize.col('score')), 'total_score']
      ],
      group: ['user_id', 'User.id'],
      order: [[sequelize.literal('total_score'), 'DESC']]
    });

    const userSchoolRank = schoolRating.findIndex(u => u.user_id === parseInt(id)) + 1;

    // Общая статистика ученика
    const userStats = await CleaningRequest.findAll({
      where: { user_id: id },
      attributes: [
        [sequelize.fn('count', sequelize.col('id')), 'eventsCount'],
        [sequelize.fn('sum', sequelize.col('score')), 'totalPoints'],
        [sequelize.fn('avg', sequelize.col('score')), 'avgScore']
      ]
    });

    res.status(200).json({
      classRank: userClassRank,
      classTotal: classRating.length,
      schoolRank: userSchoolRank,
      schoolTotal: schoolRating.length,
      eventsCount: userStats[0]?.dataValues.eventsCount || 0,
      totalPoints: userStats[0]?.dataValues.totalPoints || 0,
      avgScore: Math.round((userStats[0]?.dataValues.avgScore || 0) * 100) / 100
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user stats' });
  }
});
module.exports = router;