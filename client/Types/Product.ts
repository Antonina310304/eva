export interface ProductImageData {
  src: string;
  orientation: 'landscape' | 'portrait';
}

export interface ProductPriceData {
  actual: number;
  expired?: number;
  discount?: number;
}

export interface ProductParameterGroupData {
  id: number;
  title: string;
  theme: 'sizes';
}

export interface ProductParameterValueData {
  parameterId: number;
  value: number;
  unitId: number;
}

export interface ProductParameterData {
  id: number;
  groupId: number;
  title: string;
  count: number;
  isModules: boolean;
  parameterId: number;
}

export interface ProductTagData {
  title: string;
  image: ProductImageData;
  location: 'down' | 'up';
}

export interface UnitData {
  id: number;
  title: string;
}

export interface ProductData {
  id: number;
  modelId?: number;
  categoryColor?: string;
  images: ProductImageData[];
  link: string;
  name: string;
  type: string;
  price: ProductPriceData;
  parameterGroups: ProductParameterGroupData[];
  parameterValues: ProductParameterValueData[];
  parameters: ProductParameterData[];
  tags: ProductTagData[];
  quantity?: number;
  // TODO: в случае отсутствия миниатюры сервер отдает false, что неправильно
  miniature?: string;
  variants: any;
  units?: UnitData[];
  rating?: number;
}
