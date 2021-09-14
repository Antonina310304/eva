import { ProductPriceData, ProductTagData } from '@Types/Product';

export interface ProductIdeasData {
  id: number;
  name: string;
  link: string;
  src: string;
  coords: [number, number];
  price: ProductPriceData;
  tags?: ProductTagData[];
}
export interface ImagesIdeasData {
  id: number;
  src: string;
  type: string;
  products?: ProductIdeasData[];
}

export interface IdeasPostData {
  title: string;
  images: ImagesIdeasData[];
}
