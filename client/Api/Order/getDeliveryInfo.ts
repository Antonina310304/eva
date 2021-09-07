import { Api } from '@Api/index';
import { PaymentTypeData } from '@Types/Cart';

export interface GetDeliveryInfoResult {
  teaser: string;
  table: {
    delivery: string;
    suburb: string;
    upliftFirstFloor: string;
  };
  paymentTypes: PaymentTypeData[];
}

export default async (): Promise<GetDeliveryInfoResult> => {
  const res = await Api.queryProxi<GetDeliveryInfoResult>('/order/get-delivery-info');

  return res;
};
