import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { MetaData } from '@Types/Meta';
import InformationTabsNavigation from '@Components/InformationTabsNavigation';
import QualityDepartment from './elements/QualityDepartment';
import Garanties from './elements/Garanties/Garanties';
import ContactWithQualityDep from './elements/ContactWithQualityDep';
import ExchangeAndRefund from './elements/ExchangeAndRefund';
import { PageWarrantyData } from './typings';
import styles from './PageWarranty.module.css';

export interface PageWarrantyProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: PageWarrantyData;
  meta: MetaData;
}

const PageWarranty: FC<PageWarrantyProps> = (props) => {
  const { className, page, meta, ...restProps } = props;
  const {
    breadcrumbs,
    pageList,
    schedule,
    oferta,
    description,
    warranty,
    feedbackLink,
    conditions,
    refund,
  } = page;

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <div className={styles.pageTitle}>{breadcrumbs[1].text}</div>

      <div className={styles.wrapper}>
        <InformationTabsNavigation className={styles.navigation} navigation={pageList} />

        <QualityDepartment
          className={styles.qualityDepartment}
          schedule={schedule}
          oferta={oferta}
          description={description}
        />

        <Garanties className={styles.garanties} warranty={warranty} />
      </div>

      <ContactWithQualityDep className={styles.contactWithQualityDep} feedbackLink={feedbackLink} />

      <div className={styles.wrapper}>
        <ExchangeAndRefund
          className={styles.exchangeAndRefund}
          conditions={conditions}
          refund={refund}
        />
      </div>
    </div>
  );
};

export default memo(PageWarranty);
