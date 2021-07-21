import { useQuery, UseQueryResult } from 'react-query';

import { ApiProfile } from '@Api/Profile';
import useRequest from '@Hooks/useRequest';
import { Profile } from '@Types/Profile';

export interface Params {
  ssr?: boolean;
}

const useProfile = (params?: Params): UseQueryResult<Profile> => {
  const { cookie } = useRequest();
  const { ssr } = params || {};
  const keys = ['profile'];

  if (ssr) keys.push('ssr');

  return useQuery(keys, () => ApiProfile.fetchProfile({ headers: { cookie } }), {
    retryOnMount: false,
    refetchOnMount: false,
  });
};

export default useProfile;
