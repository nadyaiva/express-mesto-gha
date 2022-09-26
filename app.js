const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routerUsers = require('./routes/user');
const routerCard = require('./routes/card');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { NOT_FOUND_CODE } = require('./utils/err');

const { PORT = 3000 } = process.env;

const app = express();
/*
app.use((req, res, next) => {
  req.user = {
    _id: '631f49b0c20f2fc8cbf0e350',
  };

  next();
});
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/mestodb');
app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/users', routerUsers);
app.use('/cards', routerCard);
app.use('*', (req, res) => {
  res.status(NOT_FOUND_CODE).send({
    message: 'Страница не найдена',
  });
});
app.listen(PORT, () => {
});
