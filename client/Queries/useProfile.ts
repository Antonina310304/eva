import { useQuery, UseQueryResult } from 'react-query';

import { ApiProfile } from '@Api/Profile';
import { Profile } from '@Types/Profile';
import useMeta from './useMeta';

export interface Params {
  ssr?: boolean;
}

const useProfile = (params?: Params): UseQueryResult<Profile> => {
  const { ssr } = params || {};
  const keys = ['profile', ssr && 'ssr'].filter(Boolean);
  const meta = useMeta({ ssr });

  return useQuery(keys, () => ApiProfile.fetchProfile(), {
    enabled: meta.isSuccess && meta.data.country === 'RUS',
    retryOnMount: false,
    refetchOnMount: false,
  });
};

export default useProfile;
