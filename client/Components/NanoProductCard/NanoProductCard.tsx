import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { ProductData } from '@Types/Product';
import Preview from './elements/Preview';
import styles from './NanoProductCard.module.css';

export interface NanoProductCardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  product: ProductData;
}

const NanoProductCard: FC<NanoProductCardProps> = (props) => {
  const { className, product, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.card, className)}>
      <Preview className={styles.preview} product={product} />
    </div>
  );
};

export default memo(NanoProductCard);
