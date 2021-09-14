import { Api } from './index';
import { isAbsoluteLink } from '../../utils/isAbsoluteLink';

export default async <T>(url: string, opts?: RequestInit): Promise<T> => {
  const region = Api.getRegion();
  const regionPath = region ? `/${region}` : '';
  const fullUrl = isAbsoluteLink(url) ? url : `${regionPath}${url}`;
  const encodedUrl = `/p/${encodeURIComponent(fullUrl)}`;
  const res = await Api.query<T>(encodedUrl, opts);

  return res;
};
