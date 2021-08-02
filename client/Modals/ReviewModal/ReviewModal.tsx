import React, { memo, FC, useState, useCallback, useMemo, useEffect } from 'react';
import cn from 'classnames';

import Modal from '@Components/Modal';
import { Modal as IModal } from '@Contexts/Modals';
import Link from '@UI/Link';
import IconClose from '@UI/IconClose';
import useModals from '@Hooks/useModals';
import { ReviewData } from '@Types/Review';

import Review from './elems/Review';

import styles from './ReviewModal.module.css';

export interface ReviewModalProps {
  className?: string;
  modal: IModal;
}

const ReviewModal: FC<ReviewModalProps> = (props) => {
  const { className, modal } = props;
  const { reviews, selectedPhoto } = modal.data;
  const [review, setReview] = useState<ReviewData>(
    reviews.find((item: ReviewData) => item.id === selectedPhoto.id),
  );
  const [currentRewiewIndex, setCurrentRewiewIndex] = useState(0);
  const [, { closeAllModals, closeModal }] = useModals();

  const photos = useMemo((): ReviewData[] => {
    return reviews.reduce((prevReviews: ReviewData[], reviewItem: ReviewData) => {
      if (reviewItem.photos.length > 0) {
        prevReviews.push(reviewItem);
      }
      return prevReviews;
    }, []);
  }, [reviews]);

  useEffect(
    () => setCurrentRewiewIndex(photos.findIndex((item: ReviewData) => item.id === review.id)),
    [photos, review.id],
  );

  const nextId = useMemo(() => {
    let res;
    if (currentRewiewIndex !== photos.length - 1) {
      res = photos[currentRewiewIndex + 1].id;
    } else {
      res = photos[0].id;
    }
    return res;
  }, [currentRewiewIndex, photos]);

  const prevId = useMemo(() => {
    let res;
    if (currentRewiewIndex === 0) {
      res = photos[photos.length - 1].id;
    } else {
      res = photos[currentRewiewIndex - 1].id;
    }
    return res;
  }, [currentRewiewIndex, photos]);

  const handleClose = useCallback(() => {
    window.history.pushState('', '', window.location.pathname);
    closeAllModals();
  }, [closeAllModals]);

  const handlePrev = useCallback(() => {
    if (currentRewiewIndex === 0) {
      setReview(photos[photos.length - 1]);
    } else {
      setReview(photos[currentRewiewIndex - 1]);
    }
  }, [currentRewiewIndex, photos]);

  const handleNext = useCallback(() => {
    if (currentRewiewIndex !== photos.length - 1) {
      setReview(photos[currentRewiewIndex + 1]);
    } else {
      setReview(photos[0]);
    }
  }, [currentRewiewIndex, photos]);

  const handleBackClick = useCallback(() => {
    closeModal('Review');
  }, [closeModal]);

  return (
    <Modal
      className={cn(styles.reviewModal, [className])}
      id={modal.id}
      visible={modal.visible}
      onClose={handleClose}
    >
      <div className={styles.modalView}>
        <Link to={`#review-${prevId}`} className={styles.prev} view='simple'>
          <div className={styles.arrowBackground} onClick={handlePrev}>
            <div className={styles.arrow} />
          </div>
        </Link>

        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.back} onClick={handleBackClick}>
              <div className={styles.iconBack} />
              <span className={styles.backText}>Назад</span>
            </div>

            <IconClose onClick={handleClose} />
          </div>

          <Review className={styles.review} review={review} />
        </div>

        <Link to={`#review-${nextId}`} className={styles.next} view='simple'>
          <div className={styles.arrowBackground} onClick={handleNext}>
            <div className={styles.arrow} />
          </div>
        </Link>
      </div>
    </Modal>
  );
};

export default memo(ReviewModal);
