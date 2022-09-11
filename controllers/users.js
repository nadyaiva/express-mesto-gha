const User = require('../models/user');

const getUsers = (req, res) => {
  res.send({ massage: 'Hi' });
};

const createUser = (req, res) => {
  const { userName, about, avatar } = req.body;
  User.create({ userName, about, avatar }).then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = { getUsers, createUser };
