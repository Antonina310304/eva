/* eslint-disable no-console */

import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import nodeConfig from '../webpack/configs/node';
import webConfig from '../webpack/configs/web';
import { compilerPromise } from './helpers';
import proxyRoutes from './router/proxies.dev';
import mainRoutes from './router/main.dev';
import paths from './paths';

const app = express();
const multiCompiler = webpack([nodeConfig, webConfig]);
const webCompiler = multiCompiler.compilers.find((compiler) => compiler.name === webConfig.name);
const nodeCompiler = multiCompiler.compilers.find((compiler) => compiler.name === nodeConfig.name);
const publicPath = webConfig.output.publicPath.toString();
const watchOptions = {
  ignored: /node_modules/,
  stats: nodeConfig.stats,
};

const start = async () => {
  app.use(publicPath, express.static(paths.dist.web));
  app.use(proxyRoutes);

  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use('*', (_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    next();
  });

  // Hot reload in dev mode
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

  app.listen(4444, () => {
    console.log('Eva listening on port 4444!');
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
