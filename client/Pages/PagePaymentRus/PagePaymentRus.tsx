import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { MetaData } from '@Types/Meta';
import styles from './PagePaymentRus.module.css';
import PaymentOptions from './elements/PaymentOptions';
import Anchors from './elements/Anchors';

export interface PagePaymentRusProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: any;
  meta: MetaData;
}

const PagePaymentRus: FC<PagePaymentRusProps> = (props) => {
  const { className, page, meta, ...restProps } = props;
  const { breadcrumbs, pageMenu } = page;

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <h1 className={styles.heading}>Способы оплаты</h1>
      <div className={styles.wrapper}>
        <Anchors anchors={pageMenu} />
        <div className={styles.introduction}>
          Для вашего удобства в нашем интернет-магазине предусмотрено несколько вариантов оплаты:
        </div>
        <PaymentOptions />
        <div className={styles.info}>
          <img className={styles.infoPic} src='/react/static/paymentRus/info.svg' />
          <div className={styles.infoDescription}>
            Внимание: мы проводим регулярные акции и формируем наиболее выгодные предложения для
            покупателей. Поэтому действие промокодов не распространяется на акционные товары и
            продукцию, участвующую в специальных предложениях. Также их не получится оформить с
            бесплатной доставкой и в рассрочку.
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PagePaymentRus);
