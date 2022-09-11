const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/user');
const routerCard = require('./routes/card');

const { PORT = 3000 } = process.env;

const app = express();
app.use((req, res, next) => {
  req.user = {
    _id: '631de81080e1da0c40ea2e22',
  };

  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', routerUsers);
app.use('/card', routerCard);
app.listen(PORT, () => {
  console.log('Lontched');
});
