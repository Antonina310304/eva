import { Api } from '@Api/index';

export default async (): Promise<any> => {
  const url = `/layout/get-meta`;
  const res = await Api.queryProxi<any>(url);

  return res.meta;
};
