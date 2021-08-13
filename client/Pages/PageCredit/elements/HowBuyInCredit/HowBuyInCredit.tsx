import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './HowBuyInCredit.module.css';

export interface HowBuyInCreditProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const HowBuyInCredit: FC<HowBuyInCreditProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.howBuyInCredit, className)}>
      <div className={styles.title}>Как совершить покупку в кредит без переплаты?</div>

      <ul className={styles.list}>
        <li className={styles.listItem}>Выберите товары на сайте и положите их в корзину;</li>
        <li className={styles.listItem}>
          При оформлении заказа в корзине выберите способ оплаты «Купить в кредит без переплаты»;
        </li>
        <li className={styles.listItem}>
          Система переведет вас на страницу «Сбербанк Онлайн». Авторизуйтесь и заполните заявку в
          личном кабинете;
        </li>
        <li className={styles.listItem}>
          Получите мгновенное одобрение и подтвердите согласие с его условиями. Денежные средства
          поступят на наш счет как при оплате банковской картой;
        </li>
        <li className={styles.listItem}>Согласуйте с менеджером время и адрес доставки покупки.</li>
      </ul>

      <div className={styles.nuance}>
        *На заказы, оформленные в рассрочку, не распространяются скидки по промокодам и бесплатная
        доставка.
      </div>
    </div>
  );
};

export default memo(HowBuyInCredit);
