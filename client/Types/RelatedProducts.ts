import { ProductData } from './Product';

export interface RelatedProductsListData {
  id: number;
  title: string;
  products: ProductData[];
}
