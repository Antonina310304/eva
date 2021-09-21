import * as React from 'react';
import cn from 'classnames';

import { CategoryDiscountData } from '@Pages/PagePromotionsDiscounts/typings';
import Link from '@UI/Link';
import styles from './CurrentDiscountsCard.module.css';

export interface CurrentDiscountsCardProps {
  className?: string;
  category: CategoryDiscountData;
}

const CurrentDiscountsCard: React.FC<CurrentDiscountsCardProps> = ({ className, category }) => {
  return (
    <div
      className={cn(styles.wrapper, className)}
      style={{ backgroundImage: `url(${category.imageUrl})`, backgroundSize: 'cover' }}
    >
      <Link to={category.link} className={styles.link}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.name}>{category.categoryName}</div>
            <div className={styles.count}>{category.countOfPositions}</div>
          </div>
          <div className={styles.footer}>
            <div className={styles.discount}>{`до ${category.maxDiscount}%`}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default React.memo(CurrentDiscountsCard);
