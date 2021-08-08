import { ProductData } from './Product';

export interface ModuleProductData extends ProductData {
  parameterId: number;
  count: number;
  maxQuantity: number;
  minQuantity: number;
  modelId: number;
}
