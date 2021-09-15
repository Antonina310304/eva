import { ReactElement } from 'react';

import { FiltersData } from '@Types/Filters';
import { Cylindo360ViewerOpts } from '@Types/Cylindo360Viewer';

export type ConstructorParameterTheme =
  | 'fabricFilter'
  | 'sizes'
  | 'dropdown'
  | 'images'
  | 'additional'
  | 'circle'
  | 'svg'
  | 'colors'
  | 'modules'
  | 'switch'
  | 'radio-buttons-horizontal'
  | 'radio-buttons-vertical';

export interface ConstructorParameterData {
  default: number;
  group: string;
  theme: ConstructorParameterTheme;
  title: string;
  featureName?: string;
}

export interface ConstructorTag {
  collectionId: number;
  colorId: number;
  typeIds: number[];
}

export interface ConstructorTagData {
  title: string;
  icon: string;
}

export interface ConstructorValueData {
  count: number;
  description: string;
  image: string;
  isCollection: boolean;
  max: number;
  min: number;
  parameterIds: number[];
  price: number;
  shopProductId: number;
  tags: ConstructorTag;
  title: string;
  type: 'parameter' | 'fabric' | 'module';
  unit: string;
  value: number;
  sampleId: number | null;
  featureId?: string;
}

export interface ConstructorCollection {
  id: number;
  title: string;
  subtitle: string;
  description?: string;
  material: string;
  compound?: string;
  resistance?: string;
  tags: {
    typeIds: number[];
  };
  fabrics: ConstructorValueData[];
  minPrice: number;
  sort: number;
}

export interface ConstructorAdditional {
  id: number;
  name: string;
  value: string;
}

export interface IConstructorGroup {
  title: string;
  subtitle?: ReactElement;
  description?: string;
  tags?: ConstructorTagData[];
  samples: ConstructorValueData[];
  extensive?: boolean;
  additional?: ConstructorAdditional[];
  sort?: number;
}

export interface ConstructorColor {
  id: number;
  title: string;
  code: string;
  sort: number;
}

export interface ConstructorMaterial {
  id: number;
  title: string;
}

export interface ConstructorPrice {
  oldPrice: number;
  value: number;
  view: string;
}

export interface ConstructorMeta {
  operator?: {
    style: string;
    html: string;
  };
}

export interface ConstructorType {
  id: number;
  title: string;
  icon?: string;
  sort: number;
}

export interface ConstructorBaloon {
  coords: [number, number];
  parameterId: number;
}

export interface ConstructorHint {
  isFirst?: boolean;
  parameterId: number;
  balloon: ConstructorBaloon;
  parameter: ConstructorParameterData;
  value: ConstructorValueData;
  collection: ConstructorCollection;
}

export interface ConstructorModule {
  id: number;
  image: string;
  price: ConstructorPrice;
}

export interface ConstructorHistoryHint {
  type: 'ALL' | 'SINGLE';
  hints: ConstructorHint[];
}

export interface ConstructorMainItem {
  theme: 'group-dropdown' | 'dropdown' | 'group-radio-buttons' | 'radio-buttons-vertical';
  parameterIds: number[];
  baseParameterId: number;
}

export interface ConstructorData {
  cylindo?: Cylindo360ViewerOpts;
  headerHeight: number;
  filtersKey: number;
  categoryColor: string;
  loaded: boolean;
  processing: boolean;
  blocked: boolean;
  price: ConstructorPrice;
  id: number;
  image: string;
  name: string;
  main: ConstructorMainItem[];
  meta: ConstructorMeta;
  isSendFabricSamples: boolean;
  parameters: {
    [key: number]: ConstructorParameterData;
  };
  parameterValues: ConstructorValueData[];
  historyHints: ConstructorHistoryHint[];
  collections: ConstructorCollection[];
  selectedParameters: ConstructorValueData[];
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
  balloons: ConstructorBaloon[];
  modules: ConstructorModule[];
  hints: ConstructorHint[];
  seriesId: number;
  abortControllerUpdate?: AbortController;
  error?: string;
  tabs: ConstructorTab[];
  filteredParameters: ConstructorValueData[];
  filters: FiltersData;
  groups: {
    id: 'by-color' | 'by-collection';
    title: string;
  }[];
  preview: string;
  ga?: {
    productType: string;
  };
}

export interface ConstructorCollectionMapItem {
  id: number;
  text: string;
  default: boolean;
}

export interface ConstructorTab {
  name: string;
  items: {
    theme: ConstructorParameterTheme;
    parameterIds: number[];
  }[];
}

export interface ConstructorCollectionMap {
  [key: number]: ConstructorCollectionMapItem[];
}

export type StoreEventHandler = (data: { constructor: ConstructorData }, params?: unknown) => void;

export interface ConstructorStore {
  dispatch: (event: string, params?: unknown, callback?: StoreEventHandler) => void;
  constructor: ConstructorData;
}

export interface Store {
  on: (event: string, handler: StoreEventHandler) => void;
  dispatch: (event: string, params?: unknown, callback?: StoreEventHandler) => void;
  get: () => {
    constructor: ConstructorData;
  };
}

export interface ConstructorRequestInfoData {
  balloons: ConstructorBaloon[];
  categoryColor: string;
  collectionMap: ConstructorCollectionMap;
  id: number;
  isSendFabricSamples: boolean;
  main: ConstructorMainItem[];
  meta: ConstructorMeta;
  name: string;
  parameterValues: ConstructorValueData[];
  parameters: {
    [key: number]: ConstructorParameterData;
  };
  price: number;
  seriesId: number;
  tabs: ConstructorTab[];
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
}

export interface ConstructorRequestInfo {
  result: 'success' | 'error';
  data: ConstructorRequestInfoData;
}

export interface ConstructorRequestUpdate {
  image: string;
  modules: {
    id: number;
    image: string;
    price: {
      value: number;
      view: string;
    };
  }[];
  price: ConstructorPrice;
}

export interface ConstructorRequestFilter {
  result: 'success' | 'error';
  data: {
    [key: number]: ConstructorCollectionMapItem[];
  };
}

export interface ReplaceHintParams {
  hint: ConstructorHint;
  fabricId: number;
}

export interface InfoParams {
  productId: number;
}

export interface ReplaceProductParams {
  shopProductId: number;
}
