import { Api } from '@Api/index';

export interface Params {
  slug: string;
}

export default async ({ slug }: Params): Promise<any> => {
  const url = `/product/${slug}`;
  const res = await Api.queryProxi<any>(url);

  return res.body.data;
};
