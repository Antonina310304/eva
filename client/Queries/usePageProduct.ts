import { useQuery, UseQueryResult } from 'react-query';

import { ApiProduct } from '@Api/Product';

export interface Params {
  slug: string;
  ssr?: boolean;
}

const usePageProduct = (params: Params): UseQueryResult<any> => {
  const { slug, ssr } = params;
  const keys = ['product', slug];

  if (ssr) keys.push('ssr');

  return useQuery(keys, () => ApiProduct.fetchProduct({ slug }), {
    retryOnMount: false,
    refetchOnMount: false,
  });
};

export default usePageProduct;
