import React, { FC, HTMLAttributes, MouseEvent, memo, useCallback, useState } from 'react';
import cn from 'classnames';
import loadable from '@loadable/component';

import transformImage from './transformImage';
import styles from './Preview.module.css';

export interface ImageData {
  src: string;
}

export interface PreviewProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  images?: ImageData[];
  onChangeSlide?: (slide: number) => void;
}

const Gallery = loadable(() => import('@UI/Gallery'));

const Preview: FC<PreviewProps> = (props) => {
  const { className, images = [], onChangeSlide, ...restProps } = props;
  const [firstImage] = images;
  const hasGallery = images.length > 1;

  const handleChangeCurrent = useCallback(
    ({ current }) => {
      if (onChangeSlide) onChangeSlide(current);
    },
    [onChangeSlide],
  );

  return (
    <div {...restProps} className={cn(styles.preview, className)}>
      {hasGallery ? (
        <Gallery className={styles.gallery} onChangeCurrent={handleChangeCurrent}>
          {images.map((image, index) => (
            <div
              key={index}
              className={styles.image}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: transformImage(image.src, '#f5f3f1') }}
            />
          ))}
        </Gallery>
      ) : (
        <div
          className={styles.image}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: transformImage(firstImage.src, '#f5f3f1') }}
        />
      )}
    </div>
  );
};

export default memo(Preview);
