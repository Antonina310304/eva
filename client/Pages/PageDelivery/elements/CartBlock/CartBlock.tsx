import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import CrossSaleProductCard from '@Components/CrossSaleProductCard';
import Price from '@UI/Price';
import PositionsSection from './elements/PositionsSection';
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
          {cart.positions?.length > 0 && (
            <PositionsSection
              className={styles.sectionCrossSale}
              title='Ваша корзина'
              products={cart.positions}
              renderItem={(productCardProps) => (
                <div className={styles.productItem}>
                  <CrossSaleProductCard {...productCardProps} />
                  <div className={styles.productCount}>
                    {`Кол-во: ${productCardProps.quantity} шт.`}
                  </div>
                </div>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(CartBlock);
