// models/index.js
const { Sequelize } = require('sequelize');
const sequelize = require('../database');

// Импортируем модели
const School = require('./School');
const Class = require('./Class');
const User = require('./User');
const Event = require('./Event');
const UserEvent = require('./UserEvent');
const CleaningRequest = require('./CleaningRequest');
const Invitation = require('./Invitation');

// Определение связей между моделями
// Школа
School.hasMany(Class, { foreignKey: 'school_id' });
Class.belongsTo(School, { foreignKey: 'school_id' });

School.hasMany(User, { foreignKey: 'school_id' });
User.belongsTo(School, { foreignKey: 'school_id' });

School.hasMany(Event, { foreignKey: 'school_id' });
Event.belongsTo(School, { foreignKey: 'school_id' });

// Пользователь
User.hasMany(Event, { foreignKey: 'organizer_id' });
Event.belongsTo(User, { foreignKey: 'organizer_id' });

User.hasMany(CleaningRequest, { foreignKey: 'user_id' });
CleaningRequest.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(CleaningRequest, { foreignKey: 'reviewed_by' });
CleaningRequest.belongsTo(User, { foreignKey: 'reviewed_by' });

User.hasMany(Invitation, { foreignKey: 'created_by' });
Invitation.belongsTo(User, { foreignKey: 'created_by' });

// Класс
Class.hasMany(User, { foreignKey: 'class_id' });
User.belongsTo(Class, { foreignKey: 'class_id' });

Class.hasMany(Invitation, { foreignKey: 'class_id' });
Invitation.belongsTo(Class, { foreignKey: 'class_id' });

// Мероприятие
Event.hasMany(UserEvent, { foreignKey: 'event_id' });
UserEvent.belongsTo(Event, { foreignKey: 'event_id' });

Event.hasMany(CleaningRequest, { foreignKey: 'event_id' });
CleaningRequest.belongsTo(Event, { foreignKey: 'event_id' });

// Участник мероприятия
User.hasMany(UserEvent, { foreignKey: 'user_id' });
UserEvent.belongsTo(User, { foreignKey: 'user_id' });

// Приглашение
School.hasMany(Invitation, { foreignKey: 'school_id' });
Invitation.belongsTo(School, { foreignKey: 'school_id' });

module.exports = {
  sequelize,
  School,
  Class,
  User,
  Event,
  UserEvent,
  CleaningRequest,
  Invitation
};