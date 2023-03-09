
const Card = require('../models/card');

module.exports.getCards = (req, res) => { // возвращает все карточки
  Card.find({})
    .then(cards => res.status(200).send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка при запросе всех карточек' }))
};

module.exports.createCard = (req, res) => { // создаёт карточку
  const { name, link } = req.body;
  const owner = req.user._id;

Card.create({ name, link, owner }) // создаем документ на основе пришедших данных
    .then(card => res.status(200).send({ data: card }))
    .catch(() => res.status(500).send({ message: 'ошибка при создании карточки' }))
};

module.exports.deleteCard = (req, res) => { // удаляет карточку по идентификатору
  Card.findByIdAndRemove(req.params.cardId)
      .then(card => res.send({ data: card }))
      .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.likeCard = (req, res) => { // поставить лайк карточке

  Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
  )
  .then(card => res.send({ data: card }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

module.exports.dislikeCard = (req, res) => { // 5. DELETE /cards/:cardId/likes — убрать лайк с карточки deleteLikeCard

  Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
  )
  .then(card => res.send({ data: card }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}