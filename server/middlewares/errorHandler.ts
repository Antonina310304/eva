import { ErrorRequestHandler } from 'express';

import { render, renderPage } from '../helpers';

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  // Пытаемся отрендерить хотя бы страницу ошибки, которая будет содержать
  // информацию о произошедшей ошибке. Если не получилось и этого, то отдаем пустое содержимое
  // и логируем ошибку
  try {
    const jsonError = {};

    Object.getOwnPropertyNames(error).forEach((key) => {
      jsonError[key] = error[key];
    });

    const body = {
      originalUrl: req.originalUrl,
      originalData: req.body,
      error: jsonError,
      meta: {},
    };
    const resources = render({
      page: 'PageError',
      body,
    });
    const html = renderPage({ resources, body });

    return res.status(500).send(html);
  } catch (complexError) {
    // eslint-disable-next-line no-console
    console.log('Error on render', complexError);

    return res.status(500).send();
  }
};

export default errorHandler;
