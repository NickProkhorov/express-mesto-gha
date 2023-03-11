class CustomError extends Error {
  constructor(status = 500, message = "Ошибка по умолчанию"){
    super();
    this.status = status;
    this.message = message;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CustomError;