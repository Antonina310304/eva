import React, { memo, FC, useState, useCallback, useMemo } from 'react';
import cn from 'classnames';

import Modal from '@Components/Modal';
import { Modal as IModal } from '@Contexts/Modals';
import Link from '@UI/Link';
import IconClose from '@UI/IconClose';
import useModals from '@Hooks/useModals';
import Review from './elems/Review';
import styles from './ReviewModal.module.css';

export interface ReviewModalProps {
  className?: string;
  modal: IModal;
}

const ReviewModal: FC<ReviewModalProps> = (props) => {
  const { className, modal } = props;
  const { reviews, reviewIndex } = modal.data;
  const [currentReviewIndex, setCurrentRewiewIndex] = useState<number>(reviewIndex);
  const [, { closeAllModals, openModal, closeModal }] = useModals();

  const normalizeIndex = useCallback(
    (value: number) => {
      if (value < 0) return reviews.length - 1;
      if (value > reviews.length - 1) return 0;

      return value;
    },
    [reviews.length],
  );

  const nextId = useMemo(() => {
    return reviews[normalizeIndex(currentReviewIndex + 1)].id;
  }, [currentReviewIndex, normalizeIndex, reviews]);

  const prevId = useMemo(() => {
    return reviews[normalizeIndex(currentReviewIndex - 1)].id;
  }, [currentReviewIndex, normalizeIndex, reviews]);

  const handlePrev = useCallback(() => {
    setCurrentRewiewIndex((prev) => normalizeIndex(prev - 1));
  }, [normalizeIndex]);

  const handleNext = useCallback(() => {
    setCurrentRewiewIndex((prev) => normalizeIndex(prev + 1));
  }, [normalizeIndex]);

  const handleClose = useCallback(() => {
    window.history.pushState('', '', window.location.pathname);
    closeAllModals();
  }, [closeAllModals]);

  const handleBackClick = useCallback(() => {
    window.history.pushState('', '', window.location.pathname);
    closeModal('Review');

    openModal('ClientsPhotos', { reviews, currentReviewIndex });
  }, [closeModal, currentReviewIndex, openModal, reviews]);

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

          <Review className={styles.review} review={reviews[currentReviewIndex]} />
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
