import React, { FC, memo, HTMLAttributes } from 'react';

import ProductTags from '@Components/ProductTags';
import GalleryProductPreviews from '@Components/GalleryProductPreviews';
import Price from '@UI/Price';
import Discount from '@UI/Discount';

import { ProductData } from '@Types/Product';

import styles from './ProductCardPartial.module.css';

export interface ProductCardPartialProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  product: ProductData;
}

const ProductCardPartial: FC<ProductCardPartialProps> = ({ className, product }) => {
  return (
    <div className={styles.card}>
      <div className={styles.img}>
        <GalleryProductPreviews link={product.link} images={product.images} />
      </div>
    </div>
  );
};

export default memo(ProductCardPartial);
