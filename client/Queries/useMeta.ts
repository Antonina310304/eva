import { useQuery, UseQueryResult } from 'react-query';

import { ApiMeta } from '@Api/Meta';
import { MetaData } from '@Types/Meta';

export interface Params {
  ssr?: boolean;
  region?: string;
}

const useMeta = (params: Params = {}): UseQueryResult<MetaData> => {
  const { ssr, region } = params;
  const keys = ['meta'];

  if (ssr) keys.push('ssr');

  return useQuery(keys, () => ApiMeta.fetch({ region }), {
    retryOnMount: false,
    refetchOnMount: false,
  });
};

export default useMeta;
