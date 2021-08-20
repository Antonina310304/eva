import React, { FC, HTMLAttributes } from 'react';
import { IconPaymentData } from '@Types/IconSocial';
import PaySystem from '@UI/IconPaySystem/IconPaySystem';
import cn from 'classnames';
import styles from './PaymentList.module.css';

export interface PaymentListProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  list: IconPaymentData[];
}

const PaymentList: FC<PaymentListProps> = ({ list, className }) => {
  return (
    <ul className={cn(styles.paymentList, className)}>
      {list.map((item) => {
        return (
          <li key={item.icon} className={styles.item}>
            <PaySystem icon={item.icon} name={item.name} />
          </li>
        );
      })}
    </ul>
  );
};

export default PaymentList;
