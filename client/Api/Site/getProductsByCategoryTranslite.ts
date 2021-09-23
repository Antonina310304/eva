import { Api } from '@Api/index';
import { CatalogData } from '@Types/Catalog';

export interface Params {
  translite: string;
  page?: number | string;
}

export interface Response {
  ok: boolean;
  data: CatalogData;
}

export default async (params: Params): Promise<CatalogData> => {
  const { translite, page = 1 } = params;
  const searchParams = new URLSearchParams();

  searchParams.append('translite', translite);
  searchParams.append('page', page.toString());

  const url = `/site/get-products-by-category-translite?${searchParams.toString()}`;
  const res = await Api.queryProxi<Response>(url);

  if (!res.ok) return Promise.reject(res);

  return res.data;
};
