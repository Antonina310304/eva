import { ChunkExtractor } from '@loadable/server';

export interface Params {
  html: string;
  state: any;
  webExtractor: ChunkExtractor;
}

export default ({ html, state, webExtractor }: Params): string => {
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
      <script>
        window.__SERVER_STATE__=${JSON.stringify(state)}
      </script>
      ${webExtractor.getScriptTags()}
    </body>
    </html>
  `;
};
