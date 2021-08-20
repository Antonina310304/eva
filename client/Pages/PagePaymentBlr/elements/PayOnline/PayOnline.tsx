import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import styles from './PayOnline.module.css';

export interface PayOnlineProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const PayOnline: FC<PayOnlineProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.wrapper, className)}>
      <h3 className={styles.heading}>Что необходимо для оплаты заказа онлайн?</h3>
      <ul className={styles.list}>
        <li className={styles.item}>
          <div>
            <span className={styles.number}>1</span>
          </div>
          <p className={styles.description}>
            Выберите товар на сайте divan.by и нажмите «Добавить в корзину»
          </p>
        </li>
        <li className={styles.item}>
          <div>
            <span className={styles.number}>2</span>
          </div>
          <p className={styles.description}>
            В корзине нажмите «Оформить заказ» и заполните все необходимые данные;
          </p>
        </li>
        <li className={styles.item}>
          <div>
            <span className={styles.number}>3</span>
          </div>
          <p className={styles.description}>В способе оплаты выберите пункт «Банковская карта»</p>
        </li>
        <li className={styles.item}>
          <div>
            <span className={styles.number}>4</span>
          </div>
          <p className={styles.description}>
            Далее Вы попадаете на страницу вашего заказа, где необходимо выбрать «Перейти к оплате»;
          </p>
        </li>
      </ul>
      <div className={styles.info}>
        Платежи по банковским картам осуществляются через систему электронных платежей bePaid.
        Платежная страница системы bePaid отвечает всем требованиям безопасности передачи данных
        (PCI DSS Level 1). Все конфиденциальные данные хранятся в зашифрованном виде и максимально
        устойчивы к взлому.
      </div>
    </div>
  );
};

export default memo(PayOnline);
