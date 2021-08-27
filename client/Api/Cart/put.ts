import { Api } from '@Api/index';

export interface Params {
  body: any;
}

export default async ({ body }: Params): Promise<any> => {
  const res = await Api.queryProxi<any>('/cart-2/put', {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (!res.data) return Promise.reject(res);

  return res.data;
};
