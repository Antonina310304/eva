import { ProductData } from './Product';

export interface ModuleProductData extends ProductData {
  id: number;
  parameterId: number;
  maxQuantity: number;
  count: number;
}
