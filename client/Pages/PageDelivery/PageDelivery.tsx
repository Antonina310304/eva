import React, { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import Breadcrumbs from '@UI/Breadcrumbs';
import SectionMenu from '@Components/SectionMenu';
import ImportantInfo from '@Components/ImportantInfo';
import ShippingCostCalculator from '@Components/ShippingCostCalculator';
import { MetaData } from '@Types/Meta';
import ButtonTabs from '@UI/ButtonTabs';
import List from '@UI/List';
import FreeDeliveryBanner from './elements/FreeDeliveryBanner';
import './PageDelivery-Raw.css';
import styles from './PageDelivery.module.css';

export interface PageDeliveryProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: any;
  meta: MetaData;
}

const PageDelivery: FC<PageDeliveryProps> = (props) => {
  const { className, page, meta, ...restProps } = props;
  const { breadcrumbs, title, pageMenu, teaser, table, additionalCost } = page;
  const [currentTab, setCurrentTab] = useState('0');

  const tabs = [
    { id: '0', label: 'Доставка' },
    { id: '1', label: 'Сборка' },
  ];

  const handleChangeTab = useCallback((e, tab) => {
    setCurrentTab(tab.id);
  }, []);

  return (
    <div {...restProps} className={cn(styles.page, [className])}>
      <div className={styles.mainContainer}>
        <div className={styles.wrapperTop}>
          <Breadcrumbs breadcrumbs={breadcrumbs} className={styles.breadcrumbs} />
          <div className={styles.title}>{title}</div>
        </div>
        <SectionMenu className={styles.menu} items={pageMenu} />
      </div>
      <div className={styles.contentContainer}>
        <ShippingCostCalculator className={styles.calculator} />
        <div className={styles.teaser}>{teaser}</div>
        <FreeDeliveryBanner className={styles.freeDelivery} />
        {meta.country === 'BLR' && <FreeDeliveryBanner className={styles.freeDelivery} />}
      </div>
      <div className={styles.contrastRow}>
        <div className={styles.contentContainer}>
          <div className={styles.tabsHeader}>
            <div className={styles.header}>Стоимость услуг</div>
            {tabs && (
              <ButtonTabs
                className={styles.tabs}
                defaultValue='0'
                tabs={tabs}
                inversed
                onChangeTab={handleChangeTab}
              />
            )}
          </div>
          <div
            className={cn(styles.tableWrapper, {
              [styles.active]: currentTab === '0',
            })}
          >
            <div className={styles.table} dangerouslySetInnerHTML={{ __html: table.delivery }} />
            {/* <div className={styles.table} dangerouslySetInnerHTML={{ __html: table.suburb }} />
            <div
              className={styles.table}
              dangerouslySetInnerHTML={{ __html: table.upliftFirstFloor }}
            /> */}
          </div>

          <div
            className={cn(styles.tableWrapper, {
              [styles.active]: currentTab === '1',
            })}
          >
            <div className={styles.table} dangerouslySetInnerHTML={{ __html: table.assembly }} />
          </div>

          <List
            className={styles.additionalCost}
            items={additionalCost}
            renderChild={(paragraph: Document) => (
              <div className={styles.paragraph}>{paragraph}</div>
            )}
          />
        </div>
      </div>

      <div className={styles.contentContainer}>
        <ImportantInfo
          title='Важная информация:'
          text='Мы ежедневно проверяем участников рейса на состояние здоровья перед выездом. У каждой команды доставки есть средства индивидуальной защиты: перчатки, маски и бахилы.'
        />
      </div>
    </div>
  );
};

export default memo(PageDelivery);
