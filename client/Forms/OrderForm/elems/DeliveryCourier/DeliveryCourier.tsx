import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import FormItem from '@UI/FormItem';
import Input from '@UI/Input';
import styles from './DeliveryCourier.module.css';

export interface DeliveryCourierProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const DeliveryCourier: FC<DeliveryCourierProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.delivery, className)}>
      <FormItem label='Адрес' view='secondary'>
        <Input wide name='address' placeholder='город, улица, дом, этаж, квартира' />
      </FormItem>

      <div className={styles.hint}>
        Оплата при получении производится после осмотра товаров. Курьер принимает только наличные
        средства. Пожалуйста, подготовьте сумму без сдачи.
      </div>
    </div>
  );
};

export default memo(DeliveryCourier);
