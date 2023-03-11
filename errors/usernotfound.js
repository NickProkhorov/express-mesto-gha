const CustomError = require('./customerror');

class UserNotFound extends CustomError {
  constructor(){
    super( 404, "Пользователь c указанным id не найден" );
  }
}

module.exports = UserNotFound;
