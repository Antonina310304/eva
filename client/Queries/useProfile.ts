import { useQuery, UseQueryResult } from 'react-query';

import { Api } from '@Api/index';
import { ApiProfile } from '@Api/Profile';
import useRequest from '@Hooks/useRequest';
import { Profile } from '@Types/Profile';

export interface Params {
  ssr?: boolean;
}

const useProfile = (params?: Params): UseQueryResult<Profile> => {
  const request = useRequest();
  const { ssr } = params || {};
  const keys = ['profile'];

  if (ssr) keys.push('ssr');

  return useQuery(
    keys,
    () => {
      Api.setRequest(request);

      return ApiProfile.fetchProfile();
    },
    {
      retryOnMount: false,
      refetchOnMount: false,
    },
  );
};

export default useProfile;
