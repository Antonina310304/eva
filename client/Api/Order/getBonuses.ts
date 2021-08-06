import { Api } from '@Api/index';

export interface Params {
  productIds: number[];
}

export default async (params: Params): Promise<any> => {
  const { productIds } = params;
  const searchParams = new URLSearchParams();

  searchParams.set('ids', productIds.toString());

  const url = `/order/get-bonus-earned-amount?${searchParams.toString()}`;
  const res = await Api.query<any>(url);

  if (!res.ok) return Promise.reject(res);

  return res.data;
};
