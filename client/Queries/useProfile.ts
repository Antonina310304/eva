import { useQuery, UseQueryResult } from 'react-query';

import { ApiProfile } from '@Api/Profile';

export interface Params {
  ssr?: boolean;
}

const useProfile = (params?: Params): UseQueryResult<any> => {
  const { ssr } = params || {};
  const keys = ['profile'];

  if (ssr) keys.push('ssr');

  return useQuery(keys, () => ApiProfile.fetchProfile(), {
    retryOnMount: false,
    refetchOnMount: false,
  });
};

export default useProfile;
