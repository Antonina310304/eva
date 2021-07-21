import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { renderToString } from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import { StaticRouterContext } from 'react-router';
import { StaticRouter } from 'react-router-dom';
import { RequestHandler } from 'express';

import { paths } from '../../utils/paths';
import { renderPage } from '../helpers';

const render: RequestHandler = async (req, res) => {
  const routerContext: StaticRouterContext = {};
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const nodeExtractor = new ChunkExtractor({ statsFile: paths.stats.node });
  const { default: Entry } = nodeExtractor.requireEntrypoint();

  // Redirect
  if (routerContext.url) {
    return res.redirect(routerContext.statusCode, routerContext.url);
  }

  const webExtractor = new ChunkExtractor({ statsFile: paths.stats.web });
  const renderAndWait = async (): Promise<string> => {
    const components = (
      <QueryClientProvider client={queryClient}>
        <StaticRouter location={req.url} context={routerContext}>
          <Entry />
        </StaticRouter>
      </QueryClientProvider>
    );
    const jsx = webExtractor.collectChunks(components);
    const html = renderToString(jsx);
    const queryCache = queryClient.getQueryCache();
    const queries = queryCache.findAll();
    const ssrQueries = queries.filter((query) => {
      return (
        Array.isArray(query.queryKey) &&
        query.queryKey.includes('ssr') &&
        query.state.dataUpdateCount < 1
      );
    });

    if (ssrQueries.length) {
      const promises = ssrQueries.map((query) => query.fetch());
      await Promise.all(promises);

      const result = await renderAndWait();

      return result;
    }

    return html;
  };
  const html = await renderAndWait();
  const state = dehydrate(queryClient);
  const htmlDocument = renderPage({ html, state, webExtractor });

  return res.status(routerContext.statusCode || 200).send(htmlDocument);
};

export default render;
