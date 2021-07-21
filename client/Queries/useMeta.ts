import { useQuery, UseQueryResult } from 'react-query';

import { ApiMeta } from '@Api/Meta';
import useRequest from '@Hooks/useRequest';
import { MetaData } from '@Types/Meta';

export interface Params {
  ssr?: boolean;
}

const useMeta = (params?: Params): UseQueryResult<MetaData> => {
  const { cookie } = useRequest();
  const { ssr } = params || {};
  const keys = ['meta'];

  if (ssr) keys.push('ssr');

  return useQuery(keys, () => ApiMeta.fetch({ headers: { cookie } }), {
    retryOnMount: false,
    refetchOnMount: false,
  });
};

export default useMeta;
