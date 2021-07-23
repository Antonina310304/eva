import React, { FC, HTMLAttributes, memo, useMemo, useCallback, ReactElement } from 'react';
import cn from 'classnames';

import useMedias from '@Hooks/useMedias';
import ProductTags from '@Components/ProductTags';
import Image from '@UI/Image';
import Gallery from '@UI/Gallery';
import Button from '@UI/Button';
import { ProductTagData } from '@Types/Product';
import { AR } from '@Types/AR';
import useModals from '@Hooks/useModals';

import ButtonAr from '../ButtonAr';
import styles from './PhotoGallery.module.css';

export interface MediaGalleryItem {
  image: string;
}

export interface PhotoGalleryProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  images: MediaGalleryItem[];
  tags?: ProductTagData[];
  category: 'Шкафы' | 'Диваны и кресла';
  ar?: AR;
}

export interface ItemsProps {
  className?: string;
  children: ReactElement | ReactElement[];
  slideIndex: number;
  onChange?({ current }: { current: number }): void;
}

const Items: FC<ItemsProps> = (props) => {
  const { slideIndex, children, onChange, ...restProps } = props;
  const { isMobileM } = useMedias();

  return isMobileM ? (
    <Gallery
      {...restProps}
      className={styles.gallery}
      slideIndex={slideIndex}
      onChangeCurrent={onChange}
    >
      {children}
    </Gallery>
  ) : (
    <div {...restProps}>{children}</div>
  );
};

const PhotoGallery: FC<PhotoGalleryProps> = (props) => {
  const { className, ar, category, images = [], tags = [], ...restProps } = props;
  const { isMobileM } = useMedias();
  const [, { openModal }] = useModals();

  const maxItemsCountInGallery = useMemo(() => {
    if (category === 'Шкафы') return 6;

    return 5;
  }, [category]);

  const items = useMemo(() => {
    const galleryViewArray = [];
    const copyImages = images.slice(0, maxItemsCountInGallery);

    if (category === 'Шкафы') {
      while (copyImages.length > 0) {
        galleryViewArray.push(...copyImages.splice(0, 1));
        if (copyImages.length >= 1) {
          galleryViewArray.push([...copyImages.splice(0, 2)]);
        }
      }
    } else {
      while (copyImages.length > 0) {
        galleryViewArray.push(...copyImages.splice(0, 3));
        if (copyImages.length >= 1) {
          galleryViewArray.push([...copyImages.splice(0, 2)]);
        }
      }
    }

    const offset = isMobileM ? -1 : 4;

    const result = isMobileM ? images.slice(0, offset) : galleryViewArray.slice(0, offset);

    return result;
  }, [category, images, isMobileM, maxItemsCountInGallery]);

  const handleOpen = useCallback(() => {
    openModal('ProductSlider', { images });
  }, [images, openModal]);

  return (
    <div {...restProps} className={cn(styles.photogallery)}>
      <div className={styles.containerImages}>
        <Items className={styles.items} slideIndex={0}>
          {items.map((item, index) => {
            return (
              <div
                className={cn(styles.containerImage, { [styles.firstImage]: index === 0 })}
                key={index}
              >
                {Array.isArray(item) ? (
                  <div className={styles.doubleImg}>
                    <Image
                      className={cn(styles.smallImage, {
                        [styles.verticalView]: category === 'Шкафы',
                      })}
                      src={item[0]?.image}
                    />
                    <Image
                      className={cn(styles.smallImage, {
                        [styles.verticalView]: category === 'Шкафы',
                      })}
                      src={item[1]?.image}
                    />
                  </div>
                ) : (
                  <div>
                    <Image className={styles.image} src={item.image} />
                  </div>
                )}

                {!isMobileM && index === 0 && ar && (
                  <ButtonAr className={styles.buttonAr} ar={ar} />
                )}
              </div>
            );
          })}
        </Items>

        <div className={styles.openGallery}>
          {images.length > maxItemsCountInGallery && (
            <Button className={styles.btnOpenGallery} theme='blank' onClick={handleOpen}>
              Открыть фотогалерею
            </Button>
          )}
        </div>

        {tags.length > 0 && <ProductTags className={styles.tags} tags={tags} />}
        {isMobileM && ar && <ButtonAr className={cn(styles.buttonAr, styles.mobileAr)} ar={ar} />}
      </div>
    </div>
  );
};

export default memo(PhotoGallery);
