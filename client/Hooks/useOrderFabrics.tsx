import { useState, useEffect, useCallback } from 'react';

// import { get, getConfigApi } from '@Api/index';
import {
  ConstructorRequestInfoData,
  ConstructorCollection,
  ConstructorValueData,
  ConstructorColor,
  ConstructorMaterial,
  ConstructorType,
} from '@Types/Constructor';
import { FiltersData } from '@Types/Filters';

export interface OrderFabricsInputs {
  productId: number;
}

export interface OrderFabricsSelected {
  sample?: ConstructorValueData;
}

export interface UseOrderFabricsData {
  inited: boolean;
  inputParams?: OrderFabricsInputs;
  processing: boolean;
  loaded: boolean;
  collections: ConstructorCollection[];
  selected: OrderFabricsSelected[];
  filters: FiltersData;
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
  error: unknown;
}

export interface ToggleSelectParams {
  sample: ConstructorValueData;
}

export interface GetInfoParams {
  productId: number;
}

export type UpdateDataMethod = (diff: Partial<UseOrderFabricsData>) => void;
export type GetInfoMethod = ({ productId }: GetInfoParams) => Promise<void>;
export type ToggleSelectMethod = ({ sample }: ToggleSelectParams) => void;

export interface UseOrderFabrics {
  data: UseOrderFabricsData;
  updateData: UpdateDataMethod;
  getInfo: GetInfoMethod;
  toggleSelect: ToggleSelectMethod;
}

let listeners = [];
let state: UseOrderFabricsData = {
  inited: false,
  inputParams: null,
  processing: false,
  loaded: false,
  collections: [],
  selected: [
    { sample: null },
    { sample: null },
    { sample: null },
    { sample: null },
    { sample: null },
  ],
  filters: {
    inited: true,
    filters: [],
    parameters: {},
    parameterValues: [],
  },
  tags: {
    collections: {},
    colors: {},
    materials: {},
    types: {},
  },
  error: null,
};

// Собирает фильтры тканей
// TODO: частично дублирует функционал из Constructor.reducers
function collectFilters(data: ConstructorRequestInfoData) {
  const filters: FiltersData = {
    inited: true,
    filters: [],
    parameters: {},
    parameterValues: [],
  };

  // Фильтр по цвету
  filters.filters.push({
    id: 'colors',
    name: 'Цвет',
    theme: 'checkbox',
    items: [
      {
        theme: 'checkbox',
        parameterId: 'colors',
      },
    ],
  });
  filters.parameters.colors = {
    name: 'Цвет',
    unit: '',
    default: [],
  };
  Object.values(data.tags.colors)
    .sort((a, b) => a.sort - b.sort)
    .forEach((color) => {
      filters.parameterValues.push({
        name: color.title,
        parameterId: 'colors',
        type: 'variant',
        value: [color.id],
        meta: {
          color: color.code,
        },
      });
    });

  // Фильтр по свойствам
  filters.filters.push({
    id: 'tags',
    name: 'Свойства',
    theme: 'checkbox',
    items: [
      {
        theme: 'checkbox',
        parameterId: 'tags',
      },
    ],
  });
  filters.parameters.tags = {
    name: 'Свойства',
    unit: '',
    default: [],
  };
  Object.values(data.tags.types)
    .sort((a, b) => a.sort - b.sort)
    .forEach((type) => {
      filters.parameterValues.push({
        name: type.title,
        parameterId: 'tags',
        type: 'variant',
        value: [type.id],
        meta: {
          icon: type.icon,
        },
      });
    });

  return filters;
}

function collectCollections(data: ConstructorRequestInfoData): ConstructorCollection[] {
  // Формируем коллекции тканей
  const collectionsMap = {};
  data.parameterValues
    .filter((p) => p.type === 'fabric')
    // Оставляем только ткани, которые являются товарами-образцами
    .filter((p) => !!p.sampleId)
    .forEach((fabric) => {
      const { collectionId } = fabric.tags;

      if (collectionsMap[collectionId]) {
        if (fabric.price < collectionsMap[collectionId].minPrice) {
          collectionsMap[collectionId].minPrice = fabric.price;
        }

        collectionsMap[collectionId].fabrics.push(fabric);
      } else {
        collectionsMap[collectionId] = {
          ...data.tags.collections[collectionId],
          minPrice: fabric.price,
          fabrics: [fabric],
        };
      }
    });

  return Object.values(collectionsMap);
}

export default (initialData?: ConstructorRequestInfoData): UseOrderFabrics => {
  const listener = useState()[1];

  const updateData: UpdateDataMethod = useCallback((diff) => {
    state = { ...state, ...diff };

    listeners.map((l) => l(state));
  }, []);

  // Загрузить основную информацию о конструкторе
  const getInfo: GetInfoMethod = useCallback(
    async ({ productId }) => {
      // const config = getConfigApi();
      const apiSymbol =
        typeof Symbol === 'function' && Symbol.for ? Symbol.for('__API__') : '__API__';
      const { config } = window[apiSymbol];

      updateData({ processing: true });

      try {
        const url = `${config.constructor.pathApi}/${productId}`;
        console.log('url', url);

        // const rawResponse = await get(url);
        const rawResponse = await fetch(url);
        const { data } = await rawResponse.json();

        updateData({
          inputParams: {
            productId,
          },
          processing: false,
          loaded: true,
          collections: collectCollections(data),
          filters: collectFilters(data),
          tags: data.tags,
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);

        updateData({
          processing: false,
          loaded: false,
          error,
        });
      }
    },
    [updateData],
  );

  // Выбрать/снять образец ткани
  const toggleSelect: ToggleSelectMethod = useCallback(
    ({ sample }) => {
      let newSelected = [...state.selected];
      const foundedIndex = state.selected.findIndex(
        (selected) => selected.sample?.value === sample.value,
      );

      if (foundedIndex > -1) {
        newSelected = [
          ...newSelected.slice(0, foundedIndex),
          ...newSelected.slice(foundedIndex + 1),
          { sample: null },
        ];
      } else {
        const freeIndex = state.selected.findIndex((selected) => !selected.sample);

        newSelected[freeIndex] = { sample };
      }

      updateData({ selected: newSelected });
    },
    [updateData],
  );

  if (initialData && !state.inited) {
    updateData({
      inited: true,
      collections: collectCollections(initialData),
      filters: collectFilters(initialData),
      tags: initialData.tags,
    });
  }

  useEffect(() => {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, [listener]);

  return {
    data: state,
    updateData,
    getInfo,
    toggleSelect,
  };
};
