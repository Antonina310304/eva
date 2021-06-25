import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import List from '@UI/List';
import Button from '@UI/Button/Button';
import { ProductModel } from '@Types/Category';
import { ProductData } from '@Types/Product';
import Section, { SectionItem } from './elements/Section';
import styles from './ProductSectionsCatalog.module.css';

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

          return <Section className={styles.section} section={section} items={items} />;
        }}
      />

      <div className={styles.moreWrapper}>
        <Button className={styles.moreButton} theme='dirty' title='Смотреть еще' />
      </div>
    </div>
  );
};

export default memo(ProductSectionsCatalog);
