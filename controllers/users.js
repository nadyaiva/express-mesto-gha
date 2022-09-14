const User = require('../models/user');
const {
  WRONG_REQUEST_CODE, NOT_FOUND_CODE, serverRespondErr,
} = require('../err');

const getUsers = (req, res) => {
  User.find({}).then((users) => res.send(users))
    .catch(() => serverRespondErr());
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(WRONG_REQUEST_CODE).send({ massage: 'Пользователь с указанным id не найден.' });
      } else {
        serverRespondErr(res);
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar }).then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(WRONG_REQUEST_CODE).send({ message: 'Переданы некорректные данные при создании пользователя.' });
        return;
      }
      serverRespondErr(res);
    });
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
        res.status(WRONG_REQUEST_CODE).send({ massage: 'Переданы некорректные данные при обновлении профиля.' });
      } else if (err.name === 'CastError') {
        res.status(NOT_FOUND_CODE).send({ massage: 'Пользователь с указанным id не найден.' });
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
        res.status(WRONG_REQUEST_CODE).send({ massage: 'Переданы некорректные данные при обновлении аватара.' });
      } else if (err.name === 'CastError') {
        res.status(NOT_FOUND_CODE).send({ massage: 'Пользователь с указанным id не найден.' });
      } else {
        serverRespondErr(res);
      }
    });
};

module.exports = {
  getUsers, getUserById, createUser, updateUser, updateAvatar,
};
