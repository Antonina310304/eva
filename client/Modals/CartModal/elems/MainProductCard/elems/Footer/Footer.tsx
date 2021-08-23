import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import InputQuantity from '@UI/InputQuantity';
import Price from '@UI/Price';
import { CartProductData } from '@Types/Cart';
import styles from './Footer.module.css';

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  product?: CartProductData;
}

const Footer: FC<FooterProps> = (props) => {
  const { className, product, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.footer, className)}>
      <InputQuantity className={styles.quantity} />

      <div className={styles.wrapperPrice}>
        <Price className={styles.price} price={product.price} />
      </div>
    </div>
  );
};

export default memo(Footer);
