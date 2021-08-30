import { ChunkExtractor } from '@loadable/server';
import serialize from 'serialize-javascript';
import { NodeOptions } from '@sentry/node';

import { envs } from '../../utils/envs';

export interface Params {
  html: string;
  state: any;
  webExtractor: ChunkExtractor;
}

export default ({ html, state, webExtractor }: Params): string => {
  const sentry: NodeOptions = { dsn: envs.sentryFrontendDsn, environment: envs.sentryEnv };
  const config = { env: envs.mode, sentry };

  return `<!DOCTYPE html>
    <html lang="ru">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
      ${webExtractor.getLinkTags()}
      ${webExtractor.getStyleTags()}
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="shortcut icon" href="/react/static/favicon.ico" type="image/x-icon">
    </head>
    <body>
      <div id="root">${html}</div>
      <script>window.__CONFIG__=${serialize(config, { isJSON: true })}</script>
      <script>window.__SERVER_STATE__=${serialize(state, { isJSON: true })}</script>
      <script src="https://polyfill.io/v3/polyfill.min.js?features=AbortController%2CIntersectionObserver"></script>
      ${webExtractor.getScriptTags()}
    </body>
    </html>
  `;
};
