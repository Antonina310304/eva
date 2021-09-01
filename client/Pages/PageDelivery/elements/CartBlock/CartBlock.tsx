import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { CartData } from '@Types/Cart';
import declOfNum from '@Utils/declOfNum';
import Price from '@UI/Price';
import PositionsSection from './elements/PositionsSection';
import ProductCard from './elements/ProductCard';
import styles from './CartBlock.module.css';

export interface CartBlockProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  cart: CartData;
}

const CartBlock: FC<CartBlockProps> = (props) => {
  const { className, cart, ...restProps } = props;
  const units = declOfNum(cart.count, ['товар', 'товара', 'товаров']);

  return (
    <div {...restProps} className={cn(styles.cart, className)}>
      <div className={styles.container}>
        <div className={styles.info}>
          {`В вашей корзине ${cart.count} ${units} на сумму `}
          <Price price={cart.cost} />
        </div>
        {cart.positions?.length > 0 && (
          <PositionsSection
            className={styles.productsList}
            title='Ваша корзина'
            positions={cart.positions}
            renderItem={({ product, position }) => (
              <div className={styles.productItem}>
                <ProductCard product={product} />
                <div className={styles.productCount}>{`Кол-во: ${position.quantity} шт.`}</div>
              </div>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default memo(CartBlock);
