import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import Wrapper from '../Wrapper';
import styles from './BankBanner.module.css';

export interface BankBannerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const BankBanner: FC<BankBannerProps> = (props) => {
  const { className, cardPartner, ...restProps } = props;
  const { id, card, name, note, text } = cardPartner;

  return (
    <div {...restProps} className={cn(styles.bankBanner, className)}>
      <div className={cn(styles.color, { [styles.halva]: id === 'halva' })}>
        <Wrapper>
          <div className={styles.container}>
            <div className={styles.left}>
              <Image className={styles.logo} src={card} />
            </div>

            <div className={styles.right}>
              <div className={styles.title}>{name}</div>
              <div className={styles.text}>{text}</div>
              <div className={styles.nuance}>{note}</div>
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default memo(BankBanner);
