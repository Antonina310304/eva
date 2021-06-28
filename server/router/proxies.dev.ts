import dotenv from 'dotenv';
import express from 'express';
import proxy, { ProxyOptions } from 'express-http-proxy';

dotenv.config();

const backend = process.env.BACKEND_ORIGIN;
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

routes.map((route) => router.use(route, proxy(backend, proxyOptions)));

router.use(
  '/proxy',
  proxy(backend, {
    proxyReqPathResolver: (req) => `${req.url}`,
  }),
);

export default router;
