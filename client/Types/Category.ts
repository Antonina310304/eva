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
  height: number;
  icon: string;
  title: string;
  url: string;
  width: number;
}

export interface PopularLinkData {
  name: string;
  link: string;
}
