/* eslint-disable no-console */

import express from 'express';

import { partialRender, fullRender, errorHandler } from './middlewares';
import paths from './paths';

const app = express();
app.use('/assets', express.static(paths.dist.web));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('*', (_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');

  next();
});

// Мониторинг доступности для внешних сервисов
app.get('/health', (_req, res) => {
  res.header('Content-type', 'text/plain; charset=utf-8').send('Eva is running');
});

// Разные типы рендера страниц
app.post('/render', partialRender);
app.post('/full-render', fullRender);

app.use(errorHandler);

app.listen(4444, () => {
  console.log('Eva listening on port 4444!');
});
