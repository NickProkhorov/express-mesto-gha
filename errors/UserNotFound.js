import NotValidData from "./NotValidData";

export default class UserNotFound extends NotValidData {
  constructor(){
    super(404,'Пользователь c указанным _id не найден');
  }
}

module.exports = UserNotFound;