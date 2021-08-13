import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { MetaData } from '@Types/Meta';
import Navigation from '@Pages/PageWarranty/elements/Navigation';
import Wrapper from './elements/Wrapper';
import BankBanner from './elements/BankBanner';
import CreditWithoutOverpayment from './elements/CreditWithoutOverpayment ';
import ConditionsToBuyInCredit from './elements/ConditionsToBuyInCredit';
import HowBuyInCredit from './elements/HowBuyInCredit';
import styles from './PageCredit.module.css';

export interface PageCreditProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  // TODO: нужно типизировать
  page: any;
  meta: MetaData;
}

const PageCredit: FC<PageCreditProps> = (props) => {
  const { className, page, meta, ...restProps } = props;
  const {
    breadcrumbs,
    banners,
    pageList,
    topText, // TODO с бека приходит top_text нужно соответствие camelCase
    installment,
  } = page;

  console.log('page', page);

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <div className={styles.pageTitle}>{breadcrumbs[1].text}</div>
      <Wrapper>
        <Navigation navigation={pageList} />

        <div className={styles.topText}>{topText}</div>
      </Wrapper>

      <BankBanner className={styles.bankBanner} banners={banners} />

      <Wrapper>
        <CreditWithoutOverpayment
          className={styles.creditWithoutOverpayment}
          installment={installment}
        />

        <ConditionsToBuyInCredit className={styles.conditionsToBuyInCredit} />

        <HowBuyInCredit className={styles.howBuyInCredit} />
      </Wrapper>
    </div>
  );
};

export default memo(PageCredit);
