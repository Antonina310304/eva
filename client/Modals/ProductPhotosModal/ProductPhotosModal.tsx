import React, { FC, memo, useCallback, useState, useMemo } from 'react';
import cn from 'classnames';

import ModalMain, { ModalMainProps } from '@Components/ModalMain';
import useModals from '@Hooks/useModals';
import useMedias from '@Hooks/useMedias';
import useKeyboardEvents from '@Hooks/useKeyboardEvents';
import Scroller from '@UI/Scroller';
import Gallery, { ProgressOptions } from '@UI/Gallery';
import ProgressBar from '@UI/ProgressBar';
import ImageComponent from '@UI/Image';
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

  const imagesWithOrientation = useMemo(() => {
    return images.map((image) => {
      const imageOrientation = { ...image };
      const newImage = new Image();
      newImage.onload = () => {
        if (newImage.height > newImage.width) {
          imageOrientation.orientation = 'portrait';
        } else {
          imageOrientation.orientation = 'landscape';
        }
      };
      newImage.src = image.image;

      return imageOrientation;
    });
  }, [images]);

  console.log('imagesWithOrientation', imagesWithOrientation);

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
    <ModalMain {...restProps} className={cn(styles.productPhotosModal, className)} modal={modal}>
      <div className={styles.closePanel} onClick={handleClose}>
        <IconClose className={styles.iconClose} />
      </div>

      <div className={styles.container}>
        <Scroller className={styles.leftScroll}>
          {imagesWithOrientation.map((image, index) => (
            <div className={styles.imageWrapper} key={index}>
              <ImageComponent
                className={cn(styles.image, {
                  [styles.landscape]: image.orientation === 'landscape',
                  [styles.portrait]: image.orientation === 'portrait',
                  [styles.active]: index === mainImageIndex,
                })}
                src={image.image}
                onClick={(e) => handleClickPreviewImage(e, index)}
              />
            </div>
          ))}
        </Scroller>

        <div className={styles.mainWrapper}>
          <div className={styles.mainImageWrapper}>
            <ImageComponent className={styles.mainImage} src={images[mainImageIndex].image} />
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
                  <ImageComponent
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
    </ModalMain>
  );
};

export default memo(ProductPhotosModal);
