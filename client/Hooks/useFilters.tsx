import React, { ReactElement, useCallback, useMemo, useState } from 'react';

import Ruble from '@Components/Ruble';
import { FiltersData, FiltersHint, FiltersTab } from '@Types/Filters';

export type Callback = (state?: FiltersData) => void;

export interface HookUseFilters {
  filterStore: FiltersData;
  filterTabs: FiltersTab[];
  filterHints: FiltersHint[];
  triggerApply?: number;
  triggerUpdateCount?: number;
  changeRange: ({ id, from, to }: any) => void;
  changeRangeEnd: (e: MouseEvent) => void;
  addCheckbox: ({ id, value }: any) => void;
  removeCheckbox: ({ id, value }: any) => void;
  resetAll: (callback?: Callback) => void;
  resetOne: ({ value: FiltersValue }, callback?: Callback) => void;
  resetGroup: ({ group: FiltersGroup }) => void;
  toUrl: (state?: any) => string;
  changeSort: (targetId: string) => void;
  changeSwitch: (id: any) => void;
  getSelectedFilters: (state: FiltersData) => FiltersData;
  formatFiltersToObject: (state: FiltersData) => any;
}

export default (data: FiltersData): HookUseFilters => {
  const [filterStore, setFilterStore] = useState(data);
  const [triggerApply, setTriggerApply] = useState(1);
  const [triggerUpdateCount, setTriggerUpdateCount] = useState(1);

  //
  const filterTabs = useMemo(() => {
    if (!filterStore || !filterStore.filters) return [];

    return filterStore.filters.map((filter) => ({
      id: filter.id,
      name: filter.name,
      theme: filter.theme,
    }));
  }, [filterStore]);

  //
  const filterHints = useMemo(() => {
    if (!filterStore || !filterStore.filters) return [];
    if (!filterStore.parameters || !filterStore.parameterValues) return [];

    const items = [];

    filterStore.filters.forEach((filter) => {
      filter.items.forEach((item) => {
        const id = item.parameterId;
        const parameter = filterStore.parameters[id];
        const values = filterStore.parameterValues.filter((pv) => pv.parameterId === id);

        values.forEach((value) => {
          let text = '';
          switch (value.type) {
            case 'range': {
              if (
                parameter.default[0] !== value.value[0] ||
                parameter.default[1] !== value.value[1]
              ) {
                text += `${parameter.name} `;
              }

              if (parameter.default[0] !== value.value[0]) {
                text += `от ${parameter.default[0]}`;
              }

              if (parameter.default[1] !== value.value[1]) {
                text += ` до ${parameter.default[1]}`;
              }
              break;
            }

            case 'variant': {
              text = parameter.default.includes(value.value[0]) ? value.name : null;
              break;
            }

            default:
          }

          let unit: ReactElement;
          switch (parameter.unit) {
            case 'руб.': {
              unit = (
                <>
                  {' '}
                  <Ruble />
                </>
              );
              break;
            }

            default:
              unit = <>{parameter.unit}</>;
          }

          if (text) {
            items.push({
              id: filter.id,
              value,
              unit,
              text: text.toLowerCase(),
            });
          }
        });
      });
    });

    return items;
  }, [filterStore]);

  //
  const getParameterName = useCallback((parameterId: string) => {
    return Number.isNaN(parseInt(parameterId, 10)) ? parameterId : `parameters[${parameterId}]`;
  }, []);

  //
  const changeRange = useCallback(({ id, from, to }) => {
    setFilterStore((prevState) => {
      const formatedFrom = from ? Number(from.toFixed()) : null;
      const formatedTo = to ? Number(to.toFixed()) : null;

      const newState = {
        ...prevState,
        parameters: {
          ...prevState.parameters,
          [id]: {
            ...prevState.parameters[id],
            default: [
              formatedFrom || prevState.parameters[id].default[0],
              formatedTo || prevState.parameters[id].default[1],
            ],
          },
        },
      };
      return newState;
    });
  }, []);

  //
  const changeRangeEnd = useCallback(() => {
    setTriggerUpdateCount((prevState) => prevState + 1);
  }, []);

  //
  const changeSwitch = useCallback((id) => {
    setFilterStore((prevState) => {
      const newState = {
        ...prevState,
        parameters: {
          ...prevState.parameters,
          [id]: {
            ...prevState.parameters[id],
            default: prevState.parameters[id].default === 1 ? 0 : 1,
          },
        },
      };

      return newState;
    });
    setTriggerApply((prevState) => prevState + 1);
  }, []);

  //
  const addCheckbox = useCallback(({ id, value }) => {
    setFilterStore((prevState) => {
      const newState = {
        ...prevState,
        parameters: {
          ...prevState.parameters,
          [id]: {
            ...prevState.parameters[id],
            default: [...prevState.parameters[id].default, value],
          },
        },
      };

      return newState;
    });
    setTriggerUpdateCount((prevState) => prevState + 1);
  }, []);

  //
  const removeCheckbox = useCallback(({ id, value }) => {
    setFilterStore((prevState) => {
      const newState = {
        ...prevState,
        parameters: {
          ...prevState.parameters,
          [id]: {
            ...prevState.parameters[id],
            default: prevState.parameters[id].default.filter((v) => v !== value),
          },
        },
      };

      return newState;
    });
    setTriggerUpdateCount((prevState) => prevState + 1);
  }, []);

  //
  const resetAll = useCallback(
    (callback) => {
      setFilterStore((prevState) => {
        const newParameters = {};
        Object.entries(prevState.parameters).forEach(([key, parameter]) => {
          const value = prevState.parameterValues.find((v) => v.parameterId === key);

          newParameters[key] = {
            ...parameter,
            default: value.type === 'range' ? value.value : [],
          };
        });

        const newState = {
          ...prevState,
          parameters: newParameters,
        };

        if (callback) callback(newState);

        return newState;
      });
    },
    [setFilterStore],
  );

  //
  const resetOne = useCallback(({ value }, callback) => {
    setFilterStore((prevState) => {
      const parameter = prevState.parameters[value.parameterId];
      const newParameters = { ...prevState.parameters };

      let newDefault = [0];
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

      newParameters[value.parameterId] = {
        ...parameter,
        default: newDefault,
      };

      const newState = {
        ...prevState,
        parameters: newParameters,
      };

      if (callback) callback(newState);

      return newState;
    });
  }, []);

  //
  const resetGroup = useCallback(({ group }) => {
    setFilterStore((prevState) => {
      const newParameters = { ...prevState.parameters };

      group.items.forEach(({ parameterId }) => {
        const values = prevState.parameterValues.filter((v) => v.parameterId === parameterId);

        let newDefault = [];
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

        newParameters[parameterId] = {
          ...newParameters[parameterId],
          default: newDefault,
        };
      });

      const newFilters = {
        ...prevState,
        parameters: newParameters,
      };

      return newFilters;
    });
  }, []);

  //
  const toUrl = useCallback(
    (newState) => {
      const state = newState || filterStore;
      let items = [];

      if (!state) return '';

      function toggleItem(targetItem, flag) {
        if (flag) {
          items.push(targetItem);
        } else {
          items = items.filter((item) => item !== targetItem);
        }
      }

      // Выбранные фильтры
      Object.entries(state.parameters || {}).forEach(([parameterId, parameter]) => {
        const { value, type } = state.parameterValues.find((pv) => pv.parameterId === parameterId);
        const isRange = type === 'range';
        const isVariant = type === 'variant';
        const isSwitch = type === 'switch';
        const defaultValues = parameter.default;
        const parameterName = getParameterName(parameterId);

        if (isRange) {
          const valueFrom = `${parameterName}[from]=${defaultValues[0]}`;
          const valueTo = `${parameterName}[to]=${defaultValues[1]}`;

          toggleItem(valueFrom, value[0] !== defaultValues[0]);
          toggleItem(valueTo, value[1] !== defaultValues[1]);
        }

        if (isVariant) {
          defaultValues.forEach((defaultValue) => {
            items.push(`${parameterName}[]=${defaultValue}`);
          });
        }

        if (isSwitch) {
          items.push(`${parameterName}=${defaultValues}`);
        }
      });

      // Сортировка
      state.sort
        ?.filter((sortItem) => sortItem.selected)
        .map((sortItem) => {
          if (sortItem.id === 0) return;
          items.push(`sort=${sortItem.id}`);
        });

      return items.join('&');
    },
    [filterStore, getParameterName],
  );

  //
  const formatFiltersToObject = useCallback(
    (newState) => {
      const state = newState || filterStore;
      let items = {};

      // Выбранные фильтры
      Object.entries(state.parameters || {}).forEach(([parameterId, parameter]) => {
        const { value, type } = state.parameterValues.find((pv) => pv.parameterId === parameterId);
        const isRange = type === 'range';
        const isVariant = type === 'variant';
        const isSwitch = type === 'switch';
        const defaultValues = parameter.default;
        const parameterName = Number.isNaN(parseInt(parameterId, 10)) ? parameterId : `parameters`;

        if (isRange) {
          let values = null;

          if (value[0] !== defaultValues[0]) {
            values = { ...values, from: defaultValues[0] };
          }

          if (value[1] !== defaultValues[1]) {
            values = { ...values, to: defaultValues[1] };
          }

          if (values) {
            if (parameterName !== parameterId) {
              values = { ...items[parameterName], [parameterId]: { ...values } };
            }

            items = {
              ...items,
              [parameterName]: values,
            };
          }
        }

        if (isVariant) {
          if (defaultValues.length > 0) {
            let values = defaultValues;
            if (parameterName !== parameterId) {
              values = { ...items[parameterName], [parameterId]: [...defaultValues] };
            }

            items = { ...items, [parameterName]: values };
          }
        }

        if (isSwitch) {
          items = { ...items, [parameterName]: defaultValues };
        }
      });

      // Сортировка
      state.sort
        ?.filter((sortItem) => sortItem.selected)
        .map((sortItem) => {
          if (sortItem.id === 0) return;
          items = { ...items, sort: sortItem.id };
        });

      return items;
    },
    [filterStore],
  );

  //
  const changeSort = useCallback((targetId: string) => {
    setFilterStore((prevState) => ({
      ...prevState,
      sort: prevState.sort.map((item) => ({
        ...item,
        selected: item.id === targetId,
      })),
    }));
    setTriggerApply((prevState) => prevState + 1);
  }, []);

  //
  const getSelectedFilters = useCallback(
    (newState) => {
      const state = newState || filterStore;
      const parameters = {};

      // Выбранные фильтры
      Object.entries(state.parameters || {}).forEach(([parameterId, parameter]) => {
        const { value, type } = state.parameterValues.find((pv) => pv.parameterId === parameterId);
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

      const parameterValues = state.parameterValues.filter((value) =>
        Object.keys(parameters).includes(value.parameterId),
      );

      const filters = [];
      state.filters.forEach((filter) => {
        const items = filter.items.filter((item) =>
          Object.keys(parameters).includes(item.parameterId),
        );

        if (items.length > 0) {
          filters.push({ ...filter, items });
        }
      });

      return { filters, parameterValues, parameters, sort: state.sort };
    },
    [filterStore],
  );

  return {
    filterStore: {
      filters: filterStore.filters || [],
      parameterValues: filterStore.parameterValues || [],
      parameters: filterStore.parameters || {},
      sort: filterStore.sort || [],
    },
    filterTabs,
    filterHints,
    triggerApply,
    triggerUpdateCount,
    changeRange,
    changeRangeEnd,
    addCheckbox,
    removeCheckbox,
    resetAll,
    resetOne,
    resetGroup,
    toUrl,
    changeSort,
    changeSwitch,
    getSelectedFilters,
    formatFiltersToObject,
  };
};
