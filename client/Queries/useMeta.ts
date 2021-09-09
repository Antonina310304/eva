import { useQuery, UseQueryResult } from 'react-query';
import { useParams } from 'react-router';

import * as ApiMeta from '@Api/Meta';
import { MetaData } from '@Types/Meta';

export interface Params {
  ssr?: boolean;
}

export interface RouteParams {
  region?: string;
}

const useMeta = (params: Params = {}): UseQueryResult<MetaData> => {
  const { ssr } = params;
  const { region } = useParams<RouteParams>();
  const keys = ['meta', ssr && 'ssr', region].filter(Boolean);

  return useQuery(keys, () => ApiMeta.fetch(), {
    retryOnMount: false,
    refetchOnMount: false,
  });
};

export default useMeta;
