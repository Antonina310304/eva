import fetch from 'cross-fetch';

const backend = process.env.BACKEND_ORIGIN;

export default async <T>(url: string, opts?: RequestInit): Promise<T> => {
  const fullUrl = `${backend}${url}`;
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
