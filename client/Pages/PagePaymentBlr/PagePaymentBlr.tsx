import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { MetaData } from '@Types/Meta';
import InformationTabsNavigation from '@Components/InformationTabsNavigation';
import styles from './PagePaymentBlr.module.css';

export interface PagePaymentBlrProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: any;
  meta: MetaData;
}

const PagePaymentBlr: FC<PagePaymentBlrProps> = (props) => {
  const { className, page, meta, ...restProps } = props;
  const { title, teaserText, pageMenu, paymentTypes } = page;

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <h1 className={styles.heading}>{title}</h1>
      <div className={styles.wrapper}>
        <InformationTabsNavigation className={styles.navigation} navigation={pageMenu} />
        <div className={styles.introduction}>{teaserText}</div>
        <ul className={styles.list}>
          {(paymentTypes as any[]).map((item, index) => (
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
      </div>
    </div>
  );
};

export default memo(PagePaymentBlr);
