import { useInfiniteQuery, UseInfiniteQueryResult, UseQueryResult } from 'react-query';

import { ApiPages } from '@Api/Pages';
import usePage from '@Queries/usePage';

export interface Params {
  path: string;
  ssr?: boolean;
}

export interface Result {
  page: UseQueryResult<any>;
  category: UseInfiniteQueryResult<any>;
}

const useInfiniteCategory = ({ path }: Params): Result => {
  const keys = ['infiniteCategory', 'ssr', path];
  const page = usePage({ path, ssr: true });
  const category = useInfiniteQuery(
    keys,
    ({ pageParam = 1 }) => {
      try {
        const [p = '', qs = ''] = path.split('?');
        const searchParams = new URLSearchParams(qs);

        if (pageParam > 1) {
          searchParams.append('page', pageParam);
        }

        return ApiPages.fetchPage({ path: `${p}?${searchParams.toString()}` });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);

        return null;
      }
    },
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
      select: (data) => ({
        pages: data.pages.map((dataPage) => ({
          page: dataPage.page,
          products: dataPage.products,
          productsCountLeft: dataPage.productsCountLeft,
          productsModel: dataPage.productsModel,
        })),
        pageParams: data.pageParams,
      }),
    },
  );

  return {
    page,
    category,
  };
};

export default useInfiniteCategory;
