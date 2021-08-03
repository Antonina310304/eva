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

  queryUrl.searchParams.set('mode', 'desktop');

  const fullUrl = queryUrl.toString();
  const res = await (await fetch(fullUrl, fullOpts)).json();

  return res;
};
