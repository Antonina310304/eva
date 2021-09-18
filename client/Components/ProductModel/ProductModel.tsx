import { FC, HTMLAttributes, memo, useState, useCallback } from 'react';
import cns from 'classnames';

import Cylindo360Viewer from '@Components/Cylindo360Viewer';
import CylindoRotateHint from '@Components/CylindoRotateHint';
import MainSliderPanel from '@Components/MainSliderPanel';
import useModals from '@Hooks/useModals';

import styles from './ProductModel.module.css';

export interface CylindoData {
  SKU: string;
  accountID: number;
  features: Array<string>;
}

export interface ProductModelProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  medias: CylindoData;
  onViewerReady?: () => void;
  onError?: () => void;
}

const ProductModel: FC<ProductModelProps> = (props) => {
  const { className, medias, onViewerReady, onError, ...restProps } = props;
  const [, { openModal }] = useModals();
  const [zoom, setZoom] = useState<[number, number]>(null);
  const [hideRotateHint, setHideRotateHint] = useState<boolean>(false);

  const handleZoomEnter = useCallback(({ x, y }) => {
    setHideRotateHint(true);
    setZoom([x, y]);
  }, []);

  const handleZoomExit = useCallback(() => {
    setHideRotateHint(false);
    setZoom(null);
  }, []);

  const handleZoom = useCallback(() => {
    setZoom((prev) => (prev ? null : [0.5, 0.5]));
  }, []);

  const handleFullscreen = useCallback(() => {
    openModal('Fullscreen360', {
      opts: medias,
    });
  }, [medias, openModal]);

  return (
    <div {...restProps} className={cns(styles.productModel, [className])}>
      <div className={styles.blockWrapper}>
        <div className={styles.icon360Wrapper}>
          <div className={styles.view360} />
        </div>

        <MainSliderPanel
          className={styles.buttonsPanel}
          isZoom={!!zoom}
          onFullscreen={handleFullscreen}
          onZoom={handleZoom}
        />

        <div className={styles.content}>
          <div
            className={cns(styles.wrapperCylindo, {
              [styles.zoomed]: !!zoom,
            })}
          >
            <Cylindo360Viewer
              className={styles.cylindoViewer}
              opts={medias}
              zoom={zoom}
              onZoomEnter={handleZoomEnter}
              onZoomExit={handleZoomExit}
              onViewerReady={onViewerReady}
              onError={onError}
            />

            <div className={cns(styles.wrapperRotateHint, { [styles.hide]: hideRotateHint })}>
              <CylindoRotateHint />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductModel);
