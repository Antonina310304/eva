import { Api } from '@Api/index';

export interface Params {
  slug: string;
  page: number;
  filters: any;
  categories?: string[];
}

export default async ({ slug, page, filters, categories = [] }: Params): Promise<any> => {
  const searchParams = new URLSearchParams();

  searchParams.set('page', page.toString());
  if (categories.length > 0) searchParams.set('categories[]', categories.join());

  const url = `/category/${slug}/get-products?${searchParams.toString()}`;
  const res = await Api.queryProxi<any>(url, { method: 'POST', body: JSON.stringify(filters) });

  if (!res.ok) return Promise.reject(res);

  return res.data;
};
