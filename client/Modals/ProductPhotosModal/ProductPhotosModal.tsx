import { FC, memo, useCallback, useState, useEffect, useRef } from 'react';
import cn from 'classnames';

import ModalMain, { ModalMainProps } from '@Components/ModalMain';
import AsyncYouTube from '@Components/AsyncYouTube';
import VideoPreview from '@Components/VideoPreview';
import useModals from '@Hooks/useModals';
import useMedias from '@Hooks/useMedias';
import useKeyboardEvents from '@Hooks/useKeyboardEvents';
import animate from '@Utils/animate';
import Scroller from '@UI/Scroller';
import Gallery, { ProgressOptions } from '@UI/Gallery';
import ProgressBar from '@UI/ProgressBar';
import IconClose from '@UI/IconClose';
import styles from './ProductPhotosModal.module.css';

export interface ModalData {
  images: any[];
  startSlideIndex?: number;
}

const ProductPhotosModal: FC<ModalMainProps> = (props) => {
  const { modal, ...restProps } = props;
  const { images: medias, startSlideIndex } = modal.data as ModalData;
  const [, { closeModal, openModal }] = useModals();
  const { isDesktop, isMobileM } = useMedias();
  const [slide, setSlide] = useState(0);
  const [track, setTrack] = useState<ProgressOptions>(null);
  const [mainMediaIndex, setMainMediaIndex] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const refScroll = useRef(null);

  const selectedMedia = medias[mainMediaIndex];

  const normalizeIndex = useCallback(
    (value: number) => {
      if (value < 0) return medias.length - 1;
      if (value > medias.length - 1) return 0;

      return value;
    },
    [medias.length],
  );

  const scrollTo = useCallback((index) => {
    const previews = refScroll.current.children;

    if (!previews.length) return;

    if (index >= previews.length) return;

    const preview = previews[index] as HTMLDivElement;

    animate({
      timing: 'linear',
      duration: 400,
      draw: (progress) => {
        setScrollTop((prev) => {
          const diff = preview.offsetTop - prev;

          return prev + diff * progress;
        });
      },
    });
  }, []);

  const handleClose = useCallback(() => {
    closeModal(modal.id);
  }, [closeModal, modal.id]);

  const handleChangeCurrent = useCallback(({ current }) => {
    if (window.cancelClick) return;

    setSlide(current);
  }, []);

  const handleChangeProgress = useCallback((opts: ProgressOptions) => {
    setTrack(opts);
  }, []);

  const handleClickNext = useCallback(() => {
    setMainMediaIndex((prev) => normalizeIndex(prev + 1));
  }, [normalizeIndex]);

  const handleClickPrev = useCallback(() => {
    setMainMediaIndex((prev) => normalizeIndex(prev - 1));
  }, [normalizeIndex]);

  const handleClickPreviewMedia = useCallback(
    (_e, index) => {
      if (window.cancelClick) return;

      if (!isMobileM) setMainMediaIndex(index);

      if (isMobileM && medias[index].video) {
        openModal('Video', {
          videoId: medias[index].video,
          previousModal: { images: medias, startSlideIndex: index },
        });
      }
    },
    [isMobileM, medias, openModal],
  );

  useKeyboardEvents({
    onArrowLeft: handleClickPrev,
    onArrowRight: handleClickNext,
    onArrowDown: handleClickNext,
    onArrowUp: handleClickPrev,
  });

  useEffect(() => {
    if (isMobileM) {
      const scrollPosition = startSlideIndex || mainMediaIndex;
      scrollTo(scrollPosition);
    } else scrollTo(mainMediaIndex);
  }, [mainMediaIndex, startSlideIndex, scrollTo, isMobileM]);

  // Ждём завершения анимации открытия окна
  useEffect(() => {
    setTimeout(() => setLoaded(true), 500);
  }, []);

  return (
    <ModalMain {...restProps} fullscreen modal={modal}>
      <div className={cn(styles.wrapper, { [styles.loaded]: loaded })}>
        <div className={styles.closePanel} onClick={handleClose}>
          <IconClose className={styles.iconClose} view='circle' />
        </div>

        <div className={styles.container}>
          <div className={styles.leftScroll}>
            <Scroller
              className={styles.scroller}
              scrollTop={scrollTop}
              onScroll={(values) => setScrollTop(values.scrollTop)}
            >
              <div className={styles.leftScrollContainer} ref={refScroll}>
                {medias.map((media, index) => (
                  <div
                    className={styles.mediaWrapper}
                    key={index}
                    onClick={(e) => handleClickPreviewMedia(e, index)}
                  >
                    {!media.video && (
                      <img
                        className={cn(styles.media, {
                          [styles.active]: index === mainMediaIndex,
                        })}
                        src={media.image}
                      />
                    )}

                    {media.video && (
                      <VideoPreview
                        className={cn(styles.media, {
                          [styles.active]: index === mainMediaIndex,
                        })}
                        src={media.image}
                        cnPreviewHeight={styles.videoHeight}
                      />
                    )}
                  </div>
                ))}
              </div>
            </Scroller>
          </div>

          <div className={styles.mainWrapper}>
            <div className={styles.mainMediaWrapper}>
              {!selectedMedia.video && (
                <img className={styles.mainMedia} src={selectedMedia.image} alt='' />
              )}

              {selectedMedia.video && (
                <div className={styles.videoContainer}>
                  <AsyncYouTube
                    className={styles.video}
                    videoId={selectedMedia.video}
                    opts={{
                      playerVars: {
                        autoplay: 0,
                      },
                    }}
                  />
                </div>
              )}
            </div>

            {!medias[mainMediaIndex].video && (
              <>
                <div className={cn(styles.arrow, styles.prev)} onClick={handleClickPrev} />
                <div className={cn(styles.arrow, styles.next)} onClick={handleClickNext} />
              </>
            )}
          </div>

          {isDesktop && (
            <div className={styles.wrapperGallery}>
              <Gallery
                className={styles.gallery}
                slideIndex={slide}
                onChangeCurrent={handleChangeCurrent}
                onChangeProgress={handleChangeProgress}
              >
                {medias.map((media, index) => (
                  <div
                    className={styles.mediaWrapper}
                    key={index}
                    onClick={(e) => handleClickPreviewMedia(e, index)}
                  >
                    {!media.video && (
                      <img
                        className={cn(styles.media, {
                          [styles.active]: index === mainMediaIndex,
                        })}
                        src={media.image}
                      />
                    )}

                    {media.video && (
                      <VideoPreview
                        className={cn(styles.media, {
                          [styles.active]: index === mainMediaIndex,
                        })}
                        src={media.image}
                        cnPreviewHeight={styles.videoHeight}
                      />
                    )}
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
