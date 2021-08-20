import React, { FC, memo, HTMLAttributes } from 'react';

import FooterTop from '@Components/FooterTop';

import { IconData, IconPaymentData } from '@Types/IconSocial';

import { FooterNavData } from '@Types/SiteNavigationData';
import Container from '@Components/Container';
import useMediaQuery from '@Hooks/useMediaQuery';
import Accordion from '@UI/Accordion/Accordion';
import FooterNav from '@Components/FooterNav/FooterNav';
import FooterInfoBlock from '@Components/FooterInfoBlock/FooterInfoBlock';
import SubscriptionForm from '@Components/SubscriptionForm';
import cn from 'classnames';
import FooterLogo from '@Components/FooterLogo/FooterLogo';
import SocialList from '@Components/SocialList';
import PaymentList from '@Components/PaymentList';
import styles from './Footer.module.css';

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  socialList: IconData[];
  footerNavFeedback: FooterNavData;
  footerNavCallCenter: FooterNavData;
  footerNavDelivery: FooterNavData;
  footerNavSubscription: FooterNavData;
  footerNavBuyers: FooterNavData;
  footerNavCatalog: FooterNavData;
  footerNavReviews: FooterNavData;
  footerNavWinner: FooterNavData;
  footerNavPaySystems: FooterNavData;
  paymentSystemList: IconPaymentData[];
}

