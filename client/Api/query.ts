import fetch from 'cross-fetch';

export default async <T>(url: string, opts?: RequestInit): Promise<T> => {
  const fullUrl = `http://localhost:4444${url}`;
  const options = opts || {};
  const headers = options.headers || {};
  const fullOpts = {
    ...options,
    headers: {
      ...headers,
      Development: 'yes',
    },
  };
  const res = await (await fetch(fullUrl, fullOpts)).json();

  return res;
};
