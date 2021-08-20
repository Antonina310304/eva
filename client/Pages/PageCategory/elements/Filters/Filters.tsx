import React, { FC, HTMLAttributes, MouseEvent, useMemo, useCallback, memo } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import Link from '@UI/Link';
import Filtrator, { useFiltrator } from '@Stores/Filtrator';
import { GroupData } from '@Pages/PageCategory/typings';
import Dropdown from '../Dropdown';
import GroupsPopup from '../GroupsPopup';
import OptionsPopup from '../OptionsPopup';
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

  const labelSort = useMemo(() => {
    const { name } = filtrator.sort.find((item) => item.selected);

    return `${name.substr(0, 1).toUpperCase()}${name.substr(1)}`;
  }, [filtrator.sort]);

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
    (e: MouseEvent, option: typeof filtrator.sort[0]) => {
      Filtrator.setSort(option);

      if (onChangeSort) onChangeSort(e);
    },
    [filtrator, onChangeSort],
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

      <div className={styles.wrapperLabels}>
        {isMatrasyCategory && (
          <Link
            className={styles.buttonMattresses}
            to='/promo/mattrasses'
            target='_blank'
            view='native'
          >
            <Button wide theme='secondary'>
              <div className={styles.iconMattresses} />
              Подобрать матрас
            </Button>
          </Link>
        )}

        <div className={styles.labels}>
          <Dropdown className={styles.label} label='По группам'>
            <GroupsPopup label='По группам' groups={groups} />
          </Dropdown>

          <Dropdown className={styles.label} label={labelSort}>
            <OptionsPopup
              label={labelSort}
              options={filtrator.sort}
              onCheckOption={handleChangeSort}
            />
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default memo(Filters);
