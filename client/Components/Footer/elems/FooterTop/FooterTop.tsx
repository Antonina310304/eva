import React, { FC, memo, HTMLAttributes } from 'react';

import Link from '@UI/Link';

import Container from '@Components/Container';
import styles from './FooterTop.module.css';

export interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const FooterTop: FC<FooterProps> = () => {
  return (
    <div className={styles.footerTop}>
      <Container className={styles.footerInner}>
        <div className={styles.FooterTopWrap}>
          <p className={styles.FooterTopTitle}>Доставка по всей России</p>
          <p className={styles.FooterTopText}>
            Чтобы заказать товар в магазине сайте, свяжитесь с нашим менеджером по телефону&ensp;
            <Link to='tel:7 (495) 266-71-47' view='primary'>
              7&nbsp;(495)&nbsp;266-71-47
            </Link>
            . Доставка по городу Москва и области – от 3 дней.
          </p>
          <Link view='primary' to='/'>
            Подробнее
          </Link>
        </div>
        <div className={styles.FooterTopImg}>
          <img src='/react/static/img/car.svg' alt='я везу замечательный диван' />
        </div>
      </Container>
    </div>
  );
};

export default memo(FooterTop);
