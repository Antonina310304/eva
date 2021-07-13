import React, { useState, useRef, useEffect, memo, HTMLAttributes, FC, MouseEvent } from 'react';
import cns from 'classnames';

import Icon16Fullscreen from '@divanru/icons/dist/16/fullscreen';
import Icon18FullscreenOut from '@divanru/icons/dist/18/fullscreen_out';
import Icon21PlusZoom from '@divanru/icons/dist/21/plus_zoom';
import Icon21MinusZoom from '@divanru/icons/dist/21/minus_zoom';
import useMedia from '@divanru/ts-utils/useMedia';
import Image from '@UI/Image';

import iconZoom from './icons/zoom.svg';
import styles from './MainSliderPanel.module.css';

export interface MainSliderPanelProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  crop?: boolean;
  isFullscreen?: boolean;
  isZoom?: boolean;
  arExpanded?: boolean;
  arHiddenPopup?: boolean;
  onFullscreen?: (e: MouseEvent) => void;
  onZoom?: (e: MouseEvent) => void;
  onLoading?: (e: MouseEvent) => void;
}

const MainSliderPanel: FC<MainSliderPanelProps> = (props) => {
  const {
    crop,
    isFullscreen,
    isZoom,
    arExpanded,
    arHiddenPopup,
    className,
    onFullscreen,
    onZoom,
    onLoading,
    ...restProps
  } = props;

  const isIOS = useRef(null);
  const isYaBrowser = useRef(null);
  const isMobile = useMedia('--mobile');
  const isMobileL = useMedia('--desktop');

  const iconSize = isMobileL ? 20 : 30;

  const IconFullscreen = isFullscreen ? Icon18FullscreenOut : Icon16Fullscreen;
  const IconZoom = isZoom ? Icon21MinusZoom : Icon21PlusZoom;

  useEffect(() => {
    isYaBrowser.current = /YaBrowser/i.test(navigator.userAgent);
    isIOS.current =
      (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.self.MSStream) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }, [isMobile]);

  return (
    <div {...restProps} className={cns(styles.MainSliderPanel, className)}>
      <div className={styles.SpecialButton}>
        <div
          className={cns(styles.Button, { [styles.actived]: isFullscreen })}
          onClick={onFullscreen}
        >
          <IconFullscreen width={iconSize} height={iconSize} />
        </div>
        <div className={cns(styles.Button, { [styles.actived]: isZoom })} onClick={onZoom}>
          <IconZoom width={iconSize} height={iconSize} />
          {/* <Image src={iconZoom} /> */}
        </div>
      </div>
    </div>
  );
};

export default memo(MainSliderPanel);
