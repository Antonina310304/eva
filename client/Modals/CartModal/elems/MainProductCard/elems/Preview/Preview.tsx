import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import Link from '@UI/Link';
import { CartProductData } from '@Types/Cart';
import styles from './Preview.module.css';

export interface PreviewProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  product?: CartProductData;
  onChangeSlide?: (slide: number) => void;
}

const Preview: FC<PreviewProps> = (props) => {
  const { className, product, onChangeSlide, ...restProps } = props;

  return (
    <div
      {...restProps}
      className={cn(
        styles.preview,
        {
          [styles.landscape]: true,
        },
        className,
      )}
    >
      <Link to={product.link} aria-label={product.name}>
        <div className={styles.content}>
          <Image className={styles.image} src={product.image} />
        </div>
      </Link>
    </div>
  );
};

export default memo(Preview);
