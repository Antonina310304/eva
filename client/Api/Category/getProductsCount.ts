import { Api } from '@Api/index';

export interface Params {
  category: string;
  categories?: any[];
  body: any;
}

export default async ({ category, body }: Params): Promise<number> => {
  const url = `/category/${category}/get-products-count?page=1`;
  const res = await Api.queryProxi<any>(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (!res.ok) return Promise.resolve(res);

  return res.data.productsTotalCount;
};
