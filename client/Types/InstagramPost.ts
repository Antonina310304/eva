import { ProductData } from './Product';

export interface InstagramPostData {
  author: string;
  id: string;
  img: string;
  link: string;
  products: ProductData[];
}
