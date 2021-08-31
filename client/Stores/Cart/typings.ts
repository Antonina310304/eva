import { NetworkStatus } from '@Types/Base';
import { CartData, DeliveryTypeData } from '@Types/Cart';

export interface CartStoreValue extends CartData {
  deliveryTypes: DeliveryTypeData[];
}

export interface UseCartResult extends CartStoreValue {
  network: NetworkStatus;
}

export type UseCart = (initialData?: CartStoreValue) => UseCartResult;
