import { Api } from '@Api/index';

export interface Params {
  slug: string;
  page: number;
  search?: string;
}

export default async ({ slug, page, search = '' }: Params): Promise<any> => {
  const searchParams = new URLSearchParams(search);

  searchParams.set('slug', slug);
  searchParams.set('page', page.toString());

  const searchString = searchParams.toString();
  const qs = searchString ? `?${searchString}` : searchString;
  const url = `/category/get-products${qs}`;
  const res = await Api.queryProxi<any>(url);

  if (!res.ok) return Promise.reject(res);

  return res.data;
};
