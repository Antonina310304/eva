import React, { FC, HTMLAttributes, memo } from 'react';

import ServicePageTitle from '@Components/ServicePageTitle';
import TopProducts from './elems/TopProducts';
import styles from './PagePromotionDiscounts.module.css';

export interface PagePromotionsDiscountsProps extends HTMLAttributes<HTMLDivElement> {
  page: any;
}

const PagePromotionsDiscounts: FC<PagePromotionsDiscountsProps> = (props) => {
  const { page, ...restProps } = props;

  return (
    <div {...restProps}>
      <ServicePageTitle className={styles.title} title={page.title} />

      <TopProducts title='Топ 10 из Divan.Trends' products={page.products} />
    </div>
  );
};

export default memo(PagePromotionsDiscounts);
