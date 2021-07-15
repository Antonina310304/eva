import React, { FC, HTMLAttributes, memo, useState } from 'react';
import cn from 'classnames';

import Review from '@Components/Review';
import List from '@UI/List';
import { ReviewData } from '@Types/Review';
import styles from './ListReviews.module.css';

export interface ListReviewsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  reviews?: ReviewData[];
}

const ListReviews: FC<ListReviewsProps> = (props) => {
  const { className, reviews, ...restProps } = props;
  const [countVisible, setCountVisible] = useState(3);

  return (
    <List
      {...restProps}
      className={cn(styles.listReviews, className)}
      items={reviews.slice(0, countVisible)}
      renderChild={(review: ReviewData) => <Review className={styles.review} review={review} />}
    />
  );
};

export default memo(ListReviews);
