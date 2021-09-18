import { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import Price from '@UI/Price';
import Button from '@UI/Button';
import CartStore from '@Stores/Cart';
import { ProductData } from '@Types/Product';
import Preview from './elems/Preview';
import styles from './RelatedProductCard.module.css';

export interface RelatedProductCardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  product: ProductData;
}

const RelatedProductCard: FC<RelatedProductCardProps> = (props) => {
  const { className, product, ...restProps } = props;
  const [, forceUpdate] = useState({});

  const added = CartStore.hasInCart(product.id);

  const handleBuy = useCallback(async () => {
    const param = { isModular: false, shopProductId: product.id };
    const opts = { isRelated: true };

    if (added) {
      await CartStore.removeProduct(param, opts);
    } else {
      await CartStore.addProducts([param], opts);
    }

    forceUpdate({});
  }, [added, product.id]);

  return (
    <div {...restProps} className={cn(styles.card, className)}>
      <Preview product={product} />

      <div className={styles.name}>{`${product.type} ${product.name}`}</div>

      <div className={styles.prices}>
        <Price className={styles.actualPrice} price={product.price.actual} />
        {product.price.expired > 0 && (
          <Price className={styles.expiredPrice} expired price={product.price.expired} />
        )}
      </div>

      <Button
        className={cn(styles.button, { [styles.added]: added })}
        wide
        theme='blank'
        onClick={handleBuy}
      >
        {added ? (
          <span className={styles.buttonContent}>
            <span className={styles.iconCheck} />
            Добавлено
          </span>
        ) : (
          <>Добавить</>
        )}
      </Button>
    </div>
  );
};

export default memo(RelatedProductCard);
