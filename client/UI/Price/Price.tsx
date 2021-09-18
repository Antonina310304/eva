import { memo, FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import formatPrice from '@Utils/formatPrice';
import useMeta from '@Queries/useMeta';
import styles from './Price.module.css';

export interface PriceProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
  expired?: boolean;
  price: number;
}

export interface RouteParams {
  region?: string;
}

const symbols = {
  RUB: '₽',
  BYN: 'руб.',
};

const Price: FC<PriceProps> = (props) => {
  const { className, expired, price } = props;
  const meta = useMeta();

  if (!meta.isSuccess) return null;

  return (
    <span className={cn(styles.price, { [styles.expired]: expired }, className)}>
      {formatPrice(price)}
      <span className={styles.symbol}>{` ${symbols[meta.data.currency]}`}</span>
    </span>
  );
};

export default memo(Price);
