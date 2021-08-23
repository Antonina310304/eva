import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './PaymentOptions.module.css';

export interface PaymentItem {
  id: number;
  name: string;
  description: string;
  icon: string;
  visible: boolean;
}
export interface PaymentOptionsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  paymentTypes: PaymentItem;
}

const PaymentOptions: FC<PaymentOptionsProps> = (props) => {
  const { className, paymentTypes, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.wrapper, className)}>
      <ul className={styles.paymentsList}>
        {paymentTypes.map((item, index) => (
          <li className={styles.paymentItem} key={index}>
            <div className={styles.headingWrapper}>
              <img className={styles.paymentImage} src={`/react/static${item.icon}`} />
              <h2 className={styles.paymentHeading}>{item.name}</h2>
            </div>
            <div className={styles.paymentDescription}>{item.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(PaymentOptions);
