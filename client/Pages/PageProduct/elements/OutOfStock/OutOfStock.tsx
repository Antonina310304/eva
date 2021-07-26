import React, { FC, memo, HTMLAttributes } from 'react';
import cn from 'classnames';

import styles from './OutOfStock.module.css';

export interface OutOfStockProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const OutOfStock: FC<OutOfStockProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.outOfStock, className)}>
      <div className={styles.icon} />
      <span className={styles.text}>Временно нет в наличии</span>
    </div>
  );
};

export default memo(OutOfStock);
