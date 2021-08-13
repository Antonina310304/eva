import React, { FC, HTMLAttributes, memo, useCallback, useState } from 'react';
import cn from 'classnames';

import Breadcrumbs from '@UI/Breadcrumbs';
import SectionMenu from '@Components/SectionMenu';
import ImportantInfo from '@Components/ImportantInfo';
import ShippingCostCalculator from '@Components/ShippingCostCalculator';
import { MetaData } from '@Types/Meta';
import ButtonTabs from '@UI/ButtonTabs';
import List from '@UI/List';
import Link from '@UI/Link';
import Image from '@UI/Image';
import FormattedText from '@Pages/PageDelivery/FormattedText';
import OrderedList from './elements/OrderedList';
import FreeDeliveryBanner from './elements/FreeDeliveryBanner';
import Attention from './elements/Attention';
import SuburbTable from './elements/SuburbTable';
import './PageDelivery-Raw.css';
import styles from './PageDelivery.module.css';

import carImage from './car.svg';

export interface PageDeliveryProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: any;
  meta: MetaData;
}

const PageDelivery: FC<PageDeliveryProps> = (props) => {
  const { className, page, meta, ...restProps } = props;
  const {
    breadcrumbs,
    title,
    pageMenu,
    teaser,
    table,
    additionalCost,
    acceptanceRules,
    acceptanceProduct,
    attention,
  } = page;
  const [currentTab, setCurrentTab] = useState('0');

  const tabs = [
    { id: '0', label: 'Доставка' },
    { id: '1', label: 'Сборка' },
  ];

  const isRus = meta.country === 'RUS';

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
        {!isRus && <FreeDeliveryBanner className={styles.freeDelivery} />}
      </div>
      <div className={styles.contrastRow}>
        <div className={styles.contentContainer}>
          <div className={styles.tabsHeader}>
            <div className={styles.heading}>Стоимость услуг</div>
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
            {/*
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
            renderChild={(paragraph: string) => (
              <div className={styles.paragraph}>
                <FormattedText currency={meta.currency}>{paragraph}</FormattedText>
              </div>
            )}
          />
        </div>
      </div>

      <div className={cn(styles.contentContainer, { [styles.row]: true })}>
        <SuburbTable className={styles.suburbTable} />

        {attention && (
          <ImportantInfo
            className={styles.importantInfo}
            title='Важная информация:'
            text={attention}
          />
        )}

        <div className={styles.upliftFirstFloor}>
          Занос на 1-й этаж: 500 ₽
          <br />
          (для клиентов, проживающих на первом этаже и в частных домах)
        </div>

        {acceptanceRules && (
          <div className={styles.rules}>
            <div className={styles.heading}>
              {isRus ? 'Правила приема мебели' : 'Получение товара'}
            </div>
            <div className={styles.rulesText}>
              {isRus ? (
                <>
                  Соблюдение нескольких простых правил – гарантия того, что товар будет доставлен в
                  сохранности.
                </>
              ) : (
                <>
                  Отнеситесь ответственно к получению товара, если хотите быть уверены в том, что он
                  будет доставлен в сохранности. Не поручайте его детям или сторонним людям, чтобы
                  избежать случайного повреждения при подъеме.
                </>
              )}
            </div>

            <div className={styles.wrapperList}>
              {!isRus && <div className={styles.listTitle}>При получении товара:</div>}
              <OrderedList
                className={styles.list}
                list={acceptanceRules}
                currency={meta.currency}
              />
            </div>
          </div>
        )}

        {acceptanceProduct && <Attention className={styles.attention} text={acceptanceProduct} />}
      </div>
      <div className={styles.bottomInfoWrapper}>
        <div className={styles.bottomInfo}>
          <div className={styles.bottomInfoContainer}>
            <div className={styles.subtitle}>Доставка по всей России</div>
            <div className={styles.textBlock}>
              <div className={styles.text}>
                Чтобы заказать товар в магазине сайте, свяжитесь с нашим менеджером по телефону 7
                (495) 266-71-47.
              </div>
              <div className={styles.text}>Доставка по городу Москва и области – от 3 дней.</div>
            </div>
            <Link to='/' className={styles.moreLink} view='primary'>
              Подробнее
            </Link>
          </div>
          <Image className={styles.carImage} src={carImage} />
        </div>
      </div>
    </div>
  );
};

export default memo(PageDelivery);
