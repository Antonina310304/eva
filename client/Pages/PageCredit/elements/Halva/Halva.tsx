import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import ParagraphTitle from '../ParagraphTitle';
import styles from './Halva.module.css';

export interface HalvaProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Halva: FC<HalvaProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.halva, className)}>
      <div className={styles.logo} />

      <div className={styles.text}>
        Рассрочка по карте «Халва»* предоставляется на мебель и товары для дома без ограничения
        стоимости, без переплаты и без первого взноса. Период рассрочки – 4 месяца.
      </div>

      <div className={styles.nuance}>
        *Карта рассрочки «Халва» предоставляется ПАО «Совкомбанк», генеральная лицензия Банка России
        № 963 от 05.12.2014 г.
      </div>

      <ParagraphTitle className={styles.title} title='Как совершить покупку по карте «Халва»?' />

      <ul className={styles.list}>
        <li className={styles.listItem}>Выберите товары на сайте и положите их в корзину;</li>
        <li className={styles.listItem}>
          При подтверждении заказа в корзине выберите способ оплаты «Банковская карта»;
        </li>
        <li className={styles.listItem}>
          Для оплаты вы будете перенаправлены на платежный шлюз. Введите реквизиты и оплатите заказ
          привычным способом, как обычной дебетовой картой;
        </li>
        <li className={styles.listItem}>
          Получите мебель. Пополняйте карту, и совершайте покупки снова!
        </li>
      </ul>

      <div className={styles.nuance}>
        *На заказы, оплаченные картой «Халва», не распространяются скидки по промокодам и бесплатная
        доставка.
      </div>
    </div>
  );
};

export default memo(Halva);
