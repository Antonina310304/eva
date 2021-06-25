import React, { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';
import loadable from '@loadable/component';

import useMedias from '@Hooks/useMedias';
import Image from '@UI/Image';
import { ProductImageData } from '@Types/Product';
import ImageAreas from '../ImageAreas';
import styles from './Preview.module.css';

export interface PreviewProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  images?: ProductImageData[];
  onChangeSlide?: (slide: number) => void;
}

const Gallery = loadable(() => import('@UI/Gallery'));

const Preview: FC<PreviewProps> = (props) => {
  const { className, images = [], onChangeSlide, ...restProps } = props;
  const [firstImage] = images;
  const hasGallery = images.length > 1;
  const [slide, setSlide] = useState(0);
  const [hovered, setHovered] = useState(false);
  const { isOnlyDesktop } = useMedias();

  const handleChangeCurrent = useCallback(
    ({ current }) => {
      setSlide(current);

      if (onChangeSlide) onChangeSlide(current);
    },
    [onChangeSlide],
  );

  const handleHover = useCallback(() => {
    setHovered(true);
  }, []);

  return (
    <div
      {...restProps}
      className={cn(
        styles.preview,
        {
          [styles.landscape]: firstImage.orientation === 'landscape',
          [styles.portrait]: firstImage.orientation === 'portrait',
        },
        className,
      )}
      onMouseEnter={handleHover}
      onPointerEnter={handleHover}
    >
      {isOnlyDesktop ? (
        <div className={styles.content}>
          {hasGallery ? (
            <ImageAreas images={images} needLoad={hovered} />
          ) : (
            <Image className={styles.image} src={firstImage.src} />
          )}
        </div>
      ) : (
        <div className={styles.content}>
          {hasGallery ? (
            <Gallery
              className={cn(styles.gallery, className)}
              onChangeCurrent={handleChangeCurrent}
            >
              {images.map((image, index) => (
                <div className={styles.item} key={index}>
                  <Image
                    className={styles.image}
                    src={image.src}
                    needLoad={hovered || index === 0}
                  />
                </div>
              ))}
            </Gallery>
          ) : (
            <Image className={styles.image} src={firstImage.src} />
          )}
        </div>
      )}
    </div>
  );
};

export default memo(Preview);
