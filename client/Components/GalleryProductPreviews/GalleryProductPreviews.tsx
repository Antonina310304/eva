import { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';
import loadable from '@loadable/component';

import useMedias from '@Hooks/useMedias';
import Image from '@UI/Image';
import Link from '@UI/Link';
import { ProductImageData } from '@Types/Product';
import ImageAreas from './elems/ImageAreas';
import styles from './GalleryProductPreviews.module.css';

export interface GalleryProductPreviewsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  images?: ProductImageData[];
  link: string;
  onChangeSlide?: (slide: number) => void;
}

const Gallery = loadable(() => import('@UI/Gallery'));

const GalleryProductPreviews: FC<GalleryProductPreviewsProps> = (props) => {
  const { className, images = [], link, onChangeSlide, ...restProps } = props;
  const [firstImage] = images;
  const hasGallery = images.length > 1;
  const [, setSlide] = useState(0);
  const [hovered, setHovered] = useState(false);
  const { isOnlyDesktop } = useMedias();
  const orientation = firstImage.orientation || 'landscape';

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
        styles.previews,
        {
          [styles.landscape]: orientation === 'landscape',
          [styles.portrait]: orientation === 'portrait',
        },
        className,
      )}
      onMouseEnter={handleHover}
      onPointerEnter={handleHover}
    >
      <Link to={link} view='primary'>
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
                gap={2}
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
      </Link>
    </div>
  );
};

export default memo(GalleryProductPreviews);
