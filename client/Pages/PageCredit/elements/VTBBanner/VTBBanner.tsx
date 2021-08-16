import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import Wrapper from '../Wrapper';
import { Banner } from '../../typings';
import styles from './VTBBanner.module.css';

export interface VTBBannerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  banners: Banner[];
}

const VTBBanner: FC<VTBBannerProps> = (props) => {
  const { className, banners, ...restProps } = props;
  const { conditions, anchorSrc, note, list } = banners[0]; // TODO от бэка приходит anchor_src переделать в anchorSrc

  return (
    <div {...restProps} className={cn(styles.VTBBanner, className)}>
      <div className={styles.color}>
        <Wrapper>
          <div className={styles.container}>
            <div className={styles.left}>
              <Image className={styles.logo} src={anchorSrc} />
              <ul className={styles.list}>
                {list.map((item, index) => (
                  <li className={styles.listItem} key={index}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.right}>
              <div className={styles.digitsWrapper}>
                {conditions.map((item, index) => (
                  <div className={styles.item} key={index}>
                    <div className={styles.digit}>{item.digit}</div>
                    <div
                      className={cn(styles.symbol, {
                        [styles.rur]: item.symbol === 'rur',
                      })}
                    >
                      {item.symbol === 'rur' ? '' : item.symbol}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.nuance}>{note}</div>
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default memo(VTBBanner);
