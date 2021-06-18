import React from 'react';
import path from 'path';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';

import DataProvider from '../../client/Contexts/Data/DataProvider';
import createScriptTagState from './createScriptTagState';
import { paths } from '../../utils/paths';

const nodeStats = path.resolve(paths.dist.node, 'loadable-stats.json');
const webStats = path.resolve(paths.dist.web, 'loadable-stats.json');

const isDev = process.env.NODE_ENV === 'development';
const options = {
  publicPath: process.env.REACT_PUBLIC_PATH,
};

const mapExtractors = {};
function getExtractors(page: string) {
  // В режиме разработки всегда нужны актуальные экстракторы, иначе клиентский и серверный рендер
  // начнет отличаться после любого изменения кода компонентов
  if (isDev || !mapExtractors[page]) {
    const nodeExtractor = new ChunkExtractor({
      ...options,
      statsFile: nodeStats,
    });
    const webExtractor = new ChunkExtractor({
      ...options,
      statsFile: webStats,
    });
    const Entry = nodeExtractor.requireEntrypoint().default;

    mapExtractors[page] = {
      nodeExtractor,
      webExtractor,
      Entry,
    };
  }

  return mapExtractors[page];
}

export default ({ page, body }) => {
  const { Entry, webExtractor } = getExtractors(page);
  const fullBody = { ...body, page };

  const components = (
    <DataProvider body={fullBody}>
      <Entry />
    </DataProvider>
  );
  const jsx = webExtractor.collectChunks(components);

  // Сначала рендерим HTML и после этого используем getScriptsTags и прочее,
  // иначе @loadable не найдёт чанки
  const html = `<div id="root">${renderToString(jsx)}</div>`;
  const linkTags = webExtractor.getLinkTags();
  const styleTags = webExtractor.getStyleTags();
  const scriptTags = createScriptTagState(fullBody) + webExtractor.getScriptTags();

  return {
    html,
    linkTags,
    styleTags,
    scriptTags,
  };
};
