export interface PopularCategoryData {
  id: number;
  title: string;
  count?: number;
  link: string;
  img: string;
  price?: number;
}

export interface PopularData {
  title: string;
  products: PopularCategoryData[];
}
