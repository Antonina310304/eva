import { Api } from '@Api/index';

export interface Params {
  region?: string;
}

export type Result = any;

export default async (params: Params = {}): Promise<Result> => {
  const { region } = params;
  const regionPath = region ? `/${region}` : '';
  const url = `${regionPath}/layout/get-meta`;
  const res = await Api.queryProxi<Result>(url);

  return res.meta;
};
