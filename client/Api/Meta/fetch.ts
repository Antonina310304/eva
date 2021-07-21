import { Api } from '@Api/index';

export default async (opts?: RequestInit): Promise<any> => {
  const url = `/layout/get-meta`;
  const res = await Api.queryProxi<any>(url, opts);

  return res.meta;
};
