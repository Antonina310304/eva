import React, { memo } from 'react';

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
import FooterLogo from '@Components/Footer/elems/FooterLogo/FooterLogo';
import FooterInfoBlock from '@Components/Footer/elems/FooterInfoBlock/FooterInfoBlock';
import SubscriptionForm from '@Components/SubscriptionForm';
import cn from 'classnames';
import SocialList from '@Components/SocialList';
import PaymentList from '@Components/PaymentList';
import FooterTitleNav from '@Components/Footer/elems/FooterTitileNav/FooterTitleNav';
import styles from './FooterDesktop.module.css';

const FooterDesktop = () => {
  return (
    <>
      <div className={styles.col}>
        <Accordion header={<FooterTitleNav title={footerNavFeedback.title} />}>
          <FooterNav linkList={footerNavFeedback.childrenList} />
        </Accordion>

        <div className={styles.marginTopAuto}>
          <FooterLogo />
        </div>
      </div>

      <div className={styles.col}>
        <div className={styles.wrapperMedium}>
          <FooterInfoBlock title={footerNavCallCenter.title}>
            <FooterNav linkList={footerNavCallCenter.childrenList} />
          </FooterInfoBlock>
        </div>

        <div className={styles.wrapperBig}>
          <FooterInfoBlock title={footerNavDelivery.title}>
            <FooterNav linkList={footerNavDelivery.childrenList} />
          </FooterInfoBlock>
        </div>
        <FooterInfoBlock title={footerNavSubscription.title}>
          <div className={styles.footerSubscription}>
            <SubscriptionForm />
          </div>
        </FooterInfoBlock>
        <p className={cn(styles.marginTopAuto, styles.footerText)}>
          © ООО «ДИВАН ТРЕЙД», 2013-2021
        </p>
      </div>

      <div className={styles.col}>
        <Accordion collapsed header={<FooterTitleNav title={footerNavBuyers.title} />}>
          <FooterNav linkList={footerNavBuyers.childrenList} />
        </Accordion>

        <p className={cn(styles.footerText, styles.marginTop95)}>Политика конфиденциальности</p>
      </div>

      <div className={styles.col}>
        <Accordion collapsed header={<FooterTitleNav title={footerNavCatalog.title} />}>
          <FooterNav linkList={footerNavCatalog.childrenList} />
        </Accordion>
        <SocialList className={styles.marginTopAuto} />
      </div>

      <div className={styles.col}>
        <div className={styles.wrapperMedium}>
          <Accordion header={<FooterTitleNav title={footerNavReviews.title} />}>
            <FooterNav linkList={footerNavReviews.childrenList} />
          </Accordion>
        </div>
        <div className={styles.wrapperBig}>
          <FooterInfoBlock title={footerNavWinner.title} className={styles.footerMiddleWrapper}>
            <FooterNav linkList={footerNavWinner.childrenList} />
          </FooterInfoBlock>
        </div>
        <div>
          <FooterInfoBlock title={footerNavPaySystems.title} className={styles.footerMiddleWrapper}>
            <PaymentList />
          </FooterInfoBlock>
        </div>
        <p className={cn(styles.marginTopAuto, styles.madeIn)}>Сделано в Супрематике</p>
      </div>
    </>
  );
};

export default memo(FooterDesktop);
