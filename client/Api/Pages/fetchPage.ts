import { Api } from '@Api/index';

export interface Params {
  path: string;
}

export default async (params: Params): Promise<any> => {
  let { path } = params;
  const region = Api.getRegion();

  // Вырезаем регион, если он был указан в пути
  if (region && path.startsWith(`/${region}`)) {
    path = path.slice(region.length + 1);
  }

  const res = await Api.queryProxi<any>(path);

  return res.body.data;
};
