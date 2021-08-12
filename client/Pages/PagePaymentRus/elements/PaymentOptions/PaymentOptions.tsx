import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './PaymentOptions.module.css';

export interface PaymentOptionsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const PaymentOptions: FC<PaymentOptionsProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.wrapper, className)}>
      <ul className={styles.paymentsList}>
        <li className={styles.paymentItem}>
          <div className={styles.headingWrapper}>
            <img className={styles.paymentImage} src='/react/static/paymentRus/card.svg' />
            <h2 className={styles.paymentHeading}>Банковская карта</h2>
            <div className={styles.cardsLogo}>
              <img className={styles.paymentImage} src='/react/static/paymentRus/mastercard.svg' />
              <img className={styles.paymentImage} src='/react/static/paymentRus/visa.svg' />
            </div>
          </div>
          <div className={styles.paymentDescription}>
            Для удобной оплаты банковской картой используется система электронных платежей. При
            оформлении заказа выберите способ оплаты с помощью карт Visa или Mastercard, после чего
            вы перейдете на страницу безопасного платежа.
          </div>
        </li>
        <li className={styles.paymentItem}>
          <div className={styles.headingWrapper}>
            <img className={styles.paymentImage} src='/react/static/paymentRus/loan.svg' />
            <h2 className={styles.paymentHeading}>Кредит без переплаты</h2>
          </div>
          <div className={styles.paymentDescription}>
            Заказ в нашем магазине может быть оформлен в рассрочку или кредит. Подробную
            консультацию об условиях банковских программ вы можете получить у наших менеджеров. Для
            оформления продукта необходимо будет заполнить анкету. Затем ее рассмотрит кредитный
            специалист, и в случае принятия положительного решения банком вы сможете совершить
            покупку в рассрочку или кредит.
          </div>
        </li>
        <li className={styles.paymentItem}>
          <div className={styles.headingWrapper}>
            <img className={styles.paymentImage} src='/react/static/paymentRus/bank.svg' />
            <h2 className={styles.paymentHeading}>Банковский перевод</h2>
          </div>
          <div className={styles.paymentDescription}>
            Для осуществления платежа банковским переводом менеджер выставит счет с выбранными
            товарами и вышлет на вашу электронную почту. Данный способ оплаты по банковским
            реквизитам компании предусмотрен как для физических, так и для юридических лиц.
          </div>
        </li>
        <li className={styles.paymentItem}>
          <div className={styles.headingWrapper}>
            <img className={styles.paymentImage} src='/react/static/paymentRus/cash_showroom.svg' />
            <h2 className={styles.paymentHeading}>Наличными в шоу-руме</h2>
          </div>
          <div className={styles.paymentDescription}>
            Курьер доставит вам товар по указанному адресу. Вы внимательно осматриваете комплектацию
            и внешний вид продукции, после чего оплачиваете ее стоимость, а также стоимость
            выбранных вами услуг. На привезенные изделия мы предоставим товарный чек и документацию.
          </div>
        </li>
        <li className={styles.paymentItem}>
          <div className={styles.headingWrapper}>
            <img className={styles.paymentImage} src='/react/static/paymentRus/cash.svg' />
            <h2 className={styles.paymentHeading}>Наличными курьеру</h2>
          </div>
          <div className={styles.paymentDescription}>
            Курьер доставит вам товар по указанному адресу. Вы внимательно осматриваете комплектацию
            и внешний вид продукции, после чего оплачиваете оставшуюся часть стоимости, а также
            стоимость выбранных вами услуг. На привезенные изделия мы предоставим товарный чек и
            документацию.
          </div>
        </li>
      </ul>
    </div>
  );
};

export default memo(PaymentOptions);
