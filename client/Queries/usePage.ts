import { useQuery, UseQueryResult } from 'react-query';

import { ApiPages } from '@Api/Pages';
import { ProductData } from '@Types/Product';

export interface Params {
  path: string;
  ssr?: boolean;
}

export interface UsePageResult {
  ar: any;
  breadcrumbs: any[];
  title: string;
  rubrics: any[];
  popularLinks: any[];
  description: string;
  layers: any[];
  priorityParameter: any;
  categoryTranslite: string;
  reviewsSubgallery: any[];
  product: ProductData;
  products: ProductData[];
  mediaGallery: any;
  cylindo: any;
  crossSalesProducts: any;
  sameProducts: any;
  historyProducts: any;
  instagram: any;
  productsModel: any;
}

const usePage = (params: Params): UseQueryResult<UsePageResult> => {
  const { path, ssr } = params;
  const keys = ['page', path];

  if (ssr) keys.push('ssr');

  const result = useQuery(keys, () => ApiPages.fetchPage({ path }), {
    keepPreviousData: true,
    retryOnMount: false,
    refetchOnMount: false,
  });

  return result;
};

export default usePage;
