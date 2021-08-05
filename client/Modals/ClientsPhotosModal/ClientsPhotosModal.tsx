import React, { memo, FC, useCallback, useMemo } from 'react';
import cn from 'classnames';

import Modal from '@Components/Modal';
import { Modal as IModal } from '@Contexts/Modals';
import Link from '@UI/Link';
import Image from '@UI/Image';
import IconClose from '@UI/IconClose';
import Scroller from '@UI/Scroller';
import useModals from '@Hooks/useModals';
import { ReviewData, ReviewPhotoData } from '@Types/Review';
import useMedias from '@Hooks/useMedias';
import styles from './ClientsPhotosModal.module.css';

export interface ClientsPhotosModalProps {
  className?: string;
  modal: IModal;
}

const ClientsPhotosModal: FC<ClientsPhotosModalProps> = (props) => {
  const { className, modal } = props;
  const [, { closeAllModals, openModal }] = useModals();
  const { reviews } = modal.data;
  const { isMobile } = useMedias();

  const photos = useMemo((): ReviewPhotoData[] => {
    return reviews.reduce(
      (prevPhotos: ReviewPhotoData[], review: ReviewData) => [...prevPhotos, ...review.photos],
      [],
    );
  }, [reviews]);

  // TODO функционал для оступа от полосы прокрутки
  // const scrollPadding = useMemo(() => {
  //   if (isMobile) return 0;
  //   if (isDesktop) return 20;
  //   return 30;
  // }, [isDesktop, isMobile]);

  const handleClose = useCallback(() => {
    closeAllModals();
  }, [closeAllModals]);

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

  const handleClickLinkToReview = useCallback(
    (_e, photoId) => {
      const reviewIndex = getReviewIndex(photoId);

      closeAllModals();
      openModal('Review', { reviewIndex, reviews });
    },
    [closeAllModals, getReviewIndex, openModal, reviews],
  );

  return (
    <Modal
      className={cn(styles.clientsPhotosModal, [className])}
      id={modal.id}
      visible={modal.visible}
      onClose={handleClose}
    >
      <div className={styles.modalView}>
        <div className={styles.container}>
          <div className={styles.header}>
            <IconClose className={styles.iconClose} onClick={handleClose} />
          </div>

          <Scroller className={styles.content} invisible={isMobile}>
            <div className={styles.photosWrapper}>
              {photos.map((photo, index) => (
                <Link
                  className={styles.link}
                  to={`#review-${getLinkIndex(photo.id)}`}
                  view='simple'
                  onClick={(e) => handleClickLinkToReview(e, photo.id)}
                  key={index}
                >
                  <Image className={styles.photo} src={photo.image} />
                </Link>
              ))}
            </div>
          </Scroller>
        </div>
      </div>
    </Modal>
  );
};

export default memo(ClientsPhotosModal);
