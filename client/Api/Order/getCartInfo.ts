import { Api } from '@Api/index';

export default async (): Promise<any> => {
  const url = '/order/get-cart-info';
  const res = await Api.queryProxi<any>(url);

  if (!res.ok) return Promise.reject(res);

  return res.data;
};
