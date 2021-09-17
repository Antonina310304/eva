import React, { FC, memo, useCallback, useState, useEffect, useRef } from 'react';
import cn from 'classnames';

import { Modal } from '@Contexts/Modals';
import ModalMain, { ModalMainProps } from '@Components/ModalMain';
import useModals from '@Hooks/useModals';
import useMedias from '@Hooks/useMedias';
import useKeyboardEvents from '@Hooks/useKeyboardEvents';
import animate from '@Utils/animate';
import Scroller from '@UI/Scroller';
import Gallery, { ProgressOptions } from '@UI/Gallery';
import ProgressBar from '@UI/ProgressBar';
import IconClose from '@UI/IconClose';
import styles from './ProjectModal.module.css';

export interface ProjectData {
  height: number;
  projectId: number;
  src: string;
  text: string[];
  title: string;
  width: number;
}

export interface ProjectModalData {
  startSlideIndex?: number;
  imageIndex: number;
  uniqueProjects: ProjectData[];
}

export interface ProjectModal extends Modal {
  data: ProjectModalData;
}

export interface ProjectModalProps extends ModalMainProps {
  modal: ProjectModal;
}

const ProjectModal: FC<ProjectModalProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const { uniqueProjects, startSlideIndex, imageIndex } = modal.data;
  const [, { closeModal }] = useModals();
  const { isDesktop, isMobileM } = useMedias();
  const [slide, setSlide] = useState(0);
  const [track, setTrack] = useState<ProgressOptions>(null);
  const [mainMediaIndex, setMainMediaIndex] = useState(imageIndex || 0);
  const [scrollTop, setScrollTop] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const refScroll = useRef(null);

  const normalizeIndex = useCallback(
    (value: number) => {
      if (value < 0) return uniqueProjects.length - 1;
      if (value > uniqueProjects.length - 1) return 0;

      return value;
    },
    [uniqueProjects.length],
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
    },
    [isMobileM],
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
    } else {
      scrollTo(mainMediaIndex);
    }
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
                {uniqueProjects.map((media, indexMedia) => (
                  <div
                    className={styles.mediaWrapper}
                    key={indexMedia}
                    onClick={(e) => handleClickPreviewMedia(e, indexMedia)}
                  >
                    <img
                      className={cn(styles.media, {
                        [styles.active]: indexMedia === mainMediaIndex,
                      })}
                      src={media.src}
                      alt=''
                    />
                  </div>
                ))}
              </div>
            </Scroller>
          </div>

          <div className={styles.mainWrapper}>
            <div className={styles.mainMediaWrapper}>
              <img className={styles.mainMedia} src={uniqueProjects[mainMediaIndex].src} alt='' />
              <div className={styles.descriptionWrapper}>
                <h3 className={styles.projectName}>{uniqueProjects[0].title}</h3>
                <div className={styles.textWrapper}>
                  {uniqueProjects[0].text.map((elem, elemIndex: number) => (
                    <div className={styles.description} key={elemIndex}>
                      {elem}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <>
              <div className={cn(styles.arrow, styles.prev)} onClick={handleClickPrev} />
              <div className={cn(styles.arrow, styles.next)} onClick={handleClickNext} />
            </>
          </div>

          {isDesktop && (
            <div className={styles.wrapperGallery}>
              <Gallery
                className={styles.gallery}
                slideIndex={slide}
                onChangeCurrent={handleChangeCurrent}
                onChangeProgress={handleChangeProgress}
              >
                {uniqueProjects.map((media, indexItem) => (
                  <div
                    className={styles.mediaWrapper}
                    key={indexItem}
                    onClick={(e) => handleClickPreviewMedia(e, indexItem)}
                  >
                    <img
                      className={cn(styles.media, {
                        [styles.active]: indexItem === mainMediaIndex,
                      })}
                      src={media.src}
                      alt=''
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

export default memo(ProjectModal);
