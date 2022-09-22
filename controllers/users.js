const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  WRONG_REQUEST_CODE, NOT_FOUND_CODE, serverRespondErr, NotFoundError,
} = require('../utils/err');

const getUsers = (req, res) => {
  User.find({}).then((users) => res.send(users))
    .catch(() => serverRespondErr());
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError('Передан несуществующий id пользователя');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(WRONG_REQUEST_CODE).send({ message: 'Пользователь с указанным id не найден.' });
      } else if (err.name === 'NotFound') {
        res.status(NOT_FOUND_CODE).send({ message: err.message });
      } else {
        serverRespondErr(res);
      }
    });
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })).then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(WRONG_REQUEST_CODE).send({ message: 'Переданы некорректные данные при создании пользователя.' });
        return;
      }
      serverRespondErr(res);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwtForAutorization', token, {
        maxAge: 604800,
        httpOnly: true,
      });
      res.send({ message: 'Вход выполнен успешно!' });
    })
    .catch(next);
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(WRONG_REQUEST_CODE).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
      } else if (err.name === 'CastError') {
        res.status(NOT_FOUND_CODE).send({ message: 'Пользователь с указанным id не найден.' });
      } else {
        serverRespondErr(res);
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(WRONG_REQUEST_CODE).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
      } else if (err.name === 'CastError') {
        res.status(NOT_FOUND_CODE).send({ message: 'Пользователь с указанным id не найден.' });
      } else {
        serverRespondErr(res);
      }
    });
};

module.exports = {
  getUsers, getUserById, createUser, login, updateUser, updateAvatar,
};
