import React, { FC, HTMLAttributes, memo, useCallback, useState, useEffect, useMemo } from 'react';
import cn from 'classnames';

import { ApiPecom } from '@Api/Pecom';
import { useCart } from '@Stores/Cart';
import useModals from '@Hooks/useModals';
import CartBlock from '@Components/CartBlock';
import InformationTabsNavigation from '@Components/InformationTabsNavigation';
import ImportantInfo from '@Components/ImportantInfo';
import ShippingCostCalculator from '@Components/ShippingCostCalculator';
import ServicePageTitle from '@Components/ServicePageTitle';
import { MetaData } from '@Types/Meta';
import ButtonTabs from '@UI/ButtonTabs';
import List from '@UI/List';
import Image from '@UI/Image';
import RadioButton from '@UI/RadioButton';
import FormattedText from '@Pages/PageDelivery/FormattedText';
import OrderedList from './elements/OrderedList';
import FreeDeliveryBanner from './elements/FreeDeliveryBanner';
import Attention from './elements/Attention';
import SuburbTable from './elements/SuburbTable';
import PickupPoint from './elements/PickupPoint';
import ToAddress from './elements/ToAddress';
import pickupPoint from './icons/pickupPoint.svg';
import toAddress from './icons/toAddress.svg';
import styles from './PageDelivery.module.css';
import './PageDelivery-Raw.css';

export interface PaymentTypesIdsData {
  id: number;
  variants: string[];
}

export interface DeliveryData {
  address?: string;
  description?: string;
  id: number;
  name: string;
  type: string;
  paymentTypesIds: PaymentTypesIdsData[];
}

export interface PageDeliveryProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  page: any;
  meta: MetaData;
}

