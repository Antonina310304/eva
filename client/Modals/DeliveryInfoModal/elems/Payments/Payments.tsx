import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { PaymentTypeData } from '@Types/Cart';
import styles from './Payments.module.css';

export interface PaymentsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  paymentTypes: PaymentTypeData[];
}

const Payments: FC<PaymentsProps> = (props) => {
  const { className, paymentTypes, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.payments, className)}>
      {paymentTypes.map((paymentType, index) => {
        const isCreditCard = paymentType.id === 5;

        return (
          <div className={styles.method} key={index}>
            <div className={styles.head}>
              <div className={styles.wrapperIcon}>
                <img className={styles.icon} src={paymentType.icon} alt='' />
              </div>

              <div className={styles.headContent}>
                <h3 className={styles.title}>{paymentType.name}</h3>

                {isCreditCard && (
                  <div className={styles.images}>
                    <img className={styles.image} src='/images/mastercard.png' alt='' />
                    <img className={styles.image} src='/images/visa.png' alt='' />
                  </div>
                )}
              </div>
            </div>

            {paymentType.description && (
              <div
                className={styles.description}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: paymentType.description }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default memo(Payments);
