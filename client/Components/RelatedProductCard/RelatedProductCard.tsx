import React, { FC, HTMLAttributes, memo, useMemo } from 'react';
import cn from 'classnames';

import { ProductData } from '@Types/Product';
import styles from './RelatedProductCard.module.css';
import Sizes, { SizeData } from './elems/Sizes';
import Preview from './elems/Preview';
import Footer from './elems/Footer';

export interface RelatedProductCardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  product: ProductData;
}

const RelatedProductCard: FC<RelatedProductCardProps> = (props) => {
  const { className, product, ...restProps } = props;

  const sizes: SizeData[] = useMemo(() => {
    const result: SizeData[] = [];

    product.parameterGroups.forEach((parameterGroup) => {
      if (parameterGroup.theme !== 'sizes') return;

      const parameters = product.parameters.filter((targetParameter) => {
        return targetParameter.groupId === parameterGroup.id;
      });

      parameters.forEach((parameter) => {
        const parameterValue = product.parameterValues.find((pv) => {
          return pv.parameterId === parameter.id;
        });
        const unit = product.units.find((u) => u.id === parameterValue.unitId);

        result.push({
          title: parameter.title,
          value: `${parameterValue.value} ${unit.title}`,
        });
      });
    });

    return result;
  }, [product]);

  return (
    <div {...restProps} className={cn(styles.card, className)}>
      <div className={styles.wrapper}>
        <Preview className={styles.preview} product={product} />

        <div className={styles.content}>
          <div className={styles.name}>{product.name}</div>
          {sizes.length > 0 && <Sizes className={styles.sizes} label='Размеры:' sizes={sizes} />}
          <div className={styles.contentFooter}>
            <Footer className={styles.footer} product={product} />
          </div>
        </div>
      </div>

      <div className={styles.mainFooter}>
        <Footer className={styles.footer} product={product} />
      </div>
    </div>
  );
};

export default memo(RelatedProductCard);
