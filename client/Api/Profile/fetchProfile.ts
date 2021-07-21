import { Api } from '@Api/index';

export default async (opts?: RequestInit): Promise<any> => {
  const url = '/cabinet/api/get-current-profile';
  const res = await Api.query<any>(url, opts);

  return res.data;
};
