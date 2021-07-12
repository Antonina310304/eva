import React, { useCallback, useState, useRef, useMemo } from 'react';
import cns from 'classnames';

import Icon38360 from '@divanru/icons/dist/38/360';
import Icon21PlusZoom from '@divanru/icons/dist/21/plus_zoom';
import Icon21MinusZoom from '@divanru/icons/dist/21/minus_zoom';
import Icon16Fullscreen from '@divanru/icons/dist/16/fullscreen';
import Icon18FullscreenOut from '@divanru/icons/dist/18/fullscreen_out';
import Cylindo360Viewer from '@Components/Cylindo360Viewer';
import CylindoRotateHint from '@Components/CylindoRotateHint';

import styles from './ProductModel.module.css';
import datata from './staticDatas';

const ProductModel = (props) => {
  const { className, isFullscreen, isZoom, onFullscreen, ...restProps } = props;

  const [zoom, setZoom] = useState(null);

  const IconFullscreen = isFullscreen ? Icon18FullscreenOut : Icon16Fullscreen;
  const IconZoom = zoom ? Icon21MinusZoom : Icon21PlusZoom;

  const [hidden, setHidden] = useState(false);
  const refTimeout = useRef();

  const data = datata;

  const medias = useMemo(() => {
    const items = data.mediaGallery.map((item) => {
      return {
        type: item.video !== null ? 'video' : 'image',
        src: item.image,
        videoId: item.video,
        poster: item.video !== null ? item.image : null,
      };
    });

    if (data.cylindo) {
      items.unshift({
        type: 'cylindo',
        fixed: true,
        data: data.cylindo,
      });
    }

    return items;
  }, [data.cylindo, data.mediaGallery]);

  const handleChangeFrameIndex = useCallback(() => {
    setHidden(true);

    clearTimeout(refTimeout.current);
    refTimeout.current = setTimeout(() => setHidden(false), 3000);
  }, []);

  const onZoom = useCallback(() => {
    setZoom((prev) => (prev ? null : [0.5, 0.5]));
  }, []);

  return (
    <div {...restProps} className={cns(styles.productModel, className)}>
      <Icon38360 width={58} height={58} />

      <div className={styles.WrapperCylindo}>
        <Cylindo360Viewer
          className={styles.CylindoViewer}
          opts={medias[0].data}
          zoom={zoom}
          // autonomic={autonomic}
          // onZoomEnter={onZoomEnter}
          // onZoomExit={onZoomExit}
          // onChangeFrameIndex={handleChangeFrameIndex}
        />
        <div className={styles.WrapperRotateHint}>
          <CylindoRotateHint className={styles.RotateHint} />
        </div>
      </div>

      <div className={styles.specialButton}>
        <div className={styles.button} onClick={onZoom}>
          <IconZoom width={30} height={30} />
        </div>
        <div className={styles.button} onClick={onFullscreen}>
          <IconFullscreen width={30} height={30} />
        </div>
      </div>
    </div>
  );
};

export default ProductModel;
