import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './Discount.module.css';

export interface DiscountProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: number;
}

const Discount: FC<DiscountProps> = (props) => {
  const { className, children, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.discount, className)}>
      <span className={styles.content}>{`${children}%`}</span>
    </div>
  );
};

export default memo(Discount);
