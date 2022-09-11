const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({}).then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createCard = (req, res) => {
  const { cardName, link } = req.body;
  Card.create({ cardName, link, owner: req.user._id }).then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = { getCards, createCard, deleteCard };
