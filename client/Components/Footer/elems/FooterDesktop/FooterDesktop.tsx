import { FC, memo } from 'react';
import cn from 'classnames';

import Accordion from '@UI/Accordion/Accordion';
import {
  footerNavCallCenter,
  footerNavDelivery,
  footerNavFeedback,
  footerNavPaySystems,
  footerNavReviews,
  footerNavSubscription,
  footerNavWinner,
} from '@Components/Footer/data';
import SocialList from '@Components/SocialList';
import PaymentList from '@Components/PaymentList';
import Link from '@UI/Link/Link';
import SubscriptionForm from '@Forms/SubscriptionForm';
import { FooterData } from '@Types/Layout';
import FooterNav from '../FooterNav';
import FooterLogo from '../FooterLogo';
import FooterInfoBlock from '../FooterInfoBlock';
import styles from './FooterDesktop.module.css';

export interface FooterDesktopProps {
  footer: FooterData;
}

const FooterDesktop: FC<FooterDesktopProps> = (props) => {
  const { footer } = props;

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
        {footer.toCustomers?.items.length > 0 && (
          <Accordion header={footer.toCustomers.title}>
            <FooterNav items={footer.toCustomers.items} />
          </Accordion>
        )}

        <div className={styles.marginTop95}>
          <Link to='/static-page/privacy-policy' view='secondary'>
            Политика конфиденциальности
          </Link>
        </div>
      </div>

      <div className={styles.col}>
        {footer.catalog?.items.length > 0 && (
          <Accordion defaultCollapsed header={footer.catalog.title}>
            <FooterNav items={footer.catalog.items} />
          </Accordion>
        )}

        {footer.socials?.items.length > 0 && (
          <SocialList className={styles.marginTopAuto} items={footer.socials.items} />
        )}
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
