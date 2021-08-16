import { Api } from '@Api/index';

export default async (): Promise<any> => {
  const url = '/cabinet/api/get-current-profile';
  const res = await Api.queryProxi<any>(url);

  return res.data;
};
