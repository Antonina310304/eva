import React, { memo } from 'react';
import cn from 'classnames';
import Accordion from '@UI/Accordion/Accordion';

import {
  footerNavBuyers,
  footerNavCallCenter,
  footerNavCatalog,
  footerNavDelivery,
  footerNavFeedback,
  footerNavPaySystems,
  footerNavReviews,
  footerNavSubscription,
  footerNavWinner,
} from '@Components/Footer/data';

import FooterNav from '@Components/Footer/elems/FooterNav/FooterNav';
import FooterInfoBlock from '@Components/Footer/elems/FooterInfoBlock/FooterInfoBlock';
import SubscriptionForm from '@Components/SubscriptionForm';
import PaymentList from '@Components/PaymentList';
import FooterLogo from '@Components/Footer/elems/FooterLogo/FooterLogo';
import SocialList from '@Components/SocialList';
import FooterTitleNav from '@Components/Footer/elems/FooterTitileNav/FooterTitleNav';
import Link from '@UI/Link/Link';
import styles from './FooterMobile.module.css';

const FooterMobile = () => {
  return (
    <>
      <div className={styles.col}>
        <div className={cn(styles.wrapperMedium, styles.wrapperBigMobileM)}>
          <Accordion header={footerNavFeedback.title}>
            <FooterNav linkList={footerNavFeedback.childrenList} />
          </Accordion>
        </div>
        <div className={styles.wrapperBig}>
          <div className={styles.wrapperMedium}>
            <FooterInfoBlock title={footerNavCallCenter.title}>
              <FooterNav linkList={footerNavCallCenter.childrenList} />
            </FooterInfoBlock>
          </div>
          <div>
            <FooterInfoBlock title={footerNavDelivery.title}>
              <FooterNav linkList={footerNavDelivery.childrenList} />
            </FooterInfoBlock>
          </div>
        </div>
        <div className={styles.wrapperBig}>
          <FooterInfoBlock title={footerNavSubscription.title}>
            <div className={styles.footerSubscription}>
              <SubscriptionForm />
            </div>
          </FooterInfoBlock>
        </div>
        <div className={styles.wrapperRegular}>
          <Accordion header={footerNavBuyers.title}>
            <FooterNav linkList={footerNavBuyers.childrenList} />
          </Accordion>
        </div>
      </div>

      <div style={{ flex: 0 }} className={styles.col}>
        <div className={cn(styles.wrapperRegular, styles.wrapperLargeMobileM)}>
          <Accordion header={footerNavCatalog.title}>
            <FooterNav linkList={footerNavCatalog.childrenList} />
          </Accordion>
        </div>
        <div className={cn(styles.wrapperMedium, styles.wrapperLargeMobileM)}>
          <Accordion header={footerNavReviews.title}>
            <FooterNav linkList={footerNavReviews.childrenList} />
          </Accordion>
        </div>
        <div className={styles.wrapperBig}>
          <FooterInfoBlock title={footerNavWinner.title}>
            <FooterNav linkList={footerNavWinner.childrenList} />
          </FooterInfoBlock>
        </div>
        <div className={styles.wrapperBig}>
          <FooterInfoBlock title={footerNavPaySystems.title}>
            <PaymentList />
          </FooterInfoBlock>
        </div>
        <div className={styles.footerBox}>
          <div className={styles.wrapperMedium}>
            <FooterLogo />
          </div>
          <p className={cn(styles.wrapperSmall, styles.footerText)}>
            ?? ?????? ???????????? ????????????, 2013-
            {new Date().getFullYear()}
          </p>

          <div className={styles.wrapperMedium}>
            <Link to='/' view='navigation'>
              ???????????????? ????????????????????????????????????
            </Link>
          </div>

          <SocialList className={styles.wrapperMedium} />

          <p className={styles.madeIn}>?????????????? ?? ??????????????????????</p>
        </div>
      </div>
    </>
  );
};

export default memo(FooterMobile);
