import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import List from '@UI/List';
import styles from './MainImageGrid.module.css';

export interface MediaGalleryItem {
  image: string;
}

export interface MainImageGridProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  images: MediaGalleryItem[];
}

const MainImageGrid: FC<MainImageGridProps> = (props) => {
  const { className, images = [], ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.grid)}>
      <List
        className={styles.list}
        items={images.slice(0, 3)}
        renderChild={(galleryItem: MediaGalleryItem) => (
          <Image className={styles.image} src={galleryItem.image} />
        )}
      />
    </div>
  );
};

export default memo(MainImageGrid);
