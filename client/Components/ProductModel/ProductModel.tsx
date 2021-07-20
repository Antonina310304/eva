import React, { FC, HTMLAttributes, memo, useRef, useEffect, useState, useCallback } from 'react';
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

  const [zoom, setZoom] = useState(null);
  const [hideRotateHint, setHideRotateHint] = useState(false);
  const [fullLoaded, setFullLoaded] = useState(false);
  const [errorLoad, setErrorLoad] = useState(false);
  const cylinRef = useRef(null);

  const onZoomEnter = useCallback(() => {
    setHideRotateHint(true);
  }, []);

  const onZoomExit = useCallback(() => {
    setHideRotateHint(false);
  }, []);

  const onZoom = useCallback(() => {
    setZoom((prev) => (prev ? null : [0.5, 0.5]));
  }, []);

  const onFullscreen = useCallback(() => {
    openModal('Fullscreen360', {
      opts: medias,
    });
  }, [medias, openModal]);

  const [height, setHeight] = useState(0);

  const onFullLoaded = useCallback(() => {
    setFullLoaded(true);
    const imgHeight = cylinRef.current.getElementsByTagName('img');
    setHeight(imgHeight[0].height);
  }, []);

  const [dimensions, setDimensions] = useState(window.innerWidth);

  const handleResize = useCallback(() => {
    if (fullLoaded) {
      const imgHeight = cylinRef.current.getElementsByTagName('img');

      setDimensions((prev) => {
        if (prev < window.innerWidth) {
          setHeight(9000);
          return window.innerWidth;
        }
        return window.innerWidth;
      });

      setHeight(imgHeight[0].height);
    }
  }, [fullLoaded]);

  useEffect(() => {
    window.addEventListener('resize', handleResize, false);
  }, [handleResize]);

  const onError = useCallback(() => setErrorLoad(true), []);

  return (
    <div {...restProps} className={cns(styles.productModel, className)}>
      <div className={styles.icon360Wrapper}>
        <div className={styles.view360} />
      </div>

      <div
        className={cns(styles.wrapperCylindo, {
          [styles.zoomed]: !!zoom,
          [styles.loaded]: fullLoaded,
        })}
      >
        <div ref={cylinRef}>
          <Cylindo360Viewer
            className={styles.cylindoViewer}
            opts={medias}
            zoom={zoom}
            onZoomEnter={onZoomEnter}
            onZoomExit={onZoomExit}
            onViewerReady={onFullLoaded}
            onError={onError}
            style={{ height: `${height}px` }}
          />
        </div>
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

      <MainSliderPanel
        className={styles.buttonsPanel}
        isZoom={!!zoom}
        onFullscreen={onFullscreen}
        onZoom={onZoom}
      />
    </div>
  );
};

export default memo(ProductModel);
