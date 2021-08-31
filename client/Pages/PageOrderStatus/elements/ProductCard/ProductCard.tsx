import React, { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import Icon11PlusThin from '@divanru/icons/dist/11/plus_thin';
import Icon11MinusThin from '@divanru/icons/dist/11/minus_thin';

import Collapse from '@UI/Collapse';
import { ProductData } from '@Pages/PageOrderStatus/typings';
import OrderMaterial from '../OrderMaterial';
import PriceContainer from '../PriceContainer';
import CharactericsList from '../CharactericsList';
import Sizes from '../Sizes';
import styles from './ProductCard.module.css';

export interface ProductCardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  defaultCollapsed?: boolean;
  product: ProductData;
}

const ProductCard: FC<ProductCardProps> = (props) => {
  const { className, product, defaultCollapsed, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.productCard, className)}>
      <div className={styles.content}>
        <div className={styles.product}>
          <img className={styles.image} alt={product.name} src={product.image} />

          <div className={styles.contentContainer}>
            <div className={styles.head}>
              <div className={styles.name}>{`${product.type} ${product.name}`}</div>
              <div className={styles.headInfo}>
                <div className={styles.count}>{`${product.quantity} шт.`}</div>
                <PriceContainer className={styles.price} price={product.price} />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.priceBlock}>
          <div className={styles.count}>{`${product.quantity} шт.`}</div>
          <PriceContainer className={styles.price} price={product.price} />
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
