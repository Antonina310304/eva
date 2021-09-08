import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import styles from './Advantages.module.css';

export interface AdvantagesItem {
  src: string;
  text: string;
}

export interface AdvantagesProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  advantages: AdvantagesItem[];
  text: string[];
}

const Advantages: FC<AdvantagesProps> = (props) => {
  const { className, advantages, text, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.wrapper, className)}>
      <div className={styles.contentWrapper}>
        <div className={styles.advantagesList}>
          {advantages.map((item, index) => (
            <div className={styles.advantagesItem} key={index}>
              <div className={styles.picWrapper}>
                <Image className={styles.pic} src={item.src} />
              </div>
              <div className={styles.advantage}>{item.text}</div>
            </div>
          ))}
        </div>
        <div className={styles.introduction}>
          {text.map((item, index: number) => (
            <div className={styles.text} key={index}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Advantages);
