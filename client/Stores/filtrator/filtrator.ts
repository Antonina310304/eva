import { createDerived, createStore, getValue } from '@kundinos/nanostores';
import { useStore } from '@kundinos/nanostores/react';

import { FiltersData } from '@Types/Filters';

const store = createStore<FiltersData>();

const tabs = createDerived(store, (filtrator) => {
  if (!filtrator.filters) return [];

  return filtrator.filters.map((filter) => ({
    id: filter.id,
    name: filter.name,
    theme: filter.theme,
  }));
});

const selected = createDerived(store, (filtrator) => {
  const parameters: any = {};
  const filters: any = [];

  Object.entries(filtrator.parameters || {}).forEach(([parameterId, parameter]) => {
    const { value, type } = filtrator.parameterValues.find((pv) => {
      return pv.parameterId === parameterId;
    });
    const isRange = type === 'range';
    const isVariant = type === 'variant';
    const isSwitch = type === 'switch';
    const defaultValues = parameter.default;

    let flag;

    if (isRange) {
      flag = value[0] !== defaultValues[0] || value[1] !== defaultValues[1];
    }

    if (isVariant) {
      flag = defaultValues.length > 0;
    }

    if (flag || isSwitch) {
      parameters[parameterId] = parameter;
    }
  });

  const parameterValues = (filtrator.parameterValues || []).filter((value) => {
    return Object.keys(parameters).includes(value.parameterId);
  });

  filtrator.filters.forEach((filter) => {
    const items = filter.items.filter((item) => Object.keys(parameters).includes(item.parameterId));

    if (items.length > 0) {
      filters.push({ ...filter, items });
    }
  });

  return { filters, parameterValues, parameters, sort: filtrator.sort };
});

const changeRange = ({ id, from, to }: any) => {
  const filtrator = getValue(store);
  const formatedFrom = from ? Number(from.toFixed()) : null;
  const formatedTo = to ? Number(to.toFixed()) : null;
  const newValue = {
    ...filtrator,
    parameters: {
      ...filtrator.parameters,
      [id]: {
        ...filtrator.parameters[id],
        default: [
          formatedFrom || filtrator.parameters[id].default[0],
          formatedTo || filtrator.parameters[id].default[1],
        ],
      },
    },
  };

  store.set(newValue);
};

const addCheckbox = ({ id, value }: any) => {
  const filtrator = getValue(store);
  const newValue = {
    ...filtrator,
    parameters: {
      ...filtrator.parameters,
      [id]: {
        ...filtrator.parameters[id],
        default: [...filtrator.parameters[id].default, value],
      },
    },
  };

  store.set(newValue);
};

const removeCheckbox = ({ id, value }: any) => {
  const filtrator = getValue(store);
  const newValue = {
    ...filtrator,
    parameters: {
      ...filtrator.parameters,
      [id]: {
        ...filtrator.parameters[id],
        default: filtrator.parameters[id].default.filter((v) => v !== value),
      },
    },
  };

  store.set(newValue);
};

const resetAll = () => {
  const filtrator = getValue(store);
  const parameters: any = {};

  Object.entries(filtrator.parameters).forEach(([key, parameter]) => {
    const value = filtrator.parameterValues.find((v) => v.parameterId === key);

    parameters[key] = {
      ...parameter,
      default: value.type === 'range' ? value.value : [],
    };
  });

  store.set({
    ...filtrator,
    parameters,
  });
};

const resetOne = ({ value }: any) => {
  const filtrator = getValue(store);
  const parameter = filtrator.parameters[value.parameterId];
  const parameters = { ...filtrator.parameters };

  let newDefault: any = [0];
  switch (value.type) {
    case 'variant': {
      newDefault = parameter.default.filter((v) => v !== value.value[0]);
      break;
    }

    case 'range':
      newDefault = value.value;
      break;

    default:
  }

  parameters[value.parameterId] = {
    ...parameter,
    default: newDefault,
  };

  store.set({ ...filtrator, parameters });
};

const resetGroup = ({ group }: any) => {
  const filtrator = getValue(store);
  const parameters = { ...filtrator.parameters };

  group.items.forEach(({ parameterId }: any) => {
    const values = filtrator.parameterValues.filter((v) => v.parameterId === parameterId);

    let newDefault: any = [];
    values.forEach((value) => {
      switch (value.type) {
        case 'variant': {
          newDefault = [];
          break;
        }

        case 'range': {
          newDefault = value.value;
          break;
        }

        default:
      }
    });

    parameters[parameterId] = {
      ...parameters[parameterId],
      default: newDefault,
    };
  });

  store.set({ ...filtrator, parameters });
};

const changeSort = ({ targetId }: any) => {
  const filtrator = getValue(store);

  store.set({
    ...filtrator,
    sort: filtrator.sort.map((item) => ({
      ...item,
      selected: item.id === targetId,
    })),
  });
};

export const useFiltrator = (initial?: FiltersData) => {
  if (initial && !store.value) {
    store.set(initial);
  }

  return {
    ...useStore(store),
    tabs: useStore(tabs),
    selected: useStore(selected),
    changeRange,
    addCheckbox,
    removeCheckbox,
    resetAll,
    resetOne,
    resetGroup,
    changeSort,
  };
};

export default null;
