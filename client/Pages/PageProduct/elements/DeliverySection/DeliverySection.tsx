import React, { FC, HTMLAttributes, memo } from 'react';
import cn from 'classnames';

import Section from '@Components/Section';
import ButtonTabs, { Tab } from '@UI/ButtonTabs';
import DeliveryTable from '../DeliveryTable';
import styles from './DeliverySection.module.css';

export interface DeliverySectionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: string;
}

const tabs: Tab[] = [
  { id: '0', label: 'Доставка' },
  { id: '1', label: 'Сборка' },
];

const DeliverySection: FC<DeliverySectionProps> = (props) => {
  const { className, title, ...restProps } = props;

  return (
    <Section
      {...restProps}
      className={cn(styles.deliverySection, className)}
      title={title}
      additional={<ButtonTabs defaultValue={tabs[0].id} tabs={tabs} />}
      additionalBreakup
    >
      <div className={styles.content}>
        <div className={styles.text}>
          <div>
            Доставка на следующий день только при наличии товара на складе и заказе до 12:00.
          </div>
          <div>
            Внутри МКАД возможна доставка в указанный вами двухчасовой интервал 10:00-21:00.
          </div>
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
    </Section>
  );
};

export default memo(DeliverySection);
