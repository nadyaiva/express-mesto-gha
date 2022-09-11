const express = require('express');
const mongoose = require('mongoose');
const routerUsers = require('./routes/user');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', routerUsers);

app.listen(PORT, () => {
  console.log('Lontched');
});
