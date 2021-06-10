import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import List from '@UI/List';
import Button from '@UI/Button';
import { ProductData } from '@Types/Product';
import ProductCard from '@Components/ProductCard';
import styles from './ProductMixedCatalog.module.css';

export interface ProductMixedCatalogProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  products: ProductData[];
}

const ProductMixedCatalog: FC<ProductMixedCatalogProps> = (props) => {
  const { className, products, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.catalog, className)}>
      <List
        className={styles.list}
        items={products}
        renderChild={(product: ProductData) => (
          <ProductCard className={styles.item} product={product} />
        )}
      />

      <div className={styles.moreWrapper}>
        <Button className={styles.moreButton} theme='dirty' title='Смотреть еще' />
      </div>
    </div>
  );
};

export default memo(ProductMixedCatalog);
