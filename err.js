const WRONG_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const SERVER_ERROR_CODE = 500;
const SERVER_ERROR_MESSAGE = 'Ошибка на стороне сервера';

const serverRespondErr = (res) => {
  res.status(SERVER_ERROR_CODE).send({ message: SERVER_ERROR_MESSAGE });
};

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

module.exports = {
  WRONG_REQUEST_CODE, NOT_FOUND_CODE, NotFoundError, serverRespondErr,
};
