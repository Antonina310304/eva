import React, { FC, HTMLAttributes, MouseEvent, useMemo, useCallback, memo } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import { useFiltrator } from '@Stores/Filtrator';
import { GroupData } from '@Pages/PageCategory/typings';
import styles from './Filters.module.css';

export interface FiltersProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  count?: number;
  groups?: GroupData[];
  isMatrasyCategory?: boolean;
  onOpen?: (e: MouseEvent, id: string) => void;
  onChangeSort?: (e: MouseEvent) => void;
}

const Filters: FC<FiltersProps> = (props) => {
  const { className, count, groups, isMatrasyCategory, onOpen, onChangeSort, ...restProps } = props;
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

  const findSelectedParameter = useCallback(
    (parameterId) => {
      const parameters = filtrator.selected.parameters[parameterId]?.default || [];
      const selectedParameters = parameters.map((parameter) => {
        const res = filtrator.selected.parameterValues.find(
          (param) => param.parameterId === parameterId && param.value[0] === parameter,
        );

        if (!res) return '';

        return res.name;
      });

      return selectedParameters;
    },
    [filtrator.selected.parameterValues, filtrator.selected.parameters],
  );

  const selectedFilters = useMemo(() => {
    const selectedColors = findSelectedParameter('40');
    const selectedTags = findSelectedParameter('10');
    const selectedCollections = findSelectedParameter('20');

    const resultArray = [...selectedCollections, ...selectedColors, ...selectedTags];

    return resultArray.join(' x ');
  }, [findSelectedParameter]);

  return (
    <div {...restProps} className={cn(styles.filters, className)}>
      <div className={styles.actions}>
        <div className={styles.buttons}>
          <Button
            className={cn(styles.button, styles.main)}
            view='rounded'
            before={<div className={styles.iconFilters} />}
            onClick={(e) => handleOpen(e, 'all')}
          >
            Все фильтры
          </Button>

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
