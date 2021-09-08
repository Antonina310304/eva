import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Popular.module.css';

export interface PopularProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: string;
}
const Popular: FC<PopularProps> = ({ className, title }) => {
  return (
    <div className={cn(className, styles.wrapper)}>
      <p className={styles.title}>{title || 'Популярные категории'}</p>
      <p>слайдер</p>
    </div>
  );
};

export default Popular;
