require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { CORS } = require('./middlewares/cors');

const { validateUserData, validateAuth } = require('./utils/validation');
const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { userRoutes } = require('./routes/userRoutes');
const { cardRoutes } = require('./routes/cardRoutes');
const { createUser, login } = require('./controllers/userController');

const { handleError } = require('./middlewares/handleError');
const { NotFoundError } = require('./errors/not-found-err');

const { PORT = 3001 } = process.env;

const app = express();

app.use(CORS);
app.use(helmet());

app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signin',
  validateAuth,
  login,
);

app.post(
  '/signup',
  validateUserData,
  createUser,
);

app.use(auth);

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемой страницы не существует'));
});

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(handleError);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');
  console.log('Connected to db');

  await app.listen(PORT);
  console.log(`Server listen on ${PORT}`);
}

main();
