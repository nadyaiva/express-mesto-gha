const routerUsers = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateAvatar, getUserMe,
} = require('../controllers/users');

routerUsers.get('/', getUsers);
routerUsers.get('/me', getUserMe);
routerUsers.get('/:userId', getUserById);
routerUsers.patch('/me', updateUser);
routerUsers.patch('/me/avatar', updateAvatar);

module.exports = routerUsers;
