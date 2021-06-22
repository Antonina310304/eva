import React, { FC, HTMLAttributes, Fragment, memo } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import List from '@UI/List';
import styles from './ImageAreas.module.css';

export interface ImageData {
  src?: string;
}

export interface ImageAreasProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  images?: ImageData[];
}

const ImageAreas: FC<ImageAreasProps> = (props) => {
  const { className, images, ...restProps } = props;
  const widthItem = Number((100 / images.length).toFixed(5));

  return (
    <List
      {...restProps}
      className={cn(styles.images, className)}
      items={images}
      renderChild={(image: ImageData, index) => (
        <Fragment key={index}>
          <div
            className={styles.item}
            style={{ width: `${widthItem}%`, left: `${widthItem * index}%` }}
          >
            <div className={styles.indicator} />
          </div>
          <Image className={styles.image} src={image.src} />
        </Fragment>
      )}
    />
  );
};

export default memo(ImageAreas);
