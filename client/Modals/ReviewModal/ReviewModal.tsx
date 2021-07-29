import React, { memo, FC, useState, useCallback, useMemo } from 'react';
import cn from 'classnames';
import { HashRouter, useHistory } from 'react-router-dom';

import Modal from '@Components/Modal';
import { Modal as IModal } from '@Contexts/Modals';
import Review from '@Components/Review';
import Link from '@UI/Link';
import useModals from '@Hooks/useModals';
import { ReviewData } from '@Types/Review';

import styles from './ReviewModal.module.css';

export interface ReviewModalProps {
  className?: string;
  modal: IModal;
}

const ReviewModal: FC<ReviewModalProps> = (props) => {
  const { className, modal } = props;
  const [, { closeAllModals }] = useModals();
  const { reviews, selectedReview } = modal.data;
  const history = useHistory();

  const [slide, setSlide] = useState<ReviewData>(
    reviews.find((item: ReviewData) => item.id === selectedReview.id),
  );

  const photos = useMemo((): ReviewData[] => {
    return reviews.reduce((prevReviews: ReviewData[], review: ReviewData) => {
      if (review.photos.length > 0) {
        prevReviews.push(review);
      }
      return prevReviews;
    }, []);
  }, [reviews]);

  const nextId = useMemo(() => {
    const position = photos.findIndex((item) => item.id === slide.id);
    let res;
    if (position !== photos.length - 1) {
      res = photos[position + 1].id;
    } else {
      res = photos[0].id;
    }
    return res;
  }, [photos, slide.id]);

  const prevId = useMemo(() => {
    const position = photos.findIndex((item) => item.id === slide.id);
    let res;
    if (position === 0) {
      res = photos[photos.length - 1].id;
    } else {
      res = photos[position - 1].id;
    }
    return res;
  }, [photos, slide.id]);

  const handleClose = useCallback(() => {
    history.push(history.location.pathname);
    closeAllModals();
  }, [closeAllModals, history]);

  const handlePrev = useCallback(() => {
    const position = photos.findIndex((item) => item.id === slide.id);

    if (position === 0) {
      setSlide(photos[photos.length - 1]);
    } else {
      setSlide(photos[position - 1]);
    }
  }, [photos, slide.id]);

  const handleNext = useCallback(() => {
    const position = photos.findIndex((item) => item.id === slide.id);

    if (position !== photos.length - 1) {
      setSlide(photos[position + 1]);
    } else {
      setSlide(photos[0]);
    }
  }, [photos, slide.id]);

  return (
    <HashRouter basename={history.location.pathname} hashType='noslash'>
      <Modal
        className={cn(styles.reviewModal, [className])}
        id={modal.id}
        visible={modal.visible}
        onClose={handleClose}
      >
        {modal.data && (
          <div className={styles.modalView}>
            <Link to={`review-${prevId}`}>
              <div
                className={cn(styles.arrowBackground, { [styles.prev]: true })}
                onClick={handlePrev}
              >
                <div className={styles.arrow} />
              </div>
            </Link>

            <div className={styles.container}>
              <div className={styles.header}>
                <div className={styles.back}>
                  <div className={styles.iconBack} />
                  <span>Назад</span>
                </div>

                <div className={styles.iconClose} onClick={handleClose} />
              </div>

              <Review className={styles.review} modalView review={slide} />
            </div>

            <Link to={`review-${nextId}`}>
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
    </HashRouter>
  );
};

export default memo(ReviewModal);
