import React, { FC, memo } from 'react';
import cn from 'classnames';

import Link, { LinkProps } from '@UI/Link';
import { TrendsCategoryData } from '@Pages/PagePromotionsDiscounts/typings';
import styles from './CategoryCard.module.css';

export interface CategoryCardProps extends LinkProps {
  className?: string;
  category: TrendsCategoryData;
}

const CategoryCard: FC<CategoryCardProps> = (props) => {
  const { className, category, ...restProps } = props;

  return (
    <Link {...restProps} className={cn(styles.wrapper, className)} to={category.link}>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={category.imageUrl} alt={category.title} />
      </div>
      <div className={styles.title}>{category.title}</div>
      <div className={styles.description}>{category.description}</div>
    </Link>
  );
};

export default memo(CategoryCard);
