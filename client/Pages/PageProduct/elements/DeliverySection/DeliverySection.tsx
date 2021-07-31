import React, { FC, HTMLAttributes, memo, useState, useCallback } from 'react';
import cn from 'classnames';

import Section from '@Components/Section';
import ButtonTabs, { Tab } from '@UI/ButtonTabs';
import styles from './DeliverySection.module.css';
import DeliveryTabContent from '../DeliveryTabContent';

export interface DeliverySectionProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: string;
}

const tabs: Tab[] = [
  { id: 'delivery', label: 'Доставка' },
  { id: 'assembling', label: 'Сборка' },
];

const DeliverySection: FC<DeliverySectionProps> = (props) => {
  const { className, title, ...restProps } = props;
  const [selectedTab, setSelectedTab] = useState<Tab>(tabs[0]);

  const handleChangeTab = useCallback((_e, tab: Tab) => {
    setSelectedTab(tab);
  }, []);

  return (
    <Section
      {...restProps}
      className={cn(styles.deliverySection, className)}
      title={title}
      additional={
        <ButtonTabs defaultValue={selectedTab.id} tabs={tabs} onChangeTab={handleChangeTab} />
      }
      additionalBreakup
    >
      <div className={styles.content}>
        {selectedTab.id === 'delivery' && <DeliveryTabContent />}
      </div>
    </Section>
  );
};

export default memo(DeliverySection);
