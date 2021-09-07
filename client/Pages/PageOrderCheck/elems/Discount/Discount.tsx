import React, { memo, HTMLAttributes, FC } from 'react';
import cn from 'classnames';

import Icon20RoundCheck from '@divanru/icons/dist/20/round_check';

import Price from '@UI/Price';
import styles from './Discount.module.css';

export interface DiscountProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  text: string;
  summ: number;
}

const Discount: FC<DiscountProps> = (props) => {
  const { className, text, summ, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.discount, className)}>
      <Icon20RoundCheck className={styles.icon} />
      <div className={styles.text}>{text}</div>
      <Price className={styles.price} price={summ} />
    </div>
  );
};

export default memo(Discount);
