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

module.exports = { getUsers, getUserById, createUser };
