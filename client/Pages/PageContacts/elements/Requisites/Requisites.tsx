import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './Requisites.module.css';

export interface RequisitesProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Requisites: FC<RequisitesProps> = (props) => {
  const { className, requisites, ...restProps } = props;
  const { address, inn, kpp, name, ogrn } = requisites;

  return (
    <div {...restProps} className={cn(styles.requisites, className)}>
      <div className={styles.title}>Реквизиты</div>

      <div className={styles.organizationName}>{`${name.label} ${name.value}`}</div>

      <div className={styles.legalAddress}>
        {`${address.label} ${address.postCode}, ${address.addressLocality},${address.streetAddress} ${address.additional}`}
      </div>

      <div className={styles.innkpp}>
        {`${inn.label} / ${kpp.label}: ${inn.value} / ${kpp.value}`}
      </div>

      <div className={styles.ogrn}>{`${ogrn.label}: ${ogrn.value}`}</div>
    </div>
  );
};

export default memo(Requisites);
