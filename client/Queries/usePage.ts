import { useQuery, UseQueryResult } from 'react-query';

import { ApiPages } from '@Api/Pages';

export interface Params {
  path: string;
  ssr?: boolean;
}

const usePage = (params: Params): UseQueryResult<any> => {
  const { path, ssr } = params;
  const keys = ['page', path];

  if (ssr) keys.push('ssr');

  const result = useQuery(keys, () => ApiPages.fetchPage({ path }), {
    keepPreviousData: true,
    retryOnMount: false,
    refetchOnMount: false,
  });

  return result;
};

export default usePage;
