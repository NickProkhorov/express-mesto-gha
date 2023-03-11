const CardNotFound = require('../errors/cardnotfound');
const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.status(200).send({ data: cards }))
    .catch((err) => res.status(500).send({ message: 'Произошла ошибка при запросе всех карточек' })
)};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
      .then(card => res.status(200).send({ data: card }))
      .catch((err) => {
        if ( err.name === 'ValidationError') {
          res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' })
        } else {
          res.status(500).send({ message: 'Ошибка по умолчанию'} )
        }
      })
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
      .then((card) => {
        if(!card) {
          return res.status(404).send({ message: "Пользователь c указанным id не найден" })
        }
        res.status(200).send({ data: card })})
        .catch((err)=> {
          if (err.name === 'ValidationError') {
            return res.status(400).send({ message: "Переданы некорректные данные при обновлении профиля" })
          } else {
            res.status(500).send({message: 'Ошибка по умолчанию'})
          }
        })
};

module.exports.likeCard = (req, res) => {

  Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
  )
  .then((card) => {
    if(!card) {
      return res.status(404).send({ message: "Передан несуществующий _id карточки." })
    }
    res.status(200).send({ data: card })
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: "Переданы некорректные данные для постановки/снятия лайка." })
    } else {
        res.status(500).send({message: 'Ошибка по умолчанию'})
    }
  })
}

module.exports.dislikeCard = (req, res) => {

  Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
  )
  .then((card) => {
    if(!card) {
      return res.status(404).send({ message: "Передан несуществующий _id карточки." })
    }
    res.status(200).send({ data: card })
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(400).send({ message: "Переданы некорректные данные для постановки/снятия лайка." })
    } else {
        res.status(500).send({message: 'Ошибка по умолчанию'})
    }
  })
}