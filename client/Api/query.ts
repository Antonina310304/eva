import fetch from 'cross-fetch';

import { Api } from '@Api/index';
import { isAbsoluteLink } from '../../utils/isAbsoluteLink';

const isClient = typeof window !== 'undefined';

export default async <T>(path: string, opts?: RequestInit): Promise<T> => {
  const request = Api.getRequest();
  const url = isAbsoluteLink(path) ? path : `${request.origin}${path}`;
  const queryUrl = new URL(url);
  const options = opts || {};
  const headers = options.headers || {};

  if (!isClient) {
    (headers as any).cookie = request.cookie;
  }

  const fullOpts: RequestInit = {
    ...options,
    headers: {
      ...headers,
      'X-Requested-With': 'XMLHttpRequest',
    },
  };

  const fullUrl = queryUrl.toString();
  const res = await fetch(fullUrl, fullOpts);

  if (res.status !== 200) return Promise.reject(res);

  return res.json();
};
