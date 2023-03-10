import InternalError from "./InternalError";

export default class ValidationError extends InternalError {
  constructor() {
    super( 400, 'Переданы некорректные данные при создании пользователя');
  }
}