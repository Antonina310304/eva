import { FC, HTMLAttributes, memo, useCallback } from 'react';
import cn from 'classnames';

import InputQuantity, { OnChangeCallback } from '@UI/InputQuantity';
import Price from '@UI/Price';
import Button from '@UI/Button';
import { ProductData } from '@Types/Product';
import styles from './Footer.module.css';

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  product: ProductData;
  onChangeQuantity?: OnChangeCallback;
}

const Footer: FC<FooterProps> = (props) => {
  const { className, product, onChangeQuantity, ...restProps } = props;

  const handleClickAdd = useCallback(
    (e) => {
      if (onChangeQuantity) onChangeQuantity(e, { quantity: 1 });
    },
    [onChangeQuantity],
  );

  return (
    <div {...restProps} className={cn(styles.footer, className)}>
      {product.quantity > 0 ? (
        <InputQuantity
          className={styles.quantity}
          value={product.quantity}
          min={0}
          max={100}
          onChange={onChangeQuantity}
        />
      ) : (
        <Button className={styles.button} onClick={handleClickAdd}>
          Добавить
        </Button>
      )}

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
