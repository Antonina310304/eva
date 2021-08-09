import React, { memo, FC, useCallback } from 'react';
import cn from 'classnames';

import ModalMain, { ModalMainProps } from '@Components/ModalMain';
import Link from '@UI/Link';
import Image from '@UI/Image';
import IconClose from '@UI/IconClose';
import Scroller from '@UI/Scroller';
import useModals from '@Hooks/useModals';
import useMedias from '@Hooks/useMedias';
import { ReviewData } from '@Types/Review';
import styles from './ClientsPhotosModal.module.css';

const ClientsPhotosModal: FC<ModalMainProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const [, { openModal, closeModal }] = useModals();
  const { reviews, currentReviewIndex } = modal.data;
  const { isMobile } = useMedias();

  const handleClose = useCallback(() => {
    closeModal('ClientsPhotos');
    window.history.back();
    openModal('Review', { reviewIndex: currentReviewIndex, reviews });
  }, [closeModal, currentReviewIndex, openModal, reviews]);

  const handleClickLinkToReview = useCallback(
    (_e, reviewIndex) => {
      closeModal('ClientsPhotos');
      openModal('Review', { reviewIndex, reviews });
    },
    [closeModal, openModal, reviews],
  );

  return (
    <ModalMain
      {...restProps}
      className={cn(styles.clientsPhotosModal, [className])}
      modal={modal}
      onClose={handleClose}
    >
      <div className={styles.modalView}>
        <div className={styles.container}>
          <div className={styles.header}>
            <IconClose className={styles.iconClose} onClick={handleClose} />
          </div>

          <Scroller className={styles.content} invisible={isMobile}>
            <div className={styles.photosWrapper}>
              {reviews.map((review: ReviewData, reviewIndex: number) => {
                return (
                  review.photos.length > 0 &&
                  review.photos.map((photo, index: number) => (
                    <Link
                      className={styles.link}
                      to={`#review-${review.id}`}
                      view='simple'
                      onClick={(e) => handleClickLinkToReview(e, reviewIndex)}
                      key={index}
                    >
                      <Image className={styles.photo} src={photo.image} />
                    </Link>
                  ))
                );
              })}
            </div>
          </Scroller>
        </div>
      </div>
    </ModalMain>
  );
};

export default memo(ClientsPhotosModal);
