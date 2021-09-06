import { NetworkStatus } from '@Types/Base';
import { CartData, DeliveryTypeData, PaymentTypeData, PaymentVariantData } from '@Types/Cart';

export interface CartStoreValue extends CartData {
  deliveryTypes: DeliveryTypeData[];
  paymentTypes: PaymentTypeData[];
  paymentVariants: PaymentVariantData[];
}

export interface UseCartResult extends CartStoreValue {
  network: NetworkStatus;
}

export type UseCart = () => UseCartResult;
