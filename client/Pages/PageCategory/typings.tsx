import { ProductModel, SubcategoryData, PopularLinkData } from '@Types/Category';
import { ProductData } from '@Types/Product';

export interface GroupCategoryData {
  id: number;
  translite: string;
  is_important: boolean;
  name: string;
}

export interface GroupData {
  groupName: string;
  categories: GroupCategoryData[];
}

export interface PageCategoryData {
  title: string;
  productsModel: ProductModel[];
  products: ProductData[];
  rubrics: SubcategoryData[][];
  popularLinks: PopularLinkData[];
  groups?: GroupData[];
}
