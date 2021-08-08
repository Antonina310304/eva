import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import List from '@UI/List';
import advantages from './advantages';
import styles from './ComfortBuy.module.css';

export interface Advantage {
  img: string;
  description: string;
}

export interface ComfortBuyProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const ComfortBuy: FC<ComfortBuyProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.comfortBuy, className)}>
      <h3 className={styles.heading}>Покупайте с комфортом на Диван.ру</h3>
      <List
        className={cn(styles.advantagesList, className)}
        items={advantages}
        renderChild={(advantage: Advantage) => (
          <div className={styles.advantagesItem}>
            <Image className={styles.advantagesPic} src={advantage.img} />
            <div className={styles.description}>{advantage.description}</div>
          </div>
        )}
      />
    </div>
  );
};

export default memo(ComfortBuy);
