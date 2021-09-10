import { useQuery, UseQueryResult } from 'react-query';

import * as ApiMeta from '@Api/Meta';
import { Layout } from '@Types/Layout';

export interface Params {
  ssr?: boolean;
}

const useLayout = (params?: Params): UseQueryResult<Layout> => {
  const { ssr = true } = params || {};
  const keys = ['layout', ssr && 'ssr'];

  const result = useQuery(keys, () => ApiMeta.getLayout(), {
    keepPreviousData: true,
    retryOnMount: false,
    refetchOnMount: false,
  });

  return result;
};

export default useLayout;
