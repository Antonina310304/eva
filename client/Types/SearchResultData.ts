import { ProductSearchData } from '@Types/Product';

export interface SearchResultData {
  link: string;
  request: string;
  matches: OfferSearchData[] | [];
  products: ProductSearchData[] | [];
}

export interface OfferSearchData {
  title: string;
  link: string;
}
