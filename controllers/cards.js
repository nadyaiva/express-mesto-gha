const Card = require('../models/card');
const {
  WRONG_REQUEST_CODE, NOT_FOUND_CODE, serverRespondErr,
} = require('../err');

const getCards = (req, res) => {
  Card.find({}).then((cards) => res.send(cards))
    .catch(() => serverRespondErr(res));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id }).then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(WRONG_REQUEST_CODE).send({ message: 'Переданы некорректные данные при создании карточки.' });
        return;
      }
      serverRespondErr(res);
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(NOT_FOUND_CODE).send({ massage: 'Карточка с указанным _id не найдена.' });
      }
      serverRespondErr(res);
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(WRONG_REQUEST_CODE).send({ massage: 'Переданы некорректные данные для постановки лайка.' });
      } else if (err.name === 'CastError') {
        res.status(NOT_FOUND_CODE).send({ massage: 'Передан несуществующий id карточки.' });
      } else {
        serverRespondErr(res);
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(WRONG_REQUEST_CODE).send({ massage: 'Переданы некорректные данные для снятии лайка.' });
      } else if (err.name === 'CastError') {
        res.status(NOT_FOUND_CODE).send({ massage: 'Передан несуществующий id карточки.' });
      } else {
        serverRespondErr(res);
      }
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
