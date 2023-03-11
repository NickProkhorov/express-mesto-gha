const CustomError = require('./customerror');

class CardNotFound extends CustomError {
  constructor(){
    super( 404, "Карточка с указанным _id не найдена." );
  }
}

module.exports = CardNotFound;