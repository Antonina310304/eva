import React, { useCallback, useState, useEffect, memo } from 'react';

import cn from 'classnames';
import useMedia from '@divanru/ts-utils/useMedia';

import Modal from '@Components/Modal';
import AsyncYouTube from '@Components/AsyncYouTube';
import useModals from '@Hooks/useModals';
import './VideoModal.css';

const b = cn('VideoModal');

const VideoModal = ({ className }) => {
  const id = 'video';
  const isMobileL = useMedia('--mobile-l');
  const isMobile = useMedia('--mobile');

  const { isVisible, getData, closeModal } = useModals();
  const modalData = getData(id);
  const [player, setPlayer] = useState();
  const [sizes, setSizes] = useState({ width: 0, height: 0 });

  if (!modalData.width) modalData.width = 854;
  if (!modalData.height) modalData.height = 480;

  const onClose = useCallback(() => {
    if (player) player.stopVideo();

    closeModal(id);
  }, [id, closeModal, player]);

  const onReady = useCallback((e) => {
    setPlayer(e.target);
  }, []);

  // Изменяем пропорции видео во время ресайза страницы
  useEffect(() => {
    function resize() {
      if (!isMobileL || !modalData) return;
      const scale = isMobile ? 1 : 0.84;

      const coef = modalData.height / modalData.width;

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
  }, [isMobileL, isMobile, modalData]);

  return (
    <Modal
      className={b({}, [className])}
      view='default-outside'
      id={id}
      visible={isVisible(id)}
      onClose={onClose}
    >
      <div className={b('Container')}>
        {modalData && (
          <AsyncYouTube
            videoId={modalData.videoId}
            opts={{
              height: isMobileL ? sizes.height : modalData.height,
              width: isMobileL ? sizes.width : modalData.width,
              playerVars: {
                autoplay: 1,
              },
            }}
            onReady={onReady}
          />
        )}
      </div>
    </Modal>
  );
};

export default memo(VideoModal);
