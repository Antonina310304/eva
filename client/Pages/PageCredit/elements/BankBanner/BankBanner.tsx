import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Image from '@UI/Image';
import useMedias from '@Hooks/useMedias';
import ServicePageWrapper from '@Components/ServicePageWrapper';
import { Partner } from '../../typings';
import styles from './BankBanner.module.css';

export interface BankBannerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  cardPartner: Partner;
}

const BankBanner: FC<BankBannerProps> = (props) => {
  const { className, cardPartner, ...restProps } = props;
  const { id, card, name, note, text } = cardPartner;
  const { isDesktopM } = useMedias();

  return (
    <div {...restProps} className={cn(styles.bankBanner, className)}>
      <div
        className={cn(styles.color, {
          [styles.halva]: id === 'halva',
          [styles.smart]: id === 'smart',
          [styles.cherepaha]: id === 'cherepaha',
          [styles.pokupok]: id === 'pokupok',
          [styles.fun]: id === 'fun',
          [styles.funPlatinum]: id === 'fun-platinum',
          [styles.magnit]: id === 'magnit',
          [styles.priorbank]: id === 'priorbank',
        })}
      >
        <ServicePageWrapper className={cn({ [styles.wrapper]: !isDesktopM })}>
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
        </ServicePageWrapper>
      </div>
    </div>
  );
};

export default memo(BankBanner);
