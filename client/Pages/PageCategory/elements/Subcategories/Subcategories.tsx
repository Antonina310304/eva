import React, { FC, memo } from 'react';
import cn from 'classnames';

import Gallery from '@UI/Gallery';
import Link from '@UI/Link';
import { SubcategoryData } from '@Types/Category';
import styles from './Subcategories.module.css';

export interface SubcategoriesProps {
  className?: string;
  subcategories?: SubcategoryData[];
}

const Subcategories: FC<SubcategoriesProps> = (props) => {
  const { className, subcategories, ...restProps } = props;

  return (
    <Gallery {...restProps} className={cn(styles.subcategories, className)} centered>
      {subcategories.map((subcategory, index) => (
        <div
          className={cn(styles.subcategory, { [styles.actived]: subcategory.actived })}
          key={index}
        >
          <Link className={styles.link} to={subcategory.link} view='simple'>
            <div
              className={styles.subcategoryIcon}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: subcategory.icon }}
            />
            <div className={styles.subcategoryTitle}>{subcategory.title}</div>
          </Link>
        </div>
      ))}
    </Gallery>
  );
};

export default memo(Subcategories);
