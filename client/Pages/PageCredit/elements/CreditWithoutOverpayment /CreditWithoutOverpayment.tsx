import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './CreditWithoutOverpayment.module.css';

export interface CreditWithoutOverpaymentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  conditions: string[];
  refund: string[];
}

const CreditWithoutOverpayment: FC<CreditWithoutOverpaymentProps> = (props) => {
  const { className, installment, ...restProps } = props;
  const { list, note, title } = installment;

  return (
    <div {...restProps} className={cn(styles.creditWithoutOverpayment, className)}>
      <div className={styles.title}>{title}</div>

      <ul className={styles.list}>
        {list.map((item, index) => (
          <li className={styles.listItem} key={index}>
            {item}
          </li>
        ))}
      </ul>

      <div className={styles.nuance}>{note}</div>
    </div>
  );
};

export default memo(CreditWithoutOverpayment);
