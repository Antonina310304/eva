import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import declOfNum from '@Utils/declOfNum';
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
          {`В вашей корзине ${declOfNum(cart.count, [
            'товар',
            'товара',
            'товаров',
          ])} товаров на сумму `}
          <Price price={cart.cost} />
          {cart.positions?.length > 0 && (
            <PositionsSection
              className={styles.sectionCrossSale}
              title='Ваша корзина'
              positions={cart.positions}
              renderItem={({ product, quantity }) => (
                <div className={styles.productItem}>
                  <CrossSaleProductCard {...product} />
                  <div className={styles.productCount}>{`Кол-во: ${quantity} шт.`}</div>
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
