import { SellPointData } from '@Types/SellPoints';
import { MapData } from '@Types/Map';

export interface PickUpPoint {
  isVisible: boolean;
  label: string;
  address: {
    postalCode: string;
    addressLocality: string;
    streetAddress: string;
    additional: string;
  };
  phones: {
    label: string;
    values: string[];
  };
}

export interface SocialsItem {
  id: number;
  link: string;
}

export interface RubricsItem {
  link: string;
  src: string;
  text: string;
  title: string;
}

export interface ArticleItem {
  id: number;
  link: string;
  src: string;
  logo: string;
  preview: string;
  images: any;
}

export interface PressItem {
  title: string;
  description: string;
}

export interface TextItem {
  descriptions: string[];
  press: PressItem;
  title: string;
}

export interface AdvantagesItem {
  src: string;
  text: string;
}
export interface PageB2bData {
  test: string;
  banner: string;
  rubrics: RubricsItem[];
  advantages: AdvantagesItem[];
  articles: ArticleItem[];
  texts: TextItem;
  sellPoints: SellPointData[];
  pickUpPoints: PickUpPoint[];
  socials: SocialsItem[];
  map: MapData;
}
