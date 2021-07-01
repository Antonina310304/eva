import React, { FC, HTMLAttributes, memo, useMemo, ReactElement } from 'react';
import cn from 'classnames';

import useMedias from '@Hooks/useMedias';
import ProductTags from '@Components/ProductTags';
import Image from '@UI/Image';
import Gallery from '@UI/Gallery';
import { ProductTagData } from '@Types/Product';
import styles from './PhotoGallery.module.css';

export interface MediaGalleryItem {
  image: string;
}

export interface PhotoGalleryProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  images: MediaGalleryItem[];
  tags?: ProductTagData[];
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
  const { className, images = [], tags = [], ...restProps } = props;
  const { isMobileM } = useMedias();
  const items = useMemo(() => {
    const offset = isMobileM ? -1 : 3;

    return images.slice(0, offset);
  }, [images, isMobileM]);

  return (
    <div {...restProps} className={cn(styles.photogallery)}>
      <div className={styles.containerImages}>
        <Items className={styles.items} slideIndex={0}>
          {items.map((item, index) => {
            return (
              <div className={styles.containerImage} key={index}>
                <Image className={styles.image} src={item.image} />
              </div>
            );
          })}
        </Items>

        {tags.length > 0 && <ProductTags className={styles.tags} tags={tags} />}
      </div>
    </div>
  );
};

export default memo(PhotoGallery);