const Footer: FC<FooterProps> = ({
  socialList,
  paymentSystemList,
  footerNavFeedback,
  footerNavCallCenter,
  footerNavBuyers,
  footerNavCatalog,
  footerNavDelivery,
  footerNavPaySystems,
  footerNavReviews,
  footerNavSubscription,
  footerNavWinner,
}) => {
  const mediaQuery = {
    isDesktop: useMediaQuery('(min-width: 1279px)'),
    isMobileM: useMediaQuery('(min-width: 768px) and (max-width: 1278px)'),
    isMobile: useMediaQuery('(max-width: 767px)'),
  };

  function onSuccess() {
    return false;
  }

  function onCancel() {
    return false;
  }

  function footerDesktop() {
    // от 1279 5 колонок
    return (
      <>
        <div className={styles.col}>
          <Accordion title={footerNavFeedback.title}>
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
              <SubscriptionForm onSuccess={onSuccess} onCancel={onCancel} />
            </div>
          </FooterInfoBlock>
          <p className={cn(styles.marginTopAuto, styles.footerText)}>
            © ООО «ДИВАН ТРЕЙД», 2013-2021
          </p>
        </div>

        <div className={styles.col}>
          <Accordion collapsed title={footerNavBuyers.title}>
            <FooterNav linkList={footerNavBuyers.childrenList} />
          </Accordion>

          <p className={cn(styles.footerText, styles.marginTop95)}>Политика конфиденциальности</p>
        </div>

        <div className={styles.col}>
          <Accordion collapsed title={footerNavCatalog.title}>
            <FooterNav linkList={footerNavCatalog.childrenList} />
          </Accordion>
          <SocialList list={socialList} className={styles.marginTopAuto} />
        </div>

        <div className={styles.col}>
          <div className={styles.wrapperMedium}>
            <Accordion title={footerNavReviews.title}>
              <FooterNav linkList={footerNavReviews.childrenList} />
            </Accordion>
          </div>
          <div className={styles.wrapperBig}>
            <FooterInfoBlock title={footerNavWinner.title} className={styles.footerMiddleWrapper}>
              <FooterNav linkList={footerNavWinner.childrenList} />
            </FooterInfoBlock>
          </div>
          <div>
            <FooterInfoBlock
              title={footerNavPaySystems.title}
              className={styles.footerMiddleWrapper}
            >
              <PaymentList list={paymentSystemList} className={styles.footerSocial} />
            </FooterInfoBlock>
          </div>
          <p className={cn(styles.marginTopAuto, styles.madeIn)}>Сделано в Супрематике</p>
        </div>
      </>
    );
  }

  function footerMobileM() {
    // до 1278 3 колонки
    return (
      <>
        <div className={styles.col}>
          <div className={styles.wrapperBig}>
            <Accordion title={footerNavFeedback.title}>
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
            <p className={styles.footerText}>© ООО «ДИВАН ТРЕЙД», 2013-2021</p>
          </div>
        </div>

        <div className={styles.col}>
          <div className={styles.wrapperBig}>
            <FooterInfoBlock title={footerNavSubscription.title}>
              <div className={styles.footerSubscription}>
                <SubscriptionForm onSuccess={onSuccess} onCancel={onCancel} />
              </div>
            </FooterInfoBlock>
          </div>
          <Accordion collapsed title={footerNavBuyers.title}>
            <FooterNav linkList={footerNavBuyers.childrenList} />
          </Accordion>

          <div className={styles.marginTopAuto}>
            <p className={cn(styles.footerText, styles.wrapperMedium)}>
              Политика конфиденциальности
            </p>
            <SocialList list={socialList} />
          </div>
        </div>

        <div className={styles.col}>
          <div className={styles.wrapperBig}>
            <Accordion title={footerNavCatalog.title}>
              <FooterNav linkList={footerNavCatalog.childrenList} />
            </Accordion>
          </div>

          <div className={styles.wrapperMedium}>
            <Accordion title={footerNavReviews.title}>
              <FooterNav linkList={footerNavReviews.childrenList} />
            </Accordion>
          </div>
          <div className={styles.wrapperBig}>
            <FooterInfoBlock title={footerNavWinner.title} className={styles.footerMiddleWrapper}>
              <FooterNav linkList={footerNavWinner.childrenList} />
            </FooterInfoBlock>
          </div>
          <div>
            <FooterInfoBlock
              title={footerNavPaySystems.title}
              className={styles.footerMiddleWrapper}
            >
              <PaymentList list={paymentSystemList} className={styles.footerSocial} />
            </FooterInfoBlock>
          </div>
          <p className={cn(styles.madeIn, styles.marginTop70)}>Сделано в Супрематике</p>
        </div>
      </>
    );
  }

  function footerMobile() {
    // до 767 2 колонки
    return (
      <>
        <div className={styles.col}>
          <div className={cn(styles.wrapperMedium, styles.wrapperBigMobileM)}>
            <Accordion title={footerNavFeedback.title}>
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
                <SubscriptionForm onSuccess={onSuccess} onCancel={onCancel} />
              </div>
            </FooterInfoBlock>
          </div>
          <div className={styles.wrapperRegular}>
            <Accordion collapsed title={footerNavBuyers.title}>
              <FooterNav linkList={footerNavBuyers.childrenList} />
            </Accordion>
          </div>
        </div>

        <div className={styles.col}>
          <div className={cn(styles.wrapperRegular, styles.wrapperLargeMobileM)}>
            <Accordion title={footerNavCatalog.title}>
              <FooterNav linkList={footerNavCatalog.childrenList} />
            </Accordion>
          </div>
          <div className={cn(styles.wrapperMedium, styles.wrapperLargeMobileM)}>
            <Accordion title={footerNavReviews.title}>
              <FooterNav linkList={footerNavReviews.childrenList} />
            </Accordion>
          </div>
          <div className={styles.wrapperBig}>
            <FooterInfoBlock title={footerNavWinner.title} className={styles.footerMiddleWrapper}>
              <FooterNav linkList={footerNavWinner.childrenList} />
            </FooterInfoBlock>
          </div>
          <div className={styles.wrapperBig}>
            <FooterInfoBlock
              title={footerNavPaySystems.title}
              className={styles.footerMiddleWrapper}
            >
              <PaymentList list={paymentSystemList} className={styles.footerPaymentSystem} />
            </FooterInfoBlock>
          </div>
          <div className={styles.footerBox}>
            <div className={styles.wrapperMedium}>
              <FooterLogo />
            </div>
            <p className={cn(styles.wrapperSmall, styles.footerText)}>
              © ООО «ДИВАН ТРЕЙД», 2013-2021
            </p>

            <p className={cn(styles.footerText, styles.wrapperMedium)}>
              Политика конфиденциальности
            </p>

            <SocialList list={socialList} className={styles.wrapperMedium} />

            <p className={styles.madeIn}>Сделано в Супрематике</p>
          </div>
        </div>
      </>
    );
  }

  function renderColumns() {
    if (mediaQuery.isMobile) {
      return footerMobile();
    }
    if (mediaQuery.isMobileM) {
      return footerMobileM();
    }
    if (mediaQuery.isDesktop) {
      return footerDesktop();
    }
    return false;
  }

  return (
    <div className={styles.footer}>
      <FooterTop />
      <Container>
        <div className={styles.row}>{renderColumns()}</div>
      </Container>
    </div>
  );
};

export default memo(Footer);
