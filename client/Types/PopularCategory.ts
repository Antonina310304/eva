export interface PopularCategoryData {
  id: number;
  title: string;
  count?: number;
  link: string;
  img: string;
  price?: number;
}

export interface PopularData {
  ы;
  title: string;
  products: PopularCategoryData[];
}
