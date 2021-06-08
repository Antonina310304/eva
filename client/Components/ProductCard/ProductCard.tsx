import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Like from '@Components/Like';
import Price from '@UI/Price';
import Discount from '@UI/Discount';
import { ProductData } from '@Types/Product';
import styles from './ProductCard.module.css';
import transformImage from './transformImage';

export interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  product: ProductData;
}

const ProductCard: FC<ProductCardProps> = (props) => {
  const { className, product, ...restProps } = props;
  const [firstImage] = product.images || [];
  const hasExpired = product.price.expired > 0;
  const hasDiscount = product.price.discount > 0;

  return (
    <div
      {...restProps}
      className={cn(styles.productCard, { [styles.hasExpired]: hasExpired }, className)}
    >
      <div className={styles.containerImage}>
        <div
          className={styles.image}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: transformImage(firstImage.src, '#f5f3f1') }}
        />

        <Like className={styles.like} />
      </div>

      <div className={styles.info}>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.price}>
          {`Цена `}
          <Price className={styles.actualPrice} price={product.price.actual} />
          {hasExpired && (
            <Price expired className={styles.expiredPrice} price={product.price.expired} />
          )}
          {hasDiscount && <Discount className={styles.discount}>{product.price.discount}</Discount>}
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
