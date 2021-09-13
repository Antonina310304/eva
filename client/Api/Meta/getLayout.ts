import { Api } from '@Api/index';

export type Result = any;

export default async (): Promise<Result> => {
  const res = await Api.queryProxi<Result>('/data/layout');

  if (!res.ok) return Promise.reject(res);

  return res.data;
};
