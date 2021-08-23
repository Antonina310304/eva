import { Api } from '@Api/index';

export interface Params {
  cartPositionId: string;
}

export default async (params: Params): Promise<any> => {
  const res = await Api.queryProxi<any>('/cart-2/remove', {
    method: 'POST',
    body: JSON.stringify(params),
  });

  if (res.result !== 'success') return Promise.reject(res);

  return res.data;
};
