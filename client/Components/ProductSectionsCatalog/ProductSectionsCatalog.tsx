import React, { cloneElement, FC, HTMLAttributes, memo, ReactElement, useMemo } from 'react';
import cn from 'classnames';

import ProductCard from '@Components/ProductCard';
import ConstructorStub from '@Components/ConstructorStub';
import List from '@UI/List';
import Button from '@UI/Button/Button';
import Gallery from '@UI/Gallery';
import useMedias from '@Hooks/useMedias';
import { ProductModel, ConstructorStubData } from '@Types/Category';
import { ProductData } from '@Types/Product';
import Section from './elements/Section';
import styles from './ProductSectionsCatalog.module.css';

export type SectionItem = ProductData | ConstructorStubData;

export interface ItemsProps {
  className?: string;
  children: ReactElement | ReactElement[];
}

const Items: FC<ItemsProps> = (props) => {
  const { children, ...restProps } = props;
  const { isMobileM } = useMedias();

  return isMobileM ? (
    <Gallery {...restProps}>{children}</Gallery>
  ) : (
    <div {...restProps}>{children}</div>
  );
};

export interface ProductSectionsCatalogProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  sections?: ProductModel[];
  products?: ProductData[];
}

const ProductSectionsCatalog: FC<ProductSectionsCatalogProps> = (props) => {
  const { className, sections = [], products = [], ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.catalog, className)}>
      <List
        className={styles.sections}
        items={sections}
        renderChild={(section: ProductModel) => {
          const sectionProducts = products.filter((product) => product.modelId === section.id);
          const items: SectionItem[] = [...sectionProducts];

          if (section.constructor) items.push({ id: 'stub', ...section.constructor });

          return (
            <Section className={styles.section} section={section}>
              <Items className={styles.items}>
                {items.map((item, index) => {
                  const isStub = item.id === 'stub';

                  return (
                    <div className={styles.item} key={index}>
                      {isStub ? (
                        <ConstructorStub stub={item as ConstructorStubData} />
                      ) : (
                        <ProductCard product={item as ProductData} />
                      )}
                    </div>
                  );
                })}
              </Items>
            </Section>
          );
        }}
      />

      <div className={styles.moreWrapper}>
        <Button className={styles.moreButton} theme='dirty' title='Смотреть еще' />
      </div>
    </div>
  );
};

export default memo(ProductSectionsCatalog);
