import { Api } from '@Api/index';
import { SellPointData } from '@Types/SellPoints';

export interface ResponseData {
  sellPoints: SellPointData[];
}

export interface Response {
  ok: boolean;
  data: ResponseData;
}

export default async (): Promise<ResponseData> => {
  const url = '/showroom/get-sell-points';
  const res = await Api.queryProxi<Response>(url, { method: 'POST' });

  if (!res.ok) return Promise.reject(res);

  return res.data;
};
