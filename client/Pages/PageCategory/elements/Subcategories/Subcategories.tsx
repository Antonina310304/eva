import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import List from '@UI/List';
import Link from '@UI/Link';
import { SubcategoryData } from '@Types/Category';
import styles from './Subcategories.module.css';

export interface SubcategoriesProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  subcategories?: SubcategoryData[];
}

const Subcategories: FC<SubcategoriesProps> = (props) => {
  const { className, subcategories, ...restProps } = props;

  return (
    <List
      {...restProps}
      className={cn(styles.subcategories, className)}
      items={subcategories}
      renderChild={(subcategory: SubcategoryData) => (
        <Link className={styles.subcategory} href={subcategory.link} view='simple'>
          <div
            className={styles.subcategoryIcon}
            dangerouslySetInnerHTML={{ __html: subcategory.icon }}
          />
          <div className={styles.subcategoryTitle}>{subcategory.title}</div>
        </Link>
      )}
    />
  );
};

export default memo(Subcategories);
