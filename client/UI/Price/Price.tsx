import React, { memo, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import formatPrice from '@divanru/ts-utils/formatPrice';

import useMeta from '@Hooks/useMeta';
import styles from './Price.module.css';

export interface PriceProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
  expired?: boolean;
  price: number;
}

const Price: FC<PriceProps> = (props) => {
  const { className, expired, price } = props;
  const { currency } = useMeta();

  return (
    <span className={cn(styles.price, { [styles.expired]: expired }, className)}>
      {formatPrice(price)}
    </span>
  );
};

export default memo(Price);
