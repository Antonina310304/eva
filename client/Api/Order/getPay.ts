import { Api } from '@Api/index';

export interface Params {
  id: string;
}

export default async ({ id }: Params): Promise<any> => {
  const searchParams = new URLSearchParams();

  searchParams.set('id', id);

  const url = `/order/pay?${searchParams.toString()}`;

  const res = await Api.queryProxi<any>(url);

  return res;
};
