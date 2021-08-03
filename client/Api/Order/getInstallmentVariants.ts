import { Api } from '@Api/index';

export interface Params {
  productId: number;
}

export default async (params: Params): Promise<any> => {
  const { productId } = params;
  const searchParams = new URLSearchParams();

  searchParams.set('id', productId.toString());

  const url = `/order/installment-available?${searchParams.toString()}`;
  const res = await Api.queryProxi<any>(url);

  if (!res.ok) return Promise.reject(res);

  return res.data;
};
