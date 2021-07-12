import React, { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';
import loadable from '@loadable/component';

import Image from '@UI/Image';
import Link from '@UI/Link';
import { ProductData } from '@Types/Product';
import styles from './Preview.module.css';

export interface PreviewProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  product?: ProductData;
  onChangeSlide?: (slide: number) => void;
}

const Gallery = loadable(() => import('@UI/Gallery'));

const Preview: FC<PreviewProps> = (props) => {
  const { className, product, onChangeSlide, ...restProps } = props;
  const images = product.images || [];
  const [firstImage] = images;
  const hasGallery = images.length > 1;
  const [slide, setSlide] = useState(0);
  const [hovered, setHovered] = useState(false);

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
      <Link to={product.link} aria-label={product.name}>
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
      </Link>
    </div>
  );
};

export default memo(Preview);
