import fetch from 'cross-fetch';

import { Api } from '@Api/index';

const isClient = typeof window !== 'undefined';

export default async <T>(path: string, opts?: RequestInit): Promise<T> => {
  const request = Api.getRequest();
  const isAbsolute = path.match(/^https?:\/\//);
  const url = isAbsolute ? path : `${request.origin}${path}`;
  const queryUrl = new URL(url);
  const options = opts || {};
  const headers = options.headers || {};

  if (!isClient) {
    (headers as any).cookie = request.cookie;
  }

  const fullOpts: RequestInit = {
    ...options,
    credentials: 'same-origin',
    headers: {
      ...headers,
      Development: 'yes',
    },
  };

  const fullUrl = queryUrl.toString();
  const res = await fetch(fullUrl, fullOpts);

  if (res.status !== 200) return Promise.reject(res);

  return res.json();
};
