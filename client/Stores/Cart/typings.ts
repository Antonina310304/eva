import { NetworkStatus } from '@Types/Base';
import { CartData } from '@Types/Cart';

export interface UseCartOpts {
  preload?: boolean;
}

export interface UseCartResult extends CartData {
  network: NetworkStatus;
}

export type UseCart = (opts?: UseCartOpts) => UseCartResult;
