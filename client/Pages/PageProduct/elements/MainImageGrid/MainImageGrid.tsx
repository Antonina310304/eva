import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import List from '@UI/List';
import { ProductTagData } from '@Types/Product';
import styles from './MainImageGrid.module.css';

export interface MediaGalleryItem {
  image: string;
}

export interface MainImageGridProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  images: MediaGalleryItem[];
  tags?: ProductTagData[];
}

const MainImageGrid: FC<MainImageGridProps> = (props) => {
  const { className, images = [], tags = [], ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.grid)}>
      <List
        className={styles.list}
        items={images.slice(0, 3)}
        renderChild={(galleryItem: MediaGalleryItem, index) => {
          const firstImage = index === 0;

          return firstImage ? (
            <div className={styles.containerImage}>
              <Image className={styles.image} src={galleryItem.image} />

              {tags.length > 0 && (
                <List
                  className={styles.tags}
                  items={tags}
                  renderChild={(tag: ProductTagData) => (
                    <Image className={styles.tag} src={tag.image.src} />
                  )}
                />
              )}
            </div>
          ) : (
            <Image className={styles.image} src={galleryItem.image} />
          );
        }}
      />
    </div>
  );
};

export default memo(MainImageGrid);
