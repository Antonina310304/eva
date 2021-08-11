import { ProductData } from './Product';

export interface CatalogData {
  page: number;
  products: ProductData[];
  productsCountLeft: number;
  productsPerPage: number;
  productsTotalCount: number;
}
