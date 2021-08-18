import React, { useCallback, useState, useEffect, memo, FC } from 'react';
import cn from 'classnames';

import useMedias from '@Hooks/useMedias';
import ModalMain, { ModalMainProps } from '@Components/ModalMain';
import AsyncYouTube from '@Components/AsyncYouTube';
import useModals from '@Hooks/useModals';
import styles from './VideoModal.module.css';

const VideoModal: FC<ModalMainProps> = (props) => {
  const { className, modal, ...restProps } = props;
  const { isMobileL, isMobile } = useMedias();
  const [, { closeModal, openModal }] = useModals();
  const [player, setPlayer] = useState(null);
  const [sizes, setSizes] = useState({ width: 0, height: 0 });

  if (!modal.data.width) modal.data.width = 854;
  if (!modal.data.height) modal.data.height = 480;

  const handleClose = useCallback(() => {
    if (player) player.stopVideo();

    closeModal(modal.id);

    if (modal.data.previousModal) {
      openModal('ProductPhotos', {
        images: modal.data.previousModal.images,
        startSlideIndex: modal.data.previousModal.startSlideIndex,
      });
    }
  }, [player, modal.data.previousModal, modal.id, closeModal, openModal]);

  const handleReady = useCallback((e) => {
    setPlayer(e.target);
  }, []);

  // Изменяем пропорции видео во время ресайза страницы
  useEffect(() => {
    function resize() {
      const scale = isMobile ? 1 : 0.84;

      const coef = modal.data.height / modal.data.width;

      setSizes({
        width: document.documentElement.clientWidth * scale,
        height: document.documentElement.clientWidth * scale * coef,
      });
    }

    function cleanup() {
      return window.removeEventListener('resize', resize);
    }

    resize();
    window.addEventListener('resize', resize);

    return cleanup;
  }, [isMobileL, isMobile, modal.data]);

  return (
    <ModalMain
      {...restProps}
      className={cn(styles.modal, className)}
      modal={modal}
      onClose={handleClose}
    >
      <div className={styles.container}>
        <AsyncYouTube
          videoId={modal.data.videoId}
          opts={{
            height: sizes.height.toString(),
            width: sizes.width.toString(),
            playerVars: {
              autoplay: 1,
            },
          }}
          onReady={handleReady}
        />
      </div>
    </ModalMain>
  );
};

export default memo(VideoModal);
