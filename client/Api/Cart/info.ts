import { Api } from '@Api/index';

export default async (): Promise<any> => {
  const res = await Api.queryProxi<any>('/cart-2/info');

  if (!res.data) return Promise.reject(res);

  return res.data;
};
