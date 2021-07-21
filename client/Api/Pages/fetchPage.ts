import { Api } from '@Api/index';

export interface Params {
  path: string;
}

export default async (params: Params, opts?: RequestInit): Promise<any> => {
  const { path } = params;
  const res = await Api.queryProxi<any>(path, opts);

  return res.body.data;
};
