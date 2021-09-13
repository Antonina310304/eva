import { QueryClient } from 'react-query';

import prefetchPage from './prefetchPage';
import prefetchInfiniteCategory from './prefetchInfiniteCategory';

export default async (route: any, client: QueryClient): Promise<void> => {
  await Promise.all([prefetchPage(route, client), prefetchInfiniteCategory(route, client)]);
};
