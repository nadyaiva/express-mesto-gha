const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/user');
const routerCard = require('./routes/card');

const { PORT = 3000 } = process.env;

const app = express();
app.use((req, res, next) => {
  req.user = {
    _id: '631f49b0c20f2fc8cbf0e350',
  };

  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', routerUsers);
app.use('/cards', routerCard);
app.listen(PORT, () => {
  console.log('Lontched');
});
