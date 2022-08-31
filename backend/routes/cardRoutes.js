const express = require('express');
const cardController = require('../controllers/cardController');
const { validateCard, validateCardId } = require('../utils/validation');

const cardRoutes = express.Router();

cardRoutes.get('/', cardController.getCards);
cardRoutes.post('/', validateCard, cardController.addCard);
cardRoutes.delete('/:cardId', validateCardId, cardController.deleteCard);
cardRoutes.put('/:cardId/likes', validateCardId, cardController.addLike);
cardRoutes.delete('/:cardId/likes', validateCardId, cardController.deleteLike);

module.exports = { cardRoutes };
