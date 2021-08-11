import React, { FC, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import ModalMain, { ModalMainProps } from '@Components/ModalMain';
import useModals from '@Hooks/useModals';
import useMedias from '@Hooks/useMedias';
import useKeyboardEvents from '@Hooks/useKeyboardEvents';
import Scroller from '@UI/Scroller';
import Gallery, { ProgressOptions } from '@UI/Gallery';
import ProgressBar from '@UI/ProgressBar';
import IconClose from '@UI/IconClose';
import styles from './ProductPhotosModal.module.css';

const ProductPhotosModal: FC<ModalMainProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const { images } = modal.data as { images: any[] };
  const [, { closeModal }] = useModals();
  const { isDesktop, isMobile } = useMedias();
  const [slide, setSlide] = useState(0);
  const [track, setTrack] = useState<ProgressOptions>(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const handleClose = useCallback(() => {
    closeModal(modal.id);
  }, [closeModal, modal.id]);

  const handleChangeCurrent = useCallback(({ current }) => {
    setSlide(current);
  }, []);

  const handleChangeProgress = useCallback((opts: ProgressOptions) => {
    setTrack(opts);
  }, []);

  const normalizeIndex = useCallback(
    (value: number) => {
      if (value < 0) return images.length - 1;
      if (value > images.length - 1) return 0;

      return value;
    },
    [images.length],
  );

  const handleClickNext = useCallback(() => {
    setMainImageIndex((prev) => normalizeIndex(prev + 1));
  }, [normalizeIndex]);

  const handleClickPrev = useCallback(() => {
    setMainImageIndex((prev) => normalizeIndex(prev - 1));
  }, [normalizeIndex]);

  const handleClickPreviewImage = useCallback(
    (_e, index) => {
      if (isMobile) return;
      setMainImageIndex(index);
    },
    [isMobile],
  );

  useKeyboardEvents({ onArrowLeft: handleClickPrev, onArrowRight: handleClickNext });

  return (
    <ModalMain
      {...restProps}
      className={cn(styles.productPhotosModal, className)}
      fullscreen
      modal={modal}
    >
      <div className={styles.wrapper}>
        <div className={styles.closePanel} onClick={handleClose}>
          <IconClose className={styles.iconClose} />
        </div>

        <div className={styles.container}>
          <div className={styles.leftScroll}>
            <Scroller>
              <div className={styles.leftScrollContainer}>
                {images.map((image, index) => (
                  <div className={styles.imageWrapper} key={index}>
                    <img
                      className={cn(styles.image, {
                        [styles.active]: index === mainImageIndex,
                      })}
                      src={image.image}
                      onClick={(e) => handleClickPreviewImage(e, index)}
                    />
                  </div>
                ))}
              </div>
            </Scroller>
          </div>

          <div className={styles.mainWrapper}>
            <div className={styles.mainImageWrapper}>
              <img className={styles.mainImage} src={images[mainImageIndex].image} alt='' />
            </div>

            <div className={cn(styles.arrow, styles.prev)} onClick={handleClickPrev} />
            <div className={cn(styles.arrow, styles.next)} onClick={handleClickNext} />
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
                    <img
                      className={cn(styles.image, { [styles.active]: index === mainImageIndex })}
                      src={image.image}
                      onClick={(e) => handleClickPreviewImage(e, index)}
                    />
                  </div>
                ))}
              </Gallery>

              {track?.width < 100 && <ProgressBar className={styles.progressBar} track={track} />}
            </div>
          )}
        </div>
      </div>
    </ModalMain>
  );
};

export default memo(ProductPhotosModal);
