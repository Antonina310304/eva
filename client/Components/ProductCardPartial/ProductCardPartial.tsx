import React, { FC, memo, HTMLAttributes } from 'react';
import cn from 'classnames';

import ProductTags from '@Components/ProductTags';
import GalleryProductPreviews from '@Components/GalleryProductPreviews';
import Price from '@UI/Price';
import Discount from '@UI/Discount';
import Like from '@Components/Like';
import Link from '@UI/Link/Link';
import { ProductData } from '@Types/Product';

import styles from './ProductCardPartial.module.css';

export interface ProductCardPartialProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  product: ProductData;
}

const ProductCardPartial: FC<ProductCardPartialProps> = ({ className, product }) => {
  const hasExpired = product.price.expired > 0;
  const hasDiscount = product.price.discount > 0;

  return (
    <div className={cn(styles.card, className)}>
      <div className={styles.img}>
        <GalleryProductPreviews link={product.link} images={product.images} />
        <div className={styles.actions}>
          <Like />
        </div>
        {product.tags?.length > 0 && <ProductTags className={styles.tags} tags={product.tags} />}
      </div>
      <div className={styles.info}>
        <Link className={styles.name} to={product.link}>
          {product.name}
        </Link>
        <div className={styles.price}>
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

export default memo(ProductCardPartial);
