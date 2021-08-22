import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import InputQuantity from '@UI/InputQuantity';
import Price from '@UI/Price';
import { CartPositionData, CartProductData } from '@Types/Cart';
import styles from './Footer.module.css';

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  product?: CartProductData;
  position?: CartPositionData;
}

const Footer: FC<FooterProps> = (props) => {
  const { className, product, position, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.footer, className)}>
      {!position.deactivateControls && (
        <InputQuantity
          className={styles.quantity}
          defaultValue={position.quantity}
          min={0}
          max={position.maxQuantity}
        />
      )}

      <div className={styles.wrapperPrice}>
        <Price className={styles.price} price={product.price} />
      </div>
    </div>
  );
};

export default memo(Footer);
