const routerUsers = require('express').Router();
const { getUsers, createUser } = require('../controllers/users');

routerUsers.get('/', getUsers);
routerUsers.post('/', createUser);

module.exports = routerUsers;
