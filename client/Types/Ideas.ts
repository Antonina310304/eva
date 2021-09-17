import { ProductData } from '@Types/Product';

export interface PinData {
  coords: [number, number];
  product: ProductData;
}

export interface ImagesIdeasData {
  id: number;
  src: string;
  type: string;
  pins: PinData[];
}

export interface IdeasPostData {
  title: string;
  images: ImagesIdeasData[];
}
