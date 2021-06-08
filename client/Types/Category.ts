export interface ProductModel {
  name: string;
  id: number;
  priceMin: number;
  constructor?: {
    icon: string;
    title: string;
  };
}
