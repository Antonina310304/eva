import { useQuery, UseQueryResult } from 'react-query';

import * as ApiPages from '@Api/Pages';

export interface Params {
  path: string;
  ssr?: boolean;
}

function usePage<T>(params?: Params): UseQueryResult<T> {
  const { path, ssr = true } = params || {};
  const keys = ['page', ssr && 'ssr', path].filter(Boolean);

  const result = useQuery(keys, () => ApiPages.fetchPage({ path }), {
    keepPreviousData: true,
    retryOnMount: false,
    refetchOnMount: false,
  });

  return result;
}

export default usePage;
