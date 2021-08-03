import { Api } from '@Api/index';

export interface Params {
  city: string;
}

/**
 * Получить список пунктов выдачи
 */
const getWarehouses = async ({ city }: Params): Promise<any> => {
  const services = Api.getServices();
  const url = `${services.shipping}/get-warehouses-by-name`;

  const response = await Api.queryProxi<any>(url, {
    method: 'POST',
    body: JSON.stringify({ name: city }),
  });

  if (!response.data) return Promise.reject(response);

  return response.data || [];
};

export default getWarehouses;
