import React, { FC, HTMLAttributes, memo, useMemo, useState, useCallback } from 'react';
import cn from 'classnames';

import { MetaData } from '@Types/Meta';
import Button from '@UI/Button';
import Link from '@UI/Link';
import useModals from '@Hooks/useModals';
import PageTitle from '@Pages/PageCredit/elements/PageTitle';
import Box from './elements/Box';
import ProductCard from './elements/ProductCard';
import Check, { CheckGroup } from './elements/Check';
import PriceContainer from './elements/PriceContainer';
import { PageOrderStatusData, ProductData } from './typings';
import styles from './PageOrderStatus.module.css';

export interface PageOrderStatusProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  // TODO: типизируй меня полностью
  page: PageOrderStatusData;
  meta: MetaData;
}

const PageOrderStatus: FC<PageOrderStatusProps> = (props) => {
  const { className, page, meta, ...restProps } = props;
  const { uuid, number, status, positions, payment, price, services } = page;
  const [, { openModal }] = useModals();
  const [waiting, setWaiting] = useState(false);
  const hasServices = !!price.services;

  // Плоский список товаров
  const products = useMemo(() => {
    let result: ProductData[] = [];

    positions.forEach((position) => {
      result = result.concat(position.products);
    });

    return result;
  }, [positions]);

  // Суммарная стоимость товаров
  const summCostProducts = useMemo(() => {
    return products.reduce((accumulator, product) => accumulator + product.price, 0);
  }, [products]);

  // Группы для «чека»
  const checkGroups = useMemo(() => {
    const result: CheckGroup[] = [];

    // Добавляем все товары в первую группу
    result.push({
      items: products.map((product) => ({
        name: `${product.type} ${product.name}`,
        cost: product.price,
        quantity: product.quantity,
      })),
    });

    return result;
  }, [products]);

  // Добавляем группу с доп. услугами
  const checkServices = useMemo(() => {
    const result: CheckGroup[] = [];
    if (hasServices) {
      result.push({
        items: services.map((service) => ({
          name: service.name,
          cost: service.cost,
          quantity: service.count,
        })),
      });
    }
    return result;
  }, [services, hasServices]);

  // Группа с итоговой суммой
  const checkTotal = useMemo(() => {
    const result: CheckGroup[] = [];
    // const productTitle = declOfNum(products.length, ['товар', 'товара', 'товаров']);
    const productTitle = 'товар';
    result.push({
      items: [
        {
          name: `Итого ${products.length} ${productTitle} на сумму`,
          cost: summCostProducts,
        },
        hasServices && {
          name: 'Дополнительные услуги',
          cost: price.services,
        },
        hasServices && {
          isTotal: true,
          name: 'ИТОГО',
          cost: summCostProducts + price.services,
        },
        payment.paid > 0 && {
          isTotal: true,
          name: 'Оплачено:',
          cost: payment.paid,
        },
      ].filter(Boolean),
    });

    return result;
  }, [payment.paid, price.services, products.length, summCostProducts, hasServices]);

  // Информация о сумме оплаты
  const paymentInfo = useMemo(() => {
    if (payment.prepaiment) {
      return {
        text: 'Предоплата:',
        cost: payment.prepaiment,
      };
    }

    if (payment.needsToPay) {
      return {
        text: 'К оплате:',
        cost: payment.needsToPay,
      };
    }

    return null;
  }, [payment]);

  const handleError = useCallback(() => {
    openModal('Info', {
      title: 'Произошла ошибка',
      text: 'Пожалуйста, повторите попытку позже.',
    });
  }, [openModal]);

  const handlePay = useCallback(async () => {
    // setWaiting(true);
    // try {
    //   const res = await (await get('/order/pay', {}, { id: uuid })).json();
    //   if (!res['bank-card-params']) {
    //     handleError();
    //     return;
    //   }
    //   // Если есть параметры карты, то сразу отправляем человека на страницу оплаты
    //   const bankCardParams = res['bank-card-params'];
    //   if (bankCardParams) {
    //     redirectToPayment(bankCardParams);
    //   }
    // } catch (err) {
    //   handleError();
    // } finally {
    //   setWaiting(false);
    // }
  }, []);

  console.log('page', page);

  return (
    <div {...restProps} className={cn(styles.page, className)}>
      <div className={styles.wrapper}>
        <PageTitle className={styles.title} title={`Ваш заказ ${number || ''}`} />

        <div className={styles.status}>
          <div className={styles.statusLabel}>Текущее состояние:</div>
          <div className={styles.statusValue}>{status}</div>
        </div>
      </div>

      <div className={cn(styles.wrapper, styles.wrapperList)}>
        <div className={styles.main}>
          <div className={styles.list}>
            {products.map((product, index) => {
              const collapsed = products.length > 1;

              return (
                <Box className={styles.listItem} view='product' key={index}>
                  <ProductCard defaultCollapsed={collapsed} product={product} />
                </Box>
              );
            })}
          </div>

          <Box className={styles.check} view='check'>
            <div className={styles.checkTitle}>Ваш заказ</div>
            <Check groups={checkGroups} className={styles.table} />

            {!!price.services && (
              <>
                <div className={styles.checkTitle}>Дополнительные услуги</div>
                <Check groups={checkServices} className={styles.table} />
              </>
            )}

            <Check groups={checkTotal} />

            <div className={styles.wrapperTotal}>
              {paymentInfo ? (
                <div className={styles.total}>
                  <div className={styles.totalLabel}>{paymentInfo.text}</div>
                  <PriceContainer className={styles.totalPrice} price={paymentInfo.cost} />
                </div>
              ) : (
                <div />
              )}

              {payment.button && (
                <Button className={styles.buttonAction} waiting={waiting} onClick={handlePay}>
                  {payment.button.text}
                </Button>
              )}
            </div>

            <div className={styles.hint}>
              {`*Оформляя заказ, я соглашаюсь с условиями `}
              <Link to='/static-page/privacy-policy' target='_blank'>
                Политики конфиденциальности
              </Link>
              {` и `}
              <Link to='/static-page/oferta' target='_blank'>
                Договора оферты
              </Link>
              . Мы дополнительно направим вам информацию о заказе по электронной почте.
            </div>
          </Box>
        </div>

        <div className={styles.separator} />
      </div>
    </div>
  );
};

export default memo(PageOrderStatus);
