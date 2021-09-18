import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Rating from '@UI/Rating';
import Image from '@UI/Image';
import Scroller from '@UI/Scroller';
import { ReviewData } from '@Types/Review';
import useMedias from '@Hooks/useMedias';
import styles from './Review.module.css';

export interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  review: ReviewData;
}

const Review: FC<ReviewProps> = (props) => {
  const { className, review, ...restProps } = props;
  const { isDesktop, isMobile } = useMedias();

  return (
    <div {...restProps} className={cn(styles.review, className)}>
      <Scroller className={styles.reviewScroller} invisible={isMobile}>
        <div className={styles.modalWrapper}>
          {review.photos && review.photos.length > 0 && (
            <Image className={styles.photo} src={review.photos[0].image} />
          )}

          {isDesktop ? (
            <div>
              <div className={styles.head}>
                <div className={styles.name}>{review.author}</div>
                <div className={styles.date}>{review.created_at}</div>
              </div>

              <div className={styles.criterias}>
                <div className={styles.criteria}>
                  <div className={styles.criteriaName}>Товар</div>
                  <Rating className={styles.criteriaRating} value={review.rating} />
                </div>

                <div className={styles.criteria}>
                  <div className={styles.criteriaName}>Сервис</div>
                  <Rating className={styles.criteriaRating} value={review.rating} />
                </div>
              </div>

              <div className={styles.rewiewText}>{review.text}</div>
            </div>
          ) : (
            <Scroller className={styles.infoScroller}>
              <div className={styles.infoScrollerContent}>
                <div className={styles.head}>
                  <div className={styles.name}>{review.author}</div>
                  <div className={styles.date}>{review.created_at}</div>
                </div>

                <div className={styles.criterias}>
                  <div className={styles.criteria}>
                    <div className={styles.criteriaName}>Товар</div>
                    <Rating className={styles.criteriaRating} value={review.rating} />
                  </div>

                  <div className={styles.criteria}>
                    <div className={styles.criteriaName}>Сервис</div>
                    <Rating className={styles.criteriaRating} value={review.rating} />
                  </div>
                </div>

                <div className={styles.rewiewText}>{review.text}</div>
              </div>
            </Scroller>
          )}
        </div>
      </Scroller>
    </div>
  );
};

export default memo(Review);
