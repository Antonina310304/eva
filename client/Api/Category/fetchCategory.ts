import { Api } from '@Api/index';

export interface Params {
  slug: string;
}

export default async ({ slug }: Params): Promise<any> => {
  const url = `/category/${slug}`;
  const res = await Api.query<any>(url);

  return res.body.data;
};
