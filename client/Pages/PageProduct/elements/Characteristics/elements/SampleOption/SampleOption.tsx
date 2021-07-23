import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import Price from '@UI/Price';
import styles from './SampleOption.module.css';

export interface SampleOptionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  icon: string;
  name: string;
  price: number;
}

const SampleOption: FC<SampleOptionProps> = (props) => {
  const { className, icon, name, price, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.option, className)}>
      <Image className={styles.sample} src={icon} />
      <div className={styles.name}>{name}</div>
      <Price price={price} className={styles.price} />
    </div>
  );
};

export default memo(SampleOption);
