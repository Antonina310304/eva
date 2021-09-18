import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Rating from '@UI/Rating';
import Gallery from '@UI/Gallery';
import Image from '@UI/Image';
import { ReviewData } from '@Types/Review';
import styles from './Review.module.css';

export interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  review: ReviewData;
}

const Review: FC<ReviewProps> = (props) => {
  const { className, review, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.review, className)}>
      <div className={styles.head}>
        <div className={styles.name}>{review.author}</div>
        <div className={styles.date}>{review.created_at}</div>
      </div>

      <div className={styles.wrapperMain}>
        <div className={styles.criterias}>
          <div className={styles.criteria}>
            <div className={styles.criteriaName}>Сервис</div>
            <Rating className={styles.criteriaRating} value={review.rating} />
          </div>

          <div className={styles.criteria}>
            <div className={styles.criteriaName}>Товар</div>
            <Rating className={styles.criteriaRating} value={review.rating} />
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.text}>{review.text}</div>

          {review?.photos.length > 0 && (
            <Gallery className={styles.photoGallery}>
              {review.photos.map((photo) => (
                <div className={styles.photoItem} key={photo.id}>
                  <Image className={styles.photo} src={photo.image} />
                </div>
              ))}
            </Gallery>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Review);
