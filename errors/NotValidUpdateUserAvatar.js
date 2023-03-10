import NotValidData from "./NotValidData";

export default class NotValidUpdateUserAvatar extends NotValidData {
  constructor() {
    super(400, 'Переданы некорректные данные при обновлении аватара.');
  }
}