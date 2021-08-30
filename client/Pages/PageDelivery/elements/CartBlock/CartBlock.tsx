import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Price from '@UI/Price';
import styles from './CartBlock.module.css';

export interface CartBlockProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  cart: any;
}

const CartBlock: FC<CartBlockProps> = (props) => {
  const { className, cart, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.cart, className)}>
      <div className={styles.container}>
        <div className={styles.info}>
          {`В вашей корзине ${cart.count} товаров на сумму `}
          <Price price={cart.cost} />
        </div>
      </div>
    </div>
  );
};

export default memo(CartBlock);
