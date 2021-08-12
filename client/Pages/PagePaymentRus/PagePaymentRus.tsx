import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { MetaData } from '@Types/Meta';
import Link from '@UI/Link';
import styles from './PagePaymentRus.module.css';
import PaymentOptions from './elements/PaymentOptions';
import Anchors from './elements/Anchors';

export interface PagePaymentRusProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: any;
  meta: MetaData;
}

export interface Item {
  text: string;
  link: string;
}

const PagePaymentRus: FC<PagePaymentRusProps> = (props) => {
  const { className, page, meta, ...restProps } = props;
  const { teaserText, title, pageMenu, finalText } = page;

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <h1 className={styles.heading}>{title}</h1>
      <div className={styles.wrapper}>
        <Anchors anchors={pageMenu} />
        <div className={styles.introduction}>{teaserText}</div>
        <PaymentOptions />
        <div className={styles.info}>
          <img className={styles.infoPic} src='/react/static/paymentRus/info.svg' />
          <div className={styles.infoDescription}>{finalText}</div>
        </div>
      </div>
    </div>
  );
};

export default memo(PagePaymentRus);
