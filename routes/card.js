const routerCard = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, deletelikeCard,
} = require('../controllers/cards');

routerCard.get('/', getCards);
routerCard.post('/', createCard);
routerCard.delete('/:cardId', deleteCard);
routerCard.patch('/:cardId/likes', likeCard);
routerCard.delete('/:cardId/likes', deletelikeCard);

module.exports = routerCard;
