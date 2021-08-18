import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './PaymentOptionsBlr.module.css';

export interface PaymentOptionsBlrProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const PaymentOptionsBlr: FC<PaymentOptionsBlrProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.wrapper, className)}>
      <ul className={styles.paymentsList}>
        <li className={styles.paymentItem}>
          <div className={styles.headingWrapper}>
            <img className={styles.paymentImage} src='/react/static/payment-options-blr/cash.svg' />
            <h2 className={styles.paymentHeading}>Наличными</h2>
          </div>
          <div className={styles.paymentDescription}>
            Курьер доставит вам товар по указанному адресу. Вы внимательно осматриваете комплектацию
            и внешний вид продукции, после чего оплачиваете ее стоимость, а также стоимость
            выбранных вами услуг. На привезенные изделия мы предоставим товарный чек и документацию.
          </div>
        </li>
        <li className={styles.paymentItem}>
          <div className={styles.headingWrapper}>
            <img className={styles.paymentImage} src='/react/static/payment-options-blr/card.svg' />
            <h2 className={styles.paymentHeading}>Банковская карта курьеру</h2>
          </div>
          <div className={styles.paymentDescription}>
            Курьер доставит вам товар по указанному адресу. Вы внимательно осматриваете комплектацию
            и внешний вид продукции, после чего оплачиваете ее стоимость, а также стоимость
            выбранных вами услуг. На привезенные изделия мы предоставим товарный чек и документацию.
          </div>
        </li>
        <li className={styles.paymentItem}>
          <div className={styles.headingWrapper}>
            <img
              className={styles.paymentImage}
              src='/react/static/payment-options-blr/online.svg'
            />
            <h2 className={styles.paymentHeading}>Банковская карта онлайн</h2>
          </div>
          <div className={styles.paymentDescription}>
            Система онлайн платежей - это удобное средство расчётов за товары через интернет в
            режиме реального времени непосредственно после оформления заказа.
          </div>
        </li>
      </ul>
    </div>
  );
};

export default memo(PaymentOptionsBlr);
