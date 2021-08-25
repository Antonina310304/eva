import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { MetaData } from '@Types/Meta';
import InformationTabsNavigation from '@Components/InformationTabsNavigation';
import styles from './PagePaymentRus.module.css';
import PaymentOptions from './elements/PaymentOptions';

export interface PagePaymentRusProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: any;
  meta: MetaData;
}

const PagePaymentRus: FC<PagePaymentRusProps> = (props) => {
  const { className, page, meta, ...restProps } = props;
  const { teaserText, title, pageMenu, paymentTypes, finalText } = page;

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <h1 className={styles.heading}>{title}</h1>
      <div className={styles.wrapper}>
        <InformationTabsNavigation className={styles.navigation} navigation={pageMenu} />
        <div className={styles.introduction}>{teaserText}</div>
        <PaymentOptions paymentTypes={paymentTypes} />
        <div className={styles.info}>
          <img className={styles.infoPic} src='/react/static/paymentRus/info.svg' />
          <div className={styles.infoDescription}>{finalText}</div>
        </div>
      </div>
    </div>
  );
};

export default memo(PagePaymentRus);
