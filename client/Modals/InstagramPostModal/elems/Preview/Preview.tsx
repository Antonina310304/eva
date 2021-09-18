import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import ImageComponent from '@UI/Image';
import Link from '@UI/Link';
import { InstagramProductData } from '@Modals/InstagramPostModal';
import styles from './Preview.module.css';

export interface PreviewProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  product?: InstagramProductData;
}

const Preview: FC<PreviewProps> = (props) => {
  const { className, product, ...restProps } = props;

  const firstImage = {
    src: product.img,
    orientation: '',
  };

  const orientation = new Image();
  orientation.onload = () => {
    if (orientation.height > orientation.width) {
      firstImage.orientation = 'portrait';
    } else {
      firstImage.orientation = 'landscape';
    }
  };
  orientation.src = firstImage.src;

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
    >
      <Link to={product.link} aria-label={product.name}>
        <div className={styles.content}>
          <ImageComponent className={styles.image} src={firstImage.src} />
        </div>
      </Link>
    </div>
  );
};

export default memo(Preview);
