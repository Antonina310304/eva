import isAbsoluteLink from '@Utils/isAbsoluteLink';
import { Api } from './index';

export default async <T>(url: string, opts?: RequestInit): Promise<T> => {
  const region = Api.getRegion();
  const regionPath = region ? `/${region}` : '';
  const fullUrl = isAbsoluteLink(url) ? url : `${regionPath}${url}`;
  const encodedUrl = `/p/${encodeURIComponent(fullUrl)}`;
  const res = await Api.query<T>(encodedUrl, opts);

  return res;
};
