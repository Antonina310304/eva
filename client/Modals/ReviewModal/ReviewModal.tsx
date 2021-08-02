import React, { memo, FC, useState, useCallback, useMemo } from 'react';
import cn from 'classnames';

import Modal from '@Components/Modal';
import { Modal as IModal } from '@Contexts/Modals';
import Review from '@Components/Review';
import Link from '@UI/Link';
import IconClose from '@UI/IconClose';
import useModals from '@Hooks/useModals';
import { ReviewData } from '@Types/Review';

import styles from './ReviewModal.module.css';

export interface ReviewModalProps {
  className?: string;
  modal: IModal;
}

const ReviewModal: FC<ReviewModalProps> = (props) => {
  const { className, modal } = props;
  const [, { closeAllModals, openModal, closeModal }] = useModals();

  const { reviews, selectedPhoto } = modal.data;

  const [review, setReview] = useState<ReviewData>(
    reviews.find((item: ReviewData) => item.id === selectedPhoto.id),
  );

  const photos = useMemo((): ReviewData[] => {
    return reviews.reduce((prevReviews: ReviewData[], reviewItem: ReviewData) => {
      if (reviewItem.photos.length > 0) {
        prevReviews.push(reviewItem);
      }
      return prevReviews;
    }, []);
  }, [reviews]);

  const nextId = useMemo(() => {
    const position = photos.findIndex((item) => item.id === review.id);
    let res;
    if (position !== photos.length - 1) {
      res = photos[position + 1].id;
    } else {
      res = photos[0].id;
    }
    return res;
  }, [photos, review.id]);

  const prevId = useMemo(() => {
    const position = photos.findIndex((item) => item.id === review.id);
    let res;
    if (position === 0) {
      res = photos[photos.length - 1].id;
    } else {
      res = photos[position - 1].id;
    }
    return res;
  }, [photos, review.id]);

  const handleClose = useCallback(() => {
    window.location.assign(window.location.pathname);
    closeAllModals();
  }, [closeAllModals]);

  const handlePrev = useCallback(() => {
    const position = photos.findIndex((item) => item.id === review.id);

    if (position === 0) {
      setReview(photos[photos.length - 1]);
    } else {
      setReview(photos[position - 1]);
    }
  }, [photos, review.id]);

  const handleNext = useCallback(() => {
    const position = photos.findIndex((item) => item.id === review.id);

    if (position !== photos.length - 1) {
      setReview(photos[position + 1]);
    } else {
      setReview(photos[0]);
    }
  }, [photos, review.id]);

  const handleBackClick = useCallback(() => {
    closeModal('Review');
    openModal('ClientsPhotos', {
      reviews,
    });
  }, [closeModal, openModal, reviews]);

  return (
    <Modal
      className={cn(styles.reviewModal, [className])}
      id={modal.id}
      visible={modal.visible}
      onClose={handleClose}
    >
      {modal.data && (
        <div className={styles.modalView}>
          <Link to={`#review-${prevId}`}>
            <div
              className={cn(styles.arrowBackground, { [styles.prev]: true })}
              onClick={handlePrev}
            >
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

            <Review className={styles.review} modalView review={review} />
          </div>

          <Link to={`#review-${nextId}`}>
            <div
              className={cn(styles.arrowBackground, { [styles.next]: true })}
              onClick={handleNext}
            >
              <div className={styles.arrow} />
            </div>
          </Link>
        </div>
      )}
    </Modal>
  );
};

export default memo(ReviewModal);
