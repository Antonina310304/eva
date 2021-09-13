import { Api } from '@Api/index';

export type Result = any;

export default async (url: string): Promise<Result> => {
  const res = await Api.queryProxi<Result>(url);

  return res;
};
