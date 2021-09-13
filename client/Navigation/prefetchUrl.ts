import { QueryClient } from 'react-query';

import * as prefetchers from './prefetchers';
import findRouteByUrl from './findRouteByUrl';

export default async (url: string, client: QueryClient): Promise<void> => {
  const route = findRouteByUrl(url);

  if (!route) return Promise.reject(new Error(`Not found route for URL ${url}`));

  const prefetchFn = prefetchers[route.name] || prefetchers.prefetchPage;

  return prefetchFn(route, client);
};
