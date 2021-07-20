import React, { useCallback, memo, useEffect, useRef, FC, MouseEvent, HTMLAttributes } from 'react';
import cn from 'classnames';

import useMedia from '@divanru/ts-utils/useMedia';

import useModals from '@Hooks/useModals';

export interface ModelViewerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  onLoading?: (e: MouseEvent) => void;
}

const ModelViewer: FC<ModelViewerProps> = (props) => {
  const { className, ar, children, onLoading, ...restProps } = props;
  const [, { openModal }] = useModals();

  const isMobile = useMedia('--mobile');
  const isAndroid = useRef(null);
  const isIOS = useRef(null);

  const isARQuicklookCandidate = useRef(null);

  useEffect(() => {
    isAndroid.current = /android/i.test(navigator.userAgent);
    isIOS.current =
      (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.self.MSStream) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    isARQuicklookCandidate.current = (() => {
      const tempAnchor = document.createElement('a');
      return Boolean(
        tempAnchor.relList && tempAnchor.relList.supports && tempAnchor.relList.supports('ar'),
      );
    })();
  }, []);

  const openIOSARQuickLook = useCallback(
    (e) => {
      const anchor = document.createElement('a');

      anchor.setAttribute('rel', 'ar');
      anchor.appendChild(document.createElement('img'));
      anchor.setAttribute('href', ar.usdz);
      anchor.click();

      if (onLoading) onLoading(e);
    },
    [ar, onLoading],
  );

  const handleARViewer = useCallback(
    (e: MouseEvent) => {
      const anchor = document.createElement('a');
      const noArViewerSigil = '#model-viewer-no-ar-fallback';
      let fallbackInvoked = false;
      const location = window.self.location.toString();
      const locationUrl = new URL(location);
      const modelUrl = new URL(ar.glb);
      locationUrl.hash = noArViewerSigil;
      const intent = `intent://arvr.google.com/scene-viewer/1.0?file=${modelUrl.toString()}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end`;

      const undoHashChange = () => {
        if (window.self.location.hash === noArViewerSigil && !fallbackInvoked) {
          fallbackInvoked = true;
          window.self.history.back();
        }
      };

      window.self.addEventListener('hashchange', undoHashChange, { once: true });
      anchor.setAttribute('href', intent);
      anchor.click();

      if (onLoading) onLoading(e);
    },
    [ar, onLoading],
  );

  const handleClickFitting = useCallback(
    (e: MouseEvent) => {
      if (isMobile) {
        const arViewerCandidate = isAndroid.current;
        const iosQuickLookCandidate = isIOS.current && isARQuicklookCandidate.current;

        if (arViewerCandidate) {
          handleARViewer(e);
        } else if (iosQuickLookCandidate) {
          openIOSARQuickLook(e);
        } else {
          openModal('Info', { title: 'Упс...', text: 'Ваш телефон не поддерживает AR-технологию' });
        }
      } else {
        openModal('QrCode', { qrcode: ar.qrcode });
      }

      (window.dataLayer = window.dataLayer || []).push({ event: 'augmented_reality' });
    },
    [handleARViewer, openIOSARQuickLook, openModal, ar, isMobile],
  );

  return (
    <div {...restProps} className={cn({}, [className])} onClick={handleClickFitting}>
      {children}
    </div>
  );
};

export default memo(ModelViewer);
