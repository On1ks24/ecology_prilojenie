const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const checkRoutes = require('./routes/checks');
const schoolRoutes = require('./routes/schools');
const inviteRoutes = require('./routes/invites');
const classRoutes = require('./routes/classes');
const statRoutes = require('./routes/stats');
const usersRouter = require('./routes/users');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Подключение маршрутов
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/checks', checkRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/invites', inviteRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/users', usersRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Тестовый маршрут
app.get('/', (req, res) => {
  res.send('Ecology App API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});