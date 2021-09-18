import { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import DeliveryTable from '../DeliveryTable';
import styles from './DeliveryTabContent.module.css';

export interface DeliveryTabContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const DeliveryTabContent: FC<DeliveryTabContentProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={cn(styles.content, className)}>
      <div className={styles.text}>
        <div>Доставка на следующий день только при наличии товара на складе и заказе до 12:00.</div>
        <div>Внутри МКАД возможна доставка в указанный вами двухчасовой интервал 10:00-21:00.</div>
        <div>Стоимость: + 1000 ₽ к стандартному тарифу.</div>
        <div>
          Важно! Мы ежедневно проверяем участников рейса на состояние здоровья перед выездом.
        </div>
        <div>
          У каждой команды доставки есть средства индивидуальной защиты: перчатки, маски и бахилы.
        </div>
      </div>

      <div className={styles.table}>
        <DeliveryTable />
      </div>

      <div className={styles.hint}>
        Занос на 1-й этаж (для клиентов, проживающих на первом этаже и в частных домах) 500 ₽
      </div>
    </div>
  );
};

export default memo(DeliveryTabContent);
