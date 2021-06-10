import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import ProductCard from '@Components/ProductCard';
import ConstructorStub from '@Components/ConstructorStub';
import List from '@UI/List';
import { ProductModel, ConstructorStubData } from '@Types/Category';
import { ProductData } from '@Types/Product';
import Section from './elements/Section';
import styles from './ProductCatalog.module.css';

export interface ProductCatalogProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  sections?: ProductModel[];
  products?: ProductData[];
}

export type SectionItem = ProductData | ConstructorStubData;

const ProductCatalog: FC<ProductCatalogProps> = (props) => {
  const { className, sections = [], products = [], ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.productCatalog, className)}>
      <List
        className={styles.sections}
        items={sections}
        renderChild={(section: ProductModel) => {
          const sectionProducts = products.filter((product) => product.modelId === section.id);
          const items: SectionItem[] = [...sectionProducts];

          if (section.constructor) items.push({ id: 'stub', ...section.constructor });

          return (
            <Section className={styles.section} section={section}>
              <List
                className={styles.items}
                items={items}
                renderChild={(item: SectionItem) => {
                  const isStub = item.id === 'stub';

                  return isStub ? (
                    <ConstructorStub className={styles.item} stub={item as ConstructorStubData} />
                  ) : (
                    <ProductCard className={styles.item} product={item as ProductData} />
                  );
                }}
              />
            </Section>
          );
        }}
      />
    </div>
  );
};

export default memo(ProductCatalog);
