import { Api } from '@Api/index';

export interface Params {
  slug: string;
  categories?: any[];
  filters: any;
}

export default async ({ slug, filters, categories }: Params): Promise<number> => {
  const searchParams = new URLSearchParams();

  searchParams.set('page', '1');
  if (categories.length > 0) searchParams.set('categories[]', categories.join());

  const url = `/category/${slug}/get-products-count?${searchParams.toString()}`;
  const res = await Api.queryProxi<any>(url, {
    method: 'POST',
    body: JSON.stringify(filters),
  });

  if (!res.ok) return Promise.resolve(res);

  return res.data.productsTotalCount;
};
