import * as ApiPages from '@Api/Pages';
import { QueryClient } from 'react-query';

export default async (route: any, client: QueryClient): Promise<void> => {
  const { url } = route.match;
  const keys = ['page', 'ssr', url];

  await client.prefetchQuery(keys, () => {
    return ApiPages.fetchPage({ path: url });
  });
};
