import { QueryClient } from 'react-query';

import * as ApiCategory from '@Api/Category';

export default async (route: any, client: QueryClient): Promise<void> => {
  const { slug } = route.match.params;
  const keys = ['infiniteCategory', 'ssr', slug];

  await client.prefetchInfiniteQuery(keys, ({ pageParam = 1 }) => {
    return ApiCategory.getProducts({ slug, page: pageParam });
  });
};
