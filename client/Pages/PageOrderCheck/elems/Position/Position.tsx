import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import InputQuantity from '@UI/InputQuantity';
import Price from '@UI/Price';
import { CartPositionData } from '@Types/Cart';
import Product from '../Product';
import Remove from '../Remove';
import RelatedProducsSection from '../RelatedProducsSection';
import styles from './Position.module.css';

export interface PositionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  position: CartPositionData;
}

const Position: FC<PositionProps> = (props) => {
  const { className, position, ...restProps } = props;
  const firstProduct = position.products[0];

  return (
    <div {...restProps} className={cn(styles.position, className)}>
      <div className={styles.wrapperProduct}>
        <Remove className={styles.remove} />

        <Product className={styles.product} product={firstProduct} />

        <div className={styles.wrapperOptions}>
          <div className={styles.options}>
            <InputQuantity
              className={styles.quantity}
              min={1}
              value={position.quantity}
              max={position.maxQuantity}
            />

            <div className={styles.wrapperPrice}>
              <span className={styles.priceLabel}>Цена</span>
              <Price className={styles.price} price={firstProduct.price} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.wrapperRelated}>
        <RelatedProducsSection title='Сопутствующие товары' products={position.relatedProducts} />
      </div>
    </div>
  );
};

export default memo(Position);
