import React, { FC, HTMLAttributes, memo, useState, useCallback } from 'react';
import cns from 'classnames';

import Icon38360 from '@divanru/icons/dist/38/360';
import Fullscreen360 from '@Components/Fullscreen360';
import Cylindo360Viewer from '@Components/Cylindo360Viewer';
import CylindoRotateHint from '@Components/CylindoRotateHint';
import MainSliderPanel from '@Components/MainSliderPanel';
import useModals from '@Hooks/useModals';
import useMedia from '@divanru/ts-utils/useMedia';

import styles from './ProductModel.module.css';

export interface CylindoData {
  SKU: string;
  accountID: number;
  features: Array<string>;
}

export interface ProductModelProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  height?: number;
  medias: CylindoData;
}

const ProductModel: FC<ProductModelProps> = (props) => {
  const { className, height, medias, ...restProps } = props;
  const [, { openModal }] = useModals();

  const [zoom, setZoom] = useState(null);
  const [hideRotateHint, setHideRotateHint] = useState(false);
  const [fullLoaded, setFullLoaded] = useState(false);
  const [errorLoad, setErrorLoad] = useState(false);

  const isMobileL = useMedia('--desktop');

  const iconSize = isMobileL ? 40 : 60;
  const cylindoHeight = height || 400;

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

  const onFullLoaded = useCallback(() => setFullLoaded(true), []);

  const onError = useCallback(() => setErrorLoad(true), []);

  return (
    <div {...restProps} className={cns(styles.productModel, className)}>
      <Icon38360 width={iconSize} height={iconSize} className={styles.view360} />

      <div
        className={cns(styles.WrapperCylindo, {
          [styles.zoomed]: !!zoom,
          [styles.loaded]: fullLoaded,
        })}
        // style={{ height: `${cylindoHeight}px` }}
      >
        <Cylindo360Viewer
          className={styles.CylindoViewer}
          opts={medias}
          zoom={zoom}
          onZoomEnter={onZoomEnter}
          onZoomExit={onZoomExit}
          onViewerReady={onFullLoaded}
          onError={onError}
        />
        <div className={cns(styles.WrapperRotateHint, { [styles.hide]: hideRotateHint })}>
          <CylindoRotateHint className={styles.RotateHint} />
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
        className={styles.ButtonsPanel}
        isZoom={!!zoom}
        onFullscreen={onFullscreen}
        onZoom={onZoom}
      />
    </div>
  );
};

export default memo(ProductModel);
