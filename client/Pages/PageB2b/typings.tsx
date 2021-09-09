export interface MapData {
  center: number[];
  zoom: number;
  title: string;
  description: string;
  regionId: number;
}

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

export interface SellPointData {
  id: string;
  regionId: number;
  coordinates: number[];
  name: string;
  address: string;
  phone: string;
  worktime: string[];
  holidaysSchedule: [];
  tags: number[];
  images: string[];
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
  length: number;
  images: any;
}

export interface PressItem {
  title: string;
  description: string;
}

export type DescriptionData = string[];
export interface TextItem {
  descriptions: DescriptionData;
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
