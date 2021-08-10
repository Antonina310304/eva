import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { MetaData } from '@Types/Meta';
import Navigation from './elemets/Navigation';
import QualityDepartment from './elemets/QualityDepartment';
import Garanties from './elemets/Garanties/Garanties';
import ContactWithQualityDep from './elemets/ContactWithQualityDep';
import ExchangeAndRefund from './elemets/ExchangeAndRefund';
import styles from './PageWarranty.module.css';

export interface PageWarrantyProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: any;
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
        <Navigation navigation={pageList} />

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
