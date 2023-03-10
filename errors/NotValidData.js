export default class NotValidData extends Error {
  constructor(status = 400, message = 'Переданы не корректные данные') {
    this.status = status;
    this.message = message;
    this.name = this.constructor.name;
  }
}