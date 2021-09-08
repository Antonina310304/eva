import { useQuery, UseQueryResult } from 'react-query';

import { ApiProfile } from '@Api/Profile';
import { Profile } from '@Types/Profile';

export interface Params {
  ssr?: boolean;
}

const useProfile = (params?: Params): UseQueryResult<Profile> => {
  const { ssr } = params || {};
  const keys = ['profile', ssr && 'ssr'].filter(Boolean);

  return useQuery(keys, () => ApiProfile.fetchProfile(), {
    retryOnMount: false,
    refetchOnMount: false,
  });
};

export default useProfile;
