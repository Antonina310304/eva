import { Api } from '@Api/index';

export interface Params {
  slug: string;
  page: number;
  filters: any;
}

export default async ({ slug, page, filters }: Params): Promise<any> => {
  const url = `/category/${slug}/get-products?page=${page}`;
  const res = await Api.queryProxi<any>(url, { method: 'POST', body: JSON.stringify(filters) });

  if (!res.ok) return Promise.reject(res);

  return res.data;
};
