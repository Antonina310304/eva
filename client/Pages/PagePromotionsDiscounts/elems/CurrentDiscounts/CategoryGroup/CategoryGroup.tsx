import React, { FC } from 'react';
import { CategoryInterface } from '@Pages/PagePromotionsDiscounts/elems/CurrentDiscounts/Mock/mockCategories';
import cn from 'classnames';
import CurrentDiscountsCard from '@Pages/PagePromotionsDiscounts/elems/CurrentDiscounts/CurrentDiscountCard/CurrentDiscountsCard';
import styles from './CategoryGroup.module.css';

interface CategoryGroupProps {
  categories: CategoryInterface[];
  className?: string;
}

const CategoryGroup: FC<CategoryGroupProps> = ({ categories, className }) => {
  const topArray = React.useMemo(() => {
    return categories.filter((category, index) => index % 2 === 0);
  }, [categories]);

  const bottomArray = React.useMemo(() => {
    return categories.filter((category, index) => index % 2 !== 0);
  }, [categories]);

  return (
    <div className={cn(className, styles.wrapper)}>
      <div className={cn(styles.line, styles.line_margin)}>
        {topArray.map((category, index) => (
          <div key={index} className={styles.slide}>
            <CurrentDiscountsCard category={category} />
          </div>
        ))}
      </div>
      <div className={styles.line}>
        {bottomArray.map((category, index) => (
          <div key={index} className={styles.slide}>
            <CurrentDiscountsCard category={category} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGroup;
