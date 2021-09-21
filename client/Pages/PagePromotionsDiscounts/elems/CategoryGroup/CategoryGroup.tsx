import { FC, useMemo, memo } from 'react';
import cn from 'classnames';

import { CategoryDiscountData } from '@Pages/PagePromotionsDiscounts/typings';
import CurrentDiscountsCard from '../CurrentDiscountCard';
import styles from './CategoryGroup.module.css';

export interface CategoryGroupProps {
  categories: CategoryDiscountData[];
  className?: string;
}

const CategoryGroup: FC<CategoryGroupProps> = ({ categories, className }) => {
  const topArray = useMemo(() => {
    return categories.filter((_category, index) => index % 2 === 0);
  }, [categories]);

  const bottomArray = useMemo(() => {
    return categories.filter((_category, index) => index % 2 !== 0);
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

export default memo(CategoryGroup);
