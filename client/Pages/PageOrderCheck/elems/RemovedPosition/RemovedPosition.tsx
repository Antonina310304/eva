import { FC, HTMLAttributes, memo, useCallback } from 'react';
import cn from 'classnames';

import Price from '@UI/Price';
import Button from '@UI/Button';
import CartStore from '@Stores/Cart';
import { CartPositionData } from '@Types/Cart';
import styles from './RemovedPosition.module.css';

export interface RemovedPositionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  position: CartPositionData;
}

const RemovedPosition: FC<RemovedPositionProps> = (props) => {
  const { className, position, ...restProps } = props;
  const [firstProduct] = position.products;

  const handleRestore = useCallback(() => {
    CartStore.showPosition({ positionId: position.id });
  }, [position.id]);

  return (
    <div {...restProps} className={cn(styles.position, className)}>
      <div className={styles.wrapperInfo}>
        <span className={styles.productName}>{firstProduct.name}</span>

        <div className={styles.wrapperPrice}>
          <span className={styles.priceLabel}>Цена</span>
          <Price className={styles.price} price={firstProduct.price} />
        </div>
      </div>

      <Button className={styles.btnRestore} theme='blank' onClick={handleRestore}>
        Восстановить
      </Button>
    </div>
  );
};

export default memo(RemovedPosition);
