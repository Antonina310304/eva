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
