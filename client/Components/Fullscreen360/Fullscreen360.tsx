import { memo, useState, useCallback, FC, MouseEvent } from 'react';
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
  const [zoom, setZoom] = useState<[number, number]>(null);
  const [hideRotateHint, setHideRotateHint] = useState<boolean>(false);

  const toggleZoom = useCallback(() => {
    setZoom((prev) => (prev ? null : [0.5, 0.5]));
  }, []);

  const handleZoomEnter = useCallback(({ x, y }) => {
    setHideRotateHint(true);
    setZoom([x, y]);
  }, []);

  const handleZoomExit = useCallback(() => {
    setHideRotateHint(false);
    setZoom(null);
  }, []);

  return (
    <div
      {...restProps}
      className={cns(styles.fullscreen360, { [styles.zoomed]: !!zoom }, className)}
    >
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <div className={styles.cylindoContainer}>
            <Cylindo360Viewer
              className={styles.viewer}
              opts={opts}
              zoom={zoom}
              onZoomEnter={handleZoomEnter}
              onZoomExit={handleZoomExit}
            />

            <div className={cns(styles.wrapperRotateHint, { [styles.hide]: hideRotateHint })}>
              <CylindoRotateHint className={styles.rotateHint} />
            </div>
          </div>
        </div>

        <MainSliderPanel
          className={styles.panel}
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
