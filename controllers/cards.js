const http2 = require('http2');
const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(http2.constants.HTTP_STATUS_OK).send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(http2.constants.HTTP_STATUS_OK).send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((delCard) => {
      if (!delCard) {
        throw new NotFoundError('Карточка c указанным id не найдена');
      }
      const cardOwnerId = delCard.owner._id.toString();
      const userId = req.user._id.toString();
      if (cardOwnerId === userId) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((card) => {
            if (!card) {
              throw new NotFoundError('Карточка c указанным id не найдена');
            }
            return res.status(http2.constants.HTTP_STATUS_OK).send({ data: card });
          })
          .catch(next);
      } else {
        throw new BadRequestError('Нельзя удалить чужую карточку');
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }
      return res.status(http2.constants.HTTP_STATUS_OK).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Карточка с указанным id не существует'));
      }
      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Передан несуществующий _id карточки.');
      }
      return res.status(http2.constants.HTTP_STATUS_OK).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Карточка с указанным id не существует'));
      }
      return next(err);
    });
};
