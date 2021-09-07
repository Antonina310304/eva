import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import { CartProductData } from '@Types/Cart';
import styles from './Preview.module.css';

export interface PreviewProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  product?: CartProductData;
}

const Preview: FC<PreviewProps> = (props) => {
  const { className, product, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.preview, className)}>
      <div className={styles.content}>
        <Image className={styles.image} src={product.image} />
      </div>
    </div>
  );
};

export default memo(Preview);
