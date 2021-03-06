export interface ConstructorStubData {
  id: string;
  icon: string;
  title: string;
}

export interface ProductModel {
  name: string;
  id: number;
  priceMin: number;
  constructor?: ConstructorStubData;
}

export interface SubcategoryData {
  id: number;
  count: number;
  link: string;
  icon: string;
  title: string;
  actived?: boolean;
}

export interface PopularLinkData {
  name: string;
  link: string;
}
