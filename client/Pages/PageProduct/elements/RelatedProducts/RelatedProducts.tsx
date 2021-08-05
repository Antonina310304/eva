import React, { FC, HTMLAttributes, memo } from 'react';
import loadable from '@loadable/component';
import cn from 'classnames';

import List from '@UI/List';
import { ProductData } from '@Types/Product';
import styles from './RelatedProducts.module.css';

export interface RelatedProductsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  label: string;
  groups: any[];
}

const RelatedProductCard = loadable(() => import('@Components/RelatedProductCard'));

const RelatedProducts: FC<RelatedProductsProps> = (props) => {
  const { className, label, groups, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.relatedProducts, className)}>
      <div className={styles.label}>{label}</div>
      <List
        className={styles.groups}
        items={groups}
        renderChild={(group: any) => (
          <div className={styles.group}>
            <div className={styles.groupHead}>
              <div className={styles.iconPlus} />
              <span className={styles.groupLabel}>{group.title}</span>
            </div>

            {group.products.length > 0 && (
              <List
                className={styles.groupContent}
                items={group.products}
                renderChild={(product: ProductData) => (
                  <RelatedProductCard className={styles.product} product={product} />
                )}
              />
            )}
          </div>
        )}
      />
    </div>
  );
};

export default memo(RelatedProducts);
