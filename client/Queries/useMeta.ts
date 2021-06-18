import { useQuery } from 'react-query';

import { ApiMeta } from '@Api/Meta';

const useMeta = () => {
  return useQuery('meta', () => ApiMeta.fetch(), {
    retryOnMount: false,
    refetchOnMount: false,
  });
};

export default useMeta;
