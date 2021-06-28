import { useQuery, UseQueryResult } from 'react-query';

import { ApiProduct } from '@Api/Product';
import { ProductData } from '@Types/Product';

export interface Params {
  slug: string;
  ssr?: boolean;
}

const useProduct = (params: Params): UseQueryResult<any> => {
  const { slug, ssr } = params;
  const keys = ['product', slug];

  if (ssr) keys.push('ssr');

  return useQuery(keys, () => ApiProduct.fetchProduct({ slug }), {
    retryOnMount: false,
    refetchOnMount: false,
  });
};

export default useProduct;
