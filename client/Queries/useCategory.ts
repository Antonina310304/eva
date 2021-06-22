import { useQuery, UseQueryResult } from 'react-query';

import { ApiCategory } from '@Api/Category';

export interface Params {
  slug: string;
}

const useCategory = (params: Params): UseQueryResult => {
  const { slug } = params;

  return useQuery(['category', slug], () => ApiCategory.fetchCategory({ slug }), {
    retryOnMount: false,
    refetchOnMount: false,
  });
};

export default useCategory;
