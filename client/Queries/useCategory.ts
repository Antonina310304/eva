import { useQuery } from 'react-query';

import { ApiCategory } from '@Api/Category';

export interface Params {
  slug: string;
}

const useCategory = (params: Params) => {
  const { slug } = params;

  return useQuery(['category', slug], () => ApiCategory.fetchCategory({ slug }));
};

export default useCategory;
