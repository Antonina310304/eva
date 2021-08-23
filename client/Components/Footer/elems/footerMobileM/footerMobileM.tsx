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
import FooterInfoBlock from '@Components/Footer/elems/FooterInfoBlock/FooterInfoBlock';
import FooterLogo from '@Components/Footer/elems/FooterLogo/FooterLogo';
import SubscriptionForm from '@Components/SubscriptionForm';
import cn from 'classnames';
import SocialList from '@Components/SocialList';
import PaymentList from '@Components/PaymentList';
import FooterTitleNav from '@Components/Footer/elems/FooterTitileNav';
import Link from '@UI/Link';
import styles from './footerMobileM.module.css';

const FooterMobileM = () => {
  return (
    <>
      <div className={styles.col}>
        <div className={styles.wrapperBig}>
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

        <div className={styles.marginTopAuto}>
          <div className={styles.wrapperMedium}>
            <FooterLogo />
          </div>
          <p className={styles.footerText}>
            © ООО «ДИВАН ТРЕЙД», 2013-
            {new Date().getFullYear()}
          </p>
        </div>
      </div>

      <div className={styles.col}>
        <div className={styles.wrapperBig}>
          <FooterInfoBlock title={footerNavSubscription.title}>
            <div className={styles.footerSubscription}>
              <SubscriptionForm />
            </div>
          </FooterInfoBlock>
        </div>
        <Accordion header={footerNavBuyers.title}>
          <FooterNav linkList={footerNavBuyers.childrenList} />
        </Accordion>

        <div className={styles.marginTopAuto}>
          <div className={styles.wrapperMedium}>
            <Link to='/' view='navigation'>
              Политика конфиденциальности
            </Link>
          </div>
          <SocialList />
        </div>
      </div>

      <div className={styles.col}>
        <div className={styles.wrapperBig}>
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
          <FooterInfoBlock title={footerNavWinner.title} className={styles.footerMiddleWrapper}>
            <FooterNav linkList={footerNavWinner.childrenList} />
          </FooterInfoBlock>
        </div>
        <FooterInfoBlock title={footerNavPaySystems.title}>
          <PaymentList />
        </FooterInfoBlock>
        <p className={styles.madeIn}>Сделано в Супрематике</p>
      </div>
    </>
  );
};

export default memo(FooterMobileM);
