import React, { FC, useCallback, memo, useState } from 'react';
import cn from 'classnames';

import Modal from '@Components/Modal';
import { Modal as IModal } from '@Contexts/Modals';
import useModals from '@Hooks/useModals';
import useMedias from '@Hooks/useMedias';
import Scroller from '@UI/Scroller';
import Gallery, { ProgressOptions } from '@UI/Gallery';
import ProgressBar from '@UI/ProgressBar';
import Image from '@UI/Image';
import IconClose from '@UI/IconClose';

import styles from './ProductPhotosModal.module.css';

export interface ProductPhotosModalProps {
  className?: string;
  modal: IModal;
}

const ProductPhotosModal: FC<ProductPhotosModalProps> = (props) => {
  const { className, modal } = props;
  const { images } = modal.data;
  const [, { closeModal }] = useModals();
  const { isDesktop } = useMedias();
  const [slide, setSlide] = useState(0);
  const [track, setTrack] = useState<ProgressOptions>(null);

  const handleClose = useCallback(() => {
    closeModal(modal.id);
  }, [closeModal, modal.id]);

  const handleChangeCurrent = useCallback(({ current }) => {
    setSlide(current);
  }, []);

  const handleChangeProgress = useCallback((opts: ProgressOptions) => {
    setTrack(opts);
  }, []);

  return (
    <Modal
      className={cn(styles.productPhotosModal, className)}
      id={modal.id}
      visible={modal.visible}
    >
      <div className={styles.closePanel} onClick={handleClose}>
        <IconClose className={styles.iconClose} />
      </div>

      <div className={styles.container}>
        <Scroller className={styles.leftScroll}>
          {images.map((image, index) => (
            <div className={styles.imageWrapper} key={index}>
              <Image className={styles.image} src={image.image} />
            </div>
          ))}
        </Scroller>

        <div className={styles.mainWrapper}>
          <div className={cn(styles.arrow, styles.prev)}>
            <div className={styles.arrowIcon} />
          </div>

          <div className={styles.mainImageWrapper}>
            <Image className={styles.mainImage} src={images[0].image} />
          </div>

          <div className={cn(styles.arrow, styles.next)}>
            <div className={styles.arrowIcon} />
          </div>
        </div>

        {isDesktop && (
          <div className={styles.wrapperGallery}>
            <Gallery
              className={styles.gallery}
              slideIndex={slide}
              onChangeCurrent={handleChangeCurrent}
              onChangeProgress={handleChangeProgress}
            >
              {images.map((image, index) => (
                <div className={styles.imageWrapper} key={index}>
                  <Image className={styles.image} src={image.image} />
                </div>
              ))}
            </Gallery>

            {track?.width < 100 && <ProgressBar className={styles.progressBar} track={track} />}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default memo(ProductPhotosModal);
