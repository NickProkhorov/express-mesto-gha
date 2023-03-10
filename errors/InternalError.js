
export default class InternalError extends Error {
  constructor( status = 500, message = 'Ошибка по умолчанию'){
    this.status = status;
    this.message = message;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}