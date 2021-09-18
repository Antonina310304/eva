import { RegionHintData } from '@Types/Region';

export interface Params {
  term: string;
}

export type Result = RegionHintData[];

const fakeData = {
  status: 'success',
  data: [
    { id: 3, name: 'Владимир', region: 'Владимирская область', parent_id: 3, weight: 5 },
    { id: 49, name: 'Владивосток', region: 'Приморский край', parent_id: 49, weight: 4 },
    {
      id: 'vladikavkaz',
      name: 'Владикавказ',
      region: 'Республика Северная Осетия',
      parent_id: '69',
      weight: 2,
    },
  ],
};

// TODO: временно возвращаем фейковые данные из-за проблем на бэкенде
export default async ({ term }: Params, opts?: RequestInit): Promise<Result> => {
  console.log(term, opts);

  return Promise.resolve(fakeData.data);

  // const searchParams = new URLSearchParams();

  // searchParams.set('term', term.toLowerCase().trim());

  // const url = `/region?${searchParams.toString()}`;
  // const res = await Api.queryProxi<any>(url, opts);

  // if (res?.status !== 'success') return Promise.reject(res);

  // return res.data;
};
