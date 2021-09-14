import * as ApiCategory from '@Api/Category';
import { QueryClient } from 'react-query';
import prefetchPage from './prefetchPage';

export default async (route: any, client: QueryClient): Promise<void> => {
  const { slug } = route.match.params;
  const keys = ['infiniteCategory', 'ssr', slug];

  await Promise.all([
    prefetchPage(route, client),
    client.prefetchInfiniteQuery(keys, ({ pageParam = 1 }) => {
      return ApiCategory.getProducts({ slug, page: pageParam });
    }),
  ]);
};
