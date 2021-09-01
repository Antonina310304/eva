import { Api } from '@Api/index';

export interface Params {
  promoCode: string;
}

export default async (params: Params): Promise<any> => {
  const res = await Api.queryProxi<any>('/cabinet/api/check-promo-code', {
    method: 'POST',
    body: JSON.stringify(params),
  });

  if (!res.ok || res.data?.status !== 'success') return Promise.reject(res);

  return res.data;
};
