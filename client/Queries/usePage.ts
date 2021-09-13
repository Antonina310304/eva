import { useQuery, UseQueryResult } from 'react-query';

import * as ApiPages from '@Api/Pages';

export interface Params {
  path: string;
  ssr?: boolean;
}

export type UsePageResult = any;

const usePage = (params?: Params): UseQueryResult<UsePageResult> => {
  const { path, ssr = true } = params || {};
  const keys = ['page', ssr && 'ssr', path].filter(Boolean);

  const result = useQuery(keys, () => ApiPages.fetchPage({ path }), {
    keepPreviousData: true,
    retryOnMount: false,
    refetchOnMount: false,
  });

  return result;
};

export default usePage;
