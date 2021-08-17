import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import InputQuantity from '@UI/InputQuantity';
import Price from '@UI/Price';
import { CartProductData } from '@Types/Cart';
import Preview from './elems/Preview';
import styles from './MainProductCard.module.css';

export interface MainProductCardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  product: CartProductData;
}

const MainProductCard: FC<MainProductCardProps> = (props) => {
  const { className, product, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.card, className)}>
      <Preview className={styles.preview} product={product} />

      <div className={styles.content}>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.footer}>
          <InputQuantity className={styles.quantity} />

          <div className={styles.wrapperPrice}>
            <Price className={styles.price} price={product.price} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(MainProductCard);
