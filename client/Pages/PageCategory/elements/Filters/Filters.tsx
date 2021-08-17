import React, { FC, HTMLAttributes, MouseEvent, useMemo, useCallback, memo } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import Filtrator, { useFiltrator } from '@Stores/Filtrator';
import Dropdown from '../Dropdown';
import OptionsPopup from '../OptionsPopup';
import styles from './Filters.module.css';

export interface FiltersProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  count?: number;
  onOpen?: (e: MouseEvent, id: string) => void;
}

const Filters: FC<FiltersProps> = (props) => {
  const { className, count, onOpen, ...restProps } = props;
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

  const handleChangeSort = useCallback(
    (_e, option: typeof filtrator.sort[0]) => {
      Filtrator.setSort(option);
    },
    [filtrator],
  );

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

        {typeof count === 'number' && <div className={styles.count}>{`Найдено ${count}`}</div>}
      </div>

      <div className={styles.labels}>
        {/* <Dropdown className={styles.label} label='По группам' /> */}

        <Dropdown className={styles.label} label='Выводить сначала'>
          <OptionsPopup
            label='Выводить сначала'
            options={filtrator.sort}
            onCheckOption={handleChangeSort}
          />
        </Dropdown>
      </div>
    </div>
  );
};

export default memo(Filters);
