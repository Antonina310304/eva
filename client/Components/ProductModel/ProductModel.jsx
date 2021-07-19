import React, { useCallback, useState } from 'react';
import cns from 'classnames';

import Icon38360 from '@divanru/icons/dist/38/360';
import Cylindo360Viewer from '@Components/Cylindo360Viewer';
import CylindoRotateHint from '@Components/CylindoRotateHint';
import MainSliderPanel from '@Components/MainSliderPanel';
import useModals from '@Hooks/useModals';
import useMedia from '@divanru/ts-utils/useMedia';

import styles from './ProductModel.module.css';

const ProductModel = (props) => {
  const { className, height, medias, ...restProps } = props;
  const [, { openModal }] = useModals();

  const [zoom, setZoom] = useState(null);
  const [hideRotateHint, setHideRotateHint] = useState(false);

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

  return (
    <div {...restProps} className={cns(styles.productModel, className)}>
      <Icon38360 width={iconSize} height={iconSize} className={styles.view360} />

      <div
        className={cns(styles.WrapperCylindo, { [styles.zoomed]: !!zoom })}
        // style={{ height: `${cylindoHeight}px` }}
      >
        <Cylindo360Viewer
          className={styles.CylindoViewer}
          opts={medias}
          zoom={zoom}
          onZoomEnter={onZoomEnter}
          onZoomExit={onZoomExit}
        />
        <div className={cns(styles.WrapperRotateHint, { [styles.hide]: hideRotateHint })}>
          <CylindoRotateHint className={styles.RotateHint} />
        </div>
      </div>

      <MainSliderPanel
        className={styles.ButtonsPanel}
        isZoom={!!zoom}
        onFullscreen={onFullscreen}
        onZoom={onZoom}
      />
    </div>
  );
};

export default ProductModel;
