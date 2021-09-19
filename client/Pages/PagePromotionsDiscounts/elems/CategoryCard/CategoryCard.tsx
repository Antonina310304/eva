import React, { HTMLAttributes, FC, memo } from 'react';
import cn from 'classnames';

import { TrendsCategoryData } from '@Pages/PagePromotionsDiscounts/typings';
import styles from './CategoryCard.module.css';

export interface CategoryCardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  category: TrendsCategoryData;
}

const CategoryCard: FC<CategoryCardProps> = (props) => {
  const { className, category, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.wrapper, className)}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={category.imageUrl} alt={category.title} />
      </div>
      <div className={styles.title}>{category.title}</div>
      <div className={styles.description}>{category.description}</div>
    </div>
  );
};

export default memo(CategoryCard);
