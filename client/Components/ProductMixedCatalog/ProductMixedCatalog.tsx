import React, { FC, HTMLAttributes, MouseEvent, memo, useCallback, useEffect, useRef } from 'react';
import cn from 'classnames';

import Button from '@UI/Button';
import ProductCard from '@Components/ProductCard';
import { CatalogData } from '@Types/Catalog';
import { ProductData } from '@Types/Product';
import styles from './ProductMixedCatalog.module.css';

export interface ProductMixedCatalogProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  pages: CatalogData[];
  hasNextPage?: boolean;
  autoload?: boolean;
  onMore?: (e: MouseEvent) => void;
}

const ProductMixedCatalog: FC<ProductMixedCatalogProps> = (props) => {
  const { className, pages, hasNextPage, autoload, onMore, ...restProps } = props;
  const ref = useRef<HTMLDivElement>();

  // Автоподгрузка при скроле
  const handleScroll = useCallback(
    (e) => {
      if (!autoload || !onMore) return;

      const pageYOffsetBottom = window.pageXOffset + document.documentElement.clientHeight;
      const rect = ref.current.getBoundingClientRect();
      const distance = 200;

      if (pageYOffsetBottom > rect.bottom - distance) {
        onMore(e);
      }
    },
    [autoload, onMore],
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div {...restProps} className={cn(styles.catalog, className)} ref={ref}>
      <div className={styles.list}>
        {pages.map((page) => {
          return page.products.map((product: ProductData) => (
            <div className={cn(styles.item)} key={product.id}>
              <ProductCard product={product} view='mini' />
            </div>
          ));
        })}
      </div>

      {hasNextPage && (
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
