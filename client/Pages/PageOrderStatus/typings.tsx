export interface ProductData {
  category: string;
  groups: any[];
  image: string;
  price: number;
  quantity: number;
  type: string;
  name: string;
}

interface Position {
  cost: number;
  gallery: string[];
  title: string;
  products: ProductData[];
}

interface Service {
  cost: number;
  count: number;
  name: string;
}

interface Payment {
  prepaiment: number;
  paid: number;
  needsToPay: number;
  button?: {
    text: string;
  };
}

interface Price {
  products: number;
  services: number;
  order: number;
}

export interface PageOrderStatusData {
  uuid: string;
  number?: string;
  status: string;
  positions: Position[];
  payment: Payment;
  price: Price;
  services: Service[];
}
