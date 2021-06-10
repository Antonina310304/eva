import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import styles from './CategoryFilters.module.css';

export interface CategoryFiltersProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const CategoryFilters: FC<CategoryFiltersProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.categoryFilters, className)}>
      <div className={styles.actions}>
        <div className={styles.buttons}>
          <Button className={cn(styles.button, styles.main)} view='rounded' title='Все фильтры' />
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

      <div className={styles.groups}>Groups</div>
    </div>
  );
};

export default memo(CategoryFilters);
