import React, { memo, HTMLAttributes, FC, MouseEvent } from 'react';
import cn from 'classnames';

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

  return (
    <div {...restProps} className={cn(styles.mainSliderPanel, className)}>
      <div className={styles.specialButton}>
        <div
          className={cn(styles.button, { [styles.actived]: isFullscreen })}
          onClick={onFullscreen}
        >
          <div className={cn(styles.fullScreenIcon, { [styles.onFullScreen]: isFullscreen })} />
        </div>
        <div className={cn(styles.button, { [styles.actived]: isZoom })} onClick={onZoom}>
          <div className={cn(styles.zoomIcon, { [styles.onZoom]: isZoom })} />
        </div>
      </div>
    </div>
  );
};

export default memo(MainSliderPanel);
