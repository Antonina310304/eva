export interface SleeperProductsData {
  id: number;
  name: string;
  bonus?: number;
  price: { actual: number; expired?: number; discount?: number };
}

export interface SleeperData {
  slider: string[];
  products: SleeperProductsData[];
}
