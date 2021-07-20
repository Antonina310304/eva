import React, { FC, HTMLAttributes, memo, useMemo, useCallback, ReactElement } from 'react';
import cn from 'classnames';

import useMedias from '@Hooks/useMedias';
import ProductTags from '@Components/ProductTags';
import Image from '@UI/Image';
import Gallery from '@UI/Gallery';
import Button from '@UI/Button';
import { ProductTagData } from '@Types/Product';
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
    <Gallery {...restProps} slideIndex={slideIndex} onChangeCurrent={onChange}>
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

  const items = useMemo(() => {
    const arr = [];
    const arr2 = [...images];
    let cut;

    if (category === 'Диваны и кресла') {
      while (arr2.length > 0) {
        arr.push(...arr2.splice(0, 3));
        if (arr2.length >= 1) {
          arr.push([...arr2.splice(0, 2)]);
        }
      }
      cut = 4;
    } else if (category === 'Шкафы') {
      while (arr2.length > 0) {
        arr.push(...arr2.splice(0, 1));
        if (arr2.length >= 1) {
          arr.push([...arr2.splice(0, 2)]);
        }
      }
      cut = 5;
    }

    const offset = isMobileM ? -1 : cut;

    const result = isMobileM ? images.slice(0, offset) : arr.slice(0, offset);
    console.log('result', result);

    return result;
  }, [category, images, isMobileM]);

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
                    <Image className={styles.smallImage} src={item[0]?.image} />
                    <Image className={styles.smallImage} src={item[1]?.image} />
                  </div>
                ) : (
                  <div>
                    <Image className={styles.image} src={item.image} />
                    {/* {index === 0 && ar && <ButtonAr className={styles.buttonAr} ar={ar} />} */}
                  </div>
                )}

                {index === 0 && ar && <ButtonAr className={styles.buttonAr} ar={ar} />}
              </div>
            );
          })}
        </Items>

        <div className={styles.openGallery}>
          {images.length > 4 && (
            <Button className={styles.btnOpenGallery} theme='blank' onClick={handleOpen}>
              !!!! no!!!! wrong count Открыть фотогалерею
            </Button>
          )}
        </div>

        {tags.length > 0 && <ProductTags className={styles.tags} tags={tags} />}
      </div>
    </div>
  );
};

export default memo(PhotoGallery);
