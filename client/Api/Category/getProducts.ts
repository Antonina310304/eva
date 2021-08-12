import { Api } from '@Api/index';

export interface Params {
  slug: string;
  page: number;
  filters: any;
  categories: string[];
}

export default async ({ slug, page, filters, categories }: Params): Promise<any> => {
  const url = `/category/${slug}/get-products?page=${page}&categories[]=${categories}`;
  const res = await Api.queryProxi<any>(url, { method: 'POST', body: JSON.stringify(filters) });

  if (!res.ok) return Promise.reject(res);

  return res.data;
};
