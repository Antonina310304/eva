import { ProductSearchData } from '@Types/Product';

export interface SearchResultData {
  request: string;
  matches: OfferSearchData[] | [];
  products: ProductSearchData[] | [];
}

export interface OfferSearchData {
  title: string;
  link: string;
}
