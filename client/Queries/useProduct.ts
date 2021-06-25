import { useQuery, UseQueryResult } from 'react-query';

import { ApiProduct } from '@Api/Product';

export interface Params {
  slug: string;
}

const useProduct = (params: Params): UseQueryResult => {
  const { slug } = params;

  return useQuery(['product', slug], () => ApiProduct.fetchProduct({ slug }), {
    retryOnMount: false,
    refetchOnMount: false,
  });
};

export default useProduct;
