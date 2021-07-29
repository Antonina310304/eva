import React, { memo, FC, useCallback, useMemo } from 'react';
import cn from 'classnames';

import Modal from '@Components/Modal';
import { Modal as IModal } from '@Contexts/Modals';
import Link from '@UI/Link';
import Image from '@UI/Image';
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
  const [, { closeAllModals }] = useModals();
  const { reviews } = modal.data;
  const { isDesktop, isMobile } = useMedias();

  const photos = useMemo((): ReviewPhotoData[] => {
    return reviews.reduce(
      (prevReviews: ReviewPhotoData[], review: ReviewData) => [...prevReviews, ...review.photos],
      [],
    );
  }, [reviews]);

  const scrollPadding = useMemo(() => {
    if (isMobile) return 0;
    if (isDesktop) return 20;
    return 30;
  }, [isDesktop, isMobile]);

  const handleClose = useCallback(() => {
    closeAllModals();
  }, [closeAllModals]);

  return (
    <Modal
      className={cn(styles.clientsPhotosModal, [className])}
      id={modal.id}
      visible={modal.visible}
      onClose={handleClose}
    >
      {modal.data && (
        <div className={styles.modalView}>
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.iconClose} onClick={handleClose} />
            </div>

            <Scroller className={styles.content} space={scrollPadding} invisible={isMobile}>
              <div className={styles.photosWrapper}>
                {photos.map((photo, index) => (
                  <Link
                    className={styles.link}
                    to={`#review-${photo.id}`}
                    view='simple'
                    key={index}
                  >
                    <Image className={styles.photo} src={photo.image} />
                  </Link>
                ))}
              </div>
            </Scroller>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default memo(ClientsPhotosModal);
