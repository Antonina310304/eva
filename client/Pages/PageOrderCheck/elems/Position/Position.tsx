import React, { FC, HTMLAttributes, memo, useCallback } from 'react';
import cn from 'classnames';
import loadable from '@loadable/component';

import InputQuantity from '@UI/InputQuantity';
import Price from '@UI/Price';
import CartStore from '@Stores/Cart';
import { CartPositionData } from '@Types/Cart';
import Product from '../Product';
import Remove from '../Remove';
import styles from './Position.module.css';

export interface PositionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  position: CartPositionData;
}

const RelatedProducsSection = loadable(() => import('../RelatedProducsSection'));

const Position: FC<PositionProps> = (props) => {
  const { className, position, ...restProps } = props;
  const firstProduct = position.products[0];

  const handleChangeQuantity = useCallback(
    (_e, { quantity }) => {
      CartStore.changeCount({ cartPositionId: position.id, quantity });
    },
    [position.id],
  );

  const handleRemove = useCallback(() => {
    CartStore.hidePosition({ positionId: position.id });
  }, [position.id]);

  return (
    <div
      {...restProps}
      className={cn(
        styles.position,
        { [styles.withWarning]: position.hasDisabledDiscount },
        className,
      )}
    >
      <div className={styles.wrapperProduct}>
        <Remove className={styles.remove} onClick={handleRemove} />

        <Product className={styles.product} product={firstProduct} />

        <div className={styles.wrapperOptions}>
          <div className={styles.options}>
            <InputQuantity
              className={styles.quantity}
              min={1}
              value={position.quantity}
              max={position.maxQuantity}
              onChange={handleChangeQuantity}
            />

            <div className={styles.wrapperPrice}>
              <span className={styles.priceLabel}>Цена</span>
              <Price className={styles.price} price={firstProduct.price} />
            </div>
          </div>
        </div>
      </div>

      {position.hasDisabledDiscount && (
        <div className={styles.warning}>На этот товар условия акций не действуют</div>
      )}

      {position.relatedProducts?.length > 0 && (
        <div className={styles.wrapperRelated}>
          <RelatedProducsSection title='Сопутствующие товары' products={position.relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default memo(Position);
