import React, { FC, HTMLAttributes, MouseEvent, useMemo, useCallback, memo } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import Filtrator, { useFiltrator } from '@Stores/Filtrator';
import { IConstructorGroup } from '@Types/Constructor';
import styles from './Filters.module.css';

export interface FiltersProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  groups?: IConstructorGroup[];
  isMatrasyCategory?: boolean;
  onOpen?: (e: MouseEvent, id: string) => void;
  onChangeSort?: (e: MouseEvent) => void;
}

const Filters: FC<FiltersProps> = (props) => {
  const { className, groups, isMatrasyCategory, onOpen, onChangeSort, ...restProps } = props;
  const filtrator = useFiltrator();

  const secondaryFilters = useMemo(() => {
    return filtrator.filters.slice(0, 3);
  }, [filtrator.filters]);

  const handleOpen = useCallback(
    (e, id) => {
      if (onOpen) onOpen(e, id);
    },
    [onOpen],
  );

  const countSamples = useCallback(() => {
    const arr = [];
    const filtri = Object.keys(filtrator.parameters);

    const parameters = filtrator.parameters[40]?.default || [];

    parameters.forEach((param) => {
      groups.forEach((group) => {
        const xz = group.samples.find((sample) => sample.tags.colorId === param);
        if (xz) arr.push(xz);
      });
    });

    const parameters2 = filtrator.parameters[10]?.default || [];

    parameters2.forEach((param) => {
      groups.forEach((group) => {
        const xz = group.samples.find((sample) => sample.tags.typeIds.some((it) => it === param));
        if (xz) arr.push(xz);
      });
    });

    const parameters3 = filtrator.parameters[20]?.default || [];

    parameters3.forEach((param) => {
      groups.forEach((group) => {
        if (group.samples[0].tags.collectionId === param) arr.push(...group.samples);
      });
    });

    const set = new Set(arr);
    const result = Array.from(set);

    Filtrator.updateTotalCount(result.length);
  }, [filtrator.parameters, groups]);

  const findSelectedParameter = useCallback(
    (parameterId) => {
      const parameters = filtrator.parameters[parameterId]?.default || [];
      const selectedParameters = parameters.map((parameter) => {
        const res = filtrator.parameterValues.find(
          (param) => param.parameterId === parameterId && param.value[0] === parameter,
        );

        if (!res) return '';

        return res.name;
      });

      return selectedParameters;
    },
    [filtrator.parameterValues, filtrator.parameters],
  );

  const selectedFilters = useMemo(() => {
    const resultArray = [];
    Object.keys(filtrator.parameters).forEach((parameter) =>
      resultArray.push(...findSelectedParameter(parameter)),
    );

    countSamples();

    return resultArray.join(' x ');
  }, [countSamples, filtrator.parameters, findSelectedParameter]);

  return (
    <div {...restProps} className={cn(styles.filters, className)}>
      <div className={styles.actions}>
        <div className={styles.buttons}>
          {secondaryFilters.map((filter) => (
            <Button
              className={cn(styles.button, styles.secondary)}
              view='rounded'
              theme='blank'
              key={filter.name}
              onClick={(e) => handleOpen(e, filter.name)}
            >
              {filter.name}
            </Button>
          ))}
        </div>
      </div>

      <div className={styles.selectedFilters}>{selectedFilters}</div>
    </div>
  );
};

export default memo(Filters);
