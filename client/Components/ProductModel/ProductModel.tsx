import React, { FC, HTMLAttributes, memo, useState, useCallback } from 'react';
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
}

const ProductModel: FC<ProductModelProps> = (props) => {
  const { className, medias, ...restProps } = props;
  const [, { openModal }] = useModals();

  const [zoom, setZoom] = useState<[number, number]>(null);
  const [hideRotateHint, setHideRotateHint] = useState<boolean>(false);
  const [fullLoaded, setFullLoaded] = useState<boolean>(false);
  const [errorLoad, setErrorLoad] = useState<boolean>(false);

  const onZoomEnter = useCallback(({ x, y }) => {
    setHideRotateHint(true);
    setZoom([x, y]);
  }, []);

  const onZoomExit = useCallback(() => {
    setHideRotateHint(false);
    setZoom(null);
  }, []);

  const onZoom = useCallback(() => {
    setZoom((prev) => (prev ? null : [0.5, 0.5]));
  }, []);

  const onFullscreen = useCallback(() => {
    openModal('Fullscreen360', {
      opts: medias,
    });
  }, [medias, openModal]);

  const onFullLoaded = useCallback(() => {
    setFullLoaded(true);
  }, []);

  const onError = useCallback(() => setErrorLoad(true), []);

  return (
    <div {...restProps} className={cns(styles.productModel, [className])}>
      <div className={styles.blockWrapper}>
        <div className={styles.icon360Wrapper}>
          <div className={styles.view360} />
        </div>

        <MainSliderPanel
          className={styles.buttonsPanel}
          isZoom={!!zoom}
          onFullscreen={onFullscreen}
          onZoom={onZoom}
        />

        <div className={styles.content}>
          <div
            className={cns(styles.wrapperCylindo, {
              [styles.zoomed]: !!zoom,
              [styles.loaded]: fullLoaded,
            })}
          >
            <Cylindo360Viewer
              className={styles.cylindoViewer}
              opts={medias}
              zoom={zoom}
              onZoomEnter={onZoomEnter}
              onZoomExit={onZoomExit}
              onViewerReady={onFullLoaded}
              onError={onError}
            />

            <div className={cns(styles.wrapperRotateHint, { [styles.hide]: hideRotateHint })}>
              <CylindoRotateHint />
            </div>
          </div>

          {errorLoad ? (
            <div>Ошибка загрузки</div>
          ) : (
            <div
              className={cns(styles.loading, {
                [styles.loaded]: fullLoaded,
              })}
            >
              Загрузка
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(ProductModel);
