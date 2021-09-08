import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';
import styles from './NewProducts.module.css';

export interface NewProductsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: string;
}

const NewProducts: FC<NewProductsProps> = ({ title, className }) => {
  return (
    <div className={cn(className, styles.hits)}>
      <p>{title || 'Новинки'}</p>
      <p>слайдер</p>
    </div>
  );
};

export default memo(NewProducts);