const tabs = [
  { id: '0', label: 'Доставка' },
  { id: '1', label: 'Сборка' },
];
const PageDelivery: FC<PageDeliveryProps> = (props) => {
  const { className, page, meta, ...restProps } = props;
  const {
    title,
    pageMenu,
    teaser,
    table,
    additionalCost,
    acceptanceRules,
    acceptanceProduct,
    attention,
    deliveryTypes,
    layout,
    productIds = [],
  } = page;
  const [currentTab, setCurrentTab] = useState('0');
  const [checkedDelivery, setCheckedDelivery] = useState(deliveryTypes ? deliveryTypes[0] : null);
  const cart = useCart();
  const [deliveryCost, setDeliveryCost] = useState(null);
  const [, { openModal }] = useModals();

  const goodsInfo = useMemo(() => {
    const result = [];

    if (cart.positions?.length > 0) {
      cart.positions.forEach((position) => {
        position.products.forEach((product) => {
          result.push({
            id: product.id,
            quantity: product.quantity,
          });
        });
      });
    } else {
      productIds.forEach((producId) => {
        result.push({
          id: producId,
          quantity: 1,
        });
      });
    }

    return result;
  }, [cart.positions, productIds]);

  const isRus = meta.country === 'RUS';

  const handleChangeDeliveryType = useCallback((delivery) => {
    setCheckedDelivery(delivery);
  }, []);

  const handleChangeTab = useCallback((e, tab) => {
    setCurrentTab(tab.id);
  }, []);

  const handleClickCity = useCallback(() => {
    openModal('Info', {
      title: 'Упс!',
      text: 'Ещё не готово, заходите позже…',
    });
  }, [openModal]);

  // Получаем информацию о стоимости доставки до подьезда
  const load = useCallback(async () => {
    if (goodsInfo.length < 1) return;

    try {
      const options = {
        goodsInfo,
        receiverCityInfo: meta.region.name,
      };
      const [courierSum, pickupSum] = await Promise.all([
        await ApiPecom.getDeliveryCost({
          ...options,
          isDelivery: true,
          courierAddress: `${meta.region.name}, улица Ленина, д. 1`,
        }),
        await ApiPecom.getDeliveryCost({
          ...options,
          isDelivery: false,
          courierAddress: '',
        }),
      ]);

      setDeliveryCost({ courierSum, pickupSum });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }, [goodsInfo, meta.region.name]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div {...restProps} className={cn(styles.page, [className])}>
      <div className={styles.mainContainer}>
        <ServicePageTitle view='bordered' title={title} />
        <InformationTabsNavigation className={styles.menu} navigation={pageMenu} />
      </div>
      {meta.region.isPec ? (
        <>
          <div className={styles.contentContainer}>
            <div className={styles.heading}>
              {`Доставка в город\u00a0`}
              <span className={styles.city} onClick={handleClickCity}>
                {meta.region.name}
              </span>
            </div>
            {deliveryTypes?.length > 0 && (
              <>
                <List
                  className={styles.radioGroup}
                  items={deliveryTypes}
                  renderChild={(delivery: DeliveryData) => (
                    <div
                      className={cn(styles.radioItem, {
                        [styles.active]: checkedDelivery.type === delivery.type,
                      })}
                      onClick={() => {
                        handleChangeDeliveryType(delivery);
                      }}
                    >
                      <RadioButton
                        checked={checkedDelivery.type === delivery.type}
                        className={styles.radioButton}
                        name='delivery'
                      />
                      <Image
                        className={cn(styles.radioIcon, {
                          [styles.toAddress]: delivery.type === 'toAddress',
                          [styles.pickupPoint]: delivery.type === 'pickupPoint',
                        })}
                        src={delivery.type === 'toAddress' ? toAddress : pickupPoint}
                      />
                      <div className={styles.radioName}>{delivery.name}</div>
                    </div>
                  )}
                />
              </>
            )}
            <div className={styles.deliveryNote}>
              В случае необходимости, вы можете забрать свой заказ в пункте выдачи ТК
            </div>
          </div>
          {cart.count > 0 && (
            <div className={styles.cartBlock}>
              <div className={styles.contentContainer}>
                <CartBlock cart={cart} deliveryCost={deliveryCost} type={checkedDelivery.type} />
              </div>
            </div>
          )}
          <div className={styles.contentContainer}>
            {checkedDelivery.type === 'pickupPoint' && <PickupPoint region={meta.region.name} />}
            {checkedDelivery.type === 'toAddress' && <ToAddress />}

            <div className={styles.deliveryText}>
              Свяжитесь с нами, чтобы получить информацию об оптимальных условиях доставки в ваш
              город.
            </div>
            <div className={styles.deliveryPhone}>{layout.footer.contacts.items[0].text}</div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.contentContainer}>
            <ShippingCostCalculator className={styles.calculator} />
            <div className={styles.teaser}>{teaser}</div>
            <FreeDeliveryBanner className={styles.freeDelivery} />
            {!isRus && <FreeDeliveryBanner className={styles.freeDelivery} />}
          </div>

          {table && (
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
                  <div
                    className={styles.table}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: table.delivery }}
                  />
                </div>

                <div
                  className={cn(styles.tableWrapper, {
                    [styles.active]: currentTab === '1',
                  })}
                >
                  <div
                    className={styles.table}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: table.assembly }}
                  />
                </div>

                {additionalCost?.length > 0 && (
                  <List
                    className={styles.additionalCost}
                    items={additionalCost}
                    renderChild={(paragraph: string) => (
                      <div className={styles.paragraph}>
                        <FormattedText currency={meta.currency}>{paragraph}</FormattedText>
                      </div>
                    )}
                  />
                )}
              </div>
            </div>
          )}

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
                      Соблюдение нескольких простых правил – гарантия того, что товар будет
                      доставлен в сохранности.
                    </>
                  ) : (
                    <>
                      Отнеситесь ответственно к получению товара, если хотите быть уверены в том,
                      что он будет доставлен в сохранности. Не поручайте его детям или сторонним
                      людям, чтобы избежать случайного повреждения при подъеме.
                    </>
                  )}
                </div>

                {acceptanceRules?.length > 0 && (
                  <div className={styles.wrapperList}>
                    {!isRus && <div className={styles.listTitle}>При получении товара:</div>}
                    <OrderedList
                      className={styles.list}
                      list={acceptanceRules}
                      currency={meta.currency}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}

      {acceptanceProduct && (
        <div className={cn(styles.contentContainer, styles.attention)}>
          <Attention text={acceptanceProduct} />
        </div>
      )}
    </div>
  );
};

export default memo(PageDelivery);
