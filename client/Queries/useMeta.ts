import { useQuery, UseQueryResult } from 'react-query';

import { ApiMeta } from '@Api/Meta';

const useMeta = (): UseQueryResult => {
  return useQuery('meta', () => ApiMeta.fetch(), {
    retryOnMount: false,
    refetchOnMount: false,
  });
};

export default useMeta;
