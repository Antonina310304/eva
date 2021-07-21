import React, { memo, HTMLAttributes, FC, MouseEvent } from 'react';
import cns from 'classnames';

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
    <div {...restProps} className={cns(styles.mainSliderPanel, className)}>
      <div className={styles.specialButton}>
        <div
          className={cns(styles.button, { [styles.actived]: isFullscreen })}
          onClick={onFullscreen}
        >
          <div className={styles.fullScreen} />
        </div>
        <div className={cns(styles.button, { [styles.actived]: isZoom })} onClick={onZoom}>
          <div className={styles.zoom} />
        </div>
      </div>
    </div>
  );
};

export default memo(MainSliderPanel);
