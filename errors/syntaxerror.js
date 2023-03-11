const CustomError = require('./customerror');

class SyntaxError extends CustomError {
  constructor(){
    super( 400, "Произошла ошибка при обновлении пользователя" );
  }
}

module.exports = SyntaxError;