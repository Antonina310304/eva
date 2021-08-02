import { Api } from '@Api/index';

/**
 * Получить стоимость доставки
 */
const getDeliveryCost = async (body: unknown): Promise<any> => {
  const services = Api.getServices();
  const url = `${services.shipping}/get-cost`;

  const response = await Api.queryProxi<any>(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (!response.data) return Promise.reject(response);

  return response.data;
};

export default getDeliveryCost;
