import { DaDataHint } from '@Types/DaData';
import { Api } from '@Api/index';

export interface Params {
  chunk: string;
}

/**
 * Получить подсказки для ввода адреса
 */
const getAddressHints = async ({ chunk }: Params): Promise<DaDataHint[]> => {
  const response = await Api.queryProxi<any>('/pec/address-helper', {
    method: 'POST',
    body: JSON.stringify({
      query: `{
          addresses(chunk: "${chunk}", count: 5) {
            fullAddress
            country
            city
            cityFormatted
            street
            house
            latitude
            longitude
          }
        }`,
      variables: null,
      operationName: null,
    }),
  });

  if (response.result !== 'success') return Promise.reject(response);

  return response.data;
};

export default getAddressHints;
