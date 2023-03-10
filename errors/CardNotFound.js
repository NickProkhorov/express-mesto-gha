import NotValidData from "./NotValidData";

export default class CardNotFound extends NotValidData {
  constructor() {
    super(404, 'Карточка с указанным _id не найдена.');
  }
}