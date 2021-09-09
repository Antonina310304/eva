import { QueryClient } from 'react-query';

import prefetchPage from './prefetchPage';
import prefetchInfiniteCategory from './prefetchInfiniteCategory';

export default async (url: string, client: QueryClient): Promise<void> => {
  await Promise.all([await prefetchPage(url, client), await prefetchInfiniteCategory(url, client)]);
};
