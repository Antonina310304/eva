import React, { FC, HTMLAttributes, MouseEvent, memo } from 'react';
import cn from 'classnames';

import List from '@UI/List';
import Button from '@UI/Button/Button';
import { ProductModel } from '@Types/Category';
import { CatalogData } from '@Types/Catalog';
import Section, { SectionItem } from './elements/Section';
import styles from './ProductSectionsCatalog.module.css';

export interface ProductSectionsCatalogProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  sections?: ProductModel[];
  catalog?: CatalogData;
  onMore?: (e: MouseEvent) => void;
}

const ProductSectionsCatalog: FC<ProductSectionsCatalogProps> = (props) => {
  const { className, sections = [], catalog, onMore, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.catalog, className)}>
      <List
        className={styles.sections}
        items={sections}
        renderChild={(section: ProductModel) => {
          const sectionProducts = catalog.products.filter((product) => {
            return product.modelId === section.id;
          });
          const items: SectionItem[] = [...sectionProducts];

          if (section.constructor) items.push({ id: 'stub', ...section.constructor });

          return <Section className={styles.section} section={section} items={items} />;
        }}
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

export default memo(ProductSectionsCatalog);
