export interface SchemeImage {
  url: string;
  width: number;
  height: number;
}

export interface Scheme {
  id: string;
  images: SchemeImage[];
}

export interface Value {
  name: string;
  value: string;
}

export interface Variant {
  id?: number;
  productId?: number;
  name: string;
  title?: string;
  image: string;
  detailImage?: string;
  theme: string;
  selected: boolean;
  url?: string;
  price?: number;
}

export interface Parameter {
  theme: 'default' | 'dropdown' | 'dimension' | 'circle' | 'hardness';
  name?: string;
  variant: string;
  groupId?: number;
  values?: Value[];
  variants?: Variant[];
  value?: string;
  icon?: string;
  description?: string[];
}

export interface DocumentData {
  icon: string;
  name: string;
  sizeInfo: string;
  url: string;
}

export interface Documents {
  title: string;
  items: DocumentData[];
}

export interface ImportantInfoData {
  text: string;
  title: string;
}

export interface ImportantParameter {
  image: string;
  preview: string;
  text: string;
  theme: string;
  title: string;
}
