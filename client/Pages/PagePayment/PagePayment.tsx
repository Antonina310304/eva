import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import InformationTabsNavigation from '@Components/InformationTabsNavigation';
import { PagePaymentData } from './typings';
import styles from './PagePayment.module.css';

export interface PagePaymentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: PagePaymentData;
}

const PagePayment: FC<PagePaymentProps> = (props) => {
  const { className, page, ...restProps } = props;
  const { title, teaserText, pageMenu, paymentTypes, finalText } = page;

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <h1 className={styles.heading}>{title}</h1>
      <div className={styles.wrapper}>
        <InformationTabsNavigation className={styles.navigation} navigation={pageMenu} />

        <div className={styles.introduction}>{teaserText}</div>

        <ul className={styles.list}>
          {paymentTypes.map((item, index) => (
            <li className={styles.item} key={index}>
              <div className={styles.headingWrapper}>
                <img className={styles.paymentImage} src={`/react/static${item.icon}`} />
                <h3 className={styles.paymentHeading}>{item.name}</h3>
              </div>
              <div
                className={styles.paymentDescription}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: `${item.description}` }}
              />
            </li>
          ))}
        </ul>

        {finalText && (
          <div className={styles.info}>
            <img className={styles.infoPic} src='/react/static/payment/info.svg' />
            <div className={styles.infoDescription}>{finalText}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(PagePayment);
