import React, { memo, useState, useCallback, FC, MouseEvent } from 'react';
import cns from 'classnames';

import MainSliderPanel from '@Components/MainSliderPanel';
import CylindoRotateHint from '@Components/CylindoRotateHint';
import Cylindo360Viewer, { Cylindo360ViewerProps } from '@Components/Cylindo360Viewer';

import styles from './Fullscreen360.module.css';

export interface Fullscreen360Props extends Cylindo360ViewerProps {
  className?: string;
  isFullscreen?: boolean;
  onFullscreen?: (e: MouseEvent) => void;
}

const Fullscreen360: FC<Fullscreen360Props> = (props) => {
  const { className, opts, isFullscreen, onFullscreen, ...restProps } = props;
  const [zoom, setZoom] = useState(null);

  const toggleZoom = useCallback(() => {
    setZoom((prev) => (prev ? null : [0.5, 0.5]));
  }, []);

  const handleZoomEnter = useCallback(() => {
    setZoom([0.5, 0.5]);
  }, []);

  const handleZoomExit = useCallback(() => {
    setZoom(null);
  }, []);

  return (
    <div
      {...restProps}
      className={cns(styles.Fullscreen360, { [styles.zoomed]: !!zoom }, className)}
    >
      <div className={styles.Container}>
        <div className={styles.ImageContainer}>
          <div className={styles.CylindoContainer}>
            <Cylindo360Viewer
              className={styles.Viewer}
              opts={opts}
              zoom={zoom}
              onZoomEnter={handleZoomEnter}
              onZoomExit={handleZoomExit}
            />

            <div className={styles.WrapperRotateHint}>
              <CylindoRotateHint className={styles.RotateHint} />
            </div>
          </div>
        </div>

        <MainSliderPanel
          className={styles.Panel}
          isFullscreen={isFullscreen}
          isZoom={!!zoom}
          onFullscreen={onFullscreen}
          onZoom={toggleZoom}
        />
      </div>
    </div>
  );
};

export default memo(Fullscreen360);
