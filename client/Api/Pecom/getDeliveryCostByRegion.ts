import { Api } from '@Api/index';

export interface Body {
  /** Идентификатор региона */
  id: number;
  latitude: number;
  longitude: number;
}

/**
 * Получить стоимость доставки
 */
const getDeliveryCostByRegion = async (body: Body): Promise<number> => {
  const services = Api.getServices();
  const url = `${services.shipping}/get-region-cost`;

  const response = await Api.queryProxi<any>(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (!response.data) return Promise.reject(response);

  return response.data;
};

export default getDeliveryCostByRegion;
