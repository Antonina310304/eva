import { Api } from './index';

export default async <T>(url: string, opts?: RequestInit): Promise<T> => {
  const region = Api.getRegion();
  const regionPath = region ? `/${region}` : '';
  const fullUrl = `/p/${encodeURIComponent(`${regionPath}${url}`)}`;
  const res = await Api.query<T>(fullUrl, opts);

  return res;
};
