import { Api } from '@Api/index';

export interface Params {
  shopProductId: number;
  parameterValues: any;
}

export default async (params: Params): Promise<any> => {
  const url = '/shop-product/info-by-params?price=1';
  const res = await Api.query<any>(url, { method: 'POST', body: JSON.stringify(params) });

  return res;
};
