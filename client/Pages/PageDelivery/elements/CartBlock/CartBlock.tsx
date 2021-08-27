import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Price from '@UI/Price';
import styles from './CartBlock.module.css';

export interface CartBlockProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const CartBlock: FC<CartBlockProps> = (props) => {
  const { className, ...restProps } = props;

  return <div {...restProps} className={cn(styles.cart, className)} />;
};

export default memo(CartBlock);
