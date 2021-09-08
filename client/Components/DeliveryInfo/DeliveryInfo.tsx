import React, { FC, memo, HTMLAttributes } from 'react';

import Link from '@UI/Link';
import styles from './DeliveryInfo.module.css';

export interface DeliveryInfoProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const DeliveryInfo: FC<DeliveryInfoProps> = () => {
  return (
    <div className={styles.delivery}>
      <div className={styles.inner}>
        <div className={styles.wrap}>
          <p className={styles.title}>Доставка по всей России</p>
          <p className={styles.text}>
            Чтобы заказать товар в магазине сайте, свяжитесь с нашим менеджером по телефону&ensp;
            <Link className={styles.link} to='tel:7 (495) 266-71-47'>
              7&nbsp;(495)&nbsp;266-71-47
            </Link>
            {`. Доставка по городу Москва и области – от 3 дней. `}
          </p>
          <Link view='primary' to='/site/delivery'>
            Подробнее
          </Link>
        </div>
        <div className={styles.img}>
          <img src='/react/static/img/car.svg' alt='я везу замечательный диван' />
        </div>
      </div>
    </div>
  );
};

export default memo(DeliveryInfo);
