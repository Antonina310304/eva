/* eslint-disable no-console */

import express from 'express';
import compression from 'compression';

import webConfig from '../webpack/configs/web';
import proxyRoutes from './router/proxies.dev';
import mainRoutes from './router/main.dev';
import { envs } from '../utils/envs';
import { paths } from '../utils/paths';

const app = express();
const publicPath = webConfig.output.publicPath.toString();

app.use(compression());
app.use(publicPath, express.static(paths.dist.web));
app.use('/react/static', express.static(paths.static));
app.use(proxyRoutes);

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('*', (_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');

  next();
});

app.use(mainRoutes);

app.listen(envs.port, () => {
  console.log(`Eva listening on port ${envs.port}!`);
});
