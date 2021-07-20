import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import List from '@UI/List';
import styles from './ComfortBuy.module.css';

export interface Advantage {
  img: string;
  description: string;
}

export interface ComfortBuyProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  heading: string;
  items: Advantage[];
}

const ComfortBuy: FC<ComfortBuyProps> = (props) => {
  const { className, heading, items, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.comfortBuy, className)}>
      <h3 className={styles.heading}>{heading}</h3>
      <List
        className={cn(styles.advantagesList, className)}
        items={items}
        renderChild={(item: Advantage) => (
          <div className={styles.advantagesItem}>
            <Image className={styles.advantagesPic} src={item.img} />
            <div className={styles.description}>{item.description}</div>
          </div>
        )}
      />
    </div>
  );
};

export default memo(ComfortBuy);
