import NotValidData from "./NotValidData";

export default class NotValidCreateCardData extends NotValidData {
  constructor() {
    super(400, 'Переданы некорректные данные при создании карточки.');
  }
}