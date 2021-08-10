import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Breadcrumbs from '@UI/Breadcrumbs';
import SectionMenu from '@Components/SectionMenu';
import ShippingCostCalculator from '@Components/ShippingCostCalculator';
import { MetaData } from '@Types/Meta';
import styles from './PageDelivery.module.css';

export interface PageDeliveryProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: any;
  meta: MetaData;
}

const PageDelivery: FC<PageDeliveryProps> = (props) => {
  const { className, page, ...restProps } = props;
  const { breadcrumbs, title, pageMenu } = page;

  return (
    <div {...restProps} className={cn(styles.page, [className])}>
      <div className={styles.mainContainer}>
        <div className={styles.wrapperTop}>
          <Breadcrumbs breadcrumbs={breadcrumbs} className={styles.breadcrumbs} />
          <div className={styles.title}>{title}</div>
        </div>
        <SectionMenu className={styles.menu} items={pageMenu} />
      </div>
      <div className={styles.contentContainer}>
        <ShippingCostCalculator className={styles.calculator} />
      </div>
    </div>
  );
};

export default memo(PageDelivery);
