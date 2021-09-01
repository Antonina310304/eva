import { Api } from '@Api/index';

export type Result = any;

export default async (): Promise<Result> => {
  const res = await Api.queryProxi<Result>('/layout/get-meta');

  return res.meta;
};
