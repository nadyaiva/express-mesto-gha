const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({}).then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createUser = (req, res) => {
  const { userName, about, avatar } = req.body;
  User.create({ userName, about, avatar }).then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const updateUser = (req, res) => {
  const { userName, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { userName, about })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ massage: err.massage }));
};

module.exports = {
  getUsers, getUserById, createUser, updateUser, updateAvatar,
};
