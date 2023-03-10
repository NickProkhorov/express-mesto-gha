const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

let err = new Error("Объект не найден"); // создаём стандартную ошибку с текстом "Объект не найден"
err.name = "NotFoundError"; // задаём NotFoundError в качестве имени ошибки
console.log(err.name);