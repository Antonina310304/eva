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
import SubscriptionForm from '@Components/SubscriptionForm';
import SocialList from '@Components/SocialList';
import PaymentList from '@Components/PaymentList';
import Link from '@UI/Link/Link';
import FooterNav from '../FooterNav/FooterNav';
import FooterLogo from '../FooterLogo/FooterLogo';
import FooterInfoBlock from '../FooterInfoBlock/FooterInfoBlock';
import styles from './FooterDesktop.module.css';

const FooterDesktop = () => {
  return (
    <>
      <div className={styles.col}>
        <Accordion header={footerNavFeedback.title}>
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
          © ООО «ДИВАН ТРЕЙД», 2013-
          {new Date().getFullYear()}
        </p>
      </div>

      <div className={styles.col}>
        <Accordion header={footerNavBuyers.title}>
          <FooterNav linkList={footerNavBuyers.childrenList} />
        </Accordion>

        <div className={styles.marginTop95}>
          <Link to='/' view='navigation'>
            Политика конфиденциальности
          </Link>
        </div>
      </div>

      <div className={styles.col}>
        <Accordion collapsed header={footerNavCatalog.title}>
          <FooterNav linkList={footerNavCatalog.childrenList} />
        </Accordion>
        <SocialList className={styles.marginTopAuto} />
      </div>

      <div className={styles.col}>
        <div className={styles.wrapperMedium}>
          <Accordion header={footerNavReviews.title}>
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
