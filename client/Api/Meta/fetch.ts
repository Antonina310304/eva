import { Api } from '@Api/index';

export default async (): Promise<any> => {
  const url = `/api/layout/get-meta`;
  const res = await Api.query<any>(url);

  return res.meta;
};
