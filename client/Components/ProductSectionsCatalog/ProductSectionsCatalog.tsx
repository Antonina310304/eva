import React, { FC, HTMLAttributes, MouseEvent, memo, useCallback } from 'react';
import cn from 'classnames';

import Button from '@UI/Button/Button';
import { CatalogData } from '@Types/Catalog';
import { ProductData } from '@Types/Product';
import Section, { SectionItem } from './elements/Section';
import styles from './ProductSectionsCatalog.module.css';

export interface ProductSectionsCatalogProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  pages?: CatalogData[];
  hasNextPage?: boolean;
  onMore?: (e: MouseEvent) => void;
}

const ProductSectionsCatalog: FC<ProductSectionsCatalogProps> = (props) => {
  const { className, pages, hasNextPage, onMore, ...restProps } = props;

  const getProductsBySection = useCallback(
    (modelId: number) => {
      const products: ProductData[] = [];

      pages.forEach((page) => {
        page.products.forEach((product) => {
          if (product.modelId === modelId) products.push(product);
        });
      });

      return products;
    },
    [pages],
  );

  return (
    <div {...restProps} className={cn(styles.catalog, className)}>
      <div className={styles.sections}>
        {pages.map((page) => {
          return page.productsModel.map((productModel) => {
            const sectionProducts = getProductsBySection(productModel.id);
            const items: SectionItem[] = [...sectionProducts];

            if (items.length < 1) return null;
            if (productModel.constructor) items.push({ id: 'stub', ...productModel.constructor });

            return (
              <Section
                className={styles.section}
                productModel={productModel}
                items={items}
                key={productModel.id}
              />
            );
          });
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

export default memo(ProductSectionsCatalog);
