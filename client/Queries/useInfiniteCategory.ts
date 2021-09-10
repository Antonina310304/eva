import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';

import * as ApiCategory from '@Api/Category';

export interface Params {
  slug: string;
  search?: string;
  ssr?: boolean;
}

export type Result = UseInfiniteQueryResult<any>;

const useInfiniteCategory = (params: Params): Result => {
  const { slug, ssr = true, search } = params || {};
  const keys = ['infiniteCategory', ssr && 'ssr', slug, search].filter(Boolean);
  const category = useInfiniteQuery(
    keys,
    ({ pageParam = 1 }) => ApiCategory.getProducts({ slug, page: pageParam, search }),
    {
      initialData: {
        pageParams: [1],
        pages: [{ page: 0 }],
      },
      keepPreviousData: true,
      retryOnMount: false,
      refetchOnMount: false,
      getNextPageParam: (lastPage) => {
        if (typeof lastPage.sectionCountLeft === 'number') {
          return lastPage.sectionCountLeft ? lastPage.page + 1 : null;
        }

        return lastPage.productsCountLeft ? lastPage.page + 1 : null;
      },
    },
  );

  return category;
};

export default useInfiniteCategory;
