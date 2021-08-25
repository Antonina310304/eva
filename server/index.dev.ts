/* eslint-disable no-console */

import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import * as Sentry from '@sentry/node';

import nodeConfig from '../webpack/configs/node';
import webConfig from '../webpack/configs/web';
import { compilerPromise } from './helpers';
import proxyRoutes from './router/proxies';
import mainRoutes from './router/main';
import { envs } from '../utils/envs';
import { paths } from '../utils/paths';

Sentry.init({ dsn: envs.sentryBffDsn, environment: envs.sentryEnv });

const app = express();
const publicPath = webConfig.output.publicPath.toString();
const watchOptions = {
  ignored: /node_modules/,
  stats: nodeConfig.stats,
};
const multiCompiler = webpack([nodeConfig, webConfig]);
const webCompiler = multiCompiler.compilers.find((compiler) => compiler.name === webConfig.name);
const nodeCompiler = multiCompiler.compilers.find((compiler) => compiler.name === nodeConfig.name);

const start = async () => {
  app.use(Sentry.Handlers.requestHandler());
  app.disable('x-powered-by');

  app.use(publicPath, express.static(paths.dist.web));
  app.use('/react/static', express.static(paths.static));
  app.use(proxyRoutes);

  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use('*', (_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    next();
  });

  app.use(
    webpackDevMiddleware(webCompiler, {
      publicPath,
      serverSideRender: true,
      writeToDisk(filePath) {
        return filePath.includes('dist/node/') || filePath.includes('loadable-stats');
      },
    }),
  );
  app.use(webpackHotMiddleware(webCompiler));

  app.use(mainRoutes);

  app.use(Sentry.Handlers.errorHandler());

  app.listen(envs.port, () => {
    console.log(`Eva listening on port ${envs.port}!`);
  });

  nodeCompiler.watch(watchOptions, (err) => {
    if (err) throw err;

    console.log('Watch node...');
  });

  try {
    await compilerPromise('web', webCompiler);
    await compilerPromise('node', nodeCompiler);
  } catch (error) {
    console.log('Error', error.message);
  }
};

start();
