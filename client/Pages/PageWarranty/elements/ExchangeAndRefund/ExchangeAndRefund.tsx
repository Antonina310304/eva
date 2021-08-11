import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './ExchangeAndRefund.module.css';

export interface ExchangeAndRefundProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  conditions: string[];
  refund: string[];
}

const ExchangeAndRefund: FC<ExchangeAndRefundProps> = (props) => {
  const { className, conditions, refund, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.exchangeAndRefund, className)}>
      <div className={styles.title}>Условия обмена и возврата</div>

      <div className={styles.wrapper}>
        {conditions.map((item, index) => (
          <div className={styles.item} key={index}>
            {item}
          </div>
        ))}
      </div>

      <div className={styles.information}>
        Возврат и обмен товара – в течение 7 дней с момента покупки
      </div>

      <div className={styles.wrapper}>
        {refund.map((item, index) => (
          <div className={styles.item} key={index}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(ExchangeAndRefund);
