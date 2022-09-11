const routerUsers = require('express').Router();
const { getUsers } = require('../controllers/users');

routerUsers.get('/', getUsers);

module.exports = routerUsers;
