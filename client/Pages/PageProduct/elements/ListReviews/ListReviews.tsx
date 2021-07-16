import React, { FC, HTMLAttributes, memo, useState, useCallback, useMemo } from 'react';
import cn from 'classnames';

import Review from '@Components/Review';
import List from '@UI/List';
import Paginator from '@UI/Paginator';
import { ReviewData } from '@Types/Review';
import styles from './ListReviews.module.css';

export interface ListReviewsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  reviews?: ReviewData[];
}

const countVisible = 3;
const ListReviews: FC<ListReviewsProps> = (props) => {
  const { className, reviews, ...restProps } = props;
  const [nowPage, setNowPage] = useState(1);
  const total = Math.round(reviews.length / countVisible);

  const visibleReviews = useMemo(() => {
    const start = (nowPage - 1) * countVisible;
    const end = nowPage * countVisible;

    return reviews.slice(start, end);
  }, [nowPage, reviews]);

  const handleChangePage = useCallback((e, { page }) => {
    setNowPage(page);
  }, []);

  return (
    <div {...restProps} className={cn(styles.container, className)}>
      <List
        className={styles.listReviews}
        items={visibleReviews}
        renderChild={(review: ReviewData) => <Review className={styles.review} review={review} />}
      />

      <div className={styles.wrapperNav}>
        <Paginator
          className={styles.paginator}
          now={nowPage}
          total={total}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
};

export default memo(ListReviews);
