import { Api } from '@Api/index';

export interface Params {
  cartPositionId: string;
}

export default async (params: Params): Promise<any> => {
  const res = await Api.queryProxi<any>('/cart-2/hide', {
    method: 'POST',
    body: JSON.stringify(params),
  });

  if (!res.data) return Promise.reject(res);

  return res.data;
};
