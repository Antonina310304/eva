import { ProductModel, SubcategoryData, PopularLinkData } from '@Types/Category';
import { ProductData } from '@Types/Product';

export interface PageCategoryData {
  title: string;
  productsModel: ProductModel[];
  products: ProductData[];
  rubrics: SubcategoryData[][];
  popularLinks: PopularLinkData[];
}
