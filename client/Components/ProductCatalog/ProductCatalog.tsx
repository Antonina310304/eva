import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import ProductCard from '@Components/ProductCard';
import List from '@UI/List';
import { ProductModel } from '@Types/Category';
import { ProductData } from '@Types/Product';
import Section from './Section';
import styles from './ProductCatalog.module.css';

export interface ProductCatalogProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  sections?: ProductModel[];
  products?: ProductData[];
}

const ProductCatalog: FC<ProductCatalogProps> = (props) => {
  const { className, sections = [], products = [], ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.productCatalog, className)}>
      <List
        className={styles.sections}
        items={sections}
        renderChild={(section: ProductModel) => (
          <Section className={styles.section} section={section}>
            <List
              className={styles.products}
              items={products.filter((product) => product.modelId === section.id)}
              renderChild={(product: ProductData) => (
                <ProductCard className={styles.product} product={product} />
              )}
            />
          </Section>
        )}
      />
    </div>
  );
};

export default memo(ProductCatalog);
