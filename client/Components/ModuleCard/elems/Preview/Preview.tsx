import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import Link from '@UI/Link';
import { ProductData } from '@Types/Product';
import styles from './Preview.module.css';

export interface PreviewProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  product?: ProductData;
  onChangeSlide?: (slide: number) => void;
}

const Preview: FC<PreviewProps> = (props) => {
  const { className, product, ...restProps } = props;
  const images = product.images || [];
  const [firstImage] = images;

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
          <Image className={styles.image} src={firstImage.src} />
        </div>
      </Link>
    </div>
  );
};

export default memo(Preview);
