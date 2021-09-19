/* eslint-disable autofix/no-unused-vars */
import React, { FC, HTMLAttributes, memo } from 'react';

import ServicePageTitle from '@Components/ServicePageTitle';
import styles from './PagePromotionDiscounts.module.css';

export interface PagePromotionsDiscountsProps extends HTMLAttributes<HTMLDivElement> {
  page: any;
}

const PagePromotionsDiscounts: FC<PagePromotionsDiscountsProps> = (props) => {
  const { page, ...restProps } = props;

  return (
    <div {...restProps}>
      <ServicePageTitle className={styles.title} title={page.title} />
    </div>
  );
};

export default memo(PagePromotionsDiscounts);
