import React, { FC, memo } from 'react';
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
import PaymentList from '@Components/PaymentList';
import SocialList from '@Components/SocialList';
import Link from '@UI/Link/Link';
import SubscriptionForm from '@Forms/SubscriptionForm';
import FooterNav from '../FooterNav/FooterNav';
import FooterInfoBlock from '../FooterInfoBlock/FooterInfoBlock';
import FooterLogo from '../FooterLogo/FooterLogo';
import styles from './FooterMobile.module.css';

const FooterMobile: FC = () => {
  return (
    <>
      <div className={styles.col}>
        <div className={styles.wrapperMedium}>
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
        <div className={styles.wrapperRegular}>
          <Accordion header={footerNavCatalog.title}>
            <FooterNav linkList={footerNavCatalog.childrenList} />
          </Accordion>
        </div>
        <div className={styles.wrapperMedium}>
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
            © ООО «ДИВАН ТРЕЙД», 2013-
            {new Date().getFullYear()}
          </p>

          <div className={styles.wrapperMedium}>
            <Link to='/static-page/privacy-policy' view='secondary'>
              Политика конфиденциальности
            </Link>
          </div>

          <SocialList className={styles.wrapperMedium} />

          <p className={styles.madeIn}>Сделано в Супрематике</p>
        </div>
      </div>
    </>
  );
};

export default memo(FooterMobile);
