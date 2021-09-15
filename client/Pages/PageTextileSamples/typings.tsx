import {
  ConstructorColor,
  ConstructorMaterial,
  ConstructorType,
  ConstructorValueData,
  ConstructorCollection,
} from '@Types/Constructor';

export interface OrderSampleData {
  image: string;
  text: string;
}

export interface CollectionData {
  id: number;
  title: string;
  subtitle: string;
  material: string;
  description: string;
  compound: string;
  resistance: string;
  sort: number;
  tags: {
    typeIds: number[];
  };
}

export interface ColorData {
  id: number;
  title: string;
  code: string;
  sort: number;
}

export interface MaterialData {
  id: number;
  title: string;
}

export interface TypeData {
  id: number;
  title: string;
  icon: string;
  sort: number;
}

export interface TagsData {
  collections: { id: CollectionData };
  colors: { id: ColorData };
  materials: { id: MaterialData };
  types: { id: TypeData };
}

export interface PageTextileSamplesData {
  orderSamples: OrderSampleData[];
  title: string;
  tags: {
    collections: {
      [key: number]: ConstructorCollection;
    };
    colors: {
      [key: number]: ConstructorColor;
    };
    materials: {
      [key: number]: ConstructorMaterial;
    };
    types: {
      [key: number]: ConstructorType;
    };
  };
  parameterValues: ConstructorValueData[];
}
