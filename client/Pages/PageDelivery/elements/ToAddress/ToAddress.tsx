import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Price from '@UI/Price';
import styles from './ToAddress.module.css';

export interface ToAddressProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const ToAddress: FC<ToAddressProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.container, className)}>
      <div className={styles.title}>
        Доставка транспортной компанией «ПЭК» до подъезда от
        <Price className={styles.price} price={1689} />
      </div>
      <div className={styles.text}>
        Транспортная компания ПЭК привезет ваш заказ. Стоимость доставки указана в карточке товара и
        будет автоматически рассчитана в корзине. Доставка осуществляется при 100% предоплате.
        Возможен самовывоз из пунктов выдачи ТК.
      </div>
    </div>
  );
};

export default memo(ToAddress);
