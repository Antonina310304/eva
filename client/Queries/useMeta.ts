import { useQuery, UseQueryResult } from 'react-query';

import { ApiMeta } from '@Api/Meta';

export interface Params {
  ssr?: boolean;
}

const useMeta = (params?: Params): UseQueryResult => {
  const { ssr } = params || {};
  const keys = ['meta'];

  if (ssr) keys.push('ssr');

  return useQuery(keys, () => ApiMeta.fetch(), {
    retryOnMount: false,
    refetchOnMount: false,
  });
};

export default useMeta;
