const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routerUsers = require('./routes/user');
const routerCard = require('./routes/card');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { NotFoundError } = require('./utils/NotFoundError');
const handleError = require('./middlewares/handleError');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/mestodb');
app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/users', routerUsers);
app.use('/cards', routerCard);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});
app.use(handleError);
app.listen(PORT, () => {
});
