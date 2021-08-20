import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Header from '@Components/Header';

import MainComponent from '@Components/MainComponent';
import Footer from '@Components/Footer';

import {
  mockBreadcrumbsItems,
  mockSocialList,
  footerNavFeedback,
  footerNavCallCenter,
  footerNavDelivery,
  footerNavSubscription,
  footerNavBuyers,
  footerNavCatalog,
  footerNavReviews,
  footerNavWinner,
  footerNavPaySystems,
  mockPaymentSystemList,
} from '@Pages/PageIndex/mocks';
import styles from './PageIndex.module.css';

export interface PageIndexProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const PageIndex: FC<PageIndexProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.pageIndex, [className])}>
      <Header />
      <MainComponent breadcrumbs={mockBreadcrumbsItems} />
      <Footer
        socialList={mockSocialList}
        paymentSystemList={mockPaymentSystemList}
        footerNavFeedback={footerNavFeedback}
        footerNavCallCenter={footerNavCallCenter}
        footerNavDelivery={footerNavDelivery}
        footerNavSubscription={footerNavSubscription}
        footerNavBuyers={footerNavBuyers}
        footerNavCatalog={footerNavCatalog}
        footerNavReviews={footerNavReviews}
        footerNavWinner={footerNavWinner}
        footerNavPaySystems={footerNavPaySystems}
      />
    </div>
  );
};

export default memo(PageIndex);
