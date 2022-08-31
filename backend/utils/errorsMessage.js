const { BadRequestError } = require('../errors/bad-request-err');
const { ConflictError } = require('../errors/conflict-err');

const errorMessage = (err, req, res, next) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    next(new BadRequestError('Переданы некорректные данные'));
  }
  if (err.code === 11000) {
    next(new ConflictError('Пользователь с таким email уже существует'));
  }
  next(err);
};

module.exports = { errorMessage };
