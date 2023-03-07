// controllers/cards.js

const Card = require('../models/card');

module.exports.getCards = (req, res) => { // возвращает все карточки
  Card.find({})
    .then(cards => res.status(200).send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при запросе всех карточек' }))
};

module.exports.createCard = (req, res) => { // 2. POST /cards — создаёт карточку
  console.log(req.user._id); // _id станет доступен
};

// 3. DELETE /cards/:cardId — удаляет карточку по идентификатору

// 4. PUT /cards/:cardId/likes — поставить лайк карточке

// 5. DELETE /cards/:cardId/likes — убрать лайк с карточки
