import { useQuery, UseQueryResult } from 'react-query';

import { ApiCategory } from '@Api/Category';

export interface Params {
  slug: string;
  ssr?: boolean;
}

const useCategory = (params: Params): UseQueryResult => {
  const { slug, ssr } = params;
  const keys = ['category', slug];

  if (ssr) keys.push('ssr');

  return useQuery(keys, () => ApiCategory.fetchCategory({ slug }), {
    retryOnMount: false,
    refetchOnMount: false,
  });
};

export default useCategory;
