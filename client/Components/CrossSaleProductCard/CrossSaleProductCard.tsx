import React, { HTMLAttributes, FC, memo } from 'react';
import cn from 'classnames';

import GalleryProductPreviews from '@Components/GalleryProductPreviews';
import Price from '@UI/Price';
import Discount from '@UI/Discount';
import { ProductData } from '@Types/Product';
import styles from './CrossSaleProductCard.module.css';

export interface CrossSaleProductCardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  product: ProductData;
}

const CrossSaleProductCard: FC<CrossSaleProductCardProps> = (props) => {
  const { className, product, ...restProps } = props;
  const hasExpired = product.price.expired > 0;
  const hasDiscount = product.price.discount > 0;

  return (
    <div {...restProps} className={cn(styles.card, className)}>
      <GalleryProductPreviews
        className={styles.preview}
        images={product.images}
        link={product.link}
      />

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

export default memo(CrossSaleProductCard);
