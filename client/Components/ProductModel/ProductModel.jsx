import React, { useCallback, useState } from 'react';
import cns from 'classnames';

import Icon38360 from '@divanru/icons/dist/38/360';
import Cylindo360Viewer from '@Components/Cylindo360Viewer';
import CylindoRotateHint from '@Components/CylindoRotateHint';
import MainSliderPanel from '@Components/MainSliderPanel';
import useModals from '@Hooks/useModals';
import useMedia from '@divanru/ts-utils/useMedia';

import styles from './ProductModel.module.css';
import medias from './staticDatas';

const ProductModel = (props) => {
  const { className, height, ...restProps } = props;
  const [, { openModal }] = useModals();

  const [zoom, setZoom] = useState(null);

  const isMobileL = useMedia('--desktop');

  const iconSize = isMobileL ? 40 : 60;
  const cylindoHeight = height || 400;
  const onZoomEnter = useCallback(() => {
    setZoom([0.5, 0.5]);
  }, []);

  const onZoomExit = useCallback(() => {
    setZoom(null);
  }, []);

  const onZoom = useCallback(() => {
    setZoom((prev) => (prev ? null : [0.5, 0.5]));
  }, []);

  const onFullscreen = useCallback(() => {
    openModal('Fullscreen360', {
      opts: medias.data,
    });
  }, [openModal]);

  return (
    <div {...restProps} className={cns(styles.productModel, className)}>
      <Icon38360 width={iconSize} height={iconSize} className={styles.view360} />

      <div
        className={cns(styles.WrapperCylindo, { [styles.zoomed]: !!zoom })}
        style={{ height: `${cylindoHeight}px` }}
      >
        <Cylindo360Viewer
          className={styles.CylindoViewer}
          opts={medias.data}
          zoom={zoom}
          onZoomEnter={onZoomEnter}
          onZoomExit={onZoomExit}
        />
        <div className={styles.WrapperRotateHint}>
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
