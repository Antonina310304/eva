import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import InputQuantity, { OnChangeCallback } from '@UI/InputQuantity';
import Price from '@UI/Price';
import { ProductData } from '@Types/Product';
import styles from './Footer.module.css';

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  product: ProductData;
  onChangeQuantity?: OnChangeCallback;
}

const Footer: FC<FooterProps> = (props) => {
  const { className, product, onChangeQuantity, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.footer, className)}>
      <InputQuantity
        className={styles.quantity}
        value={product.quantity}
        min={0}
        max={100}
        onChange={onChangeQuantity}
      />

      <div className={styles.prices}>
        {product.price.expired > 0 && (
          <Price className={styles.expiredPrice} expired price={product.price.expired} />
        )}
        <Price className={styles.actualPrice} price={product.price.actual} />
      </div>
    </div>
  );
};

export default memo(Footer);
