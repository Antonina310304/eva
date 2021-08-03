import dotenv from 'dotenv';
import express from 'express';
import proxy, { ProxyOptions } from 'express-http-proxy';

import { envs } from '../../utils/envs';
import { paths } from '../../utils/paths';

dotenv.config();

const backend = envs.backendOrigin;
const router = express.Router();
const proxyOptions: ProxyOptions = { proxyReqPathResolver: (req) => `${req.originalUrl}` };
const routes = [
  '/react/static',
  '/fonts',
  '/marketing-event',
  '/images',
  '/compare/v2',
  '/history/v2',
  '/cart-2',
  '/cabinet/api',
  '/assets',
  '/order/get-bonus-earned-amount',
  '/shop-product/operator-delivery',
  '/promo/get-products',
  '/category/*/get-products',
  '/site/send-review',
  '/site/press-send-message',
  '/site/quality-department-send-message',
  '/product/configurator',
  '/shop-product/info-by-params',
  '/cabinet/formes',
  '/json-schema',
  '/robots.txt',
  '/sitemap.xml',
];

routes.forEach((route) => {
  router.use(`/:regionSlug${route}`, (req, res, next) => {
    const { regionSlug } = req.params;

    // Путь /react/assets/* это не файл с регионом react, это отдельная директория!
    if (regionSlug === 'react') {
      express.static(paths.dist.web)(req, res, next);
    } else {
      proxy(backend, proxyOptions)(req, res, next);
    }
  });
  router.use(route, proxy(backend, proxyOptions));
});

router.use('/proxy', (req, res, next) => {
  const { path } = req.query as { path: string };
  const isAbsolute = path.match(/^https?:\/\//);
  const url = isAbsolute ? path : `${backend}${path}`;

  proxy(url, {
    proxyReqPathResolver: (proxyReq) => `${proxyReq.query.path}`,
  })(req, res, next);
});

export default router;
