import React, { FC, HTMLAttributes, MouseEvent, memo } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import Dropdown from '../Dropdown';
import styles from './Filters.module.css';

export interface FiltersProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  onOpenAll?: (e: MouseEvent) => void;
}

const Filters: FC<FiltersProps> = (props) => {
  const { className, onOpenAll, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.filters, className)}>
      <div className={styles.actions}>
        <div className={styles.buttons}>
          <Button
            className={cn(styles.button, styles.main)}
            view='rounded'
            before={<div className={styles.iconFilters} />}
            onClick={onOpenAll}
          >
            Все фильтры
          </Button>
          <Button className={cn(styles.button, styles.secondary)} view='rounded' theme='blank'>
            Цена
          </Button>
          <Button className={cn(styles.button, styles.secondary)} view='rounded' theme='blank'>
            Цвет
          </Button>
          <Button className={cn(styles.button, styles.secondary)} view='rounded' theme='blank'>
            Стиль
          </Button>
        </div>

        <div className={styles.count}>Найдено 1440</div>
      </div>

      <div className={styles.labels}>
        <Dropdown className={styles.label} label='По группам' />
        <Dropdown className={styles.label} label='Выводить сначала' />
      </div>
    </div>
  );
};

export default memo(Filters);
