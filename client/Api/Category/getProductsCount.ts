import { Api } from '@Api/index';

export interface Params {
  slug: string;
  categories?: any[];
  filters: any;
}

export default async ({ slug, filters, categories }: Params): Promise<number> => {
  const url = `/category/${slug}/get-products-count?page=1&categories[]=${categories}`;
  const res = await Api.queryProxi<any>(url, {
    method: 'POST',
    body: JSON.stringify(filters),
  });

  if (!res.ok) return Promise.resolve(res);

  return res.data.productsTotalCount;
};
