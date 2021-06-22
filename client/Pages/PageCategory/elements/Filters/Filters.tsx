import React, { FC, HTMLAttributes, memo, useCallback } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import useModals from '@Hooks/useModals';
import Dropdown from '../Dropdown';
import styles from './Filters.module.css';

export interface FiltersProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Filters: FC<FiltersProps> = (props) => {
  const { className, ...restProps } = props;
  const [, { openModal }] = useModals();

  const handleClickAll = useCallback(() => {
    openModal('Filters');
  }, [openModal]);

  return (
    <div {...restProps} className={cn(styles.filters, className)}>
      <div className={styles.actions}>
        <div className={styles.buttons}>
          <Button
            className={cn(styles.button, styles.main)}
            view='rounded'
            before={<div className={styles.iconFilters} />}
            title='Все фильтры'
            onClick={handleClickAll}
          />
          <Button
            className={cn(styles.button, styles.secondary)}
            view='rounded'
            theme='blank'
            title='Цена'
          />
          <Button
            className={cn(styles.button, styles.secondary)}
            view='rounded'
            theme='blank'
            title='Цвет'
          />
          <Button
            className={cn(styles.button, styles.secondary)}
            view='rounded'
            theme='blank'
            title='Стиль'
          />
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
