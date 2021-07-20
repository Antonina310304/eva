import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './ComfortBuy.module.css';

export interface Advantages {
  img: string;
  description: string;
}

export interface ComfortBuyProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  heading: string;
  advantages: Advantages[];
}

const ComfortBuy: FC<ComfortBuyProps> = (props) => {
  const { className, heading, advantages, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.comfortBuy, className)}>
      <h3 className={styles.heading}>{heading}</h3>
      <ul className={styles.advantagesList}>
        {advantages.map((item, index) => (
          <li className={styles.advantagesItem} key={index}>
            <img className={styles.advantagesPic} src={item.img} />
            <div className={styles.description}>{item.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(ComfortBuy);
