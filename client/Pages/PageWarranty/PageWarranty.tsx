import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Link from '@UI/Link';
import { MetaData } from '@Types/Meta';
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
  console.log('page', page);

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <div className={styles.pageTitle}>Гарантия</div>

      <div className={styles.wrapper}>
        <nav className={styles.navigation}>
          {pageList.map((item, index: number) => (
            <div className={styles.navigationItem} key={index}>
              <Link
                to={item.href}
                className={cn(styles.navigationLink, { [styles.active]: item.active })}
                view='simple'
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>

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
