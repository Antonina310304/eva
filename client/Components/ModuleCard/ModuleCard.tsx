import React, { FC, HTMLAttributes, memo, useCallback } from 'react';
import cn from 'classnames';

import Price from '@UI/Price';
import Discount from '@UI/Discount';
import Button from '@UI/Button';
import InputQuantity from '@UI/InputQuantity';
import { useProduct } from '@Stores/product';
import { ModuleProductData } from '@Types/ModuleProduct';
import Preview from './elems/Preview';
import Added from './elems/Added';
import styles from './ModuleCard.module.css';

export interface ModuleCardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  module: ModuleProductData;
}

const ModuleCard: FC<ModuleCardProps> = (props) => {
  const { className, module, ...restProps } = props;
  const hasExpired = module.price.expired > 0;
  const hasDiscount = module.price.discount > 0;
  const product = useProduct();

  const handleChangeQuantity = useCallback(
    (_e, { quantity }) => {
      product.editModule({ ...module, count: quantity });
    },
    [module, product],
  );

  return (
    <div {...restProps} className={cn(styles.card, className)}>
      <Preview product={module} />
      <div className={styles.name}>{`${module.type} ${module.name}`}</div>

      <div className={styles.prices}>
        <Price className={styles.actualPrice} price={module.price.actual} />
        {hasExpired && (
          <Price expired className={styles.expiredPrice} price={module.price.expired} />
        )}
        {hasDiscount && <Discount className={styles.discount}>{module.price.discount}</Discount>}
      </div>

      <div className={styles.footer}>
        <div className={styles.wrapperButton}>
          {module.count ? (
            <Added />
          ) : (
            <Button wide onClick={(e) => handleChangeQuantity(e, { quantity: 1 })}>
              Добавить
            </Button>
          )}
        </div>

        <InputQuantity
          className={styles.quantity}
          min={0}
          max={module.maxQuantity}
          value={module.count}
          onChange={handleChangeQuantity}
        />
      </div>
    </div>
  );
};

export default memo(ModuleCard);
