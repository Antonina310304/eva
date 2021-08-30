import dotenv from 'dotenv';
import express from 'express';
import cookie from 'cookie';
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
  '/assets',
  '/site/send-review',
  '/site/press-send-message',
  '/site/quality-department-send-message',
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

router.use('/p/:path', (req, res, next) => {
  const { path } = req.params;
  const isAbsolute = path.match(/^https?:\/\//);
  const url = isAbsolute ? path : `${backend}${path}`;

  proxy(url, {
    proxyReqPathResolver: (proxyReq) => {
      return `${decodeURIComponent(proxyReq.params.path)}`;
    },
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      const domain = new URL(backend).host;
      const cookies = cookie.parse(srcReq.headers.cookie);

      // Переопределяем домен для сессионных кук
      const cookieString = Object.entries(cookies).map(([name, value]) => {
        const opts = name.includes('_SESS_ID') ? { domain } : {};

        return cookie.serialize(name, value, opts);
      });

      return {
        ...proxyReqOpts,
        headers: {
          ...proxyReqOpts.headers,
          cookie: cookieString,
        },
      };
    },
  })(req, res, next);
});

export default router;
