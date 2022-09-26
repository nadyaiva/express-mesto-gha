const Card = require('../models/card');
const {
  WRONG_REQUEST_CODE, NOT_FOUND_CODE, serverRespondErr, NotFoundError,
} = require('../utils/err');

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

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Передан несуществующий id карточки');
    })
    .then((card) => {
      if (req.user._id !== card.owner.toString()) {
        throw new Error('Вы пытаетесь удалить чужую карточку');
      } Card.findByIdAndRemove(cardId)
        .then((cards) => res.send({ data: cards }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(WRONG_REQUEST_CODE).send({ message: 'Карточка с указанным _id не найдена.' });
      } else if (err.name === 'NotFound') {
        res.status(NOT_FOUND_CODE).send({ message: err.message });
      }
      serverRespondErr(res);
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    {
      new: true,
    },
  ).orFail(() => {
    throw new NotFoundError('Передан несуществующий id карточки');
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(NOT_FOUND_CODE).send({ message: 'Переданы некорректные данные для постановки лайка.' });
      } else if (err.name === 'NotFound') {
        res.status(NOT_FOUND_CODE).send({ message: err.message });
      } else if (err.name === 'CastError') {
        res.status(WRONG_REQUEST_CODE).send({ message: 'Передан несуществующий id карточки.' });
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
  ).orFail(() => {
    throw new NotFoundError('Передан несуществующий id карточки');
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(NOT_FOUND_CODE).send({ message: 'Переданы некорректные данные для снятии лайка.' });
      } else if (err.name === 'NotFound') {
        res.status(NOT_FOUND_CODE).send({ message: err.message });
      } else if (err.name === 'CastError') {
        res.status(WRONG_REQUEST_CODE).send({ message: 'Передан несуществующий id карточки.' });
      } else {
        serverRespondErr(res);
      }
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
