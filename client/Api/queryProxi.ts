import { Api } from './index';

export default async <T>(url: string, opts?: RequestInit): Promise<T> => {
  const region = Api.getRegion();
  const isAbsolute = url.match(/^https?:\/\//);
  const regionPath = region ? `/${region}` : '';
  const fullUrl = isAbsolute ? url : `${regionPath}${url}`;
  const encodedUrl = `/p/${encodeURIComponent(fullUrl)}`;
  const res = await Api.query<T>(encodedUrl, opts);

  return res;
};
