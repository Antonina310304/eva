import { memo, FC, useState, useCallback, useMemo } from 'react';
import cn from 'classnames';

import ModalMain, { ModalMainProps } from '@Components/ModalMain';
import IconClose from '@UI/IconClose';
import useModals from '@Hooks/useModals';
import Review from './elems/Review';
import styles from './ReviewModal.module.css';

const ReviewModal: FC<ModalMainProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const { reviews, reviewIndex } = modal.data;
  const [currentReviewIndex, setCurrentRewiewIndex] = useState<number>(reviewIndex);
  const [, { closeAllModals, openModal }] = useModals();

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
    openModal('ClientsPhotos', { reviews, currentReviewIndex });
  }, [currentReviewIndex, openModal, reviews]);

  return (
    <ModalMain
      {...restProps}
      className={cn(styles.reviewModal, [className])}
      modal={modal}
      navigation={{ nextHref: `#review-${nextId}`, prevHref: `#review-${prevId}` }}
      onClose={handleClose}
      onNext={handleNext}
      onPrev={handlePrev}
    >
      <div className={styles.modalView}>
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
      </div>
    </ModalMain>
  );
};

export default memo(ReviewModal);
