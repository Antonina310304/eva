import React, { FC, HTMLAttributes, MouseEvent, memo } from 'react';
import cn from 'classnames';

import List from '@UI/List';
import Button from '@UI/Button';
import ProductCard from '@Components/ProductCard';
import { CatalogData } from '@Types/Catalog';
import { ProductData } from '@Types/Product';
import styles from './ProductMixedCatalog.module.css';

export interface ProductMixedCatalogProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  catalog: CatalogData;
  onMore?: (e: MouseEvent) => void;
}

const ProductMixedCatalog: FC<ProductMixedCatalogProps> = (props) => {
  const { className, catalog, onMore, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.catalog, className)}>
      <List
        className={styles.list}
        items={catalog.products}
        renderChild={(product: ProductData) => (
          <div className={cn(styles.item)}>
            <ProductCard product={product} view='mini' />
          </div>
        )}
      />

      {catalog.productsCountLeft > 0 && (
        <div className={styles.moreWrapper}>
          <Button className={styles.moreButton} theme='dirty' onClick={onMore}>
            Смотреть еще
          </Button>
        </div>
      )}
    </div>
  );
};

export default memo(ProductMixedCatalog);
