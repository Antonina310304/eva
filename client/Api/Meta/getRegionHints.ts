import { Api } from '@Api/index';
import { RegionHintData } from '@Types/Region';

export interface Params {
  term: string;
}

export type ResultData = RegionHintData[];

export interface Result {
  status: 'success' | 'error';
  data: ResultData;
}

export default async ({ term }: Params, opts?: RequestInit): Promise<ResultData> => {
  const searchParams = new URLSearchParams();

  searchParams.set('term', term.toLowerCase().trim());

  const url = `/region?${searchParams.toString()}`;
  const res = await Api.queryProxi<Result>(url, opts);

  if (res?.status !== 'success') return Promise.reject(res);

  return res.data;
};
