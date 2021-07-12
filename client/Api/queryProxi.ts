import { Api } from './index';

export default async <T>(url: string, opts?: RequestInit): Promise<T> => {
  const fullUrl = `/proxy${url}`;
  const res = await Api.query<T>(fullUrl, opts);

  return res;
};
