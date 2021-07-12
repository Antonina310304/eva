import fetch from 'cross-fetch';

const domain = process.env.DOMAIN;

export default async <T>(url: string, opts?: RequestInit): Promise<T> => {
  const queryUrl = new URL(`${domain}${url}`);
  const options = opts || {};
  const headers = options.headers || {};
  const fullOpts = {
    ...options,
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
