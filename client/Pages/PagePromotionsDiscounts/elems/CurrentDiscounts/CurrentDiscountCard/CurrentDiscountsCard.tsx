import React from 'react';
import { CategoryInterface } from '@Pages/PagePromotionsDiscounts/elems/CurrentDiscounts/Mock/mockCategories';
import cn from 'classnames';
import styles from './CurrentDiscountsCard.module.css';

interface CurrentDiscountsCardProps {
  className?: string;
  category: CategoryInterface;
}

const CurrentDiscountsCard: React.FC<CurrentDiscountsCardProps> = ({ className, category }) => {
  return (
    <div
      className={cn(styles.wrapper, className)}
      style={{ background: `url(${category.imageUrl})`, backgroundSize: 'cover' }}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.name}>{category.categoryName}</div>
          <div className={styles.count}>{category.countOfPositions}</div>
        </div>
        <div className={styles.footer}>
          <div className={styles.discount}>{`до ${category.maxDiscount}%`}</div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CurrentDiscountsCard);
