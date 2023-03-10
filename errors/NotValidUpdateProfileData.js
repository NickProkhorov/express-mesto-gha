import NotValidData from "./NotValidData";

export default class NotValidUpdateProfileData extends NotValidData {
  constructor() {
    super(400, 'Переданы некорректные данные при обновлении профиля');
  }
}