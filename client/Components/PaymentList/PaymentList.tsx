import React, { FC, HTMLAttributes } from 'react';
import PaySystem from '@UI/IconPaySystem/IconPaySystem';
import cn from 'classnames';
import styles from './PaymentList.module.css';
import paymentSystemList from './data';

export interface PaymentListProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const PaymentList: FC<PaymentListProps> = ({ className }) => {
  return (
    <ul className={cn(styles.paymentList, className)}>
      {paymentSystemList.map((item) => {
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
