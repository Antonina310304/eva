import { ReactElement } from 'react';

export interface FiltersFilterItem {
  theme: 'range' | 'variant' | 'checkbox';
  parameterId: string;
}

export interface FiltersGroup {
  id: string;
  name: string;
  theme: 'single-range' | 'several-range' | 'checkbox' | 'switch' | 'multiply' | 'tags';
  items: FiltersFilterItem[];
}

export interface FiltersValue {
  parameterId: string;
  type: 'range' | 'variant' | 'switch';
  name: string;
  value: Array<number | string>;
  meta?: {
    color?: string;
    icon?: string;
    step?: number;
  };
  isProduct?: boolean;
}

export interface FiltersParameter {
  name: string;
  unit: string;
  default: Array<number | string>;
}

export interface FiltersParameters {
  [key: string]: FiltersParameter;
}

export interface FiltersTab {
  id: string;
  name: string;
  theme: 'single-range' | 'several-range' | 'checkbox' | 'switch';
}

export interface FiltersHint {
  id: string;
  value: string;
  unit: ReactElement;
  text: string;
}
export interface FiltersSortItemData {
  id: string;
  name: string;
  selected?: boolean;
}

export interface FiltersData {
  inited: boolean;
  filters: FiltersGroup[];
  parameterValues: FiltersValue[];
  parameters: FiltersParameters;
  sort?: FiltersSortItemData[];
  waiting?: boolean;
}
