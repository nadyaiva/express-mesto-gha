const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  cardname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('card', cardSchema);
