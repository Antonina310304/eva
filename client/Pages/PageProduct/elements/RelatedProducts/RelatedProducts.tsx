import React, { FC, HTMLAttributes, memo, useCallback } from 'react';
import loadable from '@loadable/component';
import cn from 'classnames';

import List from '@UI/List';
import useModals from '@Hooks/useModals';
import { ProductData } from '@Types/Product';
import styles from './RelatedProducts.module.css';

export interface RelatedProductsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  label: string;
  lists: any[];
}

const RelatedProductCard = loadable(() => import('@Components/RelatedProductCard'));

const RelatedProducts: FC<RelatedProductsProps> = (props) => {
  const { className, label, lists, ...restProps } = props;
  const [, { openModal }] = useModals();

  const handleClickList = useCallback(
    (_e, list) => {
      openModal('RelatedProducts', { listId: list.id });
    },
    [openModal],
  );

  return (
    <div {...restProps} className={cn(styles.relatedProducts, className)}>
      <div className={styles.label}>{label}</div>
      <List
        className={styles.groups}
        items={lists}
        renderChild={(list: any) => (
          <div className={styles.group}>
            <div className={styles.groupHead} onClick={(e) => handleClickList(e, list)}>
              <div className={styles.iconPlus} />
              <span className={styles.groupLabel}>{list.title}</span>
            </div>

            {list.products.length > 0 && (
              <List
                className={styles.groupContent}
                items={list.products}
                renderChild={(product: ProductData) => (
                  <RelatedProductCard
                    className={styles.product}
                    listId={list.id}
                    product={product}
                  />
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
