import { Api } from '@Api/index';

export interface Params {
  productIds: string[];
}

export default async ({ productIds }: Params): Promise<any> => {
  const url = `/product/related-products?productIDs[]=${productIds.join()}`;
  const res = await Api.queryProxi<any>(url);

  if (res.code) return Promise.reject(res);

  return res;
};
