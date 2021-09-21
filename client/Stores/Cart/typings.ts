import { CartData, DeliveryTypeData, PaymentTypeData, PaymentVariantData } from '@Types/Cart';

export interface UseCartParams {
  ssr?: boolean;
}

export interface CartStoreValue extends CartData {
  deliveryTypes: DeliveryTypeData[];
  paymentTypes: PaymentTypeData[];
  paymentVariants: PaymentVariantData[];
}

export type UseCart = (params?: UseCartParams) => CartStoreValue;
