import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { MetaData } from '@Types/Meta';
import InformationTabsNavigation from '@Components/InformationTabsNavigation';
import ServicePageTitle from '@Components/ServicePageTitle';
import ServicePageWrapper from '@Components/ServicePageWrapper';
import SberbankBanner from './elements/SberbankBanner';
import VTBBanner from './elements/VTBBanner';
import ListBlock from './elements/ListBlock';
import Divider from './elements/Divider';
import ConditionsToBuyInCredit from './elements/ConditionsToBuyInCredit';
import HowBuyInCredit from './elements/HowBuyInCredit';
import Halva from './elements/Halva';
import CardsPartners from './elements/CardsPartners';
import { PageCreditData } from './typings';
import styles from './PageCredit.module.css';

export interface PageCreditProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: PageCreditData;
  meta: MetaData;
}

const PageCredit: FC<PageCreditProps> = (props) => {
  const { className, page, meta, ...restProps } = props;
  const {
    banners,
    pageList,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    top_text, // TODO с бека приходит top_text нужно соответствие camelCase topText
    installment,
    partners,
  } = page;

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <ServicePageWrapper type='wide'>
        <ServicePageTitle className={styles.pageTitle} view='bordered' title='Рассрочка и кредит' />
      </ServicePageWrapper>

      <ServicePageWrapper>
        <InformationTabsNavigation className={styles.navigation} navigation={pageList} />

        <div className={styles.topText}>{top_text}</div>
      </ServicePageWrapper>

      {meta.country === 'RUS' ? (
        <SberbankBanner
          className={styles.bankBanner}
          banner={banners.find((banner) => banner.id === 'sber')}
        />
      ) : (
        <VTBBanner
          className={styles.bankBanner}
          banner={banners.find((banner) => banner.id === 'vtb')}
        />
      )}

      <ServicePageWrapper>
        <ListBlock
          className={styles.creditWithoutOverpayment}
          title={installment.title}
          list={installment.list}
          nuance={installment.note}
        />

        <Divider className={styles.divider} />

        {meta.country === 'RUS' && (
          <>
            <ConditionsToBuyInCredit className={styles.conditionsToBuyInCredit} />

            <HowBuyInCredit className={styles.howBuyInCredit} />

            <Halva className={styles.halva} />
          </>
        )}
      </ServicePageWrapper>

      {meta.country === 'BLR' && (
        <CardsPartners className={styles.cardsPartners} partners={partners} />
      )}
    </div>
  );
};

export default memo(PageCredit);
