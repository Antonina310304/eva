import { Api } from '@Api/index';
import { RegionHintData } from '@Types/Region';

export type ResultData = RegionHintData[];

export interface Result {
  status: 'success' | 'error';
  data: ResultData;
}

export default async (): Promise<ResultData> => {
  const res = await Api.query<Result>('/region-priority', {
    method: 'POST',
  });

  if (res?.status !== 'success') return Promise.reject(res);

  return res.data;
};
