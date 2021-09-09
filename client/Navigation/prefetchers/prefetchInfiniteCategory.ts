import { ApiPages } from '@Api/Pages';
import { QueryClient } from 'react-query';

export default async (url: string, client: QueryClient): Promise<void> => {
  await client.prefetchInfiniteQuery(['infiniteCategory', 'ssr', url], ({ pageParam = 1 }) => {
    const [p = '', qs = ''] = url.split('?');
    const searchParams = new URLSearchParams(qs);

    if (pageParam > 1) {
      searchParams.append('page', pageParam);
    }

    return ApiPages.fetchPage({ path: `${p}?${searchParams.toString()}` });
  });
};
