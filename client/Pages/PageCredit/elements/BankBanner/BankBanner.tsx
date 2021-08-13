import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import Wrapper from '../Wrapper';
import styles from './BankBanner.module.css';

export interface BankBannerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const BankBanner: FC<BankBannerProps> = (props) => {
  const { className, banners, ...restProps } = props;
  const { conditions, logo, note, text, id } = banners[0];

  return (
    <div {...restProps} className={cn(styles.bankBanner, className)}>
      <div className={styles.color}>
        <Wrapper>
          <div className={styles.container}>
            <div className={styles.left}>
              <Image className={styles.logo} src={logo} />
              <div className={styles.text}>{text}</div>
              <div className={styles.nuance}>{`*${note}`}</div>
            </div>

            <div className={styles.right}>
              {conditions.map((item, index) => (
                <div className={styles.item} key={index}>
                  <div className={styles.digit}>{item.digit}</div>
                  <div className={cn(styles.symbol, { [styles.rur]: item.symbol === 'rur' })}>
                    {item.symbol === 'rur' ? '' : item.symbol}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default memo(BankBanner);
