import React, { FC, HTMLAttributes, memo, useState, useCallback, useMemo, useEffect } from 'react';
import cn from 'classnames';

import Gallery, { ProgressOptions } from '@UI/Gallery';
import ProgressBar from '@UI/ProgressBar';
import Image from '@UI/Image';
import Rating from '@UI/Rating';
import Button from '@UI/Button';
import Link from '@UI/Link';
import useModals from '@Hooks/useModals';
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
  const [, { openModal }] = useModals();

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

  const getReviewIndex = useCallback(
    (photoId) => {
      const reviewIndex = reviews.findIndex((item: ReviewData) => {
        const ass = item.photos.findIndex((photo) => photo.id === photoId);
        if (ass !== -1) return true;
        return false;
      });

      return reviewIndex;
    },
    [reviews],
  );

  const getLinkIndex = useCallback(
    (photoId) => {
      const reviewIndex = getReviewIndex(photoId);
      return reviews[reviewIndex].id;
    },
    [getReviewIndex, reviews],
  );

  const handleClickReviewImage = useCallback(
    (_e, photoId) => {
      if (window.cancelClick) return;

      const reviewIndex = getReviewIndex(photoId);

      openModal('Review', { reviewIndex, reviews });
    },
    [getReviewIndex, openModal, reviews],
  );

  useEffect(() => {
    if (!window.location.hash.match(/^#review-\d+$/)) return;

    const reviewId = window.location.hash.split('-')[1];
    const reviewIndex = reviews.findIndex((item) => String(item.id) === reviewId);

    if (reviewIndex < 0) return;

    openModal('Review', { reviewIndex, reviews });
  }, [openModal, reviews]);

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
              {track?.width < 100 && (
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
              slideIndex={slide}
              onChangeCurrent={handleChangeCurrent}
              onChangeProgress={handleChangeProgress}
            >
              {photos.map((photo) => (
                <div className={styles.linkWrapper} key={photo.id}>
                  <Link
                    to={`#review-${getLinkIndex(photo.id)}`}
                    className={styles.item}
                    view='simple'
                  >
                    <Image
                      className={styles.photo}
                      src={photo.image}
                      onClick={(e) => handleClickReviewImage(e, photo.id)}
                    />
                  </Link>
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
