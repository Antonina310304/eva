export interface PrintOffersData {
  image: string;
  printId: string;
  name: string;
  price: {
    old?: number;
    current: number;
  };
}

export interface PrintsData {
  id: string;
  name: string;
  pattern: string;
  preview: string;
  color: string;
}

export interface PrintSliderData {
  prints: PrintsData[];
  offers: PrintOffersData[];
}
