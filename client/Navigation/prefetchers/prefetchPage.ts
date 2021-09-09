import { ApiPages } from '@Api/Pages';
import { QueryClient } from 'react-query';

export default async (url: string, client: QueryClient): Promise<void> => {
  await client.prefetchQuery(['page', 'ssr', url], () => {
    return ApiPages.fetchPage({ path: url });
  });
};
