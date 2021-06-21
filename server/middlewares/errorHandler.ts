import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  // eslint-disable-next-line no-console
  console.log(error);

  return res.status(500).send();
};

export default errorHandler;
