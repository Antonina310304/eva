import { Api } from '@Api/index';

export type Result = any;

export default async (): Promise<Result> => {
  const res = await Api.queryProxi<Result>('/order/get-oferta-info');

  return res;
};
