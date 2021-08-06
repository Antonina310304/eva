import React, { HTMLAttributes, FC, memo } from 'react';
import cn from 'classnames';

import Price from '@UI/Price';
import Discount from '@UI/Discount';
import { InstagramProductData } from '@Modals/InstagramPostModal';
import Preview from '../Preview';
import styles from './ProductCard.module.css';

export interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  product: InstagramProductData;
}

const ProductCard: FC<ProductCardProps> = (props) => {
  const { className, product, ...restProps } = props;
  const hasExpired = product.price.expired > 0;
  const hasDiscount = product.price.discount > 0;

  return (
    <div {...restProps} className={cn(styles.card, className)}>
      <Preview className={styles.preview} product={product} />

      <div className={styles.containerInfo}>
        <div className={styles.info}>
          <div className={styles.name}>{product.name}</div>

          <div className={styles.price}>
            <Price className={styles.actualPrice} price={product.price.actual} />
            {hasExpired && (
              <Price expired className={styles.expiredPrice} price={product.price.expired} />
            )}
            {hasDiscount && (
              <Discount className={styles.discount}>{product.price.discount}</Discount>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
