import NotValidData from "./NotValidData";

export default class NotValidUserData extends NotValidData {
  constructor() {
    super(400, 'Переданы некорректные данные при создании пользователя');
  }
}