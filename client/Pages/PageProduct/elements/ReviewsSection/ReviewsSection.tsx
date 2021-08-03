import React, { FC, HTMLAttributes, memo, useState, useCallback, useMemo } from 'react';
import cn from 'classnames';

import Gallery, { ProgressOptions } from '@UI/Gallery';
import ProgressBar from '@UI/ProgressBar';
import Image from '@UI/Image';
import Rating from '@UI/Rating';
import Button from '@UI/Button';
import { ReviewData, ReviewPhotoData } from '@Types/Review';
import Arrows from './elements/Arrows';
import styles from './ReviewsSection.module.css';

export interface ReviewsSectionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  reviews: ReviewData[];
  onAddReview?: () => void;
}

const ReviewsSection: FC<ReviewsSectionProps> = (props) => {
  const { className, reviews, title, onAddReview, ...restProps } = props;
  const [slide, setSlide] = useState(0);
  const [track, setTrack] = useState<ProgressOptions>(null);

  const photos = useMemo((): ReviewPhotoData[] => {
    return reviews.reduce((prevReviews, review) => [...prevReviews, ...review.photos], []);
  }, [reviews]);

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;

    const summRating = reviews.reduce((prevRating, review) => prevRating + review.rating, 0);

    return Number((summRating / reviews.length).toFixed(1));
  }, [reviews]);

  const hasPhotos = photos.length > 0;

  const normalizeSlide = useCallback(
    (value: number) => {
      if (value < 0) return 0;
      if (value > reviews.length) return reviews.length;

      return value;
    },
    [reviews.length],
  );

  const handleChangeCurrent = useCallback(({ current }) => {
    setSlide(current);
  }, []);

  const handleChangeProgress = useCallback((opts: ProgressOptions) => {
    setTrack(opts);
  }, []);

  const handlePrev = useCallback(() => {
    setSlide((prev) => normalizeSlide(prev - 1));
  }, [normalizeSlide]);

  const handleNext = useCallback(() => {
    if (track.finished) return;

    setSlide((prev) => normalizeSlide(prev + 1));
  }, [normalizeSlide, track]);

  const addReviewButton = (
    <Button className={styles.button} wide theme='blank' onClick={onAddReview}>
      Оставить отзыв
    </Button>
  );

  return (
    <div
      {...restProps}
      className={cn(
        styles.section,
        { [styles.hasArrows]: hasPhotos && track?.width < 100 },
        className,
      )}
    >
      <div className={styles.head}>
        <div className={styles.headMain}>
          <h2 className={styles.title}>{`Отзывы (${reviews.length})`}</h2>
          {averageRating > 0 && (
            <Rating className={styles.rating} size='m' value={averageRating} scored />
          )}
        </div>

        <div className={styles.headAdditional}>
          {hasPhotos ? (
            <>
              {track && track.width < 100 && (
                <div className={styles.arrows}>
                  <Arrows onPrev={handlePrev} onNext={handleNext} />
                </div>
              )}
            </>
          ) : (
            addReviewButton
          )}
        </div>
      </div>

      {hasPhotos && (
        <>
          <div className={styles.wrapperGallery}>
            <Gallery
              className={styles.gallery}
              cnViewport={styles.galleryViewport}
              slideIndex={slide}
              onChangeCurrent={handleChangeCurrent}
              onChangeProgress={handleChangeProgress}
            >
              {photos.map((photo) => (
                <div className={styles.item} key={photo.id}>
                  <Image className={styles.photo} src={photo.image} />
                </div>
              ))}
            </Gallery>

            {track?.width < 100 && <ProgressBar className={styles.progressBar} track={track} />}
          </div>

          <div className={styles.wrapperButton}>{addReviewButton}</div>
        </>
      )}
    </div>
  );
};

export default memo(ReviewsSection);
