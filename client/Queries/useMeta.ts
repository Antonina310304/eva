import { useQuery, UseQueryResult } from 'react-query';

import { Api } from '@Api/index';
import { ApiMeta } from '@Api/Meta';
import useRequest from '@Hooks/useRequest';
import { MetaData } from '@Types/Meta';

export interface Params {
  ssr?: boolean;
}

const useMeta = (params?: Params): UseQueryResult<MetaData> => {
  const request = useRequest();
  const { ssr } = params || {};
  const keys = ['meta'];

  if (ssr) keys.push('ssr');

  return useQuery(
    keys,
    () => {
      Api.setRequest(request);

      return ApiMeta.fetch();
    },
    {
      retryOnMount: false,
      refetchOnMount: false,
    },
  );
};

export default useMeta;
