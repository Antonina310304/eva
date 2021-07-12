import { Api } from '@Api/index';

export interface Params {
  path: string;
}

export default async (params: Params): Promise<any> => {
  const { path } = params;
  const res = await Api.queryProxi<any>(path);

  return res.body.data;
};
