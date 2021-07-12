import React, { HTMLAttributes, FC, memo } from 'react';
import cn from 'classnames';

import Price from '@UI/Price';
import Discount from '@UI/Discount';
import Button from '@UI/Button';
import { ProductData } from '@Types/Product';
import Preview from './elements/Preview';
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
      <Preview className={styles.preview} product={product} />

      <div className={styles.containerInfo}>
        <div className={styles.info}>
          <div className={styles.name}>{product.name}</div>

          <div className={styles.price}>
            <span className={styles.labelPrice}>{`Цена `}</span>
            <Price className={styles.actualPrice} price={product.price.actual} />
            {hasExpired && (
              <Price expired className={styles.expiredPrice} price={product.price.expired} />
            )}
            {hasDiscount && (
              <Discount className={styles.discount}>{product.price.discount}</Discount>
            )}
          </div>
        </div>

        <Button className={styles.action} theme='circle' aria-label='Добавить в корзину'>
          <div className={styles.iconCart} />
        </Button>
      </div>
    </div>
  );
};

export default memo(CrossSaleProductCard);
