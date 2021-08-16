import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { MetaData } from '@Types/Meta';
import Navigation from '@Pages/PageWarranty/elements/Navigation';
import PageTitle from './elements/PageTitle';
import Wrapper from './elements/Wrapper';
import SberbankBanner from './elements/SberbankBanner';
import VTBBanner from './elements/VTBBanner';
import ListBlock from './elements/ListBlock';
import Devider from './elements/Devider';
import CreditWithoutOverpayment from './elements/CreditWithoutOverpayment ';
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
    topText, // TODO с бека приходит top_text нужно соответствие camelCase topText
    installment,
    partners,
  } = page;

  console.log('page', page);

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <PageTitle className={styles.pageTitle} title='Рассрочка и кредит' />
      <Wrapper>
        <Navigation navigation={pageList} />

        <div className={styles.topText}>{topText}</div>
      </Wrapper>

      {meta.country === 'RUS' ? (
        <SberbankBanner className={styles.bankBanner} banners={banners} />
      ) : (
        <VTBBanner className={styles.bankBanner} banners={banners} />
      )}

      <Wrapper>
        <ListBlock
          className={styles.creditWithoutOverpayment}
          title={installment.title}
          list={installment.list}
          nuance={installment.note}
        />

        <Devider className={styles.devider} />

        {meta.country === 'RUS' && (
          <>
            <ConditionsToBuyInCredit className={styles.conditionsToBuyInCredit} />

            <HowBuyInCredit className={styles.howBuyInCredit} />

            <Halva className={styles.halva} />
          </>
        )}
      </Wrapper>

      <CardsPartners className={styles.cardsPartners} partners={partners} />
    </div>
  );
};

export default memo(PageCredit);
