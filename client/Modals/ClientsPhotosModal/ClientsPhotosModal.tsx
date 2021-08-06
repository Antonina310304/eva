import React, { memo, FC, useCallback } from 'react';
import cn from 'classnames';

import Modal from '@Components/Modal';
import { Modal as IModal } from '@Contexts/Modals';
import Link from '@UI/Link';
import Image from '@UI/Image';
import IconClose from '@UI/IconClose';
import Scroller from '@UI/Scroller';
import useModals from '@Hooks/useModals';
import { ReviewData } from '@Types/Review';
import useMedias from '@Hooks/useMedias';
import styles from './ClientsPhotosModal.module.css';

export interface ClientsPhotosModalProps {
  className?: string;
  modal: IModal;
}

const ClientsPhotosModal: FC<ClientsPhotosModalProps> = (props) => {
  const { className, modal } = props;
  const [, { openModal, closeModal }] = useModals();
  const { reviews, currentReviewIndex } = modal.data;
  const { isMobile } = useMedias();

  // TODO функционал для оступа от полосы прокрутки
  // const scrollPadding = useMemo(() => {
  //   if (isMobile) return 0;
  //   if (isDesktop) return 20;
  //   return 30;
  // }, [isDesktop, isMobile]);

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
    </Modal>
  );
};

export default memo(ClientsPhotosModal);
