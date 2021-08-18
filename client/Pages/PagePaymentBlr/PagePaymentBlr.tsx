import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import { MetaData } from '@Types/Meta';
import Anchors from '@UI/Anchors';
import Image from '@UI/Image';
import styles from './PagePaymentBlr.module.css';
import PaymentOptions from './elements/PaymentOptionsBlr';

export interface PagePaymentBlrProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: any;
  meta: MetaData;
}

const PagePaymentBlr: FC<PagePaymentBlrProps> = (props) => {
  const { className, page, meta, ...restProps } = props;

  const { teaserText } = page;

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <h1 className={styles.heading}>Способы оплаты</h1>
      <div className={styles.wrapper}>
        <div className={styles.introduction}>{teaserText}</div>
        <PaymentOptions />
        <div className={styles.description}>
          Для совершения оплаты заказа принимаются карточки международных систем VISA (всех видов),
          MasterCard (в том числе Maestro), эмитированные любым банком мира, а также карты системы
          БЕЛКАРТ.
        </div>
        <img className={styles.pic} src='/react/static/paymentBlr/logos.jpg' />
      </div>
    </div>
  );
};

export default memo(PagePaymentBlr);
