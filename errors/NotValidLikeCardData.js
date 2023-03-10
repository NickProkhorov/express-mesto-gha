import NotValidData from "./NotValidData";

export default class NotValidLikeCardData extends NotValidData {
  constructor() {
    super(400, 'Переданы некорректные данные для постановки/снятии лайка.');
  }
}