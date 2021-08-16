import React, { FC, HTMLAttributes, memo, useCallback, useMemo } from 'react';
import cn from 'classnames';

import Price from '@UI/Price';
import Discount from '@UI/Discount';
import Button from '@UI/Button';
import InputQuantity from '@UI/InputQuantity';
import PageProductStore, { usePageProduct } from '@Stores/PageProduct';
import { ModuleProductData } from '@Types/ModuleProduct';
import Preview from './elems/Preview';
import Added from './elems/Added';
import Sizes, { SizeGroupData } from './elems/Sizes';
import styles from './ModuleCard.module.css';

export interface ModuleCardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  module: ModuleProductData;
}

const ModuleCard: FC<ModuleCardProps> = (props) => {
  const { className, module, ...restProps } = props;
  const hasExpired = module.price.expired > 0;
  const hasDiscount = module.price.discount > 0;
  const page = usePageProduct();

  const sizeGroups = useMemo(() => {
    const result: SizeGroupData[] = [];

    page.product.parameterGroups.forEach((parameterGroup) => {
      if (parameterGroup.theme !== 'sizes') return;

      const group: SizeGroupData = { ...parameterGroup, values: [] };

      const parameters = page.product.parameters.filter((targetParameter) => {
        return targetParameter.groupId === parameterGroup.id;
      });

      parameters.forEach((parameter) => {
        const parameterValue = page.product.parameterValues.find((pv) => {
          return pv.parameterId === parameter.id;
        });

        group.values.push({
          title: parameter.title,
          value: parameterValue.value,
        });
      });

      result.push(group);
    });

    return result;
  }, [page.product]);

  const handleChangeQuantity = useCallback(
    (_e, { quantity }) => {
      PageProductStore.editModule({ ...module, count: quantity });
    },
    [module],
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

      {sizeGroups.length > 0 && <Sizes className={styles.sizes} groups={sizeGroups} />}

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
          min={module.minQuantity}
          max={module.maxQuantity}
          value={module.count}
          onChange={handleChangeQuantity}
        />
      </div>
    </div>
  );
};

export default memo(ModuleCard);
